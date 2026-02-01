# TV parameters (Additional fields)

This menu manages TV parameters with bulk value operations.
E.g. add an image to all selected resources at once.

The handler loads based on the selected field.
If you choose a field with input type "Single list", that input loads.

![TV parameters](https://file.modx.pro/files/6/6/a/66aae7966b5973d0a8667887bb21fa48.png)

::: warning
The component works only with base TV input types (Additional fields) added on install. Others won't appear in the field list.
:::

## Menu

Select resources and choose one of:

- Set values
- Replace value
- Delete value

![Menu](https://file.modx.pro/files/1/f/2/1f234a62afa567ec866c050768a30569.png)

## Field selection

After choosing an action, a modal opens to select the field. The input handler loads based on the field.

![Field selection](https://file.modx.pro/files/9/b/e/9be199d7fc8c78d44e7b82dedcb755da.png)

If a field doesn't appear, it may not have template access. Select **Show all TV parameters** to list all fields.

### Binding TV parameter to template

If you click **Select** and the TV doesn't have template access, you'll be prompted to grant it.

![Binding TV parameter to template](https://file.modx.pro/files/1/a/6/1a6bd3808a6c94cbe5ada84362c0129c.png)

## Set/Replace/Delete

**New value** accepts values for the selected input type.

![Set/Replace/Delete](https://file.modx.pro/files/c/e/b/ceb88379897b3ecbe1838bbdcce9c095.png)

If you selected resources with different templates and some don't have access to the chosen TV parameter, check **Skip different templates**.
This skips entering values for resources whose template differs from the selected one.

![Set/Replace/Delete](https://file.modx.pro/files/8/0/7/807beb2bb4e9f03d2406904318ff08b8.png)
