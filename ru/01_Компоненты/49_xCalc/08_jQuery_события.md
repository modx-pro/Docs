Подобная логика позволяет навесить свой JS код на фронт-энд события калькулятора.

## xccResultsResponse

Сработает при успешном/неуспешном расчёте.

## Пример

```javascript
$(document).ready(function() {
    $(document).on('xccResultsResponse', function (e, response, $form, propkey) {
        if (response['success']) {
            console.log('response', response); // ответ сервера
            console.log('$form', $form); // jQuery объект формы
            console.log('propkey', propkey); // ключ текущего калькулятора

            let $wrap = $form.closest('[data-xcc-propkey="' + propkey + '"]');
            console.log('$wrap', $wrap); // блок-обёртка
        }
    });
});
```
