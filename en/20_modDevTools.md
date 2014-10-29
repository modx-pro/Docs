A component that helps developers faster and easier to work in the admin panel of MODX Revolution.

## Features

#### On the Chunk Update page following tabs in which you can edit linked objects are added:
* "Templates" - code of templates, **in which** the given chunk is called. If you installed Ace, you may receive an allocation of chunks in the template's code.
* "Chunks" - code of chunks, **which** are called in the given chunk. Snippets' parameters specified in the call and by default, and which are the chunks, also appear here.
* "Snippets" - code of snippets, **which** are called in the given chunk. Under the snippets' code you can expand the description of their default settings.
* "Resources" - list of resources in the template or the content of which is called this chunk by any way. You can go to the edit resource, open it in browser, quickly change the template, publication status, or delete to the recycle bin.

#### On the Template Update page the following tabs are added:
* "Chunks" - code of chunks, **which** are called in the template.
* "Snippets" - code of snippets, **which** are called in the template.
* "Resources" - list of resources with a given template.

#### On the Snippet Update page the "Resources" tab is added, where listed the resources in the template or the content of which a given snippet is called.

#### On Resource Update Page the so-called "Bread crumbs" (BreadCrumbs) are added.
They are made on the basis of ExtJS component of bread crumbs from the Package installer and fit well the General design of the admin panel, regardless of the version.

Also the bread crumbs are shown in the "Overview of the resource (it can be seen when clicking the right button on the resource in the tree, or simply not having permissions to edit a resource, but with a view). In this case, the system switches to the overview of the resource parent, and not editing it.

Supported contexts, i.e. in what context the resource is, in this context his parents are opened.

#### Search and replace strings in chunks and templates.
This displays subsection **modDevTools** in **Extras** menu. It's pretty simple. Enter the string and press the "Find" button. Below there are filters in the content of which elements to search.

After a search has occurred, the code of all found items is displayed with highlighting the desired line. Replacement shall be made in each element separately. To do this, after the code element is a panel with 3 buttons: "Replace", "Replace all" and "Skip".

The "Replace" button replaces the search string, where the cursor is positioned (darker highlighting), by the replacement string. The "Skip" button moves the cursor to the next match. After the initial search, you can change the search string, and then button replacement already operate with this new line only for a specific element, after which they are located.

## User rights to access the functions of modDevTools:
The component does not add itself, but uses standard user access permissions.

Rights | Description
--------------------|-------------------------------------------------------------------------------
*view_chunk* **&** *view_template* | For access to search and replace strings (modDevTools menu)
*save_chunk* | replace strings in chunks in this section.
*save_template* | For string substitution patterns in this section.
*view_chunk* | To display the "Chunks" tab
*view_template* | To display the "Templates" tab
*view_snippet* | To display the "Snippets" tab
*resource_tree* | To display the "Resources" tab
*edit_document* | To display an Edit button in the table on the "Resources" tab
*save_document* | To change the template resource in the table on the "Resources" tab
*publish_document* | To change the publication status in the table on the "Resources" tab
*delete_document* | To remove the resource to the recycle bin in the table on the "Resources" tab
*save_chunk/save_template/save_snippet* | Standard MODX processors are used, so to edit items you need the appropriate permissions.

***Attention:*** resource groups are no supported (yet?), i.e. if a resource group is hidden from the site managers in the mgr context, they will be able to see it in the list of resources.

## For more information:

* If the item shown in the new tabs is in focus and modified the hotkey **Ctrl-s** save this item, if it's not in focus so it saves the parent element (in this case changes in the child will be lost).
* The "Save" button at the parent element is inactive, if the child was in focus to prevent accidental preservation. Included switching to another tab.
* AjaxManager is supported
* Supported versions are: MODX Revolution 2.3.x (first of all) and 2.2.x (minimum support, only to have all worked and didn't look scary).
* Some minor features are supported only if the Ace editor is installed.