# Example: Working with Widgets

When building a site you often need to make small changes: add or remove elements on a page. Here we show how to do this in the **handyShop** theme based on MagicThemes (and similarly in mtBlog).

Typical cases: the site is ready but social links are not set up yet, or you want to see how social icons would look in the header vs footer.

- You can.

![example](https://file.modx.pro/files/a/d/d/adddb60e722eeb2c6973e7bb7a60b326.jpg)

## Fill in data in settings

First you need a list of social network links. For this example we use three: VK, OK, Telegram. Go to theme settings, open the **Contacts and data** tab.

![](https://file.modx.pro/files/0/7/d/07d79192f9abf4d18de2ea1ec844ec78.png)

Next to **Social networks** click the edit icon (blue with pencil). The settings edit window opens. The theme already has a field for output. A few notes:

- **Data type** – MIGX. For this type you can choose a media source and a MIGX config. Here that is social networks.
- Only one level of nesting is supported.

To add data, click the green **Add** button and fill the new row. Click it 3 times and choose which networks to fill:

![](https://file.modx.pro/files/f/3/8/f38325c4146d3c200aa47595614f2c90.png)

Fill the fields, then click **Update**. The table updates but is not saved yet. You can edit other tabs; when done, click **Save changes**. All changed fields are sent to the server and saved.

Saving is not immediate on purpose, to avoid accidental loss (e.g. closing the window or wrong data).

Now we need to decide where to show these icons.

## Choose areas and cells for insert/edit; change Widgets

Example: show social icons instead of phones, and show one phone on the left (where opening hours are, desktop only):

![](https://file.modx.pro/files/b/d/1/bd137a26a43bc296d1a7ace58942ea10.png)

Check areas and cells in the admin:

![](https://file.modx.pro/files/e/0/a/e0a870b882d84ccf4972ca606ec37ce2.png)

There are two cells: **header-top1** and **header-top2**. Plan:

1. In **header-top2** replace the contacts widget with the social networks widget.
2. In **header-top1** add a phone via a widget. Go to **Packages → MagicThemes → Widgets**, filter by position **header-top2**, click Edit.

    ![](https://file.modx.pro/files/1/a/b/1ab5bbf8a6b277b6fdad69e974cf4b19.png)

    Only change **Path–Value**. In **Path** choose the widget set folder; in **Value** choose the widget. The theme includes a social networks widget. Select it:

    ![](https://file.modx.pro/files/6/a/f/6affea77bb2dfeb7c50be9ede3c76e84.png)

> When you change a widget's Value, the previous widget's parameters remain. Many widgets share parameter names. You can revert the Value or keep some parameters.
> **If you create a new Widget, only its parameters are shown.**

Remove the old parameters with the red button if you do not need them.

![](https://file.modx.pro/files/4/0/a/40a8dcb48235a5f6fb940596ed864c01.png)

The **Snippet** tab is empty (this widget only uses theme settings). On **General** we only need **Styling**: 3 icon styles – Normal, in a square, in a circle. For a compact header choose **Normal**. Leave the title empty so it is not shown.

Open the **Styling** tab. Icon size is controlled by a multiplier (0 or 1 = default). You can set icon color. If color is empty, icons use their brand colors:

![](https://file.modx.pro/files/2/6/6/266fc717b1bfc68f5e6c4da0cca1e285.png)

If you set a color, all icons use it. We'll use white and set a hover color for visibility.

![](https://file.modx.pro/files/a/2/9/a298e5896c47c0901ef6a64aeed51810.png)

Below you can set margin for this widget (useful when several widgets share a cell). Click **Update**. Data is saved immediately. Clear cache if needed and check the site:

![](https://file.modx.pro/files/2/a/7/2a79c121f6b0c0511837903256f3dbea.png)

Now the phones. Edit the widget for **header-top1**, open **General**, add **Phone**.

![](https://file.modx.pro/files/0/b/7/0b7c9c4c44f735dee73fb0a1962717af.png)

You can reorder items by removing and re-adding. Set **Number of phones** to 1 to show only the first. Leave styling as is. Check the result on the site.

![](https://file.modx.pro/files/1/9/4/1940a1ad965067816c5accb04472a4e8.png)

In this way you can add, change, and remove data and layout. For example, with a framed style for social icons:

![](https://file.modx.pro/files/8/2/5/82597d4173a991e43f3d3859a9a46866.png)

You can adjust widgets in small steps without touching code.
