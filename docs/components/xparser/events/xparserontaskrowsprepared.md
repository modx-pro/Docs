# xParserOnTaskRowsPrepared

**Событие доступно с версии 1.11.8**.

После формирования обработанных данных ресурса, но **перед** скачиванием медиа-контента.

Одно из интересных событий, т.к. позволяет менять данные статей, возвращая массив `$rows` в плагине:

```$modx->event->returnedValues['rows'] = $rows;```


## Параметры

- `xParser $xp` — экземпляр основного класса компонента,
- `xpParser $parser` — экземпляр класса парсера,
- `array $task` — массив задания,
- `array $rows` — массив со списком обработанных статей.
