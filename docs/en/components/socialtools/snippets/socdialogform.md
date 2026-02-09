# socDialogForm

Snippet outputs a message send form.

## Parameters

One parameter: form template **tplFormCreate**, default **soc.sendForm**.

Checks for `recipient` in *$_REQUEST* (user ID). If present, the recipient username is set in placeholder `recipient`.

## Examples

Simple form output:

```modx
[[!socDialogForm]]
```
