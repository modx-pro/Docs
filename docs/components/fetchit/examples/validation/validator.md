---
title: Проверка телефона и e-mail с validator.js
description: "Проверка номера телефона и e-mail в форме FetchIt готовыми функциями validator.js"
---

# Проверка телефона и e-mail с validator.js

[validator.js](https://github.com/validatorjs/validator.js) — не схема, а набор готовых проверок строк: e-mail, телефон, URL, дата, номер банковской карты и ещё десятки других. Он пригодится там, где встроенной проверки браузера мало. Например, `type="email"` пропустит адрес `ivan@example` без домена первого уровня, а номер телефона браузер не проверяет вовсе.

<!--@include: ../../parts/validation.warning.md-->

## Подключение

```html
<script src="https://cdn.jsdelivr.net/npm/validator@13/validator.min.js" defer></script>
```

## Разметка

Какую проверку применить к полю, говорит атрибут `data-check`:

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]" data-check="email">
    <span data-error="email">[[+fi.error.email]]</span>
  </label>
  <label> Телефон
    <input type="tel" name="phone" value="[[+fi.phone]]" data-check="phone">
    <span data-error="phone">[[+fi.error.phone]]</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" novalidate>
  <label> E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}" data-check="email">
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>
  <label> Телефон
    <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}" data-check="phone">
    <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

:::

## Обработчик

```js
const checks = {
  email: {
    test: (value) => validator.isEmail(value),
    message: 'Похоже, в адресе опечатка',
  },
  phone: {
    // Скобки, пробелы и дефисы не мешают: проверяются только цифры и +
    test: (value) => validator.isMobilePhone(value.replace(/[\s()-]/g, ''), 'ru-RU'),
    message: 'Нужен мобильный номер, например +7 912 345-67-89',
  },
}

document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail
  let first = null

  for (const field of form.querySelectorAll('[data-check]')) {
    const check = checks[field.dataset.check]
    const value = field.value.trim()
    if (!check || !value || check.test(value)) {
      continue
    }

    fetchit.setError(field.name, check.message)
    first ??= field
  }

  if (first) {
    e.preventDefault()
    first.focus()
  }
})
```

- Пустые поля пропускаются: обязательность проверяет сервер или атрибут `required` вместе с [проверкой средствами браузера](/components/fetchit/examples/validation/native).
- `'ru-RU'` принимает номера вида `+79123456789`, `89123456789` и `9123456789`. Для других стран передайте их локаль, например `'kk-KZ'` или `'be-BY'`, или массив локалей. Без локали проверка примет номер любой страны.
- Новую проверку добавляет новый ключ в `checks` — например, `url` с `validator.isURL(value)` — и атрибут `data-check="url"` в разметке.

## Проверка на сервере

Клиентская проверка только помогает посетителю. На сервере FormIt проверит e-mail своим валидатором `email`, а телефон — регулярным выражением или своим валидатором:

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &hooks=`email`
  &validate=`email:required:email,phone:required:minLength=^10^`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'validate' => 'email:required:email,phone:required:minLength=^10^',
]}
```

:::

Валидаторы FormIt: [документация FormIt](https://docs.modx.com/3.x/en/extras/formit/formit.validators).
