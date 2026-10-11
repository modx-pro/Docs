# Web API

Промо-коды доступны через REST API в составе MiniShop3. Все пути — с префиксом `/api/v1/promo/`.

## Базовый URL

API подключён к роутеру MiniShop3. Общая точка входа:

```
/assets/components/minishop3/api.php?route=/api/v1/promo/{action}
```

С включённым переписыванием URL:

```
{site_url}api/v1/promo/{action}
```

При установке в `core/config/ms3.routes.d/web/50-ms3promocode.php` создаётся файл-регистратор. Роутер MS3 загружает его и через `require` подключает реальные роуты пакета — `core/components/ms3promocode/config/routes/web.php`.

::: warning Авторизация, CORS и ограничение частоты запросов
К группе `/api/v1/promo/*` привязан только `TokenMiddleware`. `CorsMiddleware` и `RateLimitMiddleware` **не наследуются** от MS3 автоматически — к нашей группе они не прикреплены. Следствия:

- OPTIONS preflight возвращает HTTP 405; запросы из браузера с другого домена не работают.
- Ограничение частоты запросов отсутствует — защиту от перебора кодов нужно настраивать на уровне веб-сервера.

Отслеживается в [issue #3](https://github.com/biz87/ms3PromoCode/issues/3).
:::

## Пути

| Метод | Путь                       | Назначение                                       |
|-------|----------------------------|--------------------------------------------------|
| POST  | `/api/v1/promo/apply`      | Применить код к корзине                          |
| POST  | `/api/v1/promo/remove`     | Снять применённый код                            |
| POST  | `/api/v1/promo/validate`   | Проверить код без записи                         |
| GET   | `/api/v1/promo/current`    | Получить текущий применённый код                 |

---

## POST /api/v1/promo/apply

Применить код к черновику корзины покупателя.

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
  "message": null,
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

| Поле                | Описание                                                                               |
|---------------------|----------------------------------------------------------------------------------------|
| `code`              | Применённый код в верхнем регистре                                                     |
| `discount`          | **Фактическая** сумма скидки — после округления цен позиций и копеечной компенсации; может на копейку отличаться от математического расчёта |
| `breakdown`         | Карта `product_key → сумма скидки на позицию`                                          |

### Ошибки

Общий конверт ошибки MS3 Router:

```json
{
  "success": false,
  "message": "Промо-код истёк",
  "code": 400,
  "errors": { "code": "expired" },
  "error_code": "bad_request"
}
```

| Поле         | Описание                                                                              |
|--------------|---------------------------------------------------------------------------------------|
| `success`    | Всегда `false` при ошибке                                                             |
| `message`    | Локализованное сообщение. Для `missing_code`, `empty_cart`, `server_error` — на английском (запасной вариант). Остальные ошибки — через лексиконы `ms3promocode_err_*` |
| `code`       | HTTP-статус ответа — всегда `400`, даже для `server_error` (контроллер не отдаёт 500) |
| `errors.code` | Машиночитаемая причина (см. таблицу ниже)                                             |
| `error_code` | Общий MS3-код ошибки — выводится из HTTP-статуса (`400` → `bad_request`)              |

Возможные значения `errors.code`:

| Код              | Описание                                                      |
|------------------|---------------------------------------------------------------|
| `missing_code`   | В запросе отсутствует поле `code`                             |
| `empty_cart`     | Нет черновика корзины                                         |
| `not_found`      | Код не существует **или отключён** (маскировка для покупателя)|
| `scheduled`      | Код ещё не активен                                            |
| `expired`        | Срок действия истёк                                           |
| `exhausted`      | Лимит применений исчерпан                                     |
| `min_order`      | Сумма заказа меньше требуемого минимума                       |
| `not_applicable` | Код не подходит к текущему составу корзины                    |
| `server_error`   | Внутренняя ошибка (HTTP всё равно 400)                        |

::: warning Маскировка отключённых кодов
Если в админке код отключён (флаг `active = 0`), Web API в `/apply` и `/validate` отдаёт `errors.code: not_found` — чтобы покупатель не узнал о временно отключённом коде. Менеджерский API (`Mgr/Order/ApplyPromo`) маскировку не применяет: админу нужна реальная причина.
:::

---

## POST /api/v1/promo/remove

Снять применённый код с черновика корзины. Идемпотентно — если кода нет, возвращает `removed: false` без ошибки.

### Запрос

Тело не требуется — любые поля игнорируются.

### Ответ

```json
{
  "success": true,
  "message": null,
  "data": {
    "removed": true
  }
}
```

`removed: false` — код не был применён (снимать нечего). Такой же ответ, если черновика корзины ещё нет.

---

## POST /api/v1/promo/validate

Проверить, можно ли применить код, **без записи** в БД. Удобно для предпросмотра перед применением.

### Запрос

```json
{
  "code": "SALE10"
}
```

### Успешный ответ (с черновиком корзины)

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

### Успешный ответ (без черновика)

Если корзины ещё нет (покупатель не добавлял товары), `validate` проверяет только сам код:

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
`success: true`, потому что сам HTTP-запрос прошёл; валидность кода — в `data.valid`.
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
  "message": null,
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

`discount_amount` — та же величина, что `discount` в ответе `/apply`. `applied_at` — строка ISO 8601 в таймзоне сервера (`date('c')`).

### Ответ — кода нет

Один и тот же ответ в двух случаях: черновик есть, но код не применён; черновика ещё нет.

```json
{
  "success": true,
  "message": null,
  "data": {
    "current": null
  }
}
```

---

## Авторизация

API использует MS3 `TokenMiddleware`. Токен ищется в таком порядке:

1. HTTP-заголовок `Authorization: Bearer <token>`
2. HTTP-заголовок `MS3TOKEN: <token>`
3. httpOnly cookie `ms3_token`
4. Кэш сессии (сверка по БД)

Параметр `ms3_token` в URL **не принимается** — `TokenMiddleware` его явно вырезает (MS3 issue #576). В теле запроса токен тоже не ищется.

Для непубличных роутов MS3 при отсутствии токена автоматически выпускает анонимный токен и ставит его в cookie — для покупателя это незаметно.

## Вызов со своего сайта

Простейший путь — через готовый headless-клиент:

```js
await window.ms3PromoCode.init();
const result = await window.ms3PromoCode.apply('SALE10');
```

См. [JS API](frontend/js-api).

## Вызов из другого PHP-проекта

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
Нужен валидный `$msToken` — получите его через `GET /api/v1/customer/token/get` или возьмите из сессии MS3.
:::
