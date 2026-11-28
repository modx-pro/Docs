---
title: Troubleshooting
---
# Troubleshooting

## The Editor Does Not Appear on a Snippet or Chunk

1. The **CMX** plugin is enabled
2. `which_element_editor = cmx` - in lowercase
3. The MODX and browser caches have been cleared
4. There are no 404 errors for `assets/components/cmx/js/cmx.min.js` in the browser console
5. Another editor has not replaced the field after CMX

Also check user settings: they can override system values.

## Textarea or TinyMCE in a Resource Instead of CMX

Check the **context-specific** values of `use_editor` / `which_editor`, not only the global values:

- `use_editor = Yes` and richtext enabled: CMX does not take over the field;
- `use_editor = Yes` and `which_editor` not `cmx`: a resource without richtext retains a textarea;
- `use_editor = No`: CMX replaces content and `.modx-richtext`.

The selection workflow is described in [Integration](integration#resources-and-rte).

## No Autocompletion

1. `cmx.autocomplete` and the required `cmx.autocomplete_*` setting are enabled
2. Try invoking it manually with **Ctrl+Space**
3. For `[[++`, `[[%`, and the API, check the separate `autocomplete_settings`, `autocomplete_lexicons`, and `autocomplete_api` settings
4. Check the request to `assets/components/cmx/completions.php` in the browser console
5. Make sure the manager user has permission to read the corresponding elements

Local suggestions for prefixes and resource fields do not depend on the server response.

## Hover Tooltips Do Not Appear

Check that `cmx.hovers = Yes`. The pointer must be over a tag name, filter, or modifier; a tooltip appears after a short delay.

Descriptions of snippets, chunks, TVs, and resources require a connector response. If an element has no description, basic information is displayed.

## Ctrl/Cmd + Click Does Not Open an Element

1. `cmx.goto_definition = Yes`
2. Use `Ctrl` on Windows/Linux and `Cmd` on a Mac
3. An element with that name exists and is accessible to the manager user
4. The browser has not blocked the new tab

The current form should not close: the element opens in a new tab.

## Server-Side PHP Validation Does Not Work

Check:

- `cmx.php_lint = Yes`;
- the correct path in `cmx.php_path`, such as `php` or the full path to the PHP CLI;
- whether `exec()` is available on the hosting;
- the `lint` processor response in the browser console.

Without PHP CLI, browser-based validation of brackets, strings, comments, and heredoc/nowdoc continues to work.

## A CMX TV Is Not Displayed or Its Value Is Empty

1. `cmx.tv = Yes`
2. The TV uses the **cmx** input type
3. The TV is assigned to the resource template
4. Reload the resource page after changing the TV
5. The current package version is installed

The value is stored like a regular TV. The `language` property affects syntax highlighting, while `height` affects only the field height.

## No Draft Is Offered

Check `cmx.autosave = Yes` and the `cmx.autosave_lifetime` period. The draft must differ from the saved text and must not have expired.

Drafts are associated with the browser and user through `localStorage`: they are not transferred to another computer or browser. In private browsing mode, storage may be cleared after the window is closed.

## No Versions in History

1. `cmx.versions = Yes`
2. The element or resource has been saved after CMX was installed
3. The `cmx_revision` table was created by the installer
4. The manager user has permissions for the corresponding object

Files in the file manager are not versioned. Saving unchanged text again within a short interval may not create a separate snapshot.

## Formatting Does Not Work on a Mac

Use **Cmd+Shift+F**, not Shift+Option+F. For other letter commands where Option inserts symbols, see the separate macOS shortcuts in [Keyboard Shortcuts](hotkeys).

## Theme or Font Settings Differ Between Manager Users

This is expected. The theme, font size, and word wrap can be stored in the quick menu of a specific browser. In addition, the `cmx.*` system settings can be overridden in the user profile.

Select reset in the quick menu to restore the system values.

## Frequently Asked Questions

### CMX and TinyMCE at the Same Time?

Yes. TinyMCE can handle richtext resources, while CMX handles elements, files, and resources without an RTE.

### Are Composer or npm Required on the Production Site?

No. The ready-to-use transport package contains the compiled JavaScript. `npm` is only required for frontend development and rebuilding.

### Are Drafts and Scratchpad Sent to the Server?

No. They are stored in `localStorage`. Version history is a separate feature and is stored in the site database.

### Is an External CDN Required?

No. The editor, themes, and language modes are included in the package.

## Related Sections

- [Quick Start](quick-start)
- [Integration](integration)
- [System Settings](settings)
