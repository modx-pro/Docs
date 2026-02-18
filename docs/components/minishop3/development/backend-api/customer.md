---
title: API покупателя
description: Программная работа с покупателями — аутентификация, регистрация, верификация, адреса, токены
---

# API покупателя

Программный интерфейс для работы с покупателями MiniShop3 из PHP-кода.

Покупатель в MiniShop3 — **отдельная сущность**, не зависящая от `modUser`:

- **msCustomer** — профиль покупателя (email, телефон, пароль, статистика заказов)
- **msCustomerToken** — токены аутентификации и верификации
- **msCustomerAddress** — сохранённые адреса доставки

Связь с `modUser` опциональна (поле `user_id`). Покупатель может существовать без пользователя MODX.

## Контроллер Customer

Высокоуровневый интерфейс для работы с покупателями из сниппетов и плагинов.

```php
$ms3 = $modx->services->get('ms3');

// Получить данные текущего покупателя (по токену сессии)
$fields = $ms3->customer->getFields();
// ['id' => 5, 'email' => 'user@example.com', 'first_name' => 'Иван', ...]

// Получить объект msCustomer
$customer = $ms3->customer->getObject();

// Найти покупателя по токену
$customer = $ms3->customer->getByToken($token);

// Установить несколько полей
$result = $ms3->customer->set([
    'first_name' => 'Иван',
    'last_name' => 'Иванов',
    'phone' => '+79991234567',
]);

// Добавить/обновить одно поле (с валидацией и событиями)
$result = $ms3->customer->add('email', 'new@example.com');
```

### Создание покупателя

```php
// Программное создание
$customer = $ms3->customer->create([
    'email' => 'user@example.com',
    'first_name' => 'Иван',
    'phone' => '+79991234567',
]);
// Вызывает события msOnBeforeCreateCustomer / msOnCreateCustomer

// Поиск или создание при оформлении заказа
$customerId = $ms3->customer->getOrCreate($orderData);
// Ищет по токену → по email → авторегистрация или создание записи
```

### Управление адресами

```php
// Добавить адрес
$ms3->customer->addAddress([
    'customer_id' => $customerId,
    'city' => 'Москва',
    'street' => 'Ленина',
    'building' => '10',
    'room' => '5',
]);

// Получить адреса покупателя
$addresses = $ms3->customer->getAddresses($customerId);
```

### Валидация полей

```php
// Регистрация правил валидации
$ms3->customer->registerValidation(
    // Правила (формат Rakit Validator)
    ['email' => 'required|email', 'phone' => 'required|min:10'],
    // Сообщения об ошибках
    ['email:required' => 'Укажите email']
);

// Валидация значения
$result = $ms3->customer->validate('email', 'user@example.com');
// Значение или массив ошибок
```

### Токены сессии

```php
// Сгенерировать новый токен
$data = $ms3->customer->generateToken();
// ['token' => 'abc123...', 'lifetime' => 86400]

// Обновить существующий токен
$data = $ms3->customer->updateToken($currentToken);
```

## Аутентификация (AuthManager)

`AuthManager` реализует стратегию с подключаемыми провайдерами аутентификации.

```php
$authManager = $modx->services->get('ms3_auth_manager');
```

### Аутентификация

```php
// Стандартная аутентификация (email + пароль)
$customer = $authManager->authenticate([
    'email' => 'user@example.com',
    'password' => 'secret123',
]);
// Возвращает msCustomer или null

if ($customer) {
    // Обновляет last_login_at, сбрасывает failed_login_attempts
}
```

`AuthManager` автоматически проверяет `is_active` и `is_blocked` перед аутентификацией.

### Подключаемые провайдеры

По умолчанию зарегистрирован `PasswordAuthProvider` (email + пароль). Можно добавить свои:

