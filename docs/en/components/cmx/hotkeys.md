---
title: Keyboard Shortcuts
---
# Keyboard Shortcuts

In the tables, **Mod** means `Ctrl` on Windows/Linux and `Cmd` (`⌘`) on macOS. **Alt** on a Mac is `Option` (`⌥`). For letter commands where macOS inserts symbols instead of letters, CMX uses separate shortcuts without Option.

A complete cheat sheet is also available in the repository's [COMMANDS.md](https://github.com/vitos88/Cmx/blob/main/COMMANDS.md) file.

## CMX and MODX

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| Save the MODX form | `Ctrl+S` | `Cmd+S` |
| Command palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Autocompletion | `Ctrl+Space` | `Ctrl+Space` |
| Format the document or selection | `Shift+Alt+F` | `Cmd+Shift+F` |
| Go to an element from a MODX tag | `Ctrl` + click | `Cmd` + click |
| Select a line | Click its line number | Click its line number |
| Select a range of lines | Drag across line numbers | Drag across line numbers |

The element palette opens with the `{ }` button, history with the clock button, and quick settings with the gear button. Full-screen mode is enabled with a toolbar button; `Esc` restores the normal size.

## Basic Commands

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| Undo | `Ctrl+Z` | `Cmd+Z` |
| Redo | `Ctrl+Y` or `Ctrl+Shift+Z` | `Cmd+Shift+Z` |
| Select all | `Ctrl+A` | `Cmd+A` |
| Find and replace | `Ctrl+F` | `Cmd+F` |
| Go to line | `Ctrl+Alt+G` | `Ctrl+G` |
| Toggle comment | `Ctrl+/` | `Cmd+/` |
| Toggle block comment | `Shift+Alt+A` | `Shift+Ctrl+A` |
| Increase indent | `Tab` or `Ctrl+]` | `Tab` or `Cmd+]` |
| Decrease indent | `Shift+Tab` or `Ctrl+[` | `Shift+Tab` or `Cmd+[` |
| Automatically indent selection | `Ctrl+Alt+\` | `Cmd+Alt+\` |
| Go to matching bracket | `Ctrl+Shift+\` | `Cmd+Shift+\` |
| Allow Tab to move focus | `Ctrl+M` | `Shift+Ctrl+M` |

If there is an Emmet abbreviation before the cursor, `Tab` expands it first.

## Lines

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| New line with automatic indentation | `Enter` or `Shift+Enter` | `Enter` or `Shift+Enter` |
| Insert a blank line | `Ctrl+Enter` | `Cmd+Enter` |
| Move line/selection up or down | `Alt+↑` / `Alt+↓` | `Alt+↑` / `Alt+↓` |
| Copy line/selection up or down | `Shift+Alt+↑` / `Shift+Alt+↓` | `Shift+Alt+↑` / `Shift+Alt+↓` |
| Delete line | `Ctrl+Shift+K` | `Cmd+Shift+K` |
| Delete previous word | `Ctrl+Backspace` | `Alt+Backspace` |
| Delete next word | `Ctrl+Delete` | `Alt+Delete` |
| Delete to beginning of line | - | `Cmd+Backspace` |
| Delete to end of line | - | `Cmd+Delete` |

## Navigation and Selection

Adding `Shift` to movement commands extends the selection.

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| By word | `Ctrl+←` / `Ctrl+→` | `Alt+←` / `Alt+→` |
| By syntax node | `Alt+←` / `Alt+→` | `Ctrl+←` / `Ctrl+→` |
| Beginning / end of line | `Home` / `End` | `Home` / `End` or `Cmd+←` / `Cmd+→` |
| Beginning / end of document | `Ctrl+Home` / `Ctrl+End` | `Cmd+↑` / `Cmd+↓` |
| Select current line | `Alt+L` | `Ctrl+L` |
| Select parent node | `Ctrl+I` | `Cmd+I` |
| Collapse multiple selections | `Esc` | `Esc` |

## Multiple Cursors

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| Cursor one line above / below | `Ctrl+Alt+↑` / `Ctrl+Alt+↓` | `Cmd+Alt+↑` / `Cmd+Alt+↓` |
| Next occurrence of word or selection | `Ctrl+D` | `Cmd+D` |
| All occurrences of selection | `Ctrl+Shift+L` | `Cmd+Shift+L` |
| Rectangular selection | `Alt` + drag | `Alt` + drag |
| Undo last selection change | `Ctrl+U` | `Cmd+U` |
| Redo undone selection change | `Alt+U` | `Cmd+Shift+U` |

## Search and Autocompletion

| Action | Shortcut |
| --- | --- |
| Open search | `Mod+F` |
| Next match | `F3` or `Mod+G` |
| Previous match | `Shift+F3` or `Shift+Mod+G` |
| Apply autocompletion suggestion | `Enter` while the list is open |
| Close the list | `Esc` |
| Expand Emmet | `Tab` |

## Sublime and Vim

With `cmx.keymap = sublime`, the standard commands remain available, and the current line can additionally be selected with `Ctrl+L` / `Cmd+L`.

With `cmx.keymap = vim`, Normal, Insert, Visual, and Visual Line modes are available, along with operators, motions, registers, and macros:

| Action | Command |
| --- | --- |
| Insert | `i`, `a`, `o`, `O` |
| Normal | `Esc` |
| Movement | `h`, `j`, `k`, `l`, `w`, `b`, `e`, `0`, `^`, `$`, `gg`, `G` |
| Visual / Visual Line | `v` / `V` |
| Delete character / line | `x` / `dd` |
| Copy line | `yy` |
| Paste after / before cursor | `p` / `P` |
| Undo / redo | `u` / `Ctrl+R` |
| Search | `/`, then `n` and `N` |
| Macro | `q` + register to record, `@` + register to play |

## Related Sections

- [Integration](integration)
- [System Settings](settings)
- [Troubleshooting](troubleshooting)
