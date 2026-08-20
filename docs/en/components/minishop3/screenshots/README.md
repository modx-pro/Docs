# MiniShop3 screenshots

Put PNG files in this folder, then uncomment the markdown line:

```md
<!-- ![Caption](/components/minishop3/screenshots/filename.png) -->
```

→

```md
![Caption](/components/minishop3/screenshots/filename.png)
```

An active link without the file breaks `pnpm build` (`Rollup failed to resolve import`). Keep stubs in an HTML comment.

| File | What to capture | Page |
| --- | --- | --- |
| `mgr-orders.png` | **Extras → MiniShop3 → Orders**: list, drafts toggle, status badge | [interface/orders.md](../interface/orders.md), [manager/grid-config/cookbook.md](../manager/grid-config/cookbook.md) |
| `mgr-order.png` | Order card (tabs, cost recalculation) | [interface/orders.md](../interface/orders.md) |
| `mgr-customers.png` | **Extras → MiniShop3 → Customers** | [interface/customers.md](../interface/customers.md) |
| `mgr-deliveries.png` | **Settings → Deliveries** | [interface/settings/deliveries.md](../interface/settings/deliveries.md) |
| `mgr-payments.png` | **Settings → Payments** | [interface/settings/payments.md](../interface/settings/payments.md) |
| `mgr-options.png` | **Settings → Options** (grid + groups) | [interface/settings/options.md](../interface/settings/options.md) |
| `mgr-option-groups.png` | DnD option groups list (`msOptionGroup`) | [interface/settings/options.md](../interface/settings/options.md) |
| `mgr-notifications.png` | **Notifications**: channel configs | [interface/notifications.md](../interface/notifications.md) |
| `mgr-import.png` | **Utilities → Import** (mapping, extra fields) | [interface/utilities/import.md](../interface/utilities/import.md) |
| `mgr-extra-fields.png` | **Utilities → Extra fields** (incl. repeater / key-value) | [interface/utilities/extra-fields.md](../interface/utilities/extra-fields.md), [manager/extra-fields/cookbook.md](../manager/extra-fields/cookbook.md), [manager/examples/order-custom-field.md](../manager/examples/order-custom-field.md), [manager/examples/product-extra-field.md](../manager/examples/product-extra-field.md) |
| `mgr-product-fields.png` | **Utilities → Product fields** (sections, visible) | [interface/utilities/product-fields.md](../interface/utilities/product-fields.md), [manager/product-fields/cookbook.md](../manager/product-fields/cookbook.md), [manager/examples/product-extra-field.md](../manager/examples/product-extra-field.md) |
| `mgr-product-data.png` | Product **Data** tab on the product card | [manager/examples/product-extra-field.md](../manager/examples/product-extra-field.md) |
| `mgr-grid-columns.png` | **Utilities → Grid columns** | [interface/utilities/grid-columns.md](../interface/utilities/grid-columns.md), [manager/grid-config/cookbook.md](../manager/grid-config/cookbook.md) |
| `mgr-order-extra-field.png` | Order card: additional fields section | [interface/orders.md](../interface/orders.md), [manager/examples/order-custom-field.md](../manager/examples/order-custom-field.md), [manager/extra-fields/cookbook.md](../manager/extra-fields/cookbook.md) |
| `mgr-model-fields.png` | **Utilities → Model fields** (sections, visible) | [interface/utilities/model-fields.md](../interface/utilities/model-fields.md), [manager/model-fields/cookbook.md](../manager/model-fields/cookbook.md) |
| `mgr-category-products.png` | Category resource product table (option columns, inline-edit) | [interface/category.md](../interface/category.md), [quick-start.md](../quick-start.md), [manager/grid-config/cookbook.md](../manager/grid-config/cookbook.md), [manager/examples/product-extra-field.md](../manager/examples/product-extra-field.md) |
| `mgr-product-gallery.png` | Product gallery tab | [interface/gallery.md](../interface/gallery.md) |
| `mgr-product-categories.png` | **Categories** tab on the product card | [interface/product.md](../interface/product.md) |
| `mgr-system-settings.png` | System Settings → minishop3 namespace | [quick-start.md](../quick-start.md) |
| `fe-catalog.png` | Storefront catalog | [frontend/catalog.md](../frontend/catalog.md) |
| `fe-product.png` | Product page | [frontend/product.md](../frontend/product.md) |
| `fe-cart.png` | Cart | [frontend/cart.md](../frontend/cart.md) |
| `fe-checkout.png` | Checkout | [frontend/order.md](../frontend/order.md) |
| `fe-thanks.png` | “Thank you” page | [frontend/thanks.md](../frontend/thanks.md) |
| `fe-customer-profile.png` | Account: profile | [frontend/customer-profile.md](../frontend/customer-profile.md) |
| `fe-customer-addresses.png` | Account: addresses | [frontend/customer-addresses.md](../frontend/customer-addresses.md) |
| `fe-customer-orders.png` | Account: order history | [frontend/customer-orders.md](../frontend/customer-orders.md) |
| `fe-customer-auth.png` | Account: login / register tabs | [frontend/customer-auth.md](../frontend/customer-auth.md) |
