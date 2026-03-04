---
title: Руководство по админке
---
# Руководство по админке

## Где настраивать

- Manager: **Настройки -> Системные настройки**
- Фильтр: `namespace = mxquickview`
- Область: `mxquickview_main`

## Ключевые настройки

| Ключ | По умолчанию | Что контролирует |
| --- | --- | --- |
| `mxquickview_allowed_chunk` | `mxqv_product,ms3_product_content,ms3_products_row` | Какие чанки можно рендерить через mxQuickView |
| `mxquickview_allowed_snippet` | `msCart,msMiniCart` | Какие сниппеты можно рендерить |
| `mxquickview_allowed_template` | `` | Какие шаблоны можно рендерить |
| `mxquickview_mouseover_delay` | `300` | Задержка перед загрузкой по наведению |
| `mxquickview_modal_size` | `modal-lg` | Размер встроенной модалки |
| `mxquickview_front_css` | `1` | Подключение CSS через `mxQuickView.initialize` |
| `mxquickview_front_js` | `1` | Подключение JS через `mxQuickView.initialize` |

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

## Важная особенность `allowed_template`

В текущей реализации `template` проверяется по whitelist только если список `mxquickview_allowed_template` **не пустой**.
Если список пуст, template-рендер не фильтруется этим условием.
