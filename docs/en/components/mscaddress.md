---
title: mscAddress
description: User addresses for account and checkout
logo: https://modstore.pro/assets/extras/mscaddress/logo-md.png
author: modx-pro
modstore: https://modstore.pro/packages/integration/mscaddress
repository: https://github.com/modx-pro/mscAddress

dependencies: miniShop2
---

# mscAddress

User addresses for the account and checkout page. The component works only for **authenticated users**.

## How to use

In the **tpl.msOrder** chunk, inside the form, output addresses:

::: code-group

```modx
<form class="form-horizontal ms2_form" id="msOrder" method="post">
    <div class="row">
        <div class="col-md-6">
            [[!mscAddress?
                &tpl=`tpl.mscaSelect`
            ]]
        </div>
    </div>
...
</form>
```

```fenom
<form class="form-horizontal ms2_form" id="msOrder" method="post">
    <div class="row">
        <div class="col-md-6">
            {$_modx->runSnippet('!mscAddress', [
                'tpl' => 'tpl.mscaSelect',
            ])}
        </div>
    </div>
...
</form>
```

:::

When the user changes the select on checkout, the corresponding fields are filled from the saved address.

On the account page, call the snippet to manage addresses:

::: code-group

```modx
[[!mscAddress]]
```

```fenom
{'!mscAddress'|snippet}
```

:::

If the "Add address" button does not appear in the account, check the **tpl.mscaAddresses** chunk; the button may be hidden by missing CSS.

## mscAddress parameters

| Name        | Default             | Description                          |
|-------------|---------------------|--------------------------------------|
| **tpl**     | `tpl.mscaAddresses` | Chunk for the address list.           |
| **tplForm** | `tpl.mscaForm`      | Chunk for the address edit form.      |

Chunk **tpl.mscaSelect** is used for the address select on checkout.

## System settings

| Name                    | Default                 | Description                                                |
|-------------------------|-------------------------|------------------------------------------------------------|
| **msca_address_handler**| `mscaAddressHandler`    | Class that implements address logic.                       |
| **msca_requires**       | `city,street,building`  | Required fields for adding an address.                     |
| **msca_frontend_css**   | `[[+cssUrl]]web/default.css` | Path to CSS file.                                      |
| **msca_frontend_js**    | `[[+jsUrl]]web/default.js`  | Path to JS file.                                       |
