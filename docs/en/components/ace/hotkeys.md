---
title: Keyboard shortcuts
---
# Keyboard shortcuts

Full Ace command list in the manager: **Ctrl+Alt+H** while the editor is focused. Emmet adds its own entries to the same table.

Common shortcuts for MODX work:

## Ace and package

| Shortcut | Action |
| --- | --- |
| **Ctrl+Alt+H** | Shortcut table |
| **Ctrl+Shift+B** | Format code |
| **Alt+Z** | Toggle word wrap |
| **Ctrl+F11** | Fullscreen (Windows/Linux) |
| **Cmd+F12** | Fullscreen (Mac) |
| **Ctrl+Space** | MODX / PHP completions |
| **Tab** | Expand Tab snippet (`ace.snippets`) or indent |
| **Alt+W** | Emmet: wrap with abbreviation |
| **Ctrl+S** / **Cmd+S** | Save form (synced correctly in fullscreen since 1.9.10) |

## Ace core (basic)

| Shortcut | Action |
| --- | --- |
| Ctrl+F | Find |
| Ctrl+H | Replace |
| Ctrl+G | Go to line |
| Ctrl+/ | Comment |
| Ctrl+D | Select next occurrence |
| Ctrl+Alt+↑ / ↓ | Multicursor |
| Ctrl+L | Select line |

Exact bindings depend on the bundled ace-builds version and OS layout. Use the **Ctrl+Alt+H** dialog as the source of truth.

## Fullscreen on MODX 3

In maximized mode the editor moves to `document.body` with a high z-index so manager chrome does not cover the code. `.ace_maximized` insets keep the top bar and tree visible.

## Related

- [Integration](integration)
- [System settings](settings)
- [Troubleshooting](troubleshooting)
