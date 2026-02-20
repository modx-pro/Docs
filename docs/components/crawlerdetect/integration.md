---
title: Интеграция
---
# Интеграция

Защита форм, скрытие контента от ботов и типовые сценарии использования CrawlerDetect.

## Защита форм от спама

### Как это работает

1. Пользователь отправляет форму.
2. FormIt вызывает preHook `crawlerDetectBlock` **до** валидации и отправки.
3. Если User-Agent — бот → форма не обрабатывается, показывается сообщение из настройки.
4. Если человек → форма обрабатывается как обычно.

Подробнее: [crawlerDetectBlock](snippets/crawlerDetectBlock).

### Обычная форма (FormIt)

Добавьте `crawlerDetectBlock` в `&preHooks` вызова FormIt. Если уже есть другие preHooks — перечислите через запятую:

::: code-group

```modx
&preHooks=`crawlerDetectBlock,другойХук`
```

```fenom
'preHooks' => 'crawlerDetectBlock,другойХук'
```

:::

### AJAX-форма (FetchIt)

FetchIt обрабатывает формы через FormIt на сервере. Чтобы защитить форму:

1. В конфигурации FetchIt укажите URL/страницу, где вызывается FormIt.
2. В вызов FormIt на этой странице добавьте ``&preHooks=`crawlerDetectBlock` ``.
3. При блокировке ботом FetchIt получит ответ с ошибкой и покажет сообщение из настройки `crawlerdetect_block_message`.

### AJAX-форма (SendIt)

SendIt обрабатывает формы через FormIt; параметры вызова задаются в пресетах (файл из настройки **si_path_to_presets**). Чтобы защитить форму:

1. Откройте файл пресетов (свою копию, не стандартный `core/components/sendit/presets/sendit.inc.php` — при обновлении SendIt он перезаписывается).
2. Добавьте в нужный пресет `preHooks` с `crawlerDetectBlock`.
3. При блокировке ботом SendIt вернёт ошибку и покажет сообщение из настроек CrawlerDetect.

**Пример пресета:**

```php
return [
  'contact' => [
    'preHooks' => 'crawlerDetectBlock',
    'hooks' => 'email,FormItSaveForm',
    'validate' => 'name:required,email:email:required',
    'emailTo' => 'manager@site.ru',
    'emailSubject' => 'Обратная связь',
    // ...
  ],
];
```

Если `preHooks` уже есть, перечислите через запятую: `'preHooks' => 'crawlerDetectBlock,другойХук'`.

## Скрытие контента от ботов

Сниппет **isCrawler** возвращает `"1"` (бот) или `"0"` (не бот). Вызывайте его **без кэша** и используйте для условного вывода.

### Виджет только для людей

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[$chatWidget]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->getChunk('chatWidget')}
{/if}
```

:::

### Аналитика только для людей

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[$googleAnalytics]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->getChunk('googleAnalytics')}
{/if}
```

:::

Подробнее: [isCrawler](snippets/isCrawler).

## Типовые сценарии

### Контактная форма

Добавьте `crawlerDetectBlock` в preHooks FormIt. См. [Быстрый старт](quick-start).

### Несколько форм на сайте

Один и тот же preHook можно использовать для всех форм. В каждом вызове FormIt добавьте `crawlerDetectBlock` в `&preHooks`.

### Счётчик «N человек на сайте»

Вызывайте сниппет счётчика только когда посетитель не бот:

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[!yourVisitorCounterSnippet]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->runSnippet('yourVisitorCounterSnippet', [])}
{/if}
```

:::

### Форма «Заказать звонок» (FetchIt)

1. Убедитесь, что FetchIt настроен на вызов FormIt на сервере.
2. В FormIt на странице назначения добавьте ``&preHooks=`crawlerDetectBlock` ``.
3. При блокировке ботом FetchIt покажет сообщение из настроек CrawlerDetect.

### E-commerce — «Смотрят этот товар»

Не учитывать ботов в счётчике просмотров товара:

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[!msProductViews? &id=`[[*id]]`]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->runSnippet('msProductViews', ['id' => $productId])}
{/if}
```

:::
