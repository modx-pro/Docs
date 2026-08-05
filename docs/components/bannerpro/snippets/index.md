---
title: Сниппеты
description: "Сниппеты BannerPro: вывод баннеров на сайте и ссылки на параметры"
---

# Сниппеты

В пакете один сниппет: **`BannerPro`**. Он выбирает баннеры по позициям, рендерит чанки через pdoTools и отдаёт HTML.

| Сниппет | Назначение | Документ |
| --- | --- | --- |
| `BannerPro` | Выводит баннеры по `position`, `positions`, `positionName` или `positionKey` | [BannerPro](BannerPro) |

Transport также ставит два чанка для быстрого старта:

| Чанк | Назначение |
| --- | --- |
| `byAd` | Баннер-изображение со ссылкой `[[+click_url]]` |
| `byHtml` | Вывод `[[+html]]` для `type=html` |

Подробнее о параметрах, плейсхолдерах и кастомных чанках: [BannerPro](BannerPro). Сценарии вывода на сайте: [Интеграция](../integration).

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

Используйте некэшированный вызов `[[!BannerPro]]` или `{'!BannerPro' | snippet : ...}`. Кэш готового HTML зависит от `bannerpro_cache`, `sortby` и параметров вызова (см. [Интеграция](../integration#кэш-html)).

Ротация через `RAND()`, `weighted` и `ab` обходит кэш. Фиксированный порядок `idx` использует `bannerpro_cache`.

## Что сниппет фильтрует сам

Поверх параметров вызова `BannerPro` всегда применяет:

- активность баннера (`active = 1`, если не `showInactive`);
- даты показа `start` / `end`;
- лимиты `max_clicks` и `max_impressions`;
- расписание `show_hours` и таргетинг `target_resource_id`, `target_parent_id`;
- контекст позиции (`context_key`);
- фильтр по меткам, если задан `tags` (баннеры без меток не попадут в выборку).

## Что дальше

- [BannerPro](BannerPro): параметры, плейсхолдеры, примеры чанков.
- [Интеграция](../integration): клики, показы, кэш, ротация.
- [MiniShop3](../minishop3): `productId` и плейсхолдеры `product_*`.
