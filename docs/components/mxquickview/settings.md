---
title: Системные настройки
---
# Системные настройки

Все настройки имеют префикс `mxquickview_` и находятся в namespace `mxquickview`.

## Список настроек

| Настройка | Тип | По умолчанию | Где используется |
| --- | --- | --- | --- |
| `mxquickview_allowed_chunk` | `textfield` | `mxqv_product,mxqv_resource,ms3_product_content,ms3_products_row` | `data-mxqv-action="chunk"` в `Render` |
| `mxquickview_allowed_snippet` | `textfield` | `msCart,msMiniCart` | `data-mxqv-action="snippet"` в `Render` |
| `mxquickview_allowed_template` | `textfield` | '' | `data-mxqv-action="template"` в `Render` |
| `mxquickview_mouseover_delay` | `numberfield` | `300` | `window.mxqvConfig.mouseoverDelay` |
| `mxquickview_modal_size` | `textfield` | `modal-lg` | классы `modal-sm` / `modal-lg` / `modal-xl` только для `modalLibrary` `native` и `bootstrap` |
| `mxquickview_debug` | `combo-boolean` | `0` | `window.mxqvConfig.debug`, если параметр `debug` у сниппета не задан или пустой |
| `mxquickview_fancybox_css` | `textfield` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | переопределение CSS для `modalLibrary=fancybox` |
| `mxquickview_fancybox_js` | `textfield` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | переопределение JS для `modalLibrary=fancybox` |
| `mxquickview_bootstrap_css` | `textfield` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | переопределение CSS для `modalLibrary=bootstrap` |
| `mxquickview_bootstrap_js` | `textfield` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | переопределение JS для `modalLibrary=bootstrap` |

Ключи живут в области `mxquickview_main`, названия и описания берутся из лексикона пакета: `setting_mxquickview_<ключ>` и `setting_mxquickview_<ключ>_desc`, где `<ключ>` — часть после `mxquickview_` без префикса. Например, для `mxquickview_allowed_chunk` это `setting_mxquickview_allowed_chunk` («Разрешённые чанки») и `setting_mxquickview_allowed_chunk_desc`. Файлы лексикона: `core/components/mxquickview/lexicon/ru/setting.inc.php` и `.../en/setting.inc.php`, набор ключей ru и en совпадает.

## Переопределение URL ресурсов

`mxquickview.assets_url` читается через `getOption`. В transport ключа нет: после установки в namespace он не появляется. Создайте вручную или оставьте значение по умолчанию `[[++assets_url]]components/mxquickview/`.

Ключ задаёт базовый URL CSS, JS и `connector.php`.

## Параметры сниппета vs системные настройки

Явно переданное непустое свойство `mxQuickView.initialize` перекрывает одноимённую настройку `mxquickview_*`.

Пустая строка свойства = «не задано»: берётся системная настройка или запасной вариант в коде.

## Поведение по умолчанию для библиотек

При `modalLibrary=fancybox`: после нормализации пути, если URL пустой, компонент пробует файлы в `assets/components/mxquickview/vendor/fancybox/`, затем CDN `@fancyapps/ui`.

При `modalLibrary=bootstrap`: то же для `vendor/bootstrap/`, затем CDN Bootstrap 5.3.2.

Системные `mxquickview_fancybox_*` / `mxquickview_bootstrap_*` читаются, если параметр сниппета не передан или пустой.

## Логика `allowed_template`

`template` всегда проверяется по `mxquickview_allowed_template`.
Если список пуст, отрисовка `data_action="template"` запрещена и вернёт `Template not allowed`.

## Рекомендации

- Держите белый список минимальным и явным.
- Для наведения обычно достаточно `250-400` мс.
- Если на сайте своя модалка, применяйте `data-mxqv-mode="selector"`.
- Для быстрого просмотра не товаров добавьте `mxqv_resource` в `mxquickview_allowed_chunk`.
