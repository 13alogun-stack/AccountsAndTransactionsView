# Switching between Claude Code agent visualizers

All four tools can run at the same time. Start a visualizer first, then start Claude Code in another terminal.

| Tool | Launch command |
|------|----------------|
| Pixel Agents (VS Code) | In VS Code, open the **Pixel Agents** panel and click **+ Agent** (install with `code --install-extension pablodelucca.pixel-agents`) |
| Claude Office (web) | `cd ~/tools/agent-visualizers/claude-office && make dev-tmux`, then open http://localhost:3000 (stop with `make dev-tmux-kill`) |
| pixtuoid (terminal) | `pixtuoid` (first run only: `pixtuoid connect claude-code`, or press `s` inside the TUI) |
| PixelHQ (iPhone) | `npx pixelhq`, then enter the 6-digit code in the PixelHQ app (phone and laptop must be on the same Wi-Fi) |

Notes:
- Claude Office and pixtuoid add hooks to `~/.claude/settings.json`. To remove them: `cd ~/tools/agent-visualizers/claude-office && make hooks-uninstall` and `pixtuoid disconnect claude-code`.
- Claude Office's AI summaries use the `claude-cli` backend by default, which may spend tokens. Set `SUMMARY_BACKEND=disabled` in `backend/.env` to turn them off.
