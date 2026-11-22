---
title: ms3recentlyviewed
---
# Сниппет ms3recentlyviewed

Список товаров по переданным ID. Блок «Недавно просмотренные» при серверном выводе или после ID из коннектора.

Внутри msProducts (pdoTools). Дополнение подставляет `parents` для MODX 3.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **ids** | ID товаров через запятую | — |
| **tpl** | Чанк карточки товара | tplViewedItem |
| **tplOuter** | Чанк-обёртка. Пусто — без обёртки | *(пусто)* |
| **emptyTpl** | Чанк пустого состояния | tplViewedEmpty |
| **limit** | Макс. количество в выборке | из настройки `ms3recentlyviewed.max_items` (`20`) |
| **includeThumbs** | Алиасы превью для `msProducts` | `thumb,small` |
| **fromDB** | ID из БД, если пользователь авторизован в текущем контексте. `sync_enabled` не читается. Нет в transport | `false` |
| **autoIdsFallback** | При пустом списке — первые товары каталога (демо). Нет в transport | `false` |
| **showUnpublished** / **showDeleted** / **showZeroPrice** | В запрос товаров. Нет в transport | `false` |

**ids** из шаблона или **`[[+viewedIds]]`**, либо не нужен при **fromDB=true** (авторизованный пользователь). `sync_enabled` чтение не отключает. Гость и `storage_type=cookie`: плагин задаёт `viewedIds`. Fenom: **`$_modx->getPlaceholder('viewedIds')`**.

**`ms3rvDebugGetViews`**: заглушка, пустая строка. Не вызывайте.

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

Без ID сниппет вернёт обёртку `div.ms3rv__list` с `data-ms3rv-hydrate="viewed"` и HTML `emptyTpl`. `viewed.js` по маркеру подставит список из браузера.
