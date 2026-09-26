---
title: Всплывающие сообщения
description: Встроенные уведомления FetchIt и подключение сторонних библиотек через FetchIt.Message
---

# Всплывающие сообщения

Ответы сервера можно показывать уведомлениями в углу страницы: встроенными или своими через [`FetchIt.Message`](/components/fetchit/frontend/class#fetchitmessage).

Блоки `[data-success]` и `[data-validation-error]` в форме работают отдельно от уведомлений ([селекторы](/components/fetchit/selectors)).

## Встроенные уведомления

Включает их настройка [`fetchit.frontend.default.notifier`](/components/fetchit/settings#fetchitfrontenddefaultnotifier). Сторонних библиотек они не требуют: всё в скрипте компонента.

Текст выводится как текст: теги из него убираются, HTML-сущности вроде `&amp;` остаются как есть.

- Программы экранного доступа читают уведомления из двух скрытых live-областей, которые есть на странице заранее: ошибку сразу (`role="alert"`), успех в свою очередь (`role="status"`).
- Уведомление закрывается кнопкой или само через 6 секунд. Пока на нём курсор или фокус, отсчёт стоит, а потом начинается заново. Если закрыть уведомление с клавиатуры, фокус перейдёт на соседнее уведомление или вернётся туда, откуда пришёл.
- Одновременно видно не больше трёх. Уведомление, на котором фокус, лишним не считается.

### Цвета

Стили подключаются первыми в `<head>`, с селекторами из одного класса. Они сильнее общих правил сайта для элементов (`button { … }`) и проигрывают любому правилу сайта с классом. Правила внутри `@layer` (например, в Tailwind 4) им проигрывают — для них проще поменять переменные.

По умолчанию это пастельные цвета Tailwind CSS 4, как в его алертах: фон из оттенка 100, рамка из 200, текст из 800. Там, где браузер понимает `oklch()`, они заданы точно, в остальных — в hex:

```css
.fetchit-toasts {
  --fetchit-toast-success-bg: oklch(96.2% 0.044 156.743);     /* green-100, #dcfce7 */
  --fetchit-toast-success-border: oklch(92.5% 0.084 155.995); /* green-200, #b9f8cf */
  --fetchit-toast-success-text: oklch(44.8% 0.119 151.328);   /* green-800, #016630 */
  --fetchit-toast-error-bg: oklch(93.6% 0.032 17.717);        /* red-100, #ffe2e2 */
  --fetchit-toast-error-border: oklch(88.5% 0.062 18.334);    /* red-200, #ffc9c9 */
  --fetchit-toast-error-text: oklch(44.4% 0.177 26.899);      /* red-800, #9f0712 */
}
```

На сайте с Tailwind 4 можно взять его переменные, например `--fetchit-toast-success-bg: var(--color-emerald-100)`.

::: warning
Если Content-Security-Policy запрещает встроенные стили (`style-src` без `'unsafe-inline'`), дайте скрипту FetchIt `nonce` — стили получат тот же. Иначе FetchIt предупредит в консоли, и уведомления придётся оформить самостоятельно.
:::

### Свои параметры

Свой `FetchIt.Message` важнее настройки. Если в нём нет ни `success`, ни `error` — например, только `reset`, — встроенные уведомления их добавят, если `FetchIt.Message` задан до `DOMContentLoaded`: прямо в отложенном скрипте, подключённом после `fetchit.js`.

Включить уведомления можно и из своего скрипта, с другой подписью кнопки или временем показа (`0` — «пока не закроют»):

```js
FetchIt.Message = FetchIt.createNotifier({ closeLabel: 'Закрыть', duration: 4000 })
```

::: warning
До FetchIt 4 настройка подключала библиотеку Notyf. Теперь её в пакете нет: стили для `.notyf__toast` и скрипты, которые вызывают `new Notyf()`, нужно поменять или подключить Notyf самостоятельно, как любую другую библиотеку ниже.
:::

## Сторонние библиотеки

- [Notyf](/components/fetchit/examples/notifications/notyf)
- [SweetAlert2](/components/fetchit/examples/notifications/sweetalert2)
- [Notiflix.Notify](/components/fetchit/examples/notifications/notiflix-notify)
- [Toastify JS](/components/fetchit/examples/notifications/toastifyjs)
- [Awesome Notifications](/components/fetchit/examples/notifications/awesome-notifications)
- [AlertifyJS](/components/fetchit/examples/notifications/alertifyjs)
- [jGrowl](/components/fetchit/examples/notifications/jgrowl) — если на сайте уже есть jQuery

Все примеры устроены одинаково, и так же подключается любая другая библиотека:

```js
document.addEventListener('DOMContentLoaded', () => {
  const show = (type, message) => {
    const text = FetchIt.sanitizeHTML(message).trim()
    if (!text) {
      return
    }

    // Вызов библиотеки: type — 'success' или 'error'
  }

  FetchIt.Message = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
  }
})
```

- **`DOMContentLoaded`.** Скрипт FetchIt подключается с `defer`, и класс `FetchIt` появляется только после разбора страницы. К `DOMContentLoaded` он уже есть — неважно, где стоит ваш код: в отдельном файле или прямо в шаблоне.
- **`sanitizeHTML`.** Большинство библиотек вставляет текст как HTML. Сообщение приходит с сервера, и в нём могут оказаться теги — например, из лексикона или из данных, которые ввёл посетитель. Встроенные уведомления теги убирают, в своих это тоже стоит делать.
- **Пустой текст.** Если обрабатывающий сниппет не прислал сообщения, хук получит пустую строку. Без проверки библиотека покажет пустое уведомление.

Свой `FetchIt.Message` с `success` или `error` заменяет встроенные уведомления целиком, даже если настройка `fetchit.frontend.default.notifier` включена.
