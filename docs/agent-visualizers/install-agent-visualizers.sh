#!/usr/bin/env bash
# Install the Claude Code agent visualizers side by side on this machine:
#   Pixel Agents (VS Code), Claude Office (web), pixtuoid (terminal), PixelHQ (iPhone bridge).
#
# Usage:
#   ./install-agent-visualizers.sh           check prerequisites, then install (asks before each toolchain change)
#   ./install-agent-visualizers.sh --check   only report prerequisites, change nothing
#   ./install-agent-visualizers.sh --yes     answer yes to every prompt
#
# Never upgrades or replaces system Python/Node. Missing toolchains are added
# alongside existing ones (uv, nvm or brew), and only after you confirm.
# Written for bash 3.2 so it runs on stock macOS.
set -euo pipefail

ROOT="$HOME/tools/agent-visualizers"
CHECK_ONLY=0
ASSUME_YES=0
for arg in "$@"; do
  case "$arg" in
    --check) CHECK_ONLY=1 ;;
    --yes|-y) ASSUME_YES=1 ;;
    -h|--help) sed -n '2,13p' "$0"; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; exit 2 ;;
  esac
done

bold() { printf '\033[1m%s\033[0m\n' "$*"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$*"; }
miss() { printf '  \033[31m✗\033[0m %s\n' "$*"; }
note() { printf '  \033[33m!\033[0m %s\n' "$*"; }
have() { command -v "$1" >/dev/null 2>&1; }

confirm() {
  [ "$ASSUME_YES" = 1 ] && return 0
  local reply
  read -r -p "  → $1 [y/N] " reply </dev/tty || return 1
  case "$reply" in [yY]*) return 0 ;; *) return 1 ;; esac
}

node_major() { have node && node -v | sed -E 's/^v([0-9]+).*/\1/' || echo 0; }

load_nvm() {
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  local f="$NVM_DIR/nvm.sh"
  [ -s "$f" ] || { [ -n "${BREW:-}" ] && f="$(brew --prefix nvm 2>/dev/null)/nvm.sh"; }
  [ -s "$f" ] || return 1
  # nvm.sh is not nounset-safe
  # shellcheck disable=SC1090
  set +u; . "$f"; set -u
}

FAILED=""
fail_tool() { FAILED="${FAILED}  - $1: $2"$'\n'; miss "$1: $2"; }

# ---------------------------------------------------------------- prerequisites
bold "1/2  Prerequisites"
BREW=""; have brew && BREW=1
HAS_NVM=0; load_nvm && HAS_NVM=1
MISSING_REQUIRED=0

for t in git make; do
  if have "$t"; then ok "$t"; else miss "$t (macOS: xcode-select --install)"; MISSING_REQUIRED=1; fi
done

if have claude; then ok "Claude Code CLI $(claude --version 2>/dev/null | head -1)"
else miss "Claude Code CLI (required by every visualizer)"; MISSING_REQUIRED=1; fi

NODE_OK=0
if [ "$(node_major)" -ge 20 ]; then NODE_OK=1; ok "Node $(node -v)"
elif have node; then miss "Node $(node -v) is older than 20 (needed by Claude Office, pixtuoid via npm, PixelHQ)"
else miss "Node (20+ needed by Claude Office, pixtuoid via npm, PixelHQ)"; fi

if have uv; then ok "uv $(uv --version | awk '{print $2}') (it fetches its own Python 3.13 for Claude Office)"
else miss "uv (needed by Claude Office; it also supplies Python 3.13 without touching system Python)"; fi

if have python3; then ok "system Python $(python3 -V 2>&1 | awk '{print $2}') (left untouched)"; fi
if have tmux; then ok "tmux"; else note "tmux missing: Claude Office will need 'make dev' instead of 'make dev-tmux'"; fi
if have code; then ok "VS Code 'code' CLI"
else note "'code' CLI missing: in VS Code run \"Shell Command: Install 'code' command in PATH\", then re-run"; fi
[ -n "$BREW" ] && ok "Homebrew" || note "Homebrew not found (optional)"
[ "$HAS_NVM" = 1 ] && ok "nvm" || note "nvm not found (optional)"

if [ "$CHECK_ONLY" = 1 ]; then echo; echo "Check only: nothing was changed."; exit 0; fi
if [ "$MISSING_REQUIRED" = 1 ]; then echo; echo "Install the required items marked ✗ above, then re-run."; exit 1; fi

# Toolchain additions: each asks first and installs alongside what is there.
if [ "$NODE_OK" = 0 ]; then
  if [ "$HAS_NVM" = 1 ] && confirm "Install Node 22 with nvm (alongside your current Node)?"; then
    set +u; nvm install 22 && nvm use 22 >/dev/null && NODE_OK=1; set -u
  elif [ -n "$BREW" ] && confirm "Install node@22 with brew (keg-only, not linked over your current Node)?"; then
    brew install node@22 && export PATH="$(brew --prefix node@22)/bin:$PATH" && NODE_OK=1
  fi
  [ "$NODE_OK" = 1 ] && ok "using Node $(node -v) for this install" || note "Skipping Node-based tools (no Node 20+)"
