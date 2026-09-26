---
title: Модальные окна Micromodal.js
description: Форма FetchIt в окне Micromodal.js
---

# Модальные окна Micromodal.js

[Micromodal.js](https://micromodal.vercel.app/) — маленькая библиотека для доступных модальных окон: сама переводит фокус в окно, закрывает его по `Esc` и клику по фону.

## Подключение

```html
<script src="https://cdn.jsdelivr.net/npm/micromodal@0.7/dist/micromodal.min.js" defer></script>
```

```js
document.addEventListener('DOMContentLoaded', () => {
  MicroModal.init({ disableScroll: true })
})
```

Стилей у библиотеки нет: возьмите готовые из [раздела Styling](https://micromodal.vercel.app/#styling) или напишите свои.

## Форма в окне

::: code-group

```modx
<button type="button" data-micromodal-trigger="callback">Заказать звонок</button>

<div class="modal" id="callback" aria-hidden="true">
  <div class="modal__overlay" tabindex="-1" data-micromodal-close>
    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="callback-title">
      <header class="modal__header">
        <h2 class="modal__title" id="callback-title">Заказать звонок</h2>
        <button type="button" class="modal__close" aria-label="Закрыть" data-micromodal-close></button>
      </header>
      <form action="[[~[[*id]]]]" method="post">
        <label> Имя
          <input type="text" name="name" value="[[+fi.name]]">
          <span data-error="name">[[+fi.error.name]]</span>
        </label>
        <label> Телефон
          <input type="tel" name="phone" value="[[+fi.phone]]">
          <span data-error="phone">[[+fi.error.phone]]</span>
        </label>
        <div role="alert" data-validation-error style="display: none;"></div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  </div>
</div>
```

```fenom
<button type="button" data-micromodal-trigger="callback">Заказать звонок</button>

<div class="modal" id="callback" aria-hidden="true">
  <div class="modal__overlay" tabindex="-1" data-micromodal-close>
    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="callback-title">
      <header class="modal__header">
        <h2 class="modal__title" id="callback-title">Заказать звонок</h2>
        <button type="button" class="modal__close" aria-label="Закрыть" data-micromodal-close></button>
      </header>
      <form action="{$_modx->resource.id | url}" method="post">
        <label> Имя
          <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
          <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
        </label>
        <label> Телефон
          <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}">
          <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
        </label>
        <div role="alert" data-validation-error style="display: none;"></div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  </div>
</div>
```

:::

## Закрытие после успеха

`MicroModal.close()` принимает `id` корневого элемента окна — того, у которого класс `modal`. Не ищите его по `[data-micromodal-close]`: этот атрибут стоит на фоне и кнопке, у них `id` нет.

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal[id]')
  if (modal) {
    MicroModal.close(modal.id)
  }
})
```

Чтобы при следующем открытии форма была чистой, сбросьте её, когда окно закрывают. Для этого есть параметр `onClose` — добавьте его в тот же вызов `MicroModal.init`, что выше, а не вызывайте `init` второй раз:

```js
MicroModal.init({
  disableScroll: true,
  onClose: (modal) => modal.querySelector('form[data-fetchit]')?.reset(),
})
```

Сброс формы снимает ошибки и сообщения FetchIt ([`fetchit:reset`](/components/fetchit/frontend/events#fetchitreset)).
