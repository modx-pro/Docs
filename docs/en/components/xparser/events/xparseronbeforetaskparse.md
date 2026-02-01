# xParserOnBeforeTaskParse

Fires after getting page data and parsing it into an article list. Before processing the field list.

Fires only when it is not a subtask and not in "Return field value" mode.

**Since version 1.8.11** allows adjusting the article list by changing the returned `$items` parameter.

## Parameters

- `xParser $xp` — main component class instance,
- `xpParser $parser` — parser class instance,
- `array $task` — task array,
- `array $items` — array of raw articles,
- `array $fields` — array of fields for processing articles and extracting data.
