**ms2Gallery** can show images right at the time of a resource page generation, without help of any snippets. 

You just have to activate systen setting **ms2gallery_set_placeholders** and you can use the following placeholders in the content:

* `[[+ms2g.0]]` - printed array with all data of the resource's first image. The second image will be `[[+ms2g.1]]`
* `[[+ms2g.0.url]]` - link to the original image
* `[[+ms2g.0.small]]` - link to one preview
* `[[+ms2g.0.medium]]` - link to another preview
* `[[+ms2g.0.name]]` - the name of the image
* etc..

Obviously, selection of all images generates additional requests to the database, that is why it is by default turned off.

## Settings

The first setting indicates the look, the other two are for the economy of resources.

### ms2gallery_placeholders_tpl

The name of TV parameter or chunk for making placeholder `[[+ms2g.0]]`, the content of which will be used for the image. For example:
```
<a href="[[+url]]">
    <img src="[[+120x90]]" />
</a>
```
The work logic is as follows:

1. If the output of placeholders is on and setting **ms2gallery_placeholders_tpl** is not empty,
2. We check if a TV with the indicated name is attached to the current resource.
3. If it is not, we look for a chunk with a name like that 
4. If we get an unempty TV or chunk, we use its content for making placeholders on the page.
5. Otherwise we get what we already have, a printed array with all the properties.

You can write texts on your site adding tags like `[[+ms2g.1]]` or `[[+ms2g.25]]`. 
Taking into consideration that placeholders are pasted not by **id**,but by **rank**, you can easily change the order of images output on the page by just dragging them in the gallery.

As for the look of the pictures for output, it can be indicated either in this resource's TV or in the TV's settings by default, or in a chunk that is common for all.

### ms2gallery_placeholders_for_templates

List of templates' ids with commas, for which the function of putting out placeholders should be turned on. 
The setting is empty by default, that is why placeholders are put out for all.

### ms2gallery_placeholders_thumbs

List of image previews that are to be chosen to be shown on the page. 
By default it is also empty, and chosen are all the previews. But you can indicate something like "medium,small" and do without unnecessary requests to the database. 
