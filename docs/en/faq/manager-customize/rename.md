---
author: alexsoin
head:
  - - link
    - rel: canonical
      href: https://zencod.ru/gists/modx-plugin-template-list/
---

# Script to change Manager URL

::: info
To run the code use the [console](https://extras.modx.com/package/console) or [modalConsole](https://modstore.pro/packages/utilities/modalconsole) extra.
:::

```php
<?php
$newNameManager = "panel"; // Replace 'panel' with your name // [!code warning]

$managerPath = $modx->getOption("manager_path");
$basePath = $modx->getOption("base_path");
$corePath = $modx->getOption("core_path");
$itemsRoot = scandir($basePath);
$managerUri = str_replace($basePath, "", $managerPath);
$managerUriNew = "$newNameManager/";
$configFilePath = $corePath."config/config.inc.php";
$managerPathNew = str_replace($managerUri, $managerUriNew, $managerPath);

if (in_array($newNameManager, $itemsRoot)) {
  die("Cannot rename Manager. That directory is already in use.");
}

if (!file_exists($configFilePath)) {
  die("Config file not found");
}

if (!is_dir($managerPath)) {
  die("Manager folder not found");
}

$configFileContent = file_get_contents($configFilePath);
$configFileContentNew = str_replace($managerUri, $managerUriNew, $configFileContent);

file_put_contents($configFilePath, $configFileContentNew);

echo ("Config updated successfully\n");

if (rename($managerPath, $managerPathNew)) {
  echo("Folder renamed successfully\n");
} else {
  echo("Failed to rename folder\n");
}

$modx->cacheManager->refresh();
$modx->cacheManager->clearCache();

echo("\n=== Manager folder path updated successfully ===\n");
```

Set `$newNameManager` to the path segment you want for the Manager (e.g. `panel`), then run the code.

After it finishes you will see a success message and the Manager will be available at the new URL.
