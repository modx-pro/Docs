---
title: Модальные окна
description: "Форма FetchIt в модальном окне и окно с ответом: dialog, popover, a11y-dialog, Bootstrap, UIkit, Fancybox, Micromodal.js"
---

# Модальные окна

Два частых сценария: форма живёт в модальном окне и закрывает его после успеха, или форма на странице, а после отправки открывается окно с ответом. В обоих случаях нужно событие [`fetchit:success`](/components/fetchit/frontend/events#fetchitsuccess).

## Без библиотек

- [`<dialog>`](/components/fetchit/examples/modals/dialog) — модальное окно, встроенное в браузер
- [popover](/components/fetchit/examples/modals/popover) — всплывающий блок для небольших форм, открывается без JavaScript

## Библиотеки

- [a11y-dialog](/components/fetchit/examples/modals/a11y-dialog) — 2 КБ, доступность по рекомендациям WAI-ARIA, без своих стилей
- [Micromodal.js](/components/fetchit/examples/modals/micromodaljs) — маленькая библиотека с доступными окнами
- [Bootstrap](/components/fetchit/examples/modals/bootstrap) — если сайт на Bootstrap
- [UIkit](/components/fetchit/examples/modals/uikit) — если сайт на UIkit
- [Fancybox](/components/fetchit/examples/modals/fancybox) — если Fancybox уже есть на сайте; нужна платная лицензия

Для окна с формой пригодится ещё одно правило: при закрытии окна вызывайте `form.reset()`. FetchIt снимет ошибки и сообщения, и в следующий раз посетитель увидит чистую форму.
