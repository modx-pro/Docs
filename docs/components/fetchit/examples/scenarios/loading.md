---
title: Индикатор отправки
description: Спиннер на кнопке и текст «Отправляем…», пока FetchIt отправляет форму
---

# Индикатор отправки

Пока идёт запрос, посетитель должен видеть, что форма отправляется, — иначе он нажмёт кнопку ещё раз или уйдёт со страницы.

## Только CSS

На время запроса FetchIt ставит атрибут `disabled` всем полям и кнопкам формы. Этого достаточно для спиннера без единой строки JavaScript:

```css
form[data-fetchit] [type="submit"]:disabled {
  position: relative;
  color: transparent;
  cursor: progress;
}

form[data-fetchit] [type="submit"]:disabled::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 1.25em;
  height: 1.25em;
  margin: auto;
  border: 2px solid var(--spinner-color, #fff);
  border-right-color: transparent;
  border-radius: 50%;
  animation: fetchit-spin 0.7s linear infinite;
}

@keyframes fetchit-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  form[data-fetchit] [type="submit"]:disabled::after {
    animation-duration: 2s;
  }
}
```

Атрибут `data-fetchit` сниппет добавляет каждой своей форме, так что правило не заденет другие формы сайта. Цвет спиннера задаёт переменная `--spinner-color` — для светлой кнопки поставьте тёмный.

::: tip
Если кнопка отключена в разметке, например до согласия с условиями, спиннер будет крутиться и на ней. Для такой кнопки подойдёт вариант ниже: он зависит не от `disabled`, а от событий.
:::

## Текст на кнопке

Вместо спиннера можно менять надпись: «Отправить» → «Отправляем…». Это другой вариант, а не дополнение: CSS из предыдущего раздела делает текст кнопки прозрачным, и новая надпись не будет видна. Текст для отправки задаётся атрибутом `data-loading`:

```html
<button type="submit" data-loading="Отправляем…">Отправить</button>
```

```js
document.addEventListener('fetchit:before', (e) => {
  if (e.defaultPrevented) {
    return
  }

  const { form } = e.detail
  form.setAttribute('aria-busy', 'true')

  const button = form.querySelector('[type="submit"][data-loading]')
  if (button) {
    button.dataset.text = button.textContent
    button.textContent = button.dataset.loading
  }
})

const done = ({ detail: { form } }) => {
  form.removeAttribute('aria-busy')

  const button = form.querySelector('[type="submit"][data-text]')
  if (button) {
    button.textContent = button.dataset.text
    delete button.dataset.text
  }
}

document.addEventListener('fetchit:success', done)
document.addEventListener('fetchit:error', done)
```

- `fetchit:error` приходит и тогда, когда запрос не дошёл до сервера, так что надпись вернётся в любом случае.
- `aria-busy` сообщает программам экранного доступа, что форма занята. По нему же удобно стилизовать форму: `form[aria-busy="true"] { opacity: 0.7 }`.

## Почему не FetchIt.Message.before

Хук [`FetchIt.Message.before`](/components/fetchit/frontend/class#fetchitmessage) кажется подходящим местом для спиннера, но он вызывается до события `fetchit:before`. Если клиентская [валидация](/components/fetchit/examples/validation/) отменит отправку, запроса не будет, и `after` не придёт, — спиннер останется крутиться.

В `fetchit:before` видно, отменил ли отправку кто-то раньше: `e.defaultPrevented`. Поэтому код индикатора подключайте после кода валидации — тогда её решение уже известно.
