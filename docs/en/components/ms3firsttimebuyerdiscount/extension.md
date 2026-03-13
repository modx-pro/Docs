---
title: Extension
---
# Extension

How to replace the service, extend it, and use plugins on events.

## Replacing the service

The service is registered in bootstrap under `ms3ftb_discount`. To use your own implementation:

1. Load your code before the plugin runs (e.g. in a plugin with higher priority or in a package resolver).
2. Register your factory:

```php
$modx->services->add('ms3ftb_discount', function () use ($modx) {
    return new \YourNamespace\YourFtbService($modx);
});
```

Your class must at least implement `apply(array $scriptProperties): ?float`; other public methods are optional if you only call them from your own code.

## Extending FtbDiscountService

The service is designed so you can override the main logic in a subclass:

- **isEligible(int $userId, ?object $draft): bool** — change who is eligible (e.g. by user group or draft field).
- **getPaidOrdersCount(int $userId, int $excludeOrderId = 0): int** — change how paid orders are counted (e.g. exclude current order).
- **getGuestContactFromDraft(?object $draft): array** — change how guest email/phone is read from the draft.
- **getPaidOrdersCountByContact(string $email, string $phone, int $excludeOrderId = 0): int** — change paid-order count for guests.
- **calculateDiscount(float $cost, string $type, float $value): float** — change the formula (e.g. minimum order amount).

Example: discount only for the “Partner” group:

```php
namespace YourNamespace\Services;

use Ms3FirstTimeBuyerDiscount\Services\FtbDiscountService;

class PartnerFtbService extends FtbDiscountService
{
    public function isEligible(int $userId, ?object $draft = null): bool
    {
        if (!parent::isEligible($userId, $draft)) {
            return false;
        }
        $user = $this->modx->getObject(\MODX\Revolution\modUser::class, $userId);
        if (!$user) {
            return false;
        }
        return $user->isMember('Partner');
    }
}
```

Register `PartnerFtbService` instead of the default service (see above).

## Plugins on ftbOnBeforeApply

Cancel applying the discount (e.g. for a specific delivery method):

```php
if (($modx->event->name ?? '') !== 'ftbOnBeforeApply') {
    return;
}
$draft = $modx->event->params['draft'] ?? null;
if ($draft && is_object($draft) && $draft->get('delivery_id') == 5) {
    $modx->event->returnedValues['apply'] = false;
}
```

Override the base amount used for the discount:

```php
if (($modx->event->name ?? '') !== 'ftbOnBeforeApply') {
    return;
}
$cost = (float) ($modx->event->params['cost'] ?? 0);
$modx->event->returnedValues['cost'] = $cost * 0.95; // 5% base discount, then FTB
```

## Plugins on ftbOnApply

Log or send to analytics:

```php
if (($modx->event->name ?? '') !== 'ftbOnApply') {
    return;
}
$params = $modx->event->params;
$modx->log(modX::LOG_LEVEL_INFO, sprintf(
    'FTB applied: user=%s, discount=%s',
    $params['user_id'],
    $params['discount_amount']
), '', 'ftb');
// or send to CRM/analytics via $params['user_id'], $params['discount_amount']
```

## Constants and settings

The service uses internal constants for discount types: `percent`, `fixed`. Setting keys: `ftb_enabled`, `ftb_discount_type`, `ftb_discount_value`, `ftb_allow_combination`. Full list and types: [API](api#system-settings).

## Logging

The plugin writes to the MODX log when the discount is applied:

- **Category:** `ftb`
- **Level:** INFO
- **Message:** `[FTB] Applied: user_id=..., discount=..., cost_before=..., cost_after=...`

Errors (e.g. service unavailable) are logged with level ERROR and the same category `ftb`.
