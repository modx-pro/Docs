---
title: FetchIt
description: Легковесный компонент для обработки и отправки форм с помощью Fetch API
logo: https://modstore.pro/assets/extras/fetchit/logo-lg.png
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
      - text: SweetAlert2
        link: examples/notifications/sweetalert2
      - text: Notyf
        link: examples/notifications/notyf
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

Компонент MODX Revolution для отправки форм с помощью Fetch API.

## Введение

В **CMS/CMF MODX Revolution** есть компонент [FormIt](https://github.com/Sterc/FormIt), который реализует отправку и обработку форм, но он работает стандартным методом браузера, т.е. с перезагрузкой страницы. Но современный веб требователен и прогрессивным шагом является их обработка "на лету". Именно для этих задач нужен **FetchIt** который использует **FormIt**, но Вы сможете использовать и свой скрипт.

### Преимущества

Для таких целей есть компонент [AjaxForm](https://github.com/modx-pro/AjaxForm) (хоть **FetchIt** по серверной части практически 1 в 1), но у **FetchIt** есть ряд преимуществ:

### Никаких зависимостей

**FetchIt** не имеет никаких зависмостей, тогда как у **AjaxForm** их три: Большая библиотека [jquery](https://github.com/jquery/jquery) и плагины к нему [jquery-form](https://github.com/jquery-form/form/) и [jGrowl](https://github.com/stanlemon/jGrowl).

Если с последним особых проблем нет (можно переопределить методы для показа уведомлений), то с двумя другими сложнее.

### Современный код

Минифицированный скрипт весит 5 килобайт и сниппет регистрирует его с атрибутом `defer` тем самым не мешая загрузке страницы.

### Удобство

Встраивание вашей вёрстки, добавление всплывающих сообщений и модальных окон, это задачи которые Вы сможете решить очень просто.

## Установка

Компонент доступен бесплатно для установки через Менеджер пакетов из:

- Маркетплейса [modstore.pro](https://modstore.pro/packages/utilities/fetchit)
  - [Инструкция](https://modstore.pro/faq) по подключению данного репозитория
- Оффициального репозитория [modx.com](https://modx.com/extras/package/fetchit)

Или вы сможете собрать пакет из репозитория компонента на [GitHub](https://github.com/GulomovCreative/FetchIt)
