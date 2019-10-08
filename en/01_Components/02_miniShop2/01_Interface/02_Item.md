MiniShop2 product is the MODX common resource class expanding.
It has own Interface within the control system and expanded set of characteristics.

[![](https://file.modx.pro/files/5/4/6/546f08580a43a9a34fca13625666055ds.jpg)](https://file.modx.pro/files/5/4/6/546f08580a43a9a34fca13625666055d.png)

### Main menu
When creating items, you can save it or cancel this action only.

When changing, the buttons of site display, copy and transition to the next items(if any) are added.

### Items panel
Items inherits and expands MODX resource standard panel.
As it has a lot of characteristics, they are located conveniently in separate tab set.

The first tab is standard characteristics of the resource:

[![](https://file.modx.pro/files/f/a/0/fa0a70de3b0b4ade9dc823c61ef4bf69s.jpg)](https://file.modx.pro/files/f/a/0/fa0a70de3b0b4ade9dc823c61ef4bf69.png)

Then there are the resource settings:

[![](https://file.modx.pro/files/5/b/7/5b7c0a87bc2f115ae6321b403c43173ds.jpg)](https://file.modx.pro/files/5/b/7/5b7c0a87bc2f115ae6321b403c43173d.png)

Consider that "Container" check box is commuted into "display in menu". Items cannot be a container. One must use category for it.

All items are hidden from menu by default, accelerating the tree operations. However, you may display them optionally using this button.

System setting **ms2_product_show_in_tree_default** controls its actions.

#### Characteristics of items
This is a special tab containing additional items characteristics, such as price, article, weigh, manufacturer and so on.
Characteristics of items tab is compulsory and the same for everybody.

[![](https://file.modx.pro/files/0/7/b/07bc6a3d032b1df6d562f45eca710a1as.jpg)](https://file.modx.pro/files/0/7/b/07bc6a3d032b1df6d562f45eca710a1a.png)

The system setting **ms2_product_extra_fields** controls the set and sequence of this tab fields' display. Accessible by default:
* **price** - product price, the number with up to 2 decimal places
* **old_price** - product price, the number with up to 2 decimal places
* **article** - product article, may be edited as text
* **weight** - product weight, the number with up to 3 decimal places
* **color** - product color array, autolist
* **size** - product dimension array, autolist
* **made_in** - country of production, ordinary text with hints
* **vendor** - manufacturer selection from drop down list
* **tags** - product teg array, autolist
* **new** - novelty stamp: yes \no 
* **pupular** - popular items stamp:yes \no  
* **favorite** - exceptional items stamp : yes \no  

Available option set may be changed by [plug in system][1] only.
The tab itself may be hidden by **ms2_product_tab_extra**.

#### Items options
Options, which are inherited from category and may vary in different items, are unlimited.

[![](https://file.modx.pro/files/3/4/3/343138dcb7ea9d2ce801d3d6772ad96ds.jpg)](https://file.modx.pro/files/3/4/3/343138dcb7ea9d2ce801d3d6772ad96d.png)

Options are created in corresponding shop setting section and added to category settings.If category has no options, this tab is not displayed. When using setting **ms2_product_tab_options**, you may hide  it compulsory.

More option details may be found in[corresponding section][2].

#### Items relations
This tab appears when editing items only, because it requires items id, which cannot exist at the beginning.

[![](https://file.modx.pro/files/2/4/1/2417516e02ff308cb1f53f8f883226a0s.jpg)](https://file.modx.pro/files/2/4/1/2417516e02ff308cb1f53f8f883226a0.png)

Available links are created in the shop settings. System setting **ms2_product_tab_links** may switch off this tab.

#### Categories
Every product of the shop may be in several categories.
One compulsory category must be written in **parent**, and additional in

[![](https://file.modx.pro/files/8/2/f/82ffb0c829e766b631bfb056f9f6052cs.jpg)](https://file.modx.pro/files/8/2/f/82ffb0c829e766b631bfb056f9f6052c.png)

Do not forget to save the products when changing category set! Native category of items cannot be switched off from the tree.

### Comments
This tab is displayed if only the [Tickets][3] component is installed on site and system setting **ms2_product_show_comments** is switched on.

[![](https://file.modx.pro/files/5/c/4/5c43f7a822acfe411cfe1eef88f16d92s.jpg)](https://file.modx.pro/files/5/c/4/5c43f7a822acfe411cfe1eef88f16d92.png)

To enable site visitors to comment your items, **TicketComments** snippet must be recalled on their pages.

### Gallery
Items file loading panel is the simplified version of the paid update [ms2Gallery][4].
Basically, is used for image loading, and other file types, allowed by media source settings.

It is displayed when editing items only.

[![](https://file.modx.pro/files/5/c/b/5cb7350a4826a7c3253265279d615a43s.jpg)](https://file.modx.pro/files/5/c/b/5cb7350a4826a7c3253265279d615a43.png)

The main difference from analogues are **preview generating in a moment of loading** and refusal of *phpthumbof* and similar output filters.
This provides maximum speed as direct references for ready images are displayed. Also this enables us to carry items files to third-party CDN services (Amazon S3, Selectel Cloud Storage).

[![](https://file.modx.pro/files/a/4/b/a4b89af1ea440c0581e16d0f3aed5930s.jpg)](https://file.modx.pro/files/a/4/b/a4b89af1ea440c0581e16d0f3aed5930.png)

Files may be sorted by dragging. There is context menu and multi marking by Ctrl(Cmd) and Shift.

First picture of a product is the main and is displayed in "Document" tab.
Its references and preview are saved in `image` and `thumb` product characteristics. This enables us to display them in catalogue without additional request.

Every product has its own file source (Media source), which manages boot options. Characteristics:
* **basePath** - path to items file directory. By default: `assets/images/products/`
* **basePathRelative** - basePath can be displayed in site root relation, if this option is on.
* **baseUrl** - url of items file directory, usually match with *basePath*, if *basePathRelative* is on.
* **baseUrlRelative** - baseUrl may be displayed in site root relation, if this option is on.
* **allowedFileTypes** - file types, permitted for loading. By default images: `jpg,jpeg,png,gif only`.
* **imageExtensions** - which file types are images. By default: `jpg,jpeg,png,gif`
* **thumbnailType** - preview file format: JPG or PNG.
* **thumbnailQuality** - quality of generated preview from 0 to 100, where 100 is maximum quality.
* **skipFiles** - service file types no need to show.
* **thumbnails** - setting for preview picture  generating as JSON array. Any parameters [acceptable by phpThumb][5] may be stated.
* **maxUploadWidth** - maximum image width. Any excess will be compressed by javascript on client side before loading.
* **maxUploadHeight** - maximum image height. Any excess will be compressed by javascript on client side before loading. 
* **maxUploadSize** - maximum image dimension, in bytes.
* **imageNameType** - type of file name: content hash, or file name processing by friendly resource name generation algorithm.

When changing items media source the loaded files will not be copied. You must take care of it.

#### Main settings of phpThumb
* **w** - preview width in pixel
* **h** - preview height in pixels
* **zc** - to zoom in and crop the image to fit into setted *h* and *w*
* **bg** - background color as hex (ffffff, 000000 etc.)
* **far** - to fit *h* and *w* without cropping. Background must be displayed in *bg*
* **q** - image quality from 0 to 100
* **ar** - image auto rotation using EXIF data

If you need to fit the image by height and width, *h* and *w* must be only stated.
```
[{"w":120,"q":90,"zc":"1","bg":"000000"},{"h":270,"q":90,"far":"1","bg":"ffffff"}]
````
For other parameters see [ phpThumb documents][5].

#### preview upgrading
All previews must be upgraded if the file source settings are changed.

This can be done manually, selecting required pictures and upgrading by context menu if there are few items.

[![](https://file.modx.pro/files/1/8/2/182e6f257fcf683235327edb160c4566s.jpg)](https://file.modx.pro/files/1/8/2/182e6f257fcf683235327edb160c4566.png)

Or you may upgrade **all pictures** by special script at once:
```
<?php
define('MODX_API_MODE', true);
require 'index.php'; // This file is in the site root

$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');

// Scan all items
$products = $modx->getIterator('msProduct', array('class_key' => 'msProduct'));
foreach ($products as $product) {
    // obtain originals of their pictures
    $files = $product->getMany('Files', array('parent' => 0));
    foreach ($files as $file) {
        // Then obtain originals of their preview
        $children = $file->getMany('Children');
        foreach ($children as $child) {
            // Delete these preview along with files
            $child->remove();
        }
        // and generate new ones
        $file->generateThumbnails();
        
        // If it is the first file in the gallery upgrade items preview reference 
        /** @var msProductData $data */
        if ($file->get('rank') == 0 && $data = $product->getOne('Data')) {
            $thumb = $file->getFirstThumbnail();
            $data->set('thumb', $thumb['url']);
            $data->save();
        }
    }
}

echo microtime(true) - $modx->startTime;
```
As preview generation operation may take a long time, better launch this script from server console.

### Duplicates
Items may be copied. Herewith, the following are copied:
* All document characteristics
* All document settings
* Items caracteristics
* Items options
* Items relations
* Items category

**Gallery files are not copied** because of long duration, especially if remote file source is used as Amazon S3-type, and the process may fall off on time out.


[1]: /ru/01_Components/02_miniShop2/03_Development/01_plug in_items.md
[2]: /ru/01_Components/02_miniShop2/01_Interface/04_Settings.md
[3]: /ru/01_Components/15_Tickets
[4]: /ru/01_Components/18_ms2Gallery
[5]: http://phpthumb.sourceforge.net/demo/docs/phpthumb.readme.txt
