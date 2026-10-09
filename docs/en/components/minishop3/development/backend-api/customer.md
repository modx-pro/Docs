---
title: Customer API
description: Programmatic work with customers — authentication, registration, verification, addresses, tokens
---

# Customer API

In MiniShop3, a customer is a **separate entity** from `modUser`:

- **msCustomer** — customer profile (email, phone, password, order stats)
- **msCustomerToken** — authentication and verification tokens
- **msCustomerAddress** — saved delivery addresses

The `modUser` link is optional (field `user_id`) — a customer can exist without a MODX user.

## Customer controller

High-level interface for snippets and plugins.

::: warning Some methods return the result in an envelope
`getFields()`, `set()`, `add()`, `generateToken()` and `updateToken()` return the envelope `['success' => bool, 'message' => string, 'data' => array]` — the same `Utils::success()` / `Utils::error()` shape the Web API uses. The values you need are in `data`; with an empty token `success` is `false`.

The remaining methods return the value directly:

| Method | Returns |
| --- | --- |
| `getObject()`, `getByToken()` | `msCustomer` or `null` |
| `create()` | `msCustomer` or `null` |
| `addAddress()` | `bool` |
| `getAddresses()` | array of addresses |
| `getOrCreate()` | `int` |
| `validate()` | the value or an array of errors |

:::

```php
$ms3 = $modx->services->get('ms3');

// Get current customer data (from session token)
$response = $ms3->customer->getFields();
// ['success' => true, 'message' => '', 'data' => ['id' => 5, 'email' => 'user@example.com', ...]]
$fields = $response['data'];

// Get msCustomer object
$customer = $ms3->customer->getObject();

// Find customer by token
$customer = $ms3->customer->getByToken($token);

// Set multiple fields
$result = $ms3->customer->set([
    'first_name' => 'John',
    'last_name' => 'Doe',
    'phone' => '+79991234567',
]);

// Add/update one field (with validation and events)
$result = $ms3->customer->add('email', 'new@example.com');
```

### Creating a customer

```php
// Programmatic creation
$customer = $ms3->customer->create([
    'email' => 'user@example.com',
    'first_name' => 'John',
    'phone' => '+79991234567',
]);
// Fires msOnBeforeCreateCustomer / msOnCreateCustomer

// Find or create during checkout
$customerId = $ms3->customer->getOrCreate($orderData);
// Looks up by token → by email → auto-register or create record
```

### Managing addresses

```php
// Add address
$ms3->customer->addAddress([
    'customer_id' => $customerId,
    'city' => 'Moscow',
    'street' => 'Lenina',
    'building' => '10',
    'room' => '5',
]);

// Get customer addresses
$addresses = $ms3->customer->getAddresses($customerId);
```

### Field validation

```php
// Register validation rules
$ms3->customer->registerValidation(
    // Rules (Rakit Validator format)
    ['email' => 'required|email', 'phone' => 'required|min:10'],
    // Error messages
    ['email:required' => 'Enter email']
);

// Validate value
$result = $ms3->customer->validate('email', 'user@example.com');
// Value or array of errors
```

### Session tokens

```php
// Generate new token
$response = $ms3->customer->generateToken();
// ['success' => true, 'message' => '', 'data' => ['token' => 'abc123...', 'lifetime' => 86400000]]
$token = $response['data']['token'];

// Refresh existing token (generates a new one when the argument is empty)
$response = $ms3->customer->updateToken($currentToken);
```

`lifetime` is the milliseconds until expiry: `ms3_customer_token_ttl` seconds multiplied by 1000. The transport package creates the setting with 86400 (24 hours), so a fresh token reports about `86400000` ([issue #848](https://github.com/modx-pro/MiniShop3/issues/848)).

## Authentication (AuthManager)

`AuthManager` authenticates a customer through pluggable providers.

```php
$authManager = $modx->services->get('ms3_auth_manager');
```

### Authentication

```php
// Standard auth (email + password)
$customer = $authManager->authenticate([
    'email' => 'user@example.com',
    'password' => 'secret123',
]);
// Returns msCustomer or null

if ($customer) {
    // Updates last_login_at, resets failed_login_attempts
}
```

`AuthManager` checks `is_active` and `is_blocked` before authenticating.

### Pluggable providers

`PasswordAuthProvider` (email + password) is registered by default. You can add your own:

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
            'phone' => $credentials['phone'],  // or other identifier
        ]);
    }
}

