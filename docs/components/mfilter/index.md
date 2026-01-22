---
title: mFilter
description: Фасетная фильтрация для MODX 3 с поддержкой SEO URL
logo: https://modstore.pro/assets/extras/mfilter2/logo-lg.png
author: biz87
repository: https://github.com/modx-pro/mFilter

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
    ],
  },
  {
    text: 'Интерфейс админки',
    link: 'interface/',
    items: [
      { text: 'Наборы фильтров', link: 'interface/filter-sets' },
      { text: 'Слаги', link: 'interface/slugs' },
      { text: 'Паттерны URL', link: 'interface/patterns' },
      { text: 'SEO шаблоны', link: 'interface/seo-templates' },
      { text: 'Словоформы', link: 'interface/word-forms' },
      { text: 'Обслуживание', link: 'interface/maintenance' },
    ],
  },
  {
    text: 'Фронтенд',
    link: 'frontend/',
    items: [
      { text: 'Шаблоны', link: 'frontend/templates' },
      { text: 'Плейсхолдеры', link: 'frontend/placeholders' },
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
      { text: 'Сортировка значений', link: 'cookbook/filter-values-sorting' },
      { text: 'Внешние фильтры', link: 'cookbook/external-filters' },
      { text: 'Свой тип фильтра', link: 'cookbook/custom-filter-type' },
    ],
  },
]
---
# mFilter

Фасетная фильтрация товаров и ресурсов для MODX Revolution 3.x с поддержкой SEO-friendly URL.

## Возможности

- **Фасетная фильтрация** — фильтрация по любым полям ресурсов, TV, опциям MiniShop3
- **SEO URL** — человекочитаемые URL вида `/catalog/brand_apple/color_black/`
- **Кросс-фильтрация** — подсчёт доступных значений с учётом активных фильтров
- **AJAX** — обновление результатов без перезагрузки страницы
- **Headless API** — REST API для интеграции с Vue, React, Svelte
- **SEO оптимизация** — динамические title, description, H1, canonical
- **Словоформы** — склонение названий фильтров в SEO-текстах
- **Интеграция** — работает с MiniShop3, mSearch, pdoTools
- **Vue-интерфейс** — современная админ-панель на Vue 3 + PrimeVue

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Зависимости

- **pdoTools 3.x** — для работы сниппетов и шаблонизатора Fenom
- **[VueTools](/components/vuetools/)** — для административного интерфейса
- **MiniShop3** *(опционально)* — для фильтрации товаров

## Установка

### Через менеджер пакетов

1. Перейдите в **Extras → Installer**
2. Нажмите **Download Extras**
3. Найдите **mFilter** в списке
4. Нажмите **Download** и затем **Install**

После установки:
1. Перейдите в **Extras → mFilter → Наборы фильтров**
2. Создайте набор фильтров для вашего каталога
3. Добавьте сниппеты на страницу каталога

## Быстрый старт

### 1. Создайте набор фильтров

В админке **Extras → mFilter → Наборы фильтров**:
- Создайте новый набор
- Добавьте нужные фильтры (опции MS3, TV, поля ресурсов)
- Привяжите к категориям каталога

### 2. Добавьте сниппеты на страницу

```fenom
{* Форма фильтров *}
{'!mFilterForm' | snippet}

{* Результаты с пагинацией *}
{'!mFilter' | snippet : [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'limit' => 24,
    'tpl' => 'mfilter.row'
]}

{* Пагинация *}
{$_modx->getPlaceholder('page.nav')}
```

### 3. SEO URL (опционально)

SEO URL включены по умолчанию. Фильтры создают URL вида:

```
/catalog/brand_apple/color_black-or-white/price_1000-5000/
```

Для кастомизации перейдите в **Наборы фильтров** и настройте слаги для значений фильтров.

## Архитектура

```
┌─────────────────────────────────────────────────────────┐
│                      Фронтенд                           │
├─────────────────┬───────────────────────────────────────┤
│   SSR режим     │           Headless режим              │
│  (mFilterForm)  │        (Vue/React/Svelte)             │
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
│   FilterSets | Slugs | Patterns | WordForms | Cache      │
└─────────────────────────────────────────────────────────┘
```

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

## Режимы работы

### SSR (Server-Side Rendering)

Традиционный режим — HTML генерируется на сервере:

```fenom
{'!mFilterForm' | snippet}
{'!mFilter' | snippet : ['element' => 'msProducts']}
```

Преимущества:
- Работает "из коробки"
- SEO-friendly
- Не требует JavaScript для первой загрузки

### Headless (для SPA)

API-режим для современных фреймворков:

```javascript
// Получить схему фильтров
const schema = await mfilter.getSchema(resourceId);

// Применить фильтры
const result = await mfilter.apply(
    { brand: ['apple'], price: { min: 1000, max: 5000 } },
    { sort: 'price-asc', page: 1 }
);
```

Подробнее: [Headless API](development/headless)