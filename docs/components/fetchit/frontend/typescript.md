---
title: TypeScript
description: "Типы FetchIt для сайтов на TypeScript: fetchit.d.ts, detail событий и экземпляры форм"
---

# TypeScript

Типы лежат в `assets/components/fetchit/js/fetchit.d.ts`. Скопируйте файл в проект или сошлитесь на него:

```ts
/// <reference path="../assets/components/fetchit/js/fetchit.d.ts" />

document.addEventListener('fetchit:error', event => {
  // response равен null, если ответа FetchIt нет: сеть, чужой ответ, капча без ответа
  if (event.detail.response === null) {
    console.error(event.detail.error)
  }
})

const form = document.querySelector('form')
if (form) {
  FetchIt.instances.get(form)?.setError('email', 'Проверьте адрес')
}
```

Файл описывает `FetchIt` и его статические члены, конфиг `FetchIt.create()`, экземпляр формы со всеми методами, `FetchIt.Message` и `detail` каждого события. Скрипт компонента проверяется по этому же файлу, так что типы и код не расходятся.

::: warning
Уберите своё объявление `FetchIt`, если оно было (`declare var FetchIt: any`): два объявления будут конфликтовать.
:::

## Что описано

| Тип | Что это |
| --- | --- |
| `FetchItStatic` | глобальный `FetchIt`: `forms`, `instances`, `Message`, `events`, `create()`, `createNotifier()` и остальное |
| `FetchItConfig` | конфиг формы, который сниппет передаёт в `FetchIt.create()` |
| `FetchItInstance` | экземпляр формы: `setError()`, `clearErrors()`, `setFormMessage()`, `getFields()` и другие |
| `FetchItResponse` | ответ сервера: `success`, `message`, `data` |
| `FetchItMessage` | хуки уведомлений `before`, `after`, `success`, `error`, `reset` |
| `FetchItNotifierOptions` | параметры `FetchIt.createNotifier()` |
| `FetchItBeforeDetail` и остальные `*Detail` | `detail` каждого события |

Карта событий добавлена в `DocumentEventMap`, поэтому `document.addEventListener('fetchit:success', …)` знает тип своего `event.detail` без приведения типов.
