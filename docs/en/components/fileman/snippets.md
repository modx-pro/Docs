# Snippets

The component has one snippet: **fmFiles**.

## fmFiles

Outputs the list of files attached to a resource.

### pdoTools and Fenom support

Up to and including 3.1.5-pl, the component used [pdoTools](/en/components/pdotools/) and a single chunk written with the Fenom templating engine.

From 3.2.0-pl onward it can work either with pdoTools (and Fenom) or with the standard MODX parser.

This is controlled by the `fileman_pdotools` system setting:

* **Setting on and pdoTools installed:**\
  fmFiles uses only the `tpl` parameter and the single chunk specified there. The chunk can (and should) use Fenom.
* **Setting off:**\
  fmFiles uses only `tplRow`, `tplGroup`, `tplWrapper`, `wrapIfEmpty` and their chunks. Chunks use standard MODX syntax.

### Parameters

|   | Parameter     | Default          | Description                                                                 |
|---|---------------|------------------|-----------------------------------------------------------------------------|
|   | tpl           | `tpl.FileMan.Files` | Single chunk for the full result (Fenom). Used only when pdoTools is on. |
|   | tplRow        | `tpl.FileMan.Row`   | Chunk for one file row (when `fileman_pdotools` is off). Placeholders: all fmFile fields. |
|   | tplGroup      | `tpl.FileMan.Group` | Chunk for a group (when `fileman_pdotools` is off). Placeholders: `[[+group]]`, `[[+output]]`. |
|   | tplWrapper    |                  | Wrapper chunk for the result (when `fileman_pdotools` is off). Placeholder: `[[+output]]`. |
|   | wrapIfEmpty   | `0`              | Whether to wrap an empty result in `tplWrapper`.                          |
|   | sortBy        | `sort_order`   | Field to sort files by.                                                    |
|   | sortDir       | `ASC`           | Sort direction: ASC or DESC.                                                |
|   | limit         | `0`             | Max number of results (0 = all).                                            |
|   | offset        | `0`             | Offset for pagination (e.g. with pdoPage).                                  |
|   | totalVar      | `total`         | Placeholder name for total file count when using pagination.                |
|   | toPlaceholder |                 | Save result to this placeholder instead of outputting.                     |
|   | ids           |                 | Comma-separated list of file IDs to output.                                |
|   | resource      |                 | Resource ID (default: current resource).                                   |
|   | showGroups    | `1`             | Show file groups.                                                           |
|   | makeUrl       | `1`             | Generate download URLs for files.                                          |
|   | privateUrl    | `0`             | Force private (connector) URLs for all files.                              |
|   | includeTimeStamp | `0`           | Include file modification time (as `timestamp`).                            |
