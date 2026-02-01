---
title: Delivery addresses
description: Customer address management page
---
# Delivery addresses

Page for managing customer delivery addresses. Create, edit, delete addresses and set a default.

## Page structure

| Component | Chunk | Purpose |
|-----------|------|----------|
| Base layout | `tpl.msCustomer.base` | Wrapper with sidebar |
| Sidebar | `tpl.msCustomer.sidebar` | Account navigation |
| Address list | `tpl.msCustomer.addresses` | List container |
| Address row | `tpl.msCustomer.address.row` | Single address row |
| Address form | `tpl.msCustomer.address.form` | Create/edit form |

## Snippet call

```fenom
{'!msCustomer' | snippet: [
    'service' => 'addresses'
]}
```

### Parameters

| Parameter | Default | Description |
|----------|---------|-------------|
| **service** | | Service type (`addresses`) |
| **tpl** | `tpl.msCustomer.addresses` | Address list chunk |
| **addressTpl** | `tpl.msCustomer.address.row` | Address row chunk |
| **formTpl** | `tpl.msCustomer.address.form` | Form chunk |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Chunk for guests |
| **return** | `tpl` | Format: `tpl` or `data` |

## Modes

The page has three modes via GET parameter `mode`:

| URL | Mode | Description |
|-----|------|-------------|
| `/cabinet/addresses/` | `list` | Address list |
| `/cabinet/addresses/?mode=create` | `create` | Create address |
| `/cabinet/addresses/?mode=edit&id=5` | `edit` | Edit address #5 |

## Placeholders

### In tpl.msCustomer.addresses (list)

| Placeholder | Type | Description |
|-------------|-----|-------------|
| `{$addresses}` | string | Rendered address rows (HTML) |
| `{$addresses_count}` | int | Address count |
| `{$customer}` | array | Customer data |
| `{$success}` | string | Success message |
| `{$error}` | string | Error message |

### In tpl.msCustomer.address.row

| Placeholder | Type | Description |
|-------------|-----|-------------|
| `{$id}` | int | Address ID |
| `{$name}` | string | Address name |
| `{$display_name}` | string | Auto-generated name |
| `{$is_default}` | bool | Default address |
| `{$index}` | string | Postal code |
| `{$country}` | string | Country |
| `{$region}` | string | Region |
| `{$city}` | string | City |
| `{$street}` | string | Street |
| `{$building}` | string | Building |
| `{$entrance}` | string | Entrance |
| `{$floor}` | string | Floor |
| `{$room}` | string | Apartment/office |
| `{$metro}` | string | Metro station |
| `{$text_address}` | string | Address comment |

### In tpl.msCustomer.address.form

| Placeholder | Type | Description |
|-------------|-----|-------------|
| `{$mode}` | string | Mode: `create` or `edit` |
| `{$address}` | array | Address data (when editing) |
| `{$errors}` | array | Validation errors |
| `{$customer}` | array | Customer data |

## Address list chunk

```fenom
{* tpl.msCustomer.addresses *}
{extends 'tpl.msCustomer.base'}

{block 'content'}
<script src="{'assets_url' | option}components/minishop3/js/web/modules/customer-addresses.js"></script>
<div class="ms3-customer-addresses">
    <div class="card shadow-sm">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">{'ms3_customer_addresses_title' | lexicon}</h5>
            <a href="?mode=create" class="btn btn-sm btn-light">
                {'ms3_customer_address_add' | lexicon}
            </a>
        </div>
        <div class="card-body">
            {if $success?}
            <div class="alert alert-success" role="alert">
                {$success}
            </div>
            {/if}

            {if $error?}
            <div class="alert alert-danger" role="alert">
                {$error}
            </div>
            {/if}

            {if $addresses_count > 0}
            <div class="list-group list-group-flush">
                {$addresses}
            </div>
            {else}
            <div class="alert alert-info" role="alert">
                {'ms3_customer_addresses_empty' | lexicon}
            </div>
            {/if}
        </div>
    </div>
</div>
<script>
new CustomerAddresses().init()
</script>
{/block}
```

## Address row chunk

