---
title: Системные настройки
---
# Системные настройки

Namespace: `cmx`. Настройки разделены на области `general`, `appearance`, `editing`, `modx` и `completion`.

**Где изменить:** **Система → Системные настройки** → фильтр по namespace `cmx`.

Системные значения можно переопределить для отдельного менеджера через **Пользователи → пользователь → Настройки**. Тема, размер шрифта и перенос строк также меняются в быстром меню редактора и сохраняются в браузере пользователя. Команда сброса возвращает системные значения.

При обновлении пакета существующие значения настроек сохраняются.

## Основные

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `cmx.theme` | cmx-combo | `auto` | Тема: `auto`, `manager`, `light`, `light-quiet`, `light-solarized`, `dark`, `dark-dracula`, `dark-nord`, `dark-gruvbox`, `dark-vscode`, `dark-monokai`, `dark-solarized` |
| `cmx.height` | textfield | пусто | Высота редактора в px. Пусто: высота исходного поля или стандартная высота CMX. У TV задаётся отдельное свойство `height` |
| `cmx.toolbar` | combo-boolean | `Да` | Панель инструментов редактора |
| `cmx.statusbar` | combo-boolean | `Да` | Строка состояния: позиция, выделение, размер, язык, тема и диагностика |
| `cmx.command_palette` | combo-boolean | `Да` | Палитра команд по `Ctrl/Cmd+Shift+P` |

## Внешний вид

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `cmx.font_family` | textfield | пусто | Собственный monospace-шрифт. Пусто: системный набор monospace |
| `cmx.font_size` | textfield | `13` | Размер шрифта в px |
| `cmx.line_numbers` | combo-boolean | `Да` | Номера строк. Клик выделяет строку, протягивание - диапазон |
| `cmx.active_line` | combo-boolean | `Да` | Подсветка активной строки |
| `cmx.fold_gutter` | combo-boolean | `Да` | Кнопки сворачивания блоков на gutter |
| `cmx.word_wrap` | combo-boolean | `Нет` | Перенос длинных строк |
| `cmx.bracket_matching` | combo-boolean | `Да` | Подсветка парной скобки |
| `cmx.bracket_colors` | combo-boolean | `Нет` | Раскраска скобок по уровням вложенности |
| `cmx.indent_guides` | combo-boolean | `Да` | Направляющие отступов |
| `cmx.ruler` | textfield | `0` | Вертикальная линейка на указанной колонке; `0` отключает |
| `cmx.highlight_trailing` | combo-boolean | `Да` | Подсветка пробелов и табов в конце строк |

## Редактирование

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `cmx.soft_tabs` | combo-boolean | `Да` | Пробелы вместо символа Tab |
| `cmx.tab_size` | textfield | `4` | Ширина отступа |
| `cmx.close_brackets` | combo-boolean | `Да` | Автозакрытие скобок и кавычек |
| `cmx.auto_close_tags` | combo-boolean | `Да` | Автозакрытие HTML/MODX-тегов и Fenom-блоков |
| `cmx.format_button` | combo-boolean | `Да` | Кнопка форматирования отступов на панели |
| `cmx.search_panel` | combo-boolean | `Да` | Поиск и замена по `Ctrl/Cmd+F` |
| `cmx.highlight_matches` | combo-boolean | `Да` | Подсветка совпадений выделенного слова |
| `cmx.emmet` | combo-boolean | `Да` | Развёртывание Emmet-аббревиатур по Tab в поддерживаемых контекстах |
| `cmx.autosave` | combo-boolean | `Да` | Локальные черновики в `localStorage` |
| `cmx.autosave_lifetime` | textfield | `240` | Срок хранения черновика в минутах |
| `cmx.keymap` | cmx-combo | `standard` | Раскладка: `standard`, `sublime` или `vim` |
| `cmx.trim_trailing` | combo-boolean | `Нет` | Удалять конечные пробелы и табы перед отправкой формы |

