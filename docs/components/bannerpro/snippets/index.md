---
title: Сниппеты
description: "Сниппеты BannerPro: вывод баннеров на сайте и ссылки на параметры"
---

# Сниппеты

В transport входит один сниппет: **`BannerPro`**. Он выбирает баннеры по позициям, рендерит чанки через pdoTools и отдаёт HTML.

| Сниппет | Назначение | Документ |
| --- | --- | --- |
| `BannerPro` | Выводит баннеры по `position`, `positions`, `positionName` или `positionKey` | [BannerPro](BannerPro) |

## Базовый вызов

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'limit' => 3
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &limit=`3`
]]
```

:::

## Когда вызывать некэшированным

Используйте некэшированный вызов `[[!BannerPro]]` или `{'!BannerPro' | snippet : ...}`. Компонент сам решает, можно ли кэшировать готовый HTML.

Ротация через `RAND()` и `weighted` обходит кэш. Фиксированный порядок `idx` использует `bannerpro_cache`.

## Что дальше

- [BannerPro](BannerPro): параметры, плейсхолдеры, примеры чанков.
- [Интеграция](../integration): клики, показы, кэш, ротация.
- [MiniShop3](../minishop3): `productId` и плейсхолдеры `product_*`.
