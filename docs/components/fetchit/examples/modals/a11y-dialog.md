---
title: Модальные окна a11y-dialog
description: Форма FetchIt в доступном модальном окне a11y-dialog
---

# Модальные окна a11y-dialog

[a11y-dialog](https://a11y-dialog.netlify.app/) — маленькая (около 2 КБ) библиотека модальных окон, сделанная по [рекомендациям WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Фокус не уходит из окна, `Esc` и клик по фону его закрывают, а после закрытия фокус возвращается на кнопку, которая окно открыла. Своих стилей у библиотеки нет — окно выглядит так, как вы его оформите.

## Подключение

```html
<script src="https://cdn.jsdelivr.net/npm/a11y-dialog@8/dist/a11y-dialog.min.js" defer></script>
```

## Форма в окне

::: code-group

```modx
<button type="button" data-a11y-dialog-show="callback">Заказать звонок</button>

<div class="dialog" id="callback" aria-labelledby="callback-title" aria-hidden="true">
  <div class="dialog__overlay" data-a11y-dialog-hide></div>
  <div class="dialog__content" role="document">
    <button type="button" class="dialog__close" data-a11y-dialog-hide aria-label="Закрыть">&times;</button>
    <h2 id="callback-title">Заказать звонок</h2>
    <form action="[[~[[*id]]]]" method="post">
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
    </form>
  </div>
</div>
```

```fenom
<button type="button" data-a11y-dialog-show="callback">Заказать звонок</button>

<div class="dialog" id="callback" aria-labelledby="callback-title" aria-hidden="true">
  <div class="dialog__overlay" data-a11y-dialog-hide></div>
  <div class="dialog__content" role="document">
    <button type="button" class="dialog__close" data-a11y-dialog-hide aria-label="Закрыть">&times;</button>
    <h2 id="callback-title">Заказать звонок</h2>
    <form action="{$_modx->resource.id | url}" method="post">
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
    </form>
  </div>
</div>
```

:::

## Скрипт

a11y-dialog может сам создать окна по атрибуту `data-a11y-dialog`, но тогда до экземпляра окна не добраться, и закрыть его из кода нельзя. Поэтому окна создаются вручную:

```js
const dialogs = new Map()

document.addEventListener('DOMContentLoaded', () => {
  for (const element of document.querySelectorAll('.dialog')) {
    dialogs.set(element, new A11yDialog(element))

    // Окно закрывают — сбросить форму, чтобы в следующий раз она была чистой
    element.addEventListener('hide', () => {
      element.querySelector('form[data-fetchit]')?.reset()
    })
  }
})

// Форма принята — закрыть её окно
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  dialogs.get(form.closest('.dialog'))?.hide()
})
```

Событие `hide` a11y-dialog отправляет на элемент окна, и наверх оно не всплывает, поэтому обработчик вешается на каждое окно.

## Оформление

Минимум стилей, без которых окно не спрячется и не встанет поверх страницы:

```css
.dialog {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog[aria-hidden='true'] {
  display: none;
}

.dialog__overlay {
  position: fixed;
  inset: 0;
  background: rgb(15 23 42 / 0.5);
}

.dialog__content {
  position: relative;
  width: min(100% - 2rem, 28rem);
  padding: 1.5rem;
  border-radius: 1rem;
  background: #fff;
}

.dialog__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}
```
