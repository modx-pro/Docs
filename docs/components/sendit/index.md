---
title: SendIt
description: Компонент для работы с формами на сайте, аналог AjaxForm.
outline: [2,3]
lastUpdated: true
logo: https://sendit.art-sites.ru/assets/components/sendit/logo.jpg
modstore: https://modstore.pro/packages/users/sendit
repository: https://github.com/ShevArtV/sendit
author: ShevArtV
items: [
  { text: 'Начало работы', link: 'index' },
  { text: 'Отправка данных', link: 'sending' },
  { text: 'Пагинация', link: 'pagination' },
  { text: 'Идентификация', link: 'identification' },
  { text: 'Создание опросников', link: 'quizform' },
  { text: 'Загрузка файлов', link: 'fileuploader' },
  { text: 'Сохранение данных', link: 'saveformdata' },
  { text: 'Уведомления', link: 'notify' },
  { text: 'Сниппеты', link: 'snippets' },
  { text: 'События', link: 'events' },
  { text: 'Разработка', link: 'development' },
]
dependencies: ['pdoTools', 'FormIt']
---

# SendIt

::: tip
Компонент **pdoTools** необходим только для возможности указывать файловые снипеты и работы парсера **Fenom**.
Однако и без него компонент будет работать.
:::

## Возможности

1. Отправка данных сервер без перезагрузки страницы.
2. Загрузка файлов любых размеров на сервер и прикрепление их к письмам.
3. Создание опросников (многошаговых форм).
4. Сохранение данных форм в localStorage и заполнение полей после перезагрузки.
5. Авторизация, регистрация, восстановление пароля и редактирование личных данных.
6. Вывод любых данных с разбивкой по страницам.

## Особенности

1. Использует cookie и localStorage.
2. Не требует вызова сниппетов для отправки формы.
3. Есть защита от ботов и внешнего доступа.
4. Можно корректировать работу с помощью событий.
5. Отправка возможна на события change, input и click по кнопке.
6. С версии 2.0.0 для хранения временных данных используется отдельная таблица **si_sessions**.

## Стандартное использование

::: danger
Не вносите изменения в файл пресетов расположенный в папке *core/components/sendit/presets/sendit.inc.php*, так как при обновлении компонента все изменения будут стёрты.

Создайте копию файла в удобной для вас директории и укажите путь к нему в системной настройке **si_path_to_presets**.
:::

Компонент предназначен для отправки произвольных данных на сервер, передачи их в указанный обработчик и возвращения ответа.
Обработчиком может служить как любой из стандартных сниппетов, например *FormIt* (для отправки писем), так и сниппет написанный вами.

