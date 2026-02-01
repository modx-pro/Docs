## Background jobs

For running background tasks

## CLI

```shell
# Image upload job
/usr/local/bin/php /var/www/html/core/components/idimage/cli/upload.php

# Indexing job
/usr/local/bin/php /var/www/html/core/components/idimage/cli/indexed.php

# Product creation and new image checks
/usr/local/bin/php /var/www/html/core/components/idimage/cli/creation.php
```

### Commands

Use from other code:

```php
# Load the library
$idImage = $modx->getService('idimage', 'idImage', MODX_CORE_PATH.'components/idimage/model/');

# Create products
$Command = new \IdImage\Command\CreationCommand($idImage, $cli);
$Command->run();

# Upload images and get vectors
$Command = new UploadCommand($idImage, $cli);
$Command->run();

# Index products
$command = new \IdImage\Command\IndexedCommand($idImage, $cli, 100);
$command->run();
```