```fenom
{* tpl.msCustomer.address.row *}
<div class="list-group-item"
     data-confirm-set-default="{'ms3_customer_address_set_default_confirm' | lexicon}"
     data-confirm-delete="{'ms3_customer_address_delete_confirm' | lexicon}"
     data-error-unknown="{'ms3_err_unknown' | lexicon}">
    <div class="d-flex w-100 justify-content-between align-items-start">
        <div class="flex-grow-1">
            <h6 class="mb-1">
                {if $name}
                    {$name}
                {else}
                    {$display_name}
                {/if}
                {if $is_default}
                <span class="badge bg-success ms-2">
                    {'ms3_customer_address_default' | lexicon}
                </span>
                {/if}
            </h6>
            <p class="mb-1 text-muted small">
                {if $index}{$index}, {/if}
                {$city}{if $region}, {$region}{/if}{if $country}, {$country}{/if}
            </p>
            <p class="mb-1 small">
                {$street}{if $building}, {$building}{/if}
                {if $entrance}, {$entrance}{/if}
                {if $floor}, {$floor}{/if}
                {if $room}, {$room}{/if}
            </p>
            {if $metro}
            <p class="mb-1 small text-muted">{$metro}</p>
            {/if}
        </div>
        <div class="btn-group btn-group-sm ms-3" role="group">
            {if !$is_default}
            <button type="button"
                    class="btn btn-outline-secondary set-default-address"
                    data-address-id="{$id}"
                    title="{'ms3_customer_address_set_default' | lexicon}">
                ★
            </button>
            {/if}
            <a href="?mode=edit&id={$id}"
               class="btn btn-outline-primary"
               title="{'ms3_customer_address_edit' | lexicon}">
                ✎
            </a>
            <button type="button"
                    class="btn btn-outline-danger delete-address"
                    data-address-id="{$id}"
                    title="{'ms3_customer_address_delete' | lexicon}">
                ✕
            </button>
        </div>
    </div>
</div>
```

## Address form chunk

