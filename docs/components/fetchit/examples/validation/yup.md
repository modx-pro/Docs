---
title: Валидация с помощью yup
description: Клиентская валидация FetchIt через yup и событие fetchit:before
---

# Валидация с помощью yup

Проверка полей до отправки через [yup](https://github.com/jquense/yup) и [`fetchit:before`](/components/fetchit/frontend/events#fetchitbefore). Пример: имя и возраст.

<!--@include: ../../parts/validation.warning.md-->

## Разметка

`novalidate` отключает проверку браузера. Для AJAX добавьте `[data-success]` и `[data-validation-error]`.

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" novalidate>
  <label> Имя
    <input type="text" name="name" value="[[+fi.name]]" />
    <span data-error="name">[[+fi.error.name]]</span>
  </label>
  <label> Возраст
    <input type="text" name="age" value="[[+fi.age]]" />
    <span data-error="age">[[+fi.error.age]]</span>
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
  <label> Возраст
    <input type="text" name="age" value="{$_modx->getPlaceholder('fi.age')}" />
    <span data-error="age">{$_modx->getPlaceholder('fi.error.age')}</span>
  </label>
  <div role="alert" data-success style="display: none;"></div>
  <div role="alert" data-validation-error style="display: none;"></div>
  <button type="submit">Отправить</button>
</form>
```

:::

## Подключение

ESM с CDN:

```html
<script type="module">
  import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm'
</script>
```

## Обработчик

Схема yup, `validateSync` с `abortEarly: false`, ошибки в `setError`. Опционально тост через `FetchIt.Message` ([уведомления](/components/fetchit/examples/notifications/)):

```html
<script type="module">
  import * as yup from 'https://cdn.jsdelivr.net/npm/yup@1/+esm'

  document.addEventListener('fetchit:before', (e) => {
    const { formData, fetchit } = e.detail
    const fields = Object.fromEntries(formData.entries())

    const formSchema = yup.object({
      name: yup
        .string()
        .required('Введите своё имя'),
      age: yup
        .number()
        .required('Введите свой возраст')
        .min(18, 'Вам должно быть 18 лет')
        .integer()
        .typeError('Поле должно быть числом'),
    })

    try {
      formSchema.validateSync(fields, { abortEarly: false })
    } catch (err) {
      e.preventDefault()

      for (const { path, message } of err.inner) {
        fetchit.setError(path, message)
      }

      FetchIt.Message?.error?.('Исправьте ошибки в форме')
    }
  })
</script>
```

::: details Локализация сообщений yup
Тексты ошибок можно задать в схеме (как выше) или через API локализации yup. Подробнее: [error message customization](https://github.com/jquense/yup#error-message-customization).
:::

Дублируйте правила на сервере в FormIt:

::: code-group

```modx
[[!FetchIt?
  &form=`form.tpl`
  &hooks=`email,FormItSaveForm`
  &validate=`name:required,age:required:isNumber:minValue=^18^`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'form.tpl',
  'hooks' => 'email,FormItSaveForm',
  'validate' => 'name:required,age:required:isNumber:minValue=^18^',
]}
```

:::

Валидаторы FormIt: [документация FormIt](https://docs.modx.com/3.x/en/extras/formit/formit.validators).
