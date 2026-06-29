---
title: FAQ
description: "Частые вопросы по BannerPro: пустой вывод, клики, показы, VueTools, MiniShop3 и REST API"
---

# FAQ

## Баннеры не выводятся на сайте

Проверьте pdoTools, имя позиции, активность баннера, даты показа и связь баннера с позицией. Затем контекст, таргетинг и A/B:

- **Контекст позиции**: при заполненном `context_key` баннеры видны только в этом контексте MODX. Пустое поле: все контексты. В сниппете передайте `&context=` для явной проверки.
- **Таргетинг**: `show_hours`, `target_resource_id`, `target_parent_id`, метки (`&tags=`), лимиты `max_clicks` / `max_impressions`.
- **A/B**: при `sortby=ab` в слоте нужны ровно 2 баннера. Иначе выводятся все подходящие без split.

Минимальный debug-вызов:

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'showLog' => true
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &showLog=`1`
]]
```

:::

`showLog` работает только для пользователя с активной сессией `mgr`.

## Сниппет пишет, что нужен pdoTools

Установите **pdoTools** и очистите кэш MODX.

Текст ошибки:

```text
You need to install pdoTools to use this snippet!
```

## Картинки не отображаются

Проверьте `bannerpro_media_source`, источник файлов у конкретного баннера и путь в поле `image`.

Если баннер использует свой Media Source, настройка `bannerpro_media_source` не влияет на этот баннер.

## Клики не считаются

Проверьте пять пунктов:

1. Плагин **BannerProClickout** включён на `OnPageNotFound`.
2. Чанк ведёт на `[[+click_url]]` / `{$click_url}`, не на прямой URL баннера.
3. `adposition` означает ID связи `bannerpro_ads_positions`.
4. Friendly URL не перехватывает путь раньше MODX.
5. **Фильтр ботов**: при `bannerpro_filter_bots = Да` клики с User-Agent ботов не записываются. Нужен пакет CrawlerDetect; без него фильтр не срабатывает.

Повторный клик с того же IP за сутки на ту же пару баннер + позиция не увеличивает счётчик. Redirect всё равно работает.

## Статистика занижена из-за ботов

Настройка **Фильтр ботов** (`bannerpro_filter_bots`) исключает из статистики запросы, определённые как боты. Установите [CrawlerDetect](https://modstore.pro/packages/other/crawlerdetect) и включите настройку. Исторические данные не пересчитываются.

## Баннер активен, но не виден на сайте

1. Проверьте **start** / **end** (календарный период).
2. **Расписание** `show_hours`: дни недели и часы; вне слота баннер скрыт.
3. **Таргетинг**: `target_resource_id` / `target_parent_id` ограничивают страницы.
4. **Метки**: при `&tags=` в сниппете баннер без нужных меток не попадёт в выборку.
5. Лимиты `max_clicks` / `max_impressions` скрывают баннер при достижении порога.

## Контекст MODX и позиция

Если у позиции заполнен `context_key`, баннеры этой позиции выводятся только в указанном контексте. Параметр сниппета `&context=` сверяет активный контекст с полем позиции. Подробнее: [Интеграция](integration#контекст-позиции).

## Показы не считаются

Проверьте `bannerpro_track_impressions`, плагин **BannerProImpression** и наличие `impression.js` на странице.

Компонент фиксирует показ, когда баннер попадает в viewport. Повтор с того же IP за сутки не создаёт новую запись.

При `bannerpro_impression_lazy = Да` pixel отправляется после задержки в viewport, а не сразу при появлении.

## A/B split не работает

Параметр `sortby=ab` делит трафик 50/50 только если в позиции **ровно два** активных баннера. Иначе выводятся все подходящие без cookie split.

Проверьте:

1. В слоте два баннера, оба проходят фильтры (даты, таргетинг, лимиты).
2. Кэш сниппета: ключ кэша включает вариант A/B. Не кэшируйте вывод с `sortby=ab` глобально на всех пользователей.
3. TTL cookie: `bannerpro_ab_ttl` (дней, по умолчанию 30).

Подробнее: [Интеграция](integration#ab-split-sortbyab).

## Webhook на клик не срабатывает

1. `bannerpro_webhook_url` задан и начинается с `http://` или `https://`.
2. URL не указывает на `localhost`, `127.0.0.1` или private IP.
3. Проверьте лог MODX на `[bannerpro] Webhook failed`.
4. Редирект не ждёт ответа webhook; timeout 2 с.

