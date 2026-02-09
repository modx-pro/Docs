---
title: Профиль покупателя
---
# Профиль покупателя

Страница профиля позволяет покупателю просматривать и редактировать свои личные данные. Является частью личного кабинета MiniShop3.

## Структура страницы

| Компонент | Файл | Назначение |
|-----------|------|------------|
| Базовый layout | `tpl.msCustomer.base` | Общая обёртка с sidebar |
| Боковая панель | `tpl.msCustomer.sidebar` | Навигация ЛК |
| Профиль | `tpl.msCustomer.profile` | Форма редактирования |

## Вызов сниппета

```fenom
{'!msCustomer' | snippet : [
    'service' => 'profile'
]}
```

### Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **service** | `profile` | Тип сервиса |
| **tpl** | `tpl.msCustomer.profile` | Чанк профиля |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Чанк для гостей |
| **return** | `tpl` | Формат: `tpl` или `data` |

## Архитектура чанков

Чанки личного кабинета используют наследование:

```
tpl.msCustomer.base          — базовый layout
├── {include 'tpl.msCustomer.sidebar'}  — боковая панель
└── {block 'content'}        — область контента
    └── tpl.msCustomer.profile — форма профиля
```

## Плейсхолдеры

### В чанке tpl.msCustomer.profile

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$customer}` | array | Данные покупателя |
| `{$customer.id}` | int | ID покупателя |
| `{$customer.email}` | string | Email |
| `{$customer.first_name}` | string | Имя |
| `{$customer.last_name}` | string | Фамилия |
| `{$customer.phone}` | string | Телефон |
| `{$email_verified}` | bool | Email подтверждён |
| `{$email_verified_at}` | string | Дата подтверждения email |
| `{$phone_verified}` | bool | Телефон подтверждён |
| `{$phone_verified_at}` | string | Дата подтверждения телефона |
| `{$errors}` | array | Ошибки валидации |
| `{$success}` | bool | Успешное сохранение |

## Чанк профиля

```fenom
{* tpl.msCustomer.profile *}
{extends 'tpl.msCustomer.base'}

{block 'content'}
<div class="ms3-customer-profile">
    <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">{'ms3_customer_profile_title' | lexicon}</h5>
        </div>
        <div class="card-body">
            {if $success?}
            <div class="alert alert-success" role="alert">
                {'ms3_customer_profile_updated' | lexicon}
            </div>
            {/if}

            <form class="ms3_form ms3-customer-profile-form" method="post" action="">
                <input type="hidden" name="ms3_action" value="customer/update-profile">

                <div class="row">
                    {* Имя *}
                    <div class="col-md-6 mb-3">
                        <label for="first_name" class="form-label">
                            {'ms3_customer_first_name' | lexicon} <span class="text-danger">*</span>
                        </label>
                        <input type="text"
                               class="form-control {if $errors.first_name?}is-invalid{/if}"
                               id="first_name"
                               name="first_name"
                               value="{$customer.first_name}"
                               required>
                        {if $errors.first_name?}
                        <div class="invalid-feedback">{$errors.first_name}</div>
                        {/if}
                    </div>

                    {* Фамилия *}
                    <div class="col-md-6 mb-3">
                        <label for="last_name" class="form-label">
                            {'ms3_customer_last_name' | lexicon} <span class="text-danger">*</span>
                        </label>
                        <input type="text"
                               class="form-control {if $errors.last_name?}is-invalid{/if}"
                               id="last_name"
                               name="last_name"
                               value="{$customer.last_name}"
                               required>
                        {if $errors.last_name?}
                        <div class="invalid-feedback">{$errors.last_name}</div>
                        {/if}
                    </div>
                </div>

                {* Email с проверкой верификации *}
                <div class="mb-3">
                    <label for="email" class="form-label">
                        {'ms3_customer_email' | lexicon} <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <input type="email"
                               class="form-control {if $errors.email?}is-invalid{/if}"
                               id="email"
                               name="email"
                               value="{$customer.email}"
                               required>
                        {if $email_verified}
                        <span class="input-group-text bg-success text-white">
                            {'ms3_customer_email_verified' | lexicon}
                        </span>
                        {else}
                        <button class="btn btn-outline-warning" type="button"
                                id="resend-verification-email"
                                data-customer-id="{$customer.id}">
                            {'ms3_customer_email_send_verification' | lexicon}
                        </button>
                        {/if}
                    </div>
                    {if $errors.email?}
                    <div class="invalid-feedback d-block">{$errors.email}</div>
                    {/if}
                </div>

                {* Телефон *}
                <div class="mb-3">
                    <label for="phone" class="form-label">
                        {'ms3_customer_phone' | lexicon} <span class="text-danger">*</span>
                    </label>
                    <input type="tel"
                           class="form-control {if $errors.phone?}is-invalid{/if}"
                           id="phone"
                           name="phone"
                           value="{$customer.phone}"
                           required>
                    {if $errors.phone?}
                    <div class="invalid-feedback">{$errors.phone}</div>
                    {/if}
                </div>

                {* Кнопка сохранения *}
                <div class="d-flex justify-content-end gap-2 mt-4">
                    <button type="submit" class="btn btn-primary ms3_link">
                        {'ms3_customer_profile_save' | lexicon}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
{/block}
```

## Верификация email

Профиль показывает статус верификации email:

- **Подтверждён** — зелёный бейдж с галочкой
- **Не подтверждён** — кнопка отправки письма с подтверждением

```fenom
{if $email_verified}
    <span class="input-group-text bg-success text-white">
        {'ms3_customer_email_verified' | lexicon}
    </span>
{else}
    <button class="btn btn-outline-warning" type="button"
            id="resend-verification-email"
            data-customer-id="{$customer.id}">
        {'ms3_customer_email_send_verification' | lexicon}
    </button>
{/if}
```

## Обработка формы

Форма отправляется через POST с action `customer/update-profile`:

```html
<form class="ms3_form ms3-customer-profile-form" method="post">
    <input type="hidden" name="ms3_action" value="customer/update-profile">
    <!-- поля формы -->
    <button type="submit" class="btn btn-primary ms3_link">
        Сохранить
    </button>
</form>
```

JavaScript MiniShop3 перехватывает отправку формы с классом `ms3_form` и обрабатывает через API.

## Отображение ошибок

Ошибки валидации передаются в массиве `{$errors}`:

```fenom
<input type="text"
       class="form-control {if $errors.first_name?}is-invalid{/if}"
       name="first_name"
       value="{$customer.first_name}">
{if $errors.first_name?}
<div class="invalid-feedback">{$errors.first_name}</div>
{/if}
```

## Системные настройки

| Настройка | Описание |
|-----------|----------|
| `ms3_customer_profile_page_id` | ID страницы профиля |

## Кастомизация

### Свой чанк профиля

```fenom
{'!msCustomer' | snippet : [
    'service' => 'profile',
    'tpl' => 'tpl.myProfile'
]}
```

### Добавление полей

Для добавления дополнительных полей в профиль:

1. Добавьте поля в модель msCustomer (через миграцию)
2. Добавьте поля в чанк профиля
3. Обработайте новые поля в API endpoint

## CSS-классы

| Класс | Элемент |
|-------|---------|
| `.ms3-customer-profile` | Контейнер профиля |
| `.ms3-customer-profile-form` | Форма профиля |
| `.ms3_form` | Форма MiniShop3 (для JS) |
| `.ms3_link` | Кнопка отправки |
