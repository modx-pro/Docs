One of the strenghts of ms2Gallery is that it generates all previews when loading.
This helps you to do without any need to use dynamic resize for pictures output on the site, which usually works
not so fast. 

## Previews generation setting
All galleries are connected to the files source, and for previews generation its settings should be consulted.

* **basePath** - path to the directory with loaded files and server-based previews. By default `assets/images/products/`.
* **basePathRelative** - indicates that *basePath* is set in relation to the site's root. By default - *yes*.
* **baseUrl** - url for access to files and previews from outside of the site. By default `assets/images/products/`.
* **baseUrlRelative** - indicates that *baseUrl* is set in relation to the site's root. By default - *yes*.
* **allowedFileTypes** - files allowed for loading. By default `jpg,jpeg,png,gif`.
* **imageExtensions** - list of extensions in *allowedFileTypes*, which stand for pictures. By default `jpg,jpeg,png,gif`. 
* **thumbnailType** - what preview type can be used by default. Usually it is *jpg*.
* **thumbnailQuality** - the previews generation quality. By default - *90%*.
* **skipFiles** - list of file extensions that are not to be put in the list. By default it contains service extensions like `.svn,.git,_notes,nbproject,.idea,.DS_Store`.
* **maxUploadWidth** - the maximum width of the source. If the picture being loaded is wider, its size will be reduced right in the
browser, and the server disk will get the new version of it with the maximum width. By default *1980px*.
* **maxUploadHeight** - the same thing but for height. By default *1080px*.
* **maxUploadSize** - the maximum size of a file. By default *10Mb*.
* **imageUploadDir** - the direction of loading files. 1 (by default) - loading into the end of the list, 0 - into the beginning of it.
* **imageNameType** - type of generation of previews' names. *hash* generates a unique name depending on the content of the file.
*Friendly* (by default) makes the name acceptable for internet sites, cutting down all that is not 
letters or figures, reducing everything to the low register and replacing blank spaces with dashes.
* **thumbnails** - the most important parameter, which contains the array of previews generation settings for phpThumb. For example:
```
{
    "small": {
        "w":120,
        "h":90,
        "q":90,
        "zc":1,
        "bg":"000000"
    },
    "medium": {
        "w":360,
        "h":270,
        "q":90,
        "zc":1,
        "bg":"000000"
    }
}
```
Every array of settings creates its own preview, and in our example there will be 2 files: 120x90 и 360x270. 

Before the 2.0 version, the size of previews served as their pseudonym, and the previews generated were saved into the directory under that name: 
`assets/images/products/id_ресурса/120x90/file_name` and `assets/images/products/id_ресурса/360x270/file_name` 

For the 2.0 version the preview's pseudonym can be the same as the key to the array. In our example these will be paths
`assets/images/products/id_ресурса/small/file_name` and `assets/images/products/id_ресурса/medium/file_name`

This is much more convenient, because the exact width and height of a preview not always can be indicated, usually it seems easier to 
indicate only the maximum width or height and to have the other parameter calculated automatically, depending on the proportions
of the source image.

### Basic phpThumb parameters
* **w** - the maximum width of an image in pixels
* **h** - the maximum height of an image in pixels
* **wp** - the maximum width for portraits
* **hp** - the maximum height for portraits
* **wl** - the maximum width for horizontal images
* **hl** - the maximum height for horizontal images
* **ws** - the maximum width for square images
* **hs** - the maximum height for square images
* **f** - file format: `jpeg`, `png` and `gif`
* **q** - quality of JPEG resize: `1` the worst one, `95` the best one
* **zc** - zoom-crop, zooming or cropping images so as they fit the indicated parameters.
       (needs inidcating `w` and `h`, covers parameters `iar` and `far`).
       `1` and `C` chooses images for work from the center.
       Use`T`, `B`, `L`, `R`, `TL`, `TR`, `BL`, `BR` for choosing from top/bottom/left/right and their combinations.
       All parameters apart from `C` need **ImageMagick** to be plugged.
* **bg** - pouring the background with colour hex (`000000`, `ffffff` etc.)
* **ra** - rotating the image to some angle in degrees. A negative number stands for clockwise rotation and a positive number - for counterclockwise rotation.
* **ar** - automatical image rotation. `x` - rotate as it is indicated the file's EXIF. 
        `L` horizontal image, `P` vertical image,
        `lP` rotate clockwise, `Lp` rotate counterclockwise.
* **aoe** - Output Allow Enlarging, the possibility to generate a preview that is liarger than the source image: `1` and `0`.
       `far` and `iar` cover this setting. 
