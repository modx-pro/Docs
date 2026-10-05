---
title: Способы доставки
---
# Способы доставки

Откройте **Пакеты → MiniShop3 → Настройки → Варианты доставки**.

## Поля доставки

| Поле | Тип | Описание |
| --- | --- | --- |
| `name` | string | Название способа доставки |
| `description` | text | Описание для покупателя |
| `price` | string | Базовая стоимость доставки (в БД — `varchar(11)`, в расчёте приводится к числу) |
| `weight_price` | float | Стоимость за единицу веса |
| `distance_price` | float | Стоимость за единицу расстояния — в расчёте сейчас не используется (резервное поле) |
| `free_delivery_amount` | float | Сумма заказа для бесплатной доставки |
| `logo` | string | Путь к изображению |
| `position` | int | Порядок сортировки |
| `active` | bool | Активность |
| `class` | string | PHP-класс обработчика |
| `validation_rules` | JSON | Правила валидации полей |
| `properties` | JSON | JSON-свойства для своих данных обработчика |

## Связь с оплатой

Каждый способ доставки связываете с нужными способами оплаты.

- Наличные только для самовывоза
- Онлайн-оплата для курьерской доставки
- Свои комбинации для разных регионов

Когда покупатель выбирает доставку, список оплат фильтруется.

## Расчёт стоимости

Стоимость доставки рассчитывается по формуле:

```text
Итоговая стоимость = price + (weight_price × вес)
```

Если сумма заказа больше или равна `free_delivery_amount`, стоимость доставки равна 0.

### Свой расчёт

Для сложной логики создайте свой класс-обработчик:

```php
<?php
namespace MyComponent\Delivery;

use MiniShop3\Controllers\Delivery\DeliveryProviderInterface;
use MiniShop3\Model\msDelivery;
use MiniShop3\Model\msOrder;

class CustomDelivery implements DeliveryProviderInterface
{
    public function getCost(msOrder $order, msDelivery $delivery, float $cost): float
    {
        // Ваша логика расчёта
        $cartCost = $order->get('cart_cost');
        $weight = $order->get('weight');

        if ($cartCost > 10000) {
            return 0; // Бесплатно от 10000 руб
        }

        if ($weight > 5000) {
            return 500 + ($weight - 5000) * 0.1; // Наценка за тяжёлый заказ
        }

        return 300; // Базовая стоимость
    }
}
```

Укажите класс в поле `class`: `MyComponent\Delivery\CustomDelivery`.

## Валидация полей заказа

Для каждого способа доставки задаёте обязательные поля и правила: полный адрес для курьера, телефон для самовывоза.

### Визуальный конструктор

#### Визуальный режим

1. Нажмите **Добавить поле**
2. Выберите поле из списка (группы: Заказ, Адрес)
3. Добавьте правила валидации для поля
4. Для правил с параметрами укажите значение

Правила отображаются тегами, удаляются кликом по крестику.

#### JSON-режим

Переключатель открывает ручное редактирование JSON:

```json
{
  "phone": "required",
  "email": "required|email",
  "city": "required|min:2",
  "street": "required|min:3",
  "building": "required"
}
```

В этом режиме правила копируют между доставками, задают regex и переносят JSON между установками.

### Свои поля валидации

Кроме стандартных полей заказа и адреса можно добавить произвольные, например чекбокс согласия:

```json
{
  "phone": "required",
  "email": "required|email",
  "agreement": "required|accepted"
}
```

Поля вне стандартного набора (`agreement` и другие) сохраняются в черновике заказа между шагами `order/add` и `order/submit`. При создании заказа они уходят в события `msOnBeforeCreateOrder` / `msOnCreateOrder` через параметр `customFields`.

::: tip Чекбоксы
На фронтенде чекбоксы отправляют состояние `input.checked` (`'1'` или `'0'`), а не статический атрибут `value`. Это обеспечивает корректную работу правила `accepted`.
:::

### Доступные поля для валидации

#### Поля заказа

| Поле | Описание |
| --- | --- |
| `order_comment` | Комментарий к заказу |

#### Поля адреса

| Поле | Описание |
| --- | --- |
| `first_name` | Имя |
| `last_name` | Фамилия |
| `phone` | Телефон |
| `email` | Email |
| `country` | Страна |
| `index` | Почтовый индекс |
| `region` | Регион/область |
| `city` | Город |
| `metro` | Станция метро |
| `street` | Улица |
| `building` | Дом/строение |
| `entrance` | Подъезд |
| `floor` | Этаж |
| `room` | Квартира/офис |
| `comment` | Комментарий к адресу |
| `text_address` | Полный адрес текстом |

### Правила валидации

Валидацию выполняет встроенный `PipeRuleValidator` (`src/Services/Validation/PipeRuleValidator.php`), внешние библиотеки не нужны. Правила комбинируются через `|`.

#### Базовые правила

