---
title: PageBuilder
description: "Визуальный конструктор секций для MODX 3: черновик и публикация без перезаписи content ресурса"
author: ibochkarev
dependencies: [VueTools, pdoTools]
categories: utilities

items: [
  {
    text: 'Начало работы',
    link: 'quick-start',
    items: [
      { text: 'Ключевые возможности', link: 'key-features' },
      { text: 'Быстрый старт', link: 'quick-start' },
      { text: 'Системные настройки', link: 'settings' },
    ],
  },
  {
    text: 'Редактор и менеджер',
    link: 'workflow',
    items: [
      { text: 'Рабочий процесс', link: 'workflow' },
      { text: 'Панель управления', link: 'cmp' },
      { text: 'Менеджер и события', link: 'integration' },
    ],
  },
  {
    text: 'Вывод на сайте',
    link: 'frontend',
    items: [
      { text: 'Шаблон и CSS', link: 'frontend' },
      { text: 'Дизайн-система', link: 'design-system' },
      { text: 'Public API', link: 'public-api' },
      {
        text: 'Сниппеты',
        link: 'snippets/',
        items: [
          { text: 'Обзор', link: 'snippets/' },
          { text: 'PageBuilder', link: 'snippets/PageBuilder' },
          { text: 'PageBuilderResource', link: 'snippets/PageBuilderResource' },
          { text: 'PageBuilderSitemap', link: 'snippets/PageBuilderSitemap' },
          { text: 'PageBuilderUtmSession', link: 'snippets/PageBuilderUtmSession' },
          { text: 'PageBuilderUtmUrl', link: 'snippets/PageBuilderUtmUrl' },
          { text: 'PageBuilderTableRows', link: 'snippets/PageBuilderTableRows' },
        ],
      },
    ],
  },
  {
    text: 'PageBuilder Pro',
    link: 'pro',
    items: [
      { text: 'Обзор Pro', link: 'pro' },
      { text: 'Agent API', link: 'agent-api' },
    ],
  },
  {
    text: 'Разработчик',
    link: 'developer',
    items: [
      { text: 'Секции, поля, расширения', link: 'developer' },
    ],
  },
  {
    text: 'Типы полей',
    link: 'fields/types',
    items: [
      { text: 'Обзор полей', link: 'fields/overview' },
      { text: 'Справочник типов', link: 'fields/types' },
      {
        text: 'Free',
        link: 'fields/types',
        items: [
          { text: 'ace', link: 'fields/ace' },
          { text: 'button', link: 'fields/button' },
          { text: 'checkbox', link: 'fields/checkbox' },
          { text: 'checkboxgroup', link: 'fields/checkboxgroup' },
          { text: 'color', link: 'fields/color' },
          { text: 'colorpalette', link: 'fields/colorpalette' },
          { text: 'date', link: 'fields/date' },
          { text: 'datetime', link: 'fields/datetime' },
          { text: 'editorjs', link: 'fields/editorjs' },
          { text: 'file', link: 'fields/file' },
          { text: 'heading', link: 'fields/heading' },
          { text: 'hidden', link: 'fields/hidden' },
          { text: 'image', link: 'fields/image' },
          { text: 'multiselect', link: 'fields/multiselect' },
          { text: 'number', link: 'fields/number' },
          { text: 'radio', link: 'fields/radio' },
          { text: 'readonly', link: 'fields/readonly' },
          { text: 'repeater', link: 'fields/repeater' },
          { text: 'resourcelist', link: 'fields/resourcelist' },
          { text: 'richtext', link: 'fields/richtext' },
          { text: 'select', link: 'fields/select' },
          { text: 'slug', link: 'fields/slug' },
          { text: 'text', link: 'fields/text' },
          { text: 'textarea', link: 'fields/textarea' },
          { text: 'time', link: 'fields/time' },
          { text: 'toggle', link: 'fields/toggle' },
          { text: 'url', link: 'fields/url' },
          { text: 'video', link: 'fields/video' },
          { text: 'xtype', link: 'fields/xtype' },
          { text: 'yesno', link: 'fields/yesno' },
        ],
      },
      {
        text: 'Pro',
        link: 'fields/types',
        items: [
          { text: 'chunk', link: 'fields/chunk' },
          { text: 'combo', link: 'fields/combo' },
          { text: 'currency', link: 'fields/currency' },
          { text: 'dependent', link: 'fields/dependent' },
          { text: 'embeddedTable', link: 'fields/embeddedTable' },
          { text: 'fieldset', link: 'fields/fieldset' },
          { text: 'gallery', link: 'fields/gallery' },
          { text: 'imask', link: 'fields/imask' },
          { text: 'jsongrid', link: 'fields/jsongrid' },
          { text: 'keyvalue', link: 'fields/keyvalue' },
          { text: 'map', link: 'fields/map' },
          { text: 'multicombo', link: 'fields/multicombo' },
          { text: 'multirelation', link: 'fields/multirelation' },
          { text: 'relation', link: 'fields/relation' },
          { text: 'snippet', link: 'fields/snippet' },
          { text: 'table', link: 'fields/table' },
          { text: 'tablecombo', link: 'fields/tablecombo' },
          { text: 'tablemulticombo', link: 'fields/tablemulticombo' },
          { text: 'tag', link: 'fields/tag' },
          { text: 'tv', link: 'fields/tv' },
        ],
      },
    ],
  },
  {
    text: 'Каталог секций',
    link: 'sections/',
    items: [
      { text: 'Обзор каталога', link: 'sections/' },
      {
        text: 'Free',
        link: 'sections/',
        items: [
          { text: 'Вопросы и ответы', link: 'sections/faq' },
          { text: 'Галерея', link: 'sections/gallery' },
          { text: 'Изображение', link: 'sections/image' },
          { text: 'Карточки', link: 'sections/cards' },
          { text: 'Контакты', link: 'sections/contact' },
          { text: 'Отзывы клиентов', link: 'sections/testimonials' },
          { text: 'Отступ', link: 'sections/spacer' },
          { text: 'Первый экран (Hero)', link: 'sections/hero' },
          { text: 'Призыв к действию', link: 'sections/cta' },
          { text: 'Текстовый блок', link: 'sections/richtext' },
          { text: 'Цифры и факты', link: 'sections/stats' },
        ],
      },
      {
        text: 'Pro',
        link: 'sections/',
        items: [
          { text: 'Видео', link: 'sections/video' },
          { text: 'Вкладки', link: 'sections/tabs' },
          { text: 'Записи блога', link: 'sections/blog_posts' },
          { text: 'Карта', link: 'sections/map' },
          { text: 'Карусель галереи', link: 'sections/gallery_carousel' },
          { text: 'Карусель товаров', link: 'sections/products_carousel' },
          { text: 'Команда', link: 'sections/team' },
          { text: 'Контакты с картой', link: 'sections/contact_map' },
          { text: 'Логотипы партнёров', link: 'sections/logos' },
          { text: 'Подборка товаров', link: 'sections/curated_products' },
          { text: 'Похожие товары', link: 'sections/related_products' },
          { text: 'Преимущества', link: 'sections/features' },
          { text: 'Промо-баннер', link: 'sections/promo_banner' },
          { text: 'Ряд брендов', link: 'sections/brands_row' },
          { text: 'Ряд категорий', link: 'sections/categories_row' },
          { text: 'Сетка товаров', link: 'sections/products_grid' },
          { text: 'Сравнение товаров', link: 'sections/product_comparison' },
          { text: 'Структурированный контент', link: 'sections/structured_content' },
          { text: 'Таблица данных', link: 'sections/data_table' },
          { text: 'Таблица характеристик', link: 'sections/spec_table' },
          { text: 'Тарифы', link: 'sections/pricing_table' },
          { text: 'Товар в фокусе', link: 'sections/product_spotlight' },
          { text: 'Форма обратной связи', link: 'sections/contact_form' },
        ],
      },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---
# PageBuilder

![Редактор секций на ресурсе](/components/pagebuilder/screenshots/mgr-sections-tab.png)

Страницу вы собираете из секций во вкладке **Секции** в MODX. Пока правите, изменения остаются черновиком. После **Опубликовать** на сайт уходит та же раскладка. Обычное поле **Содержимое** ресурса для секций не используется. На витрине блоки выводит сниппет `PageBuilder`.

В боковом меню: установка, редактор, вывод на сайте, Pro, раздел разработчика, отдельные списки [типов полей](fields/types) и [секций](sections/). С чего начать: [Быстрый старт](quick-start).

## Возможности

### Редактор на ресурсе

Во вкладке **Секции** таблица блоков: добавление из каталога, перетаскивание и Alt+↑/↓, дублирование, копирование секций с другой страницы. Удалённые секции попадают в корзину страницы, их можно вернуть или очистить. В инспекторе правите контент и настройки. Превью черновика открывается в drawer по подписанной ссылке, без публикации. Undo/redo работает в текущей сессии. Перед публикацией редактор проверяет обязательные поля и открывает инспектор у первой ошибки.

### Черновик и публикация

Правки сохраняются в черновик. После **Опубликовать** та же раскладка уходит на сайт. **Снять с публикации** очищает опубликованную версию, черновик остаётся. При сохранении сервер сверяет номер ревизии, чтобы не затереть чужие правки.

### Free: секции и поля

11 встроенных типов: hero, richtext, gallery, faq, cta, cards, contact, stats, testimonials, image, spacer. В панели управления можно править каталог, скрывать встроенные типы и добавлять свои через JSON (`pagebuilder_manage_types`). 30 типов полей в инспекторе: text, richtext, repeater, file, select и др. Часть полей поддерживает разные значения по breakpoint (responsive).

### PageBuilder Pro

Глобальная библиотека секций, снимки версий и журнал событий, пресеты, [Agent API](agent-api) для скриптов и агентов. **Корзина** в панели управления восстанавливает удалённые секции и строки таблиц между ресурсами. Каталог Pro: features, video, team, tabs, карты, формы, commerce-блоки miniShop3 (сетки товаров, бренды, pricing и др.). Ещё 20 типов полей: gallery, map, relation, table, embeddedTable и др.

### Таблицы на ресурсе

Вкладка **Таблицы** хранит большие наборы строк в БД: фильтры, импорт CSV/JSON, массовое удаление. На витрине строки выводит `PageBuilderTableRows`. Секция `data_table` (Pro) встраивает небольшую таблицу в JSON секции.

### UTM и контексты

В панели управления задаёте реестр UTM-меток. В settings секции можно ограничить вывод по контексту MODX и по UTM. Сниппеты `PageBuilderUtmSession` и `PageBuilderUtmUrl` помогают на лендингах. В полях доступен плейсхолдер <code v-pre>{{utm:key}}</code>.

### Collections и панель управления

При `collections_enabled` вкладки ресурса (секции, таблицы, iframe и др.) настраиваются в панели управления. Раздел **Компоненты → PageBuilder** ведёт каталог ресурсов с секциями и типами секций.

### Сниппеты, Public API и события

`PageBuilder` выводит HTML секций, `PageBuilderResource` отдаёт секции другого ресурса, `PageBuilderSitemap` строит XML sitemap. [Public API](public-api) отдаёт опубликованные секции JSON для headless-фронта (`api.php`). События `pbOn*` подключают плагины к save, publish, render и регистрации типов секций. Подробнее: [workflow](workflow), [cmp](cmp), [pro](pro).

## Системные требования

| Требование | Значение |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ (редактор в менеджере) |
| pdoTools | 3.0+ (Fenom в chunks секций) |
| miniShop3 | опционально, для Pro-секций каталога |

## Пакеты

| Дополнение | Версия | Содержимое |
| --- | --- | --- |
| `pagebuilder` | 1.0.1-beta | Free: core, 11 секций, панель управления, сниппеты |
| `pagebuilderpro` | 1.0.1-beta | Pro: зависит от `pagebuilder` ≥ 1.0.1, расширенный каталог и функции |

Namespace в MODX: `pagebuilder`.

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Обзор возможностей | [Ключевые возможности](key-features) |
| Установить и собрать первую страницу | [Быстрый старт](quick-start) |
| Все ключи `pagebuilder_*` | [Системные настройки](settings) |
| Черновик, публикация, корзина | [Рабочий процесс](workflow) |
| Blocks, UTM, Collections, корзина Pro | [Панель управления](cmp) |
| Права, события `pbOn*`, модель данных | [Менеджер и события](integration) |
| Шаблон, превью, кеш сниппета | [Вывод на сайте](frontend) |
| CSS-токены и BEM секций | [Дизайн-система](design-system) |
| JSON для headless | [Public API](public-api) |
| Сниппеты и параметры | [Сниппеты](snippets/) |
| Pro, корзина, пресеты | [PageBuilder Pro](pro) |
| Скрипты и агенты | [Agent API](agent-api) |
| Свои секции и расширения | [Разработчик](developer) |
| 50 типов полей инспектора | [Справочник типов полей](fields/types) |
| 34 встроенных блока | [Каталог секций](sections/) |
| Типовые ошибки | [FAQ](faq) |

## Точки входа

| URL / путь | Назначение |
| --- | --- |
| Компонент `pagebuilder` → `index` | Каталог ресурсов с секциями, типы секций (Pro) |
| `assets/components/pagebuilder/connector.php` | MGR API (VueTools) |
| `assets/components/pagebuilder/preview.php` | Превью черновика в iframe |
| `assets/components/pagebuilder/api.php` | Public API: опубликованные секции JSON (headless) |
| Сниппет `[[!PageBuilder]]` | HTML опубликованных секций на сайте |

## Права

| Permission | Назначение |
| --- | --- |
| `pagebuilder_view` | Вкладка «Секции», каталог, токен превью |
| `pagebuilder_save` | Сохранение черновика и публикация (fallback: `save_document`) |
| `pagebuilder_manage_types` | панель управления «Типы секций» (без fallback на view) |

Доступ к конкретному ресурсу дополнительно проверяет политика MODX (`view`, `save`).
