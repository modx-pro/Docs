# Field

Field, filter, column — different names for the same thing. For correct setup, understand how `msProductData` differs from `modResource` or `msProductOptions`, because one product's values can be in different tables.

For miniShop2 tags choose `msProductOptions`, as values are in a separate options table. There is a default class list, but you can enter any class, including from your own component. SeoFilter can also count results from your tables (covered later).

After adding a field you cannot change class and key, but you can change synonym. E.g. if "Color" used synonym *color* and you switch to *cvet*, SeoFilter will try to replace `{$color}` with `{$cvet}` in rule texts, including declined forms like `{$color_r}`.

Field parameters:

- **Hide param in URL** - param (field synonym) is omitted in links. Instead of `/color-green` you get `/green`.

- **Value before param** - reverses URL fragment: `/green-color` instead of `/color-green`.

- **Exact match (strict search)** - mainly for accurate counts. For numeric (id) fields it's better enabled. Without it: LIKE %val%; with it: strict match.

- **Slider field (number filters)** - for fields like price. With this checked, values are not collected and you add dictionary entries manually, e.g. "0,10000" with value "Budget" or "Products under 10k". Range between two values. Choosing 0–10000 in catalog filter changes URL to /budget or as configured in friendly URL settings. Can be combined with other fields.

- **Value in another table** - important when fields pull values from elsewhere. E.g. `parent` from `modResource` has only parent ID, not name. You want the name and declined form. Fill 3 of 4 fields: Class (e.g. `modResource`), match field (`id`), value field (`pagetitle`). Component can be skipped for standard MODX models.

- **Enabled** - disabling stops value collection but keeps the field in rules. Use when dictionary has junk and you don't want new links.

- **Dependent field** - when enabled, two more fields appear. E.g. catalog: add Brand, then Model. In "Depends on" choose Brand. In "By column" enter marka. Works with custom component tables or customExtra.

- **Extra condition for value collection** - simple condition applied only to the value table. May be extended later.
