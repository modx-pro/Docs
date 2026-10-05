---
title: ms3rvLexiconScript
---
# Сниппет ms3rvLexiconScript

Добавляет скрипт с лексиконом и конфигом: `window.ms3rvLexicon` и `window.ms3rvConfig`.

Подключать **до** скрипта `viewed.js`, чтобы JS использовал правильные строки и лимит.

## Параметры

Опциональный **`cultureKey`**: язык лексикона. Пусто — `cultureKey` контекста, затем сайта, затем `en`.

Ключи `ms3rvConfig`: `maxItems`, `storageType`, `cultureKey`, `isAuthenticated`, `userId`.

## Использование

::: code-group

```fenom
{'ms3rvLexiconScript' | snippet}
```

```modx
[[!ms3rvLexiconScript]]
```

:::

Если не подключать, `viewed.js` использует запасные русские фразы. Для мультиязычного сайта вывод лексикона обязателен.

Ключи лексикона (пространство имён `ms3recentlyviewed`): `ms3recentlyviewed_empty`, `ms3recentlyviewed_item_title` и другие.
