---
title: FetchIt
description: Легковесная AJAX-отправка форм в MODX на Fetch API поверх FormIt или своего сниппета
logo: https://modstore.pro/assets/extras/fetchit/logo.png
author: GulomovCreative
modstore: https://modstore.pro/packages/utilities/fetchit
modx: https://extras.modx.com/package/fetchit
repository: https://github.com/GulomovCreative/FetchIt

items:
  - text: Быстрый старт
    link: quick-start
  - text: Сниппет FetchIt
    link: snippets/fetchit
  - text: Настройки компонента
    link: settings
  - text: Селекторы
    link: selectors
  - text: Миграция с AjaxForm
    link: migration-from-ajaxform
  - text: Обработка своим сниппетом
    link: snippets/custom
  - text: JS API
    items:
      - text: Класс FetchIt
        link: frontend/class
      - text: Экземпляр класса FetchIt
        link: frontend/instance
      - text: События
        link: frontend/events
  - text: Разметка форм
    link: examples/form/
    items:
      - text: Форма на Bootstrap
        link: examples/form/bootstrap
      - text: Форма на Bulma
        link: examples/form/bulma
      - text: Форма на UIkit
        link: examples/form/uikit
      - text: Форма на Fomantic-UI
        link: examples/form/fomantic
      - text: Форма на Pico.css
        link: examples/form/pico
      - text: Форма на Cirrus CSS
        link: examples/form/cirrus
      - text: Форма на turretcss
        link: examples/form/turretcss
      - text: Форма на Vanilla
        link: examples/form/vanilla
  - text: Всплывающие сообщения
    link: examples/notifications/
    items:
      - text: Notyf
        link: examples/notifications/notyf
      - text: SweetAlert2
        link: examples/notifications/sweetalert2
      - text: iziToast
        link: examples/notifications/izitoast
      - text: Notiflix.Notify
        link: examples/notifications/notiflix-notify
      - text: Notie
        link: examples/notifications/notie
      - text: Awesome Notifications
        link: examples/notifications/awesome-notifications
      - text: Toastify JS
        link: examples/notifications/toastifyjs
      - text: AlertifyJS
        link: examples/notifications/alertifyjs
      - text: PNotify
        link: examples/notifications/pnotify
      - text: toastr
        link: examples/notifications/toastr
      - text: jGrowl
        link: examples/notifications/jgrowl
      - text: NOTY
        link: examples/notifications/noty
  - text: Модальные окна
    link: examples/modals/
    items:
      - text: Модальные окна Bootstrap
        link: examples/modals/bootstrap
      - text: Модальные окна tingle.js
        link: examples/modals/tinglejs
      - text: Модальные окна Micromodal.js
        link: examples/modals/micromodaljs
  - text: Валидация
    link: examples/validation/
    items:
      - text: Валидация с помощью Iodine
        link: examples/validation/iodine
      - text: Валидация с помощью yup
        link: examples/validation/yup
---

# FetchIt

Компонент для MODX Revolution: отправка HTML-форм через Fetch API без перезагрузки страницы. По умолчанию крутит [FormIt](https://github.com/Sterc/FormIt). Можно подставить свой сниппет.

## Зачем

FormIt сам по себе отвечает обычным POST с перезагрузкой. FetchIt оставляет его (или ваш код) на сервере и добавляет клиентский слой: FormData, JSON-ответ, ошибки полей, опциональные тосты и события.

Рядом по задаче стоит [AjaxForm](https://github.com/modx-pro/AjaxForm). Серверная схема похожа. Отличия на фронте:

- нет обязательного jQuery и jquery-form;
- скрипт `fetchit.min.js` около 5 KB, подключается с `defer`;
- уведомления подключаете сами или включаете встроенный Notyf (`fetchit.frontend.default.notifier`).

## Установка

Через Менеджер пакетов:

- [modstore.pro](https://modstore.pro/packages/utilities/fetchit) ([как подключить репозиторий](https://modstore.pro/faq))
- [extras.modx.com](https://extras.modx.com/package/fetchit)

Либо соберите transport из [GitHub](https://github.com/GulomovCreative/FetchIt).

Дальше: [Быстрый старт](/components/fetchit/quick-start).
