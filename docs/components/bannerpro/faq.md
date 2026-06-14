---
title: FAQ
description: "Частые вопросы по BannerPro: пустой вывод, клики, показы, VueTools, MiniShop3 и REST API"
---

# FAQ

## Баннеры не выводятся на сайте

Проверьте pdoTools, имя позиции, активность баннера, даты показа и связь баннера с позицией.

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

Проверьте четыре вещи:

1. Плагин **BannerProClickout** включён на `OnPageNotFound`.
2. Чанк ведёт на `[[++bannerpro_click]]/[[+adposition]]`.
3. `adposition` означает ID связи `bannerpro_ads_positions`.
4. Friendly URL не перехватывает путь раньше MODX.

Повторный клик с того же IP за сутки на ту же пару баннер + позиция не увеличивает счётчик. Redirect всё равно работает.

## Показы не считаются

Проверьте `bannerpro_track_impressions`, плагин **BannerProImpression** и наличие `impression.js` на странице.

Компонент фиксирует показ, когда баннер появляется в viewport. Дубликат с того же IP за сутки не создаёт новую запись.

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
