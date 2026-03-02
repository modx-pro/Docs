---
title: API и события
---
# API и события

## Сервис FtbDiscountService

**Класс:** `Ms3FirstTimeBuyerDiscount\Services\FtbDiscountService`  
**Ключ в контейнере:** `ms3ftb_discount`

### Конструктор

```php
public function __construct(modX $modx)
```

### Публичные методы

#### isEligible

Проверяет право на скидку: настройка включена и найдено 0 оплаченных заказов.

- Для авторизованных: проверка по `user_id`
- Для гостей: проверка по `email`/`phone` из `draft -> Address`
- При наличии `draft` текущий заказ исключается из подсчёта

```php
public function isEligible(int $userId, ?object $draft = null): bool
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `userId` | int | ID пользователя |
| `draft`  | object\|null | Черновик заказа (опционально) |

**Возврат:** `true`, если скидку можно применить, иначе `false`.

---

#### getPaidOrdersCount

Количество оплаченных заказов пользователя в статусах из `ms3_status_for_stat`.

```php
public function getPaidOrdersCount(int $userId, int $excludeOrderId = 0): int
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `userId` | int | ID пользователя |
| `excludeOrderId` | int | ID заказа, который нужно исключить из подсчёта (`0` — не исключать) |

**Возврат:** число заказов (0 и больше).

---

#### getGuestContactFromDraft

Извлекает контакты гостя из `draft -> Address` и нормализует значения.

```php
public function getGuestContactFromDraft(?object $draft): array
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `draft` | object\|null | Черновик заказа |

**Возврат:** массив вида `['email' => string, 'phone' => string]`.

---

#### getPaidOrdersCountByContact

Количество оплаченных заказов гостя по email/phone.

```php
public function getPaidOrdersCountByContact(string $email, string $phone, int $excludeOrderId = 0): int
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `email` | string | Email гостя |
| `phone` | string | Телефон гостя |
| `excludeOrderId` | int | ID заказа, который нужно исключить из подсчёта (`0` — не исключать) |

Сравнение:
- `email` — в lower-case
- `phone` — по нормализованным цифрам (для телефона используется tail-10 сопоставление через `LIKE`)

**Возврат:** число заказов (0 и больше).

---

#### calculateDiscount

Вычисляет стоимость после скидки (процент или фикс).

```php
public function calculateDiscount(float $cost, string $type, float $value): float
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `cost`   | float | Исходная сумма |
| `type`   | string | `percent` или `fixed` |
| `value`  | float | Процент (0–100) или фиксированная сумма |

**Возврат:** новая сумма (`fixed`: `max(0, cost - max(0, value))`; `percent`: c ограничением 0–100%).

---

#### apply

Полный цикл: проверка права → `ftbOnBeforeApply` → расчёт → `ftbOnApply`.

```php
public function apply(array $scriptProperties): ?float
```

| Ключ | Тип | Описание |
|------|-----|----------|
| `cost` | float | Текущая стоимость корзины |
| `cart` | mixed | Объект/данные корзины MiniShop3 |
| `draft` | object\|null | Черновик заказа |

Дополнительно учитывается настройка `ftb_allow_combination`:
- если `false` и в корзине уже есть скидка (`total_discount > 0`), FTB-скидка не применяется

**Возврат:** новая стоимость (`float`) или `null`.

---

## События MODX

### ftbOnBeforeApply

Вызывается до расчёта скидки. Позволяет отменить применение или подменить базовую сумму.

| Ключ | Тип | Описание |
|------|-----|----------|
| `user_id` | int | ID пользователя |
| `cost` | float | Текущая стоимость |
| `draft` | object\|null | Черновик заказа |
| `cart` | mixed | Корзина |
| `settings` | array | `ftb_enabled`, `ftb_discount_type`, `ftb_discount_value`, `ftb_allow_combination` |

`returnedValues`:

| Ключ | Тип | Описание |
|------|-----|----------|
| `apply` | bool | `false` — отменить применение скидки |
| `cost` | float | Подменить сумму для расчёта скидки |

---

### ftbOnApply

Вызывается после успешного применения скидки.

| Ключ | Тип | Описание |
|------|-----|----------|
| `user_id` | int | ID пользователя |
| `cost_before` | float | Стоимость до скидки |
| `cost_after` | float | Стоимость после скидки |
| `discount_amount` | float | Размер скидки |
| `draft` | object\|null | Черновик заказа |

---

## Системные настройки

Префикс: `ms3firsttimebuyerdiscount_`.

| Ключ | xtype | По умолчанию | Описание |
|------|-------|--------------|----------|
| `ftb_enabled` | combo-boolean | true | Включить скидку для first-time buyer |
| `ftb_discount_type` | textfield | percent | Тип: `percent` или `fixed` (регистр не важен) |
| `ftb_discount_value` | number | 10 | Значение скидки: процент (0–100) или сумма |
| `ftb_allow_combination` | combo-boolean | true | Разрешить совмещение с уже применёнными скидками корзины |

Связанные настройки MiniShop3:
- `ms3_status_for_stat` — статусы оплаченных заказов
- `ms3_status_new` — добавляется в список учитываемых статусов как маркер первого заказа
