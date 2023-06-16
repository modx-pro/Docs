---
author: alexsoin
head:
  - - link
    - rel: canonical
      href: https://zencod.ru/gists/modx-plugin-template-list/
---

# Скрипт изменения адреса панели управления

::: info
Для запуска кода используем дополнение [console](https://extras.modx.com/package/console) или [modalConsole](https://modstore.pro/packages/utilities/modalconsole)
:::

```php
<?php
$newNameManager = "panel"; // Заменить 'panel' на своё название // [!code warning]

$managerPath = $modx->getOption("manager_path");
$basePath = $modx->getOption("base_path");
$corePath = $modx->getOption("core_path");
$itemsRoot = scandir($basePath);
$managerUri = str_replace($basePath, "", $managerPath);
$managerUriNew = "$newNameManager/";
$configFilePath = $corePath."config/config.inc.php";
$managerPathNew = str_replace($managerUri, $managerUriNew, $managerPath);

if (in_array($newNameManager, $itemsRoot)) {
  die("Нельзя переименовать панель управления. Данная директория занята.");
}

if (!file_exists($configFilePath)) {
  die("Файл конфига не найден");
}

if (!is_dir($managerPath)) {
  die("Не найдена папка панели управления");
}

$configFileContent = file_get_contents($configFilePath);
$configFileContentNew = str_replace($managerUri, $managerUriNew, $configFileContent);

file_put_contents($configFilePath, $configFileContentNew);

echo ("Конфиг успешно изменен\n");

if (rename($managerPath, $managerPathNew)) {
  echo("Папка успешно переименована\n");
} else {
  echo("Не удалось переименовать папку\n");
}

$modx->cacheManager->refresh();
$modx->cacheManager->clearCache();

echo("\n=== Расположение папки панели управления успешно изменено ===\n");
```

Изменяем значение в переменной `$newNameManager` с `panel` на необходимое название, по которому будет доступна панель управления, и запускаем код.

После окончания переименовывания видим сообщение о успешном изменении и теперь панель управления доступна по новому адресу.