```fenom
{* tpl.msCustomer.address.form *}
<div class="ms3-customer-address-form">
    <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">
                {if $mode == 'edit'}
                    {'ms3_customer_address_edit' | lexicon}
                {else}
                    {'ms3_customer_address_add' | lexicon}
                {/if}
            </h5>
        </div>
        <div class="card-body">
            <form class="ms3_form ms3-address-form" method="post" action="">
                <input type="hidden" name="ms3_action"
                       value="customer/{if $mode == 'edit'}address-update{else}address-create{/if}">
                {if $mode == 'edit'}
                <input type="hidden" name="id" value="{$address.id}">
                {/if}

                {* Address name *}
                <div class="mb-3">
                    <label for="name" class="form-label">
                        {'ms3_customer_address_name' | lexicon}
                    </label>
                    <input type="text" class="form-control" id="name" name="name"
                           value="{$address.name}"
                           placeholder="{'ms3_customer_address_name_placeholder' | lexicon}">
                    <div class="form-text">
                        {'ms3_customer_address_name_help' | lexicon}
                    </div>
                </div>

                <div class="row">
                    {* Postal code *}
                    <div class="col-md-4 mb-3">
                        <label for="index" class="form-label">
                            {'ms3_customer_index' | lexicon}
                        </label>
                        <input type="text" class="form-control" id="index" name="index"
                               value="{$address.index}">
                    </div>

                    {* Country *}
                    <div class="col-md-8 mb-3">
                        <label for="country" class="form-label">
                            {'ms3_customer_country' | lexicon}
                        </label>
                        <input type="text" class="form-control" id="country" name="country"
                               value="{$address.country}">
                    </div>
                </div>

                <div class="row">
                    {* Region *}
                    <div class="col-md-6 mb-3">
                        <label for="region" class="form-label">
                            {'ms3_customer_region' | lexicon}
                        </label>
                        <input type="text" class="form-control" id="region" name="region"
                               value="{$address.region}">
                    </div>

                    {* City *}
                    <div class="col-md-6 mb-3">
                        <label for="city" class="form-label">
                            {'ms3_customer_city' | lexicon} <span class="text-danger">*</span>
                        </label>
                        <input type="text" class="form-control" id="city" name="city"
                               value="{$address.city}" required>
                    </div>
                </div>

                {* Street *}
                <div class="mb-3">
                    <label for="street" class="form-label">
                        {'ms3_customer_street' | lexicon} <span class="text-danger">*</span>
                    </label>
                    <input type="text" class="form-control" id="street" name="street"
                           value="{$address.street}" required>
                </div>

                <div class="row">
                    {* Building *}
                    <div class="col-md-3 mb-3">
                        <label for="building" class="form-label">
                            {'ms3_customer_building' | lexicon} <span class="text-danger">*</span>
                        </label>
                        <input type="text" class="form-control" id="building" name="building"
                               value="{$address.building}" required>
                    </div>

                    {* Entrance *}
                    <div class="col-md-3 mb-3">
                        <label for="entrance" class="form-label">
                            {'ms3_customer_entrance' | lexicon}
                        </label>
                        <input type="text" class="form-control" id="entrance" name="entrance"
                               value="{$address.entrance}">
                    </div>

                    {* Floor *}
                    <div class="col-md-3 mb-3">
                        <label for="floor" class="form-label">
                            {'ms3_customer_floor' | lexicon}
                        </label>
                        <input type="text" class="form-control" id="floor" name="floor"
                               value="{$address.floor}">
                    </div>

                    {* Room *}
                    <div class="col-md-3 mb-3">
                        <label for="room" class="form-label">
                            {'ms3_customer_room' | lexicon}
                        </label>
                        <input type="text" class="form-control" id="room" name="room"
                               value="{$address.room}">
                    </div>
                </div>

                {* Metro *}
                <div class="mb-3">
                    <label for="metro" class="form-label">
                        {'ms3_customer_metro' | lexicon}
                    </label>
                    <input type="text" class="form-control" id="metro" name="metro"
                           value="{$address.metro}">
                </div>

                {* Comment *}
                <div class="mb-3">
                    <label for="text_address" class="form-label">
                        {'ms3_customer_comment' | lexicon}
                    </label>
                    <textarea class="form-control" id="text_address" name="text_address"
                              rows="2">{$address.text_address}</textarea>
                </div>

                {* Buttons *}
                <div class="d-flex justify-content-between gap-2 mt-4">
                    <a href="?" class="btn btn-secondary">
                        {'ms3_customer_cancel' | lexicon}
                    </a>
                    <button type="submit" class="btn btn-primary ms3_link">
                        {if $mode == 'edit'}
                            {'ms3_customer_save' | lexicon}
                        {else}
                            {'ms3_customer_address_add' | lexicon}
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
```

## JavaScript API

The page uses the `CustomerAddresses` class for AJAX:

```javascript
// Init
new CustomerAddresses().init()

// API endpoints
POST /api/v1/customer/address/set-default  // Set default
POST /api/v1/customer/address/delete       // Delete address
```

### Action buttons

```html
<!-- Set default -->
<button class="set-default-address" data-address-id="5">★</button>

<!-- Delete -->
<button class="delete-address" data-address-id="5">✕</button>
```

## Form handling

| Action | ms3_action | Description |
|--------|------------|-------------|
| Create | `customer/address-create` | Create address |
| Edit | `customer/address-update` | Update address |

## Address fields

| Field | Required | Description |
|------|----------|-------------|
| `name` | No | Address name (Home, Office) |
| `index` | No | Postal code |
| `country` | No | Country |
| `region` | No | Region/state |
| `city` | **Yes** | City |
| `street` | **Yes** | Street |
| `building` | **Yes** | Building |
| `entrance` | No | Entrance |
| `floor` | No | Floor |
| `room` | No | Apartment/office |
| `metro` | No | Metro station |
| `text_address` | No | Address comment |

## System settings

| Setting | Description |
|---------|-------------|
| `ms3_customer_addresses_page_id` | Addresses page ID |

## CSS classes

| Class | Element |
|-------|---------|
| `.ms3-customer-addresses` | Address list container |
| `.ms3-customer-address-form` | Form container |
| `.ms3-address-form` | Address form |
| `.set-default-address` | Set default button |
| `.delete-address` | Delete button |
