# xParserOnBeforeTaskParse

После получения данных страницы и разбора её на список статей для парсинга. Перед обработкой списка полей.

Срабатывает, только если это не подзадача и не в режиме "Вернуть значение поля".

**С версии 1.8.11** позволяет скорректировать список статей для парсинга изменив возвращаемый параметр `$items`.

## Параметры

- `xParser $xp` — экземпляр основного класса компонента,
- `xpParser $parser` — экземпляр класса парсера,
- `array $task` — массив задания,
- `array $items` — массив со списком необработанных статей,
- `array $fields` — массив со списком полей для обработки статей и получения необходимых данных.
