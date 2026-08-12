---
title: События
description: fetchit:before, after, success, error, reset: cancelable и порядок
---

# События

События вешаются на `document`. В `detail` почти всегда есть `form` и `fetchit`. При ответе сервера добавляются `response` и `formData`.

Примеры в разделах [форм](/components/fetchit/examples/form/), [уведомлений](/components/fetchit/examples/notifications/), [модальных окон](/components/fetchit/examples/modals/), [валидации](/components/fetchit/examples/validation/).

| Событие | Cancelable | Когда |
| --- | --- | --- |
| `fetchit:before` | да | до `fetch`, после сборки FormData |
| `fetchit:after` | да | сразу после JSON-ответа, до разбора success/error |
| `fetchit:success` | нет | `response.success === true` |
| `fetchit:error` | да | `response.success === false`, до/во время показа полевых ошибок |
| `fetchit:reset` | нет | нативный `reset` формы |

Порядок на submit: `Message.before` → `fetchit:before` → запрос → `Message.after` → `fetchit:after` → при ошибке `Message.error` + `fetchit:error` + `setError` / `setFormMessage('validation')` → при успехе `setFormMessage('success')` + `Message.success` + `fetchit:success` → `grecaptcha.reset()` если есть → опционально `form.reset()`.

`preventDefault` на `fetchit:after` останавливает разбор success/error и полевые сообщения. У `fetchit:success` флаг `cancelable` не стоит. `preventDefault` на него не влияет.

## fetchit:before

Добавить поля или остановить отправку:

```js
document.addEventListener('fetchit:before', (e) => {
  const { formData, fetchit } = e.detail

  formData.set('utm_source', 'landing')

  if ((formData.get('name') || '').length < 3) {
    fetchit.setError('name', 'Слишком короткое имя')
    e.preventDefault()
  }
})
```

## fetchit:after

Любой ответ сервера:

```js
document.addEventListener('fetchit:after', (e) => {
  const { response } = e.detail
  console.log(response.success, response.message, response.data)
})
```

## fetchit:success

Успешная отправка. Удобно закрыть модальное окно или отправить метрику:

```js
document.addEventListener('fetchit:success', (e) => {
  const { form, response } = e.detail
  if (form.id === 'callback') {
    console.log(response.message)
  }
})
```

## fetchit:error

Ошибка валидации или логики сниппета. В `response.data` лежит карта поле → сообщение.

```js
document.addEventListener('fetchit:error', (e) => {
  const { response } = e.detail
  console.warn(response.data)
})
```

## fetchit:reset

Сброс формы (кнопка reset или `clearFieldsOnSuccess`). Скрыть кастомный UI поверх стандартной очистки.
