# xParserOnFilterSourceItems

::: tip
Event available since version 1.8.12
:::

Fires right after fetching raw data from the source and splitting it into articles.

Fires in all cases: for subtasks, in "Return field value" mode, and otherwise.

Does not fire when nothing was fetched from the source, i.e. when `$items` is empty.

Allows adjusting the article list by changing the returned `$items` parameter.

## Parameters

- `xParser $xp` — main component class instance,
- `xpParser $parser` — parser class instance,
- `array $task` — task array,
- `array $items` — array of raw articles.
