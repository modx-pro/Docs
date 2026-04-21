# Web API

Промо-коды доступны через REST API, смонтированный в роутер MiniShop3. Все эндпоинты имеют префикс `/api/v1/promo/`.

## Базовый URL

API монтируется через router MiniShop3, поэтому общий entry-point:

```
/assets/components/minishop3/api.php?route=/api/v1/promo/{action}
```

или, при настроенном rewrite-сервере:

```
{site_url}api/v1/promo/{action}
```

::: tip
Авторизация (TokenMiddleware), CORS и rate limiting — наследуются от MS3-роутера. Дополнительной настройки не требуется.
:::

## Эндпоинты

| Метод | Путь                       | Назначение                                       |
|-------|----------------------------|--------------------------------------------------|
| POST  | `/api/v1/promo/apply`      | Применить код к корзине                          |
| POST  | `/api/v1/promo/remove`     | Снять применённый код                            |
| POST  | `/api/v1/promo/validate`   | Проверить код без записи                         |
| GET   | `/api/v1/promo/current`    | Получить текущий применённый код                 |

---

## POST /api/v1/promo/apply

Применить код к draft-корзине покупателя.

### Запрос

```json
{
  "code": "SALE10"
}
```

### Успешный ответ

```json
{
  "success": true,
  "data": {
    "code": "SALE10",
    "discount": 500.00,
    "breakdown": {
      "ms-prod-key-1": 300.00,
      "ms-prod-key-2": 200.00
    }
  }
}
```

| Поле               | Описание                                                          |
|--------------------|-------------------------------------------------------------------|
| `code`             | Применённый код (uppercase)                                       |
| `discount`         | Итоговая сумма скидки                                             |
| `breakdown`        | Карта `product_key → сумма скидки на позицию`                     |

### Ошибки

```json
{
  "success": false,
  "message": "Промо-код истёк",
  "data": { "code": "expired" }
}
```

Возможные `code`:

| Код              | Описание                                                      |
|------------------|---------------------------------------------------------------|
| `missing_code`   | В запросе отсутствует поле `code` (HTTP 400)                  |
| `empty_cart`     | Нет draft-корзины (HTTP 400)                                  |
| `not_found`      | Код не существует **или отключён** (маскировка для покупателя)|
| `scheduled`      | Код ещё не активен                                            |
| `expired`        | Срок действия истёк                                           |
| `exhausted`      | Лимит применений исчерпан                                     |
| `min_order`      | Сумма заказа меньше требуемого минимума                       |
| `not_applicable` | Код не подходит к текущему составу корзины                    |
| `server_error`   | Внутренняя ошибка                                             |

::: warning Маскировка disabled-кодов
Если в админке код отключён (флаг `active = 0`), Web API возвращает `code: not_found` с соответствующим сообщением, чтобы не раскрывать факт существования временно отключённого кода. Менеджерский API (`Mgr/Order/ApplyPromo`) маскировку не делает — админу нужна реальная причина.
:::

---

## POST /api/v1/promo/remove

Снять применённый код с draft-корзины. Идемпотентна — если кода нет, возвращает success.

### Запрос

Тело пустое:

```json
{}
```

### Ответ

```json
{
  "success": true,
  "data": {
    "removed": true
  }
}
```

`removed: false` означает, что код не был применён (ничего не пришлось снимать).

---

## POST /api/v1/promo/validate

Проверить, можно ли применить код, **без записи** в БД. Удобно для preview перед apply.

### Запрос

```json
{
  "code": "SALE10"
}
```

### Успешный ответ (с draft)

```json
{
  "success": true,
  "data": {
    "valid": true,
    "preview": {
      "code": "SALE10",
      "discount_type": "percent",
      "discount_value": 10,
      "discount_amount": 500.00,
      "breakdown": {
        "ms-prod-key-1": 300.00,
        "ms-prod-key-2": 200.00
      }
    }
  }
}
```

### Успешный ответ (без draft)

Если корзины ещё нет (покупатель не добавлял товары), `validate` отвечает только code-only проверкой:

```json
{
  "success": true,
  "data": {
    "valid": true,
    "preview": {
      "code": "SALE10",
      "discount_type": "percent",
      "discount_value": 10
    }
  }
}
```

`discount_amount` и `breakdown` отсутствуют — посчитать их не на чём.

### Ответ при невалидном коде

```json
{
  "success": true,
  "data": {
    "valid": false,
    "reason": "expired",
    "message": "Срок действия промо-кода истёк"
  }
}
```

::: tip
Заметьте — `success: true`, потому что сам HTTP-запрос успешен, просто код невалиден. Проверяйте `data.valid`.
:::

---

## GET /api/v1/promo/current

Получить состояние применённого к корзине кода.

### Запрос

Без тела.

### Ответ — код применён

```json
{
  "success": true,
  "data": {
    "current": {
      "id": 12,
      "code": "SALE10",
      "discount_type": "percent",
      "discount_value": 10,
      "discount_amount": 500.00,
      "breakdown": {
        "ms-prod-key-1": 300.00,
        "ms-prod-key-2": 200.00
      },
      "original_cart_cost": 5000.00,
      "applied_at": "2026-04-21T12:34:56+00:00"
    }
  }
}
```

### Ответ — кода нет (или draft пуст)

```json
{
  "success": true,
  "data": {
    "current": null
  }
}
```

---

## Авторизация

API использует MS3 TokenMiddleware. Токен передаётся одним из способов (в порядке приоритета):

1. HTTP-заголовок `Authorization: Bearer <token>`
2. HTTP-заголовок `MS3TOKEN: <token>`
3. Cookie `ms3_token`
4. Параметр `ms3_token` в теле/query

Токен создаётся MS3 при первом обращении к корзине — для покупателя процесс прозрачен.

## Использование из своего фронтенда

Самый простой путь — через готовый headless-клиент:

```js
await window.ms3PromoCode.init();
const result = await window.ms3PromoCode.apply('SALE10');
```

См. [JS API](frontend/js-api).

## Использование из бэкенда (другой PHP-проекта)

```php
$ch = curl_init('https://shop.example.com/api/v1/promo/apply');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode(['code' => 'SALE10']),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $msToken,
    ],
]);
$response = json_decode(curl_exec($ch), true);
```

::: warning
В этом случае нужен валидный `$msToken` — обычно полученный через `POST /api/v1/cart/create` или связанный с пользовательской сессией MS3.
:::
