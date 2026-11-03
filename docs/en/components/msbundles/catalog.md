---
title: Каталог комплектов
description: Готовая страница со списком всех комплектов msBundles
---
<!-- TODO: translate from docs/components/msbundles/catalog.md -->

# Страница каталога комплектов

Готовый шаблон для вывода всех комплектов на отдельной странице.

## Создание ресурса

1. Создайте ресурс в MODX (например, `bundles` с `alias = bundles`).
2. В шаблоне разместите вызов сниппета.
3. Убедитесь, что `msBundles.initialize` подключён.

## Полный шаблон страницы

```fenom
{extends 'file:templates/base.tpl'}

{block 'content'}
  <h1>Наборы товаров</h1>
  
  {'!msBundles' | snippet : [
    'list' => 'all',
    'wrapperTpl' => 'tplMsBundlesList',
    'tpl' => 'tplMsBundlesItem',
    'limit' => 20,
    'pageLimit' => 5
  ]}
  
  {'!msBundles.initialize' | snippet}
{/block}
```

```modx
<h1>Наборы товаров</h1>

[[!msBundles?
  &list=`all`
  &wrapperTpl=`tplMsBundlesList`
  &tpl=`tplMsBundlesItem`
  &limit=`20`
  &pageLimit=`5`
]]

[[!msBundles.initialize]]
```

## Параметры сниппета

| Параметр | Значение | Описание |
| --- | --- | --- |
| `list` | `all` | Вывести все комплекты контекста |
| `wrapperTpl` | `tplMsBundlesList` | Обёртка списка (по умолчанию выводит `<div>` с классом `msbundles-list`) |
| `tpl` | `tplMsBundlesItem` | Шаблон карточки комплекта |
| `limit` | `20` | Количество на странице |
| `pageLimit` | `5` | Страниц для пагинации |

## Фильтрация по категориям

Если нужно вывести комплекты только из определённых категорий:

```fenom
{'!msBundles' | snippet : [
  'list' => 'all',
  'category' => '1,5,12'
]}
```

## Пагинация

Компонент использует стандартную пагинацию pdoTools. Для кастомизации:

```fenom
{'!msBundles' | snippet : [
  'list' => 'all',
  'pageTpl' => 'tpl.Page',
  'pageActiveTpl' => 'tpl.PageActive',
  'pagePrevTpl' => 'tpl.PagePrev',
  'pageNextTpl' => 'tpl.PageNext'
]}
```

## Пример лендинга

Для промо-страницы с фиксированными комплектами:

```fenom
{extends 'file:templates/base.tpl'}

{block 'content'}
  <section class="hero">
    <h1>Готовые наборы</h1>
    <p>Сэкономьте до 30% при покупке комплектом</p>
  </section>
  
  <section class="bundles-grid">
    {'!msBundles' | snippet : [
      'bundles' => '5,8,12,15',
      'tpl' => 'tplMsBundlesPromo'
    ]}
  </section>
  
  {'!msBundles.initialize' | snippet}
{/block}
```

## Стили

Базовые стили применяются автоматически через `msbundles.css`. Для кастомизации сетки:

```css
.msbundles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--msbundles-space-6);
}

@media (max-width: 768px) {
  .msbundles-list {
    grid-template-columns: 1fr;
  }
}
```

## См. также

- [Сниппет msBundles](snippets/msBundles)
- [Вывод на сайте](frontend)
- [REST API](api)
