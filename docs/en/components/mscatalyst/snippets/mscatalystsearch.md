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
