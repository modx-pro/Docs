<script lang="ts" setup>
//@ts-expect-error
import localSearchIndex from '@localSearchIndex'
import {
  computedAsync,
  debouncedWatch,
  onKeyStroke,
  useEventListener,
  useScrollLock,
  useSessionStorage
} from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import Mark from 'mark.js/src/vanilla.js'
import MiniSearch, { type SearchResult } from 'minisearch'
import { useRouter } from 'vitepress'
import {
  computed,
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  type Ref
} from 'vue'
import { useData } from 'vitepress'
import { createTranslate } from 'vitepress/dist/client/theme-default/support/translation'
import DocsSearchBar from './DocsSearchBar.vue'

defineProps<{
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const el = shallowRef<HTMLElement>()
const resultsEl = shallowRef<HTMLElement>()
const body = shallowRef<HTMLElement>()

/* Search */

const searchIndexData = shallowRef(localSearchIndex)

// hmr
if (import.meta.hot) {
  import.meta.hot.accept('/@localSearchIndex', (m) => {
    if (m) {
      searchIndexData.value = m.default
    }
  })
}

interface Result {
  title: string
  titles: string[]
  text?: string
}

const vitePressData = useData()
const { activate } = useFocusTrap(el, {
  immediate: true,
  allowOutsideClick: true,
  clickOutsideDeactivates: true,
  escapeDeactivates: true
})
const { localeIndex, theme } = vitePressData
const searchIndex = computedAsync(async () =>
  markRaw(
    MiniSearch.loadJSON<Result>(
      (await searchIndexData.value[localeIndex.value]?.())?.default,
      {
        fields: ['title', 'titles', 'text', 'test'],
        storeFields: ['title', 'titles', 'test'],
        searchOptions: {
          fuzzy: 0.2,
          prefix: true,
          boost: { title: 4, text: 1, titles: 1 },
          boostDocument: (documentId) => {
            const component = documentId.match(/components\/([^\/#]*)/)?.[1]
            const pathArr = documentId.replace(/\#.*/, '').replace(/^\//, '').replace(/\/$/, '').split('/')

            if (pathArr.pop().toLowerCase() === filterText.value) {
              return 3.0
            }

            if (component === filterText.value) {
              return 2.0
            }

            return 1.0
          }
        }
      }
    )
  )
)

const disableQueryPersistence = computed(() => {
  return (
    theme.value.search?.provider === 'local' &&
    theme.value.search.options?.disableQueryPersistence === true
  )
})

const filterText = disableQueryPersistence.value
  ? ref('')
  : useSessionStorage('vitepress:local-search-filter', '')

const results: Ref<(SearchResult & Result)[]> = shallowRef([])
const enableNoResults = ref(false)

watch(filterText, () => {
  enableNoResults.value = false
})

const mark = computedAsync(async () => {
  if (!resultsEl.value) return
  return markRaw(new Mark(resultsEl.value))
}, null)

debouncedWatch(
  () => [searchIndex.value, filterText.value] as const,
  async ([index, filterTextValue], old, onCleanup) => {
    let canceled = false
    onCleanup(() => {
      canceled = true
    })

    if (!index) return

    // Search
    results.value = index
      .search(filterTextValue)
      .slice(0, 16) as (SearchResult & Result)[]
    enableNoResults.value = true
    if (canceled) return
    const c = new Map<string, Map<string, string>>()
    const terms = new Set<string>()

    results.value = results.value.map((r) => {
      const [id, anchor] = r.id.split('#')
      const map = c.get(id)
      const text = map?.get(anchor) ?? ''
      for (const term in r.match) {
        terms.add(term)
      }

      return { ...r, text }
    })

    await nextTick()
    if (canceled) return

    await new Promise((r) => {
      mark.value?.unmark({
        done: () => {
          mark.value?.markRegExp(formMarkRegex(terms), { done: r })
        }
      })
    })

    const excerpts = el.value?.querySelectorAll('.result .excerpt') ?? []
    for (const excerpt of excerpts) {
      excerpt
        .querySelector('mark[data-markjs="true"]')
        ?.scrollIntoView({ block: 'center' })
    }
    // FIXME: without this whole page scrolls to the bottom
    resultsEl.value?.firstElementChild?.scrollIntoView({ block: 'start' })
  },
  { debounce: 200, immediate: true }
)

/* Search keyboard selection */

const selectedIndex = ref(0)
const disableMouseOver = ref(false)

watch(results, () => {
  selectedIndex.value = 0
  scrollToSelectedResult()
})

function scrollToSelectedResult() {
  nextTick(() => {
    const selectedEl = document.querySelector('.result.selected')
    if (selectedEl) {
      selectedEl.scrollIntoView({
        block: 'nearest'
      })
    }
  })
}

onKeyStroke('ArrowUp', (event) => {
  event.preventDefault()
  selectedIndex.value--
  if (selectedIndex.value < 0) {
    selectedIndex.value = results.value.length - 1
  }
  disableMouseOver.value = true
  scrollToSelectedResult()
})

onKeyStroke('ArrowDown', (event) => {
  event.preventDefault()
  selectedIndex.value++
  if (selectedIndex.value >= results.value.length) {
    selectedIndex.value = 0
  }
  disableMouseOver.value = true
  scrollToSelectedResult()
})

const router = useRouter()

onKeyStroke('Enter', () => {
  const selectedPackage = results.value[selectedIndex.value]
  if (selectedPackage) {
    router.go(selectedPackage.id)
    emit('close')
  }
})

onKeyStroke('Escape', () => {
  emit('close')
})

// Translations
const $t = createTranslate(theme.value.search?.options)

// Back

onMounted(() => {
  // Prevents going to previous site
  window.history.pushState(null, '', null)
})

useEventListener('popstate', (event) => {
  event.preventDefault()
  emit('close')
})

/** Lock body */
const isLocked = useScrollLock(body)

onMounted(() => {
  body.value = document.body
  nextTick(() => {
    isLocked.value = true
    nextTick().then(() => activate())
  })
})

onBeforeUnmount(() => {
  isLocked.value = false
})

function formMarkRegex(terms: Set<string>) {
  return new RegExp(
    [...terms]
      .sort((a, b) => b.length - a.length)
      .map((term) => {
        return `(${term
          .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
          .replace(/-/g, '\\x2d')})`
      })
      .join('|'),
    'gi'
  )
}
</script>

<template>
  <Teleport to="body">
    <div ref="el" class="VPLocalSearchBox" aria-modal="true">
      <div class="backdrop" @click="$emit('close')" />

      <div class="shell">
        <div class="header">
          <DocsSearchBar
            v-model="filterText"
            :placeholder="placeholder"
            @close="$emit('close')"
          />
        </div>

        <div
          ref="resultsEl"
          class="results"
          @mousemove="disableMouseOver = false"
        >
          <a
            v-for="(p, index) in results"
            :key="p.id"
            :href="p.id"
            class="result"
            :class="{
              selected: selectedIndex === index
            }"
            :aria-label="[...p.titles, p.title].join(' > ')"
            @mouseenter="!disableMouseOver && (selectedIndex = index)"
            @focusin="selectedIndex = index"
            @click="$emit('close')"
          >
            <div>
              <div class="titles">
                <span class="title-icon">#</span>
                <span v-for="(t, index) in p.titles" :key="index" class="title">
                  <span class="text" v-html="t" />
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m9 18l6-6l-6-6"
                    />
                  </svg>
                </span>
                <span class="title main">
                  <span class="text" v-html="p.title" />
                </span>
              </div>
            </div>
          </a>

          <div
            v-if="filterText && !results.length && enableNoResults"
            class="no-results"
          >
            {{ $t('modal.noResultsText') }} "<strong>{{ filterText }}</strong
            >"
          </div>
        </div>

        <div class="search-keyboard-shortcuts">
          <span>
            <kbd :aria-label="$t('modal.footer.navigateUpKeyAriaLabel')">
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19V5m-7 7l7-7l7 7"
                />
              </svg>
            </kbd>
            <kbd :aria-label="$t('modal.footer.navigateDownKeyAriaLabel')">
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5v14m7-7l-7 7l-7-7"
                />
              </svg>
            </kbd>
            {{ $t('modal.footer.navigateText') }}
          </span>
          <span>
            <kbd :aria-label="$t('modal.footer.selectKeyAriaLabel')">
              <svg width="14" height="14" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentcolor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="m9 10l-5 5l5 5" />
                  <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                </g>
              </svg>
            </kbd>
            {{ $t('modal.footer.selectText') }}
          </span>
          <span>
            <kbd :aria-label="$t('modal.footer.closeKeyAriaLabel')">esc</kbd>
            {{ $t('modal.footer.closeText') }}
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.VPLocalSearchBox {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: flex;
}

.backdrop {
  position: absolute;
  inset: 0;
  background: var(--vp-backdrop-bg-color);
  transition: opacity 0.5s;
}

.shell {
  position: relative;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  /* gap: 16px; */
  background: var(--vp-local-search-bg);
  width: min(100vw - 60px, 900px);
  height: min-content;
  max-height: min(100vh - 128px, 900px);
  border-radius: 6px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .shell {
    margin: 0;
    width: 100vw;
    height: 100vh;
    max-height: none;
    border-radius: 0;
  }
}

.header {
  padding: 12px;
}

.search-keyboard-shortcuts {
  font-size: 0.8rem;
  opacity: 75%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  line-height: 14px;
  padding: 12px;
  background-color: var(--vp-c-bg);
  box-shadow: var(--vp-local-search-footer-shadow);
}

.search-keyboard-shortcuts span {
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 768px) {
  .search-keyboard-shortcuts {
    display: none;
  }
}

.search-keyboard-shortcuts kbd {
  background: rgba(128, 128, 128, 0.1);
  border-radius: 4px;
  padding: 3px 6px;
  min-width: 24px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border: 1px solid rgba(128, 128, 128, 0.15);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.results {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 12px;
}

.result {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  transition: none;
  line-height: 1rem;
  background-color: var(--vp-local-search-result-bg);
  box-shadow: var(--vp-local-search-result-shadow);
  outline: none;
}

.result > div {
  margin: 12px;
  width: 100%;
  overflow: hidden;
}

@media (max-width: 768px) {
  .result > div {
    margin: 10px 12px;
  }
}

.titles {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  position: relative;
  z-index: 1001;
  padding: 2px 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 4px;
}

.title.main {
  font-weight: 500;
}

.title-icon {
  opacity: 0.5;
  font-weight: 500;
  color: var(--vp-c-brand);
}

.title svg {
  opacity: 0.5;
}

.result.selected {
  --vp-local-search-result-bg: var(--vp-local-search-result-selected-bg);
  border-color: var(--vp-local-search-result-selected-border);
  background-color: var(--vp-local-search-result-selected-border);
}

.titles :deep(mark) {
  background-color: var(--vp-local-search-highlight-bg);
  color: var(--vp-local-search-highlight-text);
  border-radius: 2px;
  padding: 0 2px;
}

.result.selected .titles,
.result.selected .titles :deep(mark),
.result.selected .title-icon {
  color: var(--vp-c-white) !important;
}

.no-results {
  font-size: 0.9rem;
  text-align: center;
  padding: 12px;
}

svg {
  flex: none;
}
</style>
