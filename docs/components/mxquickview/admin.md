---
title: Руководство по админке
---
# Руководство по админке

## Где настраивать

- Панель управления: **Настройки → Системные настройки**
- Фильтр: `namespace = mxquickview`
- Область: `mxquickview_main`

Отдельной страницы компонента нет: управление через системные настройки и шаблоны/чанки сайта.

## Ключевые настройки

| Ключ | По умолчанию | Что контролирует |
| --- | --- | --- |
| `mxquickview_allowed_chunk` | `mxqv_product,mxqv_resource,ms3_product_content,ms3_products_row` | Какие чанки можно отрисовать (`mxqv_resource` — новости, статьи, страницы) |
| `mxquickview_allowed_snippet` | `msCart,msMiniCart` | Какие сниппеты можно отрисовать |
| `mxquickview_allowed_template` | | Какие шаблоны можно отрисовать |
| `mxquickview_mouseover_delay` | `300` | Задержка перед загрузкой по наведению |
| `mxquickview_modal_size` | `modal-lg` | Размер native/bootstrap (`modal-sm`, `modal-lg`, `modal-xl`) |
| `mxquickview_debug` | `0` | Диагностика `[mxqv]` в консоли, если параметр `debug` у сниппета не задан |
| `mxquickview_fancybox_css` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | Путь/URL к Fancybox CSS |
| `mxquickview_fancybox_js` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | Путь/URL к Fancybox JS |
| `mxquickview_bootstrap_css` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | Путь/URL к Bootstrap CSS. Пусто — файлы в `vendor/bootstrap`, затем CDN |
| `mxquickview_bootstrap_js` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | Путь/URL к Bootstrap JS. Пусто — файлы в `vendor/bootstrap`, затем CDN |

Параметр сниппета `modalLibrary` принимает `native`, `bootstrap`, `fancybox`.

## Рекомендованный порядок настройки

1. Оставьте в белом списке только доверенные элементы.
2. Проверьте `modal_size` и `mouseover_delay` под шаблон.
3. Подключите `mxQuickView.initialize` в базовый шаблон.
4. Добавьте триггеры quick view в карточки каталога.
5. Проверьте сценарии: click, mouseover, selector, loop.

## Практические сценарии

### Показ карточки товара через чанк

- Добавьте чанк (например, `mxqv_product`) в `mxquickview_allowed_chunk`.
- На кнопке товара:
  - `data-mxqv-click`
  - `data-mxqv-mode="modal"`
  - `data-mxqv-action="chunk"`
  - `data-mxqv-element="mxqv_product"`
  - `data-mxqv-id="..."`

### Показ корзины через сниппет

- Добавьте сниппет (например, `msCart`) в `mxquickview_allowed_snippet`.
- На кнопке: `data-mxqv-action="snippet"` и `data-mxqv-element="msCart"`.

### Вывод в свой контейнер (без встроенной модалки)

- На триггере: `data-mxqv-mode="selector"`.
- Укажите `data-mxqv-output=".css-selector"`.
- JS вставит HTML в этот контейнер.

### Настройка нативной модалки через CSS-переменные

- Для `modalLibrary = native` стили меняются без правки HTML/JS.
- Переопределяйте `--mxqv-*` в теме после подключения `mxqv.css`.
- Для `modalLibrary = fancybox` компонент берёт файлы из `assets/components/mxquickview/vendor/fancybox/`. Если их нет, подключается CDN `@fancyapps/ui`.
- Для `modalLibrary = bootstrap` — файлы из `assets/components/mxquickview/vendor/bootstrap/`. Если их нет, CDN `bootstrap`.
- Чаще меняют:
  - `--mxqv-modal-size-lg`, `--mxqv-modal-size-xl`
  - `--mxqv-backdrop-bg`
  - `--mxqv-header-padding`, `--mxqv-body-padding`
  - `--mxqv-modal-bg`, `--mxqv-modal-shadow`
- Полный список: [API и интерфейсы](/components/mxquickview/api) → [CSS переменные нативной модалки](/components/mxquickview/api#css-peremennye-nativnoj-modalki).

## Логика `allowed_template`

`template` всегда проверяется по белому списку `mxquickview_allowed_template`.
Если список пуст, `data_action="template"` вернёт `Template not allowed`.

## Чек-лист перед релизом

1. В белом списке нет лишних элементов.
2. У всех триггеров корректный `data-mxqv-id`.
3. Проверен ответ коннектора при ошибках (`Chunk/Snippet/Template not allowed`).
4. При `mode=selector` целевой контейнер есть в DOM.
5. При MiniShop3 проверено добавление в корзину из quick view (если MS3 на странице инициализирован).
