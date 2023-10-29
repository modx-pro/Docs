# Ресурсы (modResource)

## Стандартные поля ресурса

| Поле            | Название                                  |
| --------------- | ----------------------------------------- |
| id              | Id ресурса                                |
| pagetitle       | Заголовок                                 |
| longtitle       | Расширенный заголовок                     |
| description     | Описание                                  |
| introtext       | Аннотация                                 |
| template        | Шаблон (id)                               |
| alias           | Псевдоним                                 |
| menutitle       | Пункт меню                                |
| link_attributes | Атрибуты ссылки                           |
| hidemenu        | Скрыть из меню                            |
| published       | Опубликован                               |
| parent          | Родительский ресурс (id)                   |
| class_key       | Тип ресурса                               |
| content_type    | Тип содержимого                           |
| content_dispo   | Местонахождение содержимого               |
| menuindex       | Позиция в меню                            |
| publishedon     | Дата, когда ресурс был опубликован        |
| pub_date        | Дата публикации                           |
| unpub_date      | Дата отмены публикации                    |
| isfolder        | Контейнер                                 |
| searchable      | Доступен для поиска                       |
| alias_visible   | Использовать псевдоним в пути псевдонимов |
| richtext        | Использовать HTML-редактор                |
| uri_override    | Заморозить URI                            |
| uri             | URI                                       |
| cacheable       | Кэшируемый                                |
| deleted         | Удалён                                    |
| content         | Содержимое (контент)                      |
| context_key     | Контекст                                  |
| tv1             | TV c идентификатором 1                   |

### Модификации полей

| Поле          | Название                       |
| ------------- | ------------------------------ |
| template_name | Шаблон (название)              |
| parent_name   | Родительский ресурс (название) |

## ms2Gallery

| Поле   | Название        |
| ------ | --------------- |
| images | список картинок |

Все файлы картинок должны быть на сервере

## SEO Tab

| Поле           | Название                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| seo.index      | Индексируемость поисковиками                                             |
| seo.follow     | Следование по ссылкам                                                    |
| searchable     | Участие страницы во внутреннем поиске по сайту. Стандартное поле ресурса |
| seo.sitemap    | Включение страницы в Sitemap.xml                                         |
| seo.priority   | Приоритет                                                                |
| seo.changefreq | Частота обновления содержимого                                           |
| seo.redirect   | 301 редиректы                                                            |
| uri_override   | Заморозить URL псевдоним для этой страницы. Стандартное поле ресурса     |
| uri            | URL для заморозки. Стандартное поле ресурса                              |

## SEO Pro

| Поле                       | Название       |
| -------------------------- |--------------- |
| keywords \|\| seo.keywords | Ключевые слова |

## Пример

**Поля экспорта:** `id,pagetitle,description,tv1`

**Результат в таблице:**

![Результат в таблице](https://file.modx.pro/files/b/c/9/bc9a67ebe6f717d0b0a6b8f90032ca19.jpg)

## Системные события

Класс **gsResource** генерирует следующие события:

```php
<?php
switch ($modx->event->name) {
  // получение списка ресурсов
  case 'gsOnBeforeGetResource':
    // $query - запрос выборки
    // $range - название листа таблицы, куда будут экспортироваться данные
    break;
  case 'gsOnGetResource':
    // $resources - массив ресурсов со всеми полями
    // $range - название листа
    break;
}
```

### Примеры

1. Выбираем ресурсы с определенным шаблоном

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetResource') {
      $query->where(array('template' => 3)); // 3  - id шаблона
    }
    ```

2. Меняем значение поля publishedon (миллисекунды => дата)

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetResource') {
      $modx->event->params['resources'] = array_map(function ($resource) {
        if (!empty($resource['publishedon'])) {
          $resource['publishedon'] = date("d-m-Y",$resource['publishedon']);
        }
        return $resource;
      }, $resources);
    }
    ```
