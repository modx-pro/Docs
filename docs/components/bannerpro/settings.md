---
title: Системные настройки
description: "Настройки BannerPro: кэш, клики, показы, UTM, webhook, A/B, аналитика, MiniShop3, REST API и права доступа"
---

# Системные настройки

Все настройки лежат в namespace **`bannerpro`**. Ключ в `modSystemSetting` и `getOption()` пишется с префиксом `bannerpro_`.

## Кэш

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_cache` | combo-boolean | `true` | Кэширует готовый HTML сниппета в partition `bannerpro` |
| `bannerpro_cache_lifetime` | numberfield | `3600` | TTL кэша в секундах |

Сниппет не использует кэш при `sortby=RAND()`, `sortby=weighted`, `sortby=ab`, `&cache=0`, `&toSeparatePlaceholders` и `&showLog=1` в сессии `mgr`.

Ключ кэша включает **effective context** (`activeContext`): текущий контекст MODX или явный `&context=`. Два вызова с разным `context` на одной странице не делят один кэш.

При сохранении баннера или позиции админка сбрасывает кэш по тегу `bannerpro`.

## Клики и показы

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_click` | textfield | `bannerclick` | Сегмент URL для учёта клика |
| `bannerpro_track_impressions` | combo-boolean | `false` | Включает учёт показов через `impression.js` |
| `bannerpro_impression` | textfield | `bannerimpression` | Сегмент URL для pixel-показов |
| `bannerpro_impression_lazy` | combo-boolean | `true` | Подключает `impression.js` через IntersectionObserver, а не блокирующим `<script>` в head |

`bannerpro_click` формирует ссылку вида `/{bannerpro_click}/{adposition}`. `adposition` означает ID связи в `bannerpro_ads_positions`.

`bannerpro_track_impressions` добавляет HTML-обёртку `data-bannerpro-impression` и подключает скрипт `assets/components/bannerpro/js/impression.js`.

При `bannerpro_impression_lazy = 0` скрипт регистрируется синхронно в head страницы.

## Retention

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_clicks_retention_days` | numberfield | `365` | Удаляет клики старше N дней |
| `bannerpro_impressions_retention_days` | numberfield | `365` | Удаляет показы старше N дней |

Значение `0` отключает очистку. Для регулярной очистки запустите cron из корня MODX:

```bash
php core/components/bannerpro/cron/purge.php
```

## Медиа

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_media_source` | numberfield | пусто | Media Source по умолчанию для изображений |

Если у баннера задан свой источник файлов, компонент использует его. Иначе берёт `bannerpro_media_source`, затем `default_media_source`.

## Внешняя аналитика

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_analytics_enabled` | combo-boolean | `false` | Подключает клиентский мост `analytics.js` |
| `bannerpro_analytics_ga4` | combo-boolean | `true` | Отправляет события в `dataLayer` |
| `bannerpro_analytics_ga4_click` | textfield | `bannerpro_click` | Имя события GA4 для клика |
| `bannerpro_analytics_ga4_impression` | textfield | `bannerpro_impression` | Имя события GA4 для показа |
| `bannerpro_analytics_matomo` | combo-boolean | `true` | Отправляет события в Matomo через `_paq` |
| `bannerpro_analytics_ym_counter` | textfield | пусто | ID счётчика Яндекс Метрики |
| `bannerpro_analytics_ym_click_goal` | textfield | `bannerpro_click` | Цель Метрики для клика |
| `bannerpro_analytics_ym_impression_goal` | textfield | `bannerpro_impression` | Цель Метрики для показа |

Плагин **BannerProAnalytics** выключен по умолчанию. Для отправки во внешние системы включите плагин и настройку `bannerpro_analytics_enabled`.

Серверные события `OnBannerProClick` и `OnBannerProImpression` работают без этих настроек.

## MiniShop3

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_attribution_ttl` | numberfield | `30` | Срок cookie `bannerpro_click_id` в днях |

Cookie связывает клик по баннеру с заказом MiniShop3. Нужен включённый плагин **BannerProMiniShop3** на событии `msOnSubmitOrder`.

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_ms_catalog_positions` | textfield | пусто | Имена позиций через запятую для листинга MS3 (`catalog_row`, …). Плагин заполняет `bannerpro_positions` на каждом товаре |

Подробнее: [MiniShop3](minishop3).

## REST API

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_api_enabled` | combo-boolean | `false` | Включает read-only REST API |
| `bannerpro_api_key` | textfield | пусто | Bearer-токен для `api.php` |

