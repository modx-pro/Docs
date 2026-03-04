---
title: Интеграция на сайт
---
# Интеграция на сайт

Как подключить mxQuickView и использовать в каталоге.

## 1. Подключение ресурсов (обязательно)

Сначала подключите `mxQuickView.initialize` один раз в шаблоне.

::: code-group

```fenom
{'!mxQuickView.initialize'|snippet}
```

```modx
[[!mxQuickView.initialize]]
```

:::

Пример с параметрами:

::: code-group

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalSize' => 'modal-xl',
  'mouseoverDelay' => 350
]}
```

```modx
[[!mxQuickView.initialize?
  &modalSize=`modal-xl`
  &mouseoverDelay=`350`
]]
```

:::

## 2. Кнопка в карточке товара (modal + chunk)

::: code-group

```html [Fenom]
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Быстрый просмотр
</button>
```

```html [MODX]
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Быстрый просмотр
</button>
```

:::

## 3. Клик + `modal` + `snippet` (пример с `msCart`)

::: code-group

```html [Fenom]
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="snippet"
  data-mxqv-element="msCart"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Быстрый просмотр корзины
</button>
```

```html [MODX]
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="snippet"
  data-mxqv-element="msCart"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Быстрый просмотр корзины
</button>
```

:::

Требование: `msCart` должен быть добавлен в `mxquickview_allowed_snippet`.

## 4. Рендер по наведению (mouseover)

::: code-group

```html [Fenom]
<a href="#"
  data-mxqv-mouseover
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">Наведите</a>
```

```html [MODX]
<a href="#"
  data-mxqv-mouseover
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">Наведите</a>
```

:::

Задержка берётся из `mxquickview_mouseover_delay` или параметра `mouseoverDelay` у `initialize`.

## 5. Режим `selector` (свой контейнер)

::: code-group

```html [Fenom]
<button type="button"
  data-mxqv-click
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-output=".quickview-output">
  Загрузить в блок
</button>

<div class="quickview-output"></div>
```

```html [MODX]
<button type="button"
  data-mxqv-click
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-output=".quickview-output">
  Загрузить в блок
</button>

<div class="quickview-output"></div>
```

:::

## 6. Комбинированный сценарий: `mouseover` + `selector`

::: code-group

```html [Fenom]
<a href="#"
  data-mxqv-mouseover
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-output=".quickview-output">
  Наведите для загрузки
</a>

<div class="quickview-output"></div>
```

```html [MODX]
<a href="#"
  data-mxqv-mouseover
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-output=".quickview-output">
  Наведите для загрузки
</a>

<div class="quickview-output"></div>
```

:::

### Вариант с Bootstrap 5 modal через `selector`

```html
<button type="button"
  data-bs-toggle="modal"
  data-bs-target="#qvBootstrapModal"
  data-mxqv-click
  data-mxqv-mode="selector"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-output="#qvBootstrapModal .modal-body">
  Быстрый просмотр
</button>

<div class="modal fade" id="qvBootstrapModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Быстрый просмотр</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>
```

## 7. Навигация prev/next в списке товаров

::: code-group

```html [Fenom]
<div data-mxqv-parent data-mxqv-loop="true">
  <button type="button"
    data-mxqv-click
    data-mxqv-mode="modal"
    data-mxqv-action="chunk"
    data-mxqv-element="mxqv_product"
    data-mxqv-id="{$id}"
    data-mxqv-title="{$pagetitle}">
    Быстрый просмотр
  </button>
</div>
```

```html [MODX]
<div data-mxqv-parent data-mxqv-loop="true">
  <button type="button"
    data-mxqv-click
    data-mxqv-mode="modal"
    data-mxqv-action="chunk"
    data-mxqv-element="mxqv_product"
    data-mxqv-id="[[+id]]"
    data-mxqv-title="[[+pagetitle]]">
    Быстрый просмотр
  </button>
</div>
```

:::

Требование: у каждого триггера внутри должны быть свои `data-mxqv-action`, `data-mxqv-element`, `data-mxqv-id`.

## 8. Интеграция с MiniShop3 и ms3Variants

- В quick view-чанке используйте форму `ms3-add-to-cart` (`data-ms3-form`, `ms3_action=cart/add`).
- После загрузки контента компонент вызывает `ms3.productCardUI.reinit()` (если MiniShop3 доступен).
- При установленном ms3Variants доступны `[[+variants_html]]`, `[[+variants_json]]`, `[[+has_variants]]`.

## 9. Частые причины, почему блок не работает

1. Не подключен `mxQuickView.initialize`.
2. Элемент не добавлен в whitelist (`allowed_chunk`, `allowed_snippet`, `allowed_template`).
3. Не передан или неверный `data-mxqv-id`.
4. Для `selector`-режима отсутствует целевой контейнер `data-mxqv-output`.
5. Передан `context`, не совпадающий с `context_key` ресурса (ответ `Access denied`).
6. Ресурс недоступен для просмотра по ACL (ответ `Access denied`).
7. Ресурс не опубликован или вне окна публикации (`pub_date/unpub_date`) и нет права `view_unpublished`.
