# Examples

## Switching messages from jgrowl to SweetAlert

```js
$(document).on('Quiz.init.before', function (e, quiz) {
  quiz.message = function (status, msg) {
    swal(status, msg, status);
  };
});
```

## Changing points and correct-answer count

```js
$(document).on('Quiz.result.before', function (e, options, field) {
  options.answer.points = 900; // points
  options.answer.success = 10;  // correct answers
});
```

## Cancelling loading the next section

```js
$(document).on('Quiz.next.before', function (e, options) {
  options.eventStop = true;
});
```
