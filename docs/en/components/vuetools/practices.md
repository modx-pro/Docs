---
title: Practices and CRUD
description: Vue Extra layout and list → form → toast on VueTools 1.2.1
---

# Practices and CRUD

List → form → toast for VueTools **1.2.1-pl**. There are no platform `useForm`, `useDataTable`, or `ModxDataTable`: UI from PrimeVue, logic from the six `@vuetools/*` keys.

## Extra layout

```text
mycomponent/
├── assets/components/mycomponent/
│   ├── connector.php
│   ├── css/mgr/vue-dist/          # my-widget.min.css
│   └── js/mgr/
│       ├── sections/               # ExtJS tabs
│       └── vue-dist/               # my-widget.min.js
├── core/components/mycomponent/
│   ├── processors/mgr/item/        # getlist, get, create, update, remove
│   ├── src/                        # Extra PHP service
│   └── elements/                   # plugins, snippets if needed
└── src/mgr/                        # Vue sources (Vite)
    ├── main.js                     # init + window.MyComponentWidget
    ├── components/
    │   ├── ItemList.vue
    │   └── ItemForm.vue
    ├── stores/items.js             # Pinia
    └── request.js                  # only for a custom router, not useApi
```

Vite / controller checklist: [Integration](integration).

## VueTools public API

