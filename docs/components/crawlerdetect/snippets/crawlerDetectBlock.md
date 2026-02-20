---
title: crawlerDetectBlock
---
# PreHook crawlerDetectBlock

PreHook для FormIt: блокирует отправку формы, если запрос пришёл от бота (по User-Agent). Форма не валидируется и не обрабатывается дальше; пользователю показывается сообщение из настройки.

**Использование:** добавьте `crawlerDetectBlock` в параметр **preHooks** вызова FormIt.

Если у вас уже есть другие preHooks, перечислите их через запятую: `crawlerDetectBlock,другойХук`.

## Как это работает

1. Пользователь отправляет форму.
2. FormIt вызывает preHook `crawlerDetectBlock` **до** валидации и отправки.
3. Если User-Agent — бот → форма не обрабатывается, показывается сообщение из настройки `crawlerdetect_block_message`.
4. Если человек → форма обрабатывается как обычно.

## Сообщение при блокировке

Текст настраивается в **Системные настройки** → `crawlerdetect_block_message`. По умолчанию: «Не удалось отправить форму. Попробуйте позже.»

Вывод в шаблоне формы — через плейсхолдер FormIt:

- **MODX:** `[[+fi.validation_error_message]]`
- **Fenom:** `{$modx->getPlaceholder('fi.validation_error_message')}`

## Примеры

::: code-group

```modx
[[!FormIt?
  &preHooks=`crawlerDetectBlock`
  &hooks=`email,redirect`
]]
[[+fi.validation_error_message]]
<form method="post">...</form>
```

```fenom
{$modx->runSnippet('FormIt', [
  'preHooks' => 'crawlerDetectBlock',
  'hooks' => 'email,redirect'
])}
{if $modx->getPlaceholder('fi.validation_error_message')}
  <div class="error">{$modx->getPlaceholder('fi.validation_error_message')}</div>
{/if}
<form method="post">...</form>
```

:::

### Несколько preHooks (например, с CAPTCHA)

::: code-group

```modx
&preHooks=`crawlerDetectBlock,recaptcha`
```

```fenom
'preHooks' => 'crawlerDetectBlock,recaptcha'
```

:::

CrawlerDetect сработает первым и отсечёт ботов до CAPTCHA.

## Совместимость

- **FetchIt** — если FetchIt отправляет данные на страницу с FormIt, добавьте `crawlerDetectBlock` в preHooks FormIt на этой странице. При блокировке ботом FetchIt получит ответ с ошибкой и покажет сообщение из настроек CrawlerDetect.
- **SendIt** — параметры FormIt задаются в пресетах (файл из настройки `si_path_to_presets`). Добавьте в пресет `'preHooks' => 'crawlerDetectBlock'`. При блокировке ботом SendIt вернёт ошибку и покажет сообщение из настроек CrawlerDetect. Подробнее: [Интеграция → SendIt](../integration#ajax-форма-sendit).
- **AjaxForm** — если AjaxForm вызывает FormIt на сервере, добавьте `crawlerDetectBlock` в preHooks FormIt — защита будет работать.
