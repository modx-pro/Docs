---
title: msBundles
description: Сниппет вывода комплектов на витрине
---

# msBundles

Рендерит HTML комплектов. Ставьте в шаблон товара или туда, где нужны карточки наборов.

## Порядок выбора

1. `bundle` > 0 — один комплект по ID. Если он неактивен и `activeOnly=1`, или `context_key` не совпадает с текущим контекстом запроса, результата нет.
2. Иначе непустой `bundles` — комплекты по списку ID (порядок как в параметре). ID из другого контекста пропускаются.
3. Иначе `list=all` — все комплекты **текущего контекста** (как в списке менеджера).
4. Иначе `product` > 0 — комплекты, где товар в составе, в текущем контексте.
5. Если ничего не подошло — `emptyTpl`.

При `msbundles_stock_behavior=hide` и недоступном остатке по обязательным позициям карточка не выводится. Режимы `block` и `message` оставляют карточку с модификаторами `--blocked` / `--warning`.

Без картинки у комплекта и при `imageFallback=1` берётся thumb первого товара состава.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product` | `0` | ID ресурса товара. Комплекты, куда он входит, в текущем контексте |
| `bundle` | `0` | ID одного комплекта (вместо `product`) |
| `bundles` | — | Список ID через запятую: `5,8,12` |
| `list` | — | `all` — все комплекты текущего контекста (как в списке менеджера) |
| `tpl` | `tplMsBundlesItem` | Чанк карточки |
| `wrapperTpl` | `tplMsBundlesList` | Обёртка списка |
| `emptyTpl` | `tplMsBundlesEmpty` | Пустой результат |
| `productTpl` | `tplMsBundlesProduct` | Строка состава |
| `imageFallback` | `0` | Нет картинки комплекта → thumb первого товара |
| `activeOnly` | `1` | Только активные |
| `quantity` | `1` | Число комплектов для цены и остатков |
| `toPlaceholder` | — | Имя плейсхолдера. Сниппет вернёт пустую строку |

## Примеры

На странице товара:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'product' => $_modx->resource.id,
  'tpl' => 'tplMsBundlesItem',
  'wrapperTpl' => 'tplMsBundlesList',
  'emptyTpl' => 'tplMsBundlesEmpty',
  'activeOnly' => true,
  'quantity' => 1
]}
```

```modx
[[!msBundles?
  &product=`[[*id]]`
  &tpl=`tplMsBundlesItem`
  &wrapperTpl=`tplMsBundlesList`
  &emptyTpl=`tplMsBundlesEmpty`
  &activeOnly=`1`
  &quantity=`1`
]]
```

:::

Один комплект по ID:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'bundle' => 5,
  'tpl' => 'tplMsBundlesItem',
  'wrapperTpl' => 'tplMsBundlesList'
]}
```

```modx
[[!msBundles?
  &bundle=`5`
  &tpl=`tplMsBundlesItem`
  &wrapperTpl=`tplMsBundlesList`
]]
```

:::

Несколько комплектов на лендинге:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'bundles' => '5,8,12',
  'wrapperTpl' => 'tplMsBundlesList',
  'tpl' => 'tplMsBundlesItem'
]}
```

```modx
[[!msBundles?
  &bundles=`5,8,12`
  &wrapperTpl=`tplMsBundlesList`
  &tpl=`tplMsBundlesItem`
]]
```

:::

Все активные комплекты текущего контекста:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'list' => 'all',
  'wrapperTpl' => 'tplMsBundlesList'
]}
```

```modx
[[!msBundles?
  &list=`all`
  &wrapperTpl=`tplMsBundlesList`
]]
```

:::

В плейсхолдер:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'product' => $_modx->resource.id,
  'toPlaceholder' => 'bundlesHtml'
]}
{$_modx->getPlaceholder('bundlesHtml')}
```

```modx
[[!msBundles?
  &product=`[[*id]]`
  &toPlaceholder=`bundlesHtml`
]]
[[+bundlesHtml]]
```

:::

Плейсхолдеры карточки и строк состава: [Вывод на сайте](/components/msbundles/frontend). Рядом всегда вызывайте [msBundles.initialize](msBundles.initialize).
