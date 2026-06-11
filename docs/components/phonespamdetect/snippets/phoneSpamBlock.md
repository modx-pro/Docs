---
title: phoneSpamBlock
---
# PreHook phoneSpamBlock

PreHook для FormIt. Не пускает форму дальше, если телефон невалидный или страна не из белого списка. Пользователь видит текст из `phonespamdetect_block_message`.

Добавьте `phoneSpamBlock` в **preHooks**. Уже есть другие хуки — через запятую: `phoneSpamBlock,другойХук`.

## Как работает

1. Отправка формы.
2. FormIt вызывает хук до validate.
3. Номер из поля проверяется libphonenumber.
4. Отказ — сообщение в `fi.validation_error_message`, дальше FormIt не идёт.
5. Ок — обычная цепочка hooks.

## Параметры

| Параметр | По умолчанию |
|----------|--------------|
| **phoneField** | `phonespamdetect_phone_field` (обычно `phone`) |

## Текст ошибки

Меняется в **Системные настройки** → `phonespamdetect_block_message`. Дефолт: «Не удалось отправить форму. Укажите другой номер телефона.»

В шаблоне:

- MODX: `[[+fi.validation_error_message]]`
- Fenom: `{$modx->getPlaceholder('fi.validation_error_message')}`

## Примеры

::: code-group

```modx
[[!FormIt?
  &preHooks=`phoneSpamBlock`
  &hooks=`email,redirect`
  &validate=`name:required,phone:required,email:required:email`
]]
[[+fi.validation_error_message]]
<form method="post">
  <input type="tel" name="phone" value="[[+fi.phone]]" />
  ...
</form>
```

```fenom
{$modx->runSnippet('FormIt', [
  'preHooks' => 'phoneSpamBlock',
  'hooks' => 'email,redirect',
  'validate' => 'name:required,phone:required,email:required:email'
])}
{if $modx->getPlaceholder('fi.validation_error_message')}
  <div class="error">{$modx->getPlaceholder('fi.validation_error_message')}</div>
{/if}
<form method="post">
  <input type="tel" name="phone" value="{$modx->getPlaceholder('fi.phone')}" />
  ...
</form>
```

:::

### Поле mobile вместо phone

::: code-group

```modx
[[!FormIt?
  &preHooks=`phoneSpamBlock`
  &phoneField=`mobile`
  &validate=`mobile:required`
]]
```

```fenom
{$modx->runSnippet('FormIt', [
  'preHooks' => 'phoneSpamBlock',
  'phoneField' => 'mobile',
  'validate' => 'mobile:required'
])}
```

:::

### CrawlerDetect + CAPTCHA

::: code-group

```modx
&preHooks=`crawlerDetectBlock,phoneSpamBlock,recaptcha`
```

```fenom
'preHooks' => 'crawlerDetectBlock,phoneSpamBlock,recaptcha'
```

:::

Сначала бот, потом телефон, потом капча.

## FetchIt, SendIt, AjaxForm

**FetchIt** — `phoneSpamBlock` в FormIt на той странице, куда летит запрос.

**SendIt** — `'preHooks' => 'phoneSpamBlock'` в пресете. [Подробнее](../integration#sendit).

**AjaxForm** — сработает, если на сервере форма всё равно обрабатывается FormIt.
