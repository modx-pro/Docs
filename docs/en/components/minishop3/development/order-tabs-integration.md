---
title: Order tabs integration
description: Guide to adding custom tabs to the order page
---

# Order tabs integration

MiniShop3 provides an API for adding custom tabs to the order page in the manager. You can integrate both Vue components and ExtJS panels.

::: info Similar API
For product tabs use [`MS3ProductTabsRegistry`](/en/components/minishop3/development/product-tabs-integration).
:::

## Architecture

The order page is a fully Vue application (unlike the product page, where Vue is embedded in ExtJS):

```
Vue OrderView (root component)
├── Info (position: 0)
├── Products (position: 1, hidden on create)
├── Address (position: 2)
├── History (position: 3, hidden on create)
└── [Your tabs] (position: 4+)
```

## Registry API

Use the global object `window.MS3OrderTabsRegistry` to register tabs.

### `register(tabConfig)`

Registers a new tab.

**Parameters:**

| Parameter | Type | Required | Description |
|----------|-----|--------------|----------|
| `key` | string | Yes | Unique tab identifier |
| `title` | string | Yes | Tab title |
| `type` | string | No | `'vue'` (default) or `'extjs'` |
| `component` | object/string | For Vue | Vue component (SFC object or name) |
| `xtype` | string | For ExtJS | ExtJS component xtype |
| `extConfig` | object | No | Additional ExtJS configuration |
| `props` | object | No | Additional props for the Vue component |
| `position` | number | No | Tab position (default `100`) |
| `hideOnCreate` | boolean | No | Hide when creating a new order |

**Returns:** `boolean` — whether registration succeeded.

**Reserved keys:** `info`, `products`, `address`, `history` — cannot be used.

### Data passed to the component

Each plugin tab automatically receives:

| Parameter | Type | Description |
|----------|-----|----------|
| `orderId` | number | Order ID (0 on create) |
| `order` | object | Order data |
| `config` | object | ms3 configuration (`ms3.config`) |
| `isCreateMode` | boolean | New order creation mode |

## Connecting via MODX plugin

Tabs are registered through the `msOnManagerCustomCssJs` event with `page === 'order'` check:

```php
<?php
/**
 * Event: msOnManagerCustomCssJs
 */

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

/** @var msManagerController $controller */
$controller = $scriptProperties['controller'];

// Load script that registers the tab
$controller->addHtml('
<script>
// ... tab registration (see examples below)
</script>
');
```

::: warning Load order
The script from `msOnManagerCustomCssJs` runs **before** the Vue module (`order.min.js`) loads.
At that moment `MS3OrderTabsRegistry` does not exist yet — create a stub with a queue (see examples below). The Vue module picks up `pendingTabs` from the stub on load.
:::

## Vue component integration

### Inline component (simple option)

Suitable for simple tabs without a build step:

```php
<?php
// MODX plugin — event: msOnManagerCustomCssJs

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

$controller = $scriptProperties['controller'];

$controller->addHtml('
<script>
(function() {
    if (!window.MS3OrderTabsRegistry) {
        window.MS3OrderTabsRegistry = {
            pendingTabs: [],
            register: function(c) { this.pendingTabs.push(c); return true; }
        };
    }

    window.MS3OrderTabsRegistry.register({
        key: "delivery-tracking",
        title: "Tracking",
        type: "vue",
        component: {
            props: ["orderId", "order", "config", "isCreateMode"],
            template: "<div style=\"padding: 20px\">"
                + "<h3>Delivery tracking</h3>"
                + "<p>Order #{{ order?.num }}, ID: {{ orderId }}</p>"
                + "</div>"
        },
        position: 5,
        hideOnCreate: true
    });
})();
</script>
');
```

### SFC component (recommended)

For full components built with Vite/Webpack:

**1. Create a Vue component:**

```vue
<!-- my-addon/src/OrderTrackingTab.vue -->
<template>
  <div class="tracking-tab">
    <h3>Delivery tracking</h3>
    <p>Order #{{ order?.num }}</p>
    <p>Status: {{ trackingStatus }}</p>
    <button @click="refreshTracking">Refresh</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  orderId: { type: Number, required: true },
  order: { type: Object, default: null },
  config: { type: Object, default: () => ({}) },
  isCreateMode: { type: Boolean, default: false }
})

const trackingStatus = ref('Loading...')

async function refreshTracking() {
  // Your data fetch logic
  const response = await fetch(`/api/tracking/${props.orderId}`)
  const data = await response.json()
  trackingStatus.value = data.status
}

onMounted(() => {
  if (props.orderId) {
    refreshTracking()
  }
})
</script>
```

**2. Create an entry point:**

```javascript
// my-addon/src/entries/order-tab.js
import OrderTrackingTab from '../components/OrderTrackingTab.vue'

;(function() {
  if (!window.MS3OrderTabsRegistry) {
    window.MS3OrderTabsRegistry = {
      pendingTabs: [],
      register: function(c) { this.pendingTabs.push(c); return true; }
    }
  }

  window.MS3OrderTabsRegistry.register({
    key: 'tracking',
    title: 'Tracking',
    type: 'vue',
    component: OrderTrackingTab, // SFC object, not a string
    position: 5,
    hideOnCreate: true
  })
})()
```

**3. Connect in a MODX plugin:**

```php
<?php
// Event: msOnManagerCustomCssJs

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

$controller = $scriptProperties['controller'];
$assetsUrl = MODX_ASSETS_URL . 'components/myaddon/';

// ES module from build
$controller->addHtml(
    '<script type="module" src="' . $assetsUrl . 'js/order-tab.min.js"></script>'
);
```

