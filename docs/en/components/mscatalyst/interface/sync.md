# Sync

A profile describes one source and a direction: into the site, out of the site, or both ways. You can have several profiles, for example a supplier price list over an API and stock levels from a Google Sheet.

## Sources

| Source | What you configure |
|---|---|
| CSV | File upload or a link. msCatalyst detects the delimiter and encoding (UTF-8, Windows-1251) by itself. |
| Excel (XLSX) | File upload or a link, a sheet by name or number. The file is read row by row, without third-party libraries. |
| API (JSON or XML) | URL, method, headers, request body, Bearer, Basic or key authentication. Path to the product list (`data.items`). Paging by page number, offset, cursor or next page link. |
| Google Sheets | Spreadsheet link or ID. An API key is enough to read a public spreadsheet. Writing needs a service account key (JSON) that you have shared the spreadsheet with. The key stays on the server and never appears in manager responses. |
| 1C (CommerceML 2) | 1C login and password, price type, order status mapping (`{"Отгружен": 3}`, where "Отгружен" is the 1C status "Shipped"). |

The 1C exchange URL:

```
https://site.ru/assets/components/mscatalyst/1c.php?profile=ID
```

A profile with export gets a feed URL:

```
https://site.ru/assets/components/mscatalyst/feed.php?profile=ID&token=...&format=csv
```

Feed formats: `csv`, `xlsx`, `json`, `xml`. The feed returns the products of the profile category. Modifications go as separate rows if you turn this on in the profile. The response is cached for the time set in the "Feed cache" profile field.

## Setup wizard

1. **Source.** Type, direction, access, schedule in minutes (0 means manual runs only) and email addresses for when a run stops.
2. **Fields.** msCatalyst reads a sample and shows every source field with its type, examples, share of empty values and number of unique values. It suggests a key field and detects modifications: a shared parent part number, attribute columns or nested offers. This step also sets the root catalog: msCatalyst creates new categories inside it. For each field it suggests a site field with a confidence percentage. If there is no match, you can create an option: when writing, msCatalyst links it to the product categories.
3. **Matching.** Categories, vendors, options and values from the source are shown next to the site ones: found, new, ambiguous. Similar values are paired automatically (`Чёрн.` and `Чёрный`, an abbreviation and the full word for "black"). You resolve ambiguous ones by hand.
4. **Approval.** Write rules: what to do with products that are gone from the source, safeguard thresholds, which structure changes to accept without stopping, how to find products on the site. The schema is saved as a version.
5. **Plan and run.** A dry run shows how many products msCatalyst will create, update and unpublish, and every field as "was → will be". Writing starts only after you confirm.

Scheduled runs use only the approved schema. If the source structure changes, the run stops and shows the difference.

### Transform rules

`trim`, `strip_tags`, `replace`, `split`, `join`, `first`, `number`, `bool`, `markup`, `multiply`, `round`, `default`, `template`, `lower`, `ucfirst`.

The "Site owns" checkbox fills the field only for new products. Import does not overwrite manager edits on the site.

## Key and empty cells

The key can be the part number, any product or resource field, an option, a TV or the resource ID. A product is looked up by the key even if the profile has no link to it yet. So the first import into an existing catalog finds the products instead of creating copies.

Empty cells are skipped by default: the site value stays as it was. On the "Fields" step you can change this for the whole profile or for a single field in the "Rules" block. For example, you can clear the old price when the supplier removes a discount, but leave the other fields alone. A cleared number is written as 0.

## Safeguards and missing products

A profile has three thresholds. A run stops and waits for confirmation if:

- more than the set share of the profile products would be unpublished;
- a price changes by more than the set percentage;
- the source returned far fewer rows than last time.

For products gone from the source, pick an action: do nothing, unpublish, set stock to zero or mark deleted. The rule applies only to products this profile created or linked. If a product comes back to the source, it reappears on the site.

## Modifications, categories and images

msCatalyst writes modifications to msOptionsPrice2 on MODX 2 and to ms3Variants on MODX 3. It creates missing categories from a path like "Shoes/Sneakers", vendors and options by itself. The separators `/`, `>`, `\` and `»` are equivalent, and letter case does not matter when looking up a category.

Images are downloaded to the folder from the `mscatalyst_sync_images_path` setting. A cell may contain:

- a full link `https://cdn.ru/1.jpg` or a protocol-relative link `//cdn.ru/1.jpg`;
- a relative path `photos/1.jpg` or `/photos/1.jpg`. It resolves against the "Image base" profile field. That field takes a link (`https://supplier.ru/images/`) or a folder on the site (`assets/import/`). If the field is empty, the path resolves against the source URL.

msCatalyst rejects paths with `..` and other schemes (`file:`, `php:`). The file is checked by its signature: JPEG, PNG, GIF, WebP and AVIF are saved. An HTML page instead of an image, and SVG, are rejected. Links that were already downloaded are not downloaded again on the next import. The same image under a new URL does not get into the gallery twice. If an image fails to download, the run logs an error with the reason and the URL, and the next run tries again.

## Translations

Sync writes Localizator translations and linked Babel resources, see [Multilingual](../multilingual).

## Rollback and history

Every run keeps the previous field values. The "Roll back" button restores prices and fields, and removes the products, categories, vendors and options the run created. The history shows which profile changed what and when.

## Schedule

Scheduled runs and continuation of unfinished runs are handled by the [msCatalystSync](../snippets/service#mscatalystsync) snippet from cron or a scheduler.
