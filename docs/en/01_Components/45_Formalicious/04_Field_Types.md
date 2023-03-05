A form consists of fields. These fields can be categorised by type. Formalicious is shipped with the most common field-types by default:

* Checkboxes
* Email
* File
* Number
* Radiobuttons
* Select
* Text
* Textarea

All these types have a **Chunk** associated with them. These can be found in the Elements-tree, below the Formalicious-category.
These chunks are optimised for [Bootstrap][1]

All the required fields are implemented in Formalicious, but you can change these chunks to match your needs.
**It is recommended to duplicate and rename a field before changing it**, because an update of Formalicious will override the original chunks.

## Creating your own field type
All the fields necessary area available by default, but we offer creative freedom here. You can create your own types with your own chunks.

### Step 1: Create the type
Create your type and enter a **Name** and **Tpl**. The **Value Tpl** field is only to determine your options for checkbox and radiobutton fields.

The **Validation** field can be used to use [FormIt validators][2].

In the example below we create a field called "Special email", with the template "specialEmailTpl":

[![](https://file.modx.pro/files/d/7/a/d7ae1dc71e9b71a1a03521d584571b80s.jpg)](https://file.modx.pro/files/d/7/a/d7ae1dc71e9b71a1a03521d584571b80.png)


### Step 2: Create the associated chunk
We specified the chunk called "specialEmailTpl". This chunk is a regular FormIt-chunk.
Please check the [FormIt tutorials][3] for all your options.

Below is an example of our "Special email Tpl" (copy of emailTpl):

[![](https://file.modx.pro/files/4/6/7/46728999a4efeff2b6d556cf643cc8ccs.jpg)](https://file.modx.pro/files/4/6/7/46728999a4efeff2b6d556cf643cc8cc.png)

**And that's it, you're all set!**

[![](https://file.modx.pro/files/8/2/1/8214b0b96a62c7421e1df59477accbeds.jpg)](https://file.modx.pro/files/8/2/1/8214b0b96a62c7421e1df59477accbed.png)


[1]: http://getbootstrap.com
[2]: https://docs.modx.com/extras/revo/formit/formit.validators
[3]: https://docs.modx.com/extras/revo/formit/formit.tutorials-and-examples/