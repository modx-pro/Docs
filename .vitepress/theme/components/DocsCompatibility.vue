<script setup lang="ts">
import { computed } from 'vue'
import { compatibilityLabels } from '../compatibility'

const props = defineProps<{
  values?: string[]
}>()

const labels = computed(() => compatibilityLabels(props.values))
</script>

<template>
  <ul v-if="labels.length" class="DocsCompatibility">
    <li v-for="label in labels" :key="label">{{ label }}</li>
  </ul>
</template>

<style scoped>
.DocsCompatibility {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.DocsCompatibility li {
  padding: 2px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--vp-c-text-2);
}
</style>
