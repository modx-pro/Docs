# Snippet LxQuizList

Call uncached! Renders the list of available quizzes. You can filter items with a plugin on event `lxqBeforeListQuiz`.

## Parameters

### quizIds <Badge type="info" text="optional" />

Comma-separated quiz IDs. If set, output order matches this list.

### tpl <Badge type="info" text="optional" />

- Default: `lxQuizListTpl`

Output chunk (pdoFetch + Fenom).

### errorTpl <Badge type="info" text="optional" />

- Default: `lxQuizListTpl`

### where <Badge type="info" text="optional" />

Same as pdoTools where

### limit <Badge type="info" text="optional" />

Same as pdoTools limit

### quizPageId <Badge type="info" text="optional" />

ID of the page where the quiz is shown (where LxQuiz is used without quizId). If omitted, current page is used.

## Events

### lxqBeforeListQuiz

To hide a quiz from the list, in a plugin on `lxqBeforeListQuiz` set a non-empty value in `$modx->event->_output`.

Use this e.g. to hide quizzes the user has already passed, or quizzes the user is not allowed to take.

Example plugin:

```php
/**
 * Hides quiz with ID 1 from the list
 * @var lxqQuiz $quiz
 */

$modx->event->_output = $quiz && $quiz->id == 1;
return;
```
