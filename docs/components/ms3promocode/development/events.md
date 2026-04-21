# События плагина

ms3PromoCode реализован как один MODX-плагин, подписанный на события MiniShop3 и системные события MODX.

## Список подписок

| Событие                          | Когда                                                | Что делает плагин                                            |
|----------------------------------|------------------------------------------------------|--------------------------------------------------------------|
| `OnLoadWebDocument`              | Рендер страницы фронта                               | Регистрирует JS/CSS по пресету `frontend_assets_preset`      |
| `msOnAddToCart`                  | Покупатель добавил товар в корзину                   | `syncAfterCartChange` — пересчитать или снять код            |
| `msOnChangeInCart`               | Изменено количество позиции                          | То же                                                        |
| `msOnRemoveFromCart`             | Удалена позиция из корзины                           | То же                                                        |
| `msOnCreateOrderProduct`         | Менеджер добавил позицию в заказ через legacy-админ   | То же (для новой Vue-админки используется JS-перехватчик)    |
| `msOnUpdateOrderProduct`         | То же — изменение позиции                            | То же                                                        |
| `msOnRemoveOrderProduct`         | То же — удаление позиции                             | То же                                                        |
| `msOnCreateOrder`                | Покупатель оформил заказ                             | `recordApplication` — фиксация в `ms3_promo_code_usages`     |
| `msOnChangeOrderStatus`          | Изменён статус заказа                                | Откат / восстановление применения по `cancel_statuses`       |
| `msOnManagerCustomCssJs`         | Загрузка страницы редактирования заказа              | Инжект `order-tab.js` — вкладка «Промо-код»                  |

## syncAfterCartChange

Большинство кейсов с изменением состава корзины решается одним методом `ApplicationService::syncAfterCartChange($order)`:

1. Если в `properties.promo_code` нет применённого кода — no-op.
2. Если есть — пытается заново применить:
   - `restoreLineItems` — восстановить оригинальные цены позиций.
   - `findMatchingItems` — пересобрать набор matching-позиций для текущего состава.
   - `DiscountCalculator::calculate` — пересчитать breakdown.
   - `applyToLineItems` — записать новые уценённые цены.
3. Если на новом составе код стал невалидным (`min_order_amount`, exhausted и т.п.) — `remove`.

При автоматическом снятии кода с заказа (manager events) в `msOrderLog` пишется запись:

```json
{
    "operation": "ms3promocode_auto_remove",
    "reason": "min_order",
    "message": "Сумма заказа меньше требуемого минимума (5 000 ₽)"
}
```

## Какие события **не** используются

- **`msOnGetCartCost`** — *не* используется. При модели «уценка позиций» сумма корзины уже считается из `msOrderProduct.cost`, дополнительно вычитать скидку из агрегата означало бы двойную скидку. Hook был в ранних бета-версиях и удалён.
- **`msOnGetProductPrice`** — *не* используется. Скидки не применяются на уровне отдельных товаров вне контекста корзины.

## Свои события компонента

Плагин также эмитит DOM-события для фронтенда (см. [JS API](../frontend/js-api)):

| Событие                          | Когда                                                |
|----------------------------------|------------------------------------------------------|
| `ms3promocode:ready`             | Headless-ядро инициализировано                       |
| `ms3promocode:applied`           | Код успешно применён                                 |
| `ms3promocode:removed`           | Код успешно снят                                     |
| `ms3promocode:auto-removed`      | Код автоматически снят при изменении корзины         |
| `ms3promocode:error`             | Ошибка операции                                      |

Подписаться можно стандартно:

```js
document.addEventListener('ms3promocode:applied', (e) => {
    console.log(e.detail.code, e.detail.discount);
});
```

## Подписка на события из своего плагина

Чтобы реагировать на применение кода в своём коде, подпишитесь на стандартные MS3-события — payload уже содержит всё нужное.

### Пример: своя нотификация о применении

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
// Pre-validation на уровне плагина
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
ms3PromoCode не предоставляет своего pre-apply hook'а с возможностью отмены — только реактивные события после факта. Если такая логика нужна — обсудим в [issue tracker](https://github.com/biz87/ms3PromoCode/issues).
:::
