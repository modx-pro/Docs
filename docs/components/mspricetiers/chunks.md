---
title: Чанки
description: Чанки mspricetiers_* для таблицы порогов, прогресс-бара и компактного вида
---

# Чанки msPriceTiers

Все чанки в пакете — **Fenom** (`@FILE` в сниппетах). Имена без префикса `@` в параметрах сниппета: `mspricetiers.table`.

## Таблица порогов

| Чанк | Назначение |
|------|------------|
| `mspricetiers.table` | Обёртка `<table>` |
| `mspricetiers.row` | Строка таблицы |

Параметры сниппета: `tpl`, `tplRow` — см. [msPriceTiers](snippets/msPriceTiers).

## Компактный вид (каталог)

| Чанк | Назначение |
|------|------------|
| `mspricetiers.compact` | Компактная обёртка |
| `mspricetiers.row_compact` | Строка компактного вида |
| `mspricetiers.badge` | Бейдж «Оптовые цены» |

## Детальная таблица

| Чанк | Назначение |
|------|------------|
| `mspricetiers.detailed` | Расширенная обёртка с экономией |
| `mspricetiers.row_detailed` | Строка с полем экономии |

## Прогресс-бар

| Чанк | Сниппет | Назначение |
|------|---------|------------|
| `mspricetiers.progress` | msPriceTiersProgress | Страница товара |
| `mspricetiers.progress_cart` | msPriceTiersProgress, `cart=1` | Корзина, пороги по количеству |
| `mspricetiers.progress_cart_sum` | msPriceTiersProgress, `cartSum=1` | Корзина, пороги по сумме заказа |
| `mspricetiers.progress_popup` | msPriceTiersProgress | Компактная подсказка |

### Lexicon в progress

| Ключ | Плейсхолдеры |
|------|--------------|
| `mspricetiers_hint_until_next` | `{count}` |
| `mspricetiers_cart_sum_add_more` | `{amount}`, `{discount}` |

JS получает шаблоны через `msPriceTiersConfig.messages` и подставляет числа в `{count}`.

## Пример строки (Fenom)

Фрагмент `mspricetiers.row`:

```fenom
<tr class="mspricetiers-row" data-count-from="{$count_from}" data-price="{$price}">
  <td class="mspricetiers-quantity">{$count_from}+</td>
  <td class="mspricetiers-price">{$price_formatted}</td>
  <td class="mspricetiers-old-price">{$old_price_formatted}</td>
</tr>
```

## Кастомные чанки

Скопируйте чанки в тему и укажите в сниппете:

::: code-group

```fenom
{'!msPriceTiers' | snippet : [
  'product' => $_modx->resource.id,
  'tpl' => 'my.tiers.table',
  'tplRow' => 'my.tiers.row'
]}
```

```modx
[[!msPriceTiers?
  &product=`[[*id]]`
  &tpl=`my.tiers.table`
  &tplRow=`my.tiers.row`
]]
```

:::

Стилизация — через CSS-переменные `--mspt-*`, см. [Подключение на сайте](frontend#css-переменные).

## Лексикон

Ключи `mspricetiers_*` в `core/components/mspricetiers/lexicon/ru/default.inc.php` (и `en`).

## См. также

- [Сниппеты](snippets/index)
- [Подключение на сайте](frontend)
