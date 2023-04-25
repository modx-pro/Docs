import type { PageData, SiteData } from 'vitepress'
import { Ref, ComputedRef, computed } from 'vue'
import { PathItem, findPath } from '../utils'

export function useBreadcrumbs(
  pageData: Ref<PageData>,
  site: Ref<SiteData>
): ComputedRef<PathItem[]> {
  return computed(() => findPath(pageData.value, site.value))
}
