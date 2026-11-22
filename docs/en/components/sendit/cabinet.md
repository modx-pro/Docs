# Кабинет покупателя miniShop2

С версии 2.9.0. **SendIt** даёт авторизованному покупателю работать со своими заказами **miniShop2** без перезагрузки страницы:

1. Список заказов с составом и постраничной навигацией.
2. Перенос позиций заказа в корзину.
3. Повтор заказа с переходом на страницу оформления.
4. Оплата существующего заказа через его способ оплаты.
5. Отмена заказа.
6. Заявка на возврат (с версии 2.10.0).
7. Адреса доставки: сохранение, удаление, адрес по умолчанию, быстрый выбор на странице оформления.
8. Сохранённая корзина: корзина покупателя возвращается при входе с другого устройства (с версии 2.10.0).

::: warning Требования

* Работает **только в MODX 2**.
* Требуется установленный **miniShop2**.
* Сохранённая корзина работает только при `ms2_tmp_storage = session`.

:::

Все действия выполняются через публичный контракт **miniShop2** (`cart->add`, `order->add`, `changeOrderStatus`, `msPayment::send`), поэтому работают с любыми обработчиками корзины и заказа. Гостю любое действие кабинета вернёт ошибку «Войдите в личный кабинет.».

## Системные настройки {#settings}

|               Ключ               |                                                              Описание                                                              |                     По умолчанию                      |
|:--------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------:|
|     **si_cabinet_actions**       | Включённые действия через запятую (см. ниже). Пустое значение выключает все действия                                               | `tocart,repeat,pay,cancel,return,addresses,savecart`  |
|     **si_cabinet_page_id**       | ID страницы кабинета. На неё ведут вход и регистрация (значение `cabinet` в `redirectTo` и `afterLoginRedirectId`). `0` — без перехода | `5`                                                   |
|   **si_cabinet_checkout_id**     | ID страницы оформления заказа, на которую ведёт повтор заказа. Параметр пресета `redirectTo` важнее. `0` — без перехода             | `0`                                                   |
|   **si_cabinet_pay_statuses**    | ID статусов miniShop2 через запятую, в которых заказ можно оплатить                                                                 | `1`                                                   |
| **si_cabinet_cancel_statuses**   | ID статусов miniShop2 через запятую, из которых заказ можно отменить. Отмена переводит заказ в статус из `ms2_status_canceled`      | `1`                                                   |
| **si_cabinet_return_statuses**   | ID статусов miniShop2 через запятую, в которых можно оформить возврат                                                               | `3`                                                   |
|  **si_cabinet_return_days**      | Сколько дней с даты заказа доступна заявка на возврат. `0` — без ограничения                                                        | `14`                                                  |

Значения **si_cabinet_actions**:

| Действие      | Что включает                                                         | Пресет                                                        |
|---------------|----------------------------------------------------------------------|---------------------------------------------------------------|
| `tocart`      | товары заказа в корзину                                              | `order_tocart`                                                |
| `repeat`      | повтор заказа                                                        | `order_repeat`                                                |
| `pay`         | оплата заказа                                                        | `order_pay`                                                   |
| `cancel`      | отмена заказа                                                        | `order_cancel`                                                |
| `return`      | заявка на возврат                                                    | `order_return`                                                |
| `addresses`   | адреса доставки                                                      | `address_save`, `address_remove`, `address_default`, `address_apply` |
| `savecart`    | сохранение корзины между входами (только при `ms2_tmp_storage = session`) | —                                                        |

Выключенное действие не выводится в чанке заказа (флаг `can_*` равен `false`), а прямой запрос к нему вернёт ошибку «Действие недоступно.».

## Список заказов {#orders}

