The category of goods is designed for convenient storage and control of miniShop2 goods.

This is [CRC][0] **msCategory**, which expands standard class of modResource.
This enables category to load its own javascript and css files providing more convenient dealing with goods.

## Creation of a category
There are two ways to create a new category:
* To choose a required point in the resource tree context menu

[![](https://file.modx.pro/files/d/8/7/d87edd56ee056286ed8eb4575db6df6cs.jpg)](https://file.modx.pro/files/d/8/7/d87edd56ee056286ed8eb4575db6df6c.png)

* Or switch document type when creating regular resource

[![](https://file.modx.pro/files/c/b/c/cbc1e2f61632967c578cdfc22763ad93s.jpg)](https://file.modx.pro/files/c/b/c/cbc1e2f61632967c578cdfc22763ad93.png)

*Resource type may be further changed converting the category into regular document and vice versa*

When creating a category one may see plainly some difference from regular document:
*  "Content" (content) field is only presented in the first tab.
* The text stated in system setting **ms2_category_content_default** must be immediately written in this field.

[![](https://file.modx.pro/files/0/e/0/0e0fa2e909480f5310381da4ed291552s.jpg)](https://file.modx.pro/files/0/e/0/0e0fa2e909480f5310381da4ed291552.png)

* Setting tab is relinked."Type of content" (content_type) and "Disposition of content" (content_dispo) fields are absent
* "Container" (isfolder) parameter is hidden - all categories are bound to be containers.
* There is the switch "Hide descendants in the tree" instead of it, which overlaps their own settings displaying in the menu.

[![](https://file.modx.pro/files/5/4/a/54ad024a03e945a7017c06b93edce074s.jpg)](https://file.modx.pro/files/5/4/a/54ad024a03e945a7017c06b93edce074.png)

After the category is created the page is reloaded. You may see the category changing panel.

## Category change
More difference is here.

### Control of goods
The first tab is the table with the category goods.

Buttons to create goods, to add a new category and to clear the basket with deleted resources are in the table title.
All these functions are in the system resource tree. They are added to the table to make full screen regime mode more convenient. 
(when the resource tree is minimized).

Goods may be also searched by the following characteristics:
* If the whole number is stated, then **id** of goods register is searching .
* If no, then fuzzy field match is searching.
    - **pagetitle** - item name
    - **longtitle** - extended name
    - **description** - description
    - **introtext** - introduction
    - **article** - article of an item
    - **made_in** - country of production
    - Name of manufacturer (name tied to msVendor)
    - Name of the goods category (pagetitle parent msCategory)

If the system setting **ms2_category_show_nested_products** is turned in (by default), all included goods are  displayed up to 10 category depth.
Search also considers this setting, permitting, for example,to enter catalog root category and find all goods of single subcategory by its name.

One may simply distinguish between direct descendants and enclosed goods of other categories - they are bold.

[![](https://file.modx.pro/files/c/f/d/cfd7aedea1539f18cffb4b7077acbca0s.jpg)](https://file.modx.pro/files/c/f/d/cfd7aedea1539f18cffb4b7077acbca0.png)

#### Grouped operations
Operations for every product are listed in right-hand column. Using Shift or Ctrl (Cmd) you may select several lines at a time.

Possible:
* to open a product on site in new window
* to open a product to edit in this window ( one may click on the item name reference)
* to copy a product
* to publish \ to cancel item publishing
* to delete \ to restore
* to hide \ to show a product in the resouce tree

#### Sorting
Marked goods may be sorted by dragging.
Simply mark one or several goods and drag to another. Menuindex of all this process participants will change.
To sort correctly the goods must be of a single category.

#### Transfer to subcategory
If you are dragging a product to **another** category member, it will be **transferred** there.
That is to say its fild parent will change.

In such a manner one may swiftly change the embedded goods category, but only if any product is already displayed in it.

#### Prompt editing
System setting **ms2_category_grid_fields** contains the set of accessible columns of the table.
Most of them you may edit by double click on a required field.
At the moment you may display the following columns:

**Resource characteristics**

* **id** - initial key for reading only
* **pagetitle** - product title as editing reference. If a product is embedded with regard to current category, its id and subcategory name are displayed also.
* **longtitle** - long title, may be edited as text
* **description** - product description, may be edited as text
* **alias** - aliased name of a product for friendly url, may be edited as text 
* **introtext** - introduction, may be edited
* **content** - resource content,  may be edited as text
* **template** - template selection from the drop down list
* **createdby** - user selection from the drop down list
* **createdon** - selection of date and time of resource creation 
* **editedby** - user selection from the drop down list
* **editedon** - selection of date and time of resource editing 
* **deleted** - resource is marked for deletion: yes \ no.
* **deletedon** - selection of date and time of resourse deletion
* **deletedby** - user selection from the drop down list
* **published** - resource is published: yes \ no.
* **publishedon** - date of publishing
* **publishedby** - user selection from the drop down list
* **menutitle** - may be edited as text
* **menuindex** - integer - number of resource position in current category
* **uri** - CNC reference on the resource,may be edited as text
* **uri_override** - lockdown the reference: yes \ no
* **show_in_tree** - to display this item on the resource tree:yes \ no
* **hidemenu** - not display item in site menu:yes \ no 
* **richtext** - content editing connection stamp:yes \ no
* **searchable** - stamp of item indexing for search:yes \ no 
* **cacheable** - stamp of item cache:yes \ no 

**Characteristics of goods**

* **new** - novelty stamp: yes \ no
* **favorite** - exceptional stamp:yes \ no 
* **pupular** -popular stamp:yes \ no 
* **article** - article, may be edited as text
* **price** - price, number with up to 2 decimal places
* **old_price** - previous price,  number with up to 2 decimal places
* **weight** - weight, number with up to 3 decimal places
* **image** - large scale product image
* **thumb** - small scale product image
* **vendor** - manufacturer selection from drop down list
* **vendor_name** - manufacturer name, for reading only
* **made_in** - country of production, may be edited as text

The fields with arrays of **color**, **size** and **tags** type values are not displayed in the table.
You may change this and add your own fields  by [goods plugin system][1] expanding.

### Goods options
A table with additional characteristics of goods with categories assigned by [ miniShop2 settings][2].
You may add already created characteristics manually, or copy from another category.

[![](https://file.modx.pro/files/b/d/7/bd729e2da9295e635ffe33e1926c1a3cs.jpg)](https://file.modx.pro/files/b/d/7/bd729e2da9295e635ffe33e1926c1a3c.png)

From the action menu you can:
* switch on/off goods characteristics
* switch on/off mandatory requirement to fill in goods characteristics
* delete this category characteristic

Mandatory characteristics are bold.
Swift editing of values by default is also available as well as characteristics sorting by dragging.


[0]: http://rtfm.modx.com/revolution/2.x/developing-in-modx/advanced-development/custom-resource-classes
[1]: /ru/01_Components/02_miniShop2/03_development/01_plugin_goods.md
[2]: /ru/01_Components/02_miniShop2/01_Interface/04_Settings.md
