---
title: ms3FavoritesShare
---
# Сниппет ms3FavoritesShare

Страница шаринга списка по токену. URL: `/wishlist/share?token=xxx`. Выводит список товаров и кнопку «Скопировать в мой список».

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **token** | Токен из URL (обычно `$_REQUEST['token']`) | `—` |
| **tpl** | Чанк карточки товара | `tplFavoritesItem` |
| **emptyTpl** | Чанк пустого состояния | `tplFavoritesEmpty` |
| **wrapperTpl** | Чанк обёртки страницы | `tplFavoritesSharePage` |

## Плейсхолдеры в wrapperTpl

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+list]]` | HTML списка товаров |
| `[[+token]]` | Токен |
| `[[+count]]` | Количество товаров |

## Примеры

::: code-group
```modx
[[!ms3FavoritesShare]]
```

```fenom
{'!ms3FavoritesShare' | snippet}
```
:::

**С кастомными чанками:**

::: code-group
```modx
[[!ms3FavoritesShare?
  &tpl=`tplFavoritesItem`
  &emptyTpl=`tplFavoritesEmpty`
  &wrapperTpl=`tplFavoritesSharePage`
]]
```

```fenom
{'!ms3FavoritesShare' | snippet : [
  'tpl' => 'tplFavoritesItem',
  'emptyTpl' => 'tplFavoritesEmpty',
  'wrapperTpl' => 'tplFavoritesSharePage'
]}
```
:::

При отсутствии токена или истечении срока действия возвращается текст из лексикона `ms3favorites_share_not_found`. Используйте отдельный шаблон для страницы share, чтобы корректно отображать сообщение об ошибке.
