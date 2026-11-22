---
title: Типы рендера
---
# Типы рендера mxQuickView

## Общие правила

1. Всегда передавайте валидный `data-mxqv-id` (ресурс должен существовать и быть доступен).
2. `data-mxqv-action` задаёт, что отрисовать: `chunk`, `snippet` или `template`.
3. `data-mxqv-mode` задаёт, куда вывести: `modal` или `selector`.
4. Коннектор принимает только `POST` и только `action=render`.

## Матрица выбора

| Задача | `data-mxqv-action` | `data-mxqv-mode` |
| --- | --- | --- |
| Показ карточки товара | `chunk` | `modal` |
| Показ корзины/миникорзины | `snippet` | `modal` |
| Вставка quick view в отдельный блок | `chunk` или `snippet` | `selector` |
| Отрисовка шаблона ресурса | `template` | `modal` или `selector` |

## 1. `chunk`

### Для менеджера

Базовый и наиболее безопасный сценарий: отдельный чанк карточки (например, `mxqv_product`).

### Для разработчика

- Проверяется по `mxquickview_allowed_chunk`.
- Отрисовка: `$modx->getChunk($name, $props)`.
- В `$props` доступны поля ресурса, `msProductData`, `variants_*` (`has_variants=true|false`, `variants_html`, `variants_json`).
- Список плейсхолдеров чанков поставки `mxqv_product` и `mxqv_resource` — в разделе [Плейсхолдеры чанков поставки](/components/mxquickview/api#pleysholdery-chankov-postavki).

::: warning
Строки «Арт. », «В корзину», «Подробнее» в чанках поставки зашиты по-русски и лексиконом не переводятся. В своих чанках замените их на плейсхолдеры. Классы `qv-resource__*` из `mxqv_resource` в `mxqv.css` не описаны: стили для них нужно писать самостоятельно.
:::

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

Для элементов, которые уже собирает сниппет (например, `msCart`).

### Для разработчика

- Проверяется по `mxquickview_allowed_snippet`.
- Отрисовка: `$modx->runSnippet($name, $props)`.
- В вызов передаются поля ресурса как параметры сниппета, кроме `msCart`: ключ `id` снимается, задаётся `resource_id`.
- Имя сниппета в `data-mxqv-element` может начинаться с `!` (префикс снимает класс рендера).
- POST-поля `mode`, `output`, `modal_library` учитываются только при отрисовке `msCart` (контейнер корзины), не для `template`.

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

Реже: когда нужно отрисовать шаблон ресурса целиком.

### Для разработчика

- Всегда проверяется по `mxquickview_allowed_template`.
- Пустой `mxquickview_allowed_template` означает, что отрисовка `template` запрещена.
- `element` принимает ID шаблона или `templatename`.
- Отрисовка: временно подменяется `template` ресурса, вызывается `$resource->process()` с шаблоном из `data-mxqv-element` (не обязательно шаблон ресурса в панели управления).

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

- Берёт режим из `modalLibrary` (`native`, `bootstrap`, `fancybox`) в `mxQuickView.initialize`.
- Поддерживает заголовок (`data-mxqv-title`).
- Клавиши ←/→ переключают соседние элементы списка во всех режимах, включая `fancybox`.
- Кнопки prev/next есть только у `native` и `bootstrap`, у `fancybox` их в разметке нет.

## `selector`

- Вставляет ответ в контейнер из `data-mxqv-output`.
- Нужен, если на сайте уже своя модалка или отдельная зона вывода.
