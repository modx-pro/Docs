---
name: AjaxFormItLogin
description: Современная и функциональная замена AjaxForm
author: shevartv
modstore: https://modstore.pro/packages/users/ajaxformitlogin
repository: https://github.com/ShevArtV/ajaxformitlogin

items: [
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Скрипты и Стили', link: 'scripts-and-styles' },
  { text: 'Системные события', link: 'events' },
  {
    text: 'Сниппеты',
    items: [
      { text: 'AjaxFormitLogin', link: 'snippets/ajaxformitlogin' },
      { text: 'aflActivateUser', link: 'snippets/aflactivateuser' },
      { text: 'Кастомные сниппеты', link: 'snippets/custom-snippets' },
    ],
  },
  {
    text: 'Хуки',
    items: [
      { text: 'AjaxIdentification', link: 'hooks/ajaxidentification' },
    ],
  },
  {
    text: 'Валидаторы',
    items: [
      { text: 'aflCheckPassLength', link: 'validators/aflcheckpasslength' },
      { text: 'aflPasswordConfirm', link: 'validators/aflpasswordconfirm' },
      { text: 'aflRequiredIf', link: 'validators/aflrequiredif' },
      { text: 'aflUserExists', link: 'validators/afluserexists' },
      { text: 'aflUserNotExists', link: 'validators/aflusernotexists' },
    ],
  },
]
---

# AjaxFormItLogin

AjaxFormItLogin это современный вариант всеми любимого компонента AjaxForm.
Обладает всеми возможностями прародителя и имеет ряд дополнительных функций.

## Особенности {#traits}

