# Field

Field, filter, column — different names for the same concept. The main thing for correct setup is to understand how class `msProductData` differs from `modResource` or `msProductOptions`, because values for one product are stored in different places.

For miniShop2 tags choose class **msProductOptions**, since values in a convenient format are stored in a separate options table. By default there is a list of classes, but you can enter any class, including from your own component. You can also teach SeoFilter to count results from your tables; that is covered later.

After adding a field you cannot change class and key, but you can change the synonym. For example, if you used synonym *color* for "Color" and later decide to use *cvet*, changing the synonym in the field will not break anything. In such cases SeoFilter will try to replace the old variable `{$color}` with `{$cvet}` in rule texts, including declined forms like `{$color_r}`.

Some field parameters:

- **Hide param in URL** — when building links in the rule, the parameter (field synonym) is omitted. Instead of `/color-green` you get `/green`.

- **Value before param** — reverses the link fragment: instead of `/color-green` you get `/green-color`.

- **Exact match (strict search)** — mainly for accurate counts. If the field holds numeric values (ids), it is better to enable it. Without the checkbox values are matched with LIKE %val%; with it, matching is strict.

- **Slider field (number filters)** — for fields like price. When checked, values are not collected and you add dictionary entries manually, e.g. "0,10000" with value "Budget" or "Products under 10k". That is a range between two values. If on the catalog page the user selects the range 0–10000 in the filter, the page URL becomes /budget (or as set in friendly URL settings). This field type can be used together with others.

- **Value in another table** — one of the most important options when you use fields that pull values from other tables, not just standard fields with final values. For example, the `parent` field from class `modResource` holds only the parent’s ID, not its name. Using the ID in SEO texts is not acceptable; you want the name and possibly declension. You could edit dictionary entries by hand, but that is inconvenient. So when this option is enabled, fill 3 of the 4 extra fields. The component field can be left empty, since loading the model for standard MODX tables is not required. Class — e.g. `modResource`; field for matching — `id`; field where the value is stored — `pagetitle`.

- **Enabled** — disabling the field does not remove it from rules, it only stops collecting values for this field. Use when the dictionary gets junk and you do not want to generate new links automatically.

- **Dependent field** — when enabled, two more inputs appear. Example: car catalog. You already added field Brand, now adding Model. In "Depends on" select the previously added Brand. In "By column" enter marka. This works well when brands and models are stored in your component’s tables or e.g. customExtra.

- **Extra condition for value collection** — a simple condition applied only to the table from which values are collected. May become more capable in the future.
