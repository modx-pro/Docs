# Quick start

For a quick start, just call a single **FetchIt** snippet by specifying the name of your chunk as the value in the `form` parameter.

::: warning WARNING
The snippet must be called uncached, i.e. there must be an exclamation mark before its name.
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
  &validationErrorMessage=`This form has errors!`
  &successMessage=`The form has been submitted successfully`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'FormIt',
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Email subject',
  'emailTo' => 'info@domain.com',
  'validate' => 'name:required,email:required',
  'validationErrorMessage' => 'This form has errors!',
  'successMessage' => 'The form has been submitted successfully',
]}
```

:::

Let's imagine that the form in your layout looks like this:

```html
<form action="#" method="post">
  <input type="text" name="name" placeholder="Your name">
  <span class="input-error"></span>

  <input type="email" name="email" placeholder="E-mail">
  <span class="input-error"></span>

  <button type="submit">Submit</button>
</form>
```

The minimum you need to do is to set `data-error` attribute with a value matching the field name to the elements that will be displayed if they fail validation.

The rest is up to your taste and colour.

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
