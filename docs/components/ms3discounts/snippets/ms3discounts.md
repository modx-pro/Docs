---
title: Сниппет ms3discounts
description: Список активных акций с флагом show_in_catalog
---

# Сниппет ms3discounts

Без `product` выводит активные правила с `show_in_catalog`. С `product` считает правила, у которых включён `show_in_catalog` или `show_in_product`.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `return` | `data` | `data` — массив, `json` — строка JSON, `tpl` — чанки |
| `tpl` | `tpl.ms3discounts.list` при `return=tpl` | Чанк строки |
| `tplWrapper` | пусто | Обёртка: плейсхолдеры `output`, `count` |
| `product` | `0` | Id товара. `0` — только список акций |

При `return=tpl` сниппет подключает CSS/JS витрины из настроек.

## Поля строки (список акций)

| Поле | Смысл |
| --- | --- |
| `id` | Id правила |
| `name` | Название |
| `action_type` | Тип действия |
| `action_value` | Значение действия |
| `date_end` | Дата окончания или пусто |
| `remains` | Секунды до `date_end` или пусто |
| `description` | Текст, если у правила включён показ описания |

## Примеры

::: code-group

```fenom
{'!ms3discounts' | snippet : [
  'return' => 'tpl',
  'tpl' => 'tpl.ms3discounts.list',
]}
```

```modx
[[!ms3discounts?
  &return=`tpl`
  &tpl=`tpl.ms3discounts.list`
]]
```

:::
