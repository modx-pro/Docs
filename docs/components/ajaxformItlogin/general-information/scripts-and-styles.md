# Скрипты и cтили

::: info
**Стили** - компонент не использует своих стилей, кроме тех, что идут в комплекте с библиотекой показа уведомлений IziToast.
:::

::: info
**Скрипты JavaScript** - компонент использует JS написанный в формате модуля по стандарту ES6. Это означает, что скрипты подключаются вне основного потока и оказывают минимальное влияние на общую скорость загрузки всей страницы. А формат модуля даёт вам широкие возможности по кастомизации скриптов. Далее рассмотрим возможные варианты работы с JS данного компонента.
:::

## Обработка результатов отправки формы

Для этого существует событие `afl_complete`

```js
document.addEventListener('afl_complete', e => {
    console.log(e.detail.response); // ответ сервера
    console.log(e.detail.form); // текущая форма
});
```

`e.detail.response` содержит параметры `success` (true или false); `message` - сообщение об ошибке или успехе из параметров вызова сниппета `successMessage` или `validationErrorMessage`, если иное не задано в хуках; `data` - массив данных с сервера, при этом в `data.errors` - список ошибок валидации, `data.redirectUrl` - ссылка на страницу переадресации, `data.redirectTimeout` - задержка перед переадресацией; так же в `e.detail.response.data` будут те параметры, которые вы передадите в вызове через `transmittedParams`.
Обнулив значение в `data.redirectUrl` вы можете отменить переадресацию.
Обнулив значение в `e.detail.response.message` вы можете отменить показ стандартного уведомления и показать своё.

## Обработка результатов инициализации всех форм

После инициализации всех форм на странице вызывается событие `afl_init` в котором нет параметров. Поймать его можно так

```js
document.addEventListener('afl_init', e => {
    console.log(window.aflForms); // список всех инициализированных форм
});
```

### Обработка загрузки файлов

По умолчанию обрабатывается один файл. Обработка производится тремя методами `onUploadProgress`, `onUploadFinished`, `onUploadError`. Каждый из них принимает на вход объект события и форму. Вы можете переопределить все или некоторые из этих методов, расширив класс `AjaxFormitLogin` и создав новый файл подключения, вместо стандартного `assets/components/ajaxformitlogin/js/default.js`.

### Использование библиотеки IziToast

Для этого необязательно использовать сниппеты входящие в состав пакета, как того требует AjaxForm.
Предположим, что ваш JS лежит в assets/js/add_scripts.js. Тогда внутри этого файла нужно вставить следующий код

```js
import AflIziToast from './../components/ajaxformitlogin/js/modules/aflizitoast.class.js';

const Notify = new AflIziToast({
    "jsPath": "assets/components/ajaxformitlogin/js/lib/izitoast/iziToast.min.js",
    "cssPath": "assets/components/ajaxformitlogin/css/lib/izitoast/iziToast.min.css",
    "handlerClassName": "iziToast",
    "handlerOptions": {
        "timeout": 2000,
        "position": "topCenter"
    }
});

// далее вам будут доступны три метода показа уведомлений
Notify.success('Сообщение об успехе!');
Notify.error('Сообщение о неудаче.');
Notify.info('Информационное сообщение.');
```

При подключении своих скриптов укажите тегу script атрибут `type="module"`.

## Подключение своей библиотеки уведомлений

1. Создайте свой JS класс расширяющий стандартный класс `AflNotify`, пример расширения можно посмотреть в файле
   `assets/components/ajaxformitlogin/js/modules/aflizitoast.class.js`.
2. Затем нужно изменить системные настройки `ajaxformitlogin_notify_classname` - указать имя созданного класса, `ajaxformitlogin_notify_classname` - указать путь к файлу класса относительно файла основного класса компонента `assets/components/ajaxformitlogin/js/modules/ajaxformitlogin.class.js`.
3. Добавьте в файл `assets/components/ajaxformitlogin/js/message_settings.json` настройки своего класса уведомлений. Если настроек нет - укажите пустой объект.
