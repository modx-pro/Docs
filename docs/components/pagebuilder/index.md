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
      { text: 'Обзор полей', link: 'fields/overview' },
      { text: 'Справочник типов полей', link: 'fields/types' },
      { text: 'Каталог секций', link: 'sections/' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---
# PageBuilder

![Редактор секций на ресурсе](/components/pagebuilder/screenshots/mgr-sections-tab.png)

Страницу вы собираете из секций во вкладке **Секции** в MODX. Пока правите, изменения остаются черновиком. После **Опубликовать** на сайт уходит та же раскладка. Обычное поле **Содержимое** ресурса для секций не используется. На витрине блоки выводит сниппет `PageBuilder`.

Документация в боковом меню разбита по задачам: установка, редактор, вывод на сайте, Pro и справочники для разработчиков. С чего начать: [Быстрый старт](quick-start).

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
