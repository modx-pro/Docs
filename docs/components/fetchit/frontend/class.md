---
title: Класс FetchIt
description: "Статические свойства FetchIt: forms, instances, Message, create, sanitizeHTML"
---

# Класс FetchIt

Глобальный класс объявлен в скрипте компонента. Плагин вешает файл в `<head>` с `defer`, чтобы не блокировать разбор страницы (около 5 KB в `fetchit.min.js`).

## FetchIt.forms

- Тип: `HTMLFormElement[]`

Все формы, для которых создан экземпляр.

## FetchIt.instances

- Тип: `Map`

Ключ: элемент формы, значение: экземпляр.

```js
const form = document.querySelector('#form')
const fetchit = FetchIt.instances.get(form)
```

## FetchIt.Message

- Тип: `object` (не объявлен по умолчанию)

Экземпляры вызывают методы, если они есть: `before`, `success`, `error`, `after`, `reset`. Так подключают тосты без правки ядра.

```js
FetchIt.Message = {
  before() {
    // Показать сообщение до отправки формы
  },
  success(message) {
    // Показать сообщение в случае успешной отправки
  },
  error(message) {
    // Показать сообщение в случае ошибки при отправке
  },
  after(message) {
    // Показать сообщение в любом случае
  },
  reset() {
    // Показать сообщение после сбрасывания данных формы
  },
}
```

`success`, `error` и `after` получают строку `message` из ответа сервера.

Если включён `fetchit.frontend.default.notifier` и вы ещё не задали `Message`, при первом `create()` подставится обёртка над Notyf из пакета.

Готовые примеры: [уведомления](/components/fetchit/examples/notifications/).

## FetchIt.sanitizeHTML(str)

Убирает HTML-теги из строки. Им пользуются `setError` и `setFormMessage`.

## FetchIt.hasErrorMessage(message)

`true`, если после очистки и trim сообщение непустое. Пустые и пробельные ошибки с сервера не рисуются на полях.

## FetchIt.create(config)

Фабрика экземпляров. Inline-скрипт сниппета вызывает её для каждой формы на странице. Вручную нужно редко.

## FetchIt.events

Имена событий (`before`, `success`, …). Удобно при наследовании.

## Когда класс уже есть

Файловый скрипт с `defer` выполняется после разбора документа. К моменту вашего `defer`-файла `FetchIt` уже доступен, если тег идёт после скрипта компонента.

Инлайн без `defer`:

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log(typeof FetchIt)
})
```
