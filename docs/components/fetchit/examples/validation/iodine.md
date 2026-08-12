---
title: Валидация с помощью Iodine
description: "Клиентская валидация FetchIt через Iodine и событие fetchit:before"
---

# Валидация с помощью Iodine

Клиентская проверка формы с двумя полями через [Iodine](https://github.com/caneara/iodine) и [`fetchit:before`](/components/fetchit/frontend/events#fetchitbefore).

<!--@include: ../../parts/validation.warning.md-->

## Подключение

CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@caneara/iodine@8/dist/iodine.min.umd.js" defer></script>
```

## Разметка

Атрибут `novalidate` отключает встроенную проверку браузера. Для AJAX добавьте `[data-success]` и `[data-validation-error]` ([селекторы](/components/fetchit/selectors)).

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Имя
    <input type="text" name="name" value="[[+fi.name]]" />
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]" />
    <span data-error="email">[[+fi.error.email]]</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" novalidate>
  <label> Имя
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}" />
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}" />
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

:::

## Обработчик

`Iodine.assert` принимает объект полей и правила. При ошибке вызываете `preventDefault`, дальше `setError` / `clearError`:

```js
document.addEventListener('fetchit:before', (e) => {
  const { formData, fetchit } = e.detail
  const fields = Object.fromEntries(formData.entries())
  const rules = {
    name: ['required', 'minLength:5'],
    email: ['required', 'email'],
  }

  const validation = Iodine.assert(fields, rules)
  if (validation.valid) {
    return
  }

  e.preventDefault()

  for (const [name, field] of Object.entries(validation.fields)) {
    if (field.valid) {
      fetchit.clearError(name)
      continue
    }

    fetchit.setError(name, field.error)
  }
})
```

Серверную проверку всё равно держите в FormIt (или в своём сниппете):

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &validate=`name:required:minLength=^5^,email:required:email`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'validate' => 'name:required:minLength=^5^,email:required:email',
]}
```

:::

Валидаторы FormIt: [документация FormIt](https://docs.modx.com/3.x/en/extras/formit/formit.validators).
