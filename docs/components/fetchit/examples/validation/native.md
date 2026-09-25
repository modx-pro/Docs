---
title: Валидация средствами браузера
description: "Проверка полей FetchIt атрибутами HTML и Constraint Validation API, без библиотек"
---

# Валидация средствами браузера

Браузер сам умеет проверять поля: `required`, `type="email"`, `minlength`, `pattern`, `min` и `max`. Обычно он показывает ошибки своими всплывающими подсказками, которые выглядят по-разному в каждом браузере и не подходят к дизайну. Здесь его проверка остаётся, а вывод ошибок берёт на себя FetchIt — в те же `[data-error]`, что и ошибки с сервера.

<!--@include: ../../parts/validation.warning.md-->

## Разметка

`novalidate` выключает подсказки браузера, но не саму проверку. Свой текст ошибки задаётся data-атрибутами — иначе будет стандартный текст браузера на языке его интерфейса.

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Имя
    <input type="text" name="name" value="[[+fi.name]]"
      required minlength="2"
      data-value-missing="Как к вам обращаться?"
      data-too-short="Имя — от двух букв">
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="[[+fi.email]]"
      required
      data-value-missing="Укажите e-mail"
      data-type-mismatch="Похоже, в адресе опечатка">
    <span data-error="email">[[+fi.error.email]]</span>
  </label>
  <label> Телефон
    <input type="tel" name="phone" value="[[+fi.phone]]"
      pattern="\+?[0-9\s\-\(\)]{10,20}"
      data-pattern-mismatch="Только цифры, пробелы, скобки и дефисы">
    <span data-error="phone">[[+fi.error.phone]]</span>
  </label>
  <label>
    <input type="checkbox" name="agree" value="1" required
      data-value-missing="Без согласия мы не сможем ответить">
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
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}"
      required minlength="2"
      data-value-missing="Как к вам обращаться?"
      data-too-short="Имя — от двух букв">
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>
  <label> E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}"
      required
      data-value-missing="Укажите e-mail"
      data-type-mismatch="Похоже, в адресе опечатка">
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>
  <label> Телефон
    <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}"
      pattern="\+?[0-9\s\-\(\)]{10,20}"
      data-pattern-mismatch="Только цифры, пробелы, скобки и дефисы">
    <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
  </label>
  <label>
    <input type="checkbox" name="agree" value="1" required
      data-value-missing="Без согласия мы не сможем ответить">
    Согласен на обработку персональных данных
  </label>
  <span data-error="agree">{$_modx->getPlaceholder('fi.error.agree')}</span>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

:::

## Обработчик

```js
const states = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'tooLong',
  'rangeUnderflow',
  'rangeOverflow',
]

// Свой текст из data-атрибута или стандартный текст браузера
const messageFor = (field) => {
  const state = states.find((name) => field.validity[name] && field.dataset[name])
  return state ? field.dataset[state] : field.validationMessage
}

document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail
  if (form.checkValidity()) {
    return
  }

  e.preventDefault()

  const invalid = fetchit.fields.filter((field) => field.name && !field.validity.valid)
  for (const field of invalid) {
    fetchit.setError(field.name.replace(/\[\]$/, ''), messageFor(field))
  }

  invalid[0]?.focus()
})
```

- `data-value-missing` в разметке превращается в `dataset.valueMissing`: браузер сам переводит имена из kebab-case в camelCase. Поэтому атрибуты называются так же, как свойства [`ValidityState`](https://developer.mozilla.org/ru/docs/Web/API/ValidityState), и одного списка `states` хватает на всё.
- `minlength` и `maxlength` браузер проверяет, только если посетитель сам редактировал поле. Значение, которое подставил FormIt после отправки без JavaScript, так не проверяется — его проверит сервер.
- Фокус уходит на первое поле с ошибкой: посетитель сразу видит, что исправить, а программа экранного доступа зачитает поле вместе с его `aria-invalid`.
- Когда посетитель начинает править поле, FetchIt сам снимает с него ошибку.

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
