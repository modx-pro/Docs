# msCatalystSearch

A search field for the site header: dropdown suggestions, a jump to the results page, or both. It uses the same index as the filter.

```modx
[[!msCatalystSearch?
  &searchMode=`live+page`
  &searchPage=`10`
  &parents=`5`
  &searchFields=`pagetitle^3, ms:article^5`
]]
```

## Modes

| Mode | What happens |
|---|---|
| `filter` | Typing narrows the catalog results. Default mode for the `msCatalyst` snippet. |
| `page` | Submitting the form leads to the `&searchPage` page. |
| `live` | Suggestions appear under the field without a page reload. |
| `live+page` | Suggestions, plus a jump to the results page on Enter. Default mode for `msCatalystSearch`. |

On the results page, call `msCatalyst` with the same `&parents`: it reads the query from the URL and shows the found products together with the filters.

## Properties

| Property | Default | Description |
|---|---|---|
| `parents` | | IDs of the catalog categories to search in. |
| `depth` | `10` | How deep to look for products inside the categories. |
| `searchMode` | `live+page` | Mode, see above. |
| `searchPage` | | ID or URL of the results page. |
| `searchFields` | `pagetitle^3, longtitle, ms:article^5, introtext, description, content` | Search fields with weights. |
| `searchParam` | `search` | URL parameter for the query. |
| `searchMin` | `2` | Minimum query length. |
| `suggestLimit` | `8` | Number of suggestions. |
| `tplSuggest` | `msCatalyst.suggest` | Chunk for one suggestion. |
| `toPlaceholder` | | Write the output to a placeholder. |

## How search works

- Word forms: "кроссовки" (sneakers) finds "кроссовок" and "кроссовками" (other grammatical forms of the same word). phpMorphy is used if it is installed on the server. Without it, the built-in stemmer works.
- Transliteration: `krossovki` finds кроссовки (sneakers). For brands that Russian speakers spell by ear, add a synonym, for example `найк → nike` (`найк` is Nike spelled in Cyrillic).
- Typos: `кросовки адидас` (a misspelled "sneakers adidas") finds Adidas sneakers. Words with digits (part numbers, sizes) are compared exactly or without spaces.
- Field weights: a match in the part number or title ranks a product above a match in the description.

## Synonyms

Synonyms are managed on the "Extras → msCatalyst" page, "Synonyms" tab. A rule works one way: `найк → nike` finds Nike for the query `найк`, but not the other way round. Synonyms are stored in the `mscatalyst_search_synonyms` system setting as JSON:

```json
{"шланг": "рукав, hose"}
```

Here "шланг" (hose) also finds products with "рукав" (another Russian word for hose) or "hose".

## Search query log

Every catalog search goes to the `mscatalyst_search_log` table: the query, the catalog page, the language, the number of searches, how many products the last search found and how many searches found nothing. Queries are lowercased with single spaces, so "Sneakers  Nike" and "sneakers nike" are one query. The log is easiest to read on the [Queries](../interface/#queries) tab.

Not logged:

- Live search suggestions while the shopper types a word. Otherwise the log fills with word fragments.
- The second and later result pages and the "Show more" button.
- The same query from the same visitor within 30 minutes, for example while they narrow the results with filters.
- Search engine bots and requests without a User-Agent header.

A header search with `&searchPage` is logged on the results page that runs `msCatalyst`. The `mscatalyst_search_log` setting turns the log off. The table is created on install, and on a site updated by copying files, on the first search.

msCatalyst deletes queries nobody repeated for 365 days. The `mscatalyst_search_log_days` setting sets the period, `0` keeps everything.