| Правило | Описание |
| --- | --- |
| `required` | Обязательное поле |
| `nullable` | Поле может быть null |
| `present` | Поле должно присутствовать (даже пустое) |
| `accepted` | Значение должно быть "yes", "on", "1", true |

#### Типы данных

| Правило | Описание |
| --- | --- |
| `email` | Валидный email |
| `url` | Валидный URL |
| `ip` | IP адрес (v4 или v6) |
| `ipv4` | IPv4 адрес |
| `ipv6` | IPv6 адрес |
| `numeric` | Числовое значение |
| `integer` | Целое число |
| `boolean` | Булево значение |
| `array` | Массив |
| `json` | Валидный JSON |

#### Строковые правила

| Правило | Описание |
| --- | --- |
| `alpha` | Только буквы |
| `alpha_num` | Буквы и цифры |
| `alpha_dash` | Буквы, цифры, дефис, подчёркивание |
| `alpha_spaces` | Буквы и пробелы |
| `uppercase` | Только заглавные буквы |
| `lowercase` | Только строчные буквы |

#### Правила с параметрами

| Правило | Описание | Синтаксис |
| --- | --- | --- |
| `min` | Минимальная длина строки или значение числа | `min:3` |
| `max` | Максимальная длина строки или значение числа | `max:100` |
| `between` | Значение в диапазоне | `between:1,10` |
| `digits` | Точное количество цифр | `digits:6` |
| `digits_between` | Количество цифр в диапазоне | `digits_between:4,8` |
| `in` | Значение из списка | `in:pickup,courier,post` |
| `not_in` | Значение НЕ из списка | `not_in:test,demo` |
| `same` | Совпадает с другим полем | `same:email_confirm` |
| `different` | Отличается от другого поля | `different:old_password` |
| `regex` | Соответствует регулярному выражению | `regex:/^[0-9]{6}$/` |
| `extension` | Расширение файла | `extension:jpg,png` |
| `mimes` | MIME-тип файла | `mimes:jpg,png` |

#### Правила для дат

| Правило | Описание | Синтаксис |
| --- | --- | --- |
| `date` | Валидная дата в формате | `date:Y-m-d` |
| `after` | Дата после указанной | `after:2024-01-01` |
| `before` | Дата до указанной | `before:2025-12-31` |

#### Условные правила

| Правило | Описание | Синтаксис |
| --- | --- | --- |
| `required_if` | Обязательно, если другое поле = значению | `required_if:delivery,courier` |
| `required_unless` | Обязательно, если другое поле ≠ значению | `required_unless:delivery,pickup` |
| `required_with` | Обязательно, если указано другое поле | `required_with:phone` |
| `required_without` | Обязательно, если НЕ указано другое поле | `required_without:email` |
| `required_with_all` | Обязательно, если указаны ВСЕ поля | `required_with_all:city,street` |
| `required_without_all` | Обязательно, если НЕ указано НИ ОДНО поле | `required_without_all:phone,email` |

### Примеры конфигураций

#### Курьерская доставка

Требуется полный адрес:

```json
{
  "first_name": "required|min:2",
  "last_name": "required|min:2",
  "phone": "required|regex:/^\\+?[0-9]{10,15}$/",
  "email": "required|email",
  "city": "required|min:2",
  "street": "required|min:3",
  "building": "required",
  "room": "required_if:building_type,apartment"
}
```

#### Самовывоз

Минимум данных для связи:

```json
{
  "first_name": "required|min:2",
  "phone": "required"
}
```

#### Почтовая доставка

Требуется индекс и полный адрес:

```json
{
  "first_name": "required",
  "last_name": "required",
  "phone": "required",
  "index": "required|digits:6",
  "region": "required",
  "city": "required",
  "street": "required",
  "building": "required"
}
```

#### Доставка в постамат

Только контактные данные:

```json
{
  "first_name": "required",
  "phone": "required|regex:/^\\+?[0-9]{10,15}$/",
  "email": "required|email"
}
```

### Сообщения об ошибках

Сообщения по умолчанию **английские** (`PipeRuleValidator::DEFAULT_MESSAGES`): язык интерфейса они не читают. Настроить их можно через `setValidationRules()` / `setValidationMessages()` (`OrderFieldManager`) или `properties` доставки.

## API

Оба GET-запроса требуют токен магазина: заголовок `Bearer`/`MS3Token` или кука `ms3_token` (query-параметр не принимается).

### Получение правил валидации

```http
GET /api/v1/order/delivery/validation-rules?delivery_id=1
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "validation_rules": {
      "phone": "required",
      "city": "required|min:2",
      "street": "required"
    }
  }
}
```

### Получение обязательных полей

```http
GET /api/v1/order/delivery/required-fields?delivery_id=1
```

**Ответ** (карта поле → правила, только с `required`):

```json
{
  "success": true,
  "data": {
    "requires": {
      "phone": "required",
      "city": "required",
      "street": "required"
    }
  }
}
```

Эти два запроса обновляют форму заказа при смене способа доставки.
