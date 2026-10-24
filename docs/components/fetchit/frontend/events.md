---
title: События
description: "fetchit:before, after, success, error, reset: detail, отмена и порядок"
---

# События

События приходят на `document` и не всплывают: слушайте их на `document`, а не на форме или `window`.

В `event.detail` лежат форма (`form`), её данные (`formData`) и экземпляр FetchIt (`fetchit`), а начиная с `fetchit:after` — ещё и ответ сервера (`response`). У `fetchit:reset` только `form` и `fetchit`.

Типы `detail` для TypeScript: [`fetchit.d.ts`](/components/fetchit/frontend/typescript). Примеры в разделах [форм](/components/fetchit/examples/form/), [уведомлений](/components/fetchit/examples/notifications/), [модальных окон](/components/fetchit/examples/modals/), [валидации](/components/fetchit/examples/validation/).

| Событие | Когда | Отмена (`event.preventDefault()`) |
| --- | --- | --- |
| `fetchit:before` | перед отправкой, в `formData` можно дописать поля | форма не отправляется |
| `fetchit:after` | пришёл ответ FetchIt | ответ не обрабатывается: ни ошибок полей, ни сообщения, ни `fetchit:success` и `fetchit:error`, ни очистки |
| `fetchit:success` | форма принята; сообщение формы и уведомление уже показаны | поля не очищаются |
| `fetchit:error` | форма отклонена или не отправилась | ошибки полей и сообщение формы не выводятся |
| `fetchit:reset` | форму сбрасывают: кнопкой, `form.reset()` или после успеха; значения полей ещё прежние | нельзя |

Порядок на submit: `Message.before` → `fetchit:before` → запрос → `Message.after` → `fetchit:after` → при ошибке `Message.error` + `fetchit:error` + `setError` / `setFormMessage('validation')` → при успехе `setFormMessage('success')` + `Message.success` + `fetchit:success` → `grecaptcha.reset()`, если виджет на странице есть → при `clearFieldsOnSuccess` сброс формы.

Хуки `FetchIt.Message` вызываются перед событием того же момента, поэтому отмена события их не отменяет.

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

Любой ответ FetchIt:

```js
document.addEventListener('fetchit:after', (e) => {
  const { response } = e.detail
  console.log(response.success, response.message, response.data)
})
```

`message` и `data` есть всегда, даже если обрабатывающий сниппет их не прислал: пустая строка и пустой объект.

## fetchit:success

Успешная отправка. Удобно закрыть модальное окно или отправить метрику:

```js
document.addEventListener('fetchit:success', (e) => {
  const { form, response } = e.detail
  if (form.id === 'callback') {
    ym(12345678, 'reachGoal', 'form_' + form.id)
  }
})
```

Отмена события оставляет поля заполненными.

## fetchit:error

Ошибка валидации, отказ [защиты](/components/fetchit/protection), ошибка логики сниппета — или запрос, который не дошёл. В `response.data` лежит карта «поле → сообщение».

```js
document.addEventListener('fetchit:error', (e) => {
  const { response, error } = e.detail

  if (response === null) {
    // Ответа FetchIt нет: сеть, чужой ответ, капча без ответа
    console.error(error)
    return
  }

  console.warn(response.data)
})
```

## fetchit:reset

Сброс формы: кнопка reset, `form.reset()` или очистка после успеха. Значения полей в этот момент ещё прежние, так что их можно прочитать. Скрыть свой UI поверх стандартной очистки — тоже здесь.
