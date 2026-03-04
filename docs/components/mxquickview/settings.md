---
title: Системные настройки
---
# Системные настройки

Все настройки имеют префикс `mxquickview_` и находятся в namespace **mxquickview**.

## Список настроек

* `mxquickview_allowed_chunk`

  **Описание**: список разрешённых чанков через запятую.

  **По умолчанию**: `mxqv_product,ms3_product_content,ms3_products_row`.

  **Где применяется**: рендер `data_action=chunk` в процессоре `Render`.

* `mxquickview_allowed_snippet`

  **Описание**: список разрешённых сниппетов через запятую.

  **По умолчанию**: `msCart,msMiniCart`.

  **Где применяется**: рендер `data_action=snippet`.

* `mxquickview_allowed_template`

  **Описание**: список разрешённых шаблонов (имена/ID) через запятую.

  **По умолчанию**: `''` (пусто).

  **Где применяется**: рендер `data_action=template`.

* `mxquickview_mouseover_delay`

  **Описание**: задержка перед отправкой AJAX-запроса при наведении.

  **По умолчанию**: `300` (мс).

  **Где применяется**: `window.mxqvConfig.mouseoverDelay`, обработчик `data-mxqv-mouseover`.

* `mxquickview_modal_size`

  **Описание**: размер встроенной модалки.

  **По умолчанию**: `modal-lg`.

  **Поддержка**: `modal-sm`, `modal-lg`, `modal-xl`.

* `mxquickview_front_css`

  **Описание**: подключать CSS компонента через `mxQuickView.initialize`.

  **По умолчанию**: `1`.

* `mxquickview_front_js`

  **Описание**: подключать JS компонента через `mxQuickView.initialize`.

  **По умолчанию**: `1`.

## Особенность `allowed_template`

Проверка `template` по whitelist выполняется только если `mxquickview_allowed_template` **не пустой**.
Если список пуст, template-рендер не фильтруется этим условием.

## Рекомендации

* Держите whitelist минимальным и явным.
* Для UX по наведению обычно достаточно `250-400` мс.
* Если используете внешний modal-фреймворк, применяйте `data-mxqv-mode="selector"` и свой контейнер.
