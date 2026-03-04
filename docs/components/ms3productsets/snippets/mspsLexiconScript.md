---
title: mspsLexiconScript
---
# Сниппет mspsLexiconScript

Добавляет на страницу лексикон и конфиг для `productsets.js`.

После вызова заполняются:

- `window.mspsLexicon` — строки интерфейса (`empty`, `added`, `removed`, `set_added`, `go_catalog`, `error`)
- `window.mspsConfig` — конфиг фронта (`maxItems`, `lang`)

Подключайте **до** `productsets.js`.

## Параметры

Сниппет не имеет обязательных параметров. Использует текущий `cultureKey` и настройку `ms3productsets.max_items`.

## Использование

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
```

```modx
[[!mspsLexiconScript]]
```

:::
