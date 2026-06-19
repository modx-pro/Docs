---
title: isSpamPhone
---
# Сниппет isSpamPhone

Проверяет номер через libphonenumber. Удобен для шаблонов, отладки и когда нужен E.164 без отправки формы.

**Ответ:** `"1"` — блокировать, `"0"` — пропустить (или проверка недоступна).

Вызывайте без кэша: `[[!isSpamPhone]]` или `$modx->runSnippet('isSpamPhone', ...)`.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **phone** | Номер для проверки | — |
| **placeholderPrefix** | Префикс плейсхолдеров | `phonespamdetect.` |

После вызова:

| Плейсхолдер | Смысл |
|-------------|--------|
| `.normalized` | Только цифры |
| `.reason` | `allowed`, `invalid_number`, `region_not_allowed`, `validator_unavailable_fail_open` |
| `.valid` | Валиден по libphonenumber |
| `.region` | ISO страны |
| `.e164` | Например `+79991234567` |

## Примеры

### Один номер

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

### Разобрать результат

::: code-group

```modx
[[!isSpamPhone? &phone=`+7 (999) 123-45-67`]]
Регион: [[+phonespamdetect.region]]
E.164: [[+phonespamdetect.e164]]
Причина: [[+phonespamdetect.reason]]
```

```fenom
{set $isBlocked = $modx->runSnippet('isSpamPhone', [
  'phone' => '+7 (999) 123-45-67'
])}
{if $isBlocked == '1'}
  Не прошёл: {$modx->getPlaceholder('phonespamdetect.reason')}
{else}
  {$modx->getPlaceholder('phonespamdetect.e164')}
{/if}
```

:::

### Свой префикс (несколько номеров на странице)

::: code-group

```modx
[[!isSpamPhone?
  &phone=`+7 (999) 123-45-67`
  &placeholderPrefix=`lead_phone.`
]]
[[+lead_phone.region]]
```

```fenom
{$modx->runSnippet('isSpamPhone', [
  'phone' => '+7 (999) 123-45-67',
  'placeholderPrefix' => 'lead_phone.'
])}
{$modx->getPlaceholder('lead_phone.region')}
```

:::

## Из PHP

```php
$service = $modx->services->get('PhoneSpamDetect\\PhoneSpamDetectService');
$isSpam = $service->isSpamPhone('+7 (999) 123-45-67');
$check = $service->getLastCheck();
```