Заказы выводит сниппет [siUserOrders](/components/sendit/snippets#siuserorders). Он работает и сам по себе, и как `render` сниппета [Pagination](/components/sendit/pagination). Выводятся заказы текущего пользователя в текущем контексте.

Готовая разметка с пагинацией лежит в чанке **siExampleOrdersList**:

::: details Чанк siExampleOrdersList

```fenom:line-numbers
<form id="ordersForm" data-si-form="ordersForm" data-si-preset="user_orders" data-si-nosave></form>
<div data-pn-result="orders">
  {'!Pagination' | snippet: [
    'snippet' => '!Pagination',
    'presetName' => 'user_orders',
    'render' => '!siUserOrders',
    'tpl' => 'siUserOrderTpl',
    'tplProduct' => 'siUserOrderProductTpl',
    'tplEmpty' => '@INLINE <p>Заказов пока нет.</p>',
    'limit' => 10,
    'pagination' => 'orders',
    'resultBlockSelector' => '[data-pn-result="orders"]',
    'resultShowMethod' => 'insert',
  ]}
</div>
{set $totalPages = 'orders.totalPages' | placeholder}
{set $currentPage = 'orders.currentPage' | placeholder}
<div data-pn-pagination="orders" data-pn-type="" class="{$totalPages < 2 ? 'v_hidden' : ''}">
  <button type="button" data-pn-first="1">&#8249;&#8249;</button>
  <button type="button" data-pn-prev="">&#8249;</button>
  <input type="number" name="orderspage" data-pn-current data-si-preset="user_orders" form="ordersForm" min="1" max="{$totalPages}" value="{$currentPage ?: 1}">
  <p>из <span data-pn-total="">{$totalPages ?: 1}</span></p>
  <button type="button" data-pn-next="">&#8250;</button>
  <button type="button" data-pn-last="{$totalPages}">&#8250;&#8250;</button>
</div>
```

:::

::: details Пресет user_orders

```php:line-numbers
'user_orders' => [
  'snippet' => 'Pagination',
  'render' => '!siUserOrders',
  'pagination' => 'orders',
  'resultBlockSelector' => '[data-pn-result="orders"]',
  'resultShowMethod' => 'insert',
  'limit' => 10,
  'tpl' => 'siUserOrderTpl',
  'tplProduct' => 'siUserOrderProductTpl',
  'tplEmpty' => '@INLINE <p>Заказов пока нет.</p>',
],
```

:::

### Чанк заказа siUserOrderTpl {#tpl-order}

Чанк выводится для каждого заказа. В нём же стоят формы действий: каждая форма отправляет `order_id` своим пресетом и выводится, только если действие доступно (флаг `can_*`).

::: details Фрагмент чанка siUserOrderTpl

```fenom:line-numbers
<div data-si-order="{$id}">
  <p>Заказ №{$num} от {$createdon | date: 'd.m.Y'}</p>
  <span style="color:#{$status_color}">{$status_name}</span>
  <ul>{$products}</ul>
  <p>
    Доставка: {$delivery_name}{if $address_city}, {$address_city}{/if}<br>
    Оплата: {$payment_name}<br>
    Итого: <b>{$cost_formatted}</b>
  </p>
  {if $can_tocart}
  <form data-si-form="orderToCart{$id}" data-si-preset="order_tocart" data-si-nosave>
    <input type="hidden" name="order_id" value="{$id}">
    <button type="submit">В корзину</button>
  </form>
  {/if}
  {if $can_repeat}
  <form data-si-form="orderRepeat{$id}" data-si-preset="order_repeat" data-si-nosave>
    <input type="hidden" name="order_id" value="{$id}">
    <button type="submit">Повторить</button>
  </form>
  {/if}
  {if $can_pay}
  <form data-si-form="orderPay{$id}" data-si-preset="order_pay" data-si-nosave>
    <input type="hidden" name="order_id" value="{$id}">
    <button type="submit">Оплатить</button>
  </form>
  {/if}
  {if $can_cancel}
  <form data-si-form="orderCancel{$id}" data-si-preset="order_cancel" data-si-nosave>
    <input type="hidden" name="order_id" value="{$id}">
    <button type="submit">Отменить</button>
  </form>
  {/if}
  {* форма возврата — в разделе «Заявка на возврат» *}
</div>
```

:::

Доступные плейсхолдеры:

| Плейсхолдер | Что содержит | Пример |
|---|---|---|
| `{$id}` | ID заказа | `42` |
| `{$num}` | Номер заказа | `2610/15` |
| `{$user_id}` | ID покупателя | `7` |
| `{$createdon}`, `{$updatedon}` | Дата создания и изменения заказа | `2026-10-15 12:30:00` |
| `{$context}` | Контекст заказа | `web` |
| `{$status}` | ID статуса | `1` |
| `{$status_name}` | Название статуса | `Новый` |
| `{$status_color}` | Цвет статуса без `#` | `000000` |
| `{$delivery}` | ID способа доставки | `1` |
| `{$delivery_name}` | Название способа доставки | `Самовывоз` |
| `{$payment}` | ID способа оплаты | `2` |
| `{$payment_name}` | Название способа оплаты | `Банковская карта` |
| `{$payment_class}` | Класс обработчика оплаты, пусто — оплаты онлайн нет | `YooKassa` |
| `{$cost}` | Итоговая сумма заказа | `3500` |
| `{$cart_cost}` | Стоимость товаров | `3200` |
| `{$delivery_cost}` | Стоимость доставки | `300` |
| `{$cost_formatted}`, `{$cart_cost_formatted}`, `{$delivery_cost_formatted}` | Те же суммы, отформатированные `miniShop2::formatPrice()` | `3 500` |
| `{$weight}` | Вес заказа | `1.2` |
| `{$order_comment}` | Комментарий к заказу | `Позвонить заранее` |
| `{$properties}` | Дополнительные свойства заказа | — |
| `{$address}` | Адрес заказа (`msOrderAddress`) массивом | `{$address.city}` |
| `{$address_*}` | Каждое поле адреса отдельным плейсхолдером: `address_receiver`, `address_phone`, `address_email`, `address_country`, `address_index`, `address_region`, `address_city`, `address_metro`, `address_street`, `address_building`, `address_entrance`, `address_floor`, `address_room`, `address_comment`, `address_text_address` и др. | `{$address_city}` → `Москва` |
| `{$products}` | Готовый HTML позиций, собранный чанком `tplProduct` | `<li>…</li>` |
| `{$products_list}` | Позиции заказа массивом (поля — как в чанке позиции, см. ниже) | `{foreach $products_list as $product}` |
| `{$actions}` | Доступность действий массивом `действие => true/false`: `tocart`, `repeat`, `pay`, `cancel`, `return` | `{$actions.pay}` |
| `{$can_tocart}` | Можно перенести товары в корзину: действие `tocart` включено | `true` |
| `{$can_repeat}` | Можно повторить заказ: действие `repeat` включено | `true` |
| `{$can_pay}` | Можно оплатить: действие `pay` включено, у способа оплаты есть класс и статус заказа входит в `si_cabinet_pay_statuses` | `false` |
| `{$can_cancel}` | Можно отменить: действие `cancel` включено и статус входит в `si_cabinet_cancel_statuses` | `true` |
| `{$can_return}` | Можно оформить возврат: действие `return` включено, статус входит в `si_cabinet_return_statuses` и с даты заказа прошло не больше `si_cabinet_return_days` дней | `false` |
| `{$tpl}`, `{$tplProduct}`, `{$limit}` и другие | Параметры вызова сниппета | `siUserOrderTpl` |

### Чанк позиции заказа siUserOrderProductTpl {#tpl-order-product}

Выводится для каждой позиции заказа, результат попадает в плейсхолдер `{$products}` чанка заказа. Если указать `'tplProduct' => ''`, позиции не рендерятся, а остаются доступны в `{$products_list}`.

::: details Чанк siUserOrderProductTpl

```fenom:line-numbers
<li>
  {if $available && $uri}<a href="{$uri}">{$name}</a>{else}{$name}{/if}
  {if $options}<small>({foreach $options as $option => $value}{$option}: {$value | join: ', '}{if !$value@last}; {/if}{/foreach})</small>{/if}
  — {$count} × {$price_formatted} = {$cost_formatted}
</li>
```

:::

Доступные плейсхолдеры:

| Плейсхолдер | Что содержит | Пример |
|---|---|---|
| `{$id}` | ID позиции заказа (`msOrderProduct`), его же ждёт форма возврата в имени поля `return_{$id}` | `118` |
| `{$product_id}` | ID товара | `25` |
| `{$order_id}` | ID заказа | `42` |
| `{$name}` | Название товара на момент заказа | `Футболка` |
| `{$count}` | Количество | `2` |
| `{$price}` | Цена за единицу | `1600` |
| `{$cost}` | Стоимость позиции | `3200` |
| `{$price_formatted}`, `{$cost_formatted}` | Цена и стоимость, отформатированные `miniShop2::formatPrice()` | `1 600` |
| `{$weight}` | Вес позиции | `0.3` |
| `{$options}` | Опции товара массивом | `['size' => 'M']` |
| `{$properties}` | Дополнительные свойства позиции | — |
| `{$uri}` | URI товара | `catalog/futbolka.html` |
| `{$published}`, `{$deleted}` | Флаги товара | `1`, `0` |
| `{$available}` | Товар опубликован и не удалён — можно выводить ссылку | `true` |

## Действия над заказом {#order-actions}

Все действия выполняет сниппет `siCabinetAction`, конкретное действие задаёт параметр пресета `method`. Форме достаточно передать `order_id`.

::: details Пресеты действий

```php:line-numbers
'order_tocart' => [
  'snippet' => 'siCabinetAction',
  'method' => 'toCart',
  'cleanCart' => 0,
  'redirectTo' => '',
],
'order_repeat' => [
  'snippet' => 'siCabinetAction',
  'method' => 'repeat',
  'cleanCart' => 1,
  'redirectTo' => '',
  'redirectTimeout' => 1000,
],
'order_pay' => [
  'snippet' => 'siCabinetAction',
  'method' => 'pay',
  'redirectTimeout' => 1000,
],
'order_cancel' => [
  'snippet' => 'siCabinetAction',
  'method' => 'cancel',
  'reloadPage' => 1,
  'redirectTimeout' => 1500,
],
```

:::

| Пресет | method | Что делает |
|---|---|---|
| `order_tocart` | `toCart` | Кладёт позиции заказа в корзину. `cleanCart` — очистить корзину перед добавлением (по умолчанию `0`), `redirectTo` — ID ресурса или URL для перехода после добавления. |
| `order_repeat` | `repeat` | Очищает корзину (`cleanCart`, по умолчанию `1`), кладёт в неё позиции заказа, подставляет в заказ его доставку, оплату и адрес и переводит на страницу оформления: `redirectTo` пресета или настройка `si_cabinet_checkout_id`. |
| `order_pay` | `pay` | Вызывает `send()` способа оплаты заказа и переводит покупателя по ссылке на оплату. |
| `order_cancel` | `cancel` | Переводит заказ в статус из `ms2_status_canceled` через `miniShop2::changeOrderStatus()`. |

Общее для действий:

* Можно передать в поле `products` список ID позиций заказа, тогда в корзину попадут только они (для `order_tocart` и `order_repeat`).
* Товары, которые сейчас нельзя добавить в корзину, пропускаются, их названия приходят в ответе (`data.skipped`) и в сообщении «Товары добавлены в корзину, кроме недоступных: …».
* Параметр `successMessage` пресета заменяет стандартное сообщение.
* Параметр `reloadPage` = `1` перезагружает страницу после успешного действия, если переход не задан. С версии 2.10.0 параметр работает в любых пресетах, а не только в кабинете.
* Ответ `order_tocart` и `order_repeat` содержит `data.cart` — статус корзины miniShop2, его можно использовать для обновления мини-корзины.

## Заявка на возврат {#return}

С версии 2.10.0. Покупатель выбирает позиции и количество, указывает причину и комментарий. Заявка доступна, если действие `return` включено, статус заказа входит в `si_cabinet_return_statuses` и с даты заказа прошло не больше `si_cabinet_return_days` дней.

**SendIt** только проверяет и собирает заявку. Что с ней делать (письмо менеджеру, смена статуса, запись в CRM) — решает проект в плагине на событии [siOnUserCabinetAction](#events) с `method = requestReturn`.

::: details Форма возврата (часть чанка siUserOrderTpl)

```fenom:line-numbers
{if $can_return}
<form data-si-form="orderReturn{$id}" data-si-preset="order_return" data-si-nosave>
  <input type="hidden" name="order_id" value="{$id}">
  {foreach $products_list as $product}
  <label>
    <span>{$product.name} <small>(в заказе {$product.count})</small></span>
    <input type="number" name="return_{$product.id}" value="0" min="0" max="{$product.count}">
  </label>
  {/foreach}
  <select name="reason">
    <option value="">Причина возврата</option>
    <option>Не подошёл размер</option>
    <option>Брак или повреждение</option>
  </select>
  <p data-si-error="reason"></p>
  <textarea name="comment" placeholder="Комментарий"></textarea>
  <button type="submit">Отправить заявку</button>
</form>
{/if}
```

:::

::: details Пресет order_return

```php:line-numbers
'order_return' => [
  'snippet' => 'siCabinetAction',
  'method' => 'requestReturn',
  'validate' => 'reason:required',
  'reason.vTextRequired' => 'Укажите причину возврата.',
  'reloadPage' => 1,
  'redirectTimeout' => 2000,
],
```

:::

Поля формы:

* `order_id` — ID заказа.
* `return_{ID позиции}` — сколько единиц позиции вернуть. Позиции с `0` пропускаются, количество больше заказанного вызывает ошибку.
* `reason` — причина.
* `comment` — комментарий.

::: details Пример обработки заявки

```php:line-numbers
switch ($modx->event->name) {
  case 'siOnUserCabinetAction':
    if ($method !== 'requestReturn') {
      break;
    }
    $lines = [];
    foreach ($data['items'] as $item) {
      $lines[] = $item['name'] . ' — ' . $item['return_count'] . ' шт.';
    }
    $modx->getService('mail', 'mail.modPHPMailer');
    $modx->mail->set(modMail::MAIL_SUBJECT, 'Возврат по заказу №' . $object->get('num'));
    $modx->mail->set(modMail::MAIL_BODY, implode('<br>', $lines) . '<br>Причина: ' . $data['reason'] . '<br>' . $data['comment']);
    $modx->mail->set(modMail::MAIL_FROM, $modx->getOption('emailsender'));
    $modx->mail->address('to', $modx->getOption('ms2_email_manager'));
    $modx->mail->setHTML(true);
    $modx->mail->send();
    $modx->mail->reset();
    break;
}
```

:::

## Адреса доставки {#addresses}

Покупатель хранит несколько адресов доставки (таблица `si_user_addresses`), выбирает адрес по умолчанию и подставляет любой адрес в форму оформления заказа. Работает при включённом действии `addresses`.

Адреса выводит сниппет [siUserAddresses](/components/sendit/snippets#siuseraddresses). Один и тот же вызов подходит и для кабинета, и для страницы оформления: кнопка «Выбрать» подставляет адрес в заказ, а JS-модуль **OrderFields** заполняет форму `#msOrder` значениями из ответа.

Как подставляются поля:

* Выбранные в кабинете поля хранятся в сессии SendIt и подставляются на событии `msOnBeforeAddToOrder`, пока покупатель не исправит поле на странице оформления сам.
* Если адрес не выбран, подставляется адрес по умолчанию.
* После оформления заказа (`msOnCreateOrder`) выбор сбрасывается.
* Первый сохранённый адрес автоматически становится основным. При удалении основного основным становится следующий адрес.

::: details Чанк siExampleAddressForm (список и форма нового адреса)

```fenom:line-numbers
{'!siUserAddresses' | snippet: [
  'tpl' => 'siUserAddressTpl',
  'tplEmpty' => '@INLINE <p>Адресов пока нет.</p>',
]}

<form action="#" data-si-form="addressForm" data-si-preset="address_save">
  <input type="text" name="name" placeholder="Название, например «Дом»">
  {foreach ['receiver' => 'Получатель', 'phone' => 'Телефон', 'email' => 'Email', 'index' => 'Индекс', 'region' => 'Регион', 'city' => 'Город', 'street' => 'Улица', 'building' => 'Дом', 'entrance' => 'Подъезд', 'floor' => 'Этаж', 'room' => 'Квартира', 'comment' => 'Комментарий'] as $field => $label}
  <label>
    <input type="text" name="{$field}" placeholder="{$label}">
    <p data-si-error="{$field}"></p>
  </label>
  {/foreach}
  <input type="checkbox" name="is_default" value="1" id="addressIsDefault">
  <label for="addressIsDefault">Сделать основным</label>
  <button type="submit">Сохранить адрес</button>
</form>
```

:::

::: details Пресеты адресов

```php:line-numbers
'address_save' => [
  'snippet' => 'siCabinetAction',
  'method' => 'save',
  'reloadPage' => 1,
  'redirectTimeout' => 1000,
  'validate' => 'receiver:required,phone:required,city:required,street:required',
  'receiver.vTextRequired' => 'Укажите получателя.',
  'phone.vTextRequired' => 'Укажите телефон.',
  'city.vTextRequired' => 'Укажите город.',
  'street.vTextRequired' => 'Укажите улицу.',
],
'address_remove' => [
  'snippet' => 'siCabinetAction',
  'method' => 'remove',
  'reloadPage' => 1,
],
'address_default' => [
  'snippet' => 'siCabinetAction',
  'method' => 'setDefault',
  'reloadPage' => 1,
],
'address_apply' => [
  'snippet' => 'siCabinetAction',
  'method' => 'apply',
],
```

:::

| Пресет | method | Что делает |
|---|---|---|
| `address_save` | `save` | Сохраняет новый адрес или, если передан `address_id`, изменяет существующий. Поле `name` — название адреса (если пусто, собирается из города и улицы), `is_default` — сделать основным. |
| `address_remove` | `remove` | Удаляет адрес `address_id`. |
| `address_default` | `setDefault` | Делает адрес `address_id` основным. |
| `address_apply` | `apply` | Подставляет адрес `address_id` в заказ miniShop2 и возвращает подставленные поля в `data.orderFields`. |

Сохраняются поля адреса заказа miniShop2: `receiver`, `phone`, `email`, `country`, `index`, `region`, `city`, `metro`, `street`, `building`, `entrance`, `floor`, `room`, `comment`, `text_address`. Остальные поля формы игнорируются.

### Чанк адреса siUserAddressTpl {#tpl-address}

Выводится для каждого адреса. В нём стоят формы «Выбрать», «Сделать основным» и «Удалить», каждая передаёт `address_id`.

::: details Фрагмент чанка siUserAddressTpl

```fenom:line-numbers
<div data-si-address="{$id}" class="{$selected ? 'selected' : ''}">
  <p>
    <b>{$name}</b>{if $is_default} (по умолчанию){/if}<br>
    {$receiver}{if $phone}, {$phone}{/if}<br>
    {$city}{if $street}, {$street}{/if}{if $building} {$building}{/if}{if $room}, кв. {$room}{/if}
  </p>
  <form data-si-form="addressApply{$id}" data-si-preset="address_apply" data-si-nosave>
    <input type="hidden" name="address_id" value="{$id}">
    <button type="submit">{if $selected}Выбран{else}Выбрать{/if}</button>
  </form>
  {if !$is_default}
  <form data-si-form="addressDefault{$id}" data-si-preset="address_default" data-si-nosave>
    <input type="hidden" name="address_id" value="{$id}">
    <button type="submit">Сделать основным</button>
  </form>
  {/if}
  <form data-si-form="addressRemove{$id}" data-si-preset="address_remove" data-si-nosave>
    <input type="hidden" name="address_id" value="{$id}">
    <button type="submit">Удалить</button>
  </form>
</div>
```

:::

Доступные плейсхолдеры:

| Плейсхолдер | Что содержит | Пример |
|---|---|---|
| `{$id}` | ID адреса | `3` |
| `{$name}` | Название адреса | `Дом` |
| `{$is_default}` | Адрес по умолчанию | `true` |
| `{$selected}` | Адрес сейчас выбран для заказа (все его поля совпадают с подставленными в заказ) | `false` |
| `{$receiver}` | Получатель | `Иван Петров` |
| `{$phone}` | Телефон | `+7 900 000-00-00` |
| `{$email}` | Email | `ivan@example.com` |
| `{$country}` | Страна | `Россия` |
| `{$index}` | Индекс | `101000` |
| `{$region}` | Регион | `Московская область` |
| `{$city}` | Город | `Москва` |
| `{$metro}` | Метро | `Китай-город` |
| `{$street}` | Улица | `Тверская` |
| `{$building}` | Дом | `7` |
| `{$entrance}` | Подъезд | `2` |
| `{$floor}` | Этаж | `5` |
| `{$room}` | Квартира | `12` |
| `{$comment}` | Комментарий | `Домофон не работает` |
| `{$text_address}` | Адрес одной строкой | `Москва, Тверская, 7` |
| `{$fields}` | Все заполненные поля адреса массивом | `{$fields.city}` |
| `{$tpl}`, `{$tplEmpty}` и другие | Параметры вызова сниппета | `siUserAddressTpl` |

::: tip
Пустые поля адреса не сохраняются, поэтому их плейсхолдеры в чанке отсутствуют. Проверяйте их через `{if $field}`.
:::

Если задан параметр `tplWrapper`, в его чанк передаётся плейсхолдер `{$output}` — все адреса, собранные вместе, и параметры вызова сниппета.

## Сохранённая корзина {#saved-cart}

С версии 2.10.0. Корзина авторизованного покупателя сохраняется в таблицу `si_user_carts` на событиях корзины miniShop2 (`msOnAddToCart`, `msOnChangeInCart`, `msOnRemoveFromCart`, `msOnEmptyCart`) и возвращается при входе (`OnWebLogin`), в том числе с другого устройства.

* Позиции сохранённой корзины добавляются к текущей. Если позиция уже есть в текущей корзине, у неё остаётся большее из двух количеств, а не сумма.
* После оформления заказа сохранённая корзина очищается.
* Работает только при `ms2_tmp_storage = session` и включённом действии `savecart`. Отдельного пресета и разметки не требует.

## События {#events}

### siOnBeforeUserCabinetAction

Генерируется перед выполнением действия кабинета. Позволяет поправить данные действия или запретить его.

Доступные параметры:

* **$method** — действие (см. таблицу ниже).
* **$data** — данные действия.
* **$object** — объект, над которым выполняется действие: `msOrder` для заказов, `siUserAddress` для адресов (`null` при сохранении нового адреса).
* **$Cabinet** — экземпляр класса действия.
* **$SendIt** — экземпляр класса-обработчика.

Плагин возвращает через `$modx->event->returnedValues`:

* `data` — массив, который сливается с `$data` (`array_merge`);
* `error` — текст отказа, действие не выполняется, текст показывается пользователю.

| method | Ключи $data |
|---|---|
| `toCart` | `items` (позиции: `id` товара, `count`, `options`, `name`), `cleanCart`, `redirectUrl` |
| `repeat` | `items`, `orderFields` (доставка, оплата и поля адреса для заказа), `cleanCart`, `redirectUrl` |
| `pay` | пусто; если вернуть `redirectUrl`, переход будет на него, без вызова `send()` способа оплаты |
| `cancel` | `status` — ID статуса, в который переводится заказ |
| `requestReturn` | `items` (поля позиции заказа и `return_count`), `reason`, `comment` |
| `saveAddress` | `name`, `fields` (поля адреса), `is_default` |
| `removeAddress` | пусто |
| `applyAddress` | `orderFields` — поля, которые будут подставлены в заказ |

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name) {
  case 'siOnBeforeUserCabinetAction':
    // не даём отменять заказы дороже 50 000
    if ($method === 'cancel' && $object->get('cost') > 50000) {
      $modx->event->returnedValues['error'] = 'Для отмены свяжитесь с менеджером.';
    }
    // повтор заказа не очищает корзину
    if ($method === 'repeat') {
      $modx->event->returnedValues['data'] = ['cleanCart' => false];
    }
    break;
}
```

:::

### siOnUserCabinetAction

Генерируется после успешного выполнения действия. Параметры те же, что у **siOnBeforeUserCabinetAction**; `$data` — итоговые данные действия. Для `toCart` и `repeat` в `$data` дополнительно приходят `skipped` (названия не добавленных товаров) и `cart` (статус корзины). Для `setDefaultAddress` событие генерируется только после действия, `$data` пустой.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name) {
  case 'siOnUserCabinetAction':
    if ($method === 'cancel') {
      $modx->log(modX::LOG_LEVEL_INFO, 'Покупатель отменил заказ №' . $object->get('num'));
    }
    break;
}
```

:::
