# AjaxForm with calculation results

You often need to show a form after a calculation. Use the jQuery trigger `xccResultsResponse` (since 1.0.2).

Pass a custom chunk instead of `tpl.xCalc.outer`:

```fenom
<div class="xcalc [ js-xcc ]" data-xcc-propkey="{$propkey}">
  <h1>{$calculator.title}</h1>

  {if $calculator.description?}
    <div>
      {$calculator.description}
    </div>
  {/if}

  <form class="xcc-form [ js-xcc-form ]" action="" method="post">

    {* Fields *}
    {foreach $fields as $field}
      {var $tpl = ($field.tpl ?: ('tpl.xCalc.field.' ~ $field.type))}
      {$_modx->getChunk($tpl, $field)}
    {/foreach}

    {* Button *}
    <button type="submit">Calculate</button>

  </form>

  <div class="[ js-ajaxform ]" style="display: none;">
    {'!AjaxForm' | snippet: [
      'snippet' => 'FormIt',
      'hooks' => 'email',
      'emailSubject' => 'Test message',
      'emailTo' => 'mymail@yandex.ru',
      'validate' => 'name:required,email:required,message:required',
      'validationErrorMessage' => 'Form has errors!',
      'successMessage' => 'Message sent successfully',
    ]}
  </div>

  <div class="xcc-results [ js-xcc-results ]">
    {*...*}
  </div>
</div>

<script>
  $(document).on('xccResultsResponse', function (e, response, $form, propkey) {
    if (response.success) {
      let $wrap = $form.closest('[data-xcc-propkey="' + propkey + '"]');
      let $af = $wrap.find('.js-ajaxform');
      $af.show();
    }
  });
</script>
```

The page calls the AjaxForm and hides it. On successful calculation, the jQuery handler shows the form.
