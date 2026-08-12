---
title: Селекторы
description: data-fetchit, data-error, data-custom, data-success и data-validation-error
---

# Селекторы

Атрибуты, по которым клиентский скрипт находит форму, поля и блоки сообщений.

## `data-fetchit`

Сниппет ищет в чанке `<form>` и при отсутствии атрибута ставит `data-fetchit` сам. Обрабатываются только формы с этим маркером.

```html
<form action="[[~[[*id]]]]" method="post" data-fetchit="…">
  …
</form>
```

Значение атрибута служебное (идентификатор action). Менять руками не нужно.

Сниппет также принудительно ставит `method="post"`.

## `data-error`

Контейнер текста ошибки поля. Значение совпадает с `name` поля.

```html
<input type="text" name="username">
<span data-error="username"></span>
```

Для имён вида `name[]` подойдут и `data-error="name"`, и `data-error="name[]"`. Скрипт ищет оба варианта.

Текст ошибки пишется в `textContent` после очистки HTML. Пустые и пробельные сообщения игнорируются.

## `data-custom`

Класс из `fetchit.frontend.custom.invalid.class` вешается не на input, а на элемент с `data-custom="имя_поля"` (часто обёртка).

```html
<div class="input-parent" data-custom="password">
  <input type="password" name="password">
</div>
```

## `data-success` и `data-validation-error`

Сообщения уровня формы (не поля). С **1.1.3** AJAX заполняет их через `setFormMessage()`:

| Атрибут | Когда показывается |
| --- | --- |
| `data-success` | ответ с `success: true`, текст из `message` |
| `data-validation-error` | ответ с `success: false`, текст из `message` |

Плейсхолдеры FormIt вроде `[[+fi.successMessage]]` работают при обычном POST с перезагрузкой. Для AJAX нужны именно эти атрибуты. Иначе сообщение успеха или ошибки формы на клиенте не появится.

Пример из чанка пакета:

::: code-group

```modx
<div role="alert" data-success
      style="display: [[+fi.success:is=`1`:then=``:else=`none`]];">
  [[+fi.successMessage]]
</div>
<div role="alert" data-validation-error
      style="display: [[+fi.validation_error:is=`1`:then=``:else=`none`]];">
  [[+fi.validation_error_message]]
</div>
```

```fenom
<div role="alert" data-success
      style="display: {if $_modx->getPlaceholder('fi.success') == 1}{else}none{/if};">
  {$_modx->getPlaceholder('fi.successMessage')}
</div>
<div role="alert" data-validation-error
      style="display: {if $_modx->getPlaceholder('fi.validation_error') == 1}{else}none{/if};">
  {$_modx->getPlaceholder('fi.validation_error_message')}
</div>
```

:::

Перед новым submit оба блока очищаются. При `clearFieldsOnSuccess` и `reset` формы сообщения успеха можно сохранить (скрипт ставит флаг на время reset).
