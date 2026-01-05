# API Composables

ModxProVueCore предоставляет готовые composables (хелперы) для работы с MODX из Vue компонентов.

## useLexicon

Работа с лексиконами MODX.

### Импорт

```javascript
import { useLexicon } from '@modxprovuecore/useLexicon'
```

### API

```javascript
const { _, has, getByPrefix } = useLexicon()
```

| Метод | Описание |
|-------|----------|
| `_(key, params?)` | Получить значение лексикона по ключу |
| `has(key)` | Проверить существование ключа |
| `getByPrefix(prefix)` | Получить все ключи с указанным префиксом |

### Примеры

```javascript
const { _, has, getByPrefix } = useLexicon()

// Простое получение значения
const title = _('my_component_title')
// "Мой компонент"

// С параметрами подстановки
const message = _('my_component_welcome', { name: 'John', count: 5 })
// Лексикон: "Привет, {name}! У вас {count} сообщений"
// Результат: "Привет, John! У вас 5 сообщений"

// Проверка существования ключа
if (has('my_component_optional_feature')) {
  // Ключ существует
}

// Получить все ключи с префиксом
const allMyKeys = getByPrefix('my_component_')
// { 'my_component_title': 'Мой компонент', 'my_component_desc': 'Описание', ... }
```

### Загрузка лексиконов

Лексиконы ищутся в `window.MODx.lang`. Загрузите топики в PHP контроллере:

```php
public function getLanguageTopics()
{
    return ['mycomponent:default', 'mycomponent:manager'];
}
```

## useModx

Доступ к глобальному объекту MODX.

### Импорт

```javascript
import { useModx } from '@modxprovuecore/useModx'
```

### API

```javascript
const { modx, config, siteId } = useModx()
```

| Свойство | Тип | Описание |
|----------|-----|----------|
| `modx` | `Object` | Полный объект `window.MODx` |
| `config` | `Object` | Конфигурация `MODx.config` |
| `siteId` | `String` | Токен авторизации `MODx.siteId` |

### Примеры

```javascript
const { modx, config, siteId } = useModx()

// Доступ к конфигурации
const assetsUrl = config.assets_url
const connectorUrl = config.connector_url
const baseUrl = config.base_url

// MODX Site ID для авторизации API
console.log(siteId) // "modx68ed50b266b7e9.17779601_168f40d849ba6b1.18395696"

// Использование MODX методов
modx.msg.alert('Заголовок', 'Сообщение')
modx.msg.confirm({
  title: 'Подтверждение',
  text: 'Вы уверены?',
  url: config.connector_url,
  params: { action: 'myaction' }
})
```

### Типичные config свойства

| Свойство | Описание |
|----------|----------|
| `config.assets_url` | URL папки assets |
| `config.connector_url` | URL коннектора |
| `config.base_url` | Базовый URL сайта |
| `config.manager_url` | URL менеджера |
| `config.template` | ID текущего шаблона |

## usePermission

Проверка прав пользователя.

### Импорт

```javascript
import { usePermission } from '@modxprovuecore/usePermission'
```

### API

```javascript
const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()
```

| Метод | Описание |
|-------|----------|
| `hasPermission(perm)` | Проверить одно право |
| `hasAnyPermission(perms)` | Проверить наличие любого из прав |
| `hasAllPermissions(perms)` | Проверить наличие всех прав |

### Примеры

```javascript
const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission()

// Проверить одно право
if (hasPermission('my_component_edit')) {
  // Пользователь может редактировать
}

// Проверить любое из прав
if (hasAnyPermission(['edit', 'save', 'delete'])) {
  // Пользователь имеет хотя бы одно право
}

// Проверить все права
if (hasAllPermissions(['view', 'edit'])) {
  // Пользователь имеет оба права
}
```

### Использование в шаблоне

```vue
<script setup>
import { computed } from 'vue'
import { usePermission } from '@modxprovuecore/usePermission'

const { hasPermission } = usePermission()

const canEdit = computed(() => hasPermission('my_component_edit'))
const canDelete = computed(() => hasPermission('my_component_delete'))
</script>

<template>
  <Button v-if="canEdit" label="Редактировать" />
  <Button v-if="canDelete" label="Удалить" severity="danger" />
</template>
```

## useApi

HTTP клиент для **стандартного** MODX connector API.

### Импорт

```javascript
import { useApi } from '@modxprovuecore/useApi'
```

### API

```javascript
const { get, post, put, delete: del } = useApi()
```

| Метод | Описание |
|-------|----------|
| `get(action, params?)` | GET запрос |
| `post(action, data?)` | POST запрос |
| `put(action, data?)` | PUT запрос |
| `delete(action, data?)` | DELETE запрос |

### Примеры

```javascript
const { get, post, put, delete: del } = useApi()

// GET запрос
const users = await get('security/user/getlist', { limit: 20 })

// POST запрос
const result = await post('security/user/create', {
  username: 'newuser',
  email: 'user@example.com'
})

// PUT запрос
await put('security/user/update', {
  id: 1,
  fullname: 'New Name'
})

// DELETE запрос
await del('security/user/remove', { id: 1 })
```

### Формат запроса

useApi работает со стандартным форматом MODX connector:

```
POST /connectors/index.php?action=security/user/getlist
```

::: warning Для компонентов с роутером
Если ваш компонент использует собственный роутер (FastRoute и др.), создайте локальный `request.js`. См. [Собственный API клиент](integration#собственный-api-клиент).
:::

## Комплексный пример

Компонент, использующий все composables:

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLexicon } from '@modxprovuecore/useLexicon'
import { useModx } from '@modxprovuecore/useModx'
import { usePermission } from '@modxprovuecore/usePermission'
import { useApi } from '@modxprovuecore/useApi'

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
