---
title: Сниппет ms3discounts
description: Список активных акций или расчет всех подходящих скидок для товара
---

# Сниппет ms3discounts

Сниппет решает две задачи:

1. Выводит список действующих акций каталога (когда параметр `product` равен `0`).
2. Возвращает все подходящие скидки для одного товара (когда передан ID товара в `product`).

```mermaid
flowchart TD
  Call["Вызов '!ms3discounts'"] --> Param{"Параметр product > 0?"}
  Param -->|Нет (product = 0)| List["Список акций каталога<br>(акции с show_in_catalog)"]
  Param -->|Да (product > 0)| Product["Все скидки товара<br>(акции с show_in_catalog или show_in_product)"]
```

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `return` | `data` | Формат вывода: `data` — массив PHP, `json` — JSON-строка, `tpl` — готовая HTML-разметка через чанки |
| `tpl` | `tpl.ms3discounts.list` при `return=tpl` | Имя чанка строки |
| `tplWrapper` | пусто | Чанк-обёртка для всего списка. Доступны плейсхолдеры `[[+output]]` и `[[+count]]` |
| `product` | `0` | ID товара. При значении `0` выводит список акций. При `product > 0` возвращает скидки указанного товара |
| `frontend_css` | пусто | Путь к CSS-файлу витрины. При `return=tpl` подключается автоматически из системной настройки `ms3discounts_frontend_css` |
| `frontend_js` | пусто | Путь к JS-файлу таймера. При `return=tpl` подключается автоматически из настройки `ms3discounts_frontend_js` |

## Поля в списке акций (при product = 0)

Сниппет отбирает активные акции с включённым флагом `show_in_catalog`.

| Поле | Смысл |
| --- | --- |
| `id` | ID правила скидки |
| `name` | Название акции |
| `action_type` | Тип действия (`percent`, `fixed`, `fixed_price`, `nth`, `gift`) |
| `action_value` | Числовое значение скидки |
| `date_end` | Дата окончания в формате `YYYY-MM-DD HH:mm:ss` |
| `remains` | Количество секунд до завершения акции |
| `description` | Описание акции (заполняется, только если включён флаг «Показывать описание») |
| `idx` | Порядковый номер строки начиная с 0 (при `return=tpl`) |

## Поля при расчете для товара (при product > 0)

Сниппет отбирает акции, у которых включён флаг `show_in_catalog` или `show_in_product`, и которые подходят под параметры товара, группы текущего пользователя и активные скидки.

| Поле | Смысл |
| --- | --- |
| `id` | ID правила скидки |
| `name` | Название акции |
| `percent` | Итоговый процент скидки |
| `price` | Цена товара после применения скидки |
| `base_price` | Исходная цена товара до скидки |
| `discount` | Сумма скидки в валюте магазина |
| `sale_discount` | Значение скидки (процент, если он больше нуля, иначе сумма) |
| `remains` | Количество секунд до завершения акции |
| `date_end` | Дата окончания акции |
| `potential` | Статус проверки условий корзины (`true`, если есть невыполненные условия) |
| `idx` | Порядковый номер строки начиная с 0 (при `return=tpl`) |

## Примеры вызова

Вывод списка акций через чанк:

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

Получение массива скидок для товара в Fenom:

```fenom
{set $discounts = '!ms3discounts' | snippet : [
  'product' => $_modx->resource.id,
  'return' => 'data',
]}

{foreach $discounts as $discount}
  <div class="discount-badge">{$discount.name}: -{$discount.sale_discount}%</div>
{/foreach}
```