Для отладки можно временно указать URL [httpbin.org](https://httpbin.org/post) и проверить входящий JSON.

Подробнее: [Системные настройки](settings#webhook-при-клике).

## Webhook на показ не срабатывает

1. Заполните `bannerpro_webhook_impression_url`.
2. Включён учёт показов: `bannerpro_track_impressions`.
3. Те же SSRF-ограничения, что и для клика.
4. Payload содержит `event: impression`. Подпись в заголовке `X-BannerPro-Signature`, если задан secret.

Альтернатива webhook: [внешняя аналитика](analytics) (GTM, Метрика) или событие `OnBannerProImpression`.

## Lead-форма через FormIt

BannerPro не ставит FormIt. Схема: HTML-баннер с `click_url` → landing с FormIt. Пошагово: [FormIt](formit).

## Админка пустая

Проверьте **VueTools**, право `view`, консоль браузера и файл:

```text
assets/components/bannerpro/js/mgr/vue-dist/bannerpro-admin.min.js
```

Если вы собираете transport из исходников, перед сборкой выполните `npm run build`.

## Вкладка «Статистика» не видна

Пользователю нужно право `bannerpro_stats`. Назначьте его в политике доступа MODX и перезайдите в менеджер.

## Кнопки создания и редактирования скрыты

Пользователю нужно право `bannerpro_save`. Для удаления нужно `bannerpro_remove`.

## HTML-баннер идёт без ссылки

У HTML-баннера должен быть заполнен URL. Если URL пустой, компонент выводит сырой HTML без обёртки ссылки.

## Как вывести баннеры по имени позиции

Используйте `positionName`.

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd'
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
]]
```

:::

Если заданы `position` и `positionName`, приоритет у `position`.

## Как вывести произвольный HTML

В форме баннера выберите тип **HTML** и заполните поле HTML. Сниппет выведет его через `byHtml` или через ваш `tplHtml`.

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tplHtml' => 'byHtml'
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tplHtml=`byHtml`
]]
```

:::

Если URL заполнен, BannerPro обернёт HTML в ссылку клика.

## Баннеры MiniShop3 не показываются на карточке товара

Передайте `productId` в сниппет и проверьте `product_id` у баннера.

На карточке товара:

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'shop-product-sidebar',
  'productId' => $_modx->resource.id,
  'tpl' => 'byAdProduct'
]}
```

```modx
[[!BannerPro?
  &positionName=`shop-product-sidebar`
  &productId=`[[*id]]`
  &tpl=`byAdProduct`
]]
```

:::

На каталоге и главной не передавайте `productId`.

## Плейсхолдеры `product_*` пустые

Проверьте, что баннер привязан к товару, товар опубликован, а TV `price`, `old_price`, `thumb` или `image` заполнены.

## Пикер товара показывает мало товаров

Пикер загружает до 200 товаров за запрос. Введите часть названия в фильтр.

## GA4, Matomo или Метрика не получают события

Проверьте плагин **BannerProAnalytics**, настройку `bannerpro_analytics_enabled` и наличие счётчика на странице.

Для Метрики укажите `bannerpro_analytics_ym_counter`. Для GA4 через GTM создайте триггер на событие `bannerpro_click` или `bannerpro_impression`.

На демо-странице запустите `php core/elements/demo/seed_bannerpro_demo.php`. Если статус «плагин не установлен», а настройки верные, проверьте шаблон: при Fenom `{extends}` переменные `{set}` должны быть внутри `{block}`. Подробнее: [Внешняя аналитика](analytics#demo-qa-без-реальных-счётчиков).

## Где взять ключ REST API?

1. **Система → Настройки системы** → namespace `bannerpro` → **`bannerpro_api_key`** (подпись «REST API ключ»).
2. Включите **`bannerpro_api_enabled`** = Да.
3. В `curl` подставьте значение настройки: `-H "Authorization: Bearer <ключ>"`.

Ключ не связан с логином менеджера. При пустом поле обновите пакет или задайте токен вручную. Подробнее: [REST API](development/rest-api#ключ-api).

## REST API возвращает 401

Передайте ключ в заголовке:

```http
Authorization: Bearer YOUR_API_KEY
```

Сверьте значение с `bannerpro_api_key`. См. [Где взять ключ REST API?](#где-взять-ключ-rest-api).

## REST API возвращает 503

Включите `bannerpro_api_enabled`.

## Как очистить старую статистику

Запустите cron:

```bash
php core/components/bannerpro/cron/purge.php
```

Срок хранения задают `bannerpro_clicks_retention_days` и `bannerpro_impressions_retention_days`.
