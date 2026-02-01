# Quick start

To get started, call the **FetchIt** snippet once and set the `form` parameter to your chunk name.

::: warning Important!
The snippet must be called uncached, i.e. with an exclamation mark before its name.
:::

::: code-group

```modx
[[!FetchIt?
  &snippet=`FormIt`
  &form=`myForm.tpl`
  &hooks=`email`
  &emailSubject=`Email subject`
  &emailTo=`info@domain.com`
  &validate=`name:required,email:required`
  &validationErrorMessage=`The form contains errors!`
  &successMessage=`Message sent successfully`
]]
```

```fenom
{'!FetchIt' | snippet: [
  'snippet' => 'FormIt',
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Email subject',
  'emailTo' => 'info@domain.com',
  'validate' => 'name:required,email:required',
  'validationErrorMessage' => 'The form contains errors!',
  'successMessage' => 'Message sent successfully',
]}
```

:::

Suppose your form looks like this:

```html
<form action="#" method="post">
  <input type="text" name="name" placeholder="Your name">
  <span class="input-error"></span>

  <input type="email" name="email" placeholder="E-mail">
  <span class="input-error"></span>

  <button type="submit">Submit</button>
</form>
```

Add a `data-error` attribute with the field name to the elements that will show validation errors. The rest is up to you.

::: code-group

```modx [myForm.tpl]
<form action="[[~[[*id]]]]" method="post">
  <input type="text" name="name" placeholder="Your name" value="[[+fi.name]]">
  <span class="input-error" data-error="name">[[+fi.error.name]]</span>

  <input type="email" name="email" placeholder="E-mail" value="[[+fi.email]]">
  <span class="input-error" data-error="email">[[+fi.error.email]]</span>

  <button type="submit">Submit</button>
</form>
```

:::
