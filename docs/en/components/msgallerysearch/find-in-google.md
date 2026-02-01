# Find in Google

This button opens a window to search images via Google Images and download them directly into minishop2 or ms2Gallery.

Search works only after you set the API key and Search Engine ID.

Limit: **maximum 100 requests per day**.

::: info
So once per day you can send 100 requests (1 request = 10 images).
:::

Google has a paid tier [\$5 per 1000 requests](https://developers.google.com/custom-search/v1/overview)—1000 requests in total, not per day or month.

In action (GIF)

![](https://file.modx.pro/files/b/9/0/b9084bbfa4b72c4ffce1ba5c47029112s.jpg)

::: warning
Google caches images on their servers, so actual results may differ. Images may also be removed, changed, or the server/domain may be unavailable.
:::

## Bulk download

For bulk download use [[Shift]] or [[Ctrl]], then right-click and download.

![](https://file.modx.pro/files/c/5/d/c5d820c7ca62135b0b58c6b981cd8942.png)

## Setup and getting API key and Search Engine ID

You need an API key and Search Engine ID to use the service.

Get the [key here](https://developers.google.com/custom-search/v1/overview) by clicking "GET API KEY":

![](https://file.modx.pro/files/f/7/9/f799bc9b3d50526e8d25308dc7ebcac2.png)

## Creating a custom search engine

Go [here](https://cse.google.com/cse/all) and click Add.

![](https://file.modx.pro/files/e/5/6/e56bbf262943fd643ef7935bed4002c0.png)

Enter the site name, choose language and click **Create**.

![](https://file.modx.pro/files/1/5/4/154fd2f2d2394342c6dc71e77b1d151cs.jpg)

Open the control panel.

![](https://file.modx.pro/files/b/6/0/b602bc9c5708ecd6a3b9b4f235061cads.jpg)

Configure:

- Enable image search
- Enable search the entire web
- Remove sites (if any)
- Copy the Search Engine ID

![](https://file.modx.pro/files/a/4/f/a4fd801f1003a2fc9c0f63d80b8217c3.png)

## System settings

- **msgallerysearch_api_cs** — Search Engine ID
- **msgallerysearch_api_key** — API key from [this page](https://developers.google.com/custom-search/v1/overview)

![](https://file.modx.pro/files/c/d/5/cd58a02124eb2e909d7dca612158002as.jpg)

Requests are cached so repeated calls return the same result and use fewer quota requests.
