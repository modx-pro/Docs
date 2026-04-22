---
title: ms3recentlyviewed
---
# Сниппет ms3recentlyviewed

Выводит список товаров по переданным ID. Используется для блока «Недавно просмотренные» при серверном выводе или после получения ID из коннектора.

Внутри вызывается msProducts (pdoTools); дополнение автоматически подставляет параметр `parents`, требуемый в MODX 3.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **ids** | ID товаров через запятую | — |
| **tpl** | Чанк карточки товара | tplViewedItem |
| **emptyTpl** | Чанк пустого состояния | tplViewedEmpty |
| **limit** | Макс. количество в выборке | из настройки ms3recentlyviewed.max_items (20) |
| **fromDB** | Загружать ID из БД для авторизованного пользователя (при sync_enabled) | false |

Параметр **ids** передаётся извне (шаблон, плейсхолдер **`[[+viewedIds]]`**) или не указывается при **fromDB=true** — тогда сниппет сам загружает список из БД. При выводе для гостей с **`storage_type` = `cookie`** плейсхолдер задаёт плагин **ms3recentlyviewedViewedIdsPlaceholder**; в Fenom используйте **`$_modx->getPlaceholder('viewedIds')`**, а не несуществующую переменную `$viewedIds`.

## Примеры

::: code-group

```fenom
{'ms3recentlyviewed' | snippet : [
  'ids' => $_modx->getPlaceholder('viewedIds'),
  'tpl' => 'tplViewedItem',
  'emptyTpl' => 'tplViewedEmpty'
]}
```

```modx
[[!ms3recentlyviewed?
  &ids=`[[+viewedIds]]`
  &tpl=`tplViewedItem`
  &emptyTpl=`tplViewedEmpty`
]]
```

:::

**Вывод из БД для авторизованного:**

::: code-group

```fenom
{'ms3recentlyviewed' | snippet : ['fromDB' => true]}
```

```modx
[[!ms3recentlyviewed?
  &fromDB=`1`
]]
```

:::

При отсутствии товаров сниппет вернёт пустую строку или контент `emptyTpl` — в шаблоне можно не выводить блок при пустом результате.
