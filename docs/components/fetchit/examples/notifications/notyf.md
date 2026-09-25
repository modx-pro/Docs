---
title: Notyf
description: "Уведомления Notyf для FetchIt: подключение через CDN и FetchIt.Message"
---

# Notyf

[Notyf](https://carlosroso.com/notyf/): лёгкие тосты на чистом JS.

::: warning
До FetchIt 4 библиотека ехала в пакете и включалась настройкой `fetchit.frontend.default.notifier`. Теперь эта настройка показывает [встроенные уведомления](/components/fetchit/examples/notifications/#встроенные-уведомления), а Notyf подключается как любая другая сторонняя библиотека — вручную.
:::

## Через CDN

Подключите библиотеку сами и задайте `FetchIt.Message`:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css">
<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js" defer></script>
```

```js
document.addEventListener('DOMContentLoaded', () => {
  const notyf = new Notyf()

  FetchIt.Message = {
    success(message) {
      notyf.success(message)
    },
    error(message) {
      notyf.error(message)
    },
  }
})
```

В отдельном файле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
const notyf = new Notyf()

FetchIt.Message = {
  success(message) {
    notyf.success(message)
  },
  error(message) {
    notyf.error(message)
  },
}
```

Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
