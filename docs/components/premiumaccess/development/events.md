---
title: События MODX
description: OnPaAccessGrant, Revoke, Extend, Notify и Check — события для кастомных плагинов
---

# События MODX

PremiumAccess вызывает события при выдаче, отзыве, продлении и перед отправкой уведомлений. Подключите свой плагин для CRM, аналитики или своих каналов оповещения.

Плагин **`premiumaccess_notifications`** слушает выдачу, отзыв и продление параллельно с вашими обработчиками.

## Жизненный цикл

| Событие | Когда | Источник |
| --- | --- | --- |
| `OnPaAccessGrant` | Доступ выдан впервые | Заказ MS3, ручная выдача, промокод |
| `OnPaAccessRevoke` | Доступ отозван | Отмена заказа MS3, ручной отзыв |
| `OnPaAccessExtend` | Срок доступа продлён | Продление в менеджере |
| `OnPaAccessUpdate` | Даты изменены вручную | Редактирование в менеджере (`mgr/access/update`) |
| `OnPaAccessCheck` | Проверка доступа | `web/access/check`, модификатор Fenom |

Заказ снова переходит в «Оплачен» (повторный webhook, смена статуса в админке), а доступ по этому тарифу у пользователя уже есть — **`OnPaAccessGrant` не срабатывает**, вторую запись компонент не создаёт.

То же для промокода: событие только когда доступ **действительно создан**, не при повторной активации того же кода.

## OnPaAccessGrant / Revoke / Extend — свойства

Типичные ключи в `$modx->event->properties`:

| Ключ | Тип | Описание |
| --- | --- | --- |
| `user_id` | int | Пользователь web-контекста |
| `product_id` | int | ID тарифа |
| `source` | string | `minishop3_order`, `manual`, `promo_code` |
| `email` | string | Опционально при выдаче |
| `extend_days` | int | Только OnPaAccessExtend |
| `granted_at` | string | Только OnPaAccessUpdate |
| `expires_at` | string | OnPaAccessUpdate, Extend |

**OnPaAccessExtend** сдвигает `expires_at` на N дней. **OnPaAccessUpdate** задаёт абсолютные даты в менеджере без формулы продления.

Пример плагина:

```php
switch ($modx->event->name) {
    case 'OnPaAccessGrant':
        $userId = (int) ($modx->event->properties['user_id'] ?? 0);
        $productId = (int) ($modx->event->properties['product_id'] ?? 0);
        // CRM, Slack, …
        break;
}
```

## OnPaAccessNotify

Срабатывает **перед отправкой** email, webhook и Telegram.

Свойства = плейсхолдеры сообщения + `event_name`:

| Ключ | Описание |
| --- | --- |
| `event` | `grant`, `revoke`, `extend`, `expire`, `auto_renewal_due` |
| `user_id` | int |
| `product_id` | int |
| `product_name` | string |
| `user_email` | string |
| `expires_at` | string или пусто |
| `source` | string |
| `extend_days` | int или null |
| `ms_product_id` | int или пусто |

Включение каналов: `premiumaccess.notifications_enabled` — [настройки](../settings#уведомления-и-cron-premiumaccess_notifications) (раздел **Настройки** в SPA или системные настройки MODX).

## Webhook

POST на `premiumaccess.notify_webhook_url` — JSON с теми же полями, что в таблице выше.

Content-Type: application/json. Обрабатывайте на своём сервере; таймауты и ошибки — в MODX error log.

## OnPaAccessCheck

Свойства:

| Ключ | Описание |
| --- | --- |
| `user_id` | int |
| `target_type` | string |
| `target_identifier` | string |
| `allowed` | bool |

Для аналитики просмотров paywall без изменения результата проверки доступа.

## msOnChangeOrderStatus

Плагин **`premiumaccess_order_access`** — не событие PremiumAccess, но точка интеграции MS3:

```php
// MS3 передаёт order object и новый status
// Плагин premiumaccess_order_access: выдача и отзыв доступа по заказу MS3
```

Свой плагин на `msOnChangeOrderStatus` не должен выдавать доступ заново — это уже делает **`premiumaccess_order_access`**. Подпишитесь на `OnPaAccessGrant`, если нужна реакция на **новую** выдачу.

## Cron истечения

Отдельного MODX-события на каждую истёкшую запись нет. В журнал пишется `access_expired`; письмо уходит через стандартный канал уведомлений после cron-обработки.

CLI: `php core/components/premiumaccess/bin/expire-accesses.php`

## Публичный PHP API

Для сниппетов и плагинов:

```php
use PremiumAccess\Domain\Access\AccessTarget;
use PremiumAccess\Presentation\PremiumAccessFacade;

if (!PremiumAccessFacade::isEnabled($modx)) {
    return;
}

$decision = PremiumAccessFacade::checkAccess(
    $modx,
    AccessTarget::resource(2046),
);

$content = PremiumAccessFacade::renderProtectedContent(
    $modx,
    $html,
    2046,
);
```

Подключение классов: плагин `premiumaccess_autoload` на `OnMODXInit`.

## См. также

- [Connector API](api)
- [Уведомления](../integration#уведомления-и-cron-истечения)
- [Интеграция — покупка](../integration)
- [FAQ](../faq)
