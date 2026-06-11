---
title: Интеграция
---
# Интеграция

FormIt, AJAX-обёртки, проверка номера в шаблоне и пара частых кейсов.

## FormIt

### Порядок работы

1. Отправка формы.
2. FormIt дергает `phoneSpamBlock` до validate и hooks.
3. libphonenumber смотрит номер из поля формы.
4. Плохой номер или чужая страна — стоп, сообщение из настройки.
5. Всё ок — FormIt идёт дальше как обычно.

Подробности по хуку: [phoneSpamBlock](snippets/phoneSpamBlock).

### Обычная форма

В `&preHooks` добавьте `phoneSpamBlock`. Несколько хуков — через запятую:

::: code-group

```modx
&preHooks=`phoneSpamBlock,другойХук`
```

```fenom
'preHooks' => 'phoneSpamBlock,другойХук'
```

:::

### Поле не называется phone

По умолчанию читается `phone`. Переименовать можно глобально (`phonespamdetect_phone_field`) или только в этом вызове:

::: code-group

```modx
[[!FormIt?
  &preHooks=`phoneSpamBlock`
  &phoneField=`mobile`
  &validate=`name:required,mobile:required,email:required:email`
]]
```

```fenom
{$modx->runSnippet('FormIt', [
  'preHooks' => 'phoneSpamBlock',
  'phoneField' => 'mobile',
  'validate' => 'name:required,mobile:required,email:required:email'
])}
```

:::

### FetchIt

FetchIt на сервере всё равно упирается в FormIt.

1. Укажите в FetchIt страницу, где крутится FormIt.
2. На этой странице в FormIt добавьте ``&preHooks=`phoneSpamBlock` ``.
3. Имя поля телефона должно совпадать с `phonespamdetect_phone_field` или с `phoneField`.
4. При отказе FetchIt покажет текст из `phonespamdetect_block_message`.

### SendIt

SendIt тоже ходит в FormIt. Параметры лежат в пресетах — файле из **si_path_to_presets**.

1. Откройте **свою** копию пресетов, не `core/components/sendit/presets/sendit.inc.php` (его SendIt затрёт при обновлении).
2. В нужный пресет добавьте `preHooks` с `phoneSpamBlock`.
3. Если поле не `phone` — пропишите `phoneField`.

Пример:

```php
return [
  'contact' => [
    'preHooks' => 'phoneSpamBlock',
    'phoneField' => 'phone',
    'hooks' => 'email,FormItSaveForm',
    'validate' => 'name:required,phone:required,email:email:required',
    'emailTo' => 'manager@site.ru',
    'emailSubject' => 'Обратная связь',
    // ...
  ],
];
```

Несколько preHooks: `'preHooks' => 'phoneSpamBlock,другойХук'`.

## isSpamPhone в шаблоне

Возвращает `"1"` — блокировать, `"0"` — можно. Без кэша: `[[!isSpamPhone]]`.

Проверка конкретного номера:

::: code-group

```modx
[[!isSpamPhone? &phone=`+7 (999) 123-45-67`]]
```

```fenom
{$modx->runSnippet('isSpamPhone', [
  'phone' => '+7 (999) 123-45-67'
])}
```

:::

Нормализованный номер после проверки:

::: code-group

```modx
[[!isSpamPhone? &phone=`[[+fi.phone]]`]]
E.164: [[+phonespamdetect.e164]]
```

```fenom
{set $isBlocked = $modx->runSnippet('isSpamPhone', [
  'phone' => $modx->getPlaceholder('fi.phone')
])}
{if $isBlocked == '1'}
  Не прошёл: {$modx->getPlaceholder('phonespamdetect.reason')}
{else}
  {$modx->getPlaceholder('phonespamdetect.e164')}
{/if}
```

:::

Ещё примеры: [isSpamPhone](snippets/isSpamPhone).

## Частые кейсы

**Только РФ** — дефолтные `default_region` и `allowed_regions` = `RU`, плюс `phoneSpamBlock` в FormIt. См. [быстрый старт](quick-start).

**РФ + KZ + BY** — в `phonespamdetect_allowed_regions`:

```text
RU,KZ,BY
```

**Любая страна, но формат должен быть нормальный** — очистите `phonespamdetect_allowed_regions`.

**Разные имена поля в разных формах** — глобально оставьте `phone`, локально переопределяйте `phoneField`.

**Вместе с CrawlerDetect** — оба preHook в одной строке, бота лучше резать первым:

::: code-group

```modx
&preHooks=`crawlerDetectBlock,phoneSpamBlock`
```

```fenom
'preHooks' => 'crawlerDetectBlock,phoneSpamBlock'
```

:::

**С CAPTCHA** — в конец цепочки:

::: code-group

```modx
&preHooks=`crawlerDetectBlock,phoneSpamBlock,recaptcha`
```

```fenom
'preHooks' => 'crawlerDetectBlock,phoneSpamBlock,recaptcha'
```

:::

**«Заказать звонок» на FetchIt** — на целевой странице FormIt с `phoneSpamBlock` в preHooks, FetchIt сам подхватит ошибку.