**REST API ключ**: секрет для заголовка `Authorization: Bearer …` в `api.php`. Смотрите в **Система → Настройки системы** (namespace `bannerpro`, подпись «REST API ключ»). Resolver создаёт 32-символьный hex при установке или обновлении, если поле пустое. Эндпоинты и примеры `curl`: [REST API](development/rest-api#ключ-api).

Точка входа:

```text
assets/components/bannerpro/api.php
```

## UTM при клике

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_utm_enabled` | combo-boolean | `false` | Добавляет UTM к URL редиректа при клике |
| `bannerpro_utm_source` | textfield | `bannerpro` | Значение `utm_source` |
| `bannerpro_utm_medium` | textfield | `banner` | Значение `utm_medium` |
| `bannerpro_utm_campaign` | textfield | пусто | `utm_campaign`. Пусто: параметр не добавляют |
| `bannerpro_utm_content` | textfield | `{ad_id}-{adposition}` | Шаблон `utm_content` |

В `utm_campaign` и `utm_content` доступны плейсхолдеры: `{ad_id}`, `{position_id}`, `{adposition}`, `{product_id}`, `{product_pagetitle}`, `{order_id}`.

На clickout `{order_id}` всегда `0`, заказ ещё не создан. `{product_pagetitle}` берётся из `product_id` баннера.

Существующие UTM в URL баннера не перезаписываются. Настройки можно менять во вкладке **Настройки** админки BannerPro.

## Фильтр ботов

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_filter_bots` | combo-boolean | `false` | Не записывает клики и показы от ботов в статистику |

Soft-зависимость от дополнения **CrawlerDetect** (сниппет `isCrawler` или `crawlerdetect.core_path`). Без CrawlerDetect при включённой настройке компонент пишет предупреждение в лог MODX, фильтр не применяется. Редирект по клику и pixel показа работают как обычно.

| Настройка | CrawlerDetect | Поведение |
| --- | --- | --- |
| Выкл | нет | Все запросы попадают в статистику |
| Вкл | Установлен | Боты не пишутся в `byClick` / `byImpression` |
| Вкл | Нет | Warn в лог, статистика без фильтра |

## Webhook при клике

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_webhook_url` | textfield | пусто | URL для POST JSON при клике. Пусто: выключено |
| `bannerpro_webhook_secret` | textfield | пусто | Секрет для заголовка `X-BannerPro-Signature` (HMAC-SHA256). Пусто: без подписи |

Запрос отправляется после учёта клика и события `OnBannerProClick`, до редиректа. Timeout 2 с, ошибки не блокируют переход.

Тело JSON: `event` (`click`), `ad_id`, `position_id`, `adposition`, `referrer`, `ip`, `click_id`, `timestamp` (ISO8601), `redirect_url`, `recorded`, `duplicate`.

URL должен быть `http://` или `https://`. Запрещены `localhost`, loopback и private/reserved IP в hostname (защита от SSRF).

Проверка: [httpbin.org/post](https://httpbin.org/post) или локальный mock-сервер.

## Webhook при показе

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_webhook_impression_url` | textfield | пусто | URL для POST JSON при pixel-показе. Пусто: выключено |

Подпись совпадает с `bannerpro_webhook_secret` для клика. Компонент шлёт POST fire-and-forget после `OnBannerProImpression`, timeout 2 с. Ответ `204` не ждёт завершения запроса.

Тело JSON: `event` (`impression`), `ad_id`, `position_id`, `adposition`, `ip`, `timestamp` (ISO8601), `recorded`, `duplicate`.

Событие `OnBannerProImpression` работает без этой настройки. Webhook нужен только для внешнего HTTP-endpoint.

## A/B split

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_ab_ttl` | numberfield | `30` | Срок cookie `bannerpro_ab_{positionId}` при `&sortby=ab` (дней) |

Подробнее: [Интеграция](integration#a-b-split).

## Права доступа

| Permission | Что разрешает |
| --- | --- |
| `view` | Открывает страницу компонента в менеджере |
| `bannerpro_save` | Создаёт и редактирует баннеры, позиции, связи, веса и порядок |
| `bannerpro_remove` | Удаляет баннеры и позиции |
| `bannerpro_stats` | Показывает статистику, экспорт CSV и рефереры |

Без `bannerpro_save` интерфейс работает только на чтение. Мутации через connector вернут HTTP 403.

## Доступ в шаблонах

::: code-group

```fenom
{$_modx->config.bannerpro_click}
{$_modx->config.bannerpro_media_source}
{$_modx->config.bannerpro_cache}
{$_modx->config.bannerpro_cache_lifetime}
```

```modx
[[++bannerpro_click]]
[[++bannerpro_media_source]]
[[++bannerpro_cache]]
[[++bannerpro_cache_lifetime]]
```

:::

## Что дальше

- [Интеграция](integration): кэш, ротация, A/B, таргетинг, клики и показы.
- [Внешняя аналитика](analytics): GA4, Matomo, Яндекс Метрика.
- [REST API](development/rest-api): Bearer-токен и GET endpoints.
- [Админка](manager): вкладка «Настройки» для UTM, webhook и A/B.
