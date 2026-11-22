---
title: mFilter
description: Фасетная фильтрация для MODX 3 с поддержкой SEO URL
categories: catalog
popular: true
logo: https://modstore.pro/assets/extras/mfilter/logo.png
author: biz87

compatibility:
  - modx3
  - php81
  - vue3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Кэширование', link: 'cache' },
  {
    text: 'Сниппеты',
    link: 'snippets/',
    items: [
      { text: 'mFilter', link: 'snippets/mfilter' },
      { text: 'mFilterForm', link: 'snippets/mfilterform' },
      { text: 'mFilterSelected', link: 'snippets/mfilterselected' },
      { text: 'mFilterCrumbs', link: 'snippets/mfiltercrumbs' },
      { text: 'mFilterNav', link: 'snippets/mfilternav' },
      { text: 'mFilterSitemap', link: 'snippets/mfiltersitemap' },
    ],
  },
  {
    text: 'Интерфейс админки',
    link: 'interface/',
    items: [
      { text: 'Наборы фильтров', link: 'interface/filter-sets' },
      { text: 'Алиасы', link: 'interface/slugs' },
      { text: 'Паттерны URL', link: 'interface/patterns' },
      { text: 'SEO шаблоны', link: 'interface/seo-templates' },
      { text: 'Индивидуальные SEO', link: 'interface/seo-pages' },
      { text: 'Словоформы', link: 'interface/word-forms' },
      { text: 'Обслуживание', link: 'interface/maintenance' },
      { text: 'Scheduler-задачи', link: 'interface/scheduler' },
      { text: 'Прогрев кэша', link: 'interface/warmup' },
    ],
  },
  {
    text: 'Фронтенд',
    link: 'frontend/',
    items: [
      { text: 'Чанки', link: 'frontend/templates' },
      { text: 'Плейсхолдеры', link: 'frontend/placeholders' },
      { text: 'Пагинация', link: 'frontend/pagination' },
    ],
  },
  {
    text: 'Разработка',
    link: 'development/',
    items: [
      { text: 'JavaScript', link: 'development/javascript' },
      { text: 'JS API', link: 'development/js-api' },
      { text: 'Headless API', link: 'development/headless' },
      { text: 'Сервисы', link: 'development/services' },
      { text: 'Типы фильтров', link: 'development/filter-types' },
      { text: 'События', link: 'development/events' },
      { text: 'Модели и БД', link: 'development/models' },
    ],
  },
  {
    text: 'Интеграции',
    link: 'integration/',
    items: [
      { text: 'MiniShop3', link: 'integration/minishop3' },
      { text: 'mSearch', link: 'integration/msearch' },
    ],
  },
  {
    text: 'Рецепты',
    link: 'cookbook/',
    items: [
      { text: 'Фильтр выпадающим списком', link: 'cookbook/select-filter' },
      { text: 'Сортировка значений', link: 'cookbook/filter-values-sorting' },
      { text: 'Внешние фильтры', link: 'cookbook/external-filters' },
      { text: 'Свой тип фильтра', link: 'cookbook/custom-filter-type' },
      { text: 'Фильтры на странице поиска', link: 'cookbook/search-results-integration' },
      { text: 'Синхронизация индекса фасетов', link: 'cookbook/facet-index-sync' },
      { text: 'Посадочная страница под комбинацию фильтров', link: 'cookbook/landing-page' },
    ],
  },
  { text: 'История изменений', link: 'changelog/' },
]
---
# mFilter

Фасетная фильтрация товаров и ресурсов для MODX Revolution 3.x с поддержкой SEO-адресов.

## Возможности

- **Фасетная фильтрация** — по любым полям ресурсов, TV, опциям MiniShop3
- **Индекс фасетов** — индекс значений фильтров, ускоряет фильтрацию на больших каталогах. Сам обновляется после правок в админке и импорта MiniShop3; правки из кода подхватывает задача Scheduler раз в 5 минут ([подробнее](cookbook/facet-index-sync))
- **SEO-адреса** — человекочитаемые адреса вида `/catalog/brand--apple/color--black/`
- **Счётчики значений** — подсчёт доступных значений с учётом выбранных фильтров
- **AJAX** — обновление результатов без перезагрузки страницы
- **Headless API** — выдача, адреса и SEO-данные для своего фронтенда; форму фильтров пока выводит `mFilterForm` ([подробнее](development/headless))
- **SEO-оптимизация** — title, description, H1, canonical и `noindex` через [плейсхолдеры](frontend/placeholders)
- **Словоформы** — падежи значений фильтров и полей страницы в SEO-текстах
- **Сниппеты** — блок «Выбрано», хлебные крошки, ссылки на подборки, карта сайта ([список](snippets/))
- **Интеграция** — MiniShop3, mSearch, pdoTools
- **Интерфейс админки** — Vue 3 и PrimeVue

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3 |
| PHP | 8.1+, с MiniShop3 — 8.2+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

::: danger Проверьте PHP до установки
На PHP ниже 8.1 после установки mFilter перестанет открываться весь сайт — и витрина, и админка. Установщик версию PHP не проверяет.
:::

