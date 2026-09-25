---
title: Маска телефона
description: Маска ввода номера телефона Maska в форме FetchIt с проверкой полного номера
---

# Маска телефона

Маска подставляет скобки, пробелы и дефисы, пока посетитель набирает номер, и не даёт ввести лишнего. Пример на [Maska](https://beholdr.github.io/maska/) — небольшой библиотеке без зависимостей.

## Подключение

```html
<script src="https://cdn.jsdelivr.net/npm/maska@3/dist/cdn/maska.js" defer></script>
```

## Разметка

Шаблон маски задаётся атрибутом `data-maska`: `#` — любая цифра, остальное подставляется само.

::: code-group

```modx
<label> Телефон
  <input type="tel" name="phone" value="[[+fi.phone]]"
    data-maska="+7 (###) ###-##-##"
    placeholder="+7 (___) ___-__-__"
    autocomplete="tel" inputmode="tel">
  <span data-error="phone">[[+fi.error.phone]]</span>
</label>
```

```fenom
<label> Телефон
  <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}"
    data-maska="+7 (###) ###-##-##"
    placeholder="+7 (___) ___-__-__"
    autocomplete="tel" inputmode="tel">
  <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
</label>
```

:::

## Скрипт

```js
document.addEventListener('DOMContentLoaded', () => {
  new Maska.MaskInput('[data-maska]')
})

// Номер набран не до конца — не отправлять
document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail

  for (const input of form.querySelectorAll('[data-maska]')) {
    const mask = new Maska.Mask({ mask: input.dataset.maska })
    if (input.value && !mask.completed(input.value)) {
      fetchit.setError(input.name, 'Номер введён не полностью')
      e.preventDefault()
    }
  }
})
```

Пустое поле здесь пропускается: обязательность проверяет сервер или [валидация](/components/fetchit/examples/validation/) формы.

## Проверка на сервере

Номер по маске всегда одной длины — 18 символов, например `+7 (912) 345-67-89`. Этого хватает для проверки в FormIt:

::: code-group

```modx
[[!FetchIt?
  &form=`callback.tpl`
  &hooks=`email`
  &validate=`phone:required:minLength=^18^`
  &vTextMinLength=`Номер введён не полностью`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'callback.tpl',
  'hooks' => 'email',
  'validate' => 'phone:required:minLength=^18^',
  'vTextMinLength' => 'Номер введён не полностью',
]}
```

:::

## Только цифры

CRM и телефония часто ждут номер без оформления: `+79123456789`. Его можно отправить вместо того, что видит посетитель, — поле в форме не изменится:

```js
document.addEventListener('fetchit:before', (e) => {
  if (e.defaultPrevented) {
    return
  }

  const { form, formData } = e.detail
  for (const input of form.querySelectorAll('[data-maska]')) {
    const digits = input.value.replace(/\D/g, '')
    if (digits) {
      formData.set(input.name, '+' + digits)
    }
  }
})
```

Этот обработчик подключайте после проверки полноты номера. Проверку длины на сервере тогда поменяйте на `minLength=^12^`.