Use only the contract from [Integration → PHP service](integration#php-service) and [Composables](composables). Do not rely on VueTools package `src/` internals or on the absence of an `@vuetools/index` key.

| Layer | Use | Do not use |
|------|--------|-----------|
| Runtime | `vue`, `pinia`, `primevue` from Import Map | copies from Extra `node_modules` in the bundle |
| Composable | `@vuetools/useApi` and the other five keys | invented `@vuetools/useForm`, `useManager` |
| UI | `DataTable`, `Dialog`, `Toast`, `Button`, fields from `primevue` | “VueTools components” with the same names |
| Toast / Dialog API | `useToast`, `ToastService` from `primevue` | `@vuetools/useToast` (no Import Map key) |

## Permissions and i18n

```javascript
import { usePermission } from '@vuetools/usePermission'
import { useLexicon } from '@vuetools/useLexicon'

const { can } = usePermission()
const { _ } = useLexicon()

const canEdit = can('mycomponent_save')
```

Load topics in the controller (`getLanguageTopics`), not via `useLexicon().load` (not implemented). For placeholders prefer `[[+name]]` or `{name}`: the `:name` form has a known gap ([issue #67](https://github.com/modx-pro/vueTools/issues/67)).

## State

Pinia from Import Map. Keep list and selected row in the Extra store. Do not cache permissions or lexicon in Pinia: call composables in the component or in store actions.

## API to processors

For the standard connector:

- list and read: `useApi().get('mgr/item/getlist', { start, limit, query })`;
- create / update / delete: `post` **without** `{ json: true }` (FormData);
- do not rely on `put` / `delete` or a JSON body on the stock connector ([#52](https://github.com/modx-pro/vueTools/issues/52)).

Custom router: local `request.js`, see [Integration](integration#own-api-client).

## CRUD: list → filter → form → toast

One screen: table, filter, form dialog, toasts. Replace processor names with your own.

### Store

```javascript
import { defineStore } from 'pinia'
import { useApi } from '@vuetools/useApi'

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [],
    total: 0,
    query: '',
    loading: false
  }),
  actions: {
    async fetchList() {
      const { get } = useApi()
      this.loading = true
      try {
        const res = await get('mgr/item/getlist', {
          start: 0,
          limit: 20,
          query: this.query || undefined
        })
        this.items = res.results || res.object || []
        this.total = res.total ?? this.items.length
      } finally {
        this.loading = false
      }
    },
    async save(payload) {
      const { post } = useApi()
      const action = payload.id ? 'mgr/item/update' : 'mgr/item/create'
      return post(action, payload)
    },
    async remove(id) {
      const { post } = useApi()
      return post('mgr/item/remove', { id })
    }
  }
})
```

Response shape depends on the processor. `useApi` returns parsed JSON and throws on `success: false` with a `data` field. HTTP outside 2xx: plain `Error` without `data`.

### List and filter

```vue
<script setup>
import { onMounted, ref } from 'vue'
import { Button, Column, DataTable, Dialog, InputText, Toast, useToast } from 'primevue'
import { useLexicon } from '@vuetools/useLexicon'
import { usePermission } from '@vuetools/usePermission'
import { useItemsStore } from '../stores/items'
import ItemForm from './ItemForm.vue'

const store = useItemsStore()
const { _ } = useLexicon()
const { can } = usePermission()
const toast = useToast()

const visible = ref(false)
const editing = ref(null)

onMounted(() => store.fetchList())

function openCreate() {
  editing.value = { name: '' }
  visible.value = true
}

function openEdit(row) {
  editing.value = { ...row }
  visible.value = true
}

async function onSave(payload) {
  try {
    await store.save(payload)
    visible.value = false
    toast.add({ severity: 'success', summary: _('mycomponent_saved'), life: 3000 })
    await store.fetchList()
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: _('mycomponent_error'),
      detail: e.message || String(e),
      life: 5000
    })
  }
}

async function onRemove(row) {
  try {
    await store.remove(row.id)
    toast.add({ severity: 'success', summary: _('mycomponent_removed'), life: 3000 })
    await store.fetchList()
  } catch (e) {
    toast.add({ severity: 'error', summary: _('mycomponent_error'), detail: e.message, life: 5000 })
  }
}
</script>

<template>
  <div class="my-component">
    <Toast />
    <div class="toolbar">
      <InputText
        v-model="store.query"
        :placeholder="_('mycomponent_search')"
        @keyup.enter="store.fetchList()"
      />
      <Button :label="_('mycomponent_filter')" @click="store.fetchList()" />
      <Button
        v-if="can('mycomponent_save')"
        :label="_('mycomponent_create')"
        @click="openCreate"
      />
    </div>

    <DataTable :value="store.items" :loading="store.loading" data-key="id">
      <Column field="name" :header="_('mycomponent_name')" />
      <Column :header="_('mycomponent_actions')">
        <template #body="{ data }">
          <Button
            v-if="can('mycomponent_save')"
            :label="_('mycomponent_edit')"
            text
            @click="openEdit(data)"
          />
          <Button
            v-if="can('mycomponent_remove')"
            :label="_('mycomponent_remove')"
            text
            severity="danger"
            @click="onRemove(data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="visible" modal :header="_('mycomponent_form')">
      <ItemForm v-if="editing" :model="editing" @save="onSave" @cancel="visible = false" />
    </Dialog>
  </div>
</template>
```

The entry point needs `app.use(ToastService)` (see [Quick Start](quick-start)).

### Form

```vue
<script setup>
import { reactive, watch } from 'vue'
import { Button, InputText } from 'primevue'
import { useLexicon } from '@vuetools/useLexicon'

const props = defineProps({ model: { type: Object, required: true } })
const emit = defineEmits(['save', 'cancel'])
const { _ } = useLexicon()
const form = reactive({ id: null, name: '' })

watch(
  () => props.model,
  (m) => Object.assign(form, { id: null, name: '', ...m }),
  { immediate: true }
)
</script>

<template>
  <form @submit.prevent="emit('save', { ...form })">
    <label>{{ _('mycomponent_name') }}</label>
    <InputText v-model="form.name" class="w-full" />
    <div class="actions">
      <Button type="button" :label="_('mycomponent_cancel')" text @click="emit('cancel')" />
      <Button type="submit" :label="_('mycomponent_save')" />
    </div>
  </form>
</template>
```

## Do not document as shipped

Not in VueTools `src/` yet (awaiting code / [#43](https://github.com/modx-pro/vueTools/issues/43)):

- `useManager`, `useForm`, `useDataTable`;
- `ModxDataTable` and MODX resource / user pickers;
- Form kit and Toolbar as platform components (PrimeVue `Toolbar` and fields exist).

The flow above covers CRUD on the current 1.2.1 contract without those names.
