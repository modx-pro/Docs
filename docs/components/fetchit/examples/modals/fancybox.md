---
title: Модальные окна Fancybox
description: Форма FetchIt во всплывающем окне Fancybox
---

# Модальные окна Fancybox

[Fancybox](https://fancyapps.com/fancybox/) — галерея и всплывающие окна. Если Fancybox на сайте уже есть для фотографий, форму заявки можно открывать в нём же.

::: warning
Fancybox распространяется по коммерческой лицензии. Для сайта в продакшене нужна [платная лицензия](https://fancyapps.com/pricing/), бесплатно библиотеку можно использовать только при разработке. Если лицензии нет, возьмите окно на [`<dialog>`](/components/fetchit/examples/modals/dialog) или [a11y-dialog](/components/fetchit/examples/modals/a11y-dialog).
:::

## Подключение

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@6/dist/fancybox/fancybox.css">
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@6/dist/fancybox/fancybox.umd.js" defer></script>
```

## Форма в окне

Форма лежит на странице скрытой, а Fancybox показывает её по кнопке с `data-src`:

::: code-group

```modx
<button type="button" data-fancybox data-src="#callback">Заказать звонок</button>

<div id="callback" class="callback-popup" style="display: none;">
  <h2>Заказать звонок</h2>
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
```

```fenom
<button type="button" data-fancybox data-src="#callback">Заказать звонок</button>

<div id="callback" class="callback-popup" style="display: none;">
  <h2>Заказать звонок</h2>
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
```

:::

## Скрипт

```js
document.addEventListener('DOMContentLoaded', () => {
  Fancybox.bind('[data-fancybox]', {
    on: {
      // Окно закрывают — сбросить форму внутри, чтобы в следующий раз она была чистой
      close: (fancybox) => {
        fancybox.getSlide()?.el?.querySelector('form[data-fetchit]')?.reset()
      },
    },
  })
})

// Форма принята — закрыть окно
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  if (form.closest('.fancybox__container')) {
    Fancybox.close()
  }
})
```

- Пока окно открыто, Fancybox переносит форму в свою разметку, а при закрытии возвращает на место. FetchIt продолжает работать с ней как обычно: экземпляр привязан к самой форме, а не к её месту на странице.
- Проверка `.fancybox__container` не даёт закрыть окно, если принята другая форма страницы, а Fancybox в этот момент показывает, например, фотографию.
- Сброс формы снимает ошибки и сообщения FetchIt ([`fetchit:reset`](/components/fetchit/frontend/events#fetchitreset)).

## Окно с ответом

Fancybox покажет и готовый элемент — его передают в `html`. Текст ответа вставляйте через `textContent`, а не склейкой строк: так теги из сообщения не станут разметкой.

```js
document.addEventListener('fetchit:success', ({ detail: { response } }) => {
  const box = document.createElement('div')
  box.className = 'thanks-popup'
  box.innerHTML = '<h2>Спасибо!</h2><p></p>'
  box.querySelector('p').textContent = FetchIt.sanitizeHTML(response.message)

  Fancybox.show([{ html: box }])
})
```

Чтобы ответ не дублировался уведомлением, не задавайте `FetchIt.Message` и выключите настройку `fetchit.frontend.default.notifier`.