### Зависимости

| Пакет | Обязателен | Зачем |
|-------|------------|-------|
| pdoTools 3.0.2 и новее | Да | Сниппеты и шаблонизатор Fenom |
| [VueTools](/components/vuetools/) | Да | Интерфейс админки |
| MiniShop3 | Нет | Фильтрация товаров |
| [Scheduler](/components/scheduler/) | Нет. Ставьте до mFilter | Фоновые задачи: синхронизация индекса фасетов, прогрев, карта сайта |

pdoTools и VueTools установщик скачает и поставит сам. Если не получилось — поставьте их вручную до открытия админки.

## Установка

Пакет распространяется через [modstore.pro](https://modstore.pro) и при установке проверяет лицензию. Серверу нужен доступ к modstore.pro.

1. Перейдите в **Пакеты → Установщик**.
2. В меню у кнопки **Загрузить пакеты** выберите поставщика **modstore.pro** — откроется его каталог. Ключ API поставщика — в личном кабинете modstore.pro. Сама кнопка открывает каталог поставщика по умолчанию, modx.com, — mFilter там нет.
3. Найдите **mFilter** и нажмите **Загрузить**, затем **Установить**.

Менеджерам без флага sudo нужны права — см. [Интерфейс админки](interface/index#prava-dostupa).

## Быстрый старт

### 1. Создайте набор фильтров

В админке **Пакеты → mFilter → Наборы фильтров**:

1. Создайте набор.
2. Добавьте фильтры: опции MiniShop3, TV, поля ресурсов.
3. Привяжите набор к категориям каталога.

### 2. Добавьте сниппеты на страницу

`mFilter` вызывается первым и выводится через переменную — иначе числа в форме не сойдутся с выдачей:

```fenom
{set $catalog = '!mFilter' | snippet : [
    'element' => 'msProducts',
    'parents' => $_modx->resource.id,
    'limit' => 24
]}

{* Форма фильтров *}
{'!mFilterForm' | snippet}

{* Результаты с пагинацией *}
{$catalog}
```

Пошаговая настройка с шаблоном каталога — в [Быстром старте](quick-start).

### 3. SEO-адреса (опционально)

SEO-адреса включены по умолчанию и выглядят так:

```
/catalog/brand--apple/color--black-or-white/price--1000--5000/
```

Чтобы поменять запись значения в адресе, исправьте алиас на вкладке [Алиасы](interface/slugs).

## Режимы работы

### Сниппеты

Сниппеты выводят HTML на сервере, фильтрацию без перезагрузки выполняет скрипт mFilter. Пример вызова — в [Быстром старте](#dobavte-snippety-na-stranicu).

Преимущества:

- Работает «из коробки»
- Страница с фильтрами индексируется поисковиками
- Первая загрузка не требует JavaScript

### Headless API

Для своего фронтенда: выдача, адреса и SEO-данные приходят через API. Значений фильтров для формы в API пока нет — форму выводит `mFilterForm`.

```javascript
document.addEventListener('mfilter:ready', async () => {
    const response = await mfilter.api.apply({
        resource_id: 5,
        filters: { 'price|min': ['1000'], 'price|max': ['5000'] },
        sort: 'price-asc',
    });

    response.items;   // товары
    response.urls;    // SEO-адреса
});
```

Подробнее: [Headless API](development/headless)

## Архитектура

```
┌─────────────────────────────────────────────────────────┐
│                      Фронтенд                           │
├─────────────────┬───────────────────────────────────────┤
│  Сниппеты       │           Свой фронтенд               │
│  (mFilterForm)  │          (Headless API)               │
├─────────────────┴───────────────────────────────────────┤
│                    JavaScript API                        │
│         FilterUI / ApiClient / FilterAPI / Hooks         │
├─────────────────────────────────────────────────────────┤
│                      REST API                            │
│    /api/v1/filter/schema | apply | suggestions | ...     │
├─────────────────────────────────────────────────────────┤
│                       Сервисы                            │
│  Filter | FilterSet | SlugManager | UrlRouter | SEO...   │
├─────────────────────────────────────────────────────────┤
│                     База данных                          │
│  FilterSets | FacetIndex | Slugs | Patterns | SEO | ...  │
└─────────────────────────────────────────────────────────┘
```

Все таблицы — в [Моделях и базе данных](development/models).

## Отличия от mFilter2

mFilter — это полностью переписанный компонент для MODX 3.x:

| Аспект | mFilter2 | mFilter |
|--------|----------|---------|
| MODX | 2.x | 3.x |
| PHP | 5.6+ | 8.1+ |
| Интерфейс | ExtJS | Vue 3 + PrimeVue |
| Архитектура | Процедурный | Service-based |
| SEO URL | Отдельный плагин | Встроено |
| Headless API | Нет | REST API v1 |
| Типы фильтров | Фиксированные | Расширяемые |
| Конфигурация | В сниппете | Наборы фильтров в админке |
| Кэширование | Базовое | Многоуровневое |