* **iar** - Ignore Aspect Ratio, turns off the observance of proportions and draws the image exactly by `w` and `h` parameters
(which have to be loaded mandatorily). Covers *far* parameter.
* **far** - Force Aspect Ratio, the image will be made to fit parameters `w` and `h` (which have to be loaded mandatorily).
        Alignment: `L` left, `R` - right, `T` top, `B` bottom, `C` - center.
        `BL`, `BR`, `TL`, `TR` - use the right direction if the image is horizontal or vertical.

If you indicate only width or height, the other parameter will be calculated automatically, depending on the proportions of the source image.
All other phpThumb parameters you may [see in the documentation][1].

### Overlaying the watermark
For overlaying the watermark on images in the galleries 3 conditions should be followed.

[![](https://file.modx.pro/files/6/c/1/6c18561f4383506c2bfef7a497858841s.jpg)](https://file.modx.pro/files/6/c/1/6c18561f4383506c2bfef7a497858841.png)

**1.** **ImageMagick** should be installed on the server. It also should be accessible for php. 
[See details here][2].

**2.** In the files source ms2Gallery **fltr** with **wmi** should be added:
```
{
    "small": {"w":120,"h":90,"q":90,"zc":"1","bg":"000000","fltr":"wmi|wm.png|BR|80"},
    "medium": {"w":360,"h":270,"q":90,"zc":"1","bg":"000000","fltr":"wmi|wm.png|BR|80"}
}
```
Parameters are decoded like this: 
```
"wmi" (WaterMarkImage)
    [ex: &fltr[]=wmi|<f|<a|<o|<x|<y|<r] where
    <f is the filename of the image to overlay;
    <a is the alignment (one of BR, BL, TR, TL, C,
        R, L, T, B, *) where B=bottom, T=top, L=left,
        R=right, C=centre, *=tile)
        *or*
        an absolute position in pixels (from top-left
        corner of canvas to top-left corner of overlay)
        in format {xoffset}x{yoffset} (eg: "10x20")
        note: this is center position of image if <x
        and <y are set
     <o is opacity from 0 (transparent) to 100 (opaque)
        (requires PHP v4.3.2, otherwise 100% opaque);
     <x and <y are the edge (and inter-tile) margin in
        pixels (or percent if 0 < (x|y) < 1)
        *or*
        if <a is absolute-position format then <x and
     <y represent maximum width and height that the
        watermark image will be scaled to fit inside
     <r is rotation angle of overlaid watermark
```


**3.** File *wm.png* should be put in `/assets/components/ms2gallery/` - this is exactly where it will be looked for. 
Instead of assets there can be another directory if you renamed it when installing MODX in an advanced mode.

You can indicate not just *wm.png*, but *images/wm.png* in the source - then the file should be put in 
`/assets/components/ms2gallery/images/`.

If everything is done correctly, you will get the watermark on your images when loading them into the gallery.

Please notice again that **the hosting should be ready for such a difficult work** with images, 
as overlaying the watermark.

### Examples 
Turning off the zoom of pictures in previews. That is, when the preview size is indicated to be bigger than the size of the file being loaded.
```
{"big":{"wp":1920,"aoe":0,"far":0,"iar":0}}
```
Parameter *aoe* turns off the zoom, but **iar** and **far** ignore this setting - they should be turned off.


### Preview update
You can selectively update previews of the files you need through the admin space:

[![](https://file.modx.pro/files/7/0/f/70fdb87589c0ccf0e2a4131cdbcdce11s.jpg)](https://file.modx.pro/files/7/0/f/70fdb87589c0ccf0e2a4131cdbcdce11.png)

*To choose more than one hold Shift or Ctrl(Cmd)*

If you need to update *all* previews on your site according to the settings of their file sources, just enter the server console and launch
`generate.php` from the directory `core/components/ms2gallery/cli`. For example:
```
php ~/www/core/components/ms2gallery/cli/generate.php
```

If you need to update all previews from the script intself, use this code:
```
$modx->addPackage('ms2gallery', MODX_CORE_PATH . 'components/ms2gallery/model/');

$files = $modx->getIterator('msResourceFile', array('parent' => 0));
foreach ($files as $file) {
    $children = $file->getMany('Children');
    foreach ($children as $child) {
        $child->remove();
    }
    $file->generateThumbnails();
}
```

If you overlay the watermark on your image, check in your files' source that they have the absolute path from
the site's root, for example `/assets/components/ms2gallery/img/wm.png`.


[1]: http://phpthumb.sourceforge.net/demo/docs/phpthumb.readme.txt
[2]: http://modx.pro/development/619-working-with-phpthumb/
