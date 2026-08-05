Начиная с версии 1.3.0 поддерживается настройка SEO-страниц с ЧПУ.
После установки в меню появится приложение **sfSeoPages**.

![](https://file.modx.pro/files/a/6/3/a63b82bd3e4f6f69f7ae22e9180c79cf.png)  

Для корректной работы требуются следующие системные настройки:

- **sf_seopages_aliases** - Алиасы фильтров для формирования SEO-страниц.
- **sf_seopages_ids** - ID страниц для SEO-ссылок (отдельные страницы).
- **sf_seopages_tpls** - ID шаблонов страниц для SEO-ссылок (например, категория товаров).

Для вывода значений в шаблоне должны присутствовать следующие плейсхолдеры:

```
[[!+sf_seo_title]]
[[!+sf_seo_description]]
[[!+sf_seo_h1]]
[[!+sf_seo_breadcrumb]]
```

Для динамического изменения значений без перезагрузки страницы для H1 и хлебных крошек укажите следующие классы:  
**sf_seo_h1** - для заголовка H1  
**sf_seo_breadcrumb** - для текущего пункта меню


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

Добавляем в HEAD плейсхолдеры `[[!+sf_seo_title]]` и `[[!+sf_seo_description]]` с указанием значений по умолчанию:

```
<title>[[!+sf_seo_title:default=`[[*pagetitle]]`]]</title>
<meta name="description" content="[[!+sf_seo_description:default=`[[*description]]`]]">
```

Добавляем в шаблон плейсхолдер и класс на тег H1:

```
<h1 class="sf_seo_h1">[[!+sf_seo_h1:default=`[[*pagetitle]]`]]</h1>
```

В pdoCrumbs в **&tplCurrent** указываем чанк **sf_breadcrumb_current_tpl** (идет в комплекте)...

```
[[pdoCrumbs?
	&tplCurrent=`sf_breadcrumb_current_tpl`
	...
]]
```

...или в своем чанке ставим соответствующий прлейсхолдер и класс:

```
<li class="active sf_seo_breadcrumb">
    [[!+sf_seo_breadcrumb:default=`[[+menutitle]]`]]
</li>
```

Далее в приложении **sfSeoPages** для цвета "красный" добавляем запись вида:

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
При сохранениии ресурса с шаблоном, ID которого указан в системной настройке **sf_index_templates**, система проверяет его значения для параметров, указанных в настройке **sf_seopages_aliases** и если присутствует новое, автоматически создаёт для него SEO-страницу, заполняя обязательные поля **Фильтр**, **Значение** и **URI**.  
Механизм работает только с индексной таблицей, поэтому записи для товаров там должны присутствовать.

Для пакетного создания SEO-страниц на основе уже существующих ресурсов можно использовать консольный скрипт:

```php
<?php
$sf = $modx->getService('Simplefilters');
$sf->updateSeoPages();
```
