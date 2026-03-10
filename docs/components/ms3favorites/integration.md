---
title: Интеграция и кастомизация
---
# Интеграция и кастомизация

Расширенные сценарии подключения и настройки внешнего вида.

## Типы ресурсов (resource_type)

По умолчанию используется тип товаров MiniShop3 (`resource_type=products`). Поддерживаются также `resources`, `articles`, `pages`, `custom`. Тип задаётся в `ms3fLexiconScript` и при необходимости переопределяется на элементах через `data-resource-type`.

**Тип по умолчанию (глобально):**

::: code-group
```modx
[[!ms3fLexiconScript? &resource_type=`products`]]
```

```fenom
{'ms3fLexiconScript' | snippet : ['resource_type' => 'products']}
```
:::

**Несколько типов на одной странице:**

::: code-group
```modx
<button type="button" data-favorites-toggle data-id="[[+id]]" data-resource-type="products">...</button>
<button type="button" data-favorites-toggle data-id="[[+id]]" data-resource-type="articles">...</button>
```

```fenom
<button type="button" data-favorites-toggle data-id="{$id}" data-resource-type="products">...</button>
<button type="button" data-favorites-toggle data-id="{$id}" data-resource-type="articles">...</button>
```
:::

## Режим удаления mode="list"

Для каталога, где при удалении из избранного нужно скрывать всю карточку товара:

1. Оберните контейнер списка в элемент с `data-favorites-mode="list"`.
2. Каждую карточку оберните в элемент с классом `.ms3f-parent`.

::: code-group
```modx
<div data-favorites-mode="list" class="products-grid">
  [[!msProducts?
    &parents=`0`
    &tpl=`tplProduct`
  ]]
</div>
```

```fenom
<div data-favorites-mode="list" class="products-grid">
  {'msProducts' | snippet : ['parents' => 0, 'tpl' => 'tplProduct']}
</div>
```
:::

В чанке `tplProduct`: `<div class="ms3f-parent product-card">...<button data-favorites-toggle data-id="[[+id]]">...</button>...</div>`

## Заметки к элементам

При `ms3favorites.comments_enabled` в карточках отображается textarea для заметок. Атрибут `[data-favorites-comment]` с `data-product-id`, `data-list`. Максимум 500 символов. Сохранение — action `update_comment` или `ms3Favorites.updateComment(productId, list, comment)`.

## Вывод через msProducts напрямую

Для полного контроля над параметрами фильтрации и сортировки используйте [ms3FavoritesIds](snippets/ms3FavoritesIds) и [ms3Favorites](snippets/ms3Favorites):

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`favorites_ids`]]
[[!msProducts?
  &parents=`0`
  &resources=`[[+favorites_ids]]`
  &sortby=`FIELD(msProduct.id, [[+favorites_ids]])`
  &sortdir=`ASC`
  &tpl=`tplFavoritesItem`
  &limit=`20`
]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'favorites_ids']}
{set $ids = $_modx->getPlaceholder('favorites_ids')}
{'msProducts' | snippet : ['parents' => 0, 'resources' => $ids, 'sortby' => 'FIELD(msProduct.id, ' ~ $ids ~ ')', 'sortdir' => 'ASC', 'tpl' => 'tplFavoritesItem', 'limit' => 20]}
```
:::

**С пагинацией pdoPage:**

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`favorites_ids`]]
[[!pdoPage?
  &element=`msProducts`
  &parents=`0`
  &resources=`[[+favorites_ids]]`
  &sortby=`FIELD(msProduct.id, [[+favorites_ids]])`
  &limit=`12`
  &tpl=`tplFavoritesItem`
  &totalVar=`page.total`
  &pageNavVar=`page.nav`
]]
<nav class="pagination">[[!+page.nav]]</nav>
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'favorites_ids']}
{set $ids = $_modx->getPlaceholder('favorites_ids')}
{'pdoPage' | snippet : ['element' => 'msProducts', 'parents' => 0, 'resources' => $ids, 'sortby' => 'FIELD(msProduct.id, ' ~ $ids ~ ')', 'limit' => 12, 'tpl' => 'tplFavoritesItem', 'totalVar' => 'page.total', 'pageNavVar' => 'page.nav']}
<nav class="pagination">{$_modx->getPlaceholder('page.nav')}</nav>
```
:::

::: warning Сохранение порядка
Всегда используйте `FIELD()` для сортировки, чтобы сохранить порядок добавления товаров.
:::

**Сравнение подходов:**

