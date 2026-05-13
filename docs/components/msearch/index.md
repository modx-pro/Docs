---
title: mSearch
description: Полнотекстовый поиск с морфологическим анализом для MODX 3
logo: https://modstore.pro/assets/extras/msearch/logo.png
author: biz87
repository: https://github.com/modx-pro/msearch

items: [
  {
    text: 'Сниппеты',
    items: [
      { text: 'mSearch', link: 'snippets/msearch' },
      { text: 'mSearchForm', link: 'snippets/msearchform' },
    ],
  },
  {
    text: 'Интерфейс',
    items: [
      { text: 'Поиск', link: 'interface/search' },
      { text: 'Индексация', link: 'interface/indexes' },
      { text: 'Запросы', link: 'interface/queries' },
      { text: 'Алиасы', link: 'interface/aliases' },
      { text: 'Словари', link: 'interface/dictionaries' },
    ],
  },
  { text: 'JavaScript API', link: 'javascript-api' },
  { text: 'Системные настройки', link: 'system-settings' },
  { text: 'Плагин и события', link: 'plugin-and-events' },
  { text: 'Расширение компонента', link: 'extending' },
]
---
# mSearch

Полнотекстовый поиск с морфологическим анализом для MODX Revolution 3.x.

## Возможности

- **Морфологический анализ** — поиск по словоформам с помощью библиотеки phpMorphy (русский, английский, немецкий, украинский языки)
- **Словарный индекс** — быстрый поиск с настраиваемыми весами полей
- **Алиасы поиска** — синонимы и замены для расширения результатов
- **Статистика запросов** — отслеживание популярных запросов
- **Автоматическая индексация** — при сохранении ресурсов
- **Отложенная индексация** — фоновая индексация через [Scheduler](/components/scheduler/)
- **Vue-интерфейс** — современная админ-панель на Vue 3 + PrimeVue
- **Автодополнение** — подсказки при вводе запроса
- **Публичный API** — REST endpoint для AJAX-поиска и интеграций
- **Headless-режим** — JavaScript API (`window.msearch`) для React/Vue/кастомных решений
- **Система хуков** — расширение поведения поиска через `msearchHooks`
- **Мульти-контекст** — фильтрация результатов по контекстам MODX

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Зависимости

- **pdoTools 3.x** — для работы сниппетов и шаблонизатора Fenom
- **[VueTools](/components/vuetools/)** — для административного интерфейса
- **[Scheduler](/components/scheduler/)** *(опционально)* — для отложенной индексации

## Установка

### Через менеджер пакетов

1. Перейдите в **Extras → Installer**
2. Нажмите **Download Extras**
3. Найдите **mSearch** в списке
4. Нажмите **Download** и затем **Install**

После установки:

1. Перейдите в **Extras → mSearch → Словари**
2. Скачайте морфологический словарь для нужного языка (русский, английский, немецкий, украинский)
3. Перейдите на вкладку **Индексация** и создайте поисковый индекс

## Быстрый старт

### 1. Создайте страницу поиска

Создайте ресурс для вывода результатов поиска, например `/search/`.

### 2. Добавьте форму и результаты

```fenom
{'!mSearchForm' | snippet : [
    'pageId' => 5,
    'autocomplete' => 1
]}

{'!mSearch' | snippet : [
    'tpl' => 'mSearch.row',
    'limit' => 10
]}
```

### 3. Настройте индексацию

Укажите в системных настройках поля для индексации:

```
mse_index_fields = pagetitle:3,longtitle:2,description:2,introtext:2,content:1
```

Числа — это веса полей. Чем больше вес, тем выше будут результаты с совпадениями в этом поле.

## Системные настройки

Все настройки имеют префикс `mse_` и находятся в пространстве имён `msearch`. Сгруппированы по областям **Индексация**, **Поиск**, **Фронтенд**.

Полное описание всех настроек с дефолтами и use-cases — на отдельной странице [Системные настройки](/components/msearch/system-settings).

## Плейсхолдеры

После выполнения поиска доступны плейсхолдеры:

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+mse.total]]` | Общее количество найденных результатов |
| `[[+mse.query]]` | Обработанный поисковый запрос |

В чанке результата (tpl):

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+weight]]` | Вес (релевантность) результата |
| `[[+intro]]` | Текст с подсвеченными совпадениями |
| `[[+idx]]` | Порядковый номер результата |

## События

| Событие | Описание |
|---------|----------|
| `mseOnRegisterAdapters` | Регистрация адаптеров для индексации кастомных моделей |
| `mseOnBeforeIndex` | Перед индексацией ресурса |
| `mseOnGetWorkFields` | Изменение списка полей для индексации |
| `mseOnAfterIndex` | После индексации ресурса |
| `mseOnBeforeSearch` | Перед выполнением поиска |
| `mseOnAfterSearch` | После выполнения поиска |

## Отличия от mSearch2

mSearch — это полностью переписанный компонент для MODX 3.x:

| Аспект | mSearch2 | mSearch |
|--------|----------|---------|
| MODX | 2.x | 3.x |
| PHP | 5.6+ | 8.1+ |
| Интерфейс | ExtJS | Vue 3 + PrimeVue |
| Архитектура | Процедурный | Service-based |
| Алиасы | Синонимы | Алиасы (синонимы + замены) |
| Фильтрация | mFilter2 | Нет (используйте pdoTools) |
| phpMorphy | Встроенный | Composer-пакет `cijic/phpmorphy` |
| Источник словарей | SourceForge | GitHub |
| Эстонский язык | Да | Нет |
| Scheduler | Нет | Да (отложенная индексация) |

::: warning mFilter2
Сниппет mFilter2 не входит в mSearch. Для фильтрации используйте стандартные возможности pdoTools или сторонние решения.
:::

## Примеры

### Базовый поиск

```fenom
<form action="{'search' | url}" method="get">
    <input type="text" name="mse_query" value="{$_GET['mse_query']}" placeholder="Поиск...">
    <button type="submit">Найти</button>
</form>

{'!mSearch' | snippet : [
    'tpl' => 'mSearch.row',
    'limit' => 10
]}
```

### С пагинацией

```fenom
{'!mSearchForm' | snippet : ['pageId' => $_modx->resource.id]}

{'!pdoPage' | snippet : [
    'element' => 'mSearch',
    'tpl' => 'mSearch.row',
    'limit' => 10
]}

{$_modx->getPlaceholder('page.nav')}
```

### Поиск товаров MiniShop3

```fenom
{'!pdoPage' | snippet : [
    'element' => 'msProducts',
    'parents' => 0,
    'resources' => '!mSearch' | snippet : ['return' => 'ids', 'limit' => 0] | default : '999999',
    'sortby' => 'ids'
]}

{$_modx->getPlaceholder('page.nav')}
```

## Поддержка

- GitHub Issues: [modx-pro/msearch](https://github.com/modx-pro/msearch/issues)
