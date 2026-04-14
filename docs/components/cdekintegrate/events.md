# События

## Свои события

CdekIntegrate генерирует 3 собственных события MODX.

#### cdekIntegrateOnBeforeCreateOrder

Генерируется перед отправкой заказа в СДЭК. Позволяет модифицировать данные запроса или отменить создание.

Доступные параметры:

* **$order** — объект `msOrder`.
* **$requestData** — массив данных запроса к API СДЭК (передаётся по ссылке, можно модифицировать).

Чтобы отменить создание заказа, верните `false` из плагина.

::: details Пример: добавить комментарий к заказу

```php:line-numbers
switch ($modx->event->name) {
    case 'cdekIntegrateOnBeforeCreateOrder':
        $requestData['comment'] = 'Хрупкий груз, обращаться осторожно';
        break;
}
```

:::

::: details Пример: отменить создание по условию

```php:line-numbers
switch ($modx->event->name) {
    case 'cdekIntegrateOnBeforeCreateOrder':
        // Не отправлять заказы с суммой менее 500 руб.
        if ((float) $order->get('cost') < 500) {
            $modx->event->output(false);
            return false;
        }
        break;
}
```

:::

#### cdekIntegrateOnAfterCreateOrder

Генерируется после успешного создания заказа в СДЭК.

Доступные параметры:

* **$order** — объект `msOrder`.
* **$cdek_uuid** — UUID созданного заказа в СДЭК.
* **$result** — полный ответ API СДЭК.

::: details Пример: отправить уведомление менеджеру

```php:line-numbers
switch ($modx->event->name) {
    case 'cdekIntegrateOnAfterCreateOrder':
        $orderId = $order->get('id');
        $modx->log(1, "Заказ #{$orderId} отправлен в СДЭК, UUID: {$cdek_uuid}");
        // Здесь можно отправить email или уведомление в Telegram
        break;
}
```

:::

#### cdekIntegrateOnWebhook

Генерируется при получении вебхука от СДЭК.

Доступные параметры:

* **$data** — массив данных вебхука от СДЭК.
* **$order** — объект `msOrder` (если заказ найден).

::: details Пример: логирование вебхуков

```php:line-numbers
switch ($modx->event->name) {
    case 'cdekIntegrateOnWebhook':
        $statusCode = $data['attributes']['code'] ?? 'unknown';
        $orderId = $order ? $order->get('id') : 'not found';
        $modx->log(1, "CDEK webhook: status={$statusCode}, order={$orderId}");
        break;
}
```

:::

## Слушает события

CdekIntegrate подписан на два системных события MiniShop3.

#### msOnChangeOrderStatus

Срабатывает при смене статуса заказа MS3. Компонент проверяет:

1. Если новый статус входит в `cdekintegrate_create_statuses` — автоматически создаёт заказ в СДЭК.
2. Если новый статус равен `cdekintegrate_cancel_status` — автоматически отменяет заказ в СДЭК.

#### msOnManagerCustomCssJs

Срабатывает при загрузке страницы редактирования заказа в админке. Компонент подключает Vue-панель с интерфейсом управления заказом СДЭК на вкладке «СДЭК Интеграция».