## Интеграция с MODX

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `cmx.goto_definition` | combo-boolean | `Да` | Открытие сниппета, чанка, TV или ресурса по `Ctrl/Cmd + клик` в новой вкладке |
| `cmx.hovers` | combo-boolean | `Да` | Подсказки при наведении на MODX-теги, фильтры и модификаторы |
| `cmx.media_button` | combo-boolean | `Да` | Кнопка штатного медиа-браузера MODX |
| `cmx.versions` | combo-boolean | `Да` | Снимки элементов и ресурсов при сохранении |
| `cmx.versions_max` | textfield | `20` | Максимальное количество хранимых снимков на объект |
| `cmx.php_lint` | combo-boolean | `Да` | Браузерная проверка PHP и серверная проверка `php -l`, если доступен PHP CLI |
| `cmx.php_path` | textfield | `php` | Путь к исполняемому файлу PHP CLI |
| `cmx.css_lint` | combo-boolean | `Да` | Проверка CSS-файлов и блоков `<style>` |
| `cmx.tv` | combo-boolean | `Да` | Регистрация и замена TV с типом ввода `cmx` |
| `cmx.template_lint` | combo-boolean | `Да` | Проверка Fenom и MODX-тегов |
| `cmx.warn_on_save` | combo-boolean | `Да` | Подтверждение сохранения при критических ошибках шаблона или PHP |

## Автодополнение

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `cmx.autocomplete` | combo-boolean | `Да` | Общий переключатель автодополнения |
| `cmx.autocomplete_modx` | combo-boolean | `Да` | MODX-теги, элементы, параметры, фильтры и наборы свойств |
| `cmx.autocomplete_fenom` | combo-boolean | `Да` | Fenom и Twig |
| `cmx.autocomplete_php` | combo-boolean | `Да` | PHP-функции и ключевые слова |
| `cmx.autocomplete_settings` | combo-boolean | `Да` | Системные настройки `[[++key]]` |
| `cmx.autocomplete_lexicons` | combo-boolean | `Да` | Записи лексиконов `[[%key]]` |
| `cmx.autocomplete_api` | combo-boolean | `Да` | MODX/xPDO API и объекты Fenom |
| `cmx.autocomplete.insert_defaults` | combo-boolean | `Да` | Подставлять значения параметров и фильтров по умолчанию |
| `cmx.autocomplete.close_tags` | combo-boolean | `Да` | Добавлять закрывающие конструкции после выбора подсказки |
| `cmx.autocomplete.skeletons` | combo-boolean | `Да` | Вставлять каркасы блочных Fenom-тегов |
| `cmx.snippets` | textarea | пусто | Пользовательские фрагменты, по одному на строку: `метка :: вставляемый текст` |

Пример `cmx.snippets`:

```text
pdoResources :: [[!pdoResources? &parents=`0` &limit=`10` &tpl=``]]
```

## Связанные настройки MODX

| Ключ | Роль для CMX |
| --- | --- |
| `which_element_editor` | Значение `cmx` включает замену стандартных полей. Другое значение отключает редактор на формах; TV, история и регистрация имени RTE обрабатываются отдельно |
| `use_editor` | Включает ветку RTE для ресурса. Берётся контекстное значение, если оно есть |
| `which_editor` | Пустое значение и `cmx` допускают CMX у ресурса без richtext. Другое имя оставляет поле другому редактору или textarea |

### Необязательный `cmx.html_elements_mime`

Этот ключ не создаётся установщиком, но читается плагином. Создайте его вручную, если нужно принудительно задать MIME для шаблонов, обычных чанков и HTML-ресурсов:

- `text/html`;
- `text/x-smarty` - Fenom;
- `text/x-twig` - Twig.

Без ключа CMX выбирает Twig при заполненном `twiggy_class`, затем Fenom при включённом `pdotools_fenom_parser`, иначе HTML.

## Связанные разделы

- [Интеграция](integration)
- [Быстрый старт](quick-start)
- [Решение проблем](troubleshooting)
