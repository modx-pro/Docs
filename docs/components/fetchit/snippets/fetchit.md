---
title: Сниппет FetchIt
description: Параметры сниппета FetchIt, FormIt, файлы, pageId и property set
---

# Сниппет FetchIt

Сниппет выводит чанк формы, сохраняет параметры вызова под ключом action и регистрирует фронтенд-скрипт. При отправке `action.php` поднимает эти параметры, проверяет [защиту](/components/fetchit/protection) и запускает сниппет из `snippet` (по умолчанию FormIt).

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `form` | `tpl.FetchIt.example` | Чанк с разметкой формы. С pdoTools можно `@FILE`, `@INLINE` и Fenom |
| `snippet` | `FormIt` | Обработчик. Можно `FormIt@PropertySet` |
| `actionUrl` | `[[+assetsUrl]]action.php` | URL коннектора |
| `clearFieldsOnSuccess` | `1` | Очистить поля после успешного AJAX-ответа |

Остальные параметры уходят в указанный сниппет. Для FormIt это привычные `hooks`, `validate`, `emailTo`, `validationErrorMessage`, `successMessage`, `placeholderPrefix` и т.д.

`successMessage` при AJAX попадает в `message` ответа и в `[data-success]`.

## Пример

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &hooks=`email`
  &emailSubject=`Тема письма`
  &emailTo=`info@domain.com`
  &validate=`name:required,email:required`
  &validationErrorMessage=`В форме содержатся ошибки!`
  &successMessage=`Сообщение успешно отправлено!`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Тема письма',
  'emailTo' => 'info@domain.com',
  'validate' => 'name:required,email:required',
  'validationErrorMessage' => 'В форме содержатся ошибки!',
  'successMessage' => 'Сообщение успешно отправлено!',
]}
```

:::

## FormIt и reCAPTCHA

Ошибки `recaptcha`, `recaptchav2_error`, `recaptchav3_error` из FormIt в AJAX-ответе схлопываются в один ключ `data.recaptcha`. В разметке используйте `data-error="recaptcha"`. После успеха клиент вызывает `grecaptcha.reset()`, если виджет на странице есть.

::: warning
reCAPTCHA из FormIt 5.2 получает ответ через `formit.js`, который в формах FetchIt отключается вместе с AJAX-режимом FormIt. Для таких форм включайте капчу настройкой [`fetchit.captcha`](/components/fetchit/protection#kapcha).
:::

## FormIt и property set

::: code-group

```modx
[[!FetchIt?
  &snippet=`FormIt@ContactForm`
  &form=`tpl.contact`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'FormIt@ContactForm',
  'form' => 'tpl.contact',
]}
```

:::

Параметры property set сливаются с вызовом. Явные параметры FetchIt имеют приоритет при подготовке `$scriptProperties` для сниппета.

## Файлы и контекст

Клиент шлёт `FormData` (включая файлы) на `actionUrl` с заголовком `X-FetchIt-Action`. В тело добавляется `pageId`: ID ресурса, с которого вызван сниппет. Коннектор может переключить контекст MODX по этому ID.

Пустой POST на `action.php` без action ведёт на стартовую страницу сайта.

## Служебные поля

Сразу после тега формы сниппет добавляет скрытые поля [защиты от спама](/components/fetchit/protection): токен, при включённом proof-of-work — поле для решения, и поле-ловушку. Из `$_POST` они убираются до FormIt или вашего сниппета, так что в письма и в `fields` они не попадают.

Сниппет также сам дописывает форме `method="post"` и атрибут `data-fetchit`, если их нет.

## Где хранятся параметры action

Ключ action: md5 от параметров вызова. Свойства пишутся в `$_SESSION['FetchIt'][$action]` или в cache `fetchit/props_*` на час. Если сессии на фронте отключены или кэш чистят агрессивно, ответ может быть `fetchit_err_action_nf`. Проверьте сессии и TTL кэша.

## Чанк без pdoTools

Если pdoTools установлен, чанк рендерится через него. Иначе используется `modX::getChunk`.
