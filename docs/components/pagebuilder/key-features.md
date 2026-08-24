---
title: Ключевые возможности
description: Конструктор секций PageBuilder для MODX 3 — редактор, черновик, каталог, Pro, таблицы и UTM
---

# Ключевые возможности

PageBuilder хранит страницу как набор **секций** в sidecar-таблице `pb_pages`. Редакторы собирают лендинги и внутренние страницы во вкладке «Секции», разработчики расширяют каталог типов, поля и вывод через chunks и события `pbOn*`. Поле `modResource.content` компонент не перезаписывает.

## Для кого

| Роль | Что получает |
| --- | --- |
| **Редактор** | Drag-and-drop секций, инспектор полей, черновик, превью, публикация без правки шаблона |
| **Начинающий разработчик** | 34 готовых секции, 50 типов полей, JSON-схема и Fenom в chunks без своего Vue |
| **Опытный разработчик** | События, custom types, resource data tables, UTM, интеграция с miniShop3 и Collections |

## Конструктор страницы

### 1. Редактор секций на ресурсе

Вкладка **Секции** на форме ресурса и в CMP **PageBuilder** — один Vue-бандл через [VueTools](https://docs.modx.pro/components/vuetools/). Секции добавляют из каталога, меняют порядок перетаскиванием или Alt+↑/↓, дублируют и копируют между ресурсами.

Подробнее: [Быстрый старт](quick-start), [Менеджер и события](integration).

### 2. Черновик и публикация

Черновик (`draft_json`) и опубликованная версия (`published_json`) живут отдельно. Редактор сохраняет черновик, проверяет превью по подписанному токену и публикует, когда готов. Счётчики ревизий ведутся в `pb_pages`.

На сайте сниппет `[[!PageBuilder]]` выводит только опубликованные секции.

### 3. Каталог секций Free и Pro

| Слой | Секций | Примеры |
| --- | --- | --- |
| **Free** | 11 | [hero](sections/hero), [richtext](sections/richtext), [gallery](sections/gallery), [faq](sections/faq), [cta](sections/cta) |
| **Pro** | 23 | [products_grid](sections/products_grid), [contact_form](sections/contact_form), [pricing_table](sections/pricing_table), [tabs](sections/tabs) |

У каждой секции своя страница в [каталоге](sections/): зачем блок, где применять, что заполнить в инспекторе, похожие секции.

### 4. Инспектор и 50 типов полей

Схема полей задаётся в JSON секции. **26 типов Free** (text, repeater, editorjs, image…) и **24 Pro** (relation, gallery, combo, embeddedTable…). У каждого типа — справочная страница с блоками «Зачем», «Когда использовать», «Советы».

См. [Обзор полей](fields/overview) и [справочник типов](fields/types).

## PageBuilder Pro

Transport `pagebuilderpro` добавляет capability и расширяет редактор:

- **Библиотека секций** — сохранить блок, вставить на другой ресурс, править связанную копию
- **Версии** — снимки документа, diff, откат
- **Пресеты** — готовые наборы секций для типовых лендингов
- **Responsive-поля** — разные значения для desktop / tablet / mobile
- **Расширенные поля** — relation, map, table, dependent и др.

Commerce-секции (`products_grid`, `curated_products`…) требуют [miniShop3](/components/minishop3/).

Подробнее: [Менеджер и события → PageBuilder Pro](integration#pagebuilder-pro).

## Данные и интеграции

### 5. Resource data tables

Вкладка **Таблицы** на ресурсе хранит строки в `pb_*` (фильтры, пагинация, импорт CSV/JSON, корзина строк). Секция [data_table](sections/data_table) и сниппет `PageBuilderTableRows` выводят данные на фронте. Поле [embeddedTable](fields/embeddedTable) подключает таблицу по `table_key` без inline-строк в JSON.

### 6. UTM и контексты

Реестр UTM в CMP, правила видимости секций по меткам и контексту MODX. Плейсхолдеры `\{\{utm:key\}\}` в полях. Сниппеты `PageBuilderUtmSession` и `PageBuilderUtmUrl` для сессии и ссылок.

### 7. Collections

При включённых настройках `pagebuilder_collections_*` на ресурсе появляются вкладки Collections с iframe — редактор секций и коллекции на одной форме.

### 8. Корзина и undo

Per-page trash для секций, глобальная корзина в CMP, undo/redo в редакторе. Копирование секций между ресурсами без ручного JSON.

## Вывод на сайте

### 9. Fenom и chunks секций

Каждая секция рендерится через chunk с Fenom (pdoTools). Данные полей лежат в `section.data`. Примеры MODX и Fenom — на страницах полей и в [Вывод на сайте](frontend).

### 10. Сниппеты

| Сниппет | Назначение |
| --- | --- |
| `PageBuilder` | HTML опубликованных секций |
| `PageBuilderResource` | Секции другого ресурса |
| `PageBuilderSitemap` | XML sitemap по страницам с секциями |
| `PageBuilderTableRows` | Строки resource data table |
| `PageBuilderUtmSession` / `PageBuilderUtmUrl` | UTM на фронте |

Полный список параметров: [Сниппеты](snippets).

### 11. События `pbOn*`

Plugin подписывается на save, publish, render, регистрацию типов секций и провайдеров Pro. Точка расширения без правок ядра компонента.

Список событий: [Менеджер и события → События](integration#sobytiya).

## Системные требования

| | |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ |
| pdoTools | 3.0+ |
| miniShop3 | опционально, для Pro commerce-секций |

Namespace в MODX: `pagebuilder`. Pro ставится transport-пакетом `pagebuilderpro` (ядро Free подтягивается как зависимость).

## С чего начать

1. [Установка и первый ресурс](quick-start)
2. [Системные настройки](settings)
3. [Каталог секций](sections/)
4. [FAQ](faq)
