---
title: Быстрый старт
---
# Быстрый старт

## Шаг 1. Установка

1. Установите **Ace** через **Extras → Installer** ([обзор](index#установка))
2. Очистите кэш MODX
3. Убедитесь, что плагин **Ace** активен

## Шаг 2. Редактор для элементов

`which_element_editor` = **Ace**.

Откройте сниппет, чанк, шаблон или плагин: поле кода станет редактором Ace с подсветкой.

## Шаг 3. Код в ресурсах

Учитываются **контекстные** значения `use_editor` и `which_editor`:

| Цель | Настройки |
| --- | --- |
| Ace в поле content у всех ресурсов | `use_editor = Нет`. Тогда же заменяются textarea с классом `modx-richtext` |
| Ace только у ресурсов без richtext | `use_editor = Да`, `which_editor` пустой или `Ace`, richtext выключен |
| TinyMCE / другой RTE | `use_editor = Да`, `which_editor` не `Ace`, у ресурса включён richtext |
| Textarea без Ace | `use_editor = Да`, `which_editor` не `Ace`, richtext выключен |

`which_editor = Ace` при включённом `use_editor` и richtext само по себе Ace на `#ta` не ставит. Подробнее: [Интеграция](integration#ресурсы-и-rte).

## Шаг 4. Проверка

1. Откройте сниппет: есть подсветка PHP
2. Нажмите **Ctrl+Alt+H**: таблица горячих клавиш
3. Введите `getr` и Tab: развернётся шаблон getResources (если `ace.snippets` заполнен)

## Чеклист

- [ ] `which_element_editor = Ace`
- [ ] Сниппеты/чанки открываются в Ace
- [ ] Для ресурсов настроена связка `use_editor` / `which_editor` под вашу схему
- [ ] Тема и размер шрифта заданы в namespace `ace` ([настройки](settings))

## Что дальше

- [Системные настройки](settings)
- [Интеграция](integration): Tab-сниппеты, mime Fenom/Twig, TV Ace
- [Горячие клавиши](hotkeys)
