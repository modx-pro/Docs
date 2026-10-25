После установки в меню появится приложение **simpleFilters**.

![](https://file.modx.pro/files/4/a/1/4a11e7cb12ae5b6a7cf228ff9e5b13d1.png)  

Механизм SEO-страниц работает только с индексной таблицей, поэтому должны быть запполнены следующие системные настройки:

- **sf_index_templates** - Шаблоны индексируемых ресурсов.
- **sf_index_fields** - Поля ресурсов для индексации.
- **sf_seopages_ids** - ID страниц для SEO-ссылок (отдельные страницы).
- **sf_seopages_tpls** - ID шаблонов страниц для SEO-ссылок (например, категория товаров).
- **sf_seopages_aliases** - Алиасы фильтров для формирования SEO-страниц.

Для вывода значений в шаблоне должны присутствовать следующие плейсхолдеры:

```modx
[[!+sf_seo_title]]
[[!+sf_seo_description]]
[[!+sf_seo_canonical]]
[[!+sf_seo_h1]]
[[!+sf_seo_breadcrumb]]
[[!+sf_seo_content]]
```

Для динамического изменения значений без перезагрузки страницы для H1 и хлебных крошек укажите следующие классы:  
**sf_seo_h1** - для заголовка H1  
**sf_seo_breadcrumb** - для текущего пункта меню
**sf_seo_content** - для индивидуального контента страницы

## Пример
На сайте есть каталог продукции, все категории которого имеют шаблон "Категория" с ID=4.  
В вызове **simpleFilters** указана фильтрация по цвету (**ms_color**), производителю (**ms_vendor_id**) и алиасы:

```modx
[[!simpleFilters?
  &filters=`ms_color,ms_vendor_id`
  &aliases=`ms_color==color,ms_vendor_id==brand`
  ...
]]
```

### Задача
Создать страницы для фильтрации по этим параметрам, чтобы адрес имел вид:

- Для цвета: `https://site.ru/bicycles/color/выбранный_цвет`
- Для производителя: `https://site.ru/bicycles/выбранный_производитель`

### Решение
В системных настройках указываем:

- **sf_seopages_aliases** : `{"ms_color":"color","ms_vendor_id":"brand"}`
- **sf_seopages_tpls**: `4`

Добавляем в HEAD плейсхолдеры `[[!+sf_seo_title]]`, `[[!+sf_seo_description]]` и `[[!+sf_seo_canonical]]` с указанием значений по умолчанию:

```
<title>[[!+sf_seo_title:default=`[[*pagetitle]]`]]</title>
<meta name="description" content="[[!+sf_seo_description:default=`[[*description]]`]]">
<link rel="canonical" href="[[!+sf_seo_canonical:default=`[[~[[*id]]? &scheme=`full`]]`]]">
```

Добавляем в шаблон плейсхолдеры и классы на H1 и содержимое:

```modx
<h1 class="sf_seo_h1">
    [[!+sf_seo_h1:default=`[[*pagetitle]]`]]
</h1>
<div class="sf_seo_content">
    [[!+sf_seo_content:default=`[[*content]]`]]
</div>
```

В pdoCrumbs в **&tplCurrent** указываем чанк **sf_breadcrumb_current_tpl** (идет в комплекте)...

```modx
[[pdoCrumbs?
	&tplCurrent=`sf_breadcrumb_current_tpl`
	...
]]
```

...или в своем чанке ставим соответствующий плейсхолдер и класс:

```modx
<li class="active sf_seo_breadcrumb">
    [[!+sf_seo_breadcrumb:default=`[[+menutitle]]`]]
</li>
```

Далее в приложении **simpleFilters** для цвета "красный" добавляем правило вида:

![](https://file.modx.pro/files/2/c/5/2c5cbbf7fa48fc70a641ea45ea29ecba.png)

В SEO-параметрах допускаются все плейсхолдеры ресурса-категории (pagetitle, longtitle, description и т. д.).<br>

Склонения значений указывайте через разделитель `||`.<br>
Их можно выводить в том числе и просто на странице через плейсхолдеры вида:<br>
`[[+sf_seo_w1]]` `[[+sf_seo_w2]]` ...  `[[+sf_seo_w6]]` - они выведут, соответственно, `красный` `красного` и `о красном` в том порядке, в котором прописаны.

Для производителя **Trek** так:

![](https://file.modx.pro/files/1/a/e/1aecba5f4cd617ec9e1509e43f57571a.png)

Аналогично добавляются записи **для всех значений** цветов и производителей.

Теперь при заходе на страницу `https://site.ru/bicycles/color/red` или выборе фильтра будут выведены соответствующие позиции, а H1 TITLE, DESCRIPTION и хлебные крошки примут соответствующий вид:

![](https://file.modx.pro/files/6/f/6/6f6988fa42eefe947c11bcabdae65e47.png)

Производитель по адресу `https://site.ru/bicycles/trek`

![](https://file.modx.pro/files/8/b/b/8bbd0c9d93ed6da327005b60cc9b1deb.png)

![](https://file.modx.pro/files/6/d/7/6d7505740c129058c1c90992e966379b.png)

## SEO-страницы
На данной  вкладке выводится список сгенерированных URL по созданным правилам.

![](https://file.modx.pro/files/9/1/1/911cdb13a0d33ad1b9caa241141f51f8.png)

Для каждой страницы можно настроить индивидуальные параметры:

![](https://file.modx.pro/files/5/7/f/57f25770e810c04d9d0f28e68d7a8467.png)

## Обслуживание
На вкладе доступны три операции:

![](https://file.modx.pro/files/8/0/0/800314a1262fd471e0c58608fad930f8.png)

При обновлении страниц можно выбрать полную очистку таблицы перед пересозданием страниц:

![](https://file.modx.pro/files/9/0/a/90a41c17fc057e95887ec40f2d4478a5.png)

## Добавление в sitemap.xml
Для добавления SEO-страниц в sitemap.xml используйте сниппет **simpleFiltersSiteMap**.<br>
Пример использования с [pdoSitemap](https://docs.modx.pro/components/pdotools/snippets/pdositemap):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {'pdoSitemap' | snippet : [
    'forceXML' => 0
  ]}
  {'simpleFiltersSiteMap' | snippet : [
    'tpl' => 'sf_sitemap_tpl'
  ]}
</urlset>
```

## Автоматизация
При сохранении ресурса с шаблоном, ID которого указан в системной настройке **sf_index_templates**, система проверяет его значения для параметров, указанных в настройке **sf_seopages_aliases** и если присутствует новое, автоматически создаёт для него SEO-правило, заполняя обязательные поля **Фильтр**, **Значение** и **URI**.  
Механизм работает только с индексной таблицей, поэтому записи для товаров там должны присутствовать.

Для пакетного создания индексов, правил и страниц можно вызывать различные методы в консоли:

```php
<?php
$sf = $modx->getService('Simplefilters');
$sf->updateIndexAll(); // Обновление индекса
$sf->updateSeoRules(); // Обновление SEO-правил
$sf->updateSeoPages($mode); // Обновление SEO-страниц. $mode = 'refresh' для предварительной очистки таблицы перед обновлением
```

::: tip
Для удобства скрипты представлены в виде отдельных сниппетов **sfUpdateIndex**, **sfUpdateSeoRules** и **sfUpdateSeoPages** которые можно запускать по расписанию с помощью [CronManager](https://docs.modx.com/current/en/extras/cronmanager/index) или [Scheduler](http://ttps//docs.modx.pro/components/scheduler/).
:::
