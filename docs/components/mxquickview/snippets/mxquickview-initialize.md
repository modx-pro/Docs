---
title: mxQuickView.initialize
---
# Сниппет mxQuickView.initialize

Подключает фронтовые ресурсы `mxQuickView` и выводит разметку встроенной модалки.

## Что делает

- Подключает `css/mxqv.css` (если включён `frontCss`).
- Публикует `window.mxqvConfig` (`connectorUrl`, `mouseoverDelay`, `modalSize`, `modalLibrary`).
- Подключает `js/mxqv.js` (если включён `frontJs`).
- Вставляет HTML контейнера модалки (`#mxqv-modal-backdrop`, `#mxqv-modal`).

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `frontCss` | из `mxquickview_front_css` | Подключать CSS (`1/0`) |
| `frontJs` | из `mxquickview_front_js` | Подключать JS (`1/0`) |
| `modalSize` | из `mxquickview_modal_size` | Размер модалки (`modal-sm`, `modal-lg`, `modal-xl`) |
| `mouseoverDelay` | из `mxquickview_mouseover_delay` | Задержка hover-загрузки в мс |
| `modalLibrary` | `native` | Режим для клиентского конфига |

## Использование

::: code-group

```fenom
{'!mxQuickView.initialize'|snippet}
```

```modx
[[!mxQuickView.initialize]]
```

:::

С параметрами:

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
