---
title: Модальные окна на dialog
description: Форма FetchIt во встроенном модальном окне браузера, без библиотек
---

# Модальные окна на `<dialog>`

Элемент [`<dialog>`](https://developer.mozilla.org/ru/docs/Web/HTML/Element/dialog) — модальное окно, встроенное в браузер. Фокус, закрытие по `Esc`, затемнение фона и блокировка остальной страницы для мыши и клавиатуры работают без библиотек.

## Форма в окне

::: code-group

```modx
<button type="button" data-dialog="callback">Заказать звонок</button>

<dialog class="modal" id="callback" aria-labelledby="callback-title">
  <form action="[[~[[*id]]]]" method="post">
    <h2 id="callback-title">Заказать звонок</h2>
    <label> Имя
      <input type="text" name="name" value="[[+fi.name]]" autocomplete="name">
      <span data-error="name">[[+fi.error.name]]</span>
    </label>
    <label> Телефон
      <input type="tel" name="phone" value="[[+fi.phone]]" autocomplete="tel">
      <span data-error="phone">[[+fi.error.phone]]</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Отправить</button>
    <button type="button" data-dialog-close>Отмена</button>
  </form>
</dialog>
```

```fenom
<button type="button" data-dialog="callback">Заказать звонок</button>

<dialog class="modal" id="callback" aria-labelledby="callback-title">
  <form action="{$_modx->resource.id | url}" method="post">
    <h2 id="callback-title">Заказать звонок</h2>
    <label> Имя
      <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}" autocomplete="name">
      <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
    </label>
    <label> Телефон
      <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}" autocomplete="tel">
      <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Отправить</button>
    <button type="button" data-dialog-close>Отмена</button>
  </form>
</dialog>
```

:::

::: warning
Не ставьте форме FetchIt `method="dialog"`: такая форма не отправляется, а только закрывает окно. Кнопке «Отмена» нужен `type="button"`, иначе она отправит форму.
:::

```js
// Открыть и закрыть окно кнопками
document.addEventListener('click', ({ target }) => {
  const opener = target.closest('[data-dialog]')
  if (opener) {
    document.getElementById(opener.dataset.dialog)?.showModal()
    return
  }

  target.closest('[data-dialog-close]')?.closest('dialog')?.close()
})

// Форма принята — закрыть окно
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  form.closest('dialog')?.close()
})

// Окно закрыли — сбросить форму. Событие close не всплывает, поэтому слушаем на погружении
document.addEventListener('close', ({ target }) => {
  if (target instanceof HTMLDialogElement) {
    target.querySelector('form[data-fetchit]')?.reset()
  }
}, true)
```

Сброс снимает ошибки и сообщения FetchIt ([`fetchit:reset`](/components/fetchit/frontend/events#fetchitreset)), так что при следующем открытии форма будет чистой.

## Оформление

Браузер рисует окно без стилей, но их немного:

```css
.modal {
  width: min(100% - 2rem, 28rem);
  padding: 1.5rem;
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 1.5rem 3rem rgb(0 0 0 / 0.2);
}

.modal::backdrop {
  background: rgb(15 23 42 / 0.5);
  backdrop-filter: blur(2px);
}

.modal[open] {
  animation: modal-in 0.2s ease-out;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
}
```

## Окно с ответом

Форма на странице, а после успеха открывается окно с текстом ответа:

```html
<dialog class="modal" id="thanks" aria-labelledby="thanks-title">
  <h2 id="thanks-title">Спасибо!</h2>
  <p data-thanks-text></p>
  <form method="dialog">
    <button>Хорошо</button>
  </form>
</dialog>
```

Здесь `method="dialog"` как раз к месту: это не форма FetchIt, а кнопка закрытия окна.

```js
document.addEventListener('fetchit:success', ({ detail: { response } }) => {
  const dialog = document.getElementById('thanks')
  dialog.querySelector('[data-thanks-text]').textContent = FetchIt.sanitizeHTML(response.message)
  dialog.showModal()
})
```

Чтобы ответ не дублировался уведомлением, не задавайте `FetchIt.Message` и выключите настройку `fetchit.frontend.default.notifier`.
