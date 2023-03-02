### Добавление формы

Нужно написать пресет вызова. Для этого в папке `core/elements/presets` создаем файл `ajaxformitlogin.inc.php`. Пример содержимого файла можно увидеть ниже:

```php
<?php

return [
    'callback_form' => [
        'validate' => 'name:required,phone:required,email:email,message:required',
        'name.vTextRequired' => 'Укажите Ваше имя',
        'phone.vTextRequired' => 'Укажите телефон',
        'message.vTextRequired' => 'Укажите суть обращения',
        'aliases' => 'name==,phone==,email==,message==',
        'hooks' => 'FormItSaveForm,email',
        'successMessage' => 'Форма успешно отправлена.',
        'validationErrorMessage' => 'Исправьте ошибки в форме!',
        'emailTpl' => '@FILE chunks/emails/letter.tpl'
    ]
];
```

Затем необходимо разметить форму в вёрстке для возможности вырезать её в чанк. Для этого следует использовать следующие атрибуты:

* `data-mpc-chunk` - в качестве значения принимает путь к чанку формы.
* `data-mpc-copy` - если нужно вызвать одну форму дважды, но с разными параметрами и чтобы вёрстка бралась из первой встреченной на странице формы, обязательно установить
  значение 1
* `data-mpc-ssf` - если нужно вызвать одну форму дважды, но с разными параметрами, чтобы эти параметры брались из пресета, работает только при запуске из терминала,
  обязательно установить значение 1
* `data-mpc-form` - указывает что данный чанк является именно формой и должен быть заменён вызовом сниппета AjaxFormItLogin, если указано значение `1` форма будет распарсена
  сразу, в шаблонах это, как правило, не требуется, исключение составляет шаблон-обёртка, где лежат формы в модалках
* `data-mpc-preset` - ключ в массиве из файла с пресетами
* `data-mpc-name` - человекопонятное название формы

```html

<form id="contact-form" method="post" class="form-validate form-horizontal" data-mpc-chunk="forms/callback_form.tpl" data-mpc-form=""
      data-mpc-preset="callback_form" data-mpc-name="Форма обратной связи">
    <div class="row-fluid">
        <div class="control-group col-lg-6 col-md-6 col-xs-12 col-sm-12">
            <div class="contact-label">
                <label id="jform_contact_name-lbl" for="jform_contact_name" class="hasTooltip required" title="">
                    Ваше имя<span class="star">&nbsp;*</span>
                </label>
                <input type="text" name="name" id="jform_contact_name" value=""
                       class="required input-block-level" size="30"
                       aria-required="true" aria-invalid="true">
            </div>

            <div class="contact-label">
                <label id="jform_contact_emailmsg-lbl" for="jform_contact_emailmsg"
                       class="hasTooltip required" title="">
                    Телефон<span class="star">&nbsp;*</span>
                </label>
                <input type="text" name="phone" id="jform_contact_emailmsg" value=""
                       class="required input-block-level" size="60"
                       aria-required="true">
            </div>

            <div class="contact-label">
                <label id="jform_contact_email-lbl" for="jform_contact_email"
                       class="hasTooltip required" title="">
                    Email<span class="star">&nbsp;</span>
                </label>
                <input type="email" name="email" class="validate-email input-block-level"
                       id="jform_contact_email" value="" size="30" autocomplete="email">
            </div>
        </div>

        <div class="control-group col-lg-6 col-md-6 col-xs-12 col-sm-12">
            <div class="contact-message">
                <label id="jform_contact_message-lbl" for="jform_contact_message"
                       class="hasTooltip required" title="">
                    Обращение<span class="star">&nbsp;*</span>
                </label>
                <textarea name="message" id="jform_contact_message" cols="50" rows="10"
                          class="required input-block-level" aria-required="true"
                          style="height:160px;"></textarea>
            </div>
            <div class="contact-form-submit">
                <button id="buton" style="margin-top:25px;"
                        class="btn center-block btn-primary btn-large validate sp-rounded"
                        type="submit"><i class="fa fa-envelope"></i>&nbsp;Отправить обращение
                </button>
            </div>
        </div>
    </div>
</form>
```

После этого у ресурса Контакты в списке форм появится новая форма с установленным пресетом и списком параметров, которые можно переопределить или дополнить из админки.
параметры заданные в админке всегда приоритетнее тех, что указаны в файле.

### Автозаполнение параметров emailTo и emailFrom

Принцип заполнения параметра `emailTo` такой:

1. Максимальный приоритет имеет значение этого параметра в списке форм
2. Если у формы в админке параметр `emailTo` не задан, но в TV со списком контактов (по умолчанию contacts) есть хотя бы один email привязанный к форме, то будет взято его
   значение
3. Если привязанных email'ов в списке контактов нет, то будет взято значение системной настройки `mpc_email`
4. Если значение системной настройки `mpc_email` пустое, будет взято значение системной настройки `ms2_email_manager`
5. Если значение системной настройки `ms2_email_manager` пустое, будет установлена заглушка `info@имя_вашего_домена`

Принцип заполнения параметра `emailFrom` такой:

1. Максимальный приоритет имеет значение этого параметра в списке форм
2. Если этот параметр не задан в админке, будет установлена заглушка `noreply@имя_вашего_домена`
3. Однако если вы используете SMTP, то будет использовано значение системной настройки `mail_smtp_user`, если там будет невалидный email, т.е. не будет `@`, то недостающая
   часть будет сформирована из первого значения в системной настройке `mail_smtp_hosts`
