---
title: ReachGoal
description: Manage goals (Yandex, Google) from the Manager
logo: https://modstore.pro/assets/extras/reachgoal/logo-lg.png
author: tventos
modstore: https://modstore.pro/packages/ecommerce/reachgoal
repository: https://github.com/tventos/modx-reachgoal
---
# ReachGoal

**ReachGoal** — Configure and manage goals for **Yandex.Metrika**, **Google Analytics**, and **Google Tag Manager** from the Manager.

![ReachGoal](https://file.modx.pro/files/b/d/c/bdc375985bd23943731129ed3b337b57.png)

The component lets you manage goals from the Manager. Goals can be added for events such as:

- Add to cart
- Remove from cart
- Checkout
- Form submit via AjaxForm (by form id)

## Usage example

Go to the **ReachGoal** component and click **Add**.

### Adding a Yandex.Metrika goal for checkout

Select event **Add to cart** and service **Yandex.Metrika**, enter the goal name, and optionally **Counter ID** (can be left empty if `reachgoal_yacounter_default` is set; see **Settings**).

![Adding Yandex.Metrika goal for checkout](https://file.modx.pro/files/3/0/3/3036389349861e3bcfd86f4d296c8bcb.png)

### Adding a Global Site Tag goal for form submit (AjaxForm)

Select event **Form submit (AjaxForm)** and service **Global Site Tag**, fill in the form `id`, Action, and Category (optional).

![Adding Global Site Tag goal for form submit - 1](https://file.modx.pro/files/0/8/b/08b1fb694ad2bcceaae9ee6a29fcf815.png)

Result:

![Adding Global Site Tag goal for form submit - 2](https://file.modx.pro/files/7/e/c/7eca53a10577657148fff74f2fd0ca3a.png)

## Component settings

`reachgoal_yacounter_default` — Default counter ID (Yandex.Metrika only)
