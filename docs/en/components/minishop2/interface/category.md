# Product category

Product categories are for storing and managing miniShop2 products.

Technically it is a [CRC][0] **msCategory** extending the standard modResource class.
This lets the category load its own JavaScript and CSS for working with products.

## Creating a category

You can create a category in two ways:

- Choose the option from the resource tree context menu

![Creating category - 1](https://file.modx.pro/files/d/8/7/d87edd56ee056286ed8eb4575db6df6c.png)

- Or switch document type when creating a regular resource

![Creating category - 2](https://file.modx.pro/files/c/b/c/cbc1e2f61632967c578cdfc22763ad93.png)

- Resource type can be changed later, turning a category into a regular document and vice versa.

When creating a category you see some differences from a regular document:

- The "Content" (content) field is only on the first tab.
- That field is pre-filled with text from system setting **ms2_category_content_default**.

![Creating category - 3](https://file.modx.pro/files/0/e/0/0e0fa2e909480f5310381da4ed291552.png)

- The settings tab is reorganized: no "Content type" (content_type) or "Content disposition" (content_dispo).
- The "Container" (isfolder) option is hidden — all categories are containers.
- Instead there is a "Hide children in tree" toggle that overrides their own menu visibility.

![Creating category - 4](https://file.modx.pro/files/5/4/a/54ad024a03e945a7017c06b93edce074.png)

After creating the category the page reloads and you see the category edit panel.

## Editing a category

There are more differences here.

### Product management

The first tab is the category product table.

The table header has buttons to create a product, add a category, and clear deleted resources.
The same actions exist in the resource tree; the table adds them for full-screen mode (when the tree is collapsed).

Search works by these product fields:

- Integer: exact match on product **id**.
- Otherwise: partial match on
  - **pagetitle** — product title
  - **longtitle** — long title
  - **description** — description
  - **introtext** — intro text
  - **article** — product SKU
  - **made_in** — country of manufacture
  - Vendor name (name of linked msVendor)
  - Category name (pagetitle of parent msCategory)

If **ms2_category_show_nested_products** is on (default), products from nested categories up to 10 levels are shown.
Search uses this setting too (e.g. search from the root category by a subcategory name).

Direct children of the category are shown in **bold**.

![Product management](https://file.modx.pro/files/c/f/d/cfd7aedea1539f18cffb4b7077acbca0.png)

#### Bulk actions

Each product has an action list in the right column. You can select multiple rows with [[Shift]] or [[Ctrl]] [[⌘ Cmd]].

You can:

- open the product on the site in a new window
- open the product for editing in this window (or click the product title link)
- duplicate the product
- publish / unpublish the product
- delete / restore
- hide / show in the resource tree

#### Sorting

Selected products can be reordered by drag-and-drop.
Select one or more products and drag onto another — menuindex of involved products is updated.

All products must be in the same category for correct sorting.

#### Moving to a subcategory

If you drag a product onto a product from **another** category, it is **moved** there (parent changes).

You can quickly change categories of nested products; this only works if at least one product from the target category is already shown.

#### Quick edit

Visible table columns are set in **ms2_category_grid_fields**.
Most columns can be quick-edited by double-clicking.
Available columns (at documentation time):

### Resource properties

- **id** — primary key, read-only
- **pagetitle** — product name as link to edit; also shows id and subcategory name for nested products
- **longtitle**, **description**, **alias**, **introtext**, **content** — editable text
- **template** — template dropdown
- **createdby**, **createdon**, **editedby**, **editedon** — creation/edit user and date
- **deleted**, **deletedon**, **deletedby** — deletion
- **published**, **publishedon**, **publishedby** — publication
- **menutitle**, **menuindex** — menu
- **uri**, **uri_override** — friendly URL
- **show_in_tree** — show in resource tree: yes / no
- **hidemenu** — hide from site menu: yes / no
- **richtext**, **searchable**, **cacheable** — editor, search, cache

### Product properties

- **new**, **favorite**, **popular** — flags: yes / no
- **article** — SKU (text)
- **price**, **old_price** — price (2 decimal places)
- **weight** — weight (3 decimal places)
- **image**, **thumb** — main and thumbnail image
- **vendor**, **vendor_name** — vendor (dropdown / read-only)
- **made_in** — country (text)

Fields that hold arrays (e.g. **color**, **size**, **tags**) are not shown in the table.
You can change this or add fields via [product plugins][1].

### Product options

Table of extra product properties assigned to the category in [miniShop2 settings][2].
You can add existing options manually or copy from another category.

![Product options](https://file.modx.pro/files/b/d/7/bd729e2da9295e635ffe33e1926c1a3c.png)

From the action menu you can:

- enable or disable product options
- make an option required or optional
- remove an option for this category

Required options are shown in bold.
Quick edit of default values and drag-and-drop sort are available.

[0]: http://rtfm.modx.com/revolution/2.x/developing-in-modx/advanced-development/custom-resource-classes
[1]: /en/components/minishop2/development/product-plugins
[2]: /en/components/minishop2/interface/settings
