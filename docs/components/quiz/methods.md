# Методы

Доступны следующие события:

```js
let QuizForm = $('#quiz');
```

## Start

Показываем первый раздел:

```js
QuizForm.quiz('start');
```

## Next

Переходим на следующий раздел:

```js
QuizForm.quiz('next');
```

## getStep

Переходим на следующий раздел минуя валидацию:

```js
QuizForm.quiz('getStep');
```

## Prev

Переходим на предыдущий раздел:

```js
QuizForm.quiz('prev');
```

## Submit

Отправляем форму:

```js
QuizForm.quiz('submit');
```

## validStep

Запускаем валидацию раздела:

```js
QuizForm.quiz('validStep');
```

## getResult

Получаем и показываем результат:

```js
QuizForm.quiz('getResult');
```

## reset

Сброс формы:

```js
QuizForm.quiz('reset');
```

## message

Показываем сообщение:

```js
QuizForm.quiz('message', 'success', 'УРА!!!');
QuizForm.quiz('message', 'error', 'Вы ошиблись!');
QuizForm.quiz('message', 'info', 'Здрасьте!');
```
