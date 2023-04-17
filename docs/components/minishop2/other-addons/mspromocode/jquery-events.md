# jQuery события

Подобная логика позволяет навесить свой JS код на применение купона и выводить пользователям какую-то дополнительную информацию, связанную со скидкой.

## mspc_set

Сработает при успешном/неуспешном применении промо-кода.

### Пример mspc_set

```js
$(document).ready(function () {
  $(document).on('mspc_set', function (e, response) {
    console.log('mspc_set response', response);
  });
});
```

## mspc_remove

Сработает при отмене промо-кода.

### Пример mspc_remove

```js
$(document).ready(function () {
  $(document).on('mspc_remove', function (e, response) {
    console.log('mspc_remove response', response);
  });
});
```
