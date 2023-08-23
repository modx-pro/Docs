---
title: SendIt
description: Компонент для работы с формами на сайте, аналог AjaxForm.
outline: [2,3]
lastUpdated: true
logo: https://sendit.art-sites.ru/assets/components/sendit/web/logo.jpg
modstore: https://modstore.pro/packages/users/sendit
repository: https://github.com/ShevArtV/sendit
author: ShevArtV
items: [
{ text: 'Начало работы', link: 'index' },
{ text: 'Простые формы', link: 'sending' },
{ text: 'Опросники', link: 'quizform' },
{ text: 'Загрузка файлов', link: 'fileuploader' },
{ text: 'Сохранение данных', link: 'saveformdata' },
{ text: 'Уведомления', link: 'notify' },
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
3. Создание опросников (многошаговых форм)
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

| Ключ                    | Описание                              | Значение                                                 |
|-------------------------|---------------------------------------|----------------------------------------------------------|
| **si_frontend_css**     | Путь к основным стилям                | *[\[+assetsUrl]]components/sendit/web/css/index.min.css* |
| **si_frontend_js**      | Путь к основным JS скриптам           | *[\[+assetsUrl]]components/sendit/web/js/sendit.js*      |
| **si_js_config_path**   | Путь к файлу JS конфигурации          | *./sendit.inc.js*                                        |
| **si_uploaddir**        | Путь для загрузки файлов              | */assets/components/sendit/uploaded_files/*              |
| **si_path_to_presets**  | Путь к пресетам                       | */core/components/sendit/presets/sendit.inc.php*         |
| **si_send_goal**        | Отправлять цели в Яндекс.Метрику      | *Нет*                                                    |
| **si_counter_id**       | ID счётчика метрики                   |                                                          |
| **si_default_email**    | Адрес для отправки писем по умолчанию |                                                          |
| **si_default_emailtpl** | Чанк письма по умолчанию              | *siDefaultEmail*                                         |

## Начало работы

Входящие в комплект стили на большинстве сайтов будут только мешать. В связи с этим, рекомендую удалить из настроек путь к стилям, чтобы они не подключались.  
Если хотите, чтобы при отправке форм, отправлялись цели в Яндекс.Метрику включите эту опцию в системных настройках и укажите ID счётчика, установленного на сайте.
::: info
Убедитесь, что на сайте установлен актуальный код метрики

```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () {
            (m[i].a = m[i].a || []).push(arguments)
        };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
                return;
            }
        }
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
    (window, document, "script", "https://mcc.yandex.ru/metrika/tag.js", "ym");

    ym(12345678, "init", { // [!code focus]
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });
</script>
<noscript>
    <div>
        <img src="https://mc.yandex.ru/watch/57463354" style="position:absolute; left:-9999px;" alt=""/>
    </div>
</noscript>
<!-- /Yandex.Metrika counter -->
```

:::
Подробнее об отправке целей читайте [тут](https://docs.modx.pro/components/sendit/sending/#otpravka-celey)

### Отправка формы
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
О том как отправить форму со своими параметрами читайте в разделе [Простые формы](https://docs.modx.pro/components/sendit/sending)
