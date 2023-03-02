Подобная логика позволяет навесить свой код на применение купона и выводить пользователям какую-то дополнительную информацию, связанную со скидкой.

### mspc2_set

Сработает при применении промо-кода, даже если это было с ошибкой.

#### Пример

```javascript
$(document).ready(function() {
    $(document).on('mspc2_set', function(e, response) {
        console.log('mspc2_set response', response);
    });
});
```

### mspc2_unset

Сработает при отмене промо-кода.

#### Пример

```javascript
$(document).ready(function() {
    $(document).on('mspc2_unset', function(e, response) {
        console.log('mspc2_unset response', response);
    });
});
```
