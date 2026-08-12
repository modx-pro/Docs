---
title: Notyf
description: Уведомления Notyf для FetchIt: системная настройка или ручной CDN
---

# Notyf

[Notyf](https://carlosroso.com/notyf/): лёгкие тосты на чистом JS. В FetchIt два пути.

## Через настройку компонента

Включите `fetchit.frontend.default.notifier`. Плагин подключит CSS/JS Notyf из `assets/components/fetchit/lib/` и при первом `FetchIt.create()` выставит `FetchIt.Message`, если вы сами его ещё не определили.

Дополнительный CDN и ручной `FetchIt.Message` тогда не нужны: иначе получите два набора скриптов.

## Вручную через CDN

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
