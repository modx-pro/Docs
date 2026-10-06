---
title: mxQuickView.initialize
---
# Сниппет mxQuickView.initialize

Подключает ресурсы `mxQuickView` на сайте, задаёт `window.mxqvConfig` и выводит HTML контейнер(ы) модалки.

## Что делает

- Подключает `css/mxqv.min.css` (если не найден — запасной `css/mxqv.css`).
- Публикует `window.mxqvConfig` (`connectorUrl`, `mouseoverDelay`, `modalSize`, `modalLibrary`, `debug`, `loadingText`).
- Подключает `js/mxqv.min.js` (если не найден — запасной `js/mxqv.js`).
- Всегда выводит контейнер нативной модалки (`#mxqv-modal-backdrop`, `#mxqv-modal`).
- Для `modalLibrary=bootstrap` дополнительно выводит контейнер `#mxqv-bootstrap-modal` и подключает Bootstrap CSS/JS.
- Для `modalLibrary=fancybox` подключает Fancybox CSS/JS.

Свои файлы ищутся сначала в публичном дереве `assets/components/mxquickview/`, потом в `core/components/mxquickview/assets/`; очередность `min` перед исходником. К URL добавляется `?v=` с `filemtime` найденного файла. Пути вендоров (Fancybox, Bootstrap) при непустом значении используются как есть, без проверки существования: см. [системные настройки](/components/mxquickview/settings).

## Разметка, на которую смотрит JS

| Элемент | Где появляется | Зачем |
| --- | --- | --- |
| `#mxqv-modal-backdrop`, `#mxqv-modal` | всегда | контейнер режима `native` |
| `#mxqv-modal-title` | всегда | заголовок модалки |
| `[data-mxqv-nav="prev"]`, `[data-mxqv-nav="next"]` | `native`, `bootstrap` | кнопки навигации по `data-mxqv-loop` |
| `[data-mxqv-close]` | `native`, `bootstrap` | кнопка закрытия |
| `#mxqv-modal-body`, `#mxqv-bootstrap-modal-body` | соответственно | область, внутрь которой вставляется ответ |
| `.qv-modal__loading` | `native`, `bootstrap` | текст `loadingText` до загрузки |
| `.qv-modal__content-area` | `native`, `bootstrap` | контейнер, куда кладётся HTML ответа |
| `#mxqv-bootstrap-modal`, `#mxqv-bootstrap-modal-title` | `bootstrap` | контейнер и заголовок Bootstrap-модалки |
| `.mxqv-bootstrap-actions` | `bootstrap` | обёртка кнопок навигации Bootstrap |
| `.mxqv-fancybox-content`, `[data-mxqv-fancybox-title]` | `fancybox` | JS собирает их сам при открытии, сниппет не выводит |

Размер из `modalSize` попадает в класс `#mxqv-modal`: `modal-sm` → `qv-modal__box--sm`, `modal-lg` → `qv-modal__box--lg`, `modal-xl` → `qv-modal__box--xl`. Неизвестное значение даёт `qv-modal__box--lg`. В режиме `bootstrap` класс идёт в `.modal-dialog`.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `modalSize` | перекрывает `mxquickview_modal_size` | Только `native`/`bootstrap`: `modal-sm`, `modal-lg`, `modal-xl` |
| `mouseoverDelay` | перекрывает `mxquickview_mouseover_delay` | Пустая строка = настройка (по умолчанию 300 мс) |
| `modalLibrary` | `native` | `native`, `bootstrap`, `fancybox` (`bootstrap5` alias) |
| `debug` | `mxquickview_debug` | В панели управления нет в списке свойств transport, передаётся через `&debug=` |
| `loadingText` | лексикон `mxqv_loading` | Не в свойствах transport, только через `&loadingText=` |
| `fancyboxCss` | `mxquickview_fancybox_css`, если параметр не задан или пустой | URL/путь к CSS Fancybox |
| `fancyboxJs` | то же | JS Fancybox |
| `bootstrapCss` | то же | CSS Bootstrap |
| `bootstrapJs` | то же | JS Bootstrap |

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
