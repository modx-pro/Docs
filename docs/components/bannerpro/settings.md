---
title: Системные настройки
description: "Настройки BannerPro: кэш, клики, показы, аналитика, MiniShop3, REST API и права доступа"
---

# Системные настройки

Все настройки лежат в namespace **`bannerpro`**. Ключ в `modSystemSetting` и `getOption()` пишется с префиксом `bannerpro_`.

## Кэш

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_cache` | combo-boolean | `true` | Кэширует готовый HTML сниппета в partition `bannerpro` |
| `bannerpro_cache_lifetime` | numberfield | `3600` | TTL кэша в секундах |

Сниппет не использует кэш при `sortby=RAND()`, `sortby=weighted`, `&cache=0`, `&toSeparatePlaceholders` и `&showLog=1` в сессии `mgr`.

При сохранении баннера или позиции админка сбрасывает кэш по тегу `bannerpro`.

## Клики и показы

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_click` | textfield | `bannerclick` | Сегмент URL для учёта клика |
| `bannerpro_track_impressions` | combo-boolean | `false` | Включает учёт показов через `impression.js` |
| `bannerpro_impression` | textfield | `bannerimpression` | Сегмент URL для pixel-показов |

`bannerpro_click` формирует ссылку вида `/{bannerpro_click}/{adposition}`. `adposition` означает ID связи в `bannerpro_ads_positions`.

`bannerpro_track_impressions` добавляет HTML-обёртку `data-bannerpro-impression` и подключает скрипт `assets/components/bannerpro/js/impression.js`.

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

## REST API

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `bannerpro_api_enabled` | combo-boolean | `false` | Включает read-only REST API |
| `bannerpro_api_key` | textfield | пусто | Bearer-токен для `api.php` |

**REST API ключ** — секрет для заголовка `Authorization: Bearer …` в `api.php`. Смотрите в **Система → Настройки системы** (namespace `bannerpro`, подпись «REST API ключ»). Resolver создаёт 32-символьный hex при установке или обновлении, если поле пустое. Эндпоинты и примеры `curl`: [REST API](development/rest-api#ключ-api).

Точка входа:

```text
assets/components/bannerpro/api.php
```

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

- [Интеграция](integration): кэш, ротация, лимиты, клики и показы.
- [Внешняя аналитика](analytics): GA4, Matomo, Яндекс Метрика.
- [REST API](development/rest-api): Bearer-токен и GET endpoints.
