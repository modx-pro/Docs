---
title: Страница товара
description: Вывод msViewCounter на карточке товара MiniShop3
---

# Страница товара

## Базовый вывод

Передайте ID текущего товара в `pid`. На странице товара параметр можно опустить: сниппет возьмёт ID текущего ресурса. При `pid <= 0` сниппет возвращает пустую строку. Вызов **некэшированный** (`[[!...]]` / `{'!...' | snippet}`).

::: code-group

```fenom
{'!msViewCounter' | snippet : [
    'pid' => $_modx->resource.id,
    'tpl' => 'tplMsViewCounter'
]}
```

```modx
[[!msViewCounter?
    &pid=`[[*id]]`
    &tpl=`tplMsViewCounter`
]]
```

:::

Плагин **`msViewCounterTrack`** на `OnLoadWebDocument` записывает просмотр и регистрирует assets для страницы товара.

ID товара для heartbeat берётся не из `pid`. Страницу товара определяет плагин: у ресурса `class_key` содержит `msProduct` **или** `template` совпадает с настройкой MiniShop3 `ms3_template_product_default`. Найденный ID плагин кладёт в конфиг скрипта как `productId`. Поэтому `pid` из вызова и `productId` из конфига могут разойтись: блок покажет числа переданного `pid`, а heartbeat продлевает сессию товара, определённого плагином. На обычной карточке товара они совпадают.

## Один шаблон для товаров и обычных страниц

Проверять страницу товара в шаблоне не нужно: это делает плагин. Но блок счётчика отрисуется с любым `pid`, который вы передали. Если шаблон назначен и товарам, и обычным страницам, то на не-товарной странице появится счётчик с ID этого ресурса: у него не будет ни просмотров, ни сессий, а heartbeat продолжит продлевать сессию товара из `productId`. В этом случае проверьте `class_key` сами:

```fenom
{set $classKey = $_modx->resource.class_key | default : ''}
{set $isProduct = strpos($classKey, 'msProduct') !== false}

{if $isProduct}
    {'!msViewCounter' | snippet : [
        'tpl' => 'tplMsViewCounter'
    ]}
{/if}
```

В классическом MODX-синтаксисе такой проверки нет, держите вызов в шаблоне, который назначен **только** товарам: MiniShop3 делает это настройкой `ms3_template_product_default`.

## Стандартный чанк

Пакет устанавливает **`tplMsViewCounter`** (MODX-синтаксис). Для Fenom-чанка используйте те же переменные и `{if}` вместо `:notempty`:

::: code-group

```fenom
<div class="msvc-counter" data-product-id="{$pid}">
    {if $total_text}
        <p class="msvc-counter__total">{$total_text}</p>
    {/if}
    {if $online_text}
        <p class="msvc-counter__online">{$online_text}</p>
    {/if}
</div>
```

```modx
<div class="msvc-counter" data-product-id="[[+pid]]">
    [[+total_text:notempty=`<p class="msvc-counter__total">[[+total_text]]</p>`]]
    [[+online_text:notempty=`<p class="msvc-counter__online">[[+online_text]]</p>`]]
</div>
```

:::

Атрибут `data-product-id` — источник истины для клиента: начиная с версии 1.0.2 скрипт читает его и отправляет все товары со страницы одним запросом. В конфиге `productId` остаётся для одиночного запроса со страницы товара, ID товара скрипт берёт из `window.msViewCounterConfig.productId`, а не из разметки. В свой чанк атрибут стоит класть только ради собственных скриптов или аналитики.

### Плейсхолдеры

| Плейсхолдер | MODX | Fenom |
|-------------|------|-------|
| ID товара | `[[+pid]]` | `{$pid}` |
| Просмотры | `[[+total]]` | `{$total}` |
| Online | `[[+online]]` | `{$online}` |
| Текст просмотров | `[[+total_text]]` | `{$total_text}` |
| Текст online | `[[+online_text]]` | `{$online_text}` |

Плейсхолдеры `total` и `online` числовые. При выключенных `show_total` / `show_online` из БД не читается ничего, поэтому они равны `0`, а текстовые `total_text` и `online_text` приходят пустыми.

