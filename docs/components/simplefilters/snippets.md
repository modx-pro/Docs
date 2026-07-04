# simpleFilters

Выводит список ресурсов, фильтры, подключает все необходимые скрипты и стили.

## Параметры

| Параметр | Описание | Значение по умолчанию |
|:----------|:----------|-----------------------|
| **&parents** | Родители для выборки. ID через запятую. | Текущий ресурс |
| **&resources** | Ресурсы для выборки. ID через запятую. | |
| **&showUnpublished**| Вывод неопубликованных ресурсов | 0 |
| **&templates** | Шаблоны ресурсов через запятую | |
| **&fromIndex** | Выборка из индекса | 1 |
| **&where** | Первоначальная выборка в JSON-формате | |
| **&sortby** | Поле для сортировки | menuindex |
| **&sortdir** | Направление сортировки | ASC |
| **&limit** | Количество на страницу | 10 |
| **&includeTVs** | TV-поля через запятую для включения в вывод | |
| **&tvPrefix** | Префикс для TV-полей в чанке ресурса | tv_ |
| **&msPrefix** | Префикс для полей товара miniShop3 | ms_ |
| **&msoPrefix** | Префикс для опций товара miniShop3 | mso_ |
| **&hideOne** | Скрывать фильтры с одним значением | 1 |
| **&checkEmpty** | Просчитывать результат для каждого значения фильтра, чтобы отключать неактивные | 0 |
| **&filters** | Список фильтров в формате *поле1:тип_поля1,поле2:тип_поля2,поле3:тип_поля3* | |
| **&aliases** | Псевдонимы фильтров для URL в формате *поле1==псевдоним1,поле2==псевдоним2,поле3==псевдоним3* | |
| **&fseparator** | Разделитель значений фильтра в адресной строке | _ |
| **&mode** | Режим работы: **and** — совпадение всех условий, **or** — совпадение хотя бы одного условия | or |
| **Шаблонизация** | | |
| **&tpl** | Чанк вывода ресурса | |
| **&tplWrapper** | Чанк-обёртка всего вывода | sf_wrapper |
| **&tplFilter** | Чанк блока фильтра типа чекбокс или радиокнопка | sf_filter |
| **&tplFilterRow** | Чанк строки фильтра типа чекбокс | sf_filter_row |
| **&tplFilterRadioRow** | Чанк строки фильтра типа радиокнопка | sf_filter_radio_row |
| **&tplFilterSelect** | Чанк блока фильтра типа селект | sf_filter_select |
| **&tplFilterSelectRow** | Чанк опции фильтра типа селект | sf_filter_option_row |
| **&tplFilterSlider** | Чанк блока фильтра типа слайдер | sf_filter_slider |
| **&tplSelected** | Чанк оформления блока выбранного фильтра | sf_selected_filter |
| **&tplSelectedRow** | Чанк оформления строки выбранного фильтра | sf_selected_row |
| **Пагинация** | | |
| **&tplPaginationWrapper** | Чанк-обёртка блока пагинации | sf_pagination |
| **&tplPagination** | Чанк вывода ссылки на страницу | sf_page |
| **&tplPaginationFirst** | Чанк вывода ссылки на первую страницу | sf_page_first |
| **&tplPaginationLast** | Чанк вывода ссылки на последнюю страницу | sf_page_last |
| **&tplMoreButton** | Чанк вывода кнопки «Загрузить ещё» | sf_morebutton |

### Настройка фильтров

В параметре **&filters** используйте следующие префиксы:

- Поле ресурса — **без префикса**
- TV-параметр — **tv_**
- MIGX-поле — **migx_**
- Поле товара MiniShop3 — **ms_**
- Опция товара MiniShop3 — **mso_**

Для типов:

- Чекбокс — **checkbox** или оставить пустым
- Выпадающий список — **select**
- Слайдер — **slider**
- Радиокнопка — **radio**

Пример указания списка фильтров и псевдонимов:

```
&filters=`
    parent:select,
    ms_vendor_id:select,
    ms_price:slider,
    tv_instock:slider,
    migx_chars_Высота:slider:title|value,
    ms_color,
    ms_tags:select
`
&aliases=`
    ms_vendor_id==brand,
    ms_price==price,
    tv_instock==instock,
    migx_chars_Высота==height,
    ms_color==color,
    ms_tags==tags
`
```

### MIGX-поля
Поля этого типа указываются в формате:

```
migx_[имя tv]_[название параметра]:[тип фильтра]:[поле названия]|[поле значения]
```

Допустим есть MIGX-TV **chars** с такой конфигурацией:

```json
[{"fields":
  [
    {"field":"title", "caption":"Параметр"},
    {"field":"value", "caption":"Значение"}
  ]
}]
```

А у товаров значения указываются следующим образом:

![MIGX значения](https://file.modx.pro/files/c/3/0/c304369a3e56435a47bf92102f858864.jpg)

Чтобы создать фильтр-слайдер для параметра «Высота» нужно прописать:

```
migx_chars_Высота:slider:title|value
```

Фильтр для параметра «Назначение» в виде чекбоксов так:

```
migx_chars_Назначение:title|value
```
В настройке индексации `sf_index_fields` всегда **без указания типа фильтра**:

```
migx_chars_Назначение:title|value,migx_chars_Высота:title|value
```

---

## Параметр &where

Поддерживает один параметр/значение. Работает только с таблицами ресурса и продукта MiniShop3 (поля указываются без префиксов, как в базе).

| Описание | Пример |
|----------|--------|
| Вывод новинок | `'where' => '{"new":"1"}'` |
| Вывод товаров с ценой больше 2000 | `'where' => '{"price:>":"2000"}'` |
| Вывод ресурсов со словом "скидка" в longtitle | `'where' => '{"longtitle:like":"скидка"}'` |

## Шаблонизация

В чанках по умолчанию используется Fenom (требуется наличие [pdoTools](https://modstore.pro/packages/utilities/pdotools)), но поддерживается и стандартный синтаксис.

Компонент поддерживает кастомные чанки для разных фильтров.

Для этого нужно указать параметры в виде **&tplFilter_параметр** и **&tplFilterRow_параметр**.

Например, если требуется для фильтра по тегам (**ms_tags**) какое-то своё оформление, создайте соответствующие чанки и укажите в вызове:

```
&tplFilter_ms_tags=`чанк_для_блока`
&tplFilterRow_ms_tags=`чанк_для_элемента`
```
Если для параметра указан псевдоним, то используется он:

```
$aliases=`ms_tags==tag`
&tplFilter_tag=`чанк_для_блока`
&tplFilterRow_tag=`чанк_для_элемента`
``` 

Названия блоков фильтров задаются через лексиконы в формате **sf_filter_фильтр** (также можно менять в плагине).

# simpleFiltersSiteMap

Сниппет добавляет ссылки на SEO-страницы в карту сайта.
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

# simpleFiltersUpdate

Выполняет обновление индекса. Для запуска по расписанию используйте [CronManager](https://docs.modx.com/current/en/extras/cronmanager/index) или [Scheduler](https://docs.modx.pro/components/scheduler/)

