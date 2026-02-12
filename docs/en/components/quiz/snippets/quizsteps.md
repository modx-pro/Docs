# QuizSteps

Snippet for outputting quiz sections.

## Parameters

- **id** - Quiz ID.
- **tplOuter** - Wrapper chunk for sections. Default: `@INLINE <ul class="quiz-steps">{$wrapper}</ul>`
- **tpl** - Section chunk. Default: `@INLINE <li data-step="step-{$id}">{$title}</li>`
- **where** - Conditions for output. Available chunk (tpl) placeholders:
  - **{$id}** - Section ID
  - **{$idx}** - Section index
  - **{$filter}** - GET parameter
  - **{$title}** - Title
  - **{$description}** - Description
  - **{$img}** - Image
  - **{$content}** - Content
  - **{$value_success}** - Correct answer value
  - **{$success}** - Message on correct answer
  - **{$error}** - Message on wrong answer
  - **{$question}** - Question ID for condition
  - **{$answer}** - Answer ID for condition

## Example

Output all sections that have no conditions:

```fenom
{'!QuizSteps' | snippet: [
  'id' => 2,
  'where' => [
    'question:<' => '1'
  ]
]}
```
