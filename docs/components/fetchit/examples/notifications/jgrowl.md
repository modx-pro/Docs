---
title: jGrowl
description: Уведомления jGrowl для FetchIt через CDN и FetchIt.Message
---

# jGrowl

[jGrowl](https://github.com/stanlemon/jGrowl): jQuery-плагин для тостов. Раньше шёл в составе AjaxForm.

Библиотека требует jQuery.

## Подключение через CDN

Сначала jQuery, затем jGrowl. Для типов success/error задайте темы в CSS:

```html
<!-- jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.js" defer></script>

<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.css" rel="stylesheet">
<style>
  .custom-success { background: green; }
  .custom-error { background: red; }
</style>
```

Задайте [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage):

```js
document.addEventListener('DOMContentLoaded', () => {
  FetchIt.Message = {
    success(message) {
      $.jGrowl(message, { theme: 'custom-success' })
    },
    error(message) {
      $.jGrowl(message, { theme: 'custom-error' })
    },
  }
})
```

В отдельном файле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
FetchIt.Message = {
  success(message) {
    $.jGrowl(message, { theme: 'custom-success' })
  },
  error(message) {
    $.jGrowl(message, { theme: 'custom-error' })
  },
}
```

Без jQuery на сайте jGrowl не имеет смысла: подключайте его только если jQuery уже используется. Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
