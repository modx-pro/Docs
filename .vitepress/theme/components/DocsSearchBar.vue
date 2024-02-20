<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useData } from 'vitepress'
import { createSearchTranslate } from 'vitepress/dist/client/theme-default/support/translation'
import { v4 as uuidv4 } from 'uuid'

const uid = uuidv4()
const { theme } = useData()
const translate = createSearchTranslate(theme.value.search?.options)
withDefaults(defineProps<{
  modelValue: string
  placeholder: string
  backButton?: boolean
  disabled?: boolean
}>(), {
  backButton: true,
})

const emit = defineEmits(['update:modelValue', 'close'])

/* Search input focus */

const searchInput = ref<HTMLInputElement>()

function focusSearchInput(select = true) {
  searchInput.value?.focus()
  select && searchInput.value?.select()
}

onMounted(() => {
  focusSearchInput()
})

function onSearchBarClick(event: PointerEvent) {
  if (event.pointerType === 'mouse') {
    focusSearchInput()
  }
}

function resetSearch() {
  emit('update:modelValue', '')
  nextTick().then(() => focusSearchInput(false))
}
</script>

<template>
  <form class="search-bar" @pointerup="onSearchBarClick($event)" @submit.prevent="">
    <label :title="placeholder" id="localsearch-label" :for="uid">
      <span aria-hidden="true" class="vpi-search search-icon local-search-icon" />
    </label>
    <div v-if="backButton" class="search-actions before">
      <button class="back-button" :title="translate('modal.backButtonTitle')" @click="$emit('close')"
        :disabled="disabled">
        <span class="vpi-arrow-left local-search-icon" />
      </button>
    </div>
    <input ref="searchInput" :id="uid" :value="modelValue" :placeholder="placeholder" class="search-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <div class="search-actions">
      <button v-if="modelValue" class="clear-button" :title="translate('modal.resetButtonTitle')" @click="resetSearch">
        <span class="vpi-delete local-search-icon" />
      </button>
    </div>
  </form>
</template>

<style scoped>
.search-bar {
  border: 1px solid var(--vp-c-gray-soft);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 6px 8px;
  height: 56px;
  cursor: text;
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-1);
}

@media (max-width: 767px) {
  .search-bar {
    padding: 0 8px;
  }
}

.search-bar:focus-within {
  border-color: var(--vp-c-border);
}

.search-icon {
  margin: 8px;
}

@media (max-width: 767px) {
  .search-icon {
    display: none;
  }
}

.search-input {
  padding: 6px 12px;
  font-size: inherit;
  width: 100%;
}

@media (max-width: 767px) {
  .search-input {
    padding: 6px 4px;
  }
}

.search-actions {
  display: flex;
  gap: 4px;
}

@media (any-pointer: coarse) {
  .search-actions {
    gap: 8px;
  }
}

@media (min-width: 769px) {
  .search-actions.before {
    display: none;
  }
}

.search-actions button {
  padding: 8px;
}

.search-actions button:hover {
  color: var(--vp-c-brand-1);
}

.local-search-icon {
  display: block;
  font-size: 18px;
}
</style>
