---
title: Модальные окна Bootstrap
description: Закрытие и открытие Bootstrap Modal после успешной отправки FetchIt
---

# Модальные окна Bootstrap

Кейсы с [Bootstrap Modal](https://getbootstrap.com/docs/5.3/components/modal/).

## Закрытие после успеха

Форма внутри модалки. Слушайте [`fetchit:success`](/components/fetchit/frontend/events#fetchitsuccess).

Если модальное окно создали в JS:

```js
const exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'))

document.addEventListener('fetchit:success', () => {
  exampleModal.hide()
})
```

Если модальное окно открыто через data-атрибуты Bootstrap:

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal')
  const modalInstance = bootstrap.Modal.getInstance(modal)

  if (!modalInstance) {
    return
  }

  modalInstance.hide()
})
```

::: warning
В Bootstrap 5.3 `bootstrap.Modal.getInstance()` иногда возвращает `null` для окон, открытых только через data-API. Обходной путь ниже.
:::

::: details Обход через кнопку dismiss

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal')
  if (!modal) {
    return
  }

  const closeBtn = modal.querySelector('[data-bs-dismiss="modal"]')
  if (!closeBtn) {
    return
  }

  closeBtn.click()
})
```

:::

## Открытие после успеха

Показать модальное окно и подставить `message` из ответа:

```js
document.addEventListener('fetchit:success', ({ detail: { response: { message } } }) => {
  const modal = bootstrap.Modal.getOrCreateInstance('#exampleModal')
  const body = modal._element.querySelector('.modal-body')
  body.textContent = message
  modal.show()
})
```

`textContent` безопаснее `innerHTML`: сообщение с сервера может содержать разметку, а `sanitizeHTML` здесь не вызывается.
