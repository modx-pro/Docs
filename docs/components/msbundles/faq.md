---
title: FAQ
description: 'Типовые ошибки msBundles: VueTools, права, initialize, selector, остатки'
---

# FAQ

## Установка падает с Package provider not found

Пакет платный. Добавьте провайдер [modstore.pro](https://modstore.pro/extras/) с URL `https://modstore.pro/extras/`, email и API-ключ. Без него transport не установится. Шаги: [Быстрый старт](quick-start).

## Раздел не открывается / белый экран

Проверьте, что установлен **VueTools**, и у роли есть `msbundles_view`. Откройте `manager/?a=index&namespace=msbundles` и посмотрите ошибки в консоли браузера.

## Пункта меню нет

Нет `msbundles_view` или кэш. Проверьте политику и сбросьте кэш.

## Карточка не появляется

1. **Активен** включён.
2. Товар в составе комплекта.
3. Контекст комплекта совпадает с контекстом страницы.
4. В шаблоне:

```fenom
{'!msBundles' | snippet : ['product' => $_modx->resource.id]}
```

5. При нулевом остатке `msbundles_stock_behavior` ≠ `hide`. <!-- markdownlint-disable-line MD029 -->

## Комплект на другом языке / контексте

У комплекта один `context_key`. Для `en` / `de` создайте отдельный: **Duplicate**, смените контекст (доступно, пока **неактивен**), название и состав.

## После обновления до 1.1.0

Resolver проставит `context_key = web`. Если витрина на другом контексте: выключите **Активен**, смените контекст, сохраните.

## Кнопка «Добавить комплект» не работает

В `<head>`: `msBundles.initialize`. Без CSS/JS кнопки с `data-msbundles-action` — просто разметка.

## Toast есть, блок корзины не обновляется

У `msCart` задайте `selector`. Фронт перерисовывает только зарегистрированные блоки. Без `selector` toast есть, HTML старый.

## Нет бейджа «Комплект»

В чанке корзины: `tplMsBundlesCartInfo`. Без хука бейдж и кнопка не появятся. Пример: [Вывод на сайте](frontend#хук-в-tplmscart).

## Нельзя сохранить комплект

Нет товаров в составе. Нужно `msbundles_save`.

## Комплект пропал при нулевом остатке

`msbundles_stock_behavior` = `hide`. Поставьте `block` / `message` или пополните склад.

## В старых строках корзины нет подписей

У плагина **msBundles** должно быть `msOnGetCart`. Плагин дополняет строки данными для бейджа.

## Ошибки REST‑API

### 401 Unauthorized

Токен `ms3_token` не передан или истёк. Проверьте, что пользователь авторизован, и токен актуален.

### 404 Not Found

Неверный `apiBaseUrl` или маршрут. База: `/api/v1/msbundles`. Полный URL:

```text
/assets/components/minishop3/api.php?route=/api/v1/msbundles/bundle/add
```

### CORS при запросе с другого домена

REST вызывается только с того же домена, что и витрина. При SPA на отдельном домене настройте CORS proxy или вызывайте API через бэкенд MODX.

### Ответ `{success: false, errors: [...]}`

Проверьте `errors` в ответе. Частые причины:

- `bundle_id` не найден — комплект не существует или не активен
- `Not enough stock` — одного из товаров нет в наличии
- `Invalid bundle_hash` — хэш не совпадает с составом
