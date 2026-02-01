## Quick start

After installing the component, a new menu item appears in the Manager: **Packages → ID image**.

### 1. Getting the token

1. Go to the [ID Image account](https://idimage.ru/account/).
2. Copy the token shown in your account.

![Getting the token in ID Image account](https://file.modx.pro/files/c/2/a/c2a4b5fcf827aea4687e75d4390b2b39.png)

### 2. Entering the token in settings

1. Open the component page in the Manager.
2. Go to the **Settings** tab.
3. Paste the token you copied into the field.
4. Save.

![Settings](https://file.modx.pro/files/6/b/3/6b3e559af9c0ba205a29b83bfd2ee0dc.png)

### 3. Balance check

1. In **System information** ensure all checks passed.
2. Request the current request balance to verify the token is set correctly.

![Balance check](https://file.modx.pro/files/8/d/1/8d112cfd4e738b6c1b35865281513d17.png)

::: warning Important
Your request balance at [idimage.ru](https://idimage.ru) must be positive.
:::

## 4 Product indexing

Follow the instructions for [product indexing](/en/components/idimage/indexed/index).

## 5 Placing the snippet

Place the snippet in the product card template or anywhere else:

::: code-group

```modx
[[!idImageSimilar]]
[[!msProducts?
    &resources=`[[+idimage.ids]]`
    &sortby=`FIELD(msProduct.id, [[+idimage.ids]])`
    &tpl=`@FILE chunks/catalog/product.row.tpl`
    &parents=`0`
]]
```

```fenom
{$modx->runSnippet('idImageSimilar', [
    'min_scope' => 65
])}

{var $ids = $modx->getPlaceholder('idimage.ids')}
{if  $ids}
  {$modx->runSnippet('msProducts', [
      'tpl' => '@FILE chunks/catalog/product.row.tpl',
      'resources' => $ids,
      'sortby' => "FIELD(msProduct.id, {$ids})",
      'parents' => 0,
  ])}
{/if}
```

:::

The page will show products ordered by similarity.

**Example similar products block**

::: warning Important
The **idImageSimilar** snippet only returns product IDs; it does not control how products are displayed.
:::

#### Example product display on the site

This is just one possible result:

![similar products example](https://file.modx.pro/files/9/1/3/913a2f5aa8f4b5d0808f0b9b2c992372.png)
