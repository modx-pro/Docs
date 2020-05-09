# QuizResult

Сниппет предназначен для вывода сохраненных результатов.

## Параметры сниппета:

- **quiz** - id квиза.
- **where** - условия выборки.
- **tplOuter** - чанк-обёртка раздела. По умолчанию: @INLINE {$wrapper}
- **tpl** - чанк для полей раздела.
- **tplFooter** - чанк для футера всех разделов.

### Плейсхолдеры чанков:

#### tplOuter

 - **wrapper** - раздел со всеми полями.
 - **title** - заголовок раздела(вопроса)
 - **total** - кол-во результатов 

#### tpl

 - **question** - вопрос
 - **value** - кол-во ответов на данный вопрос
 - **total** - кол-во результатов 
 - **procent** - процент 

#### tplFooter

  - **total** - кол-во результатов 

## Пример:

```php
{'!QuizResult' | snippet: [
  'quiz' => 1,
  'tplOuter' => '@INLINE <h3>{$title}</h3><table class="table table-striped">{$wrapper}</table>',
  'tpl' => '@INLINE <tr><td>{$procent}% {$question}</td><td>{$value}</td></tr>',
  'tplFooter' => '@INLINE <p>Проголосовали {$total} пользователей</p>'
]}
