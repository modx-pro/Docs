Installing Formalicious requires the free Extra **FormIt** to function properly.
FormIt is also maintained by Sterc and thus, should guarantee maximum compatibility between FormIt and Formalicious.

The MODX installer should install this automatically when installing Formalicious from a repository.

A custom manager page called **Formalicious** is installed within the **Extras** menu.
Also a Template Variable and Element Category named **Formalicious** are created.
The **Template Variable** should be assigned to all the templates you wish to use Formalicious forms on and a Snippet should be added to those templates.

To accomplish this, follow these steps:
1. Click the **formalicious** TV
2. Click **Template Access**
3. Enable the checkmarks for the templates on which you want to use Formalicious-forms
4. Save your changes
5. Go to every template you just enabled
6. In the field **Template code (HTML)**, add the following Snippet-call at the location where you want to show your forms: `[[!renderForm? &form=`[[*formalicious]]`]]`.
We recommend to add it just below the `[[*content]]` placeholder, because it enables your content-managers to add text above the form.
7. An alternative would be to create a chunk called **form** where you add the above Snippet-call.
Instruct your content-managers to add the chunk-code `[[$form]]`
anywhere they want, so they have more flexibility regarding the location of their forms, e.g. in-between two paragraphs.
8. Save your changes

## Inserting a form with ContentBlocks

If you also use [ContentBlocks][1], you can use a field to select a form to insert as well,
instead of needing the template variable and form code in your template.
This gives your content editors more control over what form is inserted at what position.

Formalicious will add its custom input type during installation.
At Extras > ContentBlocks, create a new field using the "Formalicious Form Selector" input type and customise the template as needed.


[1]: https://www.modmore.com/contentblocks/