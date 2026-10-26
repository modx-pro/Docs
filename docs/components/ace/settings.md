---
title: Системные настройки
---
# Системные настройки

Namespace: `ace`, area: `general`.

**Где изменить:** **Управление → Системные настройки** → фильтр по namespace `ace`.

При обновлении пакета ключи `ace.*` **не перезаписываются**. Исключения: пустой `ace.snippets` resolver заполняет набором по умолчанию. `which_element_editor` resolver ставит `Ace` при каждой установке и каждом обновлении, даже если раньше был другой редактор элементов.

## Внешний вид и редактор

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `ace.theme` | textfield | `chrome` | Имя модуля темы: `monokai`, `tomorrow_night`, `github`, `kr_theme`. В описании настройки kr указана как `kr`, рабочее значение `kr_theme` |
| `ace.font_size` | textfield | `13px` | Размер шрифта |
| `ace.word_wrap` | combo-boolean | — | Перенос длинных строк (также **Alt+Z**) |
| `ace.soft_tabs` | combo-boolean | `Да` | Пробелы вместо символа Tab |
| `ace.tab_size` | textfield | `4` | Ширина таба в пробелах |
| `ace.fold_widgets` | combo-boolean | `Да` | Кнопки сворачивания кода на gutter |
| `ace.show_invisibles` | combo-boolean | `Нет` | Пробелы, табы, концы строк |
| `ace.height` | textfield | пусто | Высота в px для элементов, файлов, `#ta` и буфера кэша. Пусто: высота поля Ext. TV Ace и `.modx-richtext` ключ не читают: высота поля или 200 |
| `ace.grow` | textfield | пусто | Подгонка высоты под текст. Пусто = выкл. Число > 0 = макс. высота. `0` = без лимита |

## Поведение

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `ace.auto_close_tags` | combo-boolean | `Да` | Автозакрытие скобок, кавычек, HTML/MODX-тегов |
| `ace.draft_restore` | combo-boolean | `Нет` | Черновики в localStorage. После перезагрузки предложение восстановить (TTL 7 дней) |
| `ace.color_preview` | combo-boolean | `Нет` | Подсветка `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb`/`rgba`, `hsl`/`hsla`. Mime: css, scss, less, html, smarty, twig, svg. До 2000 строк. PHP и JSON без превью |
| `ace.html_elements_mime` | textfield | пусто | MIME для шаблонов, чанков и HTML-ресурсов. Пусто: авто (`text/x-smarty` при Fenom pdoTools, `text/x-twig` при Twiggy, иначе `text/html`) |
| `ace.snippets` | textarea | пусто / defaults | Tab-сниппеты. При пустом значении на установке или обновлении resolver записывает набор по умолчанию |

## Связанные настройки MODX

| Ключ | Роль для Ace |
| --- | --- |
| `which_element_editor` | Значение, отличное от `Ace`, отключает плагин везде, кроме регистрации имени RTE. Пустая или отсутствующая настройка считается `Ace` |
| `use_editor` | Включает ветку RTE для ресурса. Берётся контекстное значение, если оно есть |
| `which_editor` | Пустое значение и `Ace` не считаются чужим RTE. Другое имя при `use_editor = Да` оставляет `#ta` обычным textarea, если richtext выключен |

## Пути

В пакет не входят. Создайте вручную, если ядро или assets лежат не в стандартном месте.

| Ключ | По умолчанию |
| --- | --- |
| `ace.core_path` | `{core_path}components/ace/` |
| `ace.assets_url` | `{assets_url}components/ace/` |

## Пример темы Material-like

[MODX Ace Material Theme](/faq/ace/modx-ace-material-theme): `tomorrow_night`, размер шрифта, плагин со стилями.

## Связанные разделы

- [Интеграция](integration)
- [Быстрый старт](quick-start)
- [Решение проблем](troubleshooting)
