# MODX Ace Material Theme

Для смены визуального оформления редактора под вид Material Theme необходиом выполнить следующие шаги:

1. Переходим в Системные настройки > Пространство имен `ace` и указываем следующие параметры:

   - Размер шрифта: `13px`
   - Высота области редактирования: `560`
   - Невидимые символы: `Да`
   - Мягкая табуляция: `Нет`
   - Размер табуляции: `2`
   - Тема редактора: `tomorrow_night`

2. Переходи по пути: Filesystem > manager > templates > default > css > index.css и добавляем в конце файла следующие стили:

    ```css
    .ace_editor{font-size: 13px; line-height: 1.5!important; font-family: 'Menlo Regular', 'Consolas', 'source-code-pro', monospace!important}
    .ace_gutter{color:#666E79!important}
    .ace_active-line,.ace_gutter-active-line{background-color:#2A2F38!important}
    .ace_scroller,.ace_gutter {background-color: #272B33!important}
    .ace_meta.ace_tag{color:#A6B2C0!important}
    .ace_meta.ace_tag.ace_tag-name{color:#DF6A73!important}
    .ace_entity.ace_other.ace_attribute-name{color:#D2945D!important}
    .ace_string{color:#90C378!important}
    ```

3. Очищаем кеш через меню.
