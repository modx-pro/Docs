---
title: ms3rvLexiconScript
---
# Сниппет ms3rvLexiconScript

Ставит `window.ms3rvLexicon` и `window.ms3rvConfig`.

Подключать **до** `viewed.js`, чтобы JS взял строки и лимит из сниппета.

## Параметры

Опциональный **`cultureKey`**: язык лексикона. Пусто — `cultureKey` контекста, затем сайта, затем `en`.

Ключи `ms3rvConfig`: `maxItems`, `storageType`, `cultureKey`, `isAuthenticated`, `userId`.

В `window.ms3rvLexicon` попадает только `empty` (`ms3recentlyviewed_empty`). Подпись карточки `ms3recentlyviewed_item_title` в этот JSON не входит. Сниппеты списка кладут её в плейсхолдер `ms3rv_item_title`.

Сниппет не читает чанк `tplMs3rvLexiconScript`. Разметку он собирает сам: скрытые `#ms3rv-lexicon-data` и `#ms3rv-config-data`, затем короткий script.

## Использование

::: code-group

```fenom
{'ms3rvLexiconScript' | snippet}
```

```modx
[[!ms3rvLexiconScript]]
```

:::

Если не подключать, пустой список берёт «Вы ещё ничего не смотрели», хранилище остаётся `localStorage`, лимит в JS равен 20.
