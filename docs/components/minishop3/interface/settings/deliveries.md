---
title: Способы доставки
---
# Способы доставки

Управление способами доставки доступно через **Extras → MiniShop3 → Настройки → Доставки**.

## Поля доставки

| Поле | Тип | Описание |
|------|-----|----------|
| `name` | string | Название способа доставки |
| `description` | text | Описание для покупателя |
| `price` | number | Базовая стоимость доставки |
| `weight_price` | float | Стоимость за единицу веса |
| `distance_price` | float | Стоимость за единицу расстояния |
| `free_delivery_amount` | float | Сумма заказа для бесплатной доставки |
| `logo` | string | Путь к изображению |
| `position` | int | Порядок сортировки |
| `active` | bool | Активность |
| `class` | string | PHP-класс обработчика |
| `validation_rules` | JSON | Правила валидации полей |

## Связь с оплатой

Каждый способ доставки может быть связан с определёнными способами оплаты. Это позволяет:

- Ограничить оплату наличными только для самовывоза
- Разрешить онлайн-оплату для курьерской доставки
- Настроить специфичные комбинации для разных регионов

При выборе доставки покупателем, список доступных способов оплаты автоматически фильтруется.

## Расчёт стоимости

Стоимость доставки рассчитывается по формуле:

```
Итоговая стоимость = price + (weight_price × вес) + (distance_price × расстояние)
```

Если сумма заказа превышает `free_delivery_amount`, стоимость доставки = 0.

### Кастомный расчёт

Для сложной логики расчёта создайте свой класс-обработчик:

```php
<?php
namespace MyComponent\Delivery;

use MiniShop3\Controllers\Delivery\DeliveryProviderInterface;
use MiniShop3\Model\msDelivery;
use MiniShop3\Model\msOrder;

class CustomDelivery implements DeliveryProviderInterface
{
    public function getCost(msDelivery $delivery, msOrder $order, float $cost): float
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

Укажите класс в поле `class`: `MyComponent\Delivery\CustomDelivery`

## Валидация полей заказа

MiniShop3 позволяет настроить обязательные поля и правила валидации для каждого способа доставки. Например, для курьерской доставки можно требовать полный адрес, а для самовывоза — только телефон.

### Визуальный конструктор

Интерфейс настройки валидации предоставляет два режима работы:

#### Визуальный режим

Интуитивный конструктор правил:

1. Нажмите **Добавить поле**
2. Выберите поле из списка (сгруппированы по категориям: Заказ, Адрес)
3. Добавьте правила валидации для поля
4. Для правил с параметрами укажите значение

Правила отображаются в виде тегов (chips), которые можно удалять кликом по крестику.

#### JSON режим

Переключатель позволяет перейти в режим ручного редактирования JSON:

```json
{
  "phone": "required",
  "email": "required|email",
  "city": "required|min:2",
  "street": "required|min:3",
  "building": "required"
}
```

Это удобно для:

- Копирования правил между доставками
- Использования сложных правил с регулярными выражениями
- Импорта/экспорта конфигурации

### Доступные поля для валидации

#### Поля заказа

| Поле | Описание |
|------|----------|
| `order_comment` | Комментарий к заказу |

#### Поля адреса

| Поле | Описание |
|------|----------|
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

MiniShop3 использует библиотеку [rakit/validation](https://github.com/rakit/validation) для валидации данных.

#### Базовые правила

| Правило | Описание | Пример |
|---------|----------|--------|
| `required` | Обязательное поле | `required` |
| `nullable` | Поле может быть null | `nullable` |
| `present` | Поле должно присутствовать (даже пустое) | `present` |
| `accepted` | Значение должно быть "yes", "on", "1", true | `accepted` |

#### Типы данных

| Правило | Описание | Пример |
|---------|----------|--------|
| `email` | Валидный email | `email` |
| `url` | Валидный URL | `url` |
| `ip` | IP адрес (v4 или v6) | `ip` |
| `ipv4` | IPv4 адрес | `ipv4` |
| `ipv6` | IPv6 адрес | `ipv6` |
| `numeric` | Числовое значение | `numeric` |
| `integer` | Целое число | `integer` |
| `boolean` | Булево значение | `boolean` |
| `array` | Массив | `array` |
| `json` | Валидный JSON | `json` |

#### Строковые правила

| Правило | Описание | Пример |
|---------|----------|--------|
| `alpha` | Только буквы | `alpha` |
| `alpha_num` | Буквы и цифры | `alpha_num` |
| `alpha_dash` | Буквы, цифры, дефис, подчёркивание | `alpha_dash` |
| `alpha_spaces` | Буквы и пробелы | `alpha_spaces` |
| `uppercase` | Только заглавные буквы | `uppercase` |
| `lowercase` | Только строчные буквы | `lowercase` |

#### Правила с параметрами

| Правило | Описание | Синтаксис |
|---------|----------|-----------|
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

#### Правила для дат

| Правило | Описание | Синтаксис |
|---------|----------|-----------|
| `date` | Валидная дата в формате | `date:Y-m-d` |
| `after` | Дата после указанной | `after:2024-01-01` |
| `before` | Дата до указанной | `before:2025-12-31` |

#### Условные правила

| Правило | Описание | Синтаксис |
|---------|----------|-----------|
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

### Комбинирование правил

Правила комбинируются через символ `|`:

```json
{
  "email": "required|email",
  "phone": "required|numeric|min:10|max:15",
  "index": "nullable|digits:6"
}
```

### Сообщения об ошибках

Валидатор автоматически генерирует сообщения об ошибках на языке интерфейса. Пользователь увидит понятное сообщение, например:

- "Поле Email обязательно для заполнения"
- "Поле Телефон должно содержать не менее 10 символов"
- "Поле Индекс должно состоять из 6 цифр"

## API

### Получение правил валидации

```
GET /api/v1/order/delivery/validation-rules?delivery_id=1
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "phone": "required",
    "city": "required|min:2",
    "street": "required"
  }
}
```

### Получение обязательных полей

```
GET /api/v1/order/delivery/required-fields?delivery_id=1
```

**Ответ:**

```json
{
  "success": true,
  "data": ["phone", "city", "street"]
}
```

Используйте эти endpoints для динамического обновления формы заказа при смене способа доставки.
