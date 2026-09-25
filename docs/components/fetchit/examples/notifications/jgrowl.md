---
title: jGrowl
description: Уведомления jGrowl для ответов FetchIt на сайте с jQuery
---

# jGrowl

[jGrowl](https://github.com/stanlemon/jGrowl) — плагин уведомлений для jQuery. Он шёл в составе AjaxForm, поэтому пригодится при [переходе с AjaxForm](/components/fetchit/migration-from-ajaxform), чтобы уведомления выглядели как раньше.

::: tip
jGrowl имеет смысл, только если jQuery на сайте уже есть. Для нового сайта хватит [встроенных уведомлений](/components/fetchit/examples/notifications/#vstroennye-uvedomleniya) или библиотеки без зависимостей.
:::

## Подключение

jQuery подключается раньше jGrowl:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.css">
<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/jgrowl@1/jquery.jgrowl.min.js" defer></script>
```

У jGrowl нет своих цветов для успеха и ошибки — задайте их темами:

```css
.jGrowl-notification.fetchit-success {
  background-color: #15803d;
}

.jGrowl-notification.fetchit-error {
  background-color: #b91c1c;
}
```

## FetchIt.Message

```js
document.addEventListener('DOMContentLoaded', () => {
  $.jGrowl.defaults.position = 'top-right'
  $.jGrowl.defaults.closerTemplate = '<div>Закрыть все</div>'

  const show = (type, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (!text) {
      return
    }

    $.jGrowl(text, {
      theme: `fetchit-${type}`,
      life: type === 'error' ? 8000 : 5000,
    })
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

Почему текст проходит через `sanitizeHTML` и зачем проверка на пустую строку — в [общем разделе](/components/fetchit/examples/notifications/#storonnie-biblioteki).
