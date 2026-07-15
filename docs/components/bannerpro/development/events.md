---
title: События MODX
description: "События BannerPro для разработчиков: OnBannerProClick, OnBannerProImpression и connector actions"
---

# События MODX

BannerPro вызывает события после клика и после фиксации показа. Используйте их для своей аналитики, CRM, антифрода или логирования.

## События

| Событие | Где вызывается | Когда |
| --- | --- | --- |
| `OnBannerProClick` | `bannerpro_invoke_click_event()` | После обработки клика, перед перенаправлением |
| `OnBannerProImpression` | `bannerpro_invoke_impression_event()` | После pixel-запроса показа |

Код событий лежит в `core/components/bannerpro/include/events.php`.

## Поля события

| Ключ | Тип | Описание |
| --- | --- | --- |
| `ad` | `byAd\|null` | Объект баннера |
| `ad_id` | int | ID баннера |
| `ad_name` | string | Название |
| `ad_url` | string | URL перехода |
| `ad_type` | string | `image` или `html` |
| `product_id` | int | ID товара MiniShop3 или `0` |
| `position` | int | ID позиции |
| `position_name` | string | Имя позиции |
| `adposition` | int | ID связи `bannerpro_ads_positions` |
| `ip` | string | IP посетителя |
| `recorded` | bool | Запись создана в таблице статистики |
| `duplicate` | bool | Событие повторилось в тот же день |
| `referrer` | string | HTTP Referer, только для клика |
| `redirect_url` | string | URL после обработки чанка, только для клика |

## Пример плагина

```php
<?php

if ($modx->event->name !== 'OnBannerProClick') {
    return;
}

$adName = (string) ($scriptProperties['ad_name'] ?? '');
$positionName = (string) ($scriptProperties['position_name'] ?? '');

$modx->log(
    modX::LOG_LEVEL_INFO,
    'BannerPro click: ' . $adName . ' / ' . $positionName
);
```

Подпишите плагин на `OnBannerProClick`.

## HTTP webhook

Параллельно с MODX-событиями компонент может отправлять POST JSON на внешний URL. Настройки: [Системные настройки](../settings#webhook-при-клике).

| Тип | Настройка URL | Поле `event` |
| --- | --- | --- |
| Клик | `bannerpro_webhook_url` | `click` |
| Показ | `bannerpro_webhook_impression_url` | `impression` |

Подпись: заголовок `X-BannerPro-Signature` (HMAC-SHA256 от тела), если задан `bannerpro_webhook_secret`.

Компонент шлёт webhook клика после `OnBannerProClick`, до редиректа. Timeout 2 с, ошибки не блокируют переход. Webhook показа отправляется без ожидания ответа после `OnBannerProImpression`.

URL проверяется на SSRF: запрещены `localhost`, loopback и private/reserved IP в hostname.

### JSON клика

`event`, `ad_id`, `position_id`, `adposition`, `referrer`, `ip`, `click_id`, `timestamp` (ISO8601), `redirect_url`, `recorded`, `duplicate`.

### JSON показа

`event`, `ad_id`, `position_id`, `adposition`, `ip`, `timestamp` (ISO8601), `recorded`, `duplicate`.

## Клиентские события

`impression.js` отправляет `bannerpro:impression`. `analytics.js` перехватывает клики и может отправлять `bannerpro:click`.

```javascript
document.addEventListener('bannerpro:impression', function (event) {
  console.log(event.detail.adposition)
})
```

## Connector actions

Админка обращается к `assets/components/bannerpro/connector.php` методом `POST`. Параметр `action` выбирает обработчик.

| Группа | Actions |
| --- | --- |
| Баннеры | `ads_getlist`, `ads_get`, `ads_create`, `ads_update`, `ads_remove`, `ads_enable`, `ads_disable`, `ads_getclicks`, `ads_duplicate`, `ads_bulk_enable`, `ads_bulk_disable`, `ads_bulk_remove`, `ads_bulk_assign_positions`, `ads_create_from_template` |
| Шаблоны | `ad_templates_getlist` |
| Позиции | `positions_getlist`, `positions_create`, `positions_update`, `positions_remove`, `positions_duplicate` |
| Связи | `adpositions_getlist`, `adpositions_add`, `adpositions_remove`, `adpositions_sort`, `adpositions_update_weight` |
| Статистика | `stats_summary`, `stats_by_day`, `stats_by_weekday`, `stats_top_ads`, `stats_export`, `stats_purge`, `stats_compare`, `clicks_getreferrers` |
| Журнал | `audit_getlist` |
| Метки | `tags_suggest` |
| Настройки | `settings_integrations_get`, `settings_integrations_update` |
| MiniShop3 | `resource_getlist` |

Connector требует сессию `mgr`. Мутации проверяют `bannerpro_save`, `bannerpro_remove` или `bannerpro_stats`.

## Модель данных

| Класс xPDO | Таблица |
| --- | --- |
| `byAd` | `bannerpro_ads` |
| `byPosition` | `bannerpro_positions` |
| `byAdPosition` | `bannerpro_ads_positions` |
| `byClick` | `bannerpro_clicks` |
| `byImpression` | `bannerpro_impressions` |
| `byAdTemplate` | `bannerpro_ad_templates` |
| `byAudit` | `bannerpro_audit` |

Поле `byAdPosition.id` попадает в плейсхолдер `adposition` и используется в ссылке клика.

Поля баннера `byAd`: `category_id`, `max_clicks`, `max_impressions`, `show_hours` (JSON), `target_resource_id`, `target_parent_id`, `tags` (JSON). Позиция `byPosition`: `context_key`.
