---
title: msLiveInform
description: Track and verify MiniShop2 store orders via LiveInform
logo: https://modstore.pro/assets/extras/msliveinform/logo-lg.png
author: vgrish
modstore: https://modstore.pro/packages/delivery/msliveinform

dependencies: miniShop2
---

# msLiveInform

## Description

**msLiveInform** tracks MiniShop2 store orders via the [LiveInform][001] service.

![msLiveInform](https://file.modx.pro/files/0/4/6/046f774ad0906fa37732868978226c1b.png)

## Features

- Works only with **new miniShop2** (version =>2.4.0-beta2)
- Order tracking via [LiveInform][001]
- Snippet to output tracking info
- Check order client against LiveInform **blacklist** of unreliable clients

## Installation

- [Add our repository][002]
- Install **miniShop2** (the store used for orders and payment)
- Install **msLiveInform**

For testing you can use [our hosting][002]; these extras can be selected when creating a site.
After installation:

- Set the API key for [LiveInform][001]

## Configuration

All **msLiveInform** snippets use pdoTools and expect [Fenom][010103] in chunks. This allows:

- Fewer chunks
- Easier maintenance
- Better performance
- More complex chunks with Fenom conditionals

## Creating tracking

In the [MiniShop2][01020103] order edit window:

![Creating tracking - 1](https://file.modx.pro/files/8/d/7/8d75d9656092ad99601e10253d83639f.png)

Click **+** to create tracking. Fill in:

- tracking number
- client phone

![Creating tracking - 2](https://file.modx.pro/files/1/8/9/1895f4eec3345b16ce27b6c554d75a99.png)

Save. Tracking is synced with [LiveInform][001].
You can refresh tracking in the manager or via a cron script.

Example sync script in `core/components/msliveinform/cron/`.

By default `change_order_status` is on—order status can change when tracking status changes. You can map each tracking status to an order status.

On the **Tracking** tab you see current tracking movement:

![Creating tracking - 3](https://file.modx.pro/files/a/9/7/a97479501e859dba0f3ba3d160da45ff.png)

## Output tracking on the frontend

Snippet **msLiveInform.tracking** outputs tracking info.

![Output tracking on frontend](https://file.modx.pro/files/e/c/2/ec25ccb251ffc95245151986512c6fea.png)

### Parameters

| Parameter | Default               | Description                                                                 |
| --------- | --------------------- | --------------------------------------------------------------------------- |
| **order** |                       | Order ID. Use 0 for no limit.                                               |
| **tpl**   | `msLiveInform.tracking` | Output chunk                                                                |
| **limit** | `10`                  | Max results                                                                 |
| **sortby**  | `id`                | Sort field                                                                  |
| **sortdir** | `ASC`               | Sort direction                                                              |

::: tip
You can use other [pdoTools common parameters][0104]
:::

Example for a specific order:

```modx
[[!msLiveInform.tracking?
  &order=`2`
]]
```

To see all placeholders, omit the chunk:

```modx
<pre>
  [[!msLiveInform.tracking?
    &order=`2`
    &tpl=``
  ]]
</pre>
```

With pagination:

```modx
[[!pdoPage?
  &element=`msLiveInform.tracking`
]]
[[!+page.nav]]
```

## LiveInform order base check

You can check the order client by:

- Number of returns
- Number of delivered orders
- Total orders

![LiveInform order check - 1](https://file.modx.pro/files/c/f/8/cf8bbcbda0f39ae7e500c0254c0caa84.png)

![LiveInform order check - 2](https://file.modx.pro/files/9/f/3/9f30f7d46f18f5588eb7fd76f039a95d.png)

## msLiveInform settings

**System settings** > **msLiveInform**

- `api_id` — ID for LiveInform API requests
- `order_id_key` — MiniShop order ID key in LiveInform. Default "num"
- `change_order_status` — Allow changing order status when tracking status changes
- `order_status_2` — Order status ID for tracking status "Delivered"
- `order_status_3` — Order status ID for tracking status "Return"
- `delivery_service` — List of delivery services for tracking creation

Tracking statuses:

- 0 — In transit
- 1 — At pickup point
- 2 — Delivered
- 3 — Return

Map each to an order status. E.g. tracking "2 - Delivered" uses `order_status_2`.
For new LiveInform users, set message texts per delivery service in [Settings][00101].

Set `change_order_status` to "No" to disable order status changes from tracking.

## Callback setup

**LiveInform** can notify your server when tracking status changes. [Set the callback URL][00102] for notifications.

Example: `http://site.ru/assets/components/msliveinform/callback.php`.

[010103]: /en/components/pdotools/parser
[01020103]: /en/components/minishop2/interface/orders
[0104]: /en/components/pdotools/general-properties

[001]: https://liveinform.ru/?partner=166
[00101]: https://www.liveinform.ru/account/settings?partner=166
[00102]: https://liveinform.ru/account/integration/callback?partner=166
[002]: https://modhost.pro