// Register provider
$authManager->registerProvider(new TelegramAuthProvider($modx));
```

When `authenticate()` is called, `AuthManager` iterates the providers and uses the first whose `supports()` returns `true`.

### Token management

```php
// Create auth token
$token = $authManager->createToken($customer, 'api', 86400);
// msCustomerToken: token, type='api', expires_at = now + 86400

// Validate token
$customer = $authManager->validateToken($tokenString, 'api');
// Returns msCustomer or null (if expired/used)

// Revoke all customer tokens
$count = $authManager->revokeTokens($customer);

// Revoke only a specific type
$count = $authManager->revokeTokens($customer, 'api');

// Clean expired tokens (for cron)
$deleted = $authManager->cleanupExpiredTokens();
```

### Token types

| Type | Constant | Description | One-time |
| --- | --- | --- | --- |
| `api` | `msCustomerToken::TYPE_API` | API session token | No |
| `refresh` | `msCustomerToken::TYPE_REFRESH` | Session refresh token | No |
| `magic_link` | `msCustomerToken::TYPE_MAGIC_LINK` | Passwordless login link | Yes |
| `email_verification` | `msCustomerToken::TYPE_EMAIL_VERIFICATION` | Email verification | Yes |
| `password_reset` | `msCustomerToken::TYPE_PASSWORD_RESET` | Password reset | Yes |

One-time tokens are marked as used (`used_at`) after first use.

The password reset token is the exception: `markAsUsed()` never touches it. After a successful password change, `AuthManager::revokeTokens()` is called without a type and revokes **every** token of that customer — active sessions on other devices end as well.

### Blocking on failed attempts

```php
// Handle failed login (called automatically)
$authManager->handleFailedLogin($customer);
// Increments failed_login_attempts
// When ms3_customer_max_login_attempts (default 5) is reached
// blocks for ms3_customer_block_duration seconds (default 300)
```

## Registration (RegisterService)

```php
$registerService = $modx->services->get('ms3_register_service');

$result = $registerService->register([
    'email' => 'user@example.com',
    'password' => 'Secret123!',       // optional — auto-generated if omitted
    'first_name' => 'John',
    'last_name' => 'Doe',
    'phone' => '+79991234567',
    'privacy_accepted' => true,        // GDPR consent
    'token' => $sessionToken,          // bind to session (from checkout)
]);

if ($result['success']) {
    $customer = $result['customer'];        // msCustomer
    $autoPassword = $result['auto_password']; // null if password was provided
}
```

### Registration flow

1. Check email and phone uniqueness
2. If no password — generate 16-char random password
3. Hash password (bcrypt)
4. Create `msCustomer`
5. If `ms3_customer_require_email_verification` = true — send verification email
6. If password was generated and `ms3_customer_send_welcome_email` = true — send welcome email with password

### Password validation

```php
$result = $registerService->validatePassword('weak');
// ['valid' => false, 'message' => 'Password must be at least 8 characters']
```

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_password_min_length` | 8 | Min length |
| `ms3_password_require_uppercase` | false | Require uppercase |
| `ms3_password_require_number` | false | Require digit |
| `ms3_password_require_special` | false | Require special char |

## Email verification (EmailVerificationService)

```php
$verification = $modx->services->get('ms3_email_verification_service');

// Send verification email
$sent = $verification->sendVerificationEmail($customer);

// Verify token (from email link)
$customer = $verification->verifyToken($tokenString);
// Sets email_verified_at, marks token as used

// Check if email is verified
if ($verification->isVerified($customer)) {
    // Email verified
}

// Resend (with spam protection — 5 min between sends)
$result = $verification->resendVerificationEmail($customer);
```

Setting `ms3_email_verification_token_ttl` (default 86400) — verification token lifetime in seconds.

### Customer Web API endpoints — `/api/v1/customer/*`

