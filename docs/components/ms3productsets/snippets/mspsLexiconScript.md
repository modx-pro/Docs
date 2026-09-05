---
title: mspsLexiconScript
---
# Сниппет mspsLexiconScript

Добавляет на страницу лексикон и конфиг для `productsets.js`.

После вызова заполняются:

- при `ms3productsets.izitoast_include` = Да — теги `<link>` и `<script>` для [iziToast](https://github.com/marcosmoura/iziToast) по путям из настроек `izitoast_css` / `izitoast_js`;
- `window.mspsLexicon` — строки интерфейса (`empty`, `added`, `removed`, `set_added`, `go_catalog`, `error`);
- `window.mspsConfig` — `maxItems`, `lang`, `toastTimeout` (мс), `toastPosition` (напр. `topRight`).

Подключайте **до** `productsets.js`. Если автоподключение iziToast выключено, загрузите CSS и JS вручную — [Интеграция на сайт](../integration).

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
