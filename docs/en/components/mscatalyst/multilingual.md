# Multilingual

msCatalyst works with Babel, Localizator on MODX 2 and localizator3 on MODX 3. Example: the English version of the demo catalog on Localizator, [`chelnysite.ru/en/`](https://chelnysite.ru/en/).

## Request language

The snippet picks the language in this order:

1. the `&lang` property, if set;
2. the Localizator language for the current URL;
3. the context `cultureKey`. Babel keeps each language in its own context, so Babel needs no setup.

The language is part of the index cache key and is passed to AJAX requests. The Russian and English versions of the catalog do not mix.

## Babel

Put the snippet call into the template of each language context, with `&parents` of that context's catalog. Product, category and TV titles come from the resources of that context.

Sync updates linked translations. For each context from `babel.contextKeys`, field matching offers "Title (Babel en)", "Summary (Babel en)" and other text fields. A `title_en` column is matched to the title in the `en` context automatically. Sync writes to the resource that Babel linked to the product. Babel creates new translations. Sync skips products without a link.

If the site has both Localizator and Babel, columns like `title_en` go to Localizator, and columns marked Babel go to Babel.

## Localizator

msCatalyst reads translations from the Localizator tables: `pagetitle`, `longtitle`, `menutitle`, `introtext`, `description`, `content`, category titles in the "Category" filter and TV values with localization turned on. Search runs on the translated fields. Product cards are rendered through the `Localizator` snippet if it is installed, so `msProducts` in the cards also gets translated fields.

Products without an active translation into the current language are hidden. To show them with their original fields, set `` &langStrict=`0` ``.

On MODX 3, Localizator ships as a separate package, `localizator3`, with its own tables. msCatalyst finds it automatically. MiniShop3 option captions translated in localizator3 become filter titles in that language. localizator3 ties option value translations to records that MiniShop3 does not have, so translate values on the "Translations" tab.

### Syncing and exporting translations

Field matching gets a "Translations" group: "Title (en)", "Content (en)" and localized TVs for each language. Columns like `name_en`, `en_title` or "Title (EN)" are matched to the translation, not to the main field. If a product has no translation yet, sync creates it. Rolling back a run restores the previous translations.

Export writes translations to the same columns, so you can hand the file to a translator and load it back.

## Filter titles and values

The ru and en lexicons ship with the package. Everything else is translated on the "Translations" tab of the component page:

1. pick a language;
2. type the translation into the row with the filter title or value (color, country, vendor, TV or option value);
3. click "Save".

An empty field means "show the original". The "Download CSV" and "Load CSV" buttons are for translating in Excel or by a translator: the file has the columns `key` and `translation`, with `;` as the delimiter.

The tab writes ordinary lexicon entries to the `mscatalyst` namespace, so you can also edit them in "Lexicon Management":

| Entry | Topic | What it translates |
|---|---|---|
| `mscatalyst_facet_<key>` | `default` | Group title, for example `mscatalyst_facet_color`. |
| `mscatalyst_value_<value>` | `values` | A value in all filters, for example `mscatalyst_value_красный` ("красный" is "red"). |
| `mscatalyst_value_<key>_<value>` | `values` | A value in one group, for example `mscatalyst_value_color_красный`. This entry wins over the general one. |
| `mscatalyst_sort_<value>` | `default` | Sort label. Hyphens are replaced with `_`, for example `mscatalyst_sort_ms_price_desc`. |

Entries for the `|lex=` modifier, for example `color_red`, are translated here too.

Values are compared case-insensitively. Both the value stored in the database and the one the customer sees match: a vendor name or a TV option label.

### Group title lookup order

1. a translation from the "Translations" tab or from "Lexicon Management" for the current language;
2. `|title=` in `&facets`;
3. the `mscatalyst_facet_<key>` entry from the package lexicon;
4. the mFilter2 key of the same filter, for example `mse2_filter_msoption_color` or `mse2_filter_tv_color`. Translations made for mFilter2 are picked up automatically;
5. the TV caption, the option caption or the shop lexicon for `ms:` fields (`ms2_product_price` or `ms3_product_price`).

Entries of one language do not leak into another. MODX falls back to English entries when a translation is missing, but msCatalyst reads titles and values only for the request language.
