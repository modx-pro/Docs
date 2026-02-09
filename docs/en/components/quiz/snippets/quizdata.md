# QuizData snippet

Outputs filled form data. Mainly used for email content.

## Parameters

- **id** - quiz id.
- **param** - form params for getting answers as array.

## Example

```fenom
{'!QuizData' | snippet: [
  'id' => 2,
  'param' => [
    'earth' => 'ball',
  ],
] | print}
```

Response:

```php
Array
(
  [0] => Array
    (
      [question] => What shape is Earth?
      [answer] => Sphere
      [name] => earth
    )
)
```
