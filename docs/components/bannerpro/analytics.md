---
title: Внешняя аналитика
description: "BannerProAnalytics, GA4, Matomo, Яндекс Метрика и события bannerpro:click / bannerpro:impression"
---

# Внешняя аналитика

BannerPro вызывает серверные события MODX и браузерные события для кликов и показов. Плагин **BannerProAnalytics** отправляет эти события в GA4, Matomo и Яндекс Метрику.

## Что включено в ядро

| Уровень | Событие | Когда срабатывает |
| --- | --- | --- |
| MODX | `OnBannerProClick` | Перед redirect после клика |
| MODX | `OnBannerProImpression` | После pixel-запроса показа |
| Browser | `bannerpro:click` | При клике по ссылке баннера, если загружен `analytics.js` |
| Browser | `bannerpro:impression` | При показе баннера, если включён `impression.js` |

Серверные события работают без `BannerProAnalytics`.

## Плагин BannerProAnalytics

Плагин выключен по умолчанию. Для включения:

1. Откройте **Элементы → Плагины**.
2. Включите **BannerProAnalytics**.
3. В системных настройках включите `bannerpro_analytics_enabled`.
4. Убедитесь, что на странице уже есть GA4/GTM, Matomo или Яндекс Метрика.

Плагин подключает `assets/components/bannerpro/js/analytics.js` на событии `OnLoadWebDocument`.

## Настройки

| Ключ | По умолчанию | Роль |
| --- | --- | --- |
| `bannerpro_analytics_enabled` | `false` | Подключает клиентский мост |
| `bannerpro_analytics_ga4` | `true` | Включает `dataLayer.push` |
| `bannerpro_analytics_ga4_click` | `bannerpro_click` | Имя события клика GA4 |
| `bannerpro_analytics_ga4_impression` | `bannerpro_impression` | Имя события показа GA4 |
| `bannerpro_analytics_matomo` | `true` | Включает `_paq.push(['trackEvent', ...])` |
| `bannerpro_analytics_ym_counter` | пусто | ID счётчика Метрики |
| `bannerpro_analytics_ym_click_goal` | `bannerpro_click` | Цель клика в Метрике |
| `bannerpro_analytics_ym_impression_goal` | `bannerpro_impression` | Цель показа в Метрике |

## Что отправляется

| Система | Клик | Показ |
| --- | --- | --- |
| GA4 / GTM | `dataLayer.push({ event: 'bannerpro_click', ... })` | `event: 'bannerpro_impression'` |
| Matomo | `_paq.push(['trackEvent', 'BannerPro', 'click', ...])` | `action = impression` |
| Яндекс Метрика | `ym(ID, 'reachGoal', 'bannerpro_click', params)` | `bannerpro_impression` |

Для GA4 через GTM создайте триггеры на события `bannerpro_click` и `bannerpro_impression`.

## Параметры события

| Ключ | Что содержит |
| --- | --- |
| `ad_id` | ID баннера |
| `ad_name` | Название |
| `ad_url` | URL перехода |
| `ad_type` | `image` или `html` |
| `product_id` | ID товара MiniShop3 или `0` |
| `position` | ID позиции |
| `position_name` | Имя позиции |
| `adposition` | ID связи баннер + позиция |
| `ip` | IP посетителя, только сервер |
| `recorded` | Запись создана в БД |
| `duplicate` | Дубликат за сутки |
| `referrer` | HTTP Referer, только клик |
| `redirect_url` | URL после обработки чанка, только клик |

## Свой браузерный обработчик

```javascript
document.addEventListener('bannerpro:impression', function (event) {
  console.log(event.detail)
})
```

Если `analytics.js` загрузился после `impression.js`, показы попадают в `window.bannerproImpressionQueue` и обрабатываются при инициализации моста.

## Свой серверный плагин

Создайте плагин MODX и подпишите его на `OnBannerProClick` или `OnBannerProImpression`.

```php
if ($modx->event->name === 'OnBannerProClick') {
    $modx->log(modX::LOG_LEVEL_INFO, 'Banner click: ' . $scriptProperties['ad_name']);
}
```

## Диагностика

| Симптом | Что проверить |
| --- | --- |
| `analytics.js` не подключился | Плагин `BannerProAnalytics`, `bannerpro_analytics_enabled`, контекст `web` |
| GA4 не получает событие | На странице есть `dataLayer`, имя события совпадает с GTM-триггером |
| Matomo не получает событие | На странице есть `_paq` |
| Метрика не получает цель | `bannerpro_analytics_ym_counter` и цель JavaScript-события |
| Показы не приходят | `bannerpro_track_impressions`, `BannerProImpression`, видимость баннера в viewport |
