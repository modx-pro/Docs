---
title: Manager events
---
# Manager events

Events for customizing the MiniShop3 manager interface.

## msOnManagerCustomCssJs

Fired when MiniShop3 manager pages load. Lets you add your own CSS and JavaScript files.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `object` | Page controller object |
| `page` | `string` | Page identifier |

### Available pages

| page value | Description |
|------------|-------------|
| `product_create` | Create product |
| `product_update` | Edit product |
| `category_create` | Create category |
| `category_update` | Edit category |
| `orders` | Order list |
| `order` | Order card |
| `customers` | Customer list |
| `settings` | Component settings |
| `notifications` | Notification management |

### Adding files

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $controller = $scriptProperties['controller'];
        $page = $scriptProperties['page'];

        $controller->addCss('/assets/components/mycomponent/css/ms3-custom.css');
        $controller->addJavascript('/assets/components/mycomponent/js/ms3-custom.js');
        $controller->addHtml('<script type="module" src="/assets/components/mycomponent/js/ms3-module.js"></script>');
        break;
}
```

### Conditional loading by page

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $controller = $scriptProperties['controller'];
        $page = $scriptProperties['page'];

        $controller->addCss('/assets/components/mycomponent/css/common.css');

        if (in_array($page, ['product_create', 'product_update'])) {
            $controller->addJavascript('/assets/components/mycomponent/js/product-extend.js');
        }
        if (in_array($page, ['orders', 'order'])) {
            $controller->addJavascript('/assets/components/mycomponent/js/order-extend.js');
        }
        if ($page === 'category_update') {
            $controller->addJavascript('/assets/components/mycomponent/js/category-extend.js');
        }
        break;
}
```

### Passing data to JavaScript

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $controller = $scriptProperties['controller'];
        $page = $scriptProperties['page'];

        $config = [
            'apiUrl' => '/assets/components/mycomponent/connector.php',
            'userId' => $modx->user->get('id'),
            'page' => $page,
            'customSetting' => $modx->getOption('my_custom_setting'),
        ];

        $controller->addHtml('<script>window.MyComponent = window.MyComponent || {}; window.MyComponent.config = ' . json_encode($config) . ';</script>');
        $controller->addJavascript('/assets/components/mycomponent/js/main.js');
        break;
}
```

### Extending ExtJS

Add a button to the product toolbar by loading a JS file that finds `ms3-product-panel` and adds to `getTopToolbar()`. Add a tab by finding `modx-resource-tabs` and calling `tabs.add()`. Add an orders grid column by overriding `ms3.grid.Orders.prototype.getColumns` and splicing in a new column. Use unique namespaces (e.g. `window.MyComponent`) and check element existence before use. Use `addLastJavascript()` for scripts that must load after core.
