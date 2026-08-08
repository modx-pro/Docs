---
title: Сниппеты
description: Обзор сниппета и чанков ms3OptionsColor
---

# Сниппеты

В пакете один сниппет для витрины. Чанки подключаются параметром `tpl` или вызываются отдельно (select, корзина, mFilter).

| Сниппет | Назначение |
| --- | --- |
| [ms3OptionsColor](ms3OptionsColor) | Свотчи, option для select, массив `return=data` |

## Чанки пакета

| Чанк | Когда нужен |
| --- | --- |
| `tplMs3OptionsColor` | Квадрат цвета на карточке товара и в каталоге (по умолчанию у сниппета) |
| `tplMs3OptionsColorSelect` | Готовый `<select>` с подписью и option-строками |
| `tplMs3OptionsColorSelectOption` | Одна `<option>` с `data-color` / `data-pattern` |
| `tplMs3OptionsColorCart` | Пример блока цвета в строке корзины |
| `tplMFilterMs3OptionsColor` | Ряд фильтра mFilter типа `ms3oc` |

Штатные чанки на Fenom. Стили завязаны на `data-ms3oc-*`, не на имена CSS-классов темы.

## С чего начать

1. Параметры и примеры вызова: [ms3OptionsColor](ms3OptionsColor)
2. Страница товара, select, корзина, каталог: [Вывод на сайте](/components/ms3optionscolor/frontend)
3. Фильтр `ms3oc`: [mFilter](/components/ms3optionscolor/mfilter)
4. Цвета вариантов: [ms3variants](/components/ms3optionscolor/ms3variants)
5. Ключ опции по умолчанию: [Системные настройки](/components/ms3optionscolor/settings)
