---
title: Руководство по админке
---
# Руководство по админке

## Где настраивать

- Manager: **Настройки -> Системные настройки**
- Фильтр: `namespace = mxquickview`
- Область: `mxquickview_main`

У компонента нет отдельной manager-страницы: управление выполняется через системные настройки и шаблоны/чанки сайта.

## Ключевые настройки

| Ключ | По умолчанию | Что контролирует |
| --- | --- | --- |
| `mxquickview_allowed_chunk` | `mxqv_product,mxqv_resource,ms3_product_content,ms3_products_row` | Какие чанки можно рендерить (`mxqv_resource` — для новостей, статей, страниц) |
| `mxquickview_allowed_snippet` | `msCart,msMiniCart` | Какие сниппеты можно рендерить |
| `mxquickview_allowed_template` | `` | Какие шаблоны можно рендерить |
| `mxquickview_mouseover_delay` | `300` | Задержка перед загрузкой по наведению |
| `mxquickview_modal_size` | `modal-lg` | Размер встроенной модалки |
| `mxquickview_fancybox_css` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | Явный путь/URL к Fancybox CSS (override) |
| `mxquickview_fancybox_js` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | Явный путь/URL к Fancybox JS (override) |
| `mxquickview_bootstrap_css` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | Явный путь/URL к Bootstrap CSS (override); пусто — bundled `vendor/bootstrap`, затем CDN |
| `mxquickview_bootstrap_js` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | Явный путь/URL к Bootstrap JS (override); пусто — bundled `vendor/bootstrap`, затем CDN |

Параметр сниппета `modalLibrary` поддерживает режимы `native`, `bootstrap`, `fancybox`.

## Рекомендованный порядок настройки

1. Оставьте в whitelist только доверенные элементы.
2. Проверьте `modal_size` и `mouseover_delay` под UX шаблона.
3. Подключите `mxQuickView.initialize` в базовый шаблон.
4. Добавьте триггеры quick view в карточки каталога.
5. Протестируйте сценарии: click, mouseover, selector, loop.

## Практические сценарии

### Показ карточки товара через чанк

- Добавьте чанк (например, `mxqv_product`) в `mxquickview_allowed_chunk`.
- На кнопке товара используйте:
  - `data-mxqv-click`
  - `data-mxqv-mode="modal"`
  - `data-mxqv-action="chunk"`
  - `data-mxqv-element="mxqv_product"`
  - `data-mxqv-id="..."`

### Показ корзины через сниппет

- Добавьте сниппет (например, `msCart`) в `mxquickview_allowed_snippet`.
- На кнопке используйте `data-mxqv-action="snippet"` и `data-mxqv-element="msCart"`.

### Рендер в свой контейнер (без встроенной модалки)

- На триггере задайте `data-mxqv-mode="selector"`.
- Укажите `data-mxqv-output=".css-selector"`.
- JS вставит HTML в указанный контейнер.

### Кастомизация нативной модалки через CSS переменные

- Для `modalLibrary = native` стили модалки можно менять без правки HTML/JS.
- Переопределяйте `--mxqv-*` в теме после подключения `mxqv.css`.
- Для `modalLibrary = fancybox` компонент использует bundled-файлы в `assets/components/mxquickview/vendor/fancybox/`; если они недоступны, подключается CDN `@fancyapps/ui`.
- Для `modalLibrary = bootstrap` компонент использует bundled-файлы в `assets/components/mxquickview/vendor/bootstrap/`; если они недоступны, подключается CDN `bootstrap`.
- Чаще всего меняют:
  - `--mxqv-modal-size-lg`, `--mxqv-modal-size-xl`
  - `--mxqv-backdrop-bg`
  - `--mxqv-header-padding`, `--mxqv-body-padding`
  - `--mxqv-modal-bg`, `--mxqv-modal-shadow`
- Полный список переменных: [API и интерфейсы](api) -> раздел `CSS переменные нативной модалки`.

## Логика `allowed_template`

`template` всегда проверяется по whitelist `mxquickview_allowed_template`.
Если список пуст, `data_action="template"` будет возвращать `Template not allowed`.

## Чек-лист перед релизом

1. В whitelist нет лишних элементов.
2. Для всех триггеров задан корректный `data-mxqv-id`.
3. Проверен ответ коннектора при ошибках (`Chunk/Snippet/Template not allowed`).
4. Если используется `mode=selector`, целевой контейнер реально существует в DOM.
5. При наличии MiniShop3 проверено добавление товара в корзину из quick view.
