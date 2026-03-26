---
title: Быстрый старт
---
# Быстрый старт

Пошаговое подключение списка избранного (Wishlist) к сайту с MiniShop3.

## Установка

### Требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0+ |
| PHP | 8.1+ |
| MiniShop3 | установлен |
| pdoTools | 3.0.0+ |

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлены **MiniShop3** и **pdoTools**
4. Найдите **ms3Favorites** в списке и нажмите **Download**, затем **Install**
5. **Настройки → Очистить кэш**

Пакет доступен в каталоге [modstore.pro](https://modstore.pro/).

### После установки

Подключите лексикон, CSS и JS на сайте, разместите кнопку в карточке товара и выведите блок избранного. Подробнее — ниже.

---

## Шаг 1: Подключение лексикона, стилей и скрипта

В шаблоне (или в общем head/footer) подключите **сначала** лексикон, затем CSS и JS.

::: code-group

```fenom
{'ms3fLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | config}components/ms3favorites/css/favorites.css">
<script src="{'assets_url' | config}components/ms3favorites/js/favorites.js"></script>
```

```modx
[[!ms3fLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3favorites/css/favorites.css">
<script src="[[++assets_url]]components/ms3favorites/js/favorites.js"></script>
```
:::

Без `ms3fLexiconScript` скрипт использует запасные русские фразы: для мультиязычного сайта подключение лексикона обязательно.

## Шаг 2: Кнопка добавления в Wishlist

Разместите кнопку в карточке товара — сниппет [ms3FavoritesBtn](snippets/ms3FavoritesBtn):

::: code-group

```modx
[[!ms3FavoritesBtn? &id=`[[*id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id]}
```
:::

В чанке карточки товара (например в выводе msProducts):

::: code-group

```modx
[[!ms3FavoritesBtn? &id=`[[+id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $id]}
```

:::

При клике товар добавляется или удаляется из списка. Уведомление показывается автоматически (iziToast / MiniShop3 `ms3Message` / свой `ms3fConfig.notify` — см. [Интеграция](integration)).

## Шаг 3: Счётчик Wishlist

Где нужно показывать количество товаров в Wishlist:

```html
<span data-favorites-count style="display: none;">0</span>
```

Или серверным сниппетом [ms3FavoritesCounter](snippets/ms3FavoritesCounter):

::: code-group

```modx
[[!ms3FavoritesCounter]]
```

```fenom
{'!ms3FavoritesCounter' | snippet}
```
:::

Сумма по всем спискам: `&list=all` / `['list' => 'all']`.

Значение подставится при загрузке (1–99 или 99+): при нуле элемент скрыт.

## Шаг 4: Блок Wishlist

**Клиентский рендер (JS):**

Контейнер заполняется через JavaScript из localStorage/cookie:

```html
<div id="wishlist-list" class="ms3f__list"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
  if (window.ms3Favorites) {
    window.ms3Favorites.render('#wishlist-list');
  }
});
</script>
```

**Серверный вывод:**

Получить ID избранного в плейсхолдер — сниппет [ms3FavoritesIds](snippets/ms3FavoritesIds):

::: code-group

```modx
[[!ms3FavoritesIds? &toPlaceholder=`favorites_ids`]]
[[!+favorites_ids:is=`-0`:then=`
  <p>[[%ms3favorites_empty]]</p>
`:else=`
  [[!ms3Favorites?
    &ids=`[[+favorites_ids]]`
    &tpl=`tplFavoritesItem`
    &emptyTpl=`tplFavoritesEmpty`
  ]]
`]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'favorites_ids']}
{set $idsStr = $_modx->getPlaceholder('favorites_ids')}
{if $idsStr == '-0'}
  <p>{$_modx->lexicon('ms3favorites_empty')}</p>
{else}
  {'!ms3Favorites' | snippet : [
    'ids' => $idsStr,
    'tpl' => 'tplFavoritesItem',
    'emptyTpl' => 'tplFavoritesEmpty'
  ]}
{/if}
```

:::

## Каталог: pdoPage + msProducts, счётчик и кнопка в строке

Сценарий: **не** страница избранного, а обычный каталог с пагинацией; в строке — в список `default`, сверху — число элементов. Чанк пакета **`tplCatalogRowMs3f`** + подробности и AJAX — в [Интеграции](integration#catalog-pdopage-row).

::: code-group
```modx
<p>В избранное [[!ms3FavoritesCounter? &list=`default` &resource_type=`products`]]</p>
[[!pdoPage?
  &element=`msProducts`
  &parents=`0`
  &limit=`10`
  &tpl=`tplCatalogRowMs3f`
  &totalVar=`page.total`
  &pageNavVar=`page.nav`
]]
<nav class="pagination">[[!+page.nav]]</nav>
```

```fenom
<p>В избранное {'!ms3FavoritesCounter' | snippet : ['list' => 'default', 'resource_type' => 'products']}</p>
{'!pdoPage' | snippet : [
  'element' => 'msProducts',
  'parents' => 0,
  'limit' => 10,
  'tpl' => 'tplCatalogRowMs3f',
  'totalVar' => 'page.total',
  'pageNavVar' => 'page.nav'
]}
<nav class="pagination">{$_modx->getPlaceholder('page.nav')}</nav>
```
:::

## Шаг 5: Страница /wishlist/

Создайте ресурс с alias `wishlist`, шаблоном с подключёнными ms3fLexiconScript, favorites.css и favorites.js. В контенте выведите:

::: code-group
```modx
[[!ms3FavoritesPage]]
```

```fenom
{'!ms3FavoritesPage' | snippet}
```

:::

**Пагинация:** у сниппета `ms3FavoritesPage` **нет** встроенного pdoPage — карточки на `/wishlist/` всегда подгружает `favorites.js`. Чтобы вывести избранное постранично на **отдельной** странице, используйте цепочку **ms3FavoritesIds → pdoPage → ms3Favorites** (или `msProducts`) — примеры в [Интеграции и кастомизации](integration).

## Что дальше

- [Системные настройки](settings) — лимит, тип хранилища, гости в БД
- [Сниппеты](snippets/) — параметры `ms3Favorites`, `ms3FavoritesBtn`, `ms3FavoritesIds` и др.
- [Подключение на сайте](frontend) — кастомизация чанков и стилей
- [Интеграция и кастомизация](integration) — расширенные сценарии, `msProducts`, интеграция с корзиной