1. Нет зависимости от jQuery.
2. Для показа уведомлений используется библиотека [IziToast](https://izitoast.marcelodolza.com/).
3. Принимает параметр `clearFieldsOnSuccess`, тем самым позволяя управлять очисткой полей при успешной оправке формы.
4. Принимает параметр `transmittedParams` (значение должно быть валидным JSON), который позволяете передавать в JS кастомные параметры отдельно при успешной, отдельно при
   неудачной отправке.
5. Позволяет отображать процесс загрузки файлов на сервер, для этого нужно указать параметр `showUploadProgress` со значением 1.
6. Событие af_complete заменено на afl_complete.

    ```js
    document.addEventListener('afl_complete', e => {
      console.log(e.detail.response); // ответ сервера
      console.log(e.detail.form); // текущая форма
    });
    ```

7. Изменен формат ответа сервера. `e.detail.response.data` теперь содержит параметр `errors` - объект с ошибками валидации, если они есть и форма не отправлена, а также пользовательские параметры указанные в вызове конкретной формы в параметре `transmittedParams`. В этом параметре следует передавать либо JSON, либо массив с обоими или одним из ключей `success` и/или `error`. В каждый из ключей нужно передать строку с именами параметров вызова сниппета AjaxFormItLogin разделенными запятыми, которые должны быть проброшены в JS. В случае же успешной отправки формы в ответе будут содержаться параметры `e.detail.response.data.redirectTimeout` и `e.detail.response.data.redirectUrl`.
8. Работают редиректы. Для этого необходимо указать в вызове сниппета параметр redirectTo (абсолютная ссылка или ID ресурса) и, при необходимости изменить стандартное значение в 2с, redirectTimeout (в миллисекундах) для задания задержки перед переходом на другую страницу.
9. Добавлен метод помогающий валидировать чекбоксы. Для его работы необходимо проверяемому чекбоксу добавить атрибут data-afl-required, где значением будет ключ указанный в параметре validate, а также нужно добавить скрытое поле с этим именем в форму. Самому чекбоксу имя можно не указывать.
10. Нет поддержки капчи от гугла, но встроена собственная защита от спама по методу [Алексея Смирнова](https://modx.pro/users/alexij). Для активации нужно в вызове указать параметр `spamProtection` со значением 1. По умолчанию включена.
11. Есть возможность регистрации, авторизации, сброса пароля и редактирования личных данных, при условии установки компонента FormIt. Подробнее о поддерживаемых параметрах можно прочитать [в этой заметке](https://modx.pro/solutions/22936).
12. При обновлении данных пользователя добавлено системное событие aiOnUserUpdate, которое получает следующие данные $user - объект обновленного пользователя, $profile - его профиль, $data - переданные данные.
13. Есть автоматическая отправка целей в Яндекс.Метрику. Чтобы это работало нужно установить системную настройку `afl_metrics` в значение `ДА`. Указать в системной настройке `afl_counter_id` идентификатор используемого на сайте счётчика метрики. Вставить код самого счётчика на сайт. Добавить в вызов сниппета параметр `ym_goal`, в котором нужно указать имя JS цели из Яндекс.Метрики, а так же параметр `transmittedParams` со значением `['success' => 'ym_goal']`.
14. Возможность использовать для обработки форм своих сниппетов никуда не делать. Изменился только объект, к которому надо обращаться и форматы ответа. Например сниппет `MySnippet`, который проверяет заполнено ли поле name, может выглядеть так:

```php
<?php
if (empty($_POST['name'])) {
  return $AjaxFormItLogin->error('Ошибки в форме', array(
    'errors' => array(
      'name' => 'Вы не заполнили имя'
    )
  ));
}
else {
  return $AjaxFormItLogin->success('Форма прошла проверку', array('name' => 'Имя заполнено корректно.'));
}
```

Вызов будет таким

```fenom
{'!AjaxFormItLogin' | snippet: [
  'snippet' => 'MySnippet',
  'tpl' => 'myTpl',
]}
```

## Быстрый старт {#qstart}

1. Установите компонент AjaxFormItLogin из репозитория <https://modstore.pro>. При этом если у Вас не установлен компонент FormIt, он будет автоматически скачан и установлен.
2. Скопируйте всё содержимое между html тегами `<form></form>`, включая и эти теги, в чанк. Запомните название этого чанка (для примера будем использовать) оно нам понадобится.
3. Замените скопированную форму (только не в созданном чанке, а на исходной странице) на следующий один из следующих вызовов:

    :::code-group

    ```modx
    [[!AjaxFormitLogin?
      &form=`aflExampleForm`
      &emailTo=`name@domain.ru`
      &emailFrom=`noreply@domain.ru`
      &emailSubject=`Тема письма`
      &emailTpl=`aflExampleEmail`
      &validate=`email:required:email,name:required:minLength=^3^,phone:required,politics:minValue=^1^`
    ]]
    ```

    ```fenom
    {'!AjaxFormItLogin' | snippet: [
      'form' => 'aflExampleForm', 'hooks' => 'FormItSaveForm,email',
      'emailTo' => 'почта@получателя',
      'emailFrom' => 'почта_от_которой@придет_письмо',
      'emailSubject' => 'Тема письма',
      'emailTpl' => 'aflExampleEmail',
      'validate' => 'email:required:email,name:required:minLength=^3^,phone:required,politics:minValue=^1^',
    ]}
    ```

    :::

    ::: tip
    Более подробно о параметрах отправки писем, хуках, валидации читайте в документации компонента [FormIt](https://docs.modx.com/current/ru/extras/formit) так как AjaxFormItLogin поддерживает все параметры этого компонента.
    :::

    Приведу пример того, как должна выглядеть форма:

    ```html
    <form id="aflExampleForm">
      <div class="mb-3">
        <label class="form-label">Имя</label>
        <input type="text" class="form-control" name="name" placeholder="Иван Иванович">
        <small class="text-danger d-block error_name"></small>
      </div>
      <div class="mb-3">
        <label class="form-label">Телефон</label>
        <input type="tel" name="phone" class="form-control" placeholder="+7(999)123-45-67">
        <small class="text-danger d-block error_phone"></small>
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" name="email" class="form-control" placeholder="name@mail.ru">
        <small class="text-danger d-block error_email"></small>
      </div>
      <div class="mb-3 form-check">
        <input type="hidden" name="politics" value="0">
        <input type="checkbox" class="form-check-input" id="politics" data-afl-required="politics">
        <label class="form-check-label" for="politics">Я принимаю <a href="#" target="_blank">условия использования</a> сайта.</label>
        <small class="text-danger d-block error_politics"></small>
      </div>
      <button type="submit" class="btn btn-primary">Отправить</button>
      <button type="reset" class="btn btn-secondary">Сбросить</button>
    </form>
    ```

    ::: danger
    Для вывода ошибок валидации нет необходимости, добавлять в форму блоки с классами `error_имяполя`. Если этого не сделать, то сообщение с ошибкой будет выведено как всплывающее уведомление с текстом формата `имя_поля: текст сообщения`. Если вместо имени поля вы хотите показывать другой текст, укажите в вызове сниппета AjaxFormitLogin параметр `aliases` и параметр `transmittedParams`. `aliases` должен содержать строку вида `имяполя==Выводимый текст, имя_дргого_поля==Какой-то текст`.
    Параметр `transmittedParams` должен содержать следующее значение `['error' => 'aliases']`.
    :::

    Так же обратите внимание на вот этот блок:

    ```html
    <input type="hidden" name="politics" value="0">
    <input type="checkbox" class="form-check-input" id="politics" data-afl-required="politics">
    ```

    Тут нам нужно, чтобы пользователь обязательно прожал чекбокс, для этого мы проверяем в параметре вызова `validate`, чтобы значение в поле `name="politics"` было больше 0.    поля.

4. Создайте чанк письма (aflExampleEmail или любое другое имя). Можно использовать этот

    :::code-group

    ```modx
    [[+name:isnot=``:then=`<p>Имя: [[+name]]</p>`]]
    [[+phone:isnot=``:then=`<p>Телефон: [[+phone]]</p>`]]
    [[+email:isnot=``:then=`<p>Email: [[+email]]</p>`]]
    ```

    ```fenom
    {$name ? '<p>Имя: ' ~ $name ~ '</p>' : ''}
    {$phone ? '<p>Телефон: ' ~ $phone ~ '</p>' : ''}
    {$email ? '<p>Email: ' ~ $email ~ '</p>' : ''}
    ```

    :::

::: danger
В примере я использую чанки, хранящиеся в базе данных, однако компонент позволяет использовать и файловые чанки. Более того я рекомендую использовать именно их и парсер из компонента pdoTools. Теперь ваша форма будет сохранять данные в админке и отправлять данные на вашу почту.
:::

Примеры всех вариантов вызовов `AjaxFormitLogin` и чанков можно найти в папках `core/components/ajaxformitlogin/elements/templates/` и `public_html/core/components/ajaxformitlogin/elements/chunks/`.
