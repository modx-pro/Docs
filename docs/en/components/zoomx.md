---
title: ZoomX
description: Alternative way to use PHP templating engines
logo: https://modstore.pro/assets/extras/zoomx/logo-lg.png
author: sergant210
modstore: https://modstore.pro/packages/utilities/zoomx
modx: https://modx.com/extras/package/zoomx
repository: https://github.com/sergant210/ZoomX

head:
  - - link
    - rel: canonical
      href: https://modzone.ru/documentation/zoomx/
---

# ZoomX

Alternative way to use PHP templating engines.

## Introduction

The main idea of this component is a complete departure from the standard template engine in favor of PHP templating engines. No database elements, no repeated parsing of content and logic in snippet-style **IF**. Instead, all development happens in a convenient IDE editor, with full version control support, plus powerful functionality and a large developer community. For template management, the [FastRoute](https://github.com/nikic/FastRoute) library is used, which allows flexible request routing. Unlike other MODX packages with similar features (CustomRequest, modxFastRouter, VirtualPage), which run on the `OnPageNotFound` event after MODX fails to find a resource, ZoomX **FastRoute** runs before the standard MODX router and has 3 operation modes: disabled, joint, and strict.

Additionally, FastRoute adds support for REST architecture, enabling full API applications.

::: warning
This component requires PHP ≥ 7.1.
:::

## Usage

Install the component using the standard package installer. Enable the `friendly_urls` system setting. Next, configure routes and Smarty templates. Out of the box you get 3 templates: "index.tpl", "base.tpl" and "error.tpl". Initially they are in `core/components/zoomx/templates/default/`. You can override this path. You should: these templates are overwritten on each component update.

Two system settings control templates: `zoomx_template_dir` (default `core/components/zoomx/templates/`) and `zoomx_theme` (default `default`). It is recommended to move templates to `core/templates/default/`.

Themes help organize views. For example, desktop templates can go in theme "default" and mobile in "mobile". If you do not need themes, leave `zoomx_theme` empty.

You can create your own templates for all or some resources. Use the bundled templates as examples. Then link templates to resources via routes.

## Router

Routes are configured in `core/config/routes.php`. To attach a template, return an instance of `ZoomView` or use the `viewx()` helper.

```php
# 1. Class
$router->get('/hello.html', function() {
  return new ZoomView('hello.tpl', ['name' => 'John']);
});

# 2. Helper
$router->get('/users/{id}', function($id) use($modx) {
  $user = $modx->getObject('modUser', ['id' => (int)$id]);
  return viewx('profile.tpl', $user->toArray());
});
```

More on routing: [Routing](https://modzone.ru/documentation/zoomx/routing.html).

You can return a plain string:

```php
$router->get('/hello.html', function() {
  return '<h1>Hello, John!</h1>';
});
```

::: info
The previous example may return 404. To avoid that:

- A resource with that URI must exist.
- Or disable resource autoload in `zoomx_autoload_resource` for all routes.
:::

You can disable autoload per route, effectively creating a virtual page:

```php
$router->get('/hello.html', function() {
  zoomx()->autoloadResource(false);
  return '<h1>Hello, John!</h1>';
});
```

Redirect example. Use `modX::sendRedirect()` or set `$modx->resourceIdentifier` to the target resource id or URI. In the latter case the specified template will be used.

```php
$router->get('/product1.html', function() use($modx) {
  $modx->sendRedirect('catalog/product2.html');
});

$router->get('resource.html', function() use($modx) {
  $modx->resourceIdentifier = 2;
  // or resource URI
  $modx->resourceIdentifier = 'another.html';
  return viewx('hello.tpl', ['name' => 'John']);
});
```

::: info Important
Because the router runs at the very start of the request, the resource is not yet defined (`$modx->resource = null`). The request handler loads it later. If you need the resource inside the route, fetch it yourself. In that case automatic lookup is not used.
:::

```php
$router->get('article100.html', function() use($modx) {
  zoomx()->getResource('article100'); // Without .html
  return viewx('resource.tpl');
});
```

### Routing modes

- `0` – disabled. All routes are ignored.
- `1` – mixed. Both ZoomX and MODX routing. If no route matches the URI, MODX handles the request normally.
- `2` – strict. ZoomX only. No route match yields 404.

Modes are set in `zoomx_routing_mode`.

In mixed mode, a route can match a URI that has no corresponding resource (e.g. routes with masks). For `site.ru/blog/abra-cadabra-fake`, the route may match but no resource exists. If the route had not matched, ZoomX would pass control to MODX. Since it matched, ZoomX behaves as in strict mode and shows its error page. The deciding factor is whether a route exists for the request URI.

### Controllers

Move route logic into controllers. Example for `site.ru/users`:

```php
$router->get('/users', ['Zoomx\Controllers\UserController', 'index']);
$router->get('/users/{id:\d+}', ['Zoomx\Controllers\UserController', 'show']);
$router->post('/users', [Zoomx\Controllers\UserController::class, 'create']);
```

You can omit `index` and pass only the controller class.

Forms support only GET and POST. For other HTTP methods, enable `zoomx_http_method_override` (enabled by default) and add a hidden input `_method` with the method name.

```html
<form>
  <input type="hidden" name="_method" value="PUT">
  ...
</form>
```

Then this route will work:

```php
$router->put('/users/{id:\d+}', ['Zoomx\Controllers\UserController', 'update']);
```

::: danger
For some routes you must set `$modx->resource` yourself.
:::

Controllers live in `core/components/zoomx/src/Controllers/`. Your controller should extend `ZoomX\Controllers\Controller`.

```php
<?php
namespace Zoomx\Controllers;

class UserController extends Controller
{
  public function index()
  {
    return viewx('users.tpl');
  }

  public function show($id)
  {
    zoomx()->getResource('users');
    $user = $this->modx->getObject('modUser', ['id' => $id]);
    return viewx('user.tpl', compact('user'));
  }
}
```

### RESTful API

FastRoute provides full REST support. MODX has built-in REST, but it is limited.

| HTTP Method | URI                | Controller method |
|-------------|--------------------|-------------------|
| GET         | `/users`           | index             |
| GET         | `/users/create`    | create            |
| POST        | `/users`           | store             |
| GET         | `/users/{id}`      | show              |
| GET         | `/users/{id}/edit` | edit              |
| PUT/PATCH   | `/users/{id}`      | update            |
| DELETE      | `/users/{id}`      | delete            |

This mode is enabled automatically when the **Accept** header is `application/json`. There is no automatic resource resolution by URI; the controller or router closure handles the request and returns the response.

## Smarty templating engine

ZoomX does not use the built-in MODX template engine. Smarty is used instead.

Store templates in a dedicated folder. ZoomX ships with "base.tpl", "error.tpl" and "index.tpl" in `core/components/zoomx/templates/default/`. Do not edit these directly. Create e.g. `core/templates/` and copy the `default` folder there so your changes survive updates.

Then set `zoomx_template_dir` to the first part (e.g. `core/components/zoomx/templates/`) and `zoomx_theme` to the theme folder (e.g. `default`). If you skip themes, leave `zoomx_theme` empty and place templates in `core/components/zoomx/templates/`.

Example structure:

```
templates
|--default
|  |--partials
|  |  |--head.tpl
|  |  |--header.tpl
|  |  |--navigation.tpl
|  |  |--footer.tpl
|  |--chunks
|  |  |--chunk.tpl
|  |  |--chunk2.tpl
|  |--base.tpl
|  |--error.tpl
|  |--index.tpl
```

Root files are main templates. `partials` holds page fragments. `chunks` are for snippet use. Example template:

```smarty
<!DOCTYPE html>
<html lang="{'cultureKey'|config}">
  {include "partials/head.tpl"}
  <body>
    <div class="container">
      {include "partials/header.tpl"}
      {block "content"}{/block}
    </div>
    {include "partials/footer.tpl"}
    {block "scripts"}{/block}
  </body>
</html>
```

Split into partials only when necessary. Prefer extending blocks and overriding only the parts that change.

```smarty
<!DOCTYPE html>
<html lang="{'cultureKey'|config}">
<head>
  {block "title"}<title>{'pagetitle'|resource} - {'site_name'|config}</title>{/block}
  <base href="{'site_url'|config}" />
  <meta charset="{'modx_charset'|config}" />
  ...
  {block "styles"}{/block}
</head>
...
```

In child templates you can override `title` and `styles` blocks.

## More information

- [Video](https://modzone.ru/blog/2020/09/27/zoomx-operating-principle/) with a brief demo.