fi

if ! have uv; then
  if [ -n "$BREW" ] && confirm "Install uv with brew?"; then brew install uv
  elif confirm "Install uv with its official installer (into ~/.local/bin)?"; then
    curl -LsSf https://astral.sh/uv/install.sh | sh && export PATH="$HOME/.local/bin:$PATH"
  fi
  have uv || note "Skipping Claude Office (no uv)"
fi

if ! have tmux && [ -n "$BREW" ] && confirm "Install tmux with brew (for 'make dev-tmux')?"; then brew install tmux; fi

# ---------------------------------------------------------------- install
echo; bold "2/2  Installing into $ROOT"
mkdir -p "$ROOT"

# 1. Pixel Agents (VS Code extension)
if have code; then
  code --install-extension pablodelucca.pixel-agents >/dev/null && ok "Pixel Agents extension" \
    || fail_tool "Pixel Agents" "code --install-extension failed"
else
  fail_tool "Pixel Agents" "'code' CLI missing; run \"Shell Command: Install 'code' command in PATH\" in VS Code, then re-run"
fi

# 2. Claude Office (web app)
if have uv && [ "$NODE_OK" = 1 ]; then
  if [ -d "$ROOT/claude-office/.git" ]; then git -C "$ROOT/claude-office" pull --ff-only -q
  else git clone -q https://github.com/paulrobello/claude-office "$ROOT/claude-office"; fi
  env_file="$ROOT/claude-office/backend/.env"
  # The README's default summary backend calls the Claude CLI and spends tokens; keep it off unless asked.
  if ! grep -qs '^SUMMARY_BACKEND=' "$env_file"; then echo "SUMMARY_BACKEND=disabled" >> "$env_file"; fi
  echo "  installing Claude Office (backend, frontend, hooks); this takes a few minutes..."
  if (cd "$ROOT/claude-office" && make install-all) > "$ROOT/claude-office-install.log" 2>&1; then
    ok "Claude Office (hooks added to ~/.claude/settings.json; log: $ROOT/claude-office-install.log)"
  else
    fail_tool "Claude Office" "make install-all failed; see $ROOT/claude-office-install.log"
  fi
else
  fail_tool "Claude Office" "needs uv and Node 20+"
fi

# 3. pixtuoid (terminal office)
if ! have pixtuoid; then
  if [ -n "$BREW" ]; then brew install pixtuoid >/dev/null || true
  elif [ "$NODE_OK" = 1 ]; then npm install -g pixtuoid >/dev/null || true; fi
fi
if have pixtuoid; then
  pixtuoid connect claude-code >/dev/null && ok "pixtuoid $(pixtuoid --version | awk '{print $2}') connected to Claude Code" \
    || fail_tool "pixtuoid" "installed, but 'pixtuoid connect claude-code' failed; run 'pixtuoid doctor'"
else
  fail_tool "pixtuoid" "install failed (needs brew, or Node 20+ for npm)"
fi

# 4. PixelHQ bridge (runs on demand with npx; the phone app is a manual step)
if [ "$NODE_OK" = 1 ]; then
  ok "PixelHQ bridge: run 'npx pixelhq' when you want it (nothing to install)"
else
  fail_tool "PixelHQ" "bridge needs Node 20+"
fi

# ---------------------------------------------------------------- SWITCHING.md
cat > "$ROOT/SWITCHING.md" <<'EOF'
# Switching between Claude Code agent visualizers

All four tools can run at the same time. Start a visualizer first, then start Claude Code in another terminal.

| Tool | Launch command |
|------|----------------|
| Pixel Agents (VS Code) | In VS Code, open the **Pixel Agents** panel and click **+ Agent** |
| Claude Office (web) | `cd ~/tools/agent-visualizers/claude-office && make dev-tmux`, then open http://localhost:3000 (stop with `make dev-tmux-kill`; no tmux: `make dev`) |
| pixtuoid (terminal) | `pixtuoid` (press `s` to check that Claude Code is connected) |
| PixelHQ (iPhone) | `npx pixelhq`, then enter the 6-digit code in the PixelHQ app (phone and laptop must be on the same Wi-Fi) |

Notes:
- Claude Office and pixtuoid add hooks to `~/.claude/settings.json`. To remove them: `cd ~/tools/agent-visualizers/claude-office && make hooks-uninstall` and `pixtuoid disconnect claude-code`.
- Claude Office's AI summaries are off (`SUMMARY_BACKEND=disabled` in `backend/.env`). Delete that line to turn them on; they spend tokens through the Claude CLI.
EOF
ok "wrote $ROOT/SWITCHING.md"

# ---------------------------------------------------------------- summary
echo; bold "Done"
if [ -n "$FAILED" ]; then echo "Not installed:"; printf '%s' "$FAILED"; fi
cat <<'EOF'
Manual steps:
  - iPhone: install "PixelHQ" from the App Store, run `npx pixelhq` here, enter the 6-digit code.
  - Test: start each visualizer (see SWITCHING.md), then in another terminal run
      claude "list the files in this folder"
    and watch a character react in each one.
EOF
