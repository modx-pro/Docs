---
title: Архитектура
---
# Архитектура mxQuickView

## Обзор компонентов

- **Сниппет инициализации**: `mxQuickView.initialize`
  Подключает CSS/JS, публикует `window.mxqvConfig`, выводит HTML встроенной модалки.
- **Frontend JS**: `assets/components/mxquickview/js/mxqv.js`
  Делегирование событий, AJAX-запросы к connector, отрисовка modal/selector, loop-навигация, ms3Variants-хелперы.
- **Коннектор**: `assets/components/mxquickview/connector.php`
  Единая HTTP-точка входа для action `render`.
- **Процессор**: `core/components/mxquickview/src/Processors/Render.php`
  Проверка whitelist, доступов к ресурсу, рендер `chunk|snippet|template`.
- **Базовый чанк товара**: `core/components/mxquickview/elements/chunks/mxqv_product.tpl`
  Разметка карточки для quick view с формой корзины и блоком вариантов.

## Поток данных (высокоуровнево)

1. Пользователь кликает/наводит на элемент с `data-mxqv-*`.
2. `mxqv.js` формирует POST-запрос в `connector.php`.
3. Коннектор валидирует HTTP-метод и `action=render`, затем вызывает `Render::run(...)`.
4. Процессор проверяет `id`, `element`, `data_action`.
5. Процессор загружает ресурс, проверяет право просмотра и валидирует whitelist.
6. Процессор рендерит HTML через `getChunk` или `runSnippet`.
7. Коннектор возвращает JSON `{success, html|message}`.
8. JS вставляет HTML в модалку или указанный selector-контейнер.

## Плейсхолдеры рендера

В рендер передаются:

- поля ресурса (`$resource->toArray()`);
- `content` ресурса;
- `assets_url`;
- при MiniShop3: поля `msProductData`;
- при ms3Variants: `has_variants`, `variants_html`, `variants_json`.

## Безопасность

- Коннектор обрабатывает только `POST`.
- Проверяется наличие ресурса (`id`, `deleted=0`).
- Проверяется контекст ресурса: если передан `context` и он не совпадает с `context_key` ресурса, возвращается `Access denied`.
- Проверяется опубликованность и окно публикации (`published`, `pub_date`, `unpub_date`), исключение — пользователи с правом `view_unpublished`.
- ACL проверяется через `checkPolicy('view') || checkPolicy('load') || hasPermission('view')`.
- Для `chunk` и `snippet` whitelist обязателен.
- Для `template` whitelist применяется только при непустом `mxquickview_allowed_template`.

## Хранилище данных

Компонент не создаёт собственные таблицы БД для quick view-логики: использует ресурсы MODX и (опционально) модели MiniShop3/ms3Variants.