Controller: `CustomerProfileController`. These endpoints appeared in 1.10.x / 1.11.0.

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/v1/customer/add` | Updates a single profile field: `key` + `value`. Since 1.11.0 any `msCustomer` column from the xPDO map is allowed (Object Extension included), except the 18 fields listed in `CustomerPublicDto::SYSTEM_NON_EDITABLE_FIELDS`: `id`, `user_id`, `customer_group_id`, `token`, `password`, `email_verified_at`, the blocking flags and counters, the order aggregates and the service timestamps. `first_name`, `last_name`, `email` and `phone` go through Rakit validation; other values are normalized by the `phptype` from the field metadata. Changing the email resets `email_verified_at`. |
| `POST` | `/api/v1/customer/changeAddress` | Picks a saved address for the order draft. Takes `address_hash`. |
| `GET` | `/api/v1/customer/email/verify` | Confirms the email with the token from the verification email. Parameters: `token`, `html=1` (an HTML redirect instead of JSON), `format=json`. By default redirects to the site with `ms3_email_verified=1\|0`. Custom URL — the `ms3_email_verification_url` setting, success URL — `ms3_email_verification_success_url`. |
| `POST` | `/api/v1/customer/email/resend-verification` | Resends the verification email to the authenticated customer. The service allows one send per 5 minutes. |

## Rate limiting (RateLimiter)

Protects against brute-force. Uses the MODX cache.

```php
$limiter = $modx->services->get('ms3_rate_limiter');

// Check and increment counter
$allowed = $limiter->check(
    'login',              // action
    $clientIp,            // identifier (IP, email, etc.)
    5,                    // max attempts
    300                   // window in seconds
);

if (!$allowed) {
    // Limit exceeded
}

// Check without increment
if ($limiter->isBlocked('login', $clientIp, 5)) {
    // Blocked
}

// Reset counter (after successful login)
$limiter->reset('login', $clientIp);
```

## Customer addresses (CustomerAddressManager)

```php
$addressManager = $modx->services->get('ms3_customer_address_manager');

// Add address
$success = $addressManager->add([
    'customer_id' => $customerId,
    'city' => 'Moscow',
    'street' => 'Lenina',
    'building' => '10',
    'room' => '5',
]);
// Auto: generates name, computes hash for deduplication
// Fires msOnBeforeAddCustomerAddress / msOnAddCustomerAddress

// Get all addresses
$addresses = $addressManager->getByCustomerId($customerId);

// Get one address
$address = $addressManager->getById($addressId);

// Update address
$addressManager->update($addressId, $customerId, [
    'city' => 'Saint Petersburg',
    'street' => 'Nevsky',
]);

// Delete address (checks customer ownership)
$addressManager->delete($addressId, $customerId);
```

### Address deduplication

The address hash is MD5 of `city|street|building|room` in lowercase. An address with an existing hash is not created again.

## Duplicate check (CustomerDuplicateChecker)

Called when a customer is created.

```php
$checker = $modx->services->get('ms3_customer_duplicate_checker');

// Find existing customer by data
$existing = $checker->findDuplicate([
    'email' => 'user@example.com',
    'phone' => '+79991234567',
]);
// Searches by OR: email OR phone match

// Check if there is data to search by
if ($checker->hasCheckableData($data)) {
    // Has email or phone
}

// Change fields to check
$checker->setCheckFields(['email']);  // only by email
```

Setting `ms3_customer_duplicate_fields` (JSON) defines which fields to check. Default: `["email", "phone"]`.

### Normalization when comparing

| Field | Normalization |
| --- | --- |
| `email` | Lowercase |
| `phone` | Digits only (min 7) |
| Others | Trim whitespace |

## Customer factory (CustomerFactory)

Creates a customer from order data when an order is finalized in the manager.

```php
$factory = $modx->services->get('ms3_customer_factory');

