---
title: Системные настройки
---
# Системные настройки

Все настройки имеют префикс `mxquickview_` и находятся в namespace `mxquickview`.

## Список настроек

| Ключ | По умолчанию | Где используется |
| --- | --- | --- |
| `mxquickview_allowed_chunk` | `mxqv_product,mxqv_resource,ms3_product_content,ms3_products_row` | `data_action=chunk` в `Render` |
| `mxquickview_allowed_snippet` | `msCart,msMiniCart` | `data_action=snippet` в `Render` |
| `mxquickview_allowed_template` | '' | `data_action=template` в `Render` |
| `mxquickview_mouseover_delay` | `300` | `window.mxqvConfig.mouseoverDelay` |
| `mxquickview_modal_size` | `modal-lg` | размер встроенной native/bootstrap модалки |
| `mxquickview_fancybox_css` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | override CSS для `modalLibrary=fancybox` |
| `mxquickview_fancybox_js` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | override JS для `modalLibrary=fancybox` |
| `mxquickview_bootstrap_css` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | override CSS для `modalLibrary=bootstrap` |
| `mxquickview_bootstrap_js` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | override JS для `modalLibrary=bootstrap` |

## Поведение по умолчанию для библиотек

- При `modalLibrary=fancybox`: если `mxquickview_fancybox_css/js` пустые, компонент пробует bundled файлы из `assets/components/mxquickview/vendor/fancybox/`, затем CDN.
- При `modalLibrary=bootstrap`: если `mxquickview_bootstrap_css/js` пустые, компонент пробует bundled файлы из `assets/components/mxquickview/vendor/bootstrap/`, затем CDN.

## Логика `allowed_template`

`template` всегда проверяется по `mxquickview_allowed_template`.
Если список пуст, рендер `data_action="template"` запрещён и вернёт `Template not allowed`.

## Рекомендации

- Держите whitelist минимальным и явным.
- Для UX по наведению обычно достаточно `250-400` мс.
- Если проект использует собственную модалку, применяйте `data-mxqv-mode="selector"`.
- Для быстрых просмотром не товаров добавляйте `mxqv_resource` в `mxquickview_allowed_chunk`.
