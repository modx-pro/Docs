---
title: Валидация с помощью Valibot
description: "Клиентская проверка формы FetchIt схемой Valibot в событии fetchit:before"
---

# Валидация с помощью Valibot

[Valibot](https://valibot.dev/) описывает правила формы схемой, как yup или Zod, но собирается из отдельных функций. Для формы из трёх полей в браузер приходит 2–3 КБ.

<!--@include: ../../parts/validation.warning.md-->

## Разметка

`novalidate` выключает подсказки браузера: ошибки покажет FetchIt в `[data-error]`.

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Имя
    <input type="text" name="name" value="[[+fi.name]]">
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]">
    <span data-error="email">[[+fi.error.email]]</span>
  </label>
  <label>
    <input type="checkbox" name="agree" value="1">
    Согласен на обработку персональных данных
  </label>
  <span data-error="agree">[[+fi.error.agree]]</span>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" novalidate>
  <label> Имя
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}">
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>
  <label>
    <input type="checkbox" name="agree" value="1">
    Согласен на обработку персональных данных
  </label>
  <span data-error="agree">{$_modx->getPlaceholder('fi.error.agree')}</span>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

:::

## Схема и обработчик

```html
<script type="module">
  import * as v from 'https://cdn.jsdelivr.net/npm/valibot@1/+esm'

  const ContactSchema = v.object({
    name: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty('Как к вам обращаться?'),
      v.minLength(2, 'Имя — от двух букв'),
    ),
    email: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty('Укажите e-mail'),
      v.email('Похоже, в адресе опечатка'),
    ),
    agree: v.pipe(
      v.optional(v.string(), ''),
      v.value('1', 'Без согласия мы не сможем ответить'),
    ),
  })

  document.addEventListener('fetchit:before', (e) => {
    const { formData, fetchit } = e.detail
    const result = v.safeParse(ContactSchema, Object.fromEntries(formData))
    if (result.success) {
      return
    }

    e.preventDefault()

    const errors = v.flatten(result.issues).nested ?? {}
    for (const [name, [message]] of Object.entries(errors)) {
      fetchit.setError(name, message)
    }

    fetchit.getFields(Object.keys(errors)[0])[0]?.focus()
  })
</script>
```

- `Object.fromEntries(formData)` собирает поля в объект. Лишние поля — служебные поля FetchIt и защиты — `v.object` пропускает.
- Неотмеченного чекбокса в `formData` нет вовсе. `v.optional(v.string(), '')` подставляет вместо него пустую строку, и `v.value` выводит своё сообщение. Без `optional` Valibot ответил бы служебным текстом об отсутствующем ключе.
- `v.flatten` раскладывает ошибки по именам полей. Для каждого поля берётся первое сообщение.
- Модуль выполняется отложенно, как `defer`, поэтому `DOMContentLoaded` не нужен: обработчик появится раньше, чем посетитель успеет отправить форму.

## Проверка на сервере

Клиентская проверка только помогает посетителю. Те же правила нужны на сервере — в FormIt или в своём сниппете:

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &hooks=`email`
  &validate=`name:required:minLength=^2^,email:required:email,agree:required`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'validate' => 'name:required:minLength=^2^,email:required:email,agree:required',
]}
```

:::

Валидаторы FormIt: [документация FormIt](https://docs.modx.com/3.x/en/extras/formit/formit.validators).
