---
title: Экземпляр класса FetchIt
description: Методы экземпляра: ошибки полей, сообщения формы, disable/enable
---

# Экземпляр класса FetchIt

Доступ: `FetchIt.instances.get(formElement)`. В событиях экземпляр лежит в `e.detail.fetchit`.

Свойства:

| Свойство | Описание |
| --- | --- |
| `form` | `HTMLFormElement` |
| `config` | Конфиг из `FetchIt.create()` (actionUrl, pageId, классы, clearFieldsOnSuccess) |

## clearErrors()

Снимает ошибки со всех полей.

```js
document.addEventListener('fetchit:after', (e) => {
  e.detail.fetchit.clearErrors()
})
```

## clearError(name)

Очищает ошибки одного поля. Возвращает `{ fields, errors, customErrors }`.

```js
const { fields, errors, customErrors } = fetchit.clearError('password')
```

## setError(name, message)

Помечает поле невалидным: классы, `aria-invalid`, текст в `[data-error]`. Сообщение проходит через `sanitizeHTML`. Пустая/пробельная строка игнорируется.

```js
document.addEventListener('fetchit:before', (e) => {
  const { formData, fetchit } = e.detail
  if (!formData.get('email')) {
    fetchit.setError('email', 'Укажите email')
    e.preventDefault()
  }
})
```

<!--@include: ./parts/validation.warning.md-->

## setFormMessage(type, message)

Показывает сообщение уровня формы.

- `type`: `'success'` → `[data-success]`, иначе → `[data-validation-error]`
- парный блок скрывается

```js
fetchit.setFormMessage('success', 'Готово')
fetchit.setFormMessage('validation', 'Проверьте поля')
```

## clearFormMessages()

Скрывает и очищает `[data-success]` и `[data-validation-error]`.

## disableFields() / enableFields()

На время запроса скрипт сам вызывает `disable` / `enable`. Можно вызвать вручную.

## getFields(name)

Массив полей с `name` или `name[]`.

## getErrors(name)

Элементы `[data-error="name"]` и `[data-error="name[]"]`.

## getCustomErrors(name)

Элементы `[data-custom="name"]`.
