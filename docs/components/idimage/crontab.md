## Фоновые задания

Для выполнения фоновых заданий

## CLI

```shell
# Задания для загрузки изображения
/usr/local/bin/php /var/www/html/core/components/idimage/cli/upload.php

# Задания для индексации
/usr/local/bin/php /var/www/html/core/components/idimage/cli/indexed.php

# Создание товаров и проверка новых изображений
/usr/local/bin/php /var/www/html/core/components/idimage/cli/creation.php
```

### Команды

Использование в сторонних решениях

```php

# Подключение библиотеки
$idImage = $modx->getService('idimage', 'idImage', MODX_CORE_PATH.'components/idimage/model/');


# Создание товаров
$Command = new \IdImage\Command\CreationCommand($idImage, $cli);
$Command->run();

# Загрузка изображение и получение векторов
$Command = new UploadCommand($idImage, $cli);
$Command->run();

# Индексация товаров
$command = new \IdImage\Command\IndexedCommand($idImage, $cli, 100);
$command->run();

```
