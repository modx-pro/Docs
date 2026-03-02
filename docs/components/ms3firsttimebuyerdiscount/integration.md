---
title: Интеграция с MiniShop3
---
# Интеграция с MiniShop3

## Событие msOnGetCartCost

Компонент подключается к расчёту стоимости корзины через одно событие MiniShop3.

| Свойство | Значение |
|----------|----------|
| Событие  | `msOnGetCartCost` |
| Назначение | Изменить итоговую стоимость корзины (например, применить скидку) |

### Контракт входа (scriptProperties)

MiniShop3 передаёт в плагины массив. Используемые ключи:

| Ключ   | Тип    | Описание |
|--------|--------|----------|
| `cost` | float  | Текущая рассчитанная стоимость корзины |
| `cart` | mixed  | Данные корзины (структура зависит от версии MS3) |
| `draft`| object\|null | Черновик заказа (если расчёт в контексте заказа), обычно с методом `get('user_id')` |

Плагин получает этот массив и передаёт его в `FtbDiscountService::apply($scriptProperties)`.

### Контракт выхода (returnedValues)

Чтобы изменить стоимость, плагин должен записать новое значение в возвращаемые значения события:

```php
$modx->event->returnedValues['cost'] = $newCost;  // float
```

MiniShop3 использует `returnedValues['cost']`, если оно задано, иначе оставляет исходный `cost`. Если плагин не устанавливает `cost`, стоимость не меняется.

При применении скидки плагин также записывает в `returnedValues['ftb_discount']` данные для уведомления. MiniShop3 (через `Utils::invokeEvent`) мержит `returnedValues` в ответ API, поэтому в ответе `orderAPI.getCost()` появляется поле `data.ftb_discount`:

| Ключ     | Тип    | Описание |
|----------|--------|----------|
| `amount` | float  | Сумма скидки |
| `message`| string | Готовый текст для показа (из лексикона `ftb_discount_applied`) |

### Уведомление (тост) о скидке

Чтобы показывать пользователю сообщение вида «Скидка на первый заказ: −100 ₽»:

1. **Подключите скрипт** на странице оформления заказа (после загрузки MiniShop3). Скрипт лежит в пакете по пути `core/components/ms3firsttimebuyerdiscount/assets/js/ftb-notification.js`. Если `core` доступен по URL:

   ```html
   <script src="[[+core_url]]components/ms3firsttimebuyerdiscount/assets/js/ftb-notification.js"></script>
   ```

   Иначе скопируйте `ftb-notification.js` в `assets/components/ms3firsttimebuyerdiscount/js/` и подключайте:

   ```html
   <script src="[[+assets_url]]components/ms3firsttimebuyerdiscount/js/ftb-notification.js"></script>
   ```

2. Скрипт оборачивает `ms3.orderAPI.getCost()`. Когда в ответе есть `data.ftb_discount`, вызывается **ms3Message.success(message)** (если загружен UI MiniShop3). Уведомление показывается один раз за визит (`sessionStorage`).

3. Если MiniShop3 загружен без UI или `ms3Message` недоступен, текст пишется в `console.info`.

Текст сообщения задаётся в лексиконе `ms3firsttimebuyerdiscount:default` (ключ `ftb_discount_applied`), плейсхолдер `[[+amount]]`.

### Порядок выполнения

Порядок вызова плагинов на `msOnGetCartCost` определяется системой MODX (приоритет плагина). Если несколько плагинов меняют `cost`, итог зависит от порядка: каждый следующий получает уже изменённое значение в `scriptProperties['cost']` при следующем вызове (в зависимости от реализации MS3). Рекомендуется учитывать только текущий входящий `cost` и не полагаться на то, что другой плагин уже изменил его в том же цикле.

## Зависимость от настроек MiniShop3

### ms3_status_for_stat

Список ID статусов заказа, считающихся «оплаченными» для статистики. Используется компонентом для подсчёта числа оплаченных заказов пользователя и гостей по контактам.

- **Ключ настройки:** `ms3_status_for_stat`
- **Типичное значение:** `2,3` (например, «Оплачен», «Доставлен»)
- **Использование:** `FtbDiscountService::getPaidOrdersCount()` и `FtbDiscountService::getPaidOrdersCountByContact()` фильтруют заказы по `status_id:IN => [2, 3]`

Если настройка пуста или не задана, компонент считает оплаченных заказов 0 (все пользователи считаются first-time buyer по заказам). При пустом списке статусов в лог MODX (категория `ftb`) один раз за запрос пишется предупреждение.

## Модель msOrder

Компонент использует модели MiniShop3 для подсчёта заказов:

- **Класс:** `MiniShop3\Model\msOrder`
- **Поля:** `user_id`, `status_id`, `address_id`
- **Запрос для авторизованных:** `getCount(msOrder::class, ['user_id' => $userId, 'status_id:IN' => $statusIds])`

Для гостей используется join с `MiniShop3\Model\msOrderAddress` по `address_id` и фильтрация по `Address.email`/`Address.phone`.

Убедитесь, что MiniShop3 установлен и модели доступны (namespace MiniShop3 загружен).

Подробнее о сервисе и событиях: [API и события](api).
