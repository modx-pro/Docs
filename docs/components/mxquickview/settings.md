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
| `mxquickview_modal_size` | `modal-lg` | классы `modal-sm` / `modal-lg` / `modal-xl` только для `modalLibrary` `native` и `bootstrap` |
| `mxquickview_debug` | `0` | `window.mxqvConfig.debug`, если параметр `debug` у `mxQuickView.initialize` не передан |
| `mxquickview_fancybox_css` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | переопределение CSS для `modalLibrary=fancybox` |
| `mxquickview_fancybox_js` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | переопределение JS для `modalLibrary=fancybox` |
| `mxquickview_bootstrap_css` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | переопределение CSS для `modalLibrary=bootstrap` |
| `mxquickview_bootstrap_js` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | переопределение JS для `modalLibrary=bootstrap` |

## Переопределение URL ресурсов

- Системная настройка `mxquickview.assets_url` (namespace `mxquickview`) задаёт базовый URL `assets/components/mxquickview/` для CSS, JS и `connector.php`.
- По умолчанию: `[[++assets_url]]components/mxquickview/`.

## Параметры сниппета vs системные настройки

- Явно переданное свойство `mxQuickView.initialize` перекрывает одноимённую настройку `mxquickview_*`.
- Исключение PHP `??`: пустая строка в свойстве сниппета считается «переданной» и **не** подставляет значение из настроек (см. [issue #1](https://github.com/Ibochkarev/mxQuickView/issues/1)). Пустой `mouseoverDelay` → `(int)'' = 0`, в JS затем `|| 300`. Пустые `fancyboxCss` / `bootstrapCss` и т.п. не читают `mxquickview_fancybox_*` / `mxquickview_bootstrap_*`.
- Если параметр сниппета **не передан** (`null`), используется системная настройка или запасной вариант в коде.

## Поведение по умолчанию для библиотек

- При `modalLibrary=fancybox`: после нормализации пути, если URL пустой, компонент пробует файлы в `assets/components/mxquickview/vendor/fancybox/`, затем CDN `@fancyapps/ui`.
- При `modalLibrary=bootstrap`: то же для `vendor/bootstrap/`, затем CDN Bootstrap 5.3.2.
- Системные `mxquickview_fancybox_*` / `mxquickview_bootstrap_*` участвуют только когда соответствующий параметр сниппета не передан (не пустая строка из свойств).

## Логика `allowed_template`

`template` всегда проверяется по `mxquickview_allowed_template`.
Если список пуст, отрисовка `data_action="template"` запрещена и вернёт `Template not allowed`.

## Рекомендации

- Держите белый список минимальным и явным.
- Для наведения обычно достаточно `250-400` мс.
- Если на сайте своя модалка, применяйте `data-mxqv-mode="selector"`.
- Для быстрого просмотра не товаров добавьте `mxqv_resource` в `mxquickview_allowed_chunk`.
