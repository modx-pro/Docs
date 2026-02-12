# xParserOnAfterPagesCollected

**Event available since version 1.11.25**.

Fires after visiting all pages and getting processed fields, but **before** getting subtask fields.

One of the most useful events, as it allows changing article data by returning the `$rows` array in a plugin:

```$modx->event->returnedValues['rows'] = $rows;```

## Parameters

- `xParser $xp` — main component class instance,
- `xpParser $parser` — parser class instance,
- `array $task` — task array,
- `array $rows` — array of processed articles.