```php
use MiniShop3\Controllers\Auth\AuthProviderInterface;
use MiniShop3\Model\msCustomer;

class TelegramAuthProvider implements AuthProviderInterface
{
    public function getName(): string
    {
        return 'telegram';
    }

    public function supports(array $credentials): bool
    {
        return isset($credentials['telegram_hash'], $credentials['telegram_id']);
    }

    public function authenticate(array $credentials): ?msCustomer
    {
        if (!$this->verifyTelegramHash($credentials)) {
            return null;
        }
        return $this->modx->getObject(msCustomer::class, [
            'phone' => $credentials['phone'],  // или другой идентификатор
        ]);
    }
}

// Регистрация провайдера
$authManager->registerProvider(new TelegramAuthProvider($modx));
```

При вызове `authenticate()` менеджер перебирает провайдеры и использует первый, чей `supports()` вернёт `true`.

### Управление токенами

```php
// Создать токен аутентификации
$token = $authManager->createToken($customer, 'api', 86400);
// msCustomerToken: token, type='api', expires_at = now + 86400

// Валидировать токен
$customer = $authManager->validateToken($tokenString, 'api');
// Возвращает msCustomer или null (если истёк/использован)

// Отозвать все токены покупателя
$count = $authManager->revokeTokens($customer);

// Отозвать только определённый тип
$count = $authManager->revokeTokens($customer, 'api');

// Очистить просроченные токены (для cron-задачи)
$deleted = $authManager->cleanupExpiredTokens();
```

### Типы токенов

| Тип | Константа | Описание | Одноразовый |
|-----|-----------|----------|-------------|
| `api` | `msCustomerToken::TYPE_API` | Токен API-сессии | Нет |
| `refresh` | `msCustomerToken::TYPE_REFRESH` | Токен обновления сессии | Нет |
| `magic_link` | `msCustomerToken::TYPE_MAGIC_LINK` | Ссылка для входа без пароля | Да |
| `email_verification` | `msCustomerToken::TYPE_EMAIL_VERIFICATION` | Подтверждение email | Да |

Одноразовые токены помечаются как использованные (`used_at`) после первого применения.

### Блокировка при неудачных попытках

```php
// Обработка неудачного входа (вызывается автоматически)
$authManager->handleFailedLogin($customer);
// Увеличивает failed_login_attempts
// При достижении ms3_customer_max_login_attempts (по умолчанию 5)
// блокирует на ms3_customer_block_duration секунд (по умолчанию 3600)
```

## Регистрация (RegisterService)

```php
$registerService = $modx->services->get('ms3_register_service');

$result = $registerService->register([
    'email' => 'user@example.com',
    'password' => 'Secret123!',       // опционально — сгенерируется автоматически
    'first_name' => 'Иван',
    'last_name' => 'Иванов',
    'phone' => '+79991234567',
    'privacy_accepted' => true,        // GDPR-согласие
    'token' => $sessionToken,          // привязка к сессии (из checkout)
]);

if ($result['success']) {
    $customer = $result['customer'];        // msCustomer
    $autoPassword = $result['auto_password']; // null если пароль был указан
}
```

### Поведение при регистрации

1. Проверка уникальности email и телефона
2. Если пароль не указан — генерируется 16-символьный случайный пароль
3. Хеширование пароля (bcrypt)
4. Создание `msCustomer`
5. Если `ms3_customer_require_email_verification` = true — отправка письма верификации
6. Если пароль был сгенерирован и `ms3_customer_send_welcome_email` = true — отправка приветственного письма с паролем

### Валидация пароля

```php
$result = $registerService->validatePassword('weak');
// ['valid' => false, 'message' => 'Пароль должен содержать минимум 8 символов']
```

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_password_min_length` | 8 | Минимальная длина |
| `ms3_password_require_uppercase` | false | Требовать заглавную букву |
| `ms3_password_require_number` | false | Требовать цифру |
| `ms3_password_require_special` | false | Требовать спецсимвол |

## Верификация email (EmailVerificationService)

```php
$verification = $modx->services->get('ms3_email_verification_service');

// Отправить письмо верификации
$sent = $verification->sendVerificationEmail($customer);

// Проверить токен (по ссылке из письма)
$customer = $verification->verifyToken($tokenString);
// Устанавливает email_verified_at, помечает токен как использованный

// Проверить, подтверждён ли email
if ($verification->isVerified($customer)) {
    // Email подтверждён
}

