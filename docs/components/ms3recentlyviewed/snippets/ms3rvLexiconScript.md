---
title: ms3rvLexiconScript
---
# Сниппет ms3rvLexiconScript

Добавляет на страницу скрипт с лексиконом и конфигом для фронтенда. В `window.ms3rvLexicon` и `window.ms3rvConfig` подставляются язык сайта и значение настройки **max_items**.

Подключать **до** скрипта viewed.js, чтобы JS использовал правильные строки и лимит.

## Параметры

Сниппет не имеет обязательных параметров; использует текущий контекст и системную настройку `ms3recentlyviewed.max_items`.

## Использование

::: code-group

```fenom
{'ms3rvLexiconScript' | snippet}
```

```modx
[[!ms3rvLexiconScript]]
```

:::

Если не подключать, viewed.js будет использовать запасные русские фразы. Для мультиязычного сайта вывод лексикона обязателен.

Ключи лексикона (namespace ms3recentlyviewed): например, `ms3recentlyviewed_empty`, `ms3recentlyviewed_item_title` и др.