::: tip Reactivity
Vue tabs receive **reactive** props. When the order loads, saves, or is edited — props update automatically. Your component can use `watch` and `computed` to react to changes.
:::

## ExtJS component integration

### 1. Create an ExtJS panel

```javascript
// assets/components/myaddon/js/mgr/delivery-panel.js
Ext.define('MyAddon.panel.DeliveryInfo', {
  extend: 'Ext.Panel',
  xtype: 'myaddon-delivery-panel',

  initComponent: function() {
    // this.orderId, this.order, this.config, this.isCreateMode
    // are available from configuration
    Ext.apply(this, {
      border: false,
      bodyStyle: 'padding: 15px',
      html: '<h3>Delivery information</h3>'
          + '<p>Order ID: ' + this.orderId + '</p>'
    })

    MyAddon.panel.DeliveryInfo.superclass.initComponent.call(this)
  }
})
```

### 2. Register the tab and load scripts

```php
<?php
// Plugin — event: msOnManagerCustomCssJs

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

$controller = $scriptProperties['controller'];
$assetsUrl = MODX_ASSETS_URL . 'components/myaddon/';

// Panel first
$controller->addJavascript($assetsUrl . 'js/mgr/delivery-panel.js');

// Then registration
$controller->addHtml('
<script>
(function() {
    if (!window.MS3OrderTabsRegistry) {
        window.MS3OrderTabsRegistry = {
            pendingTabs: [],
            register: function(c) { this.pendingTabs.push(c); return true; }
        };
    }

    window.MS3OrderTabsRegistry.register({
        key: "delivery-info",
        title: "Delivery",
        type: "extjs",
        xtype: "myaddon-delivery-panel",
        extConfig: {
            customParam: "value"
        },
        position: 6,
        hideOnCreate: true
    });
})();
</script>
');
```

::: warning Data snapshot
The ExtJS tab is created **once** on first switch. Values `order`, `orderId`, `config`, `isCreateMode` are a snapshot at creation time. If the order is saved or changed, the ExtJS panel **does not** receive updated data automatically. Implement your own refresh logic (polling, event subscription).
:::

## Tab positioning

Built-in tabs have fixed positions:

| Tab | Position | Hidden on create |
|---------|---------|---------------------|
| Info | 0 | No |
| Products | 1 | Yes |
| Address | 2 | No |
| History | 3 | Yes |

Recommended positions for custom tabs: **4–99**.

Tabs with the same position sort in registration order.

## Validation

The registry validates configuration on registration:

- `key` and `title` are required
- `key` must not match reserved keys (`info`, `products`, `address`, `history`)
- `type: 'vue'` requires `component`
- `type: 'extjs'` requires `xtype`
- Duplicate `key` — registration is rejected

On error `register()` returns `false` and logs `console.error`.

## Debugging

```javascript
// Registry state
console.log(window.MS3OrderTabsRegistry)

// Check: is Vue mounted?
console.log(window.MS3OrderTabsRegistry._mounted)

// OrderView instance
console.log(window.MS3OrderTabsRegistry._instance)

// Queue before mount (should be empty after load)
console.log(window.MS3OrderTabsRegistry.pendingTabs)
```

## Full example: delivery plugin

```php
<?php
/**
 * Plugin: Delivery tracking tab on order page
 * Event: msOnManagerCustomCssJs
 */

$page = $scriptProperties['page'] ?? '';
if ($page !== 'order') {
    return;
}

$controller = $scriptProperties['controller'];
$assetsUrl = MODX_ASSETS_URL . 'components/mydelivery/';

// Configuration for JS
$orderId = (int)($_GET['id'] ?? 0);
$deliveryConfig = [
    'apiUrl' => $assetsUrl . 'connector.php',
    'orderId' => $orderId,
    'apiKey' => $modx->getOption('mydelivery_api_key'),
];

// Pass configuration and register tab
$controller->addHtml('
<script>
    window.MyDeliveryConfig = ' . json_encode($deliveryConfig) . ';

    (function() {
        if (!window.MS3OrderTabsRegistry) {
            window.MS3OrderTabsRegistry = {
                pendingTabs: [],
                register: function(c) { this.pendingTabs.push(c); return true; }
            };
        }

        window.MS3OrderTabsRegistry.register({
            key: "delivery-tracking",
            title: "' . $modx->lexicon('mydelivery_tab_title') . '",
            type: "vue",
            component: {
                props: ["orderId", "order", "config", "isCreateMode"],
                data: function() {
                    return { status: "Loading...", tracking: null }
                },
                template: "<div style=\"padding: 20px\">"
                    + "<h3>' . $modx->lexicon('mydelivery_tracking') . '</h3>"
                    + "<p><b>Order:</b> #{{ order?.num }}</p>"
                    + "<p><b>Status:</b> {{ status }}</p>"
                    + "<pre v-if=\"tracking\">{{ JSON.stringify(tracking, null, 2) }}</pre>"
                    + "<button @click=\"refresh\">Refresh</button>"
                    + "</div>",
                methods: {
                    refresh: function() {
                        var self = this;
                        var cfg = window.MyDeliveryConfig || {};
                        fetch(cfg.apiUrl + "?action=track&order_id=" + this.orderId)
                            .then(function(r) { return r.json() })
                            .then(function(data) {
                                self.status = data.status || "Unknown";
                                self.tracking = data;
                            });
                    }
                },
                mounted: function() {
                    if (this.orderId) this.refresh();
                }
            },
            position: 5,
            hideOnCreate: true
        });
    })();
</script>
');
```
