---
title: Типы рендера
---
# Типы рендера mxQuickView

Документ описывает, как выбирать `data-mxqv-action` и режим вывода.

## Общие правила

1. Всегда передавайте валидный `data-mxqv-id` (ресурс должен существовать и быть доступен).
2. `data-mxqv-action` определяет, что рендерить: `chunk`, `snippet` или `template`.
3. `data-mxqv-mode` определяет, куда выводить: `modal` или `selector`.
4. Коннектор работает только по `POST` и только с `action=render`.

## Матрица выбора

| Задача | `data-mxqv-action` | `data-mxqv-mode` |
| --- | --- | --- |
| Показ карточки товара | `chunk` | `modal` |
| Показ корзины/миникорзины | `snippet` | `modal` |
| Вставка quick view в отдельный блок | `chunk` или `snippet` | `selector` |
| Рендер шаблона ресурса | `template` | `modal` или `selector` |

## 1. `chunk`

### Для менеджера

Базовый и наиболее безопасный сценарий: отдельный чанк карточки (например, `mxqv_product`).

### Для разработчика

- Проверяется по `mxquickview_allowed_chunk`.
- Рендер: `$modx->getChunk($name, $props)`.
- В `$props` доступны поля ресурса, `msProductData`, `variants_*` (`has_variants=true|false`, `variants_html`, `variants_json`).

### Пример

::: code-group

```modx
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  mxQuickView
</button>
```

```fenom
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  mxQuickView
</button>
```

:::

## 2. `snippet`

### Для менеджера

Используйте для элементов, которые уже собраны сниппетом (например, `msCart`).

### Для разработчика

- Проверяется по `mxquickview_allowed_snippet`.
- Рендер: `$modx->runSnippet($name, $props)`.
- В вызов передаются свойства ресурса как параметры сниппета.

### Пример

::: code-group

```modx
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="snippet"
  data-mxqv-element="msCart"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Корзина
</button>
```

```fenom
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="snippet"
  data-mxqv-element="msCart"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Корзина
</button>
```

:::

## 3. `template`

### Для менеджера

Используется реже: когда нужно отрендерить шаблон ресурса целиком.

### Для разработчика

- Всегда проверяется по `mxquickview_allowed_template`.
- Пустой `mxquickview_allowed_template` означает, что `template`-рендер запрещён.
- `element` принимает ID шаблона или `templatename`.
- Рендер выполняется как обработка ресурса через выбранный шаблон.

### Пример

::: code-group

```modx
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="template"
  data-mxqv-element="12"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Шаблон
</button>
```

```fenom
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="template"
  data-mxqv-element="12"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Шаблон
</button>
```

:::

## Режимы вывода

## `modal`

- Использует режим из `modalLibrary` (`native`, `bootstrap`, `fancybox`) в `mxQuickView.initialize`.
- Поддерживает заголовок (`data-mxqv-title`) и навигацию prev/next.

## `selector`

- Вставляет ответ в контейнер из `data-mxqv-output`.
- Удобно, если у сайта уже есть своя модалка или отдельная зона вывода.