$customer = $factory->createFromOrderData([
    'first_name' => 'John',
    'last_name' => 'Doe',
    'email' => 'user@example.com',
    'phone' => '+79991234567',
]);
```

If `ms3_customer_sync_create_moduser` = true, also creates `modUser` + `modUserProfile` and adds to the group from `ms3_customer_sync_user_group`.

## msCustomer fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `user_id` | integer | 0 | MODX user ID (optional) |
| `first_name` | string | '' | First name |
| `last_name` | string | '' | Last name |
| `email` | string | '' | Email |
| `phone` | string | '' | Phone |
| `token` | string | '' | Current session token (unique) |
| `password` | string | null | Password hash (bcrypt) |
| `email_verified_at` | datetime | null | Email verification date |
| `is_active` | boolean | true | Active |
| `is_blocked` | boolean | false | Blocked |
| `failed_login_attempts` | integer | 0 | Failed login attempts |
| `blocked_until` | datetime | null | Blocked until |
| `created_at` | datetime | now | Created at |
| `updated_at` | datetime | null | Updated at |
| `last_login_at` | datetime | null | Last login |
| `orders_count` | integer | 0 | Order count |
| `total_spent` | float | 0.00 | Total order amount |
| `last_order_at` | datetime | null | Last order date |
| `privacy_accepted_at` | datetime | null | Privacy consent date |
| `privacy_ip` | string | null | IP at consent |

## msCustomerAddress fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `customer_id` | integer | 0 | Customer ID |
| `hash` | string | null | MD5 address hash (deduplication) |
| `name` | string | null | Label (auto from city/street) |
| `country` | string | null | Country |
| `index` | string | null | Postal code |
| `region` | string | null | Region |
| `city` | string | null | City |
| `metro` | string | null | Metro station |
| `street` | string | null | Street |
| `building` | string | null | Building |
| `entrance` | string | null | Entrance |
| `floor` | string | null | Floor |
| `room` | string | null | Apartment/office |
| `comment` | text | null | Comment |
| `is_default` | integer | 0 | Default address |

## msCustomerToken fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `customer_id` | integer | 0 | Customer ID |
| `token` | string | '' | Token string (128 chars, unique) |
| `type` | enum | 'api' | Type: api, refresh, magic_link, email_verification, password_reset |
| `expires_at` | datetime | — | Expiry |
| `created_at` | datetime | now | Created at |
| `used_at` | datetime | null | Used at (for one-time tokens) |

## System settings

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_customer_max_login_attempts` | 5 | Login attempts before block |
| `ms3_customer_block_duration` | 300 | Block duration (seconds) |
| `ms3_customer_token_ttl` | 86400 | Session token TTL (seconds) |
| `ms3_customer_require_email_verification` | false | Require email verification |
| `ms3_customer_send_welcome_email` | true | Send welcome email |
| `ms3_customer_auto_login_after_register` | true | Auto-login after register |
| `ms3_customer_auto_register_on_order` | true | Auto-register on checkout |
| `ms3_customer_auto_login_on_order` | true | Auto-login on checkout |
| `ms3_customer_require_privacy_consent` | true | Require privacy consent |
| `ms3_customer_duplicate_fields` | `["email", "phone"]` | Fields for duplicate check |
| `ms3_customer_sync_create_moduser` | false | Create modUser when creating customer |
| `ms3_customer_sync_user_group` | 0 | ID of the MODX group for new users |
| `ms3_password_min_length` | 8 | Min password length |
| `ms3_password_reset_token_ttl` | 3600 | Password reset token TTL |
| `ms3_email_verification_token_ttl` | 86400 | Verification token TTL |

::: warning A twin setting sits in the manager
The same area of the manager holds `ms3_customer_api_token_ttl`, and its value is the same — but no line of code reads it. The working setting is `ms3_customer_token_ttl` from the table above ([issue #797](https://github.com/modx-pro/MiniShop3/issues/797)).

The working setting has a quirk of its own: when the row is missing from the database, the code uses `604800` (7 days), while the transport package creates it with `86400` (24 hours) — [issue #848](https://github.com/modx-pro/MiniShop3/issues/848).
:::

## Events

| Event | When fired |
| --- | --- |
| `msOnBeforeCreateCustomer` / `msOnCreateCustomer` | Customer creation |
| `msOnBeforeUpdateCustomer` / `msOnUpdateCustomer` | The `Customer/Update` processor; the built-in manager never calls it ([#847](https://github.com/modx-pro/MiniShop3/issues/847)) |
| `msOnBeforeAddToCustomer` / `msOnAddToCustomer` | Field change via controller |
| `msOnBeforeValidateCustomerValue` / `msOnValidateCustomerValue` | Field value validation |
| `msOnBeforeGetOrderCustomer` / `msOnGetOrderCustomer` | Find/create on checkout |
| `msOnBeforeAddCustomerAddress` / `msOnAddCustomerAddress` | Add address |

Event parameter details: [Events](../events).
