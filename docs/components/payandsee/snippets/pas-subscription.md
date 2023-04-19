# pas.subscription

Сниппет для вывода подписок `pas.subscription`

![Сниппет для вывода подписок](https://file.modx.pro/files/6/7/a/67a4c2f286f8a304b135ef555203f755.png)

## Параметры

| Параметр        | По умолчанию       | Описание                                                            |
| --------------- | ------------------ | ------------------------------------------------------------------- |
| **tpl**         | `pas.subscription` | Чанк оформления для каждого результата                              |
| **status**      |                    | Статус подписки                                                     |
| **client**      |                    | Клиент подписки                                                     |
| **content**     |                    | Контент подписки                                                    |
| **limit**       | `10`               | Лимит выборки результатов                                           |
| **sortby**      | `id`               | Сортировка выборки.                                                 |
| **sortdir**     | `ASC`              | Направление сортировки                                              |
| **where**       |                    | Строка, закодированная в JSON, с дополнительными условиями выборки. |
| **showOverdue** | `0`                | Показывать законченные подписки.                                    |

::: tip
Можно использовать и другие [общие параметры pdoTools][0104]
:::

## Особенности

Сниппет `pas.subscription`, как и все сниппеты PayAndSee, использует pdoTools для работы.
Поэтому все основные его параметры совпадают с [pdoResources][010101], но есть и особенности.

### Получить подписки текущего пользователя

```fenom
{'!pas.subscription' | snippet}
```

### Плейсхолдеры

Вы можете увидеть все доступные плейсхолдеры просто не указывая чанк оформления:

```fenom
<pre>
  {'!pas.subscription' | snippet : [
    'tpl' => '',
  ]}
</pre>
```

## Примеры

Получить подписки текущего пользователя в переменную `$rows`

```fenom
{var $rows = '!pas.subscription' | snippet : [
  'return' => 'data',
]}
<br>
{if !count($rows)}
  <p>У вас нет активных подписок.</p>
{else}
  {foreach $rows as $row}
    {'pas.subscription' | chunk : $row}
  {/foreach}
{/if}
```

Вывод с постраничной разбивкой:

```fenom
{'!pdoPage' | snippet : [
  'element' => 'pas.subscription',
  'client' => $_modx->user.id,
]}
{'page.nav' | placeholder}
```

[0104]: /components/pdotools/general-properties
[010101]: /components/pdotools/snippets/pdoresources
