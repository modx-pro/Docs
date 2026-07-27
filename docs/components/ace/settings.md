---
title: Системные настройки
---
# Системные настройки

Namespace: `ace`, area: `general`.

**Где изменить:** **Управление → Системные настройки** → фильтр по namespace `ace`.

При обновлении пакета существующие значения **не перезаписываются**, кроме логики resolver для пустого `ace.snippets` (см. ниже).

## Внешний вид и редактор

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `ace.theme` | textfield | `chrome` | Тема Ace: `monokai`, `tomorrow_night`, `github`, `solarized_dark`, … (полный список в описании настройки) |
| `ace.font_size` | textfield | `13px` | Размер шрифта |
| `ace.word_wrap` | combo-boolean | — | Перенос длинных строк (также **Alt+Z**) |
| `ace.soft_tabs` | combo-boolean | `Да` | Пробелы вместо символа Tab |
| `ace.tab_size` | textfield | `4` | Ширина таба в пробелах |
| `ace.fold_widgets` | combo-boolean | `Да` | Кнопки сворачивания кода на gutter |
| `ace.show_invisibles` | combo-boolean | `Нет` | Пробелы, табы, концы строк |
| `ace.height` | textfield | пусто | Высота редактора в px; пусто: высота по умолчанию |
| `ace.grow` | textfield | пусто | Подгонка высоты под текст: пусто = выкл.; число > 0 = макс. высота; `0` = без лимита |

## Поведение

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `ace.auto_close_tags` | combo-boolean | `Да` | Автозакрытие скобок, кавычек, HTML/MODX-тегов |
| `ace.draft_restore` | combo-boolean | `Нет` | Черновики в localStorage; предложение восстановить после перезагрузки (TTL 7 дней) |
| `ace.color_preview` | combo-boolean | `Нет` | Подсветка `#hex`, `rgb()`, `hsl()` в CSS/HTML (до 2000 строк) |
| `ace.html_elements_mime` | textfield | пусто | MIME для шаблонов, чанков и HTML-ресурсов. Пусто: авто (`text/x-smarty` при Fenom pdoTools, `text/x-twig` при Twiggy, иначе `text/html`) |
| `ace.snippets` | textarea | пусто / defaults | Tab-сниппеты. На чистой установке/апгрейде при пустом значении resolver записывает набор по умолчанию |

## Связанные настройки MODX

| Ключ | Роль для Ace |
| --- | --- |
| `which_element_editor` | Должен быть `Ace`, иначе плагин не инициализирует редактор на формах элементов |
| `use_editor` | Включает RTE-логику для ресурсов (контекстное значение имеет приоритет) |
| `which_editor` | Имя RTE для ресурсов. Если не `Ace` и `use_editor = Да`, Ace не трогает `#ta` |

## Пример темы Material-like

[MODX Ace Material Theme](/faq/ace/modx-ace-material-theme): `tomorrow_night`, размер шрифта, плагин со стилями.

## Связанные разделы

- [Интеграция](integration)
- [Быстрый старт](quick-start)
- [Решение проблем](troubleshooting)