Для того чтобы начать использование **SendIt**, достаточно разместить на странице форму или хотя бы поле для ввода данных со специальными атрибутами (подробнее про атрибуты
читайте в разделе [Отправка данных](https://docs.modx.pro/components/sendit/sending))

```html:line-numbers
<textarea
  data-si-form
  data-si-preset="check_text"
  data-si-event="change" name="text"
></textarea>
```

При изменении значения в поле **name="text"** оно будет отправлено на сервер и передано в сниппет-обработчик указанный в пресете с ключом **check_text**.
::: tip
Пресет - это набор параметров вызова сниппета. Поскольку **SendIt** позволяет не писать вызов сниппета, наборы параметров вынесены в отдельный файл, путь к нему указан в
системной настройке **si_path_to_presets**.
:::
Для данного примера пресет может выглядеть так:

```php:line-numbers
return [
  'check_text' => [
    'snippet' => 'checkText'
  ]
];
```

::: tip
Значение параметра **snippet** может иметь вид '@FILE snippets/checktext.php', т.е. указывать на файловый сниппет.
:::

В сниппете-обработчике вы производите нужные вам манипуляции с данными и возвращаете ответ

```php:line-numbers
/*
  какой-то полезный код,
  которой обрабатывает переданные данные ($_POST)
  и имеет доступ к параметрам пресета ($scriptProperties)
*/
$result = myFuntion($_POST, $scriptProperties);
$msg = $result['msg']; // сообщение для показа пользователю
$data = $result['data']; // данные для возврата на фронт
return $result['success'] ? $SendIt->success($msg, $data) : $SendIt->error($msg, $data);
```

## Преимущества пресетов

1. Редактирование параметров в одном файле.
2. Наследование параметров, т.е. общие параметры можно вынести в отдельный пресет и расширять его, используя параметр **extends**.
3. Легко переносить между проектами.

## Недостатки пресетов

1. Нельзя использовать плейсхолдеры и ключи словаря (решается написанием [плагина](https://docs.modx.pro/components/sendit/events#pered-ustanovkoy-parametrov)).
2. Непривычно (решается использованием [сниппета RenderForm](https://docs.modx.pro/components/sendit/snippets)).

## Системные настройки

|              Ключ              |                        Описание                         |                         Значение                         |
|:------------------------------:|:-------------------------------------------------------:|:--------------------------------------------------------:|
|      **si_frontend_css**       |                 Путь к основным стилям                  | `[\[+assetsUrl]]components/sendit/css/web/index.css` |
|       **si_frontend_js**       |               Путь к основным JS скриптам               |   `[\[+assetsUrl]]components/sendit/js/web/index.js`    |
|     **si_js_config_path**      |              Путь к файлу JS конфигурации               |              `../configs/modules.inc.js`                  |
|        **si_uploaddir**        |                Путь для загрузки файлов                 | `[\[+assetsUrl]]components/sendit/uploaded_files/`  |
|     **si_path_to_presets**     |       Путь к пресетам (относительно core_path)          |   `components/sendit/presets/sendit.inc.php`     |
|        **si_send_goal**        |            Отправлять цели в Яндекс.Метрику             |                          *Нет*                           |
|       **si_counter_id**        |                   ID счётчика метрики                   |                                                          |
|      **si_default_email**      |          Адрес для отправки писем по умолчанию          |                                                          |
|      **si_default_admin**      |             ID администратора по умолчанию              |                           `1`                            |
|    **si_default_emailtpl**     |                Чанк письма по умолчанию                 |                     `siDefaultEmail`                     |
| **si_max_sending_per_session** | Максимальное количество отправок одной формы за сессию  |                           `2`                            |
|  **si_pause_between_sending**  |           Пауза между отправками одной формы.           |                           `30`                           |
|      **si_unset_params**       | Список параметров, которые не нужно возвращать в ответе |                    `emailTo,extends`                     |
|        **si_precision**        |      Точность округления процентов загрузки файлов      |                           `2`                            |
|      **si_storage_time**       |  Время хранения загруженных файлов во временной папке   |                         `86400`                          |
|       **si_allow_dirs**        | Список имен папок из которых можно удалять другие папки |                     `uploaded_files`                     |
| **si_use_custom_session_id**   |   Использовать пользовательский ID сессии               |                          *Нет*                           |

## Параметры по умолчанию

Чтобы отправить данные на почту необязательно создавать пресет, достаточно добавить форме атрибут **data-si-form**.
В этом случае будет сформирован массив параметров **"по умолчанию"**.
Почта для отправки письма будет взята из системной настройки компонента (**si_default_email**), если вы её не указали, будет проверена настройка **ms2_email_manager**,
если и там пусто - будет взята почта администратора (пользователь с ID = **si_default_admin**). Если же по какой-то причине почта так и не будет найдена,
в параметры будет добавлен только хук **FormItSaveForm**. Название формы, тема письма и сообщение пользователю будут взяты из словаря компонента.
Чанк письма указан в системных настройках (**si_default_emailtpl**). Таким образов параметры по умолчанию будут выглядеть примерно так:

```php
[
  'successMessage' => 'Форма отправлена!',
  'hooks' => 'email,FormItSaveForm',
  'emailTpl' => 'siDefaultEmail',
  'emailTo' => 'some@email.ru',
  'formName' => 'Форма по умолчанию',
  'emailSubject' => 'Письмо с сайта domain.ru',
]
```

::: warning
Форма должна иметь кнопку с явно указанным атрибутом **type="submit"**
:::
В итоге, форма будет сохранена в админке и отправлена на найденный email.

## Конфигурация JavaScript

Компонент предоставляет возможность изменить некоторые параметры работы JavaScript.
::: details Конфигурация по умолчанию

```js:line-numbers{2,7,70,85,105,127,147,155}
export const ModulesConfig = {
  Helpers: {
    className: 'Helpers',
    pathToScripts: '../modules/helpers.js',
    forceLoad: true
  },
  UserBehaviorTracker: {
    className: 'UserBehaviorTracker',
    pathToScripts: '../modules/userbehaviortracker.js',
    debug: false,
    forceLoad: true,
    autoUpdateTime: 0,
    maxEvents: 100,
    minBotScoreAmount: 50,
    cooldownMultiplier: 0.02,
    cooldownTime: 5,
    maxSum: 150,
    weights: {
      mouseMovements: 1,
      clicks: 1,
      keystrokes: 1,
      scrolls: 1,
      timing: 1,
      behaviorPatterns: 1,
      recentBehavior: 1
    },
    mouse: {
      minMovements: 50,
      straightLineThreshold: 0.7,
      rightAngleThreshold: 0.3,
    },
    clicks: {
      minClicks: 3,
      positionTolerance: 5,
      samePositionThreshold: 0.6,
      sameLocationThreshold: 0.5,
      naturalVariationThreshold: 0.4,
      naturalVariationInterval: 150,
      stdDevThreshold: 30,
      avgIntervalThreshold: 400,
      highVarianceThreshold: 250,
      minVarianceThreshold: 100,
    },
    keystrokes: {
      minKeystrokes: 5,
      naturalVariationThreshold: 0.5,
      naturalVariationInterval: 75,
      stdDevThreshold: 30,
      fastTypingThreshold: 100,
      veryFastTypingThreshold: 50,
      highVarianceThreshold: 50,
      minVarianceThreshold: 40,
      repeatedPatternMultiplier: 5
    },
    scrolls: {
      minScrolls: 5,
      stdDevThreshold: 5,
      avgDistanceThreshold: 10,
    },
    behavior: {
      historySize: 30,
      recentWindow: 10,
      minTimeThreshold: 5000,
      suspiciousPatternThreshold: 0.8,
      humanLikePatternThreshold: 0.3,
      maxInteractionsPerSecondThreshold: 100,
      minInteractionsPerSecondThreshold: 10,
    }
  },
  Sending: {
    forceLoad: true,
    className: 'Sending',
    pathToScripts: '../modules/sending.js',
    rootSelector: '[data-si-form]',
    presetSelector: '[data-si-preset]',
    rootKey: 'siForm',
    presetKey: 'siPreset',
    eventKey: 'siEvent',
    goalKey: 'siGoal',
    actionUrl: '/assets/components/sendit/action.php',
    errorBlockSelector: '[data-si-error="${fieldName}"]',
    eventSelector: '[data-si-event="${eventName}"]',
    errorClass: 'si-error'
  },
  Notify: {
    forceLoad: true,
    className: 'Notify',
    pathToScripts: '../modules/notify.js',
    jsPath: '/assets/components/sendit/js/web/lib/izitoast/iziToast.js',
    cssPath: '/assets/components/sendit/css/web/lib/izitoast/iziToast.min.css',
    handlerClassName: 'iziToast',
    toastSelector: '.iziToast',
    typeSelectors: {
      success: '.iziToast-color-green',
      info: '.iziToast-color-blue',
      error: '.iziToast-color-red',
      warning: '.iziToast-color-yellow',
    },
    titleSelector: '.iziToast-title',
    handlerOptions: {
      timeout: 2500,
      position: 'topCenter'
    }
  },
  FileUploaderFactory: {
    className: 'FileUploaderFactory',
    pathToScripts: '../modules/fileuploader.js',
    formSelector: '[data-si-form]',
    progressSelector: '[data-fu-progress]',
    rootSelector: '[data-fu-wrap]',
    tplSelector: '[data-fu-tpl]',
    dropzoneSelector: '[data-fu-dropzone]',
    fileListSelector: '[data-fu-list]',
    progressIdAttr: 'data-fu-id',
    progressTextAttr: 'data-fu-text',
    hideBlockSelector: '[data-fu-hide]',
    presetSelector: '[data-si-preset]',
    presetKey: 'siPreset',
    sendEvent: 'si:send:after',
    pathKey: 'fuPath',
    pathAttr: 'data-fu-path',
    actionUrl: '/assets/components/sendit/action.php',
    hiddenClass: 'v_hidden',
    progressClass: 'progress__line',
    showTime: true
  },
  PaginationFactory: {
    className: 'PaginationFactory',
    pathToScripts: '../modules/paginationhandler.js',
    sendEvent: 'si:send:finish',
    rootSelector: '[data-pn-pagination]',
    firstPageBtnSelector: '[data-pn-first]',
    lastPageBtnSelector: '[data-pn-last]',
    lastPageKey: 'pnLast',
    prevPageBtnSelector: '[data-pn-prev]',
    nextPageBtnSelector: '[data-pn-next]',
    morePageBtnSelector: '[data-pn-more]',
    resultBlockSelector: '[data-pn-result="${key}"]',
    currentPageInputSelector: '[data-pn-current]',
    totalPagesSelector: '[data-pn-total]',
    limitSelector: '[data-pn-limit]',
    typeKey: 'pnType',
    hideClass: 'v_hidden',
    presetKey: 'siPreset',
    rootKey: 'pnPagination'
  },
  SaveFormData: {
    className: 'SaveFormData',
    pathToScripts: '../modules/saveformdata.js',
    rootSelector: '[data-si-form]',
    noSaveSelector: '[data-si-nosave]',
    rootKey: 'siForm',
    resetEvent: 'si:send:reset'
  },
  QuizForm: {
    className: 'QuizForm',
    pathToScripts: '../modules/quizform.js',
    formSelector: '[data-si-form]',
    rootKey: 'siForm',
    autoKey: 'qfAuto',
    rootSelector: '[data-qf-item]',
    itemKey: 'qfItem',
    itemCompleteSelector: '[data-qf-complete="1"]',
    itemCompleteKey: 'qfComplete',
    finishSelector: '[data-qf-finish]',
    itemCurrentSelector: '[data-qf-item="${currentIndex}"]',
    btnSelector: '[data-qf-btn]',
    btnKey: 'qfBtn',
    btnNextSelector: '[data-qf-btn="next"]',
    btnPrevSelector: '[data-qf-btn="prev"]',
    btnSendSelector: '[data-qf-btn="send"]',
    btnResetSelector: '[data-qf-btn="reset"]',
    nextIndexSelector: '[data-qf-next]',
    nextIndexKey: 'qfNext',
    progressSelector: '[data-qf-progress]',
    currentQuestionSelector: '[data-qf-page]',
    totalQuestionSelector: '[data-qf-total]',
    pagesSelector: '[data-qf-pages]',
    progressValueSelector: '[data-qf-progress-value]',
    activeClass: 'active',
    visabilityClass: 'v_hidden',
    disabledClass: 'disabled',
    sendEvent: 'si:send:finish',
    nosaveAttr: 'data-si-nosave'
  },
}
```

:::
Выделенные строки содержат имена модулей, которые будут импортированы при инициализации компонента. Модули с `forceLoad: true` загружаются всегда, остальные — только при наличии соответствующих элементов на странице. Если удалить конфигурацию модуля, он не будет загружен.
И, конечно же, можно через эту же конфигурацию подключать свои модули, которые станут доступны в глобальном объекте **SendIt**. Подробнее о каждом модуле читайте в
соответствующем разделе этой документации:

* [**Sending**](https://docs.modx.pro/components/sendit/sending)
* [**QuizForm**](https://docs.modx.pro/components/sendit/quizform)
* [**FileUploader**](https://docs.modx.pro/components/sendit/fileuploader)
* [**SaveFormData**](https://docs.modx.pro/components/sendit/saveformdata)
* [**Notify**](https://docs.modx.pro/components/sendit/notify)
* [**Pagination**](https://docs.modx.pro/components/sendit/pagination)
