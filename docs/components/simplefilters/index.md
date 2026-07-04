---
title: simpleFilters
description: Простая фильтрация ресурсов для MODX3.
logo: https://modstore.pro/assets/extras/simplefilters/logo-md.png
author: Romanov Pavel
modstore: https://modstore.pro/packages/ecommerce/simplefilters
items: [
  { text: 'Сниппеты', link: 'snippets' },
  { text: 'SEO-страницы', link: 'seopages' },
  { text: 'События плагинов', link: 'plugins' }
]
---

# simpleFilters

Простая фильтрация ресурсов MODX3 и товаров MiniShop3.

## Основные свойства
- Поддержка полей ресурсов, TV и MIGX полей, а также полей и опций товаров MiniShop3.
- Работает как со стандартными таблицами MODX, так и с собственной индексной таблицей.
- Поддерживает логику AND и OR.
- Типы фильтров: чекбокс, радиокнопка, выпадающий список, слайдер для числовых значений (на основе [noUiSlider](https://refreshless.com/nouislider/)).
- Настройка псевдонимов фильтров в URL.
- Пагинация (постраничная и кнопкой «Загрузить ещё»).
- Настраиваемая сортировка и выбор количества на страницу.
- Системные события для тонкой настройки (тексты фильтров, значения, сортировка полей и т. д.).

## Системные настройки

| Параметр | Описание | Значение по умолчанию |
|:----------|:----------|:-----------------------|
| **sf_index_templates** | Шаблоны ресурсов, поля которых нужно индексировать |  |
| **sf_index_fields** | Поля ресурсов, которые нужно индексировать |  |
| **sf_index_fields** | Путь к JS-файлу относительно корня сайта | `{assets_url}components/simplefilters/js/web/default.min.js` |
| **sf_css_path** | Путь к CSS-файлу относительно корня сайта | `{assets_url}components/simplefilters/css/web/default.min.css` |
| **sf_seopages_aliases** | Алиасы фильтров для формирования SEO-страниц (должны соответствовать псевдонимам в параметре **aliases** сниппета **simpleFilters**) в JSON:<br><pre>{"ms_vendor_id":"brand", "ms_color":"color"}</pre> |  |
| **sf_seopages_ids** | ID страниц для SEO-ссылок (отдельные страницы).<br>Укажите через запятую ID страниц с вызовом сниппета **simpleFilters**, на которых используются SEO-ссылки |  |
| **sf_seopages_tpls** | ID шаблонов страниц для SEO-ссылок (например, категории).<br>Укажите через запятую ID шаблонов, где вызывается сниппет **simpleFilters** и на которых используются SEO-ссылки |  |

## Начало работы

### Индексирование полей и значений
По умолчанию компонент работает с таблицей `modx_sf_index`, в которой должны содержаться значения полей для ресурсов, что ускоряет выборку.

Для добавления данных нужно заполнить системные настройки `sf_index_templates` и `sf_index_fields`, где указать шаблоны ресурсов, участвующих в фильтрации и поля которые нужно индексировать, соответственно.

Используются следующие префиксы:
- Поле ресурса — **без префикса**
- TV-параметр — **tv_**
- MIGX-поле — **migx_**
- Поле товара MiniShop3 — **ms_**
- Опция товара MiniShop3 — **mso_**

Например, у нас установлен MiniShop, шаблоны товаров 4 и 5 и нам нужно фильтровать по:
- цене (поле товара **price**)
- производителю (поле товара **vendor_id**)
- новинке (поле товара **new**)
- цвету (поле товара **color**)
- материалу (опция товара **material**)
- остатку (tv-параметр **inctock**)
- полю «Высота» из MIGX-TV **chars*, у которого названия параметров указаны в поле `title`, а значения в `value`

В `sf_index_templates` указываем `4,5`, а в `sf_index_fields` так:  
```
ms_price,ms_vendor_id,ms_new,ms_color,mso_material,tv_instock,migx_chars_Высота:title|value
```

Далее два варианта:   
**1.** Запустить через консоль следующий скрипт:
```php
<?php
$sf = $modx->getService('Simplefilters');
$sf->updateIndexAll();
```

**2.** Вызвать один раз на любой странице сайта сниппет `simpleFiltersUpdate`, который идет в комплекте.

#### Индексация при сохранении ресурса
Происходит автоматически посредством плагина `simpleFilters` (висит на событии `onDocFormSave`).

#### Индексация по расписанию
Можно использовать [CronManager](https://docs.modx.com/current/en/extras/cronmanager/index) или [Scheduler](http://ttps//docs.modx.pro/components/scheduler/).  
Просто добавьте сниппет `simpleFiltersUpdate` в задание и настройте периодичность запуска.

#### Индексация после импорта
Если используете [Impex3](https://modstore.pro/packages/import-and-export/impex3), создайте плагин на событие `OnImpexAterAllImport` с вышеуказанным скриптом:

```php
switch ($modx->event->name){
    case 'OnImpexAterAllImport':
        $sf = $modx->getService('Simplefilters');
        $sf->updateIndexAll();
    break;
}
```

Если используете штатный импорт MiniShop3 из CSV, сделайте то же самое на `msOnAfterImport`:
```php
switch ($modx->event->name){
    case 'msOnAfterImport':
        $sf = $modx->getService('Simplefilters');
        $sf->updateIndexAll();
    break;
}
```

### Работа без индекса
Если ресурсов или полей немного или нет возможности обновлять индекс (по расписанию, после импорта и т. д), режим работы можно переключить на стандартные запросы к таблицам ресурсов, TV-парметров и т. д.  
Для этого в вызове сниппета нужно указать ```&fromIndex=`0` ```
