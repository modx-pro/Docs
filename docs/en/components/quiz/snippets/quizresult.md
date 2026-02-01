# QuizResult snippet

Outputs saved quiz results.

## Parameters

- **quiz** - quiz id.
- **where** - select conditions.
- **tplOuter** - section wrapper chunk. Default: `@INLINE {$wrapper}`
- **tpl** - section field chunk.
- **tplFooter** - chunk for footer of all sections.

### Chunk placeholders

#### tplOuter

- **wrapper** - section with all fields.
- **title** - section (question) title
- **total** - result count

#### tpl

- **question** - question
- **value** - answer count for this question
- **total** - result count
- **procent** - percentage

#### tplFooter

- **total** - result count

## Example

```fenom
{'!QuizResult' | snippet: [
  'quiz' => 1,
  'tplOuter' => '@INLINE <h3>{$title}</h3><table class="table table-striped">{$wrapper}</table>',
  'tpl' => '@INLINE <tr><td>{$procent}% {$question}</td><td>{$value}</td></tr>',
  'tplFooter' => '@INLINE <p>{$total} users voted</p>',
]}
```