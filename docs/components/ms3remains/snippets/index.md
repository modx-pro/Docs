---
title: Сниппеты
description: Обзор сниппетов ms3Remains для витрины MiniShop3
---

# Сниппеты

В пакет входит один сниппет: [ms3Remains](ms3Remains). Остаток текущего товара или указанного id.

::: code-group

```fenom
{'!ms3Remains' | snippet}
{'!ms3Remains' | snippet : ['id' => 12]}
```

```modx
[[!ms3Remains]]
[[!ms3Remains? &id=`12`]]
```

:::

| Сниппет | Назначение |
| --- | --- |
| [ms3Remains](ms3Remains) | остаток товара, комбинации опций или варианта на витрине |

Вызывайте некэшируемым. В каталогах чаще хватает проекции `[[+stock]]`. См. [Проекцию](../projections) и [рецепты](../stocks#рецепты).
