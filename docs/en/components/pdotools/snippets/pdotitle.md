# pdoTitle

Snippet outputs a formatted [title][0] tag: page name, parent names and other params.

Main use: visual distinction of documents with pagination.

[![](https://file.modx.pro/files/5/7/d/57d52e8252998a06aa312fb6809e8fe6s.jpg)](https://file.modx.pro/files/5/7/d/57d52e8252998a06aa312fb6809e8fe6.png)

## Parameters

Snippet **does not accept** general pdoTools params due to its role. It passes all params to nested [pdoCrumbs][2] call.

| Parameter         | Default  | Description |
|-------------------|----------|-------------|
| **&id**           | `0`      | Resource ID. |
| **&limit**        | `3`      | Max parents to include. |
| **&titleField**   | `longtitle` | Resource field for page title. |
| **&cache**        |          | Cache parent selection. |
| **&cacheTime**    | `0`      | Cache TTL in seconds. |
| **&tplPages**     | `@INLINE ...` | Chunk for pagination in title. |
| **&pageVarKey**   | `page`   | URL param for page number. |
| **&tplSearch**    | `@INLINE ...` | Chunk for search query in title. |
| **&queryVarKey**  | `query`  | URL param for search query. |
| **&minQuery**     | `3`      | Min search query length to show. |
| **&outputSeparator** | `/`   | Separator between title parts. |
| **&registerJs**   | `1`      | Output JS vars for pdoPage **&ajaxMode**. |

## Pagination support

When **&pageVarKey** is in URL, pdoTitle adds pagination to `title`.

![](https://file.modx.pro/files/b/c/c/bcc933780544f16050d9fefd8bdd8c0a.png)

Works with pdoPage **&ajaxMode** — title updates without reload.

## Search support

When **&queryVarKey** is in URL, snippet inserts chunk **&tplSearch** for the search query.

![](https://file.modx.pro/files/3/6/4/3649234d5f4e88426cc5ed528e713405.png)

Default placeholder: `[[+mse2_query]]` from [mSearch2][1].

## Caching

Call pdoTitle **uncached** so it can react to URL params. You can cache the internal parent selection (via [pdoCrumbs][2]) for weak hosting.

## Javascript variables

With **&registerJs** enabled, snippet outputs vars in `pdoTitle` object: separator and pagination chunk.

## Examples

Default call:

```modx
<title>[[!pdoTitle]] / [[++site_name]]</title>
```

More parents and caching:

```modx
<title>[[!pdoTitle?limit=`5`&cache=`1`]] / [[++site_name]]</title>
```

[0]: http://htmlbook.ru/html/TITLE
[1]: /en/components/msearch2/snippets/msearch2
[2]: /en/components/pdotools/snippets/pdocrumbs
[3]: /en/components/pdotools/general-properties
