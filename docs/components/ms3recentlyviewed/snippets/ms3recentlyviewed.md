---
title: ms3recentlyviewed
---
# Сниппет ms3recentlyviewed

Выводит список товаров по переданным ID. Используется для блока «Недавно просмотренные» при серверном выводе или после получения ID из коннектора.

Внутри вызывается msProducts (pdoTools). Дополнение подставляет параметр `parents`, требуемый в MODX 3.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **ids** | ID товаров через запятую | — |
| **tpl** | Чанк карточки товара | tplViewedItem |
| **tplOuter** | Чанк-обёртка. Пусто — без обёртки | *(пусто)* |
| **emptyTpl** | Чанк пустого состояния | tplViewedEmpty |
| **limit** | Макс. количество в выборке | из настройки `ms3recentlyviewed.max_items` (`20`) |
| **includeThumbs** | Алиасы превью для `msProducts` | `thumb,small` |
| **fromDB** | ID из БД, если пользователь авторизован в текущем контексте. `sync_enabled` не читается | `false` |
| **autoIdsFallback** | При пустом списке — первые товары каталога (демо). Нет в transport | `false` |
| **showUnpublished** / **showDeleted** / **showZeroPrice** | В запрос товаров. Нет в transport | `false` |

**ids** из шаблона или плейсхолдера **`[[+viewedIds]]`**, либо опускается при **fromDB=true** (авторизованный пользователь). `sync_enabled` это чтение не закрывает. Гость + `storage_type=cookie`: плагин заполняет `viewedIds`. Fenom: **`$_modx->getPlaceholder('viewedIds')`**.

Заглушка **`ms3rvDebugGetViews`** возвращает пустую строку. Не вызывайте.

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

При отсутствии товаров сниппет вернёт пустую строку или контент `emptyTpl`. В шаблоне можно не выводить блок при пустом результате.
