---
title: FAQ
description: Частые вопросы по msCurrency — админка, курсы, витрина, корзина
---

# FAQ

## Общие

### Работает ли с MiniShop2?

Нет. Только **MiniShop3** и MODX 3.

### Нужен ли API-ключ для ЦБ РФ?

Нет. Встроенные провайдеры (ЦБ, НБУ, НБРБ, НБК) используют открытые URL без регистрации. Платные API (Fixer, Open Exchange Rates) подключаются своим классом — см. [Управление валютами](manager#свой-поставщик-курсов).

### Чем msCurrency отличается от ручного TV «валюта»?

Компонент даёт справочник валют, синхронизацию курсов и пересчёт на витрине и в корзине. В заказе сохраняется снимок валюты, есть поля в карточке MS3 и фильтр mFilter. Обычный TV «валюта» не тянет цепочку курсов и событие `msOnGetProductPrice`.

## Установка и админка

### Не открывается «Валюты (msCurrency)» / alert про VueTools

1. Установите **[VueTools](https://modstore.pro/)** через ModStore.
2. Очистите кэш MODX, жёстко обновите страницу менеджера (Cmd+Shift+R).

### Ошибка «Сервис mscurrency не найден»

Переустановите пакет. Проверьте наличие `core/components/mscurrency/bootstrap.php` и включённый плагин `mscurrency_autoload`.

### Курсы не обновляются

- Сервер должен иметь исходящий HTTPS к доменам ЦБ/НБУ/НБРБ/НБК.
- На вкладке **Поставщики** включён нужный источник.
- На вкладке **Привязки** есть связь валюты с кодом API.
- После синхронизации смотрите `errors[]` в ответе connector или лог MODX.

Запустите вручную:

```bash
php core/components/mscurrency/cron/sync_rates.php
```

## Витрина

### Переключатель есть, цена не меняется

- На карточке выведен `msCurrencyPrice` или работает плагин `mscurrency_product_price`.
- Вызывайте сниппеты некэшированно (`[[!...]]` / `{'!...' | snippet}`).
- В справочнике валюта **активна**, `val` > 0 (после синхронизации курсов).

### Плейсхолдеры `msc.*` пустые

Вызовите `msCurrency` или дождитесь плагина `mscurrency_frontend` на событии `OnLoadWebDocument`. После первого выбора валюты значения должны появиться.

### Ключи лексикона в карточке товара

Вместо «Валюта» видно `mscurrency_section_product`:

```php
$msc = $modx->getService('mscurrency', \mscurrency\Facade\MsCurrency::class, $modx->getOption('core_path') . 'components/mscurrency/');
require_once $modx->getOption('core_path') . 'components/mscurrency/include/helpers.php';
mscurrency_sync_product_fields($modx);
```

Очистите кэш и обновите страницу товара.

### В карточке «Цена» = 0, в категории цена верная

В `ms3_extra_fields` поля `currency_id` / `msc_price` / `msc_old_price` уже есть, но колонки не созданы в таблице `ms3_products`. MiniShop3 не может загрузить `msProductData`, и в форме «Цена» = 0.

Повторите `mscurrency_sync_product_fields($modx)` (с 1.0.x создаёт недостающие колонки). Проверка: `SHOW COLUMNS FROM ms3_products LIKE 'msc_%';`. API `GET /api/mgr/product-data/{id}` должен отдавать реальный `price`.

## Корзина и заказ

### В корзине базовая валюта, хотя на витрине USD

Проверьте **`mscurrency_order_price_mode`**. Значение `base` — суммы в базовой валюте. Для валюты покупателя поставьте `user` и используйте обёртки `msCurrencyCart` / `msCurrencyGetOrder`.

### Символ валюты в корзине не тот

`msc_sync_ms3_price_symbol()` подставляет символы выбранной валюты (режим `user`) или базовой (режим `base`). В оформленном заказе символы берутся из `properties.msc`.

### Символ валюты дублируется в корзине

Скорее всего, после `msCurrencyPrice` с `format=1` вы вручную добавляете `symbol_right`. При `format=1` символ уже внутри форматированной строки MS3. Либо уберите символ, либо используйте `format=0` и `msc.symbol_left` / `msc.symbol_right`. Подробнее: [Интеграция — чанк корзины](integration#чанк-корзины-строка-товара).

### Нет блока `msc` в properties заказа

Проверьте файл `core/config/ms3.services.d/50-mscurrency.php` и плагин `mscurrency_order_snapshot`. Переустановите пакет при отсутствии обработчика.

## mFilter

### Фильтр по цене не учитывает валюту

- Плагин `mscurrency_mfilter` включён.
- В конфиге фильтра тип **`currency_price`**, не `number`.
- Подключён `mfilter-currency.js` на странице каталога.

## См. также

- [Быстрый старт](quick-start)
- [Интеграция](integration)
- [Управление валютами](manager)