| Параметр | ms3Favorites | msProducts напрямую |
|----------|-------------|---------------------|
| Простота | ✅ Готовое решение | ⚠️ Требует подготовки ID |
| Порядок товаров | ✅ Автоматически | ⚠️ Нужен FIELD() |
| Фильтрация | ❌ Базовая | ✅ Полная (&where, &tvFilters) |
| TV-поля | ⚠️ Через msProducts внутри | ✅ Полный контроль |
| Пагинация | ✅ pdoPage | ✅ pdoPage |
| Для гостей | ✅ JS render | ❌ Только авторизованные |

**Фильтрация через msProducts** (товары со скидкой, в наличии, по бренду):

::: code-group
```modx
[[!ms3FavoritesIds? &list=`default` &toPlaceholder=`favorites_ids`]]
[[!msProducts?
  &resources=`[[+favorites_ids]]`
  &where=`{"old_price:>":0}`
  &includeTVs=`brand`
  &tvFilters=`brand==Apple`
  &sortby=`FIELD(msProduct.id, [[+favorites_ids]])`
]]
```

```fenom
{set $ids = ms3f_get_ids_for_current_user($modx, 'default')}
{'msProducts' | snippet : [
  'resources' => implode(',', $ids),
  'where' => '{"old_price:>":0}',
  'includeTVs' => 'brand',
  'tvFilters' => 'brand==Apple',
  'sortby' => 'FIELD(msProduct.id, ' ~ implode(',', $ids) ~ ')'
]}
```
:::

**Объединение нескольких списков:**

::: code-group
```modx
[[!ms3FavoritesIds? &list=`default` &toPlaceholder=`ids_default`]]
[[!ms3FavoritesIds? &list=`gifts` &toPlaceholder=`ids_gifts`]]
[[!ms3fMergeIds? &ids1=`[[+ids_default]]` &ids2=`[[+ids_gifts]]` &toPlaceholder=`all_ids`]]
[[!+all_ids:notempty=`[[!msProducts?
  &parents=`0`
  &resources=`[[+all_ids]]`
  &sortby=`FIELD(msProduct.id, [[+all_ids]])`
  &tpl=`tplFavoritesItem`
]]`]]
```

```fenom
{set $defaultIds = ms3f_get_ids_for_current_user($modx, 'default')}
{set $giftIds = ms3f_get_ids_for_current_user($modx, 'gifts')}
{set $allIds = array_unique(array_merge($defaultIds, $giftIds))}
{if count($allIds) > 0}
{'msProducts' | snippet : [
  'resources' => implode(',', $allIds),
  'parents' => 0,
  'sortby' => 'FIELD(msProduct.id, ' ~ implode(',', $allIds) ~ ')',
  'tpl' => 'tplFavoritesItem'
]}
{/if}
```
:::

