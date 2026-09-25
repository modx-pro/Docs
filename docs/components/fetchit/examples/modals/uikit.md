---
title: Модальные окна UIkit
description: Форма FetchIt в модальном окне UIkit
---

# Модальные окна UIkit

Если сайт свёрстан на [UIkit](https://getuikit.com/), для формы подойдёт его [Modal](https://getuikit.com/docs/modal). Разметка полей — как в [форме на UIkit](/components/fetchit/examples/form/uikit), там же сказано, какой класс поставить в настройку `fetchit.frontend.input.invalid.class`.

## Форма в окне

::: code-group

```modx
<button class="uk-button uk-button-primary" type="button" uk-toggle="target: #callback">Заказать звонок</button>

<div id="callback" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
    <button class="uk-modal-close-default" type="button" uk-close aria-label="Закрыть"></button>
    <h2 class="uk-modal-title">Заказать звонок</h2>
    <form class="uk-form-stacked" action="[[~[[*id]]]]" method="post">
      <div class="uk-margin">
        <label class="uk-form-label" for="callback-name">Имя</label>
        <input class="uk-input" id="callback-name" type="text" name="name" value="[[+fi.name]]">
        <span class="uk-text-danger" data-error="name">[[+fi.error.name]]</span>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="callback-phone">Телефон</label>
        <input class="uk-input" id="callback-phone" type="tel" name="phone" value="[[+fi.phone]]">
        <span class="uk-text-danger" data-error="phone">[[+fi.error.phone]]</span>
      </div>
      <div class="uk-alert-danger" role="alert" data-validation-error style="display: none;"></div>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>
        <button class="uk-button uk-button-primary" type="submit">Отправить</button>
      </p>
    </form>
  </div>
</div>
```

```fenom
<button class="uk-button uk-button-primary" type="button" uk-toggle="target: #callback">Заказать звонок</button>

<div id="callback" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
    <button class="uk-modal-close-default" type="button" uk-close aria-label="Закрыть"></button>
    <h2 class="uk-modal-title">Заказать звонок</h2>
    <form class="uk-form-stacked" action="{$_modx->resource.id | url}" method="post">
      <div class="uk-margin">
        <label class="uk-form-label" for="callback-name">Имя</label>
        <input class="uk-input" id="callback-name" type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
        <span class="uk-text-danger" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="callback-phone">Телефон</label>
        <input class="uk-input" id="callback-phone" type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}">
        <span class="uk-text-danger" data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
      </div>
      <div class="uk-alert-danger" role="alert" data-validation-error style="display: none;"></div>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>
        <button class="uk-button uk-button-primary" type="submit">Отправить</button>
      </p>
    </form>
  </div>
</div>
```

:::

## Скрипт

```js
// Форма принята — закрыть окно
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.uk-modal')
  if (modal) {
    UIkit.modal(modal).hide()
  }
})

// Окно закрыли — сбросить форму, чтобы в следующий раз она была чистой
document.addEventListener('hidden', ({ target }) => {
  if (target.matches?.('.uk-modal')) {
    target.querySelector('form[data-fetchit]')?.reset()
  }
})
```

Событие `hidden` UIkit отправляет и для других компонентов — выпадающих меню, аккордеонов, — поэтому обработчик проверяет, что закрылось именно модальное окно.

## Окно с ответом

Для короткого ответа хватит встроенного диалога UIkit:

```js
document.addEventListener('fetchit:success', ({ detail: { response } }) => {
  const text = FetchIt.sanitizeHTML(response.message).trim()
  if (text) {
    UIkit.modal.alert(text.replace(/&/g, '&amp;').replace(/</g, '&lt;'))
  }
})
```

`UIkit.modal.alert()` выводит строку как HTML, поэтому символы `&` и `<` в тексте экранируются. Чтобы ответ не дублировался уведомлением, не задавайте `FetchIt.Message` и выключите настройку `fetchit.frontend.default.notifier`.
