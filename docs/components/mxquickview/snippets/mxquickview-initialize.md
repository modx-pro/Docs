---
title: mxQuickView.initialize
---
# Сниппет mxQuickView.initialize

Подключает фронтовые ресурсы `mxQuickView`, настраивает `window.mxqvConfig` и выводит HTML контейнер(ы) модалки.

## Что делает

- Подключает `css/mxqv.min.css` (если не найден — fallback на `css/mxqv.css`).
- Публикует `window.mxqvConfig` (`connectorUrl`, `mouseoverDelay`, `modalSize`, `modalLibrary`, `debug`, `loadingText`).
- Подключает `js/mxqv.min.js` (если не найден — fallback на `js/mxqv.js`).
- Всегда выводит контейнер нативной модалки (`#mxqv-modal-backdrop`, `#mxqv-modal`).
- Для `modalLibrary=bootstrap` дополнительно выводит bootstrap-контейнер (`#mxqv-bootstrap-modal`) и подключает Bootstrap CSS/JS.
- Для `modalLibrary=fancybox` подключает Fancybox CSS/JS.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `modalSize` | из `mxquickview_modal_size` | Размер модалки (`modal-sm`, `modal-lg`, `modal-xl`) |
| `mouseoverDelay` | из `mxquickview_mouseover_delay` | Задержка hover-загрузки в мс |
| `modalLibrary` | `native` | Режим модалки: `native`, `bootstrap`, `fancybox` (`bootstrap5` alias) |
| `debug` | `0` | Диагностическое логирование в консоль (`[mxqv]`) |
| `loadingText` | из лексикона `mxqv_loading` | Текст индикатора загрузки |
| `fancyboxCss` | пусто | override CSS для Fancybox |
| `fancyboxJs` | пусто | override JS для Fancybox |
| `bootstrapCss` | пусто | override CSS для Bootstrap |
| `bootstrapJs` | пусто | override JS для Bootstrap |

## Использование

::: code-group

```modx
[[!mxQuickView.initialize]]
```

```fenom
{'!mxQuickView.initialize'|snippet}
```

:::

С параметрами:

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalLibrary=`bootstrap`
  &modalSize=`modal-xl`
  &mouseoverDelay=`350`
  &debug=`1`
]]
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalLibrary' => 'bootstrap',
  'modalSize' => 'modal-xl',
  'mouseoverDelay' => 350,
  'debug' => 1
]}
```

:::
