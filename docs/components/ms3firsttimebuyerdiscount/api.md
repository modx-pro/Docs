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

Проверяет, можно ли применить скидку: включена настройка и 0 оплаченных заказов.

- Для авторизованного пользователя проверка выполняется по `user_id`.
- Для гостя (`user_id = 0`) проверка выполняется по `email` или `phone` из `draft->getOne('Address')`.

```php
public function isEligible(int $userId, ?object $draft = null): bool
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `userId` | int | ID пользователя |
| `draft`  | object\|null | Объект черновика заказа (опционально), используется для гостей |

**Возврат:** `true`, если скидку можно применить, иначе `false`.

---

#### getPaidOrdersCount

Количество оплаченных заказов пользователя в статусах из настройки MiniShop3 `ms3_status_for_stat`.

```php
public function getPaidOrdersCount(int $userId): int
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `userId` | int | ID пользователя |

**Возврат:** число заказов (0 и больше).

---

#### getGuestContactFromDraft

Извлекает контакты гостя (email/phone) из `draft`.

```php
public function getGuestContactFromDraft(?object $draft): array
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `draft` | object\|null | Черновик заказа (ожидается связь `Address`) |

**Возврат:** массив вида `['email' => string, 'phone' => string]`.

---

#### getPaidOrdersCountByContact

Количество оплаченных заказов по контактам гостя (совпадение по `Address.email` или `Address.phone`).

```php
public function getPaidOrdersCountByContact(string $email, string $phone): int
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `email` | string | Email гостя |
| `phone` | string | Телефон гостя |

**Возврат:** число заказов (0 и больше).

---

#### calculateDiscount

Вычисляет стоимость после скидки (процент или фиксированная сумма).

```php
public function calculateDiscount(float $cost, string $type, float $value): float
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `cost`   | float | Исходная сумма |
| `type`   | string | `percent` или `fixed` (сравнение без учёта регистра) |
| `value`  | float | Процент (0–100) или фиксированная сумма |

**Возврат:** новая сумма (`fixed`: `max(0, cost - max(0, value))`; `percent`: диапазон 0–100%).

---

#### apply

Полный цикл: проверка права → `ftbOnBeforeApply` → расчёт → `ftbOnApply`. Используется плагином из `msOnGetCartCost`.

```php
public function apply(array $scriptProperties): ?float
```

**Вход (scriptProperties):** массив из события `msOnGetCartCost`:

| Ключ   | Тип    | Описание |
|--------|--------|----------|
| `cost` | float  | Текущая стоимость корзины |
| `cart` | mixed  | Данные корзины (зависит от MS3) |
| `draft`| object\|null | Черновик заказа (если есть) |

**Возврат:** новая стоимость (`float`) при успешном применении скидки, иначе `null`.

---

## События MODX

### ftbOnBeforeApply

Вызывается до расчёта скидки. Плагины могут отменить применение или подменить базовую сумму.

**Параметры:**

| Ключ       | Тип    | Описание |
|------------|--------|----------|
| `user_id`  | int    | ID пользователя |
| `cost`     | float  | Текущая стоимость |
| `draft`    | object\|null | Черновик заказа |
| `cart`     | mixed  | Корзина |
| `settings` | array  | Текущие настройки (`ftb_enabled`, `ftb_discount_type`, `ftb_discount_value`) |

**Возвращаемые значения (returnedValues):**

| Ключ   | Тип   | Описание |
|--------|-------|----------|
| `apply`| bool  | `false` — отменить применение скидки |
| `cost` | float | Подменить сумму, к которой применяется скидка |

Если `apply === false`, сервис возвращает `null`. Если задан `cost`, он используется вместо исходного `cost` для расчёта.

---

### ftbOnApply

Уведомление после успешного применения скидки (для логирования, аналитики).

**Параметры:**

| Ключ             | Тип    | Описание |
|------------------|--------|----------|
| `user_id`        | int    | ID пользователя |
| `cost_before`    | float  | Стоимость до скидки |
| `cost_after`     | float  | Стоимость после скидки |
| `discount_amount`| float  | Размер скидки |
| `draft`          | object\|null | Черновик заказа |

---

## Системные настройки

Префикс в конфиге: `ms3firsttimebuyerdiscount_` (например, `ms3firsttimebuyerdiscount_ftb_enabled`).

| Ключ | xtype | По умолчанию | Описание |
|------|--------|--------------|----------|
| `ftb_enabled` | combo-boolean | true | Включить скидку для первых покупок |
| `ftb_discount_type` | textfield | percent | Тип: `percent` (процент) или `fixed` (фиксированная сумма). Ввод вручную; сравнение без учёта регистра. |
| `ftb_discount_value` | number | 10 | Значение: процент (0–100) или сумма в валюте |
| `ftb_allow_combination` | combo-boolean | true | Зарезервировано на будущее (совмещение с другими скидками) |

Получение в коде: `$modx->getOption('ms3firsttimebuyerdiscount_ftb_enabled', null, true)`.
