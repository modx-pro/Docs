---
title: Вход и регистрация
description: Формы входа и регистрации покупателя, AuthUI, восстановление пароля и связанные настройки
---
# Вход и регистрация

Откройте страницу ЛК без сессии. Вы увидите чанк `tpl.msCustomer.unauthorized`: вкладки «Вход» и «Регистрация». Любой вызов `msCustomer` для гостя отдаёт тот же чанк.

В пакете нет отдельных шаблонов «только вход» и «только регистрация». Ключи `ms3_customer_login_page_id` и `ms3_customer_register_page_id` задают URL для ссылок и редиректов. На эти ресурсы обычно вешают тот же `msCustomer` (часто `service=profile`).

## Что сделать

1. Создайте ресурс ЛК (или два ресурса: вход и регистрация).
2. Вызовите `msCustomer` некэшированно.
3. Пропишите ID страниц в системных настройках namespace `minishop3`.
4. Убедитесь, что на витрине подключены скрипты MS3 ([Frontend JavaScript](/components/minishop3/development/frontend-js)).

::: code-group

```fenom
{'!msCustomer' | snippet : [
    'service' => 'profile'
]}
```

```modx
[[!msCustomer?
    &service=`profile`
]]
```

:::

Гость получит `unauthorizedTpl`. После входа откроется профиль (или другой `service`).

## Разметка форм

Файл чанка: `core/components/minishop3/elements/chunks/ms3_customer_unauthorized.tpl`.

| Элемент | ID / name | Назначение |
| --- | --- | --- |
| Форма входа | `#ms3-login-form` | `email`, `password` |
| Сообщения входа | `#login-messages` | ошибки и успех |
| Форма регистрации | `#ms3-register-form` | `email`, `password`, `password_confirm`, имя, телефон, privacy |
| Сообщения регистрации | `#register-messages` | ошибки и успех |
| Вкладки | `#login-tab`, `#register-tab` | Bootstrap tabs (`data-bs-toggle="tab"`) |
| «Забыли пароль» | `#forgot-password-link` | ссылка под формой входа |

Если правите чанк под свой дизайн, оставьте эти `id` и `name`. `AuthUI` берёт селекторы из `ms3.js` и иначе формы не подхватит.

## AuthUI

Класс `AuthUI` (`assets/components/minishop3/js/web/ui/AuthUI.js`) слушает submit и бьёт в Web API:

| Действие | Метод | Эндпоинт |
| --- | --- | --- |
| Вход | `handleLogin` | `POST /api/v1/customer/login` |
| Регистрация | `handleRegister` | `POST /api/v1/customer/register` |
| Выход | из ЛК / API | `POST /api/v1/customer/logout` |

После успеха скрипт редиректит по `ms3_customer_redirect_after_login` или обновляет страницу. Сервер кладёт токен в httpOnly cookie `ms3_token`. Формат ответов: [REST API](/components/minishop3/development/api).

### Провайдеры входа

`AuthManager::registerProvider()` позволяет добавить свой способ входа (OAuth, SMS и т.д.) в PHP. Штатная витрина использует только password-провайдер через `AuthUI`. Пример регистрации провайдера: [Backend API покупателя](/components/minishop3/development/backend-api/customer).

::: warning SMS-верификация
Сервис `SmsVerificationService` в пакете — **заглушка**: `sendVerificationCode()` логирует предупреждение и возвращает ошибку. SMS-логин из коробки нет, пока вы не подключите свой провайдер.
:::

## Восстановление пароля

В Web API уже есть:

- `POST /api/v1/customer/forgot-password` (тело: `email`)
- `POST /api/v1/customer/reset-password` (тело: `token`, `password`, `password_confirm`)

Ссылка `#forgot-password-link` в штатном чанке эти эндпоинты **не вызывает**. `handleForgotPassword` только показывает, что UI ещё не готов. Свой экран «забыли пароль» пишите поверх API сами.

Срок жизни токена сброса: `ms3_password_reset_token_ttl`.

## Подтверждение email

Включите `ms3_customer_require_email_verification`. После регистрации покупатель получит письмо со ссылкой на `GET /api/v1/customer/email/verify`. Повторная отправка: `POST /api/v1/customer/email/resend-verification` (нужна авторизация).

URL подставьте в `ms3_email_verification_url` и `ms3_email_verification_success_url`, если стандартный редирект на `api.php` вам не подходит.

## Настройки страниц и поведения

| Ключ | Зачем вам |
| --- | --- |
| `ms3_customer_login_page_id` | URL «Войти» в чанках и письмах |
| `ms3_customer_register_page_id` | URL «Регистрация» |
| `ms3_customer_profile_page_id` | Профиль после входа |
| `ms3_customer_redirect_after_login` | Куда вести после login (`0` = остаться) |
| `ms3_customer_auto_login_after_register` | Сразу войти после регистрации |
| `ms3_customer_require_privacy_consent` | Чекбокс согласия в форме |
| `ms3_customer_send_welcome_email` | Приветственное письмо |

Гостя при оформлении заказа можно превратить в `msCustomer` без формы ЛК. Ключи: `ms3_customer_auto_register_on_order` и `ms3_customer_auto_login_on_order`. Подробности: [Оформление заказа](/components/minishop3/frontend/order).

## Связь с modUser

По умолчанию ЛК работает на `msCustomer` и токене MS3. Синхронизацию с `modUser` включайте отдельно (`ms3_customer_sync_enabled` и соседние ключи в [системных настройках](/components/minishop3/settings)), если нужны группы MODX или общие ACL.

## См. также

- [Профиль покупателя](/components/minishop3/frontend/customer-profile)
- [Сниппет msCustomer](/components/minishop3/snippets/mscustomer)
- [REST API: клиент](/components/minishop3/development/api#клиент)
- [Frontend JavaScript: AuthUI](/components/minishop3/development/frontend-js)
