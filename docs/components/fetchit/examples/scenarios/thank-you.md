---
title: Благодарность вместо формы
description: Заменить форму FetchIt блоком «Спасибо» после успешной отправки
---

# Благодарность вместо формы

Вместо уведомления в углу форма уступает место блоку «Спасибо» — заметно и понятно, что всё получилось. Кнопка «Отправить ещё» возвращает форму.

## Разметка

Форма и блок благодарности лежат в общей обёртке:

::: code-group

```modx
<div class="callback">
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
    <button type="submit">Перезвоните мне</button>
  </form>

  <div class="callback__thanks" data-thanks tabindex="-1" hidden>
    <h3>Спасибо!</h3>
    <p data-thanks-text></p>
    <button type="button" data-thanks-again>Отправить ещё одну заявку</button>
  </div>
</div>
```

```fenom
<div class="callback">
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
    <button type="submit">Перезвоните мне</button>
  </form>

  <div class="callback__thanks" data-thanks tabindex="-1" hidden>
    <h3>Спасибо!</h3>
    <p data-thanks-text></p>
    <button type="button" data-thanks-again>Отправить ещё одну заявку</button>
  </div>
</div>
```

:::

## Скрипт

```js
document.addEventListener('fetchit:success', ({ detail: { form, response } }) => {
  const thanks = form.parentElement.querySelector('[data-thanks]')
  if (!thanks) {
    return
  }

  thanks.querySelector('[data-thanks-text]').textContent = FetchIt.sanitizeHTML(response.message)
  form.hidden = true
  thanks.hidden = false
  thanks.focus()
})

document.addEventListener('click', ({ target }) => {
  const again = target.closest('[data-thanks-again]')
  if (!again) {
    return
  }

  const thanks = again.closest('[data-thanks]')
  const form = thanks.parentElement.querySelector('form')
  thanks.hidden = true
  form.hidden = false
  form.querySelector('input, select, textarea')?.focus()
})
```

- Фокус переходит на блок благодарности: кнопка «Отправить» пропала, и без этого фокус потерялся бы. Программа экранного доступа прочитает текст благодарности.
- После успеха FetchIt сам очищает поля, поэтому вернувшаяся форма уже пустая.
- Форма без блока `[data-thanks]` рядом работает как обычно: скрипт её пропускает.

## Оформление

Небольшое появление, чтобы смена блоков не была резкой:

```css
.callback__thanks {
  padding: 2rem;
  border-radius: 1rem;
  background: #f0fdf4;
  text-align: center;
  animation: thanks-in 0.3s ease-out;
}

.callback__thanks:focus {
  outline: none;
}

@keyframes thanks-in {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
}
```

Чтобы благодарность не дублировалась уведомлением, не задавайте `FetchIt.Message` и выключите настройку `fetchit.frontend.default.notifier`.
