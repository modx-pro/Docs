---
title: Валидация с помощью Zod
description: "Клиентская проверка формы FetchIt схемой Zod 4 в событии fetchit:before"
---

# Валидация с помощью Zod

[Zod](https://zod.dev/) — самая популярная библиотека схем для JavaScript. Если Zod уже есть в проекте или команда к нему привыкла, те же схемы подойдут и для форм FetchIt. Для браузера у Zod 4 есть облегчённая сборка [`zod/mini`](https://zod.dev/packages/mini): правила в ней записываются функциями, а не цепочкой методов, зато в браузер приходит в несколько раз меньше кода.

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
  import * as z from 'https://cdn.jsdelivr.net/npm/zod@4/mini/+esm'

  const ContactSchema = z.object({
    name: z.string().check(
      z.trim(),
      z.minLength(1, 'Как к вам обращаться?'),
      z.minLength(2, 'Имя — от двух букв'),
    ),
    email: z.string().check(
      z.trim(),
      z.minLength(1, 'Укажите e-mail'),
      z.email('Похоже, в адресе опечатка'),
    ),
    agree: z.literal('1', 'Без согласия мы не сможем ответить'),
  })

  document.addEventListener('fetchit:before', (e) => {
    const { formData, fetchit } = e.detail
    const result = ContactSchema.safeParse(Object.fromEntries(formData))
    if (result.success) {
      return
    }

    e.preventDefault()

    const errors = z.flattenError(result.error).fieldErrors
    for (const [name, [message]] of Object.entries(errors)) {
      fetchit.setError(name, message)
    }

    fetchit.getFields(Object.keys(errors)[0])[0]?.focus()
  })
</script>
```

- Zod проверяет все правила поля и собирает все сообщения, поэтому порядок правил важен: для каждого поля выводится первое. Пустое имя получит «Как к вам обращаться?», а не «Имя — от двух букв».
- `z.flattenError(...).fieldErrors` раскладывает сообщения по именам полей.
- Неотмеченного чекбокса в `formData` нет, и `z.literal` сообщит об этом своим текстом.
- Лишние поля — служебные поля FetchIt и защиты — `z.object` пропускает.

Если на сайте обычный Zod, а не `zod/mini`, схема пишется цепочкой: `z.string().trim().min(2, 'Имя — от двух букв')`, а обработчик остаётся тем же.

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
