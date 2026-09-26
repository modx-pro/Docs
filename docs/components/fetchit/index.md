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
  - text: Защита от спама
    link: protection
  - text: Настройки компонента
    link: settings
  - text: Селекторы
    link: selectors
  - text: Переход на FetchIt 4
    link: upgrade
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
      - text: TypeScript
        link: frontend/typescript
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
      - text: Форма на Vanilla
        link: examples/form/vanilla
  - text: Готовые сценарии
    link: examples/scenarios/
    items:
      - text: Индикатор отправки
        link: examples/scenarios/loading
      - text: Благодарность вместо формы
        link: examples/scenarios/thank-you
      - text: Переход на другую страницу
        link: examples/scenarios/redirect
      - text: Маска телефона
        link: examples/scenarios/phone-mask
      - text: Загрузка файлов
        link: examples/scenarios/files
      - text: Несколько форм на странице
        link: examples/scenarios/multiple-forms
      - text: Цели в Метрике и Google Analytics
        link: examples/scenarios/analytics
      - text: Заявка в Telegram
        link: examples/scenarios/telegram
  - text: Всплывающие сообщения
    link: examples/notifications/
    items:
      - text: Notyf
        link: examples/notifications/notyf
      - text: SweetAlert2
        link: examples/notifications/sweetalert2
      - text: Notiflix.Notify
        link: examples/notifications/notiflix-notify
      - text: Toastify JS
        link: examples/notifications/toastifyjs
      - text: Awesome Notifications
        link: examples/notifications/awesome-notifications
      - text: AlertifyJS
        link: examples/notifications/alertifyjs
      - text: jGrowl
        link: examples/notifications/jgrowl
  - text: Модальные окна
    link: examples/modals/
    items:
      - text: Модальные окна на dialog
        link: examples/modals/dialog
      - text: Всплывающая форма на popover
        link: examples/modals/popover
      - text: Модальные окна a11y-dialog
        link: examples/modals/a11y-dialog
      - text: Модальные окна Micromodal.js
        link: examples/modals/micromodaljs
      - text: Модальные окна Bootstrap
        link: examples/modals/bootstrap
      - text: Модальные окна UIkit
        link: examples/modals/uikit
      - text: Модальные окна Fancybox
        link: examples/modals/fancybox
  - text: Валидация
    link: examples/validation/
    items:
      - text: Средствами браузера
        link: examples/validation/native
      - text: Валидация с помощью Zod
        link: examples/validation/zod
      - text: Валидация с помощью Valibot
        link: examples/validation/valibot
      - text: Валидация с помощью yup
        link: examples/validation/yup
      - text: Телефон и e-mail с validator.js
        link: examples/validation/validator
---

# FetchIt

Компонент для MODX Revolution 2 и 3: отправка HTML-форм через Fetch API без перезагрузки страницы, с защитой от спама из коробки. По умолчанию формы обрабатывает [FormIt](https://github.com/Sterc/FormIt), но можно подставить свой сниппет.

## Зачем

FormIt сам по себе отвечает обычным POST с перезагрузкой. FetchIt оставляет его (или ваш код) на сервере и добавляет клиентский слой: FormData, JSON-ответ, ошибки полей, уведомления и события. А заодно закрывает формы от ботов, для чего обычно ставят отдельный компонент.

Рядом по задаче стоит [AjaxForm](https://github.com/modx-pro/AjaxForm). Серверная схема похожа. Отличия:

- нет обязательного jQuery и jquery-form: только нативные Fetch API и `FormData`, скрипт подключается с `defer`;
- [защита от спама](/components/fetchit/protection) работает сразу после установки, без настройки;
- уведомления встроенные или свои — через `FetchIt.Message`.

## Возможности

- **FormIt из коробки.** Параметры вроде `&hooks`, `&validate`, `&emailTo` передаются в FormIt как есть. Вместо FormIt можно указать [свой сниппет](/components/fetchit/snippets/custom).
- **Своя вёрстка.** Нужны только чанк формы и [атрибуты](/components/fetchit/selectors): `data-error` у ошибок полей, `data-success` и `data-validation-error` у сообщений формы.
- **Работает и без JavaScript.** С FormIt форма отправляется обычным способом, сообщения и введённые значения выводятся его плейсхолдерами. Исключение — proof-of-work и капча: им нужен JavaScript.
- **[Защита от спама](/components/fetchit/protection) по умолчанию:** одноразовый подписанный токен, минимальное время заполнения, скрытое поле-ловушка и лимит отправок. По желанию proof-of-work и капча — Cloudflare Turnstile, Google reCAPTCHA v3 или Яндекс SmartCaptcha. Свои правила добавляются плагином.
- **Никаких зависимостей.** Кроме скрипта сервиса капчи, если она включена, других файлов скрипт не грузит.
- **[Встроенные уведомления](/components/fetchit/examples/notifications/#vstroennye-uvedomleniya)** или свои через `FetchIt.Message`: Bootstrap, SweetAlert2, что угодно.
- **[События](/components/fetchit/frontend/events)** `fetchit:before`, `fetchit:after`, `fetchit:success`, `fetchit:error`, `fetchit:reset`: дополнить данные, отменить отправку, показать модалку.
- **[Типы для TypeScript](/components/fetchit/frontend/typescript)** лежат рядом со скриптом.
- **Несколько форм на странице**, каждая со своим ключом и обработчиком, если вызовы сниппета различаются параметрами.
- **Fenom и `@FILE`-чанки** через pdoTools на MODX 2 и MODX 3.

## Установка

Через Менеджер пакетов:

- [modstore.pro](https://modstore.pro/packages/utilities/fetchit) ([как подключить репозиторий](https://modstore.pro/faq))
- [extras.modx.com](https://extras.modx.com/package/fetchit)

Либо соберите transport из [GitHub](https://github.com/GulomovCreative/FetchIt).

FetchIt 4 — один пакет для MODX 2.8 и MODX 3 вместо линий 1.x и 3.x. Он ставится поверх установленной версии: системные настройки и чанки остаются как есть. Что может задеть ваш код: [Переход на FetchIt 4](/components/fetchit/upgrade).

FormIt ставится вместе с FetchIt, если его на сайте ещё нет.

Дальше: [Быстрый старт](/components/fetchit/quick-start).

## Требования

- MODX Revolution 2.8+ или 3.x.
- PHP 7.4 и новее.
- FormIt, если формы обрабатывает он.
- pdoTools, если чанки форм на Fenom или в файлах.
