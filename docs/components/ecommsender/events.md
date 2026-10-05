# Системные события

eCommSender вызывает системные события (группа `eCommSender`), через которые сайт
может дополнить данные или отменить отправку. Во всех событиях доступен параметр
`$object` — экземпляр сервиса `eCommSender\eCommSender`.

## `OnGetEcsWebConfig`

Вызывается перед выводом конфигурации фронтенда (`window.ecsConfig`). Параметры:
`$webConfig`, `$object`.

```php
$object->webConfig['paramName'] = 'paramValue';
```

## `OnEcsHandleEvent`

Вызывается после формирования события. Параметры: `$event` (имя события, например
`add`), `$object`. Пуши для `dataLayer` лежат в `$object->output` — их можно дополнить
или заменить.

```php
if ($event === 'add') {
    $object->output[] = ['event' => 'my_add', 'value' => 100];
}
```

## `OnSendEventByMeasurementProtocol`

Вызывается перед серверной отправкой по Measurement Protocol. Параметры:
`$commerceEventName`, `$object`. Данные запроса — `$object->outputProtocol`;
пустой массив отменяет отправку.

```php
$object->outputProtocol = [];
```

## `ecsOnGetRequires`

С версии 1.1.0. Список обязательных полей заказа, после заполнения которых отправляется
`add_shipping_info`. По умолчанию берётся из `msDelivery.requires` выбранной доставки.
Параметры: `$deliveryId`, `$requires` (массив имён полей), `$object`.

```php
// обязательность полей задана не в msDelivery, а в своей конфигурации
if ((int)$deliveryId === 2) {
    $modx->event->returnedValues['requires'] = ['receiver', 'phone', 'city', 'street'];
}
```

Пустой массив — событие уходит сразу после выбора доставки.

## `ecsOnBeforeHashUserData`

С версии 1.2.0. Вызывается перед хешированием полей из `hashedKeys` — здесь контакты
приводятся к каноническому виду, которого ждут Google и Meta. Параметры: `$userData`,
`$orderData`, `$object`.

Верните в `returnedValues` массивы `userData` и/или `orderData`: они сливаются с
исходными, переданные ключи перезаписываются.

```php
// телефон введён в национальном формате — дописать код страны
$phone = $userData['phone'] ?? '';
if ($phone !== '' && strpos($phone, '+') !== 0) {
    $modx->event->returnedValues['userData'] = ['phone' => '+39' . $phone];
}
```

После события телефон (любое поле, в имени которого есть `phone`) всегда приводится к
цифрам — E.164 без `+`, пробелов и скобок — и только затем хешируется.
