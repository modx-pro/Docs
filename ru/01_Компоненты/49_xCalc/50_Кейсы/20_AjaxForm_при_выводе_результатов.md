Часто бывает необходимо вывести какую-то форму по итогу расчёта. Для этого воспользуемся jQuery триггером `xccResultsResponse`, который появился с версии 1.0.2.

Вместо чанка `tpl.xCalc.outer` в сниппет передайте кастомный чанк с кодом примерно таким:

```php
<div class="xcalc [ js-xcc ]" data-xcc-propkey="{$propkey}">
    <h1>{$calculator['title']}</h1>

    {if $calculator['description']?}
        <div>
            {$calculator['description']}
        </div>
    {/if}

    <form class="xcc-form [ js-xcc-form ]" action="" method="post">

        {* Fields *}
        {foreach $fields as $field}
            {var $tpl = ($field['tpl'] ?: ('tpl.xCalc.field.' ~ $field['type']))}
            {$_modx->getChunk($tpl, $field)}
        {/foreach}

        {* Button *}
        <button type="submit">Рассчитать</button>

    </form>

    <div class="[ js-ajaxform ]" style="display: none;">
        {'!AjaxForm' | snippet : [
            'snippet' => 'FormIt',
            'hooks' => 'email',
            'emailSubject' => 'Тестовое сообщение',
            'emailTo' => 'mymail@yandex.ru',
            'validate' => 'name:required,email:required,message:required',
            'validationErrorMessage' => 'В форме содержатся ошибки!',
            'successMessage' => 'Сообщение успешно отправлено',
        ]}
    </div>

    <div class="xcc-results [ js-xcc-results ]">
        {*...*}
    </div>
</div>

<script>
    $(document).on('xccResultsResponse', function (e, response, $form, propkey) {
        if (response['success']) {
            let $wrap = $form.closest('[data-xcc-propkey="' + propkey + '"]');
            let $af = $wrap.find('.js-ajaxform');
            $af.show();
        }
    });
</script>
```

Мы в коде страницы вызываем форму `AjaxForm` и заранее скрываем её. А при успешном расчёте, при помощи jQuery получаем эту форму и отображаем.
