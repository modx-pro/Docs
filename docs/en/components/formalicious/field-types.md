# Field types

Forms are made of fields, each with a type. Formalicious supports 8 built-in field types:

- Checkboxes
- Email
- File
- Number
- Radio
- Select (dropdown)
- Text
- Textarea

Each type has its own output chunk in the Formalicious category in the element tree. Chunks are optimized for [Bootstrap](http://getbootstrap.com).

You can edit the chunks, but we recommend copying them first, because Formalicious overwrites its chunks on update.

## Creating a custom field type

You can add your own field types.

### Step 1: Create a new type

Create a new type and set **Name** and **Display chunk**. If the type can have options (e.g. checkboxes, radio), enable that and set **Values chunk**.

The **Validators** field uses [FormIt validators](https://docs.modx.com/extras/revo/formit/formit.validators).

Example: type "Special email" with chunk "specialEmailTpl":

![Create a new type](https://file.modx.pro/files/d/7/a/d7ae1dc71e9b71a1a03521d584571b80.png)

### Step 2: Create the display chunk

Create the chunk you set (e.g. `specialEmailTpl`). It's a normal FormIt chunk; see [FormIt documentation](https://docs.modx.com/extras/revo/formit/formit.tutorials-and-examples/) for options.

Example chunk (copy of `emailTpl`):

![Create the display chunk](https://file.modx.pro/files/4/6/7/46728999a4efeff2b6d556cf643cc8cc.png)

**That's it — the new type is ready.**

![New type ready](https://file.modx.pro/files/8/2/1/8214b0b96a62c7421e1df59477accbed.png)
