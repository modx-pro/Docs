---
title: Сниппет msFastOrderClientConfig
description: Вывод window.msfoConfig без кнопки быстрого заказа
---

# Сниппет msFastOrderClientConfig

Возвращает только HTML:

```html
<script>window.msfoConfig = { ... };</script>
```

Без кнопки, без подключения CSS/JS.

## Когда использовать

- На странице **своя** кнопка с `data-msfo-trigger` и `data-msfo-product-id`, а стили/скрипты подключены один раз в шаблоне.
- Несколько кнопок на странице — один конфиг, несколько триггеров.
- Конфиг нужен **до** `msfo.min.js` (порядок задаёт плагин `msfastorder_web` при полном вызове `msFastOrder`).

## Использование

::: code-group

```fenom
{'!msFastOrderClientConfig' | snippet}
```

```modx
[[!msFastOrderClientConfig]]
```

:::

Обычно в шаблоне (layout / head) — конфиг и assets один раз:

::: code-group

```fenom
{'!msFastOrderClientConfig' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/msfastorder/css/msfo.min.css">
<script src="{'assets_url' | option}components/msfastorder/js/msfo.min.js"></script>
```

```modx
[[!msFastOrderClientConfig]]
<link rel="stylesheet" href="[[++assets_url]]components/msfastorder/css/msfo.min.css">
<script src="[[++assets_url]]components/msfastorder/js/msfo.min.js"></script>
```

:::

На карточках товаров — только кнопка (без повторного подключения CSS/JS):

::: code-group

```fenom
<button type="button" class="msfo-trigger" data-msfo-trigger data-msfo-product-id="{$_modx->resource.id}">
  {$_modx->lexicon('msfastorder_button_text')}
</button>
```

```modx
<button type="button" class="msfo-trigger" data-msfo-trigger data-msfo-product-id="[[*id]]">
  [[%msfastorder_button_text]]
</button>
```

:::

## Содержимое msfoConfig

Генерируется классом `MsFastOrder\ClientConfig`. Основные поля:

| Поле | Источник |
|------|----------|
| `connectorUrl` | `msfastorder_connector_url` |
| `csrfToken` | сессия |
| `modalLibrary` | `msfastorder_modal_library` |
| `phoneMask` | `msfastorder_phone_mask` |
| `successRedirect` | `msfastorder_success_redirect` |
| `requiredFields` | `msfastorder_required_fields` |
| `lexicon` | лексикон `msfastorder:*` |

Полное описание: [Подключение на сайте → msfoConfig](../frontend#window-msfoconfig).

## См. также

- [Сниппет msFastOrder](msFastOrder)
- [AJAX API](../api)
