---
title: Ключевые возможности
description: "Конструктор секций PageBuilder для MODX 3: редактор, черновик, каталог, Pro, таблицы и UTM"
---

# Ключевые возможности

PageBuilder собирает страницу из блоков-секций, а не из поля **Содержимое** ресурса. Редакторы работают во вкладке **Секции**: черновик, превью, публикация. Разработчики добавляют свои типы секций, поля и шаблоны вывода, подключаются через события `pbOn*`.

## Для кого

| Роль | Что получает |
| --- | --- |
| **Редактор** | Перетаскивание секций, инспектор полей, черновик, превью, публикация без правки шаблона |
| **Начинающий разработчик** | 50 готовых секций, 62 типа полей, JSON-схема и Fenom в chunks без своего Vue |
| **Опытный разработчик** | События, свои типы секций, табличные данные ресурса, UTM, интеграция с miniShop3 и Collections |

## Конструктор страницы

### 1. Редактор секций на ресурсе

Вкладка **Секции** на форме ресурса и панель **PageBuilder** используют один Vue-бандл через [VueTools](https://docs.modx.pro/components/vuetools/). Добавляйте секции из каталога, меняйте порядок перетаскиванием или Alt+↑/↓, дублируйте и копируйте блоки между ресурсами. Если закрыли инспектор **Отмена** сразу после добавления секции, черновик откатывается: пустой блок на странице не остаётся.

Подробнее: [Быстрый старт](quick-start), [Менеджер и события](integration).

### 2. Черновик и публикация

Автосохранение пишет черновик. Превью показывает его без публикации. **Сохранить** ресурса MODX проверяет поля и публикует раскладку на сайт. Сниппет `[[!PageBuilder]]` выводит только опубликованную версию.

Подробнее о хранении: [Рабочий процесс](workflow), [Разработчик → Модель данных](developer#model-dannyh).

### 3. Каталог секций Free и Pro

| Слой | Секций | Примеры |
| --- | --- | --- |
| **Free** | 12 | [hero](sections/hero), [richtext](sections/richtext), [gallery](sections/gallery), [video](sections/video), [faq](sections/faq), [cta](sections/cta) |
| **Pro** | 38 | [products_grid](sections/products_grid), [contact_form](sections/contact_form), [quiz](sections/quiz), [pricing_table](sections/pricing_table), [tabs](sections/tabs) |

Страницы секций: [каталог](sections/).

### 4. Инспектор и 62 типа полей

Схема полей задаётся в JSON секции: **35 типов Free** (text, repeater, migx, image, multiselect, video, tag…) и **27 Pro** (relation, gallery, combo, editorjs, embeddedTable…).

См. [Обзор полей](fields/overview) и [справочник типов](fields/types).

## PageBuilder Pro

Дополнение `pagebuilderpro` добавляет флаги Pro и расширяет редактор:

- Общие блоки: сохранить как shared (сразу link), pull с другой страницы (Связать | Копировать), локальные поля `libraryLocalFields`
- Журнал событий секции: View / Restore (capability `versions`)
- Шаблоны страниц: упорядоченные пустые секции (`pb_page_templates`)
- Примеры: готовые блоки во вкладке каталога (`pagebuilder_catalog_examples_enabled`)
- Поля по breakpoints: UI при `pagebuilder_responsive_editor_enabled`, вывод `pagebuilder_responsive_apply` (`manual` или `css`)
- Расширенные поля: 27 типов в панели управления (relation, map, table, editorjs, dependent и др., флаг `advanced-fields`)
- Глобальная корзина в панели управления: восстановление и окончательное удаление секций и строк таблиц (флаг `basket`)

Commerce-секции (`products_grid`, `curated_products`…) требуют [miniShop3](/components/minishop3/).

Подробнее: [PageBuilder Pro](pro), [Agent API](agent-api) для скриптов и агентов.

## Данные и интеграции

### 5. Табличные данные ресурса

Вкладка **Таблицы** на ресурсе хранит строки в `pb_*`: фильтры, пагинация, импорт CSV/JSON, корзина строк. Секция [data_table](sections/data_table) и сниппет `PageBuilderTableRows` выводят данные на сайте. Поле [embeddedTable](fields/embeddedTable) подключает таблицу по `table_key` без встроенных строк в JSON документа.

### 6. UTM и контексты

Реестр UTM в панели управления требует capability `utm` (Pro). Уже опубликованные правила видимости исполняет Free. Диалог **Видимость** в инспекторе включается настройкой `pagebuilder_inspector_visibility_enabled`. Плейсхолдер <code v-pre>{{utm:key}}</code> в полях. Сниппеты `PageBuilderUtmSession` и `PageBuilderUtmUrl` для сессии и ссылок. <!-- markdownlint-disable-line MD033 -->

### 7. Collections

Pro, capability `collections`. При `pagebuilder_collections_enabled` на ресурсе появляются вкладки Collections. Редактор секций и набор вкладок оказываются на одной форме. Без capability вкладки нет.

### 8. Корзина и undo

Корзина на странице есть в Free. Глобальная корзина в панели управления доступна в PageBuilder Pro (флаг `basket`). В редакторе работают отмена и повтор действий. Секции копируют между ресурсами без ручной правки JSON.

## Вывод на сайте

### 9. Fenom и chunks секций

Каждая секция отрисовывается через chunk с Fenom (pdoTools). Данные полей лежат в `section.data`. Примеры MODX и Fenom смотрите на страницах полей и в разделе [Вывод на сайте](frontend).

### 10. Сниппеты

| Сниппет | Назначение |
| --- | --- |
| `PageBuilder` | HTML опубликованных секций |
| `PageBuilderResource` | Секции другого ресурса |
| `PageBuilderSitemap` | XML sitemap по страницам с секциями |
| `PageBuilderTableRows` | Строки табличных данных ресурса |
| `PageBuilderUtmSession` / `PageBuilderUtmUrl` | UTM на фронте |
| `PageBuilderQuiz` / `PageBuilderContactForm` | FetchIt-handlers Pro (`quiz`, `contact_form`). Из шаблона не вызываются |
| [Public API](public-api) | JSON опубликованных секций для внешнего фронта (`api.php`) |

Полный список: [Сниппеты](snippets/).

### 11. События `pbOn*`

Plugin подписывается на save, publish, отрисовку, регистрацию типов секций и провайдеров Pro.

Список событий: [События](integration#sobytiya).

## Системные требования

| | |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ |
| pdoTools | 3.0+ |
| miniShop3 | опционально, для Pro commerce-секций |

Namespace в MODX: `pagebuilder`. Pro ставится дополнением `pagebuilderpro` (ядро Free подтягивается как зависимость).

## С чего начать

1. [Установка и первый ресурс](quick-start)
2. [Рецепты](recipes/)
3. [Каталог секций](sections/)
4. [FAQ](faq)
