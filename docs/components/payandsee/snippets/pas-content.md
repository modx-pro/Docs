# pas.content

Сниппет для вывода контента `pas.content`

![Сниппет для вывода контента](https://file.modx.pro/files/a/8/c/a8cc2deec25e633e863ed7794541efbb.png)

## Параметры

| Параметр            | По умолчанию  | Описание                                                                                                                                                  |
| ------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **tpl**             | `pas.content` | Чанк оформления для каждого результата                                                                                                                    |
| **parents**         |               | Список категорий, через запятую, для поиска результатов. По умолчанию выборка ограничена текущим родителем. Если поставить 0 - выборка не ограничивается. |
| **status**          | `2`           | Статус подписки                                                                                                                                           |
| **content**         |               | Контент подписки                                                                                                                                          |
| **limit**           | `10`          | Лимит выборки результатов                                                                                                                                 |
| **offset**          |               | Пропуск результатов с начала выборки                                                                                                                      |
| **depth**           | `10`          | Глубина поиска ресурса от каждого родителя.                                                                                                               |
| **sortby**          | `id`          | Сортировка выборки.                                                                                                                                       |
| **sortdir**         | `ASC`         | Направление сортировки                                                                                                                                    |
| **where**           |               | Строка, закодированная в JSON, с дополнительными условиями выборки.                                                                                       |
| **showUnpublished** |               | Показывать неопубликованные ресурсы.                                                                                                                      |
| **showDeleted**     |               | Показывать удалённые ресурсы.                                                                                                                             |
| **showHidden**      | `1`           | Показывать ресурсы, скрытые в меню.                                                                                                                       |
| **includeContent**  |               | Выбирать поле "content" у ресурса.                                                                                                                        |
| **showEmptyRate**   | `1`           | Показывать контент с нулевой ценой.                                                                                                                       |
| **processRates**    | `1`           | Обрабатывать стоимость контента                                                                                                                           |
| **sortRates**       |               | Указывает как сортировать цены. Передаются json строкой, например, "{"PasRate.cost":ASC}"                                                                 |

::: tip
Можно использовать и другие [общие параметры pdoTools][0104]
:::

## Особенности

Сниппет `pas.content`, как и все сниппеты PayAndSee, использует pdoTools для работы.
Поэтому все основные его параметры совпадают с [pdoResources][010101], но есть и особенности.

### Получение тарифов

Сниппет умеет выбирать тарифы при помощи параметра **processRates**

```fenom
{'!pas.content' | snippet : [
  'processRates' => 1,
]}
```

и вы получите массив `rates` в чанке.

### Плейсхолдеры

Вы можете увидеть все доступные плейсхолдеры просто не указывая чанк оформления:

```fenom
<pre>
  {'!pas.content' | snippet : [
    'tpl' => '',
  ]}
</pre>
```

## Примеры

Вывод контента из категории 15:

```fenom
{'!pas.content' | snippet : [
  'parents' => 15,
]}
```

Вывод с постраничной разбивкой:

```fenom
{'!pdoPage' | snippet : [
  'element' => 'pas.content',
  'parents' => 15,
]}
{'page.nav' | placeholder}
```

[0104]: /components/pdotools/general-properties
[010101]: /components/pdotools/snippets/pdoresources
