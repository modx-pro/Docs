---
title: Практики и CRUD
description: Структура Vue Extra и сценарий list → form → toast на VueTools 1.2.1
---

# Практики и CRUD

Сценарий list → form → toast для VueTools **1.2.1-pl**. Платформенных `useForm`, `useDataTable`, `ModxDataTable` нет: UI из PrimeVue, логика из шести `@vuetools/*`.

## Структура Extra

```text
mycomponent/
├── assets/components/mycomponent/
│   ├── connector.php
│   ├── css/mgr/vue-dist/          # my-widget.min.css
│   └── js/mgr/
│       ├── sections/               # ExtJS вкладки
│       └── vue-dist/               # my-widget.min.js
├── core/components/mycomponent/
│   ├── processors/mgr/item/        # getlist, get, create, update, remove
│   ├── src/                        # PHP-сервис Extra
│   └── elements/                   # плагины, сниппеты при необходимости
└── src/mgr/                        # исходники Vue (Vite)
    ├── main.js                     # init + window.MyComponentWidget
    ├── components/
    │   ├── ItemList.vue
    │   └── ItemForm.vue
    ├── stores/items.js             # Pinia
    └── request.js                  # только если свой роутер, не useApi
```

Чеклист Vite / контроллера: [Интеграция](integration).

## Публичный API VueTools

Используйте только контракт из [Интеграция → PHP-сервис](integration#php-service) и [Composables](composables). Не опирайтесь на внутренности `src/` пакета VueTools и на отсутствие ключа `@vuetools/index`.

| Слой | Берите | Не берите |
|------|--------|-----------|
| Runtime | `vue`, `pinia`, `primevue` из Import Map | копии в `node_modules` Extra в бандл |
| Composable | `@vuetools/useApi` и остальные пять ключей | выдуманные `@vuetools/useForm`, `useManager` |
| UI | `DataTable`, `Dialog`, `Toast`, `Button`, поля из `primevue` | «компоненты VueTools» с теми же именами |
| Toast / Dialog API | `useToast`, `ToastService` из `primevue` | `@vuetools/useToast` (ключа нет) |

## Права и i18n

```javascript
import { usePermission } from '@vuetools/usePermission'
import { useLexicon } from '@vuetools/useLexicon'

const { can } = usePermission()
const { _ } = useLexicon()

const canEdit = can('mycomponent_save')
```

Топики грузите в контроллере (`getLanguageTopics`), не через `useLexicon().load` (метод не реализован). Для подстановок предпочитайте `[[+name]]` или `{name}`: форма `:name` имеет известную дыру ([issue #67](https://github.com/modx-pro/vueTools/issues/67)).

## State

Pinia из Import Map. Список и выбранная запись храните в store Extra. Права и лексикон не кэшируйте в Pinia: вызывайте composable в компоненте или в действиях store.

## API к процессорам

Для стандартного connector:

- список и чтение: `useApi().get('mgr/item/getlist', { start, limit, query })`;
- создание / обновление / удаление: `post` **без** `{ json: true }` (FormData);
- не рассчитывайте на `put` / `delete` и JSON-тело на штатном connector ([#52](https://github.com/modx-pro/vueTools/issues/52)).

Свой роутер: локальный `request.js`, см. [Интеграция](integration#own-api-client).

## CRUD: list → filter → form → toast

Один экран: таблица, фильтр, диалог формы, тосты. Имена процессоров замените на свои.

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

Форма ответа зависит от процессора. `useApi` возвращает разобранный JSON и при `success: false` бросает ошибку с полем `data`. HTTP вне 2xx: обычный `Error` без `data`.

### Список и фильтр

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

В точке входа нужен `app.use(ToastService)` (см. [Быстрый старт](quick-start)).

### Форма

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

## Что не описывать как готовое

Пока нет в `src/` VueTools (ждут код / [#43](https://github.com/modx-pro/vueTools/issues/43)):

- `useManager`, `useForm`, `useDataTable`;
- `ModxDataTable` и picker’ы ресурса / пользователя MODX;
- Form kit и Toolbar как компоненты платформы (есть PrimeVue `Toolbar` и поля).

Сценарий выше закрывает CRUD на текущем контракте 1.2.1 без этих имён.
