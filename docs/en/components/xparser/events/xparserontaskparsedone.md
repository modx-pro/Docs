# xParserOnTaskParseDone

**Event available since version 1.8.15**.

Fires when the parsing task finishes.

Fires once if pagination is off or when using pagination mode _"Collect all data first, then perform resource actions"_.

Fires for each page when using pagination mode _"Perform resource actions as pages are visited"_.

## Parameters

- `xParser $xp` — main component class instance,
- `xpParser $parser` — parser class instance,
- `array $task` — task array,
- `array $stats` — array with task execution statistics.
