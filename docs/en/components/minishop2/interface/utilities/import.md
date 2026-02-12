# Import

**Available since version 4.2.2.**

Interface for the *reworked built-in* import script (built-in since **2.1.4**).
Imports new products into the catalog or updates existing ones from a **CSV** file.

- Uses processors for importing resources and images.
- Can update resources by a key field.
- Supports TV parameters and product fields, including JSON types like size and color.
- Debug mode: process only the first row.

[![miniShop2 product import interface](https://file.modx.pro/files/7/e/2/7e2921a4ffdf3e8d3ba6f0114f502dd6.png)](https://file.modx.pro/files/7/e/2/7e2921a4ffdf3e8d3ba6f0114f502dd6.png)

## Settings

1. **Import file** (only CSV is supported)
2. **Import fields**, comma-separated

    ::: info
    Field **parent** is required
    :::

    You can save fields to system settings via the icon next to the field.

    ::: warning
    System settings are cached; clear the cache to use previously saved settings.
    :::

    If you do not need to save, you can leave the cache as is.

    **You can use not only resource fields but also:**

    - Product property arrays: `size,size,size,color,color`.
    - Gallery images: `gallery,gallery,gallery`.
    - TV parameters (word "tv" + parameter id): `tv1,tv2,tv3`.

3. **Column delimiter in file**. Can be saved for reuse.
4. **Update products** — when enabled, a field appears for the unique key used to update existing products.
5. **Debug mode** — stop after the first row.
6. **Use scheduler** — requires [Scheduler](https://modstore.pro/packages/utilities/scheduler).
7. **Skip first row (header)**

::: tip
For large files, use the scheduler; browser execution is limited by server settings (often 30 seconds).
:::
