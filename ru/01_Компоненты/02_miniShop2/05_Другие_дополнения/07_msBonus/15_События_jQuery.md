Подобная логика позволяет навесить свой код на применение или отмену бонусов и выводить пользователям какую-то дополнительную информацию.


### msb2_set

Сработает при применении бонусов к корзине, даже если это было с ошибкой.

#### Пример

```javascript
$(document).ready(function() {
    $(document).on('msb2_set', function(e, response) {
        console.log('msb2_set response', response);
    });
});
```


### msb2_unset

Сработает при отмене бонусов.

#### Пример

```javascript
$(document).ready(function() {
    $(document).on('msb2_unset', function(e, response) {
        console.log('msb2_unset response', response);
    });
});
```
