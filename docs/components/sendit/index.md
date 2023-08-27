---
title: SendIt
description: Компонент для работы с формами на сайте, аналог AjaxForm.
logo: https://sendit.art-sites.ru/assets/components/sendit/web/logo.jpg
modstore: https://modstore.pro/packages/users/sendit
repository: https://github.com/ShevArtV/sendit
author: shevartv
items: [
  { text: 'Простые формы', link: 'sending' },
  { text: 'Опросники', link: 'quizform' },
  { text: 'Загрузка файлов', link: 'fileuploader' },
  { text: 'Сохранение данных', link: 'saveformdata' },
  { text: 'Уведомления', link: 'notify' },
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

1. Отправка данных полей форм на сайт без перезагрузки страницы.
2. Загрузка файлов любых размеров на сервер и прикрепление их к письмам.
3. Создание опросников (многошаговых форм).
4. Сохранение данных форм в localStorage и заполнение полей после перезагрузки.
5. Есть авторизация, регистрация, восстановление пароля и редактирование личных данных.

## Особенности

1. Использует cookie и localStorage.
2. Не требует вызова сниппетов для отправки формы.
3. Есть защита от ботов и внешнего доступа.
4. Можно корректировать работу с помощью событий.
5. Отправка возможна на события change и input.

## Общая информация

Идея компонента в том, чтобы упростить работу с формами.
Если посмотреть на похожие пакеты, то все они работают с формами через сниппет. Однако одна форма может
использоваться на нескольких страницах. В этом случае вызов сниппета надо упаковать в чанк. Но форм может быть много. Тогда чанков тоже будет много и в каждом будет вызов
сниппета, а в каждом сниппете параметры могут частично совпадать.
**SendIt** предлагает совершенно иной способ взаимодействия с формами.
Вызывать сниппет не нужно, параметры вызова размещаются в отдельном файле с пресетами, а сами пресеты можно наследовать.

## Системные настройки

|          Ключ           |               Описание                |                        Значение                         |
|:-----------------------:|:-------------------------------------:|:-------------------------------------------------------:|
|   **si_frontend_css**   |        Путь к основным стилям         | `[[+assetsUrl]]components/sendit/web/css/index.min.css` |
|   **si_frontend_js**    |      Путь к основным JS скриптам      |   `[[+assetsUrl]]components/sendit/web/js/sendit.js`    |
|  **si_js_config_path**  |     Путь к файлу JS конфигурации      |                    `./sendit.inc.js`                    |
|    **si_uploaddir**     |       Путь для загрузки файлов        |       `/assets/components/sendit/uploaded_files/`       |
| **si_path_to_presets**  |            Путь к пресетам            |    `/core/components/sendit/presets/sendit.inc.php`     |
|    **si_send_goal**     |   Отправлять цели в Яндекс.Метрику    |                          *Нет*                          |
|    **si_counter_id**    |          ID счётчика метрики          |                                                         |
|  **si_default_email**   | Адрес для отправки писем по умолчанию |                                                         |
| **si_default_emailtpl** |       Чанк письма по умолчанию        |                    `siDefaultEmail`                     |

## Начало работы

::: tip
Если входящие в комплект стили будут мешать, можете либо пересобрать их с нужными значениями (в комплекте есть sass-файлы), либо переопределить.
:::

Чтобы отправить форму просто добавьте ей атрибут **data-si-form**. В этом случае будет сформирован массив параметров **"по умолчанию"**.
Почта для отправки письма будет взята из системной настройки компонента (**si_default_email**), если вы её не указали, будет проверена настройка **ms2_email_manager**,
если и там пусто - будет взята почта администратора (пользователь с ID = 1). Если же по какой-то причине почта так и не будет найдена,
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
О том как отправить форму со своими параметрами читайте в разделе [Простые формы](/components/sendit/sending).

## Конфигурация JavaScript

Компонент предоставляет возможность изменить некоторые параметры работы JavaScript.

::: details Конфигурация по умолчанию

```js:line-numbers
export default function returnConfigs() {
  return {
    QuizForm: { // [!code warning]
      pathToScripts: './modules/quizform.js',
      rootSelector: '[data-si-form]',
      rootKey: 'siForm',
      autoKey: 'qfAuto',
      itemSelector: '[data-qf-item]',
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
    },
    Sending: { // [!code warning]
      pathToScripts: './modules/sending.js',
      rootSelector: '[data-si-form]',
      rootKey: 'siForm',
      presetKey: 'siPreset',
      actionUrl: 'assets/components/sendit/web/action.php',
      antiSpamEvent: 'click',
      eventSelector: '[data-si-event="${eventName}"]',
      errorClass: 'si-error'
    },
    SaveFormData: { // [!code warning]
      pathToScripts: './modules/saveformdata.js',
      rootSelector: '[data-si-form]',
      rootKey: 'siForm',
      resetEvent: 'si:send:reset'
    },
    Notify: { // [!code warning]
      pathToScripts: './modules/notify.js',
      jsPath: 'assets/components/sendit/web/js/lib/izitoast/iziToast.min.js',
      cssPath: 'assets/components/sendit/web/css/lib/izitoast/iziToast.min.css',
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
        position: "topCenter"
      }
    },
    FileUploader: { // [!code warning]
      pathToScripts: './modules/fileuploader.js',
      formSelector: '[data-si-form]',
      rootSelector: '[data-fu-wrap]',
      fieldSelector: '[data-fu-field]',
      rootKey: 'fuWrap',
      presetKey: 'siPreset',
      sendEvent: 'si:send:after',
      pathKey: 'fuPath',
      pathAttr: 'data-fu-path',
      actionUrl: 'assets/components/sendit/web/action.php',
      layout: {
        list: {
          tagName: 'ul',
          classNames: ['file-list', 'list_unslyled', 'd_flex', 'flex_wrap', 'gap_col-10', 'pt-20'],
          parentSelector: '[data-fu-wrap]',
          selector: '.file-list'
        },
        item: {
          tagName: 'li',
          classNames: ['file-list__item'],
          parentSelector: '.file-list',
          selector: '.file-list__item'
        },
        btn: {
          tagName: 'button',
          classNames: ['file-list__btn', 'btn', 'py-5', 'px-20', 'ta_center', 'border-1', 'border_error', 'hover_bg_error', 'radius_pill', 'hover_color_light'],
          parentSelector: '.file-list__item',
          selector: '[data-fu-path="${filepath}"]',
          type: 'button',
          text: '${filename}&nbsp;X'
        },
        input: {
          classNames: ['file-list__input'],
          tagName: 'input',
          type: 'hidden',
          selector: '.file-list__input'
        }
      }
    }
  }
}
```

:::

Выделенные строки содержат имена модулей, которые будут импортированы при инициализации компонента. Если удалить конфигурацию модуля, он не будет загружен.
И, конечно же, можно через эту же конфигурацию подключать свои модули, которые станут доступны в глобальном объекте **SendIt**. Подробнее о каждом модуле читайте в
соответствующем разделе этой документации:

* [**Sending**](/components/sendit/sending)
* [**QuizForm**](/components/sendit/quizform)
* [**FileUploader**](/components/sendit/fileuploader)
* [**SaveFormData**](/components/sendit/saveformdata)
* [**Notify**](/components/sendit/notify)
