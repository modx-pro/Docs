# Export

The "Export" tab exports products, categories, vendors or options to CSV, XLSX, JSON or XML. A product file can be edited in Excel and loaded back through [sync](sync).

The category page in the manager has an "Export" button. It opens the tab with that category already selected.

## What to export

| Type | What goes into the file |
|---|---|
| Products | Product and resource fields, options, TVs, translations. You choose the set of fields. |
| Categories | `id`, `parent`, `path`, `pagetitle`, `longtitle`, `alias`, `url`, `published`, `menuindex`, `context`. |
| Vendors | All columns of the vendor table and `products`: the number of products. |
| Options | `id`, `key`, `caption`, `type`, `categories`, `products`, `values`. |

## Categories

Check the categories you need products from. With nothing checked, the whole catalog is exported.

- **Include subcategories.** Products from nested categories also go into the file.
- **Include unpublished.** Without this checkbox only published products are exported.
- **Variants as separate rows.** Each msOptionsPrice2 or ms3Variants modification goes on its own row under the product.

## Product fields

Presets:

| Preset | Fields |
|---|---|
| Basic | `id`, `pagetitle`, `article`, `price`, `old_price`, `vendor`, `category_path`, `published` |
| Prices | `id`, `article`, `pagetitle`, `price`, `old_price` |
| SEO | `id`, `pagetitle`, `longtitle`, `description`, `alias`, `url` |
| All fields | Everything msCatalyst found on the catalog products |

You can add or remove fields by hand. Service fields: ID, category ID, product link, main image, all images as links.

## Format

- **CSV.** Delimiter: semicolon, comma or tab. Encoding: UTF-8 or Windows-1251. For Excel on Russian-locale Windows, choose semicolon and Windows-1251.
- **XLSX.** Opens in Excel and Google Sheets without encoding setup.
- **JSON** and **XML.** For exchange with other systems.

Column headers: field names ("Price") or field keys (`price`). Keys are more convenient if the file is loaded back later: sync matches the columns by itself.

## Loading back

1. Export products with the ID column.
2. Edit prices, stock or descriptions in Excel. Do not delete the ID column: it links rows to products.
3. Create a sync profile with a CSV or XLSX source and upload the file.
4. For the source key, pick the ID column. For the site field for the key, choose "Site ID". Check the change plan and start the write.

If the file has category paths from the catalog root, set the same root catalog in the profile. Otherwise sync creates the categories again inside a different category.

## How the export runs

A large catalog is exported in parts of 500 rows, and the page shows the progress. Each part is a separate request, so the export does not hit `max_execution_time`. The finished file is downloaded by a link. Temporary job files are deleted after a day.

::: tip Demo
The [public demo admin](https://chelnysite.ru/admin-demo) exports at most 200 rows, and the tab warns about it before and after the export. The purchased msCatalyst has no limits: the whole selected catalog goes into the file.
:::
