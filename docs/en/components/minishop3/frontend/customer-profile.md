---
title: Customer profile
description: Profile page in customer account
---
# Customer profile

The profile page lets customers view and edit their personal data. It is part of the MiniShop3 customer account.

## Page structure

| Component | Chunk | Purpose |
|-----------|------|----------|
| Base layout | `tpl.msCustomer.base` | Wrapper with sidebar |
| Sidebar | `tpl.msCustomer.sidebar` | Account navigation |
| Profile | `tpl.msCustomer.profile` | Edit form |

## Snippet call

```fenom
{'!msCustomer' | snippet: [
    'service' => 'profile'
]}
```

### Parameters

| Parameter | Default | Description |
|----------|---------|-------------|
| **service** | `profile` | Service type |
| **tpl** | `tpl.msCustomer.profile` | Profile chunk |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Chunk for guests |
| **return** | `tpl` | Format: `tpl` or `data` |

## Chunk structure

Customer account chunks use inheritance:

```
tpl.msCustomer.base          — base layout
├── {include 'tpl.msCustomer.sidebar'}  — sidebar
└── {block 'content'}        — content area
    └── tpl.msCustomer.profile — profile form
```

## Placeholders

### In tpl.msCustomer.profile

| Placeholder | Type | Description |
|-------------|-----|-------------|
| `{$customer}` | array | Customer data |
| `{$customer.id}` | int | Customer ID |
| `{$customer.email}` | string | Email |
| `{$customer.first_name}` | string | First name |
| `{$customer.last_name}` | string | Last name |
| `{$customer.phone}` | string | Phone |
| `{$email_verified}` | bool | Email verified |
| `{$email_verified_at}` | string | Email verification date |
| `{$phone_verified}` | bool | Phone verified |
| `{$phone_verified_at}` | string | Phone verification date |
| `{$errors}` | array | Validation errors |
| `{$success}` | bool | Save success |

## Profile chunk

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
                    {* First name *}
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

                    {* Last name *}
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

                {* Email with verification *}
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

                {* Phone *}
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

                {* Save button *}
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

## Email verification

The profile shows email verification status:

- **Verified** — green badge with checkmark
- **Not verified** — button to resend verification email

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

## Form handling

The form is submitted via POST with action `customer/update-profile`:

```html
<form class="ms3_form ms3-customer-profile-form" method="post">
    <input type="hidden" name="ms3_action" value="customer/update-profile">
    <!-- form fields -->
    <button type="submit" class="btn btn-primary ms3_link">
        Save
    </button>
</form>
```

MiniShop3 JavaScript intercepts forms with class `ms3_form` and submits via API.

## Error display

Validation errors are in `{$errors}`:

```fenom
<input type="text"
       class="form-control {if $errors.first_name?}is-invalid{/if}"
       name="first_name"
       value="{$customer.first_name}">
{if $errors.first_name?}
<div class="invalid-feedback">{$errors.first_name}</div>
{/if}
```

## System settings

| Setting | Description |
|---------|-------------|
| `ms3_customer_profile_page_id` | Profile page ID |

## Customization

### Custom profile chunk

```fenom
{'!msCustomer' | snippet: [
    'service' => 'profile',
    'tpl' => 'tpl.myProfile'
]}
```

### Adding fields

To add extra profile fields:

1. Add fields to msCustomer model (via migration)
2. Add fields to the profile chunk
3. Handle new fields in the API endpoint

## CSS classes

| Class | Element |
|-------|---------|
| `.ms3-customer-profile` | Profile container |
| `.ms3-customer-profile-form` | Profile form |
| `.ms3_form` | MiniShop3 form (for JS) |
| `.ms3_link` | Submit button |
