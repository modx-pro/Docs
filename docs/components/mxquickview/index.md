---
title: mxQuickView
description: Быстрый просмотр карточки товара и любых ресурсов по AJAX для MODX 3
author: ibochkarev
dependencies: ['minishop3', 'ms3Variants']

items: [
  {
    text: 'Начало работы',
    link: 'quick-start',
    items: [
      { text: 'Быстрый старт', link: 'quick-start' },
      { text: 'Системные настройки', link: 'settings' },
      { text: 'Типы рендера', link: 'types' },
    ],
  },
  {
    text: 'Интеграция на сайте',
    link: 'integration',
    items: [
      { text: 'Интеграция', link: 'integration' },
      { text: 'Подключение на сайте', link: 'frontend' },
      { text: 'Сниппеты (обзор)', link: 'snippets' },
      { text: 'Сниппет mxQuickView.initialize', link: 'snippets/mxquickview-initialize' },
    ],
  },
  {
    text: 'Администрирование',
    link: 'admin',
    items: [
      { text: 'Руководство по админке', link: 'admin' },
      { text: 'Права доступа', link: 'permissions' },
    ],
  },
  {
    text: 'Для разработчика',
    link: 'api',
    items: [
      { text: 'Контракты и параметры (API)', link: 'api' },
      { text: 'Потоки и сценарии работы', link: 'flows' },
      { text: 'Архитектура', link: 'architecture' },
    ],
  },
]
---
# mxQuickView

Быстрый просмотр карточки товара и любых ресурсов по AJAX для MODX 3.

`mxQuickView` загружает контент ресурса по AJAX и показывает его в модалке или в указанном контейнере (`selector`).

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Подключить mxQuickView на фронт (Fenom/MODX) | [Интеграция](integration) |
| Настроить whitelist и параметры в manager | [Админка](admin) |
| Понять endpoint, payload и ответы JSON | [API](api) |
| Разобраться с потоками (modal/selector, loop, variants) | [Потоки](flows) |
| Выбрать тип рендера (`chunk`, `snippet`, `template`) | [Типы рендера](types) |

## Кому что читать

- **Менеджеру**: [Админка](admin) -> [Интеграция](integration).
- **Разработчику**: [Архитектура](architecture) -> [API](api) -> [Типы рендера](types) -> [Потоки](flows).

## Что умеет дополнение

- Рендерит элементы трёх типов: `chunk`, `snippet`, `template`.
- Работает в режимах `modal` и `selector`.
- Поддерживает три библиотечных режима модалки: `native`, `bootstrap`, `fancybox`.
- Даёт навигацию prev/next внутри списка товаров при `data-mxqv-loop="true"`.
- Переинициализирует MiniShop3 UI после динамической подгрузки.
- Поддерживает ms3Variants в quick view (`variants_html`, `variants_json`, `has_variants`).

## Требования

- MODX Revolution 3+
- PHP 8.1+
- MiniShop3 (опционально, для корзины и product card UI)
- ms3Variants (опционально, для выбора вариантов в модалке)

## Быстрый старт

1. Установите пакет `mxQuickView`.
1. Проверьте namespace `mxquickview` в системных настройках (особенно whitelist).
1. Подключите в шаблоне: Fenom — `{'!mxQuickView.initialize'|snippet}`, MODX — `[[!mxQuickView.initialize]]`.
1. Добавьте trigger с data-атрибутами (`data-mxqv-click`, `data-mxqv-action`, `data-mxqv-element`, `data-mxqv-id`).

## Системные настройки (`mxquickview`)

| Ключ | По умолчанию | Назначение |
| --- | --- | --- |
| `mxquickview_allowed_chunk` | `mxqv_product,mxqv_resource,ms3_product_content,ms3_products_row` | Список разрешённых чанков |
| `mxquickview_allowed_snippet` | `msCart,msMiniCart` | Список разрешённых сниппетов |
| `mxquickview_allowed_template` | `` | Список разрешённых шаблонов (если пусто, `template`-рендер запрещён) |
| `mxquickview_mouseover_delay` | `300` | Задержка по mouseover (мс) |
| `mxquickview_modal_size` | `modal-lg` | Размер модалки (`modal-sm`, `modal-lg`, `modal-xl`) |
| `mxquickview_fancybox_css` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | Путь/URL к Fancybox CSS (override) |
| `mxquickview_fancybox_js` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | Путь/URL к Fancybox JS (override) |
| `mxquickview_bootstrap_css` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | Путь/URL к Bootstrap CSS (override) |
| `mxquickview_bootstrap_js` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | Путь/URL к Bootstrap JS (override) |
