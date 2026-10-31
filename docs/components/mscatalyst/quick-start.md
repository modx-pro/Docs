# Быстрый старт

## Фильтр в каталоге

В шаблоне раздела каталога (ресурс msCategory) замените вызов `msProducts` на код ниже. На MODX 3 с MiniShop3 вызов такой же.

```modx
[[!msCatalyst?
  &facets=`vendor, parent, option:color, ms:price|range`
]]
```

::: warning Вызов без кэша
Восклицательный знак обязателен. Сниппет отвечает на AJAX-запросы с той же страницы и читает фильтры из адреса. Кэшированный вызов показал бы всем посетителям одну и ту же выборку.
:::

Стили и скрипт подключаются сами. Для этого на странице нужны `</head>` и `</body>`.

Пример со всеми типами фасетов:

```modx
[[!msCatalyst?
  &parents=`5`
  &facets=`vendor|sort=count, parent|label=menutitle, tv:color|lex=color_, option:size|first=5, ms:price|range|step=100, ms:weight|range|title=Вес (кг), ms:made_in|title=Страна`
  &sorts=`menuindex, pagetitle, ms:price:asc, ms:price:desc, publishedon:desc`
  &limits=`12, 24, 48`
  &searchFields=`pagetitle^3, ms:article^5, introtext, content, option:brand`
]]
```

Все параметры и синтаксис фасетов описаны на странице сниппета [msCatalyst](snippets/mscatalyst).

## Поиск в шапке

```modx
[[!msCatalystSearch?
  &parents=`5`
  &searchPage=`5`
]]
```

Подробнее: [msCatalystSearch](snippets/mscatalystsearch).

## SEO-заголовки

```modx
<title>[[!+mscatalyst.title]]</title>
<meta name="description" content="[[!+mscatalyst.description]]">
<h1 data-msc-h1>[[!+mscatalyst.h1]]</h1>
```

Шаблоны заголовков и правила индексации описаны в разделе [SEO](seo).

## Загрузка каталога

Откройте «Пакеты → msCatalyst», вкладку «Синхронизация», и создайте профиль: файл CSV или XLSX, API, Google Таблица или 1С. Мастер проведёт через анализ источника, сопоставление полей и пробный прогон. Подробнее: [Синхронизация](interface/sync).