![Счётчик на странице товара](/components/msviewcounter/screenshots/product-page.png)

Числа на скриншоте зафиксированы на момент генерации страницы: heartbeat не перерисовывает блок.

## Heartbeat на странице товара

Число в блоке **обновляется само** начиная с версии 1.0.2: коннектор возвращает актуальные счётчики, скрипт подставляет числа в блок и сохраняет формулировку. До этой версии значение было зафиксировано при отрисовке страницы. Подробнее — [Порядок работы на странице товара](../snippets/#poryadok-raboty-na-tipovoy).

Плагин вписывает в страницу объект `window.msViewCounterConfig` — единственную точку конфигурации скрипта:

```js
window.msViewCounterConfig = {
    connectorUrl: '/assets/components/msviewcounter/connector.php',
    productId: 42,
    sessionId: '1f0c…',
    interval: 30
};
```

| Поле | Что это |
|------|---------|
| `connectorUrl` | адрес `connector.php` из `assets_url` |
| `productId` | ID товара, определённый плагином |
| `sessionId` | идентификатор из `$_SESSION['msviewcounter_session_id']`, обрезан до 64 символов |
| `interval` | значение `heartbeat_interval`; клиент берёт `max(10, interval)` секунд |

Скрипт молча завершается, если нет `connectorUrl`, `productId` или `sessionId`, без ошибок в консоли. Дальше он отправляет POST `application/x-www-form-urlencoded` с `action=ping`, `product_id` и `session_id`, с cookies текущего домена, и повторяет запрос по таймеру. Ответ не разбирается, `.catch` пустой: сетевой обрыв и ошибка коннектора выглядят одинаково, счётчик при этом просто не продлевается. При отладке проверяйте доступность `connector.php` и наличие `window.msViewCounterConfig` в исходнике страницы. Коннектор сверяет `session_id` с сессией на сервере, поэтому подделанный идентификатор отклоняется, а частота ограничена 10 запросами в минуту на сессию — см. [Можно ли накрутить online?](../faq#mozhno-li-nakrutit-online).

## Без JavaScript

- Числа уже отрисованы сервером: сниппет рендерит счётчик независимо от JS.
- Просмотр записывает плагин на сервере, дедупликация держится на PHP-сессии сайта. Если сессии отключены, повторные запросы одной страницы будут суммироваться.
- Heartbeat не уходит: активная сессия в `msviewcounter_active` не продлевается и по истечении `online_ttl` исчезает. Число `online` в этом случае всегда посчитано на момент генерации страницы.

## Свой чанк

::: code-group

```fenom
{'!msViewCounter' | snippet : [
    'pid' => $_modx->resource.id,
    'tpl' => 'tplProductSocialProof'
]}
```

```modx
[[!msViewCounter?
    &pid=`[[*id]]`
    &tpl=`tplProductSocialProof`
]]
```

:::

Пример **`tplProductSocialProof`**:

::: code-group

```fenom
<aside class="product-social-proof">
    {if $total_text}
        <div class="product-social-proof__item">{$total_text}</div>
    {/if}
    {if $online_text}
        <div class="product-social-proof__item product-social-proof__item--online">{$online_text}</div>
    {/if}
</aside>
```

```modx
<aside class="product-social-proof">
    [[+total_text:notempty=`<div class="product-social-proof__item">[[+total_text]]</div>`]]
    [[+online_text:notempty=`<div class="product-social-proof__item product-social-proof__item--online">[[+online_text]]</div>`]]
</aside>
```

:::

Стилизация дефолтного блока: [Интеграция — стилизация](../integration#stilizaciya).

## Размещение на карточке

Типичные места в шаблоне msProduct:

- под заголовком и артикулом;
- рядом с ценой и кнопкой «В корзину»;
- в блоке social proof над отзывами.

## См. также

- [Сниппет msViewCounter](../snippets/msViewCounter)
- [Каталог товаров](catalog)
- [Быстрый старт](../quick-start)
