---
title: Keyboard shortcuts
---
# Keyboard shortcuts

Full Ace command list in the manager: **Ctrl+Alt+H** (on Mac **Command+Option+H**) while the editor is focused. Emmet adds its own entries to the same table.

## Ace and package

| Shortcut | Action |
| --- | --- |
| **Ctrl+Alt+H** | Shortcut table |
| **Ctrl+Shift+B** | HTML beautify for every mode. There is no separate PHP or CSS formatter |
| **Alt+Z** | Toggle word wrap |
| **Ctrl+F11** | Fullscreen (Windows/Linux) |
| **Cmd+F12** | Fullscreen (Mac) |
| **Ctrl+Space**, **Ctrl+Shift+Space**, **Alt+Space** | MODX / PHP completions. There is no Cmd+Space |
| **Tab** | Expand Tab snippet (`ace.snippets`) or indent |
| **Shift+Ctrl+A** | Emmet: wrap with abbreviation. The same shortcut on Mac |
| **Ctrl+S** / **Cmd+S** | Save the form (since 1.9.10 the hidden field stays in the form in fullscreen) |

## Ace core (basic)

| Shortcut | Action |
| --- | --- |
| Ctrl+F | Find |
| Ctrl+H | Replace |
| Ctrl+L | Go to line. On Windows this opens the package dialog. On Mac go to line is **Command+Option+L** |
| Ctrl+/ | Comment |
| Ctrl+D | Delete the line. On Mac **Command+D** does the same |
| Ctrl+Alt+→ | Next occurrence (`selectMoreAfter`) |
| Ctrl+Alt+↑ / ↓ | Multicursor |

Ctrl+G is not go to line. Use the **Ctrl+Alt+H** dialog as the source of truth.

## Fullscreen

Ace moves the editor to `document.body`. `.ace_maximized` uses z-index `12000`. Until JavaScript measures insets, `top` is `60px` and `left` is `70px`. Insets then come from the header or side menu (`#modx-header`) and the button bar (`#modx-action-buttons`).

## Related

- [Integration](integration)
- [System settings](settings)
- [Troubleshooting](troubleshooting)
