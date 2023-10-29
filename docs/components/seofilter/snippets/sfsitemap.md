# sfSitemap

Сниппет создан на основе класса меню, поэтому поддерживает почти все те параметры, что и [sfMenu][0], за исключением вложенности и группировки. Для карты сайта настоятельно рекомендуется использовать подсчёты из базы и режим fast.

Также здесь взято многое из [pdoSitemap][1] и использовать их можно совместно, чтобы выводить всю карту на одной странице. Здесь напишу основные параметры и два примера, в остальном разобраться не сложно.

## Различающиеся параметры от sfMenu

| Название             | По умолчанию                                    | Описание                                                                                        |
| -------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **&sitemapSchema**   | `<http://www.sitemaps.org/schemas/sitemap/0.9>` | Схема карты сайта.                                                                              |
| **&sortby**          | `link`                                          | Сортировка. По умолчанию по названию ссылки                                                     |
| **&sortdir**         | `ASC`                                           | Порядок сортировки. По возрастанию                                                              |
| **&outputSeparator** | `\n`                                            | Разделитель ссылок.                                                                             |
| **&forceXML**        | `1`                                             | Принудительно выводить страницу как XML. При совместном использовании с pdoSitemap - отключите. |

### Шаблоны

**&tpl** - стандартный чанк ссылки

```xml
@INLINE <url>\n\t
<loc>[[+url]]</loc>\n\t
<lastmod>[[+date]]</lastmod>\n\t
<changefreq>[[+update]]</changefreq>\n\t
<priority>[[+priority]]</priority>\n
</url>
```

**&tplWrapper** - чанк обёртка всей карты

```xml
@INLINE <?xml version=\"1.0\" encoding=\"[[++modx_charset]]\"?>\n<urlset xmlns=\"[[+schema]]\">\n[[+output]]\n</urlset>
```

### Параметр changefreq

Данные аналогично сниппету pdoSitemap. Но за отправную дату берётся дата изменения ссылки, либо её создания, если не было изменений. Дата изменения меняется, когда по ссылке изменяется количество результатов.

## Примеры использования

1. Совместно использование pdoSitemap и sfSitemap.
    Вызов pdoSitemap:

    ```modx
    [[!pdoSitemap?
      &tplWrapper=`sitemap.wrapper`
    ]]
    ```

    Чанк sitemap.wrapper:

    ```fenom
    <?xml version="1.0" encoding="{'modx_charset' | option}"?>
    <urlset xmlns="{$schema}">
    {$output}
    {$_modx->runSnippet('sfSitemap', ['tplWrapper'=>'@INLINE {$output}', 'fast'=>1, 'mincount'=>1, 'forceXML'=>0])}
    </urlset>
    ```

2. Отдельная карта сайта для SEO страниц:

    ```modx
    [[!sfSitemap?
      &fast=`1` // можно использовать countChildren, но это будет медленнее
      &mincount=`1`
    ]]
    ```

[0]: /components/seofilter/snippets/sfmenu
[1]: /components/pdotools/snippets/pdositemap
