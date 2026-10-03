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
