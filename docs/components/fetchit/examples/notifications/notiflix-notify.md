---
title: Notiflix.Notify
description: Тосты Notiflix.Notify для ответов FetchIt
---

# Notiflix.Notify

[Notiflix](https://notiflix.github.io/) — набор UI-модулей на чистом JS. Для тостов нужен модуль [Notify](https://notiflix.github.io/notify), стили он добавляет сам.

## Подключение и FetchIt.Message

Библиотека подключается как ES-модуль. Модули выполняются отложенно, как `defer`, поэтому `FetchIt` в них уже доступен и `DOMContentLoaded` не нужен:

```html
<script type="module">
  import Notiflix from 'https://cdn.jsdelivr.net/npm/notiflix@3/+esm'

  Notiflix.Notify.init({
    position: 'right-top',
    timeout: 5000,
    clickToClose: true,
    pauseOnHover: true,
  })

  const show = (message, display) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (text) {
      display(text)
    }
  }

  FetchIt.Message = {
    success: (message) => show(message, (text) => Notiflix.Notify.success(text)),
    error: (message) => show(message, (text) => Notiflix.Notify.failure(text)),
  }
</script>
```

Модуль должен стоять в HTML после скрипта FetchIt — плагин подключает его в `<head>`, так что достаточно разместить модуль ниже, например перед `</body>`.

Почему текст проходит через `sanitizeHTML` и зачем проверка на пустую строку — в [общем разделе](/components/fetchit/examples/notifications/#storonnie-biblioteki).

## Индикатор загрузки

У Notiflix есть и модуль [Loading](https://notiflix.github.io/loading) — затемнение страницы со спиннером на время отправки. Показывайте его по [`fetchit:before`](/components/fetchit/frontend/events#fetchitbefore), а убирайте по `fetchit:success` и `fetchit:error`:

```js
// В том же модуле, после import
document.addEventListener('fetchit:before', (e) => {
  if (!e.defaultPrevented) {
    Notiflix.Loading.circle()
  }
})

for (const name of ['fetchit:success', 'fetchit:error']) {
  document.addEventListener(name, () => Notiflix.Loading.remove())
}
```

`Notiflix` из `import` виден только внутри модуля, поэтому код идёт туда же. Подключайте модуль после клиентской валидации: если она отменит отправку, `e.defaultPrevented` уже будет `true`. Подробнее — в примере [индикатора отправки](/components/fetchit/examples/scenarios/loading).
