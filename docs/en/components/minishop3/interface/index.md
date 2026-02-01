---
title: Admin interface
---
# Administrative interface

Overview of the MiniShop3 administrative interface in the MODX manager.

## Access

**Menu:** Applications → MiniShop3

## Interface structure

### Resource pages

| Page | Description |
|------|-------------|
| [Category](category) | Edit product category with product table |
| [Product](product) | Edit product card |
| [Gallery](gallery) | Product image management |

### Settings section

**Menu:** Applications → MiniShop3 → Settings

| Tab | Description |
|-----|-------------|
| [Deliveries](settings/deliveries) | Delivery methods |
| [Payments](settings/payments) | Payment methods |
| [Vendors](settings/vendors) | Vendor directory |
| [Links](settings/links) | Product link types |
| [Options](settings/options) | Product options directory |

See also: [Settings](settings)

### Utilities

**Menu:** Applications → MiniShop3 → Utilities

| Tab | Description |
|-----|-------------|
| [Gallery](utilities/gallery) | Thumbnail regeneration |
| [Import](utilities/import) | CSV product import |
| [Product fields](utilities/product-fields) | Product card field configuration |
| [Extra fields](utilities/extra-fields) | Creating new fields |
| [Grid columns](utilities/grid-columns) | Table configuration |
| [Model fields](utilities/model-fields) | Database model fields |

See also: [Utilities](utilities)

## Technologies

The MiniShop3 admin interface is built on two technologies:

| Technology | Use |
|------------|-----|
| **ExtJS 3.4** | Main panels (orders, customers, ExtJS forms) |
| **Vue 3 + PrimeVue** | Modern components (category tables, settings, utilities) |

Vue components are integrated into ExtJS via mount points and require the [VueTools](/en/components/vuetools/) package.

## Extending the interface

### Adding CSS/JS

Use the `msOnManagerCustomCssJs` event:

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];
        $controller = $scriptProperties['controller'];

        if ($page === 'product_update') {
            $controller->addCss('/assets/components/mycomponent/css/product.css');
            $controller->addLastJavascript('/assets/components/mycomponent/js/product.js');
        }
        break;
}
```

### Custom table actions

Register actions via `MS3ActionRegistry`:

```javascript
MS3ActionRegistry.register('myAction', async (data, gridId) => {
    // Your code
    return { success: true, refresh: true };
});
```

See also: [Category — Adding actions](category#adding-actions-to-column)
