import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { inBrowser, onContentUpdated, useRouter } from 'vitepress'

const DEFAULT_KEY = 'vitepress:default-syntax'
const DEFAULT_LABELS = ['fenom', 'modx']

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function getBlockSyntax(block: Element, labels: string[]): string | undefined {
  return labels.find(label => block.classList.contains(`language-${label}`))
}

function setGroupSyntax(group: Element, syntax: string, labels: string[]): void {
  const blocks = group.querySelector('.blocks')
  if (!blocks) {
    return
  }

  const children = Array.from(blocks.children)
  const index = children.findIndex(child => getBlockSyntax(child, labels) === syntax)
  if (index < 0) {
    return
  }

  const inputs = Array.from(group.querySelectorAll('.tabs input')) as HTMLInputElement[]
  const input = inputs[index]
  if (!input) {
    return
  }

  if (!input.checked) {
    input.checked = true
  }

  children.forEach((child, i) => {
    child.classList.toggle('active', i === index)
  })
}

function setSyntax(
  syntax: string,
  labels: string[],
  exclude?: Element | null,
): void {
  document.querySelectorAll('.vp-code-group').forEach((group) => {
    if (exclude && group === exclude) {
      return
    }

    setGroupSyntax(group, syntax, labels)
  })
}

/**
 * Remembers the last chosen Fenom/MODX tab and restores it across code-groups and pages.
 * Switches tabs by updating radio + `.active` (no `.click()`), so VitePress does not
 * call `scrollIntoView` on every synced group.
 */
export function useSyntaxSwitcher(
  key = DEFAULT_KEY,
  labels: string[] = DEFAULT_LABELS,
): void {
  if (!inBrowser) {
    return
  }

  const { route } = useRouter()
  const normalizedLabels = labels.map(normalize)

  const applySaved = () => {
    const saved = localStorage.getItem(key)
    if (!saved) {
      return
    }

    const syntax = normalize(saved)
    if (!normalizedLabels.includes(syntax)) {
      return
    }

    setSyntax(syntax, normalizedLabels)
  }

  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement
    if (!e.isTrusted || !target.matches('.vp-code-group .tabs label')) {
      return
    }

    const group = target.closest('.vp-code-group')
    if (!group) {
      return
    }

    const forId = target.getAttribute('for')
    if (!forId) {
      return
    }

    const input = group.querySelector(`#${CSS.escape(forId)}`)
    if (!(input instanceof HTMLInputElement)) {
      return
    }

    const inputs = Array.from(group.querySelectorAll('.tabs input'))
    const index = inputs.indexOf(input)
    if (index < 0) {
      return
    }

    const block = group.querySelector('.blocks')?.children[index]
    if (!block) {
      return
    }

    const syntax = getBlockSyntax(block, normalizedLabels)
    if (!syntax) {
      return
    }

    localStorage.setItem(key, syntax)
    setSyntax(syntax, normalizedLabels, group)
  }

  onMounted(() => {
    window.addEventListener('click', handleClick)
  })

  onUnmounted(() => {
    window.removeEventListener('click', handleClick)
  })

  watch(
    () => route.path,
    () => {
      nextTick(applySaved)
    },
    { immediate: true },
  )

  // After VitePress (dev) resets groups to the first tab on HMR/content update
  onContentUpdated(() => {
    nextTick(applySaved)
  })
}
