import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useData, useRoute } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'
import { getFlatSideBarLinks } from 'vitepress/dist/client/theme-default/support/sidebar'

function normalizePath(path: string = ''): string {
  const normalized = path
    .replace(/[?#].*$/, '')
    .replace(/\/index(?:\.html?)?$/, '/')
    .replace(/\.html$/, '')
    .replace(/\/+$/, '')

  return normalized || '/'
}

function getNeighbor(candidates: any[], index: number, step: -1 | 1, currentPath: string) {
  let i = index + step

  while (i >= 0 && i < candidates.length) {
    const item = candidates[i]
    const itemPath = normalizePath(item?.link || '')
    if (item?.link && itemPath !== currentPath) {
      return item
    }

    i += step
  }

  return undefined
}

export function usePrevNext(): ComputedRef {
  const { page, theme, frontmatter } = useData()
  const route = useRoute()

  return computed(() => {
    const component = page.value.component

    if (!component) {
      return ''
    }

    const seen = new Set<string>()
    const candidates = getFlatSideBarLinks([component]).filter((link) => {
      if (!link?.link) {
        return false
      }

      const normalized = normalizePath(link.link)
      if (seen.has(normalized)) {
        return false
      }

      seen.add(normalized)
      return true
    })

    const currentPath = normalizePath(route.path)
    let index = candidates.findIndex((link) => normalizePath(link.link) === currentPath)
    if (index === -1) {
      index = candidates.findIndex((link) => isActive(page.value.relativePath, link.link))
    }

    const prevLink = index === -1 ? undefined : getNeighbor(candidates, index, -1, currentPath)
    const nextLink = index === -1 ? undefined : getNeighbor(candidates, index, 1, currentPath)

    const hidePrev =
      (theme.value.docFooter?.prev === false && !frontmatter.value.prev) ||
      frontmatter.value.prev === false

    const hideNext =
      (theme.value.docFooter?.next === false && !frontmatter.value.next) ||
      frontmatter.value.next === false

    return {
      prev: hidePrev
        ? undefined
        : {
            text: (typeof frontmatter.value.prev === 'string'
              ? frontmatter.value.prev
              : typeof frontmatter.value.prev === 'object'
                  ? frontmatter.value.prev.text
                  : undefined) ??
                prevLink?.docFooterText ??
                prevLink?.text,
            link: (typeof frontmatter.value.prev === 'object'
              ? frontmatter.value.prev.link
              : undefined) ?? prevLink?.link
          },
      next: hideNext
        ? undefined
        : {
            text: (typeof frontmatter.value.next === 'string'
              ? frontmatter.value.next
              : typeof frontmatter.value.next === 'object'
                  ? frontmatter.value.next.text
                  : undefined) ??
                nextLink?.docFooterText ??
                nextLink?.text,
            link: (typeof frontmatter.value.next === 'object'
              ? frontmatter.value.next.link
              : undefined) ?? nextLink?.link
          },
    }
  })
}
