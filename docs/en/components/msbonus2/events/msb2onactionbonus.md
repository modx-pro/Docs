# msb2OnActionBonus

Fires when the user's bonus balance changes.

## Parameters

- `numeric $order_id` — order ID if the action is order-related, otherwise `0`
- `numeric $user_id` — user whose balance is affected
- `string $action` — action sign: `+` or `-`
- `string $type` — action type key: `order_writeoff`, `order_accrual`, `order_accrual_expired`, `signup`, `signup_expired`, `dob`, `dob_expired`, etc.
- `numeric $amount` — bonus amount for this action
- `bool $to_log` — whether the action is logged
- `numeric $createdby` — user ID that created the log entry
