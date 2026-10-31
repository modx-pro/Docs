# SEO

## Мета-теги и индексация

- На страницах с выбранными фильтрами или поиском сниппет добавляет `<meta name="robots" content="noindex, follow">`. Страницы пагинации без фильтров остаются в индексе. Отключается параметром `` &noindexFiltered=`0` ``.
- AJAX-ответы отдаются с заголовком `X-Robots-Tag: noindex, nofollow`.
- Ссылки пагинации и крестики у выбранных фильтров настоящие, с `href`. Поисковый робот может пройти по ним без JavaScript.
- Для `<title>`, H1, description и `<link rel="canonical">` используйте плейсхолдеры `mscatalyst.title`, `mscatalyst.h1`, `mscatalyst.description` и `mscatalyst.canonical`, см. [Плейсхолдеры страницы](frontend#pleysholdery-stranicy).

## Шаблоны title, H1 и description

Шаблоны задаются в системных настройках и срабатывают, когда выбран хотя бы один фильтр:

| Настройка | По умолчанию |
|---|---|
| `mscatalyst_seo_title_filtered` | `{{pagetitle}} — {{filters}}` |
| `mscatalyst_seo_h1_filtered` | `{{pagetitle}}: {{filters}}` |
| `mscatalyst_seo_description` | `{{pagetitle}}. {{filters}}. Найдено: {{total}}` |

Подстановки: `{{pagetitle}}`, `{{filters}}` (выбранные значения и поисковый запрос), `{{total}}`, `{{page}}`.

## Режимы

Режим задаётся параметром `&seo` или настройкой `mscatalyst_seo_mode`, если параметр не указан.

| Режим | Что делает |
|---|---|
| `off` | ЧПУ фильтров нет, адрес с GET-параметрами. |
| `native` | Свои ЧПУ-адреса фильтров. Адреса разбирает плагин на `OnPageNotFound`. |
| `seofilter` | Мост к SeoFilter на MODX 2. |
| `both` | SeoFilter и свои адреса вместе. |

## Свои ЧПУ-адреса

С `&seo=`native`` каждый выбранный фильтр становится сегментом адреса:

```
/catalog/vendor-nike/color-krasnyy-or-siniy/price-1000-2000/
```

Сегмент начинается с ключа фасета. Значения берутся из подписей и переводятся в латиницу, несколько значений соединяются через `-or-`. У диапазона после ключа идут границы «от» и «до».

Карту посадочных страниц отдаёт сниппет [msCatalystSitemap](snippets/service#mscatalystsitemap):

```modx
[[!msCatalystSitemap? &parents=`5` &facets=`vendor, option:color`]]
```

Мост к SeoFilter написан для MODX 2. На MODX 3 используйте `native`.

## SeoFilter (MODX 2)

Задайте `|alias=` как в mFilter2 и `&seo=`seofilter`` или `both`. В AJAX-ответе есть блок `seo`: title, h1, description, canonical, aliases. Событие `mscatalyst:seo` на `document` нужно для моста с SeoFilter или своей подмены мета-тегов:

```js
document.addEventListener('mscatalyst:seo', function (e) {
    console.log(e.detail.seo.title, e.detail.seo.canonical);
});
```

Плейсхолдеры для шаблона выставляет сниппет [msCatalystSeoFilter](snippets/service#mscatalystseofilter).
