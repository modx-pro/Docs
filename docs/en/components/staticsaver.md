---
title: StaticSaver
description: Plugin for auto-setting file paths and sources when making elements static
---
# StaticSaver

StaticSaver is a plugin for MODX Revolution that automatically sets file names and media source for elements (templates, chunks, snippets, TVs, or plugins) when you make them static. Useful for developers using local IDEs.

## Installation and setup

Install the package via Package Management from the [official Repository](http://modx.com/extras/package/staticsaver).

After that you need to configure **File Media Sources** and **System Settings**. Find the required settings using the namespace filter "**staticsaver**".

A detailed setup video for StaticSaver can be [watched on YouTube](http://www.youtube.com/watch?v=l3ObHPfFKTM).

## StaticSaver system settings

| Name                                       | Default | Description                                                                                                                                                                             |
| ------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **staticsaver.include_category**           | `false`  | Adds a folder with the category name to the element path. E.g. snippet MySnippet in category MyCategory will be at ***media_source_path/MyCategory/MySnippet.php***                     |
| **staticsaver.static_default**             | `false`  | All elements are set to static automatically when opening the element edit form.                                                                                                        |
| **staticsaver.static_file_extension**      | `php`    | File extension for all elements. Has highest priority. Set empty to configure different extensions per element type.                                                                    |
| **staticsaver.static_chunk_file_extension**| `php`    | Chunk file extension. See static_file_extension.                                                                                                                                        |
| **staticsaver.static_plugin_file_extension** | `php`  | Plugin file extension. See static_file_extension.                                                                                                                                       |
| **staticsaver.static_snippet_file_extension** | `php`  | Snippet file extension. See static_file_extension.                                                                                                                                      |
| **staticsaver.static_template_file_extension** | `php` | Template file extension. See static_file_extension.                                                                                                                                     |
| **staticsaver.static_tv_file_extension**   | `php`    | TV file extension. See static_file_extension.                                                                                                                                           |
| **staticsaver.static_chunk_media_source**  | `1`      | Chunk media source.                                                                                                                                                                    |
| **staticsaver.static_plugin_media_source** | `1`      | Plugin media source.                                                                                                                                                                   |
| **staticsaver.static_snippet_media_source**| `1`      | Snippet media source.                                                                                                                                                                  |
| **staticsaver.static_template_media_source** | `1`    | Template media source.                                                                                                                                                                 |
| **staticsaver.static_tv_media_source**     | `1`      | TV media source.                                                                                                                                                                       |

## Extra development

Report suggestions and issues with StaticSaver on [GitHub](https://github.com/argnist/StaticSaver/issues/).

### Future plans

- Automatic creation of media sources on install
- Fewer settings by moving them to JSON format
