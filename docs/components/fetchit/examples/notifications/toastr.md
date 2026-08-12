---
title: toastr
description: Уведомления toastr для FetchIt через CDN и FetchIt.Message
---

# toastr

[toastr](https://codeseven.github.io/toastr/): неблокирующие тосты. Библиотека требует jQuery.

:::warning Внимание!
Селекторы toastr и Bootstrap могут конфликтовать на одной странице.
:::

## Подключение через CDN

Сначала jQuery, затем toastr:

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.js" defer></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastr@2/build/toastr.min.css">
```

Задайте [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      toastr.success(message)
    },
    error(message) {
      toastr.error(message)
    },
  }
})
```

В отдельном файле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
FetchIt.Message = {
  success(message) {
    toastr.success(message)
  },
  error(message) {
    toastr.error(message)
  },
}
```

Без jQuery на сайте toastr не имеет смысла: подключайте его только если jQuery уже используется. Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
