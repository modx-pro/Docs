---
title: Notiflix.Notify
description: Уведомления Notiflix.Notify для FetchIt через CDN и FetchIt.Message
---

# Notiflix.Notify

[Notiflix](https://notiflix.github.io/) — набор UI-инструментов на чистом JS. Для тостов используйте модуль [Notify](https://notiflix.github.io/notify).

## Подключение через CDN

Скрипт и [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage) через ESM:

```html
<script type="module">
  import Notiflix from 'https://cdn.jsdelivr.net/npm/notiflix@3/+esm'

  document.addEventListener('DOMContentLoaded', () => {
    FetchIt.Message = {
      success(message) {
        Notiflix.Notify.success(message)
      },
      error(message) {
        Notiflix.Notify.failure(message)
      },
    }
  })
</script>
```

В отдельном модуле с `defer` (после скрипта FetchIt) обёртка `DOMContentLoaded` не нужна:

```js
import Notiflix from 'https://cdn.jsdelivr.net/npm/notiflix@3/+esm'

FetchIt.Message = {
  success(message) {
    Notiflix.Notify.success(message)
  },
  error(message) {
    Notiflix.Notify.failure(message)
  },
}
```

Блоки формы `[data-success]` и `[data-validation-error]` работают параллельно с тостами. Если нужны только они, `Message` можно не задавать. Селекторы: [документация](/components/fetchit/selectors).
