# miniShop2 options

This menu manages options created in miniShop2 settings.

## Menu

Select products and choose one of:

- Set values
- Replace value
- Delete value

![Menu](https://file.modx.pro/files/8/d/6/8d615eb1b3d4d7204c6036e9c5c8811c.png)

::: warning
The component works only with base option types that were added on install. Others won't appear in the field list.
:::

## Field selection

After choosing an action, a modal opens to select the field. The input handler loads based on the field.

![Field selection](https://file.modx.pro/files/5/7/3/57310abfc61f6cbd0650afa4d9d10e8b.png)

If a field doesn't appear, it may not be bound to a category. Select **Show all options** to list all fields.

## Binding option to category

If you click **Select** and the option isn't bound to a category, you'll be prompted to bind it.

![Binding option to category](https://file.modx.pro/files/f/4/1/f41ad25f71cfb5a467cb5581ba830ba7.png)

## Set/Replace/Delete

**New value** accepts values for the selected option type.

![Set/Replace/Delete](https://file.modx.pro/files/1/9/8/19830859d17b06798e6693a4e988254d.png)

If you selected products from different categories and some category doesn't have the option bound, check **Skip unbound category messages**.
This skips entering values for products you accidentally selected.

![Set/Replace/Delete](https://file.modx.pro/files/3/1/2/3129eff35aba7449f9ac003d7f0ede1c.png)

## Replace

You can choose from values already in the selected products. This avoids long lists.
E.g. if you have value **Exclusive**, select it and enter the replacement value.
All products with **Exclusive** will be updated.

::: danger
The Delete value field type depends on the selected option type for the field.

![Replace](https://file.modx.pro/files/1/5/b/15bf0fcd3aad05588e4532d2c0323903.png)
:::

### Delete

Finds all matches in selected product options and deletes them.

::: danger
The Delete value field type depends on the selected option type for the field.
:::

![Delete](https://file.modx.pro/files/3/8/1/381ca9d7690165f1ef6a3536fd21cd2e.png)
