# Системные настройки

Все настройки находятся в пространстве имён `cdekintegrate` в системных настройках MODX.

## Основные

| Настройка | Описание | По умолчанию |
|-----------|----------|:------------:|
| `cdekintegrate_debug` | Записывать подробные логи в `core/components/cdekintegrate/logs/` | `false` |
| `cdekintegrate_test_mode` | Использовать тестовую среду API СДЭК (`api.edu.cdek.ru`). Для тестирования используйте тестовые ключи СДЭК | `false` |

## Заказы

| Настройка | Описание | По умолчанию |
|-----------|----------|:------------:|
| `cdekintegrate_create_statuses` | JSON-массив ID статусов MS3, при переходе в которые заказ автоматически отправляется в СДЭК | `[2]` |
| `cdekintegrate_cancel_status` | ID статуса MS3, при переходе в который заказ автоматически отменяется в СДЭК | `4` |
| `cdekintegrate_cash_payment_ids` | JSON-массив ID способов оплаты, для которых стоимость доставки передаётся как наложенный платёж | `[]` |
| `cdekintegrate_recipient_cost` | Передавать стоимость доставки получателю. Работает только если способ оплаты в списке `cash_payment_ids` | `false` |

::: details Пример: наложенный платёж

Если у вас способ оплаты «Наложенный платёж» имеет ID 3, а «Оплата при получении» — ID 5:

```
cdekintegrate_cash_payment_ids: [3, 5]
cdekintegrate_recipient_cost: true
```

При создании заказа с одним из этих способов оплаты, стоимость доставки будет передана в СДЭК как сумма наложенного платежа.
:::

## Отправитель

| Настройка | Описание | По умолчанию |
|-----------|----------|:------------:|
| `cdekintegrate_shipment_point` | Код ПВЗ отправления (если отправляете через пункт СДЭК). Приоритетнее адреса отправления | — |
| `cdekintegrate_from_location` | JSON-объект с адресом отправления. Используется, если не указан `shipment_point` | — |
| `cdekintegrate_seller_name` | Наименование продавца. Используется в данных заказа СДЭК | — |
| `cdekintegrate_company_name` | Наименование компании. Используется при формировании накладных | — |

::: info
Должен быть заполнен либо `shipment_point`, либо `from_location`. Если указаны оба — используется `shipment_point`.
:::

::: details Формат from_location

```json
{
  "country_code": "RU",
  "city": "Москва",
  "address": "ул. Примерная, 1"
}
```

Поддерживаемые поля: `country_code`, `city`, `postal_code`, `address`.
:::

## Накладные

| Настройка | Описание | По умолчанию |
|-----------|----------|:------------:|
| `cdekintegrate_invoice_path` | Полный путь к директории для сохранения скачанных PDF-накладных и штрихкодов | `{core_path}components/cdekintegrate/invoices/` |

## Вебхуки

| Настройка | Описание | По умолчанию |
|-----------|----------|:------------:|
| `cdekintegrate_webhook_url` | Полный URL для регистрации вебхука в СДЭК | — |
| `cdekintegrate_status_mapping` | JSON-объект маппинга статусов СДЭК на статусы MS3 | `{}` |

::: details Пример маппинга статусов

```json
{
  "DELIVERED": 5,
  "RECEIVED_AT_SHIPMENT_WAREHOUSE": 3,
  "ACCEPTED_AT_PICK_UP_POINT": 4
}
```

Ключ — код статуса СДЭК, значение — ID статуса MiniShop3. При получении вебхука от СДЭК статус заказа MS3 автоматически обновится, если для кода статуса СДЭК настроен маппинг.
:::

### Доступные коды статусов СДЭК

| Код | Описание |
|-----|----------|
| `CREATED` | Создан |
| `RECEIVED_AT_SHIPMENT_WAREHOUSE` | Принят на складе отправителя |
| `READY_FOR_SHIPMENT_IN_SENDER_CITY` | Готов к отправке в городе отправителя |
| `TAKEN_BY_TRANSPORTER_FROM_SENDER_CITY` | Забран перевозчиком из города отправителя |
| `SENT_TO_TRANSIT_CITY` | Отправлен в транзитный город |
| `ACCEPTED_IN_TRANSIT_CITY` | Принят в транзитном городе |
| `ACCEPTED_AT_TRANSIT_WAREHOUSE` | Принят на транзитном складе |
| `READY_FOR_SHIPMENT_IN_TRANSIT_CITY` | Готов к отправке в транзитном городе |
| `TAKEN_BY_TRANSPORTER_FROM_TRANSIT_CITY` | Забран перевозчиком из транзитного города |
| `SENT_TO_RECIPIENT_CITY` | Отправлен в город получателя |
| `ACCEPTED_IN_RECIPIENT_CITY` | Принят в городе получателя |
| `ACCEPTED_AT_RECIPIENT_CITY_WAREHOUSE` | Принят на складе в городе получателя |
| `ACCEPTED_AT_PICK_UP_POINT` | Принят в пункте выдачи |
| `TAKEN_BY_COURIER` | Выдан курьеру для доставки |
| `DELIVERED` | Вручён |
| `NOT_DELIVERED` | Не вручён |
| `RETURNED_TO_SENDER_CITY_WAREHOUSE` | Возвращён на склад в городе отправителя |
| `RETURNED_TO_TRANSIT_WAREHOUSE` | Возвращён на транзитный склад |
| `RETURNED_TO_RECIPIENT_CITY_WAREHOUSE` | Возвращён на склад в городе получателя |
| `SENT_TO_SENDER_CITY` | Отправлен в город отправителя |
| `ACCEPTED_IN_SENDER_CITY` | Принят в городе отправителя |
| `INVALID` | Некорректный заказ |
| `CANCELLED` | Отменён |
