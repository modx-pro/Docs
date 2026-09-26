---
title: Модальные окна Bootstrap
description: Форма FetchIt в Bootstrap Modal и окно с ответом после отправки
---

# Модальные окна Bootstrap

Сценарии с [Bootstrap Modal](https://getbootstrap.com/docs/5.3/components/modal/). Во всех примерах окно берётся через `bootstrap.Modal.getOrCreateInstance()`: он вернёт экземпляр, как бы окно ни открыли — кнопкой с `data-bs-toggle` или из JS.

## Форма в модальном окне

Окно закрывается после успешной отправки, а при следующем открытии форма чистая — без ошибок и сообщений с прошлого раза.

::: code-group

```modx
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#callback">
  Заказать звонок
</button>

<div class="modal fade" id="callback" tabindex="-1" aria-labelledby="callback-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <form class="modal-content" action="[[~[[*id]]]]" method="post">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="callback-title">Заказать звонок</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="callback-name" class="form-label">Имя</label>
          <input type="text" class="form-control" id="callback-name" name="name" value="[[+fi.name]]">
          <div class="invalid-feedback" data-error="name">[[+fi.error.name]]</div>
        </div>
        <div class="mb-3">
          <label for="callback-phone" class="form-label">Телефон</label>
          <input type="tel" class="form-control" id="callback-phone" name="phone" value="[[+fi.phone]]">
          <div class="invalid-feedback" data-error="phone">[[+fi.error.phone]]</div>
        </div>
        <div class="alert alert-danger mb-0" role="alert" data-validation-error style="display: none;"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="submit" class="btn btn-primary">Отправить</button>
      </div>
    </form>
  </div>
</div>
```

```fenom
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#callback">
  Заказать звонок
</button>

<div class="modal fade" id="callback" tabindex="-1" aria-labelledby="callback-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <form class="modal-content" action="{$_modx->resource.id | url}" method="post">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="callback-title">Заказать звонок</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="callback-name" class="form-label">Имя</label>
          <input type="text" class="form-control" id="callback-name" name="name" value="{$_modx->getPlaceholder('fi.name')}">
          <div class="invalid-feedback" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</div>
        </div>
        <div class="mb-3">
          <label for="callback-phone" class="form-label">Телефон</label>
          <input type="tel" class="form-control" id="callback-phone" name="phone" value="{$_modx->getPlaceholder('fi.phone')}">
          <div class="invalid-feedback" data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</div>
        </div>
        <div class="alert alert-danger mb-0" role="alert" data-validation-error style="display: none;"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        <button type="submit" class="btn btn-primary">Отправить</button>
      </div>
    </form>
  </div>
</div>
```

:::

Класс `is-invalid`, который Bootstrap ждёт на невалидном поле, FetchIt ставит по умолчанию (настройка `fetchit.frontend.input.invalid.class`), — подробнее в [форме на Bootstrap](/components/fetchit/examples/form/bootstrap). Блока `[data-success]` в окне нет: оно закроется, а об успехе скажет уведомление — если включены [встроенные уведомления](/components/fetchit/examples/notifications/#vstroennye-uvedomleniya) (по умолчанию выключены) или задан свой `FetchIt.Message`.

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal')
  if (modal) {
    bootstrap.Modal.getOrCreateInstance(modal).hide()
  }
})

// Закрыли окно — убрали ошибки и введённое, чтобы в следующий раз форма была чистой
document.addEventListener('hidden.bs.modal', ({ target }) => {
  target.querySelector('form[data-fetchit]')?.reset()
})
```

Сброс формы вызывает [`fetchit:reset`](/components/fetchit/frontend/events#fetchitreset): FetchIt сам снимет ошибки с полей и скроет сообщения.

## Окно с ответом

Форма на странице, а после успеха открывается окно с текстом ответа:

```html
<div class="modal fade" id="thanks" tabindex="-1" aria-labelledby="thanks-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="thanks-title">Спасибо!</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>
```

```js
document.addEventListener('fetchit:success', ({ detail: { response } }) => {
  const modal = document.getElementById('thanks')
  modal.querySelector('.modal-body').textContent = FetchIt.sanitizeHTML(response.message)
  bootstrap.Modal.getOrCreateInstance(modal).show()
})
```

`textContent` выводит сообщение как текст, а `sanitizeHTML` убирает из него теги, если они есть в лексиконе. Чтобы то же сообщение не дублировалось уведомлением, не задавайте `FetchIt.Message` и выключите настройку `fetchit.frontend.default.notifier`.
