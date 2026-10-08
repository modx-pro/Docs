# События плагина

ms3PromoCode — один MODX-плагин, который слушает события MiniShop3 и MODX.

## Список подписок

| Событие                          | Когда                                                   | Что делает плагин                                            |
|----------------------------------|---------------------------------------------------------|--------------------------------------------------------------|
| `OnLoadWebDocument`              | Вывод страницы на фронте                                | Регистрирует JS/CSS по пресету `frontend_assets_preset`      |
| `msOnAddToCart`                  | Покупатель добавил товар в корзину                      | `syncAfterCartChange` — пересчитать или снять код            |
| `msOnChangeInCart`               | Изменено количество позиции                             | То же                                                        |
| `msOnChangeOptionInCart`         | Изменены или удалены опции уже добавленной позиции      | То же                                                        |
| `msOnRemoveFromCart`             | Удалена позиция из корзины                              | То же                                                        |
| `msOnCreateOrderProduct`         | Менеджер добавил позицию в заказ через прежнюю админку  | То же (новая Vue-админка использует JS-перехватчик)          |
| `msOnUpdateOrderProduct`         | То же — изменение позиции                               | То же                                                        |
| `msOnRemoveOrderProduct`         | То же — удаление позиции                                | То же                                                        |
| `msOnCreateOrder`                | Покупатель оформил заказ                                | `recordApplication` — фиксация в `ms3_promo_code_usages`     |
| `msOnChangeOrderStatus`          | Изменён статус заказа                                   | Откат или восстановление применения по `cancel_statuses`     |
| `msOnManagerCustomCssJs`         | Загрузка страницы редактирования заказа                 | Подключение `order-tab.js` — вкладка «Промо-код»             |

## syncAfterCartChange

События изменения корзины (`msOnAddToCart`, `msOnChangeInCart`, `msOnChangeOptionInCart`, `msOnRemoveFromCart`) и правки позиций заказа из админки (`msOnCreateOrderProduct`, `msOnUpdateOrderProduct`, `msOnRemoveOrderProduct`) идут через `ApplicationService::syncAfterCartChange($order)`:

1. Если в `properties.promo_code` нет применённого кода — ничего не делает.
2. Иначе — вызывает `apply($order, $code)` повторно с тем же кодом. Проверка (жизненный цикл, `min_order_amount`, правила) запускается заново, уценка пересчитывается по текущему составу корзины. Внутренние шаги `apply` — на странице [Сервисы](services).
3. Если новый состав корзины уже не подходит коду, `apply` возвращает ошибку, плагин вызывает `remove($order)`, снимает применение и шлёт на фронт событие `ms3promocode:auto-removed`.

::: tip Сохранённая цена позиции и внешние плагины
Между `apply` и следующей синхронизацией цену позиции может переписать сторонний плагин — например, [ms3Variants](/components/ms3variants/) при смене опции. Тогда `properties.ms3promocode.original_price` устаревает: для повторного применения берётся текущая `price`, а не сохранённое значение. При `remove` в этой же ситуации сохранённая цена чистится без «восстановления» прежней — текущая остаётся как есть.
:::

При автоматическом снятии кода с заказа (события из админки) в `msOrderLog` пишется запись:

```json
{
    "operation": "ms3promocode_auto_remove",
    "reason": "min_order",
    "message": "Сумма заказа меньше требуемого минимума (5 000 ₽)"
}
```

## Какие события **не** используются

- **`msOnGetCartCost`** — не используется. Сумма корзины уже считается из `msOrderProduct.cost` (модель «уценка позиций»); вычитать скидку ещё раз из агрегата — двойная скидка.
- **`msOnGetProductPrice`** — не используется. Скидки не применяются к отдельным товарам вне контекста корзины.

## Свои события компонента

На фронтенд плагин шлёт DOM-события (см. [JS API](../frontend/js-api)):

| Событие                          | Когда                                                |
|----------------------------------|------------------------------------------------------|
| `ms3promocode:ready`             | Headless-ядро инициализировано                       |
| `ms3promocode:applied`           | Код успешно применён                                 |
| `ms3promocode:removed`           | Код успешно снят                                     |
| `ms3promocode:auto-removed`      | Код автоматически снят при изменении корзины         |
| `ms3promocode:error`             | Ошибка операции                                      |

Подписка:

```js
document.addEventListener('ms3promocode:applied', (e) => {
    console.log(e.detail.code, e.detail.discount);
});
```

## Подписка на события из своего плагина

Чтобы реагировать на применение кода, подпишитесь на стандартные события MiniShop3 — их данные уже содержат всё нужное.

### Пример: своё уведомление о применении

```php
// elements/plugins/myplugin.php
$eventName = $modx->event->name;

if ($eventName === 'msOnCreateOrder') {
    /** @var \MiniShop3\Model\msOrder $order */
    $order = $scriptProperties['msOrder'];
    $properties = $order->get('properties');

    if (!empty($properties['promo_code'])) {
        $code = $properties['promo_code']['code'];
        $discount = $properties['promo_code']['discount_amount'];

        // ... отправить в Telegram, метрику и т.п.
        myNotifier()->send("Применён код {$code}, скидка {$discount}");
    }
}
```

### Пример: запрет применения определённого кода

```php
// Проверка перед применением на уровне плагина
if ($eventName === 'msOnCreateOrder') {
    $order = $scriptProperties['msOrder'];
    $properties = $order->get('properties');
    $code = $properties['promo_code']['code'] ?? null;

    if ($code === 'BANNED-CODE') {
        // Снять код принудительно
        /** @var \ms3PromoCode\Services\ApplicationService $svc */
        $svc = $modx->services->get('ms3promocode_application_service');
        $svc->remove($order);
    }
}
```

::: warning
Своего обработчика перед применением с возможностью отмены ms3PromoCode не даёт — только события после факта. Если нужна отмена до применения — заведите задачу в [issue tracker](https://github.com/biz87/ms3PromoCode/issues).
:::
