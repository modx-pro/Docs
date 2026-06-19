---
title: Быстрый старт
---
# Быстрый старт

Подключение к обычной контактной форме занимает пару минут.

## 1. Страница с формой

Откройте в редакторе MODX ресурс, где уже стоит FormIt и есть поле телефона.

## 2. preHook в FormIt

В вызов FormIt добавьте `phoneSpamBlock` в **preHooks**:

::: code-group

```modx
[[!FormIt?
  &preHooks=`phoneSpamBlock`
  &hooks=`email,redirect`
  &validate=`name:required,phone:required,email:required:email`
  &redirectTo=`[[*id]]`
  &emailTo=`[[++emailsender]]`
  &emailSubject=`Обратная связь`
]]
[[+fi.validation_error_message]]
<form action="[[~[[*id]]]]" method="post">
  <input type="text" name="name" value="[[+fi.name]]" />
  <input type="tel" name="phone" value="[[+fi.phone]]" />
  <input type="email" name="email" value="[[+fi.email]]" />
  <button type="submit" name="submit">Отправить</button>
</form>
```

```fenom
{$modx->runSnippet('FormIt', [
  'preHooks' => 'phoneSpamBlock',
  'hooks' => 'email,redirect',
  'validate' => 'name:required,phone:required,email:required:email',
  'redirectTo' => $modx->resource->id,
  'emailTo' => $modx->getOption('emailsender'),
  'emailSubject' => 'Обратная связь'
])}
{if $modx->getPlaceholder('fi.validation_error_message')}
  <div class="error">{$modx->getPlaceholder('fi.validation_error_message')}</div>
{/if}
<form action="{$modx->makeUrl($modx->resource->id)}" method="post">
  <input type="text" name="name" value="{$modx->getPlaceholder('fi.name')}" />
  <input type="tel" name="phone" value="{$modx->getPlaceholder('fi.phone')}" />
  <input type="email" name="email" value="{$modx->getPlaceholder('fi.email')}" />
  <button type="submit" name="submit">Отправить</button>
</form>
```

:::

Из коробки режутся невалидные номера и всё, что не из `RU`. Текст ошибки берётся из `phonespamdetect_block_message` и выводится через `[[+fi.validation_error_message]]` или `{$modx->getPlaceholder('fi.validation_error_message')}`. Подробнее про настройки — на [отдельной странице](settings).

## 3. Другие страны (если нужно)

В `phonespamdetect_allowed_regions` перечислите ISO-коды через запятую:

```text
RU,KZ,BY
```

Пустое значение = любой валидный номер, без ограничения по стране.

## 4. Сохранить

Готово. Форма не пропустит мусорный телефон и номер из запрещённого региона.

---

Куда смотреть дальше:

- [Настройки](settings)
- [Сниппеты](snippets/)
- [Интеграция](integration) — FetchIt, SendIt, CrawlerDetect
- [Если что-то не работает](troubleshooting)
