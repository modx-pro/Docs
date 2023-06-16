---
author: alexsoin
---

# Перенос директории разработки

Разберём на примере, как перенести контроллеры, плагины, сниппеты и шаблоны `zoomx` в папку `core/elements/zoomx/`.

## Добавление кастомных контроллеров

В папке `core/config/` создаём файл `elements.php` и добавляем в него следующий код:

::: code-group

```php [elements.php]
<?php
zoomx()->getLoader()->addPsr4('App\\Controllers\\', MODX_CORE_PATH . 'elements/zoomx/controllers/');
```

:::

Для примера добавим новый контроллер `HelloController`.

В папке `core/elements/zoomx/controllers/` создаём файл `HelloController.php`, добавляем в него код:

::: code-group

```php [HelloController.php]
<?php
namespace App\Controllers;
use Zoomx\Controllers;

class HelloController extends \Zoomx\Controllers\Controller {
  public function hello() {
    zoomx()->autoloadResource(false);

    $site_name = $this->modx->getObject('modSystemSetting', ['key' => 'site_name']);
    return "hello {$site_name->get('value')}!";
  }
}
```

:::

Открываем файл `core/config/routes.php` и добавляем обработку роутера:

::: code-group

```php [router.php]
// ---
$router->get('api/test', ['\App\Controllers\HelloController', 'hello']);
// ---
```

:::

Теперь открыв сайт по адресу `https://site_name/api/test` получим ответ от сервера.

## Перенос папки плагинов, сниппетов и шаблонов

В директории `core/elements/zoomx/` создаём папки `templates`, `snippets`, `plugins`.

Копируем содержимое папки `core/components/zoomx/templates/` в папку `core/elements/zoomx/templates/`.

Открываем системные настройки в панели управления сайтом и изменяем значения ключей:

| Ключ                             | Значение                               |
|----------------------------------|----------------------------------------|
| `zoomx_file_snippets_path`       | `{core_path}elements/zoomx/snippets/`  |
| `zoomx_smarty_custom_plugin_dir` | `{core_path}elements/zoomx/plugins/`   |
| `zoomx_template_dir`             | `{core_path}elements/zoomx/templates/` |
