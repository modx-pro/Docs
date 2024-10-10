# msb2OnActionBonus

Срабатывает в момент изменения бонусного баланса пользователя.

## Параметры

- `numeric $order_id` — id заказа, если действие происходит с заказом, иначе `$order_id = 0`
- `numeric $user_id` — id юзера, с чьим балансом происходит действие
- `string $action` — символ действия: `+` или `-`
- `string $type` — ключ (тип) действия: `order_writeoff`, `order_accrual`, `order_accrual_expired`, `signup`, `signup_expired`, `dob`, `dob_expired`, итд
- `numeric $amount` — кол-во бонусов фигурирующих в данном действии
- `bool $to_log` — записывается ли действие в лог
- `numeric $createdby` — id юзера, который создал запись в лог файл
