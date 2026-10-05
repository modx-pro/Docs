---
title: Всплывающая форма на popover
description: Форма FetchIt во всплывающем блоке на Popover API, без модального окна и без JavaScript для открытия
---

# Всплывающая форма на popover

Атрибут [`popover`](https://developer.mozilla.org/ru/docs/Web/API/Popover_API) превращает любой блок во всплывающий: он открывается кнопкой, закрывается по `Esc` и клику мимо — и всё это без строчки JavaScript. В отличие от [`<dialog>`](/components/fetchit/examples/modals/dialog), страница под ним остаётся доступной, поэтому popover удобен для небольших форм: «Перезвоните мне» у телефона в шапке, подписка, быстрый вопрос.

Popover работает во всех актуальных браузерах с 2024 года.

## Разметка

::: code-group

```modx
<button type="button" popovertarget="callback">Перезвоните мне</button>

<div id="callback" class="popup" popover>
  <form action="[[~[[*id]]]]" method="post">
    <label> Телефон
      <input type="tel" name="phone" value="[[+fi.phone]]" autocomplete="tel">
      <span data-error="phone">[[+fi.error.phone]]</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Жду звонка</button>
    <button type="button" popovertarget="callback" popovertargetaction="hide">Отмена</button>
  </form>
</div>
```

```fenom
<button type="button" popovertarget="callback">Перезвоните мне</button>

<div id="callback" class="popup" popover>
  <form action="{$_modx->resource.id | url}" method="post">
    <label> Телефон
      <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}" autocomplete="tel">
      <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Жду звонка</button>
    <button type="button" popovertarget="callback" popovertargetaction="hide">Отмена</button>
  </form>
</div>
```

:::

Кнопка с `popovertarget` открывает и закрывает блок сама. `popovertargetaction="hide"` делает из кнопки «Отмену»: она только закрывает.

## Скрипт

JavaScript нужен только для того, что браузер не знает о FetchIt: закрыть блок после успеха и сбросить форму при закрытии.

```js
// Форма принята — закрыть блок
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  form.closest('[popover]')?.hidePopover()
})

// Блок закрыли — сбросить форму. Событие toggle не всплывает, поэтому слушаем на погружении
document.addEventListener('toggle', ({ target, newState }) => {
  if (newState === 'closed' && target.matches?.('[popover]')) {
    target.querySelector('form[data-fetchit]')?.reset()
  }
}, true)
```

## Оформление

По умолчанию браузер ставит блок по центру экрана. Под кнопку в шапке его обычно ставят вручную или позиционированием по якорю, а здесь — просто в правый верхний угол:

```css
.popup {
  inset: 4.5rem 1rem auto auto;
  width: min(100% - 2rem, 22rem);
  margin: 0;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgb(15 23 42 / 0.15);
}

.popup:popover-open {
  animation: popup-in 0.15s ease-out;
}

@keyframes popup-in {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
}
```

::: tip
Если нужно, чтобы посетитель не мог работать со страницей, пока форма открыта, берите [`<dialog>`](/components/fetchit/examples/modals/dialog): он модальный, popover — нет.
:::
