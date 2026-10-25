---
title: mxQuickView
description: Быстрый просмотр карточки товара и любых ресурсов по AJAX для MODX 3
author: Ibochkarev
logo: https://modstore.pro/assets/extras/mxquickview/logo.png
modstore: https://modstore.pro/packages/ecommerce/mxquickview
categories: catalog

compatibility:
  - modx3
  - php81
  - minishop3
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
      { text: 'Сниппеты (обзор)', link: 'snippets/' },
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

`mxQuickView` загружает контент ресурса по AJAX и показывает его в модалке или в контейнере (`selector`).

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Подключить на сайт (Fenom/MODX) | [Интеграция](/components/mxquickview/integration) |
| Настроить белый список в панели управления | [Админка](/components/mxquickview/admin) |
| Точка входа, тело запроса и ответы JSON | [API](/components/mxquickview/api) |
| Потоки (`modal`/`selector`, loop, варианты) | [Потоки](/components/mxquickview/flows) |
| Тип отрисовки (`chunk`, `snippet`, `template`) | [Типы рендера](/components/mxquickview/types) |

## Кому что читать

- **Менеджеру**: [Админка](/components/mxquickview/admin) → [Интеграция](/components/mxquickview/integration).
- **Разработчику**: [Архитектура](/components/mxquickview/architecture) → [API](/components/mxquickview/api) → [Типы рендера](/components/mxquickview/types) → [Потоки](/components/mxquickview/flows).

## Что умеет дополнение

- Отрисовывает три типа: `chunk`, `snippet`, `template`.
- Режимы `modal` и `selector`.
- Три библиотеки модалки: `native`, `bootstrap`, `fancybox`.
- Навигация prev/next в списке при `data-mxqv-loop="true"`: кнопки есть только в режимах `native` и `bootstrap`, в Fancybox остаются клавиши ← / →, которые работают во всех режимах.
- После подгрузки вызывает `ms3.cartUI`, `ms3.quantityUI`, `ms3.productCardUI.reinit()` и событие `ms3:cart:updated` (если MiniShop3 на странице).
- ms3Variants в quick view (`variants_html`, `variants_json`, `has_variants`).

## Требования

| Требование | Версия |
| --- | --- |
| mxQuickView | 1.0.1 |
| MODX Revolution | 3.0.0 и выше |
| PHP | 8.1 и выше |
| MiniShop3 | опционально, для корзины и product card UI |
| ms3Variants | опционально, для выбора вариантов в модалке |
| pdoTools | 3.x с Fenom, рекомендуется |

pdoTools нужен потому, что чанки поставки `mxqv_product` и `mxqv_resource` написаны на Fenom. Без pdoTools в HTML останутся сырые `{$…}`.

## Быстрый старт

1. Установите пакет `mxQuickView` через репозиторий ModStore: transport зашифрован, нужен провайдер `https://modstore.pro/extras/` и действующая лицензия.
2. Проверьте namespace `mxquickview` в системных настройках (особенно белый список).
3. Подключите в шаблоне: Fenom — `{'!mxQuickView.initialize'|snippet}`, MODX — `[[!mxQuickView.initialize]]`.
4. Добавьте триггер с `data-mxqv-click`, `data-mxqv-action`, `data-mxqv-element`, `data-mxqv-id`.

Ключи `mxquickview_*` и перекрытие свойств сниппета — в [системных настройках](/components/mxquickview/settings).
