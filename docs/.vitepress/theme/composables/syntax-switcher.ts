import { onMounted, watch } from 'vue'
import { inBrowser, useRouter } from 'vitepress'

function setSyntax(
  syntax: string,
  target?: HTMLLabelElement,
) {
  const allGroups = document.querySelectorAll('.vp-code-group')
  const group = target && target.closest('.vp-code-group')

  for (let i = 0; i < allGroups.length; i++) {
    if (group && allGroups[i] === group) continue
    Array.from(allGroups[i].querySelectorAll('label')).find(el => el.innerText === syntax)?.click()
  }
}

export function useSyntaxSwitcher(
  key: string,
  labels: Array<string>,
): void {
  if (inBrowser) {
    onMounted(() => {
      const { route } = useRouter()
      watch(
        () => route.data.relativePath,
        () => {
        const defaultSyntax = localStorage.getItem(key)
        defaultSyntax && setSyntax(defaultSyntax)
      }, {
        immediate: true,
        flush: 'post',
      })
    })

    window.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLLabelElement

      if (
        !target.matches('.vp-code-group .tabs label') ||
        !e.isTrusted
      ) {
        return
      }

      const syntax = target.innerText
      if (!labels.some(label => label === syntax)) {
        return
      }

      localStorage.setItem(key, syntax)
      setSyntax(syntax, target)
    })
  }
}
