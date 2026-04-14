# Разработка

## Архитектура

Компонент построен на сервис-фасаде `CdekIntegrate\CdekIntegrate`, который через lazy initialization предоставляет доступ к обработчикам.

| Класс | Назначение |
|-------|-----------|
| `CdekIntegrate` | Главный сервис-фасад, точка входа |
| `ExternalApi\CdekOrders` | API-клиент СДЭК, расширяет `MsCdek\ExternalApi\Cdek` |
| `Handlers\OrderHandler` | Создание и отмена заказов |
| `Handlers\InvoiceHandler` | Генерация накладных и штрихкодов |
| `Helpers\StatusMapper` | Маппинг 23 статусов СДЭК на статусы MS3 |
| `Controllers\Api\Web\WebhookController` | Вебхуки + 6 менеджерских API-эндпоинтов |
| `Model\CdekHistory` | xPDO-модель таблицы истории |

## Расширение через события

Основной способ расширения — [события MODX](/components/cdekintegrate/events).

### Модификация данных заказа

Используйте событие `cdekIntegrateOnBeforeCreateOrder` для изменения любых полей запроса к API СДЭК:

```php:line-numbers
switch ($modx->event->name) {
    case 'cdekIntegrateOnBeforeCreateOrder':
        // Добавить дополнительную услугу
        $requestData['services'] = [
            ['code' => 'INSURANCE', 'parameter' => (string) $order->get('cost')]
        ];

        // Переопределить получателя
        $requestData['recipient']['name'] = 'Иванов Иван';
        break;
}
```

### Реакция на вебхуки

Событие `cdekIntegrateOnWebhook` позволяет выполнять произвольные действия при обновлении статуса:

```php:line-numbers
switch ($modx->event->name) {
    case 'cdekIntegrateOnWebhook':
        $statusCode = $data['attributes']['code'] ?? '';

        if ($statusCode === 'DELIVERED') {
            // Отправить email покупателю
            // Обновить CRM
        }
        break;
}
```

## Тестовый режим

Включите настройку `cdekintegrate_test_mode` для работы с тестовой средой СДЭК (`api.edu.cdek.ru`).

::: warning
Для тестового режима используйте тестовые учётные данные СДЭК. Публичные тестовые ключи из документации СДЭК могут не работать — запросите доступ через личный кабинет СДЭК.
:::

В тестовом режиме:
- Все запросы идут на `api.edu.cdek.ru` вместо `api.cdek.ru`
- OAuth-токен кешируется отдельно (`cdekintegrate/api_token_test`)
- Заказы создаются в тестовой среде и не попадают в реальную систему

## Формат данных в msOrder.properties

После отправки заказа в СДЭК данные сохраняются в `msOrder.properties.cdekintegrate`:

```json
{
  "cdek_uuid": "72753031-....",
  "cdek_number": "1234567890",
  "status_code": "DELIVERED",
  "status_name": "Вручён",
  "created_at": "2025-01-10 12:00:00",
  "invoice_uuid": "uuid-накладной",
  "barcode_uuid": "uuid-штрихкода"
}
```

Получить эти данные в плагине или сниппете:

```php:line-numbers
$properties = $order->get('properties') ?: [];
$cdekData = $properties['cdekintegrate'] ?? [];

$uuid = $cdekData['cdek_uuid'] ?? '';
$status = $cdekData['status_code'] ?? '';
$trackNumber = $cdekData['cdek_number'] ?? '';
```

## Определение тарифа

Компонент определяет код тарифа СДЭК для заказа в следующем порядке:

1. `msAddress.properties.tariff_code` — сохранённый при расчёте доставки
2. `mscdek_main_tariffs` — JSON-маппинг `{delivery_id: tariff_code}`
3. `msDelivery.description` — если содержит числовое значение

## Формирование пакетов

Компонент формирует packages для API СДЭК самостоятельно из `msOrderProduct`, а не через `mscdek->getPackages()`. Это связано с тем, что метод msCDEK рассчитан на данные корзины, а не на сохранённые данные заказа.

Размеры пакета берутся из настроек msCDEK (`mscdek_packages_default_size`), вес — из товаров заказа с учётом множителя `mscdek_packages_weight_multiplier`.

## Роутинг

Маршруты регистрируются через файл `core/config/ms3.routes.d/web/cdekintegrate.php`, который создаётся резолвером при установке пакета. Авторизация проверяется внутри методов контроллера (MiniShop3 Router не поддерживает Closure в качестве middleware).
