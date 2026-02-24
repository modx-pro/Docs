---
title: CallBack
description: Component for displaying, processing, and logging callback requests
---
# CallBack

Component for displaying, processing, and logging callback requests.

- On install it loads the default dependencies: [AjaxForm](/en/components/ajaxform) and [FormIt](https://docs.modx.com/current/en/extras/formit).
- Outputs a "Callback" link that opens a modal form where the user can enter their phone number and how they wish to be addressed.
- Submitted requests are sent to the configured email and stored in the log.
- In the log you can search by name and phone, and add comments to requests.
- Includes [jQuery Mask Plugin](https://github.com/igorescobar/jQuery-Mask-Plugin) for phone input masking. Default styling uses [Bootstrap](http://getbootstrap.com).
- The component is designed for quick setup of a working callback solution.

## Snippet parameters

| Name | Default | Description |
|------|---------|-------------|
| **&tpl** | `tpl.callBack.item` | Chunk for the link that opens the modal form. |
| **&target** | `callBackModal` | ID linking the button to the form. |
| **&registerBootstrap** | `1` | Whether to load Bootstrap scripts. |
| **&registerCss** | `1` | Whether to load default Bootstrap CSS. |
| **&wrapperSnippet** | `AjaxForm` | Snippet that adds ajax behavior to the form. |
| **&toPlaceholder** | | Placeholder name to output the modal form separately from the button. |

## Default AjaxForm and FormIt parameters

| Name | Default | Description |
|------|---------|-------------|
| **&snippet** | `FormIt` | Snippet that processes the form. |
| **&form** | `tpl.callBack.form` | Chunk for the callback request form. |
| **&hooks** | `email,callBackLog` | FormIt hooks: send email and write to log. |
| **&validate** | `phone:required,name:required` | Phone and name required by default. |
| **&emailSubject** | `[[%callback.emailSubject]]` | Email subject. |
| **&emailTpl** | `tpl.callBack.email` | Chunk for the admin email. |
| **&successMessage** | `[[%callback.successMessage]]` | Message shown on successful submit. |
| **&emailTo** | `[[++emailsender]]` | Recipient for the form data email. |

You can use any other AjaxForm and FormIt parameters.

The phone mask is set via the `data-mask` attribute, e.g.:

```modx
<input type="text" class="form-control" id="phone" name="phone" value="[[!+fi.phone]]" data-mask="+0(000)000-00-00">
```

## Call log

![Call log](https://file.modx.pro/files/d/c/e/dceb379fe1b01e3126f009af06e87405.png)

By default the log shows name, phone, all extra form fields, and submit time. The recipient email is also stored.

To show custom labels for extra fields, add lexicon entries like `callback_item_fieldname`. For example, for a **city** field create **callback_item_city** with value **"City"**.

You can add a comment to each request or edit name and phone. You can also delete one or several entries.

## Examples

- Basic call (good for a fresh install):

```modx
[[!callBack]]
```

- If the site already uses Bootstrap, disable its loading to avoid conflicts:

```modx
[[!callBack? &registerBootstrap=`0` &registerCss=`0`]]
```

- When using the snippet inside a Bootstrap navbar, the overlay may cover the form. To avoid that, output the form higher in the DOM with &toPlaceholder:

```modx
[[!callBack? &registerBootstrap=`0` &registerCss=`0` &toPlaceholder=`modal_form`]]
...
[[+modal_form]]
```