// Повторная отправка (с защитой от спама — 5 минут между отправками)
$result = $verification->resendVerificationEmail($customer);
```

Настройка `ms3_email_verification_token_ttl` (по умолчанию 86400) — время жизни токена верификации в секундах.

## Ограничение частоты запросов (RateLimiter)

Сервис для защиты от brute-force атак. Использует кеш MODX.

```php
$limiter = $modx->services->get('ms3_rate_limiter');

// Проверить и инкрементировать счётчик
$allowed = $limiter->check(
    'login',              // действие
    $clientIp,            // идентификатор (IP, email и т.д.)
    5,                    // максимум попыток
    300                   // окно в секундах
);

if (!$allowed) {
    // Лимит превышен
}

// Проверить без инкремента
if ($limiter->isBlocked('login', $clientIp, 5)) {
    // Заблокирован
}

// Сбросить счётчик (после успешного входа)
$limiter->reset('login', $clientIp);
```

## Адреса покупателя (CustomerAddressManager)

```php
$addressManager = $modx->services->get('ms3_customer_address_manager');

// Добавить адрес
$success = $addressManager->add([
    'customer_id' => $customerId,
    'city' => 'Москва',
    'street' => 'Ленина',
    'building' => '10',
    'room' => '5',
]);
// Автоматически: генерирует name, вычисляет hash для дедупликации
// Вызывает msOnBeforeAddCustomerAddress / msOnAddCustomerAddress

// Получить все адреса
$addresses = $addressManager->getByCustomerId($customerId);

// Получить один адрес
$address = $addressManager->getById($addressId);

// Обновить адрес
$addressManager->update($addressId, $customerId, [
    'city' => 'Санкт-Петербург',
    'street' => 'Невский',
]);

// Удалить адрес (проверяет принадлежность покупателю)
$addressManager->delete($addressId, $customerId);
```

### Дедупликация адресов

Хеш адреса вычисляется как MD5 от `city|street|building|room` (в нижнем регистре). При добавлении адреса с уже существующим хешем — дубликат не создаётся.

## Проверка дубликатов (CustomerDuplicateChecker)

Используется при создании покупателей для предотвращения дублей.

```php
$checker = $modx->services->get('ms3_customer_duplicate_checker');

// Найти существующего покупателя по данным
$existing = $checker->findDuplicate([
    'email' => 'user@example.com',
    'phone' => '+79991234567',
]);
// Ищет по OR: совпадение email ИЛИ телефона

// Проверить, есть ли данные для поиска
if ($checker->hasCheckableData($data)) {
    // Есть email или phone
}

// Изменить поля для проверки
$checker->setCheckFields(['email']);  // только по email
```

Настройка `ms3_customer_duplicate_fields` (JSON) определяет поля для проверки. По умолчанию: `["email", "phone"]`.

### Нормализация при сравнении

| Поле | Нормализация |
|------|-------------|
| `email` | Приведение к нижнему регистру |
| `phone` | Извлечение только цифр (минимум 7) |
| Остальные | Обрезка пробелов |

## Фабрика покупателей (CustomerFactory)

Создаёт покупателя из данных заказа. Используется при финализации заказа из админки.

```php
$factory = $modx->services->get('ms3_customer_factory');

