# Примеры

## Меняем сообщения с jgrowl на SweetAlert

```js
$(document).on('Quiz.init.before', function (e, quiz) {
  quiz.message = function (status, msg) {
    swal(status, msg, status);
  };
});
```

## Меняем кол-во баллов и кол-во правильных ответов

```js
$(document).on('Quiz.result.before', function (e, options, field) {
  options.answer.points = 900; // кол-во баллов
  options.answer.success = 10; // кол-во правильных ответов
});
```

## Отменяем получение след. раздела.

```js
$(document).on('Quiz.next.before', function (e, options) {
  options.eventStop = true;
});
```
