---
title: customExtra
description: Custom table in the MODX Manager
logo: https://modstore.pro/assets/extras/customextra/logo-lg.png
author: ilyautkin
modstore: https://modstore.pro/packages/utilities/customextra
---
# customExtra

Component that adds a configurable table to the MODX Manager. Designed to simplify developer workflows.

After installation, a new section appears in the Manager with a table of custom objects.

## Main features

All component settings are in **System settings**.

First setting — **Show tabs**. Here you choose which tabs to show. The component has 5 tabs, differing only by name: Items, Orders, Operations, Media, Links.

To show all tabs, use: `item,order,operation,media,link`.

Tabs appear in the Manager in the order given in this list, so you can reorder them by changing the setting.

Each tab is a separate table with its own settings. Each object (item, order, etc.) has ID, name, description, and an active flag.

Besides these, you can add extra fields per tab in system settings. For example, add two number fields and one text area to Orders, and a single text field to Links.

Objects can be created from a snippet or plugin:

```php
<?php
$modx->addPackage(
    "customextra",
    $modx->getOption("core_path") . "components/customextra/model/"
);
$request = $modx->newObject("customExtraOperation");
$request->set("name", $_POST["name"]);
$request->set("string1", $_POST["contact"]);
$request->set("description", $_POST["text"]);
$request->save();
return true;
```

The new object will appear in the table. You can edit objects the same way.

Output with pdoTools:

```modx
[[pdoResources?
  &class=`customExtraMedia`
  &loadModels=`customextra`
  &sortby=`id`
  &tpl=`tpl.media`
]]
```

## Extra features

Besides number fields, text fields, and text areas, objects can have up to six checkboxes. In the corresponding setting you choose which checkboxes are available for which object types.

Checkbox list: **active,published,paid,new,hit,favorite**

Two are enabled by default: Active (active) and Published (published).

You can filter objects by these checkboxes (and any other fields) when outputting on the frontend:

```modx
[[pdoResources?
  &class=`customExtraItem`
  &loadModels=`customextra`
  &sortby=`id`
  &where=`{"active":1}`
  &tpl=`tpl.items`
]]
```

## Bulk operations — advanced

For each object type you can set a snippet for an extra button. The button appears if a snippet with the given name exists.

When the button is clicked, the snippet runs. To process many objects without timeouts, process in batches: return **false** from the snippet to tell the component to run it again; return **true** when done.

Example: clear the "New" checkbox on all orders:

```php
<?php
$modx->addPackage(
    "customextra",
    $modx->getOption("core_path") . "components/customextra/model/"
);
$step = 5;
$q = $modx->newQuery("customExtraOrder", ["new" => 1]);
$count = $modx->getCount("customExtraOrder", $q);
if ($count == 0) {
  return true;
}
$q->limit($step);
$orders = $modx->getCollection("customExtraOrder", $q);
foreach ($orders as $order) {
  $order->set("new", 0);
  $order->save();
}
if ($count <= $step) {
  return true;
} else {
  return false;
}
```

The component will run the snippet repeatedly until it returns **true**, avoiding timeouts.
