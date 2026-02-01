# Methods

Available methods:

```js
let QuizForm = $('#quiz');
```

## Start

Show first section:

```js
QuizForm.quiz('start');
```

## Next

Go to next section:

```js
QuizForm.quiz('next');
```

## getStep

Go to next section without validation:

```js
QuizForm.quiz('getStep');
```

## Prev

Go to previous section:

```js
QuizForm.quiz('prev');
```

## Submit

Submit form:

```js
QuizForm.quiz('submit');
```

## validStep

Run section validation:

```js
QuizForm.quiz('validStep');
```

## getResult

Get and show result:

```js
QuizForm.quiz('getResult');
```

## reset

Reset form:

```js
QuizForm.quiz('reset');
```

## message

Show message:

```js
QuizForm.quiz('message', 'success', 'Success!');
QuizForm.quiz('message', 'error', 'Wrong answer!');
QuizForm.quiz('message', 'info', 'Hello!');
```
