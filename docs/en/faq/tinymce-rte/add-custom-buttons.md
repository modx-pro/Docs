---
author: Ibochkarev
---
# Adding custom buttons

1. In `assets/components/tinymcerte/js/vendor/tinymce/plugins/` create a folder for your plugin (e.g. `mxs_mce_plugin`) and add `plugin.min.js` inside it.

2. In that file add code like:

    ```js
    tinymce.PluginManager.add('mxs_mce_plugin', function (editor, url) {
      editor.addButton('work_desc', {
        text: 'Work desc',
        icon: false,
        onclick: function () {
          editor.insertContent('<div class="work__desc"><p>Description here</p></div>');
        }
      });
    });
    ```

    Where:

    - `work_desc` – button ID
    - `text: 'Work desc'` – label on the button
    - `icon: false` – no icon
    - `<div class="work__desc"><p>Description here</p></div>` – HTML inserted when the button is clicked

3. Go to System settings > namespace `tinymcerte` and set:

    - In `tinymcerte.plugins` add the plugin name, e.g. `mxs_mce_plugin`
    - In `tinymcerte.toolbar1` add the button name `work_desc`

4. Clear cache from the menu.

For more details see: <https://www.tiny.cloud/docs-4x/advanced/creating-a-plugin/>
