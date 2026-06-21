---
title: События MODX
description: "События BannerPro для разработчиков: OnBannerProClick, OnBannerProImpression и connector actions"
---

# События MODX

BannerPro вызывает события после клика и после фиксации показа. Используйте их для своей аналитики, CRM, антифрода или логирования.

## События

| Событие | Где вызывается | Когда |
| --- | --- | --- |
| `OnBannerProClick` | `bannerpro_invoke_click_event()` | После обработки клика, перед redirect |
| `OnBannerProImpression` | `bannerpro_invoke_impression_event()` | После pixel-запроса показа |

Код событий лежит в `core/components/bannerpro/include/events.php`.

## Payload

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
| Баннеры | `ads_getlist`, `ads_get`, `ads_create`, `ads_update`, `ads_remove`, `ads_enable`, `ads_disable`, `ads_getclicks` |
| Позиции | `positions_getlist`, `positions_create`, `positions_update`, `positions_remove` |
| Связи | `adpositions_getlist`, `adpositions_add`, `adpositions_remove`, `adpositions_sort`, `adpositions_update_weight` |
| Статистика | `stats_summary`, `stats_by_day`, `stats_top_ads`, `stats_export`, `stats_purge`, `clicks_getreferrers` |
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

Поле `byAdPosition.id` попадает в плейсхолдер `adposition` и используется в ссылке клика.
