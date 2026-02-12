---
author: alexsoin
---

# Changing the database table prefix

::: info
To run the code use the [console](https://extras.modx.com/package/console) or [modalConsole](https://modstore.pro/packages/utilities/modalconsole) extra.
:::

Script to rename MODX table prefixes:

```php
<?php
ini_set("max_execution_time", 0);
ignore_user_abort(true);
$current_prefix = $modx->config['table_prefix'];
function randPrefix($size) {
  $chars = "qazxswedcvfrtgbnhyujmkiolp1234567890QAZXSWEDCVFRTGBNHYUJMKIOLP";
  $out_prefix = null;
  while($size--) $out_prefix .= $chars[rand(0, StrLen($chars) - 1)];
  return $out_prefix;
}

// $new_prefix = 'newmodxprefix_'; // Set your prefix // [!code --]
$new_prefix = randPrefix(12) . '_';  // or use a random one // [!code ++]

$stmt = $modx->query("SHOW TABLES");
$tables = $stmt->fetchAll(PDO::FETCH_NUM);
$stmt->closeCursor();
foreach ($tables as $table) {
  $table = reset($table);
  $preg = "/^{$current_prefix}/u";

  if (preg_match($preg, $table)) {
    $new_table_name = preg_replace($preg, $new_prefix, $table);
    $sql = "RENAME TABLE `{$table}` TO `{$new_table_name}`";
    if ($s = $modx->prepare($sql)) {
      $s->execute();
    }
  }
}
echo "\nPrefix updated! New table prefix: " . $new_prefix;
```
