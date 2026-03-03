---
title: Интеграция с MiniShop3
---
# Интеграция с MiniShop3

## Событие msOnGetCartCost

Компонент интегрируется в расчёт стоимости корзины через событие MiniShop3.

| Свойство | Значение |
|----------|----------|
| Событие | `msOnGetCartCost` |
| Назначение | Применить скидку к итоговой стоимости корзины |

### Контракт входа (`scriptProperties`)

| Ключ | Тип | Описание |
|------|-----|----------|
| `cost` | float | Текущая рассчитанная стоимость корзины |
| `cart` | mixed | Корзина (объект/структура зависит от версии MS3) |
| `draft` | object\|null | Черновик заказа |

Плагин передаёт массив в `FtbDiscountService::apply($scriptProperties)`.

### Контракт выхода (`returnedValues`)

```php
$modx->event->returnedValues['cost'] = $newCost;
```

MiniShop3 использует `returnedValues['cost']`, если ключ задан.

При успешном применении скидки плагин также заполняет:
- `returnedValues['ftb_discount']['amount']`
- `returnedValues['ftb_discount']['message']`

### Порядок выполнения

Если на `msOnGetCartCost` подписано несколько плагинов, итоговая стоимость зависит от приоритета вызова в MODX.

## Плашка на странице заказа

Компонент поддерживает вывод плашки «Скидка на первый заказ».

### Сниппет

Добавьте в шаблон/чанк формы заказа:

::: code-group

```modx
[[!ms3ftbDiscountBanner]]
```

```fenom
{$modx->runSnippet('ms3ftbDiscountBanner', [])}
```

:::

Сниппет:
- для авторизованных проверяет eligibility через сервис
- для гостей плашка показывается сразу, а после ввода email/phone может быть скрыта по результату проверки
- берёт значения `ftb_discount_type`, `ftb_discount_value`, `ms3_currency`

### Assets и фронтенд-логика

Плагин `ftb_discount` на событиях `OnWebPageInit`/`OnWebPagePrerender` подключает:
- CSS (`assets/components/ms3firsttimebuyerdiscount/css/*.css`)
- JS (`assets/components/ms3firsttimebuyerdiscount/js/ftb-order.js`)
- `window.MS3FTB_ELIGIBLE_URL`

`ftb-order.js`:
- слушает поля `email` и `phone` на форме заказа
- сохраняет их через `ms3.orderAPI.add(...)`
- обновляет стоимость (`updateOrderCosts` / `getCost`)
- запрашивает eligibility у endpoint `assets/components/ms3firsttimebuyerdiscount/eligible.php`
- скрывает/показывает плашку в зависимости от ответа

### Endpoint eligibility

`assets/components/ms3firsttimebuyerdiscount/eligible.php` возвращает:

```json
{"eligible": true}
```

или

```json
{"eligible": false}
```

на основе `getPaidOrdersCountByContact(email, phone, 0)`.

## Зависимости от настроек MiniShop3

### `ms3_status_for_stat`

Используется для определения «оплаченных» заказов при проверке first-time buyer.

### `ms3_status_new`

Автоматически добавляется сервисом к учитываемым статусам как маркер первого заказа.

Если `ms3_status_for_stat` пуст, сервис считает оплаченных заказов `0` и пишет warning в лог `ftb` (один раз за запрос).

## Модели MiniShop3

Компонент использует:
- `MiniShop3\Model\msOrder`
- `MiniShop3\Model\msOrderAddress`

Для гостей используется join `msOrder.id = msOrderAddress.order_id`.
