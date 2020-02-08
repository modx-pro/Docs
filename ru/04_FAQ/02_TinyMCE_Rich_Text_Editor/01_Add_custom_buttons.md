# Добавление кастомных кнопок

1. Переходим по пути в `assets/components/tinymcerte/js/vendor/tinymce/plugins/` в данной директории создаем папку с названием нашего плагина, для примера `mxs_mce_plugin`, а в ней файл `plugin.min.js`.

2. В созданный файл добавляем код следующего вида:

    ```javascript
    tinymce.PluginManager.add('mxs_mce_plugin', function(editor, url) {
    editor.addButton('work_desc', {
        text: 'Work desc',
        icon: false,
        onclick: function() {
        editor.insertContent('<div class="work__desc"><p>Тут описание</p></div>');
        }
    });
    });
    ```

    Где:

    - `work_desc` - название нашей кнопки
    - `text: 'Work desc'` - Надпись на самой кнопке
    - `icon: false` - тут указываем, что кнопка не нужна.
    - `<div class="work__desc"><p>Тут описание</p></div>` - наш кастомный HTML код вставляемый в текст при клике на кнопку.

3. Переходим в Системные настройки > Пространство имен `tinymcerte` и указываем следующие параметры

    в `tinymcerte.plugins` добавляем название плагина, в нашем примере `mxs_mce_plugin`
    в `tinymcerte.toolbar1` добавляем `work_desc` название кнопки

4. Очищаем кеш через меню.

Для получения дополнительной информации посмотрите: <https://www.tiny.cloud/docs-4x/advanced/creating-a-plugin/>
