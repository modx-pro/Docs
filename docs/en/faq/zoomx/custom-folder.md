---
author: alexsoin
---

# Moving the development directory

This example shows how to move ZoomX controllers, plugins, snippets and templates into `core/elements/zoomx/`.

## Adding custom controllers

In `core/config/` create `elements.php` and add:

::: code-group

```php [elements.php]
<?php
zoomx()->getLoader()->addPsr4('App\\Controllers\\', MODX_CORE_PATH . 'elements/zoomx/controllers/');
```

:::

Add a new controller `HelloController` as an example.

In `core/elements/zoomx/controllers/` create `HelloController.php` with:

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

Open `core/config/routes.php` and add the route:

::: code-group

```php [router.php]
// ---
$router->get('api/test', ['\App\Controllers\HelloController', 'hello']);
// ---
```

:::

Opening `https://site_name/api/test` will then return the server response.

## Moving plugins, snippets and templates

In `core/elements/zoomx/` create folders `templates`, `snippets`, `plugins`.

Copy the contents of `core/components/zoomx/templates/` to `core/elements/zoomx/templates/`.

Open system settings in the site Manager and set:

| Key | Value |
|-----|--------|
| `zoomx_file_snippets_path` | `{core_path}elements/zoomx/snippets/` |
| `zoomx_smarty_custom_plugin_dir` | `{core_path}elements/zoomx/plugins/` |
| `zoomx_template_dir` | `{core_path}elements/zoomx/templates/` |
