## Indexing type

Choose the indexing type on **Packages → Id image → Settings**.

![Indexing type](https://file.modx.pro/files/8/b/1/8b1f7a1e6028293d6a1331df3783acea.png)

### All products

Compare every product in the catalog with every other product.

### Within parent category

Only products in the same category as the original are compared.

### Within first-level category

Products in a **second-level** category are compared with all products in their **first-level** category.

**Example catalog structure:**  
**Catalog → First level → Second level**

So for products in **Second level**, comparison uses all products from their **First level** category.

::: warning Important
The more products in the catalog, the longer comparison takes.
:::

## How comparison works

Suppose the catalog has **1000** products with images.

During indexing each image is compared with 999 others. Total operations:

\[ 1000 \times 999 = 999\,000 \]

After that, the most similar images are selected and a list of product **ID** and similarity score is built.