$customer = $factory->createFromOrderData([
    'first_name' => 'Иван',
    'last_name' => 'Иванов',
    'email' => 'user@example.com',
    'phone' => '+79991234567',
]);
```

Если `ms3_customer_sync_create_moduser` = true, также создаёт `modUser` + `modUserProfile` и добавляет в группу из `ms3_customer_sync_user_group`.

## Поля msCustomer

| Поле | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `user_id` | integer | 0 | ID пользователя MODX (опционально) |
| `first_name` | string | '' | Имя |
| `last_name` | string | '' | Фамилия |
| `email` | string | '' | Email |
| `phone` | string | '' | Телефон |
| `token` | string | '' | Токен текущей сессии (unique) |
| `password` | string | null | Хеш пароля (bcrypt) |
| `email_verified_at` | datetime | null | Дата подтверждения email |
| `is_active` | boolean | true | Активен |
| `is_blocked` | boolean | false | Заблокирован |
| `failed_login_attempts` | integer | 0 | Неудачных попыток входа |
| `blocked_until` | datetime | null | Заблокирован до |
| `created_at` | datetime | now | Дата создания |
| `updated_at` | datetime | null | Дата обновления |
| `last_login_at` | datetime | null | Последний вход |
| `orders_count` | integer | 0 | Количество заказов |
| `total_spent` | float | 0.00 | Сумма заказов |
| `last_order_at` | datetime | null | Дата последнего заказа |
| `privacy_accepted_at` | datetime | null | Дата согласия на обработку данных |
| `privacy_ip` | string | null | IP при согласии |

## Поля msCustomerAddress

| Поле | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `customer_id` | integer | 0 | ID покупателя |
| `hash` | string | null | MD5-хеш адреса (дедупликация) |
| `name` | string | null | Название (автогенерация из город/улица) |
| `country` | string | null | Страна |
| `index` | string | null | Почтовый индекс |
| `region` | string | null | Регион |
| `city` | string | null | Город |
| `metro` | string | null | Станция метро |
| `street` | string | null | Улица |
| `building` | string | null | Дом |
| `entrance` | string | null | Подъезд |
| `floor` | string | null | Этаж |
| `room` | string | null | Квартира/офис |
| `comment` | text | null | Комментарий |
| `is_default` | integer | 0 | Адрес по умолчанию |

## Поля msCustomerToken

| Поле | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `customer_id` | integer | 0 | ID покупателя |
| `token` | string | '' | Строка токена (128 символов, unique) |
| `type` | enum | 'api' | Тип: api, refresh, magic_link, email_verification |
| `expires_at` | datetime | — | Срок действия |
| `created_at` | datetime | now | Дата создания |
| `used_at` | datetime | null | Дата использования (для одноразовых) |

## Системные настройки

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_customer_max_login_attempts` | 5 | Попыток входа до блокировки |
| `ms3_customer_block_duration` | 3600 | Длительность блокировки (секунды) |
| `ms3_customer_api_token_ttl` | 86400 | Время жизни API-токена (секунды) |
| `ms3_customer_require_email_verification` | true | Требовать подтверждение email |
| `ms3_customer_send_welcome_email` | true | Отправлять приветственное письмо |
| `ms3_customer_auto_login_after_register` | false | Автовход после регистрации |
| `ms3_customer_auto_register_on_order` | true | Авторегистрация при оформлении |
| `ms3_customer_auto_login_on_order` | false | Автовход при оформлении |
| `ms3_customer_require_privacy_consent` | true | Требовать согласие на обработку данных |
| `ms3_customer_duplicate_fields` | `["email","phone"]` | Поля для проверки дубликатов |
| `ms3_customer_sync_create_moduser` | false | Создавать modUser при создании покупателя |
| `ms3_customer_sync_user_group` | '' | Группа MODX для новых пользователей |
| `ms3_password_min_length` | 8 | Минимальная длина пароля |
| `ms3_password_reset_token_ttl` | 3600 | Время жизни токена сброса пароля |
| `ms3_email_verification_token_ttl` | 86400 | Время жизни токена верификации |

## События

| Событие | Когда вызывается |
|---------|-----------------|
| `msOnBeforeCreateCustomer` / `msOnCreateCustomer` | Создание покупателя |
| `msOnBeforeUpdateCustomer` / `msOnUpdateCustomer` | Обновление из админки |
| `msOnBeforeAddToCustomer` / `msOnAddToCustomer` | Изменение поля через контроллер |
| `msOnBeforeValidateCustomerValue` / `msOnValidateCustomerValue` | Валидация значения поля |
| `msOnBeforeGetOrderCustomer` / `msOnGetOrderCustomer` | Поиск/создание при оформлении |
| `msOnBeforeAddCustomerAddress` / `msOnAddCustomerAddress` | Добавление адреса |

Подробное описание параметров событий — в разделе [События](../events).
