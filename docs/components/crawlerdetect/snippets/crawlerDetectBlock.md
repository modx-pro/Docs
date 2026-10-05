---
title: crawlerDetectBlock
---
# PreHook crawlerDetectBlock

PreHook FormIt: блокирует отправку, если библиотека считает запрос ботом. Без явного UA смотрит заголовки JayBizzle, не только `User-Agent`.

Добавьте хук в `&preHooks` FormIt. Прямой вызов `[[!crawlerDetectBlock]]` возвращает `"1"` / `"0"`, как `isCrawler`.

Если сервис недоступен, хук возвращает `true` и форма уходит.

Другие preHooks перечислите через запятую: `crawlerDetectBlock,другойХук`.

## Как это работает

1. Пользователь отправляет форму.
2. FormIt вызывает preHook `crawlerDetectBlock` **до** валидации и отправки.
3. Если бот, хук возвращает `false`, пишет `fi.validation_error_message` и `$hook->addError('crawlerdetect', …)`.
4. Если человек, хук возвращает `true`.

## Сообщение при блокировке

Текст задаётся в **Системные настройки** → `crawlerdetect_block_message`. По умолчанию: «Не удалось отправить форму. Попробуйте позже.»

В шаблоне формы выведите плейсхолдер FormIt:

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
{$modx->getPlaceholder('fi.validation_error_message')}
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

CrawlerDetect стоит первым в списке и отсечёт ботов до CAPTCHA.

## Совместимость

- **FetchIt.** Если FetchIt отправляет данные на страницу с FormIt, добавьте `crawlerDetectBlock` в preHooks FormIt на этой странице. При блокировке ботом FetchIt получит ответ с ошибкой и покажет сообщение из настроек CrawlerDetect.
- **SendIt.** Параметры FormIt задаются в пресетах (файл из настройки `si_path_to_presets`). Добавьте в пресет `'preHooks' => 'crawlerDetectBlock'`. При блокировке ботом SendIt вернёт ошибку и покажет сообщение из настроек CrawlerDetect. Подробнее: [Интеграция → SendIt](../integration#ajax-форма-sendit).
- **AjaxForm.** Если AjaxForm вызывает FormIt на сервере, добавьте `crawlerDetectBlock` в preHooks FormIt.
