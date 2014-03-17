StaticSaver is a plugin for MODx Revolution, which installs values for names and file sources of elements automatically (templates, chunks, snippets, additional fields and plugins), when you make them static. It is useful for developers who use local IDE.

## Installation and setting
Install the package through Package management from the [official Repository][1].

Then you will need to adapt **File Source ** and **System settings**. You can find necessary settings with the help of namespace filter "**staticsaver**".

Detailed video about StaticSaver setting [can be found in YouTube][2].

## System settings of StaticSaver

Name										| Default value	| Description
--------------------------------------------|---------------|------------------------------------------------------------------------------------------------
staticsaver.include_category				| false			| Adds a folder with category name on track to element. E.g.: snippet MySnippet in category MyCategory will be situated in ***path_to_source_files/MyCategory/MySnippet.php***
staticsaver.static_default					| false			| While opening the editing form of element, all the elements set static automatically.
staticsaver.static_file_extension			| php			| File extention of all the elements. It has the highest priority. Install null value to adapt different extensions for different elements.
staticsaver.static_chunk_file_extension		| php			| Extension of chunk files. See the description of static_file_extension.
staticsaver.static_plugin_file_extension	| php			| Extension of plugin files. See the description of static_file_extension.
staticsaver.static_snippet_file_extension	| php			| Extension of snippet files. See the description of static_file_extension.
staticsaver.static_template_file_extension	| php			| Extension of template files. See the description of static_file_extension.
staticsaver.static_tv_file_extension		| php			| Extension of additional fields. See the description of static_file_extension.
staticsaver.static_chunk_media_source		| 1				| Source of chunk files.
staticsaver.static_plugin_media_source		| 1				| Source of plugin files.
staticsaver.static_snippet_media_source		| 1				| Source of snippet files.
staticsaver.static_template_media_source	| 1				| Source of template files.
staticsaver.static_tv_media_source			| 1				| Source of additional field files.

## Development of extension
Write about statements and errors of StaticSaver in [GitHub][3].

### Plans for future

* Automatic creation of file sources during installation
* Settings decline at the expense of their transfer to JSON format

[1]: http://modx.com/extras/package/staticsaver
[2]: http://www.youtube.com/watch?v=l3ObHPfFKTM
[3]: https://github.com/argnist/StaticSaver/issues/
