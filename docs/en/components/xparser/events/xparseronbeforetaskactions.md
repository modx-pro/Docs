# xParserOnBeforeTaskActions

Fires after building the article list with subtask data. Before adding resources.

_Perhaps the most useful event, as it allows changing article data or stopping the parsing task entirely without adding anything._

## Parameters

- `xParser $xp` — main component class instance,
- `xpParser $parser` — parser class instance,
- `array $task` — task array,
- `array $rows` — array of processed articles.
