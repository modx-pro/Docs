---
title: Системные настройки
description: Ключи mscurrency_* — валюта по умолчанию, режим корзины, курсы, витрина, платёжки
---

# Системные настройки

Все ключи в пространстве имён **`mscurrency`**. Области: **main**, **rates**, **frontend**.

## Основные

| Ключ | По умолчанию | Описание |
|------|--------------|----------|
| `mscurrency_selected_currency_default` | `0` | ID валюты из справочника, если посетитель ещё не выбирал. `0` — базовая валюта |
| `mscurrency_order_price_mode` | `base` | При `base` суммы в корзине и заказе в базовой валюте. При `user` — в валюте покупателя |
| `mscurrency_payment_currency_option` | пусто | Имя системной опции MODX (например `ms2_payment_unitpay_currency`). Пустое значение — плагин не пишет код, см. [Интеграция](integration#платёжные-системы) |

### mscurrency_selected_currency_default

Можно задать **отдельно для контекста**: **Система → Контексты** → контекст → **Настройки контекста** → ключ `mscurrency_selected_currency_default` со значением ID валюты. Глобальное значение — в системных настройках.

### mscurrency_order_price_mode

| Значение | Поведение |
|----------|-----------|
| `base` | Переключатель меняет только отображение на витрине. Корзина и заказ остаются в базовой валюте |
| `user` | Плагин на `msOnGetProductPrice` пересчитывает цены в корзине. Символ валюты задаёт `msc_sync_ms3_price_symbol()` |

Снимок валюты в `order.properties.msc` / `properties.msmc` сохраняется **в обоих режимах**.

## Курсы

| Ключ | По умолчанию | Описание |
|------|--------------|----------|
| `mscurrency_default_provider` | `cbr_ru` | Код провайдера для cron и выборочной синхронизации: `cbr_ru`, `nbu_ua`, `nbrb_by`, `nbk_kz` |

Это **внутренний ключ класса**, не API-токен. Для платных API ключ хранится в своём провайдере или отдельной настройке — см. [Управление валютами](manager#свой-поставщик-курсов).

## Витрина

| Ключ | По умолчанию | Описание |
|------|--------------|----------|
| `mscurrency_frontend_css` | `[[++assets_url]]components/mscurrency/css/web/default.min.css` | CSS переключателя валют |
| `mscurrency_frontend_js` | `[[++assets_url]]components/mscurrency/js/web/default.min.js` | JS переключателя (AJAX `web/currency/set`) |

Плагин `mscurrency_frontend` подключает эти файлы на витрине и обновляет плейсхолдеры `msc.*`.

На отдельной странице пути можно переопределить параметрами `frontendCss` / `frontendJs` в вызове `msCurrency`. Для всего сайта проще править настройки выше.

## Связанные настройки MiniShop3

Формат выведенной цены берётся из MS3:

| Ключ MS3 | Описание |
|----------|----------|
| `ms3_price_format` | JSON: знаков после запятой, разделитель дробной части, разделитель тысяч |
| `ms3_price_format_no_zeros` | Убрать хвостовые нули (`15.00` → `15`) |

## Рекомендуемые профили

**Только отображение в другой валюте, оплата в базовой валюте**

- `mscurrency_order_price_mode` = `base`
- Cron курсов 1–2 раза в сутки

**Полная мультивалютность на витрине и в заказе**

- `mscurrency_order_price_mode` = `user`
- `msCurrencyCart` / `msCurrencyGetOrder` в чанках корзины и «спасибо за заказ»
- Плагин `mscurrency_payment_currency` + `mscurrency_payment_currency_option` для платёжного шлюза

**Несколько языковых/региональных контекстов**

- В каждом контексте свой `mscurrency_selected_currency_default` (например UAH для `ua`, KZT для `kz`)

## Проверка в шаблоне

::: code-group

```fenom
{'!msCurrency' | snippet : ['tpl' => 'tpl.msCurrency']}
<span class="price">
  {'!msCurrencyPrice' | snippet : ['price' => $price, 'pid' => $_modx->resource.id]}
</span>
```

```modx
[[!msCurrency? &tpl=`tpl.msCurrency`]]
<span class="price">
  [[!msCurrencyPrice?
    &price=`[[!+price]]`
    &pid=`[[*id]]`
  ]]
</span>
```

:::

## См. также

- [Быстрый старт](quick-start)
- [Интеграция](integration)
- [Управление валютами](manager)
