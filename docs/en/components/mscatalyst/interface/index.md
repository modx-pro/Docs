# Manager page

"Extras → msCatalyst" opens the component management page. It requires the `settings` permission, as system settings do. The page is built without ExtJS and works the same on MODX 2.8 and MODX 3.

You can try it without installing in the [public demo admin](https://chelnysite.ru/admin-demo).

## Search test

Pick a catalog and type a query the way a customer would. The page shows the found products in suggestion order, their scores and the reason for each match: exact word form, synonym, typo or part number without spaces. You can see how search parsed every word: stem, transliteration, synonyms. If nothing is found, you can add a synonym right there.

## Synonyms

A "Word in the query → Also search for" table. A rule works one way: `найк → nike` finds Nike for the query `найк` (Nike spelled in Cyrillic), but not the other way round. The "Test" button in a row runs a search for that word right away.

Synonyms are stored in the `mscatalyst_search_synonyms` system setting as JSON:

```json
{"шланг": "рукав,hose"}
```

## Settings

All [system settings](../settings) of the component, with hints and value checks. The "Environment" block shows which packages msCatalyst found on the site. Settings that need a missing package are hidden or disabled: for example, the `seofilter` option of the SEO mode is marked "package not installed". Clear the site cache after installing a package. Changing the index storage mode clears the index cache.

## Index

Where the index is stored, how much space it takes, when it was updated. The "Build catalog index" and "Clear index" buttons.

## Filter sets

Create and edit `mscatalyst_set_*` sets with JSON validation. Sets from `sets/*.json` files appear in the list. Saving a set with the same name overrides the file. How to call a set is described in [Filter sets](../snippets/mscatalyst#filter-sets).

## Sync

Exchange profiles and the setup wizard, see [Sync](sync).

## Export

Export of products, categories, vendors and options to a file, see [Export](export).

## Translations

Filter titles and values in other languages, see [Multilingual](../multilingual#filter-titles-and-values).
