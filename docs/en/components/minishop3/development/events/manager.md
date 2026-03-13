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

        // Add CSS
        $controller->addCss('/assets/components/mycomponent/css/ms3-custom.css');

        // Add JavaScript
        $controller->addJavascript('/assets/components/mycomponent/js/ms3-custom.js');

        // Add HTML (for ES modules)
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

        // Pass config to JS
        $controller->addHtml('
            <script>
                window.MyComponent = window.MyComponent || {};
                window.MyComponent.config = ' . json_encode($config) . ';
            </script>
        ');

        $controller->addJavascript('/assets/components/mycomponent/js/main.js');
        break;
}
```

---

## Extending the ExtJS interface

### Add a button to the product toolbar

```php
<?php
// Plugin
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];

        if (in_array($page, ['product_create', 'product_update'])) {
            $controller = $scriptProperties['controller'];
            $controller->addJavascript('/assets/components/mycomponent/js/product-toolbar.js');
        }
        break;
}
```

```javascript
// product-toolbar.js
Ext.onReady(function() {
    var checkPanel = setInterval(function() {
        var panel = Ext.getCmp('ms3-product-panel');
        if (panel && panel.getTopToolbar) {
            clearInterval(checkPanel);

            var toolbar = panel.getTopToolbar();
            toolbar.add('-');
            toolbar.add({
                text: 'My button',
                iconCls: 'icon-cog',
                handler: function() {
                    MODx.msg.alert('Info', 'Button clicked!');
                }
            });
            toolbar.doLayout();
        }
    }, 100);
});
```

### Add a tab to the product card

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];

        if ($page === 'product_update') {
            $controller = $scriptProperties['controller'];
            $controller->addJavascript('/assets/components/mycomponent/js/product-tab.js');
        }
        break;
}
```

```javascript
// product-tab.js
Ext.onReady(function() {
    var checkTabs = setInterval(function() {
        var tabs = Ext.getCmp('modx-resource-tabs');
        if (tabs) {
            clearInterval(checkTabs);

            tabs.add({
                title: 'My tab',
                id: 'my-custom-tab',
                xtype: 'panel',
                layout: 'form',
                autoHeight: true,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Custom field',
                    name: 'my_custom_field',
                    anchor: '100%'
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Description',
                    name: 'my_description',
                    anchor: '100%',
                    height: 150
                }]
            });
            tabs.doLayout();
        }
    }, 100);
});
```

### Add a column to the orders grid

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];

        if ($page === 'orders') {
            $controller = $scriptProperties['controller'];
            $controller->addJavascript('/assets/components/mycomponent/js/orders-grid.js');
        }
        break;
}
```

```javascript
// orders-grid.js
Ext.onReady(function() {
    var originalGetColumns = ms3.grid.Orders.prototype.getColumns;

    ms3.grid.Orders.prototype.getColumns = function() {
        var columns = originalGetColumns.apply(this, arguments);

        columns.splice(3, 0, {
            header: 'Source',
            dataIndex: 'source',
            width: 100,
            sortable: true,
            renderer: function(value) {
                return value || '-';
            }
        });

        return columns;
    };
});
```

---

## Full example: extending the product card

```php
<?php
/**
 * Plugin: Extend product card
 * Events: msOnManagerCustomCssJs
 */

switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $controller = $scriptProperties['controller'];
        $page = $scriptProperties['page'];

        if (!in_array($page, ['product_create', 'product_update'])) {
            return;
        }

        $assetsUrl = MODX_ASSETS_URL . 'components/mycomponent/';

        $controller->addCss($assetsUrl . 'css/product-extend.css');

        $productId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

        $config = [
            'productId' => $productId,
            'assetsUrl' => $assetsUrl,
            'connectorUrl' => $assetsUrl . 'connector.php',
            'options' => [
                'enableSync' => $modx->getOption('mycomp_enable_sync', null, true),
                'apiKey' => $modx->getOption('mycomp_api_key'),
            ],
        ];

        if ($productId > 0) {
            $product = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
            if ($product) {
                $config['productData'] = [
                    'article' => $product->get('article'),
                    'vendor_id' => $product->get('vendor_id'),
                ];
            }
        }

        $controller->addHtml('
            <script>
                window.MyProductExtend = ' . json_encode($config) . ';
            </script>
        ');

        $controller->addJavascript($assetsUrl . 'js/product-extend.js');
        break;
}
```

```javascript
// product-extend.js
Ext.onReady(function() {
    var config = window.MyProductExtend || {};

    var checkForm = setInterval(function() {
        var form = Ext.getCmp('modx-panel-resource');
        if (!form) return;

        clearInterval(checkForm);

        var toolbar = form.getTopToolbar();
        if (toolbar && config.options.enableSync) {
            toolbar.add('-');
            toolbar.add({
                text: 'Sync',
                iconCls: 'icon-refresh',
                handler: function() {
                    syncProduct(config.productId);
                }
            });
            toolbar.doLayout();
        }

        form.on('success', function(response) {
            console.log('Product saved:', response);
        });

    }, 100);

    function syncProduct(productId) {
        if (!productId) {
            MODx.msg.alert('Error', 'Save the product first');
            return;
        }

        MODx.Ajax.request({
            url: config.connectorUrl,
            params: {
                action: 'sync',
                product_id: productId
            },
            listeners: {
                success: {
                    fn: function(response) {
                        MODx.msg.alert('Success', 'Product synced');
                    }
                },
                failure: {
                    fn: function(response) {
                        MODx.msg.alert('Error', response.message || 'Sync failed');
                    }
                }
            }
        });
    }
});
```

```css
/* product-extend.css */

.my-custom-field {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    background: #f9f9f9;
}

.my-sync-status {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
}

.my-sync-status.synced {
    background: #d4edda;
    color: #155724;
}

.my-sync-status.pending {
    background: #fff3cd;
    color: #856404;
}

.my-sync-status.error {
    background: #f8d7da;
    color: #721c24;
}
```

---

## Recommendations

### Avoid conflicts

```javascript
// Use unique namespaces
window.MyComponent = window.MyComponent || {};
window.MyComponent.init = function() {
    // Your code
};

// Check element existence
var panel = Ext.getCmp('ms3-product-panel');
if (panel) {
    // Safe to use panel
}
```

### Use ExtJS events

```javascript
Ext.onReady(function() {
    if (typeof ms3 !== 'undefined') {
        ms3.on('load', function() {
            console.log('MiniShop3 loaded');
        });
    }
});
```

### Load order

```php
// Use addLastJavascript for scripts that must load after core
$controller->addLastJavascript('/assets/components/mycomponent/js/after-all.js');
```
