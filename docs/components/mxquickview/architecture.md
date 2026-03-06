---
title: Архитектура
---
# Архитектура mxQuickView

## Обзор компонентов

- **Сниппет инициализации**: `mxQuickView.initialize`
  Подключает CSS/JS, публикует `window.mxqvConfig`, подготавливает режимы модалки `native/bootstrap/fancybox`.
- **Frontend JS**: `assets/components/mxquickview/js/mxqv.min.js`
  Делегирование событий, AJAX-запросы к connector, отрисовка modal/selector, loop-навигация, ms3Variants-хелперы.
- **Коннектор**: `assets/components/mxquickview/connector.php`
  Единая HTTP-точка входа для action `render`.
- **Процессор**: `core/components/mxquickview/src/Processors/Render.php`
  Проверка whitelist, доступов к ресурсу, рендер `chunk|snippet|template`.
- **Базовый чанк товара**: `core/components/mxquickview/elements/chunks/mxqv_product.tpl`
  Разметка карточки для quick view с формой корзины и блоком вариантов.

## Поток данных (высокоуровнево)

1. Пользователь кликает/наводит на элемент с `data-mxqv-*`.
2. `mxqv.js` формирует POST-запрос в `connector.php` (`mode`, `data_action`, `element`, `id`, `context`, `output`, `modal_library`).
3. Коннектор валидирует HTTP-метод и `action=render`, затем вызывает `Render::run(...)`.
4. Процессор:
   - проверяет `id`, `element`, `data_action`;
   - загружает ресурс и проверяет право просмотра;
   - валидирует элемент по whitelist;
   - рендерит HTML через `getChunk` или `runSnippet`.
5. Коннектор возвращает JSON `{success, html|message}`.
6. JS вставляет HTML в выбранную модалку (`native/bootstrap/fancybox`) или в указанный selector-контейнер.

## Плейсхолдеры рендера

В рендер передаются:

- поля ресурса (`$resource->toArray()`);
- `content` ресурса;
- `assets_url`;
- при MiniShop3: поля `msProductData`;
- при ms3Variants: `has_variants`, `variants_html`, `variants_json`.

## Безопасность

- Коннектор обрабатывает только `POST`.
- Проверяется наличие ресурса (`id`, `deleted=0`) и право `view/load`.
- Для `chunk` и `snippet` whitelist обязателен.
- Для `template` whitelist обязателен; пустой `mxquickview_allowed_template` блокирует template-рендер.

## Хранилище данных

Компонент не создаёт собственные таблицы БД для quick view-логики: использует ресурсы MODX и (опционально) модели MiniShop3/ms3Variants.

## Файлы и роли

| Файл | Роль |
| --- | --- |
| `assets/components/mxquickview/connector.php` | Входная точка AJAX |
| `core/components/mxquickview/src/Processors/Render.php` | Бизнес-логика рендера |
| `core/components/mxquickview/elements/snippets/mxqv_initialize.php` | Подключение фронта и разметки модалки |
| `assets/components/mxquickview/js/mxqv.min.js` | Поведение на клиенте (минифицирован) |
| `assets/components/mxquickview/css/mxqv.min.css` | Стили модалки и карточки (минифицирован) |
