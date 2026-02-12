# Interface

## Property settings

### Creating

Before working with products you need to define the properties.
Do this in miniShop2 settings (Applications -> miniShop2 ->
Settings -> Extra properties tab). Click "Create" and in the
dialog set **property name**, **type**, **context** (default "Not specified" means
the property is visible in all contexts), and **description**—
mainly for site managers, not the client.

![Creating](https://file.modx.pro/files/3/0/c/30c42aaaee12796644f243109c6d9fa2.png)

### Editing

Edit common parameters by right-clicking and choosing **Edit**, or double-clicking the table cell. Changes save immediately. Main options:

**Groups** — properties are grouped when building client data. To create a group, type its name and press [[Ctrl]]+[[Enter]] or click elsewhere. Only one group per property. Existing groups can be chosen from the list.

**Chunk** — JSON-formatted chunk name used instead of the default. See "[chunk customization][snippet msExtraFields custom_chunks]".

**Name** — property name; changing it updates all usages.

**Type** — list of configured property types, each with its own behavior and display in the manager and on the frontend. See "[Property types](/en/components/msextrafields/interface#property-types)". **Warning:** switching between incompatible types (e.g. "text" to "range") that are already used in products **can break the filter** on the frontend.

**Value** — input type for this field (x-type changes with type). When you change type, values are not converted automatically.

**Unit of measure** — shown when viewing product(s) via the parseMeasure snippet from system setting ms2efs_product_custom_measure.

**Show in short** — when true, the property is shown by ``[[!msExtraFields? &display=`short`]]``; default chunk group is short, fallback is info.

**Filter** — when true, the property appears in mSearch2 filter.

**Only in info** — in [msExtraFields][snippet msExtraFields], regardless of display (edit or short), the property is always shown as info. Use for read-only info on the product page or when the property does not affect price.

**Active** — when false, the property is hidden in the filter and on the product page. In the manager it is shown with a red background.

![Editing](https://file.modx.pro/files/6/9/6/696a3fcf29088a5a82271018bf0a89a7.png)

### Deleting

One record at a time via right-click and "Delete".

## Property types

### Text

Plain text; MODX tags are processed. In the filter it is built as info, so using it as a search criterion is not recommended.

### List

Builds an element with **option** inside **select**. If [Bootstrap Multiselect](https://github.com/davidstutz/bootstrap-multiselect) is loaded, it styles the element. List values are separated by double pipe "**||**", e.g. "*red|| green || blue*". To save after entering values use [[Ctrl]]+[[Enter]]. In the product manager this property is a dropdown (single value). On the product page the first *available* value is auto-selected because a select cannot stay empty. If all values are inactive, the property is not set. In the product filter, depending on settings, it can become *List (multiple)*.

### List (multiple)

Same as "List" but **select** has **multiple="multiple"**. [Bootstrap Multiselect](https://github.com/davidstutz/bootstrap-multiselect) turns it into checkboxes. Inactive values are not selectable on the product page.

### Radio

Visually similar to "List" but uses `<input type="radio"...`. Also handled by [Bootstrap Multiselect](https://github.com/davidstutz/bootstrap-multiselect). In the manager, values are separated by `||`.

### Checkbox

Shown as a checkbox in the manager and on the frontend. In short mode the client sees "Yes" and "No".

### Number

In the manager only digits and a decimal point are allowed. Save with [[Ctrl]]+[[Enter]]. Like "Text", not useful as a search criterion except when customizing the filter display chunk via the "chunk" parameter.

### Range

Two modes:

- **Range** — data as n-n2, n3-n4, n5. Only digits, hyphen, comma, space. On the frontend the "Step" parameter splits the range. Client sees a slider.

- **Values** — comma-separated quoted values, e.g. `"cold","cool","warm","hot"`. On the frontend they fill the slider scale evenly.

In the "**Properties**" field you can add JSON options, e.g. `{"prefix": "Age ", "max_postfix": "+"}`. See [Ion.RangeSlider](http://ionden.com/a/plugins/ion.rangeSlider/en.html).

In the filter the client sees a RangeSlider; elsewhere the set property value. On the product page it can be a numeric input (validated against the range) or a dropdown when type is "*Values*". Only one value can be selected from the range.

## Product category page

Before describing this page, understand how properties are filled for products. Properties from parent categories inherit characteristics from the nearest parents, overriding previously declared ones. With a multi-level category structure: declare common properties at the top, category-specific ones at lower levels. Products in the deepest category receive properties from all parents. Product properties are not limited to those declared in categories. Below is a diagram of property inheritance.

![Product category page - 1](https://file.modx.pro/files/a/2/2/a22325554ea87a9a007f6fa2bd453541.png)

Add the properties you want in products of this category. You can add more later. These properties become search criteria in mSearch2.

Open the "**Product properties**" tab and click "**Create**". Choose only properties already declared in miniShop2 settings and belonging to the current context or all contexts. Added properties go into the table. Functionally it is the same as the settings table with some extras. Name changes and group creation apply only to child products and categories.

To replace a wrong property, double-click it and pick another from the list. If the property is used in child products, you'll be warned about possible issues when changing types.

![Product category page - 2](https://file.modx.pro/files/a/d/d/add7b9900f4f2bd08c98e599fca897dd.png)

The product table shows properties of the current product. Double-click to open quick edit for that product's properties.

![Product category page - 3](https://file.modx.pro/files/e/f/c/efc65a5a16b566b55cabfb097f242902.png)

On delete, the component checks if the property is used in child elements. If so, you can:

- remove the property from all child products;
- keep the property in products (visible on the product page) but exclude it as a filter on the category page.

## Product page

msExtraFields settings control the product page layout. By default:

- new property [Unit of measure](/en/components/msextrafields/interface#measure-type) added;
- **Product properties** page split into 2 tabs:
  - first: [Dynamic properties](/en/components/msextrafields/interface#product-properties) table and discount management;
  - second: **Category tree** in its own tab.

### Unit of measure

Used to show the "measure type" on the product page. The list is set by **ms2efs_product_custom_measure**. Output via snippet [parseMeasure][snippet parseMeasure] with the `input` value matching a key in that array.

### Product properties

The add-property list shows all properties available in the current context or all contexts. Sorted alphabetically: ungrouped first, then by group (groups in blue). Properties from a parent category have a yellow background and show the category name and ID in bold next to the property name.

![Product properties - 1](https://file.modx.pro/files/2/2/1/221f7f7be6b3528f26597bae0e650c1d.png)

For list-type properties you can add multiple rows with different values, prices and discounts. On the frontend they combine into one block with different behavior when the value changes. See [product price management](/en/components/msextrafields/interface#editable-fields) and [quantity discounts](/en/components/msextrafields/interface#quantity-discounts).

![Product properties - 2](https://file.modx.pro/files/6/6/3/663f46a74766891e1e141d37642d159c.png)

With `display='edit'` users can choose product option values. The same product with different options becomes multiple cart items (e.g. 2 red and 3 blue t-shirts = 2 items, 5 total). Each cart item has its own discount and price rules. The "SKU" field helps warehouse staff. SKU and other fields are stored in order history and sent to managers and the customer.

All table changes save immediately. To refresh cached properties (used by `[[msExtraFields?&fastGenerate=0]]`), click "Save".

Some fields are read-only (inherited from categories or global settings). **Default** shows the value from the product category. The field helps managers know which values are valid for each property type.

#### Editable fields

- **SKU** — used to inform about the option SKU, for orders, or import/export;
- **Condition** — condition for the property value;
- **Value** — editing and display depend on type; input is validated;
- **Price** — only when ``[[!msExtraFields?&display=`edit`]]``. Manages price by option value. Example: red t-shirts +100 vs base price. Allowed: `100, +100, -20, 5%, +5%, -5%`. *Check that total discount/markup is logical.* Multiple prices are combined; if result ≤ 0, base price is used;
- **Tip** — placeholder `[[+tip]]` in the property chunk; supports other placeholders and snippets; only in row chunks;
- **Quantity** — integer; manager shows colors by value:

- **0** #FF0000 (red)
- **0 - 4** #EE3B3B (light red)
- **5 - 10** #228B22 (green)
- **11 - 20** #4169E1 (blue)
- **\> 20** #483D8B (dark blue)

- **Quantity discount** — see [individual discounts](/en/components/msextrafields/interface#individual-discounts);
- **Disabled** — when set, the property is hidden or disabled for list types; ignored in price and discount calculation.

### Property types (on product page)

#### Text

Plain text supports placeholders of the current property and document, and snippets. Placeholders: `id, article, prop_id, cond, type, defaultval, group, disabled, count, tip, order_discount, price, measure`.

#### Number

Numeric only; decimal point for fractions.

#### Checkbox

Checkbox in manager and frontend. With ``[[!msExtraFields?&display=`short`]]`` shows *Yes / No*.

#### Radio

Rendered as `<input type="radio"...>`. On the product page with `display='edit'` the value is always selected; only one value. The first valid value is selected by default.

![Radio](https://file.modx.pro/files/e/4/9/e49242aec10327766d42c9208a49ed9d.png)

#### List

Same as Radio but rendered as `<select><option>...</option></select>`. Handled by [Bootstrap Multiselect](https://github.com/davidstutz/bootstrap-multiselect).

#### List (multiple)

Same as List but allows multiple values. Price and discount combine from selected values.
*Note: duplicate values in the manager do not overwrite — they append.*

![List](https://file.modx.pro/files/3/c/2/3c2e776914ffb5f5a8c6eefc94d38863.png)

#### Range (values, range)

See [property types - range](/en/components/msextrafields/interface#range) above.

In manager:

![Range](https://file.modx.pro/files/b/0/a/b0abed560e1f67621640858a3126426e.png)

On product page:

![Product page view](https://file.modx.pro/files/7/e/2/7e2e2ce186d4b9639a094c0c5d48e541.png)

In product filter:

![Product filter view](https://file.modx.pro/files/2/7/9/27917e186cd7545ae83f8766497799a9.png)

### Quantity discounts

#### General

Per-product quantity discounts: specify quantity range, discount amount, and message. Discounts apply only when `display='edit'`.

Range formats: 100 (up to 100), 50-100, >100, <100.
Price formats: 100, +100, -20, +5%, -5%.
If discount exceeds product price it is ignored. Discount cannot be negative (then it is treated as range only).
Multiple rules allowed; ranges must be unique. Price recalculates when cart quantity changes. Best-matching range wins (e.g. "1-3" has higher priority than "<3").

![General - 1](https://file.modx.pro/files/6/0/3/603727f63455234cae85fa0ed8eeab6c.png)

You can sort these values; order affects only the hint block display, not calculation.

![General - 2](https://file.modx.pro/files/a/4/3/a433ad17ed9ec250c7531e6b93050113.png)

Hint and discount rows use the chunk from tplOrder_discountprice in plugin [msExtraFields][plugin msExtraFields].

Price recalculates when quantity changes (before clicking "Add to cart"); the add button stays inactive until the server responds. Updated price appears in the block with class "e-price". If the user adds items one by one and the price changes, they get a message and the price updates.

![General - 3](https://file.modx.pro/files/9/f/7/9f7031f41106821e17582283cd8ac6c3.png)

#### Individual

Each property can have its own discounts. Double-click the "Quantity discount" cell to open the same table. You can set discounts per property value (or value group). With a general discount, **discounts are summed**.

![General - 4](https://file.modx.pro/files/8/3/f/83f3c10c92ada9c5ce98b24d7dba228d.png)

Property discounts appear in the main table. If a "price" value is set, it is applied before the discount.

![General - 5](https://file.modx.pro/files/b/f/6/bf6c150f5e4dd446548b2d957b82497d.png)

## Misc

When copying msProduct documents (e.g. from the resource tree), extra properties and discounts are duplicated.

When copying msCategory documents, properties copy only for the current document; child documents do not get them (tree traversal and inheritance behavior).

Hidden fields in tables track creation/update dates and user IDs. All actions are logged in the system journal.

[snippet parseMeasure]: /en/components/msextrafields/snippets#parsemeasure
[snippet msExtraFields]: /en/components/msextrafields/snippets#msextrafields
[snippet msExtraFields custom_chunks]: /en/components/msextrafields/snippets#chunk-customization
[plugin msExtraFields]:  /en/components/msextrafields/plugins
