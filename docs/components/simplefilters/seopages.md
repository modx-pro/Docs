Начиная с версии 1.3.0 поддерживается настройка SEO-страниц с ЧПУ.
После установки в меню появится приложение **sfSeoPages**.

Для работы функционала требуются заполнение следующих системных настроек:

- **sf_seopages_aliases** - Алиасы фильтров для формирования SEO-страниц.
- **sf_seopages_ids** - ID страниц для SEO-ссылок (отдельные страницы).
- **sf_seopages_tpls** - ID шаблонов страниц для SEO-ссылок (например, категория товаров).

Общий вид приложения:

![](https://file.modx.pro/files/5/5/f/55fb4f97f1cb073bd6a79bc1278d7aa2.png)  

## Пример
На сайте есть каталог продукции, все категории которого имеют шаблон "Категория" с ID=4.
В вызове **simpleFilters** указана фильтрация по цвету (**ms_color**), производителю (**ms_vendor_id**) и алиасы:

```
&filters=`ms_color,ms_vendor_id`
&aliases=`ms_color==color,ms_vendor_id==brand`
```

### Задача
Создать страницы для фильтрации по этим параметрам, чтобы адрес имел вид:

- Для цвета: `https://site.ru/bicycles/color/выбранный_цвет`
- Для производителя: `https://site.ru/bicycles/brand/выбранный_производитель`

### Решение
В системных настройках указываем:

- **sf_seopages_aliases** : `{"ms_color":"color","ms_vendor_id":"brand"}`
- **sf_seopages_tpls**: `4`

В приложении **sfSeoPages** добавляем запись вида:

![](https://file.modx.pro/files/2/c/5/2c5cbbf7fa48fc70a641ea45ea29ecba.png)

В SEO-параметрах допускаются все плейсхолдеры ресурса-категории (pagetitle, longtitle, description и т. д.).<br>
Склонения значений указывайте через разделитель ||. Их можно выводить в том числе и просто на странице через плейсхолдеры вида<br>
`[[+sf_seo_w1]]` `[[+sf_seo_w2]]` ...  `[[+sf_seo_w6]]` - они выведут, соответственно, `красный` `красного` и `о красном` в том порядке, в котором прописаны.

Теперь при заходе на страницу `https://site.ru/bicycles/color/red` будут выведены соответствующие позиции, а H1 TITLE, DESCRIPTION и хлебные крошки примут соответствующий вид:

![](https://file.modx.pro/files/6/f/6/6f6988fa42eefe947c11bcabdae65e47.png)

## Добавление в sitemap.xml
Для добавления SEO-страниц в sitemap.xml используйте сниппет **simpleFiltersSiteMap**.<br>
Пример использования с [pdoSitemap](https://docs.modx.pro/components/pdotools/snippets/pdositemap):

```
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
