---
title: msrpLexiconScript
---
# Сниппет msrpLexiconScript

Выводит встроенный тег **`script`** с объектом **`window.msrpLexicon`**: строки интерфейса виджета на языке текущего контекста сайта в MODX.

Подключается лексикон **`msrussianpost:default`**. Ключи в JavaScript совпадают с именами записей лексикона (префикс `msrussianpost_`).

## Параметры

Параметров **нет**.

## Порядок вызова

Вызывать **строго перед** [msRussianPost](msRussianPost) и до загрузки `russianpost.js`, чтобы при инициализации скрипта объект `window.msrpLexicon` уже существовал.

## Пример

::: code-group

```modx
[[!msrpLexiconScript]]
[[!msRussianPost]]
```

```fenom
{'msrpLexiconScript' | snippet}
{'msRussianPost' | snippet}
```

:::

## Ключи в `window.msrpLexicon`

Типичный набор (точный список — в коде сниппета пакета):

- `msrussianpost_calculating` — текст при расчёте
- `msrussianpost_select_method` — приглашение выбрать способ
- `msrussianpost_delivery_cost`, `msrussianpost_delivery_period`, `msrussianpost_days`
- `msrussianpost_error_no_index`, `msrussianpost_error_api`, `msrussianpost_error_invalid_index`
- `msrussianpost_free_delivery`, `msrussianpost_no_methods`

Без этого сниппета для части сообщений используются встроенные запасные строки в JavaScript. В эксплуатации лучше всегда подключать лексикон.
