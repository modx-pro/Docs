## Product indexing

To get similar products, do the following:

* Create products with images
* Run vectorization and indexing

### Options and settings
* [Indexing types](/en/components/idimage/indexed/type)
* [Category settings](/en/components/idimage/indexed/category)

### 1. Creating products

Go to **Packages → ID image → Products** and click **Create products**.

![Creating products](https://file.modx.pro/files/f/9/1/f913d8f210e5408854ae321fec346c07.png)

*The creation process will start. Wait for it to finish.*

![Creation process](https://file.modx.pro/files/d/d/3/dd37a1f018357036fe373438a00930f7.png)

When it finishes, the list will show products ready for vectorization and indexing.

![Product list for indexing](https://file.modx.pro/files/0/3/f/03f38272a8d832d9b71dcb317901118b.png)

### 2. Getting vectors

In **Actions** choose **Upload images**. A list of jobs will be created to send to idimage.ru.

![Image upload](https://file.modx.pro/files/d/c/e/dce673b28847fb2a37b86394b6e17a55.png)

*After the upload jobs are created you will be asked to run the queue. Click **Yes**.*

![Sending images](https://file.modx.pro/files/0/2/d/02de950a547965552816dc8949d873ad.png)

Wait for the upload to complete; do not close the window.

::: warning Important

* Getting vectors can take a long time. Each run processes 20 images.
* Run time depends on your connection and idimage.ru load; a single request can take 1 second or more.
:::

### 3. Indexing products

In **Actions** choose **Index products**. A list of indexing jobs will be created.

![Product indexing](https://file.modx.pro/files/e/9/9/e9907ff791dc0ee2d78023866b52495e.png)

*After the jobs are created you will be asked to run the queue for similar products. Confirm, or run the queue later on the **Jobs** tab.*

::: warning Important

* Ensure all images have vectors.
* Indexing can take a long time depending on product count and server. More products means a longer run.
:::

### 4. Placing the snippet on the page

**MiniShop2** includes **[msProducts](/en/components/minishop2/snippets/msproducts#msproducts)** for listing products; we use it in the example.

#### Step 1: Add code to the product card template

Add this to the product card template:

```fenom
{var $ids = $modx->runSnippet('idImageSimilar', [
    'pid' => $modx->resource->id,
    'min_scope' => 65,
    'limit' => 4
])}

{if $ids}
    {$modx->runSnippet('msProducts', [
        'resources' => $ids,
        'sortby' => "FIELD(msProduct.id, {$ids})",
        'parents' => 0,
    ])}
{/if}
```

## Jobs

Jobs are used for indexing and vectorization. You can run the queue manually or set up [background execution](/en/components/idimage/crontab).

![Jobs](https://file.modx.pro/files/e/4/0/e404e2125513ec70bd193c734e881a56.png)
