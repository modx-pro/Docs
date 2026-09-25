---
title: Класс FetchIt
description: "Статические свойства и методы FetchIt: forms, instances, Message, create, createNotifier, sanitizeHTML"
---

# Класс FetchIt

Глобальный класс объявлен в скрипте компонента. Плагин подключает файл в `<head>` с `defer`, чтобы не блокировать разбор страницы. Имя класса задаёт настройка `fetchit.frontend.js.classname`.

Типы для TypeScript: [`fetchit.d.ts`](/components/fetchit/frontend/typescript).

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

Экземпляры вызывают методы, если они есть: `before`, `after`, `success`, `error`, `reset`. Так подключают уведомления без правки ядра.

```js
FetchIt.Message = {
  before() {
    // Перед отправкой формы
  },
  after(message) {
    // Пришёл ответ FetchIt
  },
  success(message) {
    // Форма принята
  },
  error(message) {
    // Форма отклонена или не отправилась
  },
  reset() {
    // Форму сбросили
  },
}
```

`after`, `success` и `error` получают строку `message` из ответа сервера — пустую, если обрабатывающий сниппет сообщения не прислал. Хуки вызываются перед событием того же момента (кроме `reset`: он после `fetchit:reset`), так что отмена события их не отменяет. Исключение в хуке пишется в консоль с его именем и не мешает обработать ответ формы.

`FetchIt` появляется, когда отработал отложенный `fetchit.js`, поэтому `FetchIt.Message` задавайте из отложенного скрипта, подключённого после него, или по `DOMContentLoaded`.

Если включена настройка `fetchit.frontend.default.notifier`, а `Message` не задан, при первом `create()` подставятся [встроенные уведомления](/components/fetchit/examples/notifications/#встроенные-уведомления). Если в вашем `Message` нет ни `success`, ни `error`, они добавятся к нему.

Готовые примеры: [уведомления](/components/fetchit/examples/notifications/).

## FetchIt.createNotifier(options)

Встроенные уведомления как объект для `FetchIt.Message` — например, чтобы включить их без системной настройки или с другими параметрами:

```js
FetchIt.Message = FetchIt.createNotifier({ closeLabel: 'Закрыть', duration: 4000 })
```

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `closeLabel` | `Close` | Подпись кнопки закрытия |
| `duration` | `6000` | Сколько миллисекунд держится уведомление; `0` — пока не закроют |

## FetchIt.create(config)

Фабрика экземпляров. Inline-скрипт сниппета вызывает её для каждого набора форм на странице. Вручную нужно редко.

Если ни одна форма под конфиг не подошла, в консоли будет предупреждение.

## FetchIt.events

Имена событий (`before`, `success`, …). Удобно при наследовании.

## FetchIt.notify(hook, message)

Вызывает хук `FetchIt.Message`, если он есть. Исключение в хуке пишется в консоль.

## FetchIt.isResponse(value)

`true`, если значение похоже на ответ FetchIt: объект с булевым `success`. Так скрипт отличает ответ компонента от страницы с ошибкой PHP или ответа файрвола.

## FetchIt.sanitizeHTML(str)

Убирает HTML-теги из строки. Им пользуются `setError` и `setFormMessage`.

## FetchIt.hasErrorMessage(message)

`true`, если после очистки и trim сообщение непустое. Пустые и пробельные ошибки с сервера не рисуются на полях.

## FetchIt.tokenField / FetchIt.powField

Имена служебных полей [защиты от спама](/components/fetchit/protection): `fetchit_token` и `fetchit_pow`.

## FetchIt.defaultRequestErrorMessage

Запасной текст на случай, когда форма не отправилась (сеть недоступна, ответ пришёл не от FetchIt), а в конфиге формы сообщения нет — например, страница попала в кеш ещё до обновления компонента. Обычно посетитель видит `fetchit_err_request` из лексикона.

## Когда класс уже есть

Файловый скрипт с `defer` выполняется после разбора документа. К моменту вашего `defer`-файла `FetchIt` уже доступен, если тег идёт после скрипта компонента.

Инлайн без `defer`:

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log(typeof FetchIt)
})
```