::: tip Сниппет ms3fMergeIds
Для объединения списков в MODX нужен простой сниппет `ms3fMergeIds`: принимает `ids1`, `ids2`, `toPlaceholder`, объединяет ID, убирает дубликаты, записывает в плейсхолдер. Либо используйте [PHP helper](#php-helper-для-получения-id) в кастомном сниппете.
:::

## Несколько списков

Предустановленные: **default**, **gifts**, **plans**. Лимит — `ms3favorites.max_lists` (по умолчанию 10).

**Кнопка с указанием списка:**

```html
<button data-favorites-toggle data-id="123" data-list="gifts">В подарки</button>
```

**Dropdown выбора списка** — чанк `tplFavoritesListSelector` или сниппет [ms3FavoritesLists](snippets/ms3FavoritesLists). Ссылки на страницу списка формируются по настройке **ms3favorites.list_page** (по умолчанию `wishlist/`):

::: code-group
```modx
[[!$tplFavoritesListSelector]]
<button data-favorites-toggle data-id="[[+id]]">Добавить</button>
```

```fenom
{'tplFavoritesListSelector' | chunk}
<button data-favorites-toggle data-id="{$id}">Добавить</button>
```
:::

**JS API:**

```javascript
ms3Favorites.add(123, 'gifts');           // Добавить в список gifts
ms3Favorites.remove(456, 'plans');        // Удалить из plans
ms3Favorites.getList('default');          // ID списка default
ms3Favorites.getAllLists();               // { default:[], gifts:[], plans:[] }
ms3Favorites.switchList('gifts');         // Переключить активный
ms3Favorites.render('#container', { list: 'gifts' });
```

## Шаринг списка

**Кнопка «Поделиться»** (только для авторизованных):

```html
<button type="button" data-favorites-share data-list="default">Поделиться списком</button>
```

**Страница просмотра:** создайте ресурс с alias `wishlist/share` (или дочерний `share` у `/wishlist/`). **Важно:** используйте отдельный шаблон для share — иначе при невалидном токене не появится сообщение «Список не найден». Сниппет [ms3FavoritesShare](snippets/ms3FavoritesShare):

::: code-group
```modx
[[!ms3FavoritesShare]]
```

```fenom
{'!ms3FavoritesShare' | snippet}
```
:::

URL для шаринга: `/wishlist/share?token=xxx`

**API коннектора:**
- `create_share` — POST list=default → `{ success, token }` (только авторизованные)
- `get_share` — POST token=xxx → `{ success, ids, list_name }`
- `copy_share` — POST token=xxx, target_list=default → `{ success, ids }` (гости получают ids для localStorage)

## Интеграция с корзиной

На странице /wishlist/ (чанк tplFavoritesPage) доступны:

- **Кнопка «Добавить все в корзину»** — `[data-favorites-add-all]`, добавляет все товары текущего списка
- **Кнопка «Добавить выбранные»** — `[data-favorites-add-selected]`, добавляет только отмеченные checkbox
- **Checkbox** — `[data-favorites-cart-checkbox]` на каждой карточке (tplFavoritesPageItem)
- **Выбрать все** — `[data-favorites-select-all]`

**JS API:**

```javascript
ms3Favorites.addToCart([1, 2, 3]);  // Добавить товары с ID 1, 2, 3
ms3Favorites.addSelectedToCart();   // Добавить выбранные (по checkbox)
```

**Коннектор action=add_to_cart:** POST `ids` (через запятую) или `product_id` (один товар). Ответ: `{ success, added, message }`. Используется MiniShop3 `ms3->cart->add()`.

**Кнопка «Очистить список»** — `[data-favorites-clear]`. Вызывает action `clear` и очищает текущий список в БД или localStorage.

## Callbacks и события

**События DOM:**

```javascript
document.addEventListener('ms3f:added', function(e) {
  console.log('Добавлено:', e.detail.id, e.detail.list);
});
document.addEventListener('ms3f:removed', function(e) {
  console.log('Удалено:', e.detail.id, e.detail.list);
});
```

**Callback через ms3fConfig** (задать до загрузки favorites.js):

```javascript
window.ms3fConfig = window.ms3fConfig || {};
window.ms3fConfig.onAdd = function(id, list) { /* ... */ };
window.ms3fConfig.onRemove = function(id, list) { /* ... */ };
window.ms3fConfig.showToast = false;  // отключить стандартный toast
window.ms3fConfig.debug = true;       // логи в консоль
```

## Плейсхолдер ms3f.total

Серверный счётчик количества элементов в избранном. Устанавливается сниппетами [ms3FavoritesPage](snippets/ms3FavoritesPage) и [ms3Favorites](snippets/ms3Favorites).

**Пример — ссылка в меню только при непустом списке:**

::: code-group
```modx
[[+ms3f.total:gt=`0`:then=`<a href="/wishlist/">Избранное ([[+ms3f.total]])</a>`]]
```

```fenom
{if $_modx->getPlaceholder('ms3f.total') > 0}
  <a href="/wishlist/">Избранное ({$_modx->getPlaceholder('ms3f.total')})</a>
{/if}
```
:::

## PHP helper для получения ID

Для гибкой логики (msProducts, кастомные фильтры) используйте функции:

```php
require_once $modx->getOption('core_path') . 'components/ms3favorites/include/helpers.php';

// Авторизованные и гости (при guest_db_enabled) — из БД
$ids = ms3f_get_ids_for_current_user($modx, 'default', 'products', 'added_at_desc');
$modx->setPlaceholder('favorites_ids', implode(',', $ids));

// Гости при пустой БД — из cookie (если storage_type=cookie)
$ids = ms3f_get_ids_from_cookie($modx, 'default', 'products');
```

**ms3f_get_ids_for_current_user** — параметры: `listName`, `resourceType`, `sortBy` (`added_at_desc` | `added_at_asc`).

**ms3f_get_ids_from_cookie** — для гостей, когда БД пуста и хранение в cookie. Параметры: `listName`, `resourceType`.

## Устранение неполадок

| Симптом | Причина | Решение |
|---------|---------|---------|
| `ms3Favorites is undefined` | favorites.js не загружен или загружен до лексикона | Проверьте путь к JS и порядок скриптов |
| Счётчик не обновляется | `updateCounter()` не вызывается | Убедитесь, что `save()` вызывается после add/remove |
| Кнопки не работают в модалке (mxQuickView) | Контент подгружен по AJAX | `ms3Favorites` подписан на `mxqv:loaded`. Проверьте порядок загрузки |
| Пустой список после входа | Sync не выполнился | Проверьте консоль на ошибки fetch |
| Share не работает | Только для авторизованных | `create_share` требует `user_id` |
| Debug-режим | Логи в консоль | `window.ms3fConfig = { debug: true }` до загрузки `favorites.js` |
