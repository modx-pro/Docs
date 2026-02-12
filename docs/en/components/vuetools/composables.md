# API Composables

VueTools provides ready composables (helpers) for working with MODX from Vue components.

## useLexicon

Working with MODX lexicons.

### Import

```javascript
import { useLexicon } from '@vuetools/useLexicon'
```

### API

```javascript
const { _, has, getByPrefix } = useLexicon()
```

| Method | Description |
|--------|-------------|
| `_(key, params?)` | Get lexicon value by key |
| `has(key)` | Check if key exists |
| `getByPrefix(prefix)` | Get all keys with the given prefix |

### Examples

```javascript
const { _, has, getByPrefix } = useLexicon()

// Simple value
const title = _('my_component_title')
// "My component"

// With substitution parameters
const message = _('my_component_welcome', { name: 'John', count: 5 })
// Lexicon: "Hello, {name}! You have {count} messages"
// Result: "Hello, John! You have 5 messages"

// Check if key exists
if (has('my_component_optional_feature')) {
  // Key exists
}

// Get all keys with prefix
const allMyKeys = getByPrefix('my_component_')
// { 'my_component_title': 'My component', 'my_component_desc': 'Description', ... }
```

### Loading lexicons

Lexicons are searched in `window.MODx.lang`. Load topics in the PHP controller:

```php
public function getLanguageTopics()
{
    return ['mycomponent:default', 'mycomponent:manager'];
}
```

## useModx

Access to the global MODX object.

### Import

```javascript
import { useModx } from '@vuetools/useModx'
```

### API

```javascript
const { modx, config, siteId } = useModx()
```

| Property | Type | Description |
|----------|------|-------------|
| `modx` | `Object` | Full `window.MODx` object |
| `config` | `Object` | `MODx.config` configuration |
| `siteId` | `String` | Auth token `MODx.siteId` |

### Examples

```javascript
const { modx, config, siteId } = useModx()

// Access config
const assetsUrl = config.assets_url
const connectorUrl = config.connector_url
const baseUrl = config.base_url

// MODX Site ID for API auth
console.log(siteId) // "modx68ed50b266b7e9.17779601_168f40d849ba6b1.18395696"

// Use MODX methods
modx.msg.alert('Title', 'Message')
modx.msg.confirm({
  title: 'Confirmation',
  text: 'Are you sure?',
  url: config.connector_url,
  params: { action: 'myaction' }
})
```

### Common config properties

| Property | Description |
|----------|-------------|
| `config.assets_url` | Assets folder URL |
| `config.connector_url` | Connector URL |
| `config.base_url` | Site base URL |
| `config.manager_url` | Manager URL |
| `config.template` | Current template ID |

## usePermission

User permission checks.

### Import

```javascript
import { usePermission } from '@vuetools/usePermission'
```

### API

```javascript
const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()
```

| Method | Description |
|--------|-------------|
| `hasPermission(perm)` | Check single permission |
| `hasAnyPermission(perms)` | Check any of permissions |
| `hasAllPermissions(perms)` | Check all permissions |

### Examples

```javascript
const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()

// Check single permission
if (hasPermission('my_component_edit')) {
  // User can edit
}

// Check any permission
if (hasAnyPermission(['edit', 'save', 'delete'])) {
  // User has at least one permission
}

// Check all permissions
if (hasAllPermissions(['view', 'edit'])) {
  // User has both permissions
}
```

### Use in template

```vue
<script setup>
import { computed } from 'vue'
import { usePermission } from '@vuetools/usePermission'

const { hasPermission } = usePermission()

const canEdit = computed(() => hasPermission('my_component_edit'))
const canDelete = computed(() => hasPermission('my_component_delete'))
</script>

<template>
  <Button v-if="canEdit" label="Edit" />
  <Button v-if="canDelete" label="Delete" severity="danger" />
</template>
```

## useApi

HTTP client for **standard** MODX connector API.

### Import

```javascript
import { useApi } from '@vuetools/useApi'
```

### API

```javascript
const { get, post, put, delete: del } = useApi()
```

| Method | Description |
|--------|-------------|
| `get(action, params?)` | GET request |
| `post(action, data?)` | POST request |
| `put(action, data?)` | PUT request |
| `delete(action, data?)` | DELETE request |

### Examples

```javascript
const { get, post, put, delete: del } = useApi()

// GET request
const users = await get('security/user/getlist', { limit: 20 })

// POST request
const result = await post('security/user/create', {
  username: 'newuser',
  email: 'user@example.com'
})

// PUT request
await put('security/user/update', {
  id: 1,
  fullname: 'New Name'
})

// DELETE request
await del('security/user/remove', { id: 1 })
```

### Request format

useApi uses standard MODX connector format:

```
POST /connectors/index.php?action=security/user/getlist
```

::: warning For components with router
If your component uses a custom router (FastRoute, etc.), create local `request.js`. See [Custom API client](integration#custom-api-client).
:::

## Full example

Component using all composables:

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLexicon } from '@vuetools/useLexicon'
import { useModx } from '@vuetools/useModx'
import { usePermission } from '@vuetools/usePermission'
import { useApi } from '@vuetools/useApi'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

// Composables
const { _ } = useLexicon()
const { config } = useModx()
const { hasPermission } = usePermission()
const { get, post } = useApi()
const toast = useToast()

// State
const users = ref([])
const loading = ref(false)

// Computed
const canCreate = computed(() => hasPermission('new_user'))
const canEdit = computed(() => hasPermission('save_user'))

// Methods
async function loadUsers() {
  loading.value = true
  try {
    const response = await get('security/user/getlist', { limit: 50 })
    users.value = response.results || []
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: _('error'),
      detail: error.message,
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

async function createUser() {
  try {
    await post('security/user/create', {
      username: 'newuser',
      email: 'new@example.com'
    })
    toast.add({
      severity: 'success',
      summary: _('success'),
      detail: _('user_created'),
      life: 3000
    })
    await loadUsers()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: _('error'),
      detail: error.message,
      life: 3000
    })
  }
}

// Lifecycle
onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div class="user-management">
    <Toast />

    <div class="header">
      <h1>{{ _('user_management') }}</h1>
      <Button
        v-if="canCreate"
        :label="_('create_user')"
        icon="pi pi-plus"
        @click="createUser"
      />
    </div>

    <DataTable
      :value="users"
      :loading="loading"
      paginator
      :rows="10"
    >
      <Column field="id" :header="_('id')" sortable />
      <Column field="username" :header="_('username')" sortable />
      <Column field="email" :header="_('email')" sortable />
      <Column v-if="canEdit" :header="_('actions')">
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil"
            severity="secondary"
            text
            rounded
            @click="editUser(data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
```
