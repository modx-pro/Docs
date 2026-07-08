---
title: Витрина — CSS и чанки
description: 'Стили PremiumAccess, CSS-классы и плейсхолдеры чанков закрытого CTA, кабинета, файлов'
---
<!-- TODO: translate from docs/components/premiumaccess/frontend.md -->

# Витрина: CSS и чанки

Плагин **`premiumaccess_front_assets`** подключает CSS из `premiumaccess.front_css` (по умолчанию `assets/components/premiumaccess/css/web/main.css`).

Сценарии интеграции:

- [Paywall на страницах](paywall)
- [Защищённые файлы](protected-files)
- [Личный кабинет](cabinet)

Paywall через **`premiumaccess_content_protection`** подключает assets на рабочих шаблонах автоматически.

## CSS-классы

| Класс | Назначение |
| --- | --- |
| `.pa-locked` | Блок закрытого CTA |
| `.pa-file-download` | Форма выдачи токена скачивания |
| `.pa-file-download__button` | Кнопка скачивания |
| `.pa-cabinet` | Обёртка личного кабинета |
| `.pa-cabinet__item` | Строка доступа |
| `.pa-cabinet__item--active` | Активный доступ |
| `.pa-cabinet__item--expired` | Истёкший |
| `.pa-cabinet__item--revoked` | Отозванный |
| `.pa-cabinet__empty` | Пустое состояние |

Стили минимальные. Переопределите в теме сайта после `main.css`.

## Чанки витрины

| Chunk | Плейсхолдеры | Назначение |
| --- | --- | --- |
| `paLockedCta` | `[[+title]]`, `[[+message]]`, `[[+productId]]`, `[[+targetKind]]` | Закрытый CTA контента и premium blocks |
| `paBuyButton` | `[[+msProductId]]`, `[[+buyLabel]]`, `[[+redirectUrl]]`, … | Форма добавления в корзину MS3 |
| `paRenewButton` | как `paBuyButton` | Кнопка продления доступа |
| `paFileLocked` | `[[+title]]`, `[[+message]]` | Закрытый CTA для файла |
| `paFileDownload` | `[[+connectorUrl]]`, `[[+file]]`, `[[+modAuth]]`, `[[+actionLabel]]` | POST `issue-token` |
| `paCabinet` | `[[+title]]`, `[[+items]]` | Обёртка кабинета |
| `paCabinetItem` | `[[+productName]]`, `[[+status]]`, `[[+statusLabel]]`, `[[+grantedAt]]`, `[[+expiresAt]]` | Строка доступа |
| `paCabinetEmpty` | `[[+message]]` | Пустой кабинет |
| `paPromoRedeemForm` | `[[+connectorUrl]]`, `[[+userToken]]`, … | Форма активации промокода |
| `paPremiumBlockPlaceholder` | — | Подсказка редакторам в SPA менеджера |

### Email (уведомления)

Chunks `paEmailGrant*`, `paEmailRevoke*`, `paEmailExtend*`, `paEmailExpire*`, `paEmailAutoRenewal*` — варианты **пользователю** и **администратору**.

Общие плейсхолдеры (MODX `[[+key]]`):

| Плейсхолдер | События | Описание |
| --- | --- | --- |
| `user_id` | все | ID пользователя |
| `product_id` | все | ID тарифа |
| `product_name` | все | Название тарифа |
| `user_email` | все | Email пользователя (письма пользователю) |
| `expires_at` | выдача, истечение, напоминание | Дата окончания или пусто (бессрочный) |
| `source` | все | `minishop3_order`, `manual`, `promo_code`, `expire_cron`, … |
| `extend_days` | продление | Число дней продления |
| `ms_product_id` | выдача, напоминание | ID товара MS3 |
| `renew_url` | напоминание (`auto_renewal_due`) | URL корзины или оформления заказа |

Webhook и **`OnPaAccessNotify`** получают те же ключи плюс `event` (`grant`, `revoke`, `extend`, `expire`, `auto_renewal_due`).

Примеры email-чанков из пакета: `paEmailGrantUser`, `paEmailAutoRenewalUser` с `[[+product_name]]`, `[[+expires_at]]`, `[[+renew_url]]`.

## Кастомизация закрытого CTA

1. Скопируйте chunk в своё пространство имён, измените разметку.
2. Укажите имя в **`premiumaccess.locked_cta_chunk`** или параметре сниппета.
3. Подключите свой CSS после `main.css`.

## Premium block marker

В content ресурса:

```text
[[pa-block:550e8400-e29b-41d4-a716-446655440000]]
```

Block создаётся в **Компоненты → PremiumAccess → Premium-блоки**. Плагин `premiumaccess_content_protection` заменяет маркер на HTML блока или закрытый CTA.

## Таблица MODX / Fenom

| Назначение | MODX | Fenom |
| --- | --- | --- |
| Защищённый контент | `[[!PremiumAccess]]` | `{'!PremiumAccess' \| snippet}` |
| Кнопка «Купить» | `[[!PremiumAccessBuy? &resourceId=`123`]]` | `{'!PremiumAccessBuy' \| snippet : ['resourceId' => 123]}` |
| File download | `[[!PremiumAccessFile? &file=`path`]]` | `{'!PremiumAccessFile' \| snippet : ['file' => 'path']}` |
| Cabinet | `[[!PremiumAccessCabinet]]` | `{'!PremiumAccessCabinet' \| snippet}` |
| Promo form | `[[!PremiumAccessPromoRedeem]]` | `{'!PremiumAccessPromoRedeem' \| snippet}` |
| Chunk закрытого CTA | `[[!$paLockedCta]]` | `{include 'file:chunks/paLockedCta.tpl'}` |

## См. также

- [Сниппеты](snippets/index)
- [Интеграция](integration)
- [Системные настройки](settings)
