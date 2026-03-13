---
title: Product tabs integration
description: Guide to adding custom tabs to the product edit page
---

# Product tabs integration

MiniShop3 provides an API for adding custom tabs to the product edit page. You can integrate both Vue components and ExtJS panels.

## Architecture

The product edit page uses a hybrid architecture:

```
ExtJS TabPanel (top level)
├── Document (MODX system tab)
├── Product (Vue ProductTabs)
│   ├── Properties (Vue)
│   ├── Gallery (ExtJS + Vue uploader)
│   ├── Categories (ExtJS)
│   ├── Links (ExtJS)
│   ├── Options (ExtJS)
│   └── [Your tabs]
├── Page Settings (MODX system tab)
└── Access Permissions (MODX system tab)
```

The "Product" tab contains the Vue component `ProductTabs` with PrimeVue TabView, which manages the nested tabs.

## Plugin Registry API

The global object `window.MS3ProductTabsRegistry` is used to register tabs.

### Methods

#### `register(tabConfig)`

Registers a new tab.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Unique tab identifier |
| `title` | string | Yes | Tab title (shown in tab) |
| `type` | string | No | Tab type: `'vue'` or `'extjs'` (default `'vue'`) |
| `component` | string | For Vue | Vue component name |
| `xtype` | string | For ExtJS | ExtJS component xtype |
| `extConfig` | object | No | Extra config for ExtJS component |
| `props` | object | No | Props for Vue component |
| `position` | number | No | Tab position (default `100`) |

**Returns:** `boolean` — whether registration succeeded

## Vue component integration

### Step 1: Create a Vue component

```javascript
// my-component/src/VariantsTab.vue
<template>
  <div class="variants-tab">
    <h3>Product #{{ productId }} variants</h3>
    <!-- Your content -->
  </div>
</template>

<script setup>
defineProps({
  productId: {
    type: Number,
    required: true
  },
  record: {
    type: Object,
    required: true
  }
})
</script>
```

### Step 2: Create entry point

```javascript
// my-component/src/entries/variants-tab.js
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import VariantsTab from '../components/VariantsTab.vue'

// Register component globally
window.MS3VariantsTab = VariantsTab

// Register tab
if (window.MS3ProductTabsRegistry) {
  window.MS3ProductTabsRegistry.register({
    key: 'variants',
    title: 'Variants',
    type: 'vue',
    component: 'MS3VariantsTab',
    position: 5 // After Options
  })
}
```

### Step 3: Load script in MODX controller

```php
// core/components/mycomponent/controllers/product.class.php
public function loadCustomCssJs()
{
    $assetsUrl = $this->modx->getOption('mycomponent.assets_url');

    // Load after product-tabs.min.js
    $this->addLastJavascript($assetsUrl . 'js/variants-tab.min.js');
}
```

### Step 4: Handling in ProductTabs

For full Vue integration, register the component in ProductTabs. Add handling in the template:

```vue
<!-- ProductTabs.vue already supports plugin components -->
<template v-else-if="tab.type === 'vue' && tab.component">
  <component
    :is="getComponent(tab.component)"
    v-bind="tab.props"
    :product-id="productId"
    :record="record"
  />
</template>
```

```javascript
// In script setup
function getComponent(name) {
  // Look up component in global scope
  return window[name] || null
}
```

## ExtJS component integration

### Step 1: Create ExtJS panel

```javascript
// assets/components/mycomponent/js/mgr/widgets/custom.panel.js
MyComponent.panel.CustomTab = function(config) {
    config = config || {};

    Ext.apply(config, {
        border: false,
        layout: 'anchor',
        items: [{
            xtype: 'modx-grid',
            // ... grid config
        }]
    });

    MyComponent.panel.CustomTab.superclass.constructor.call(this, config);
};
Ext.extend(MyComponent.panel.CustomTab, MODx.Panel);
Ext.reg('mycomponent-custom-tab', MyComponent.panel.CustomTab);
```

### Step 2: Register the tab

```javascript
// assets/components/mycomponent/js/mgr/product-integration.js
Ext.onReady(function() {
    if (window.MS3ProductTabsRegistry) {
        window.MS3ProductTabsRegistry.register({
            key: 'custom',
            title: 'Custom tab',
            type: 'extjs',
            xtype: 'mycomponent-custom-tab',
            extConfig: {
                // record is passed automatically!
                // Extra params:
                myParam: 'value'
            },
            position: 6
        });
    }
});
```

::: tip record is passed automatically
For ExtJS tabs, `record` with product data is passed automatically in `extConfig`. You do not need to set it explicitly.
:::

### Step 3: Load scripts

```php
public function loadCustomCssJs()
{
    $assetsUrl = $this->modx->getOption('mycomponent.assets_url');

    // Panel first
    $this->addLastJavascript($assetsUrl . 'js/mgr/widgets/custom.panel.js');
    // Then integration
    $this->addLastJavascript($assetsUrl . 'js/mgr/product-integration.js');
}
```

## Tab positions

Built-in tabs use these positions:

| Tab | Position |
|-----|----------|
| Properties | 0 |
| Gallery | 1 |
| Categories | 2 |
| Links | 3 |
| Options | 4 |

Recommended positions for custom tabs: **5–99**.

## Accessing product data

Your component receives:

### Vue components

```javascript
const props = defineProps({
  productId: Number,  // Product ID
  record: Object      // Full product data
})

// Usage
console.log(props.record.pagetitle)
console.log(props.record.price)
```

### ExtJS components

```javascript
MyComponent.panel.CustomTab = function(config) {
    // config.record contains product data
    console.log(config.record.id);
    console.log(config.record.pagetitle);

    // ...
};
```

## Example: ms3Variants integration

```javascript
// variants.wrapper.js
(function() {
    'use strict';

    // Wait for MS3ProductTabsRegistry
    function registerVariantsTab() {
        if (!window.MS3ProductTabsRegistry) {
            setTimeout(registerVariantsTab, 100);
            return;
        }

        window.MS3ProductTabsRegistry.register({
            key: 'variants',
            title: _('ms3variants_tab_title') || 'Variants',
            type: 'extjs',
            xtype: 'ms3variants-product-panel',
            extConfig: {
                // record is passed automatically
            },
            position: 5
        });

        console.log('[ms3Variants] Tab registered');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerVariantsTab);
    } else {
        registerVariantsTab();
    }
})();
```

## Important notes

1. **Load order**: Your scripts must load AFTER `product-tabs.min.js`

2. **Unique keys**: Each tab must have a unique `key`

3. **Lazy loading**: ExtJS components are mounted only when the tab is opened

4. **Cleanup**: ExtJS components are destroyed when the page is closed

5. **CSS scope**: Vue components inside ProductTabs inherit styles from the `.vueApp` container

## Debugging

Check tab registration in the console:

```javascript
// List registered tabs
console.log(window.MS3ProductTabsRegistry.pendingTabs);

// ProductTabs instance
console.log(window.MS3ProductTabsRegistry._instance);
```
