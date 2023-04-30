import { computed } from 'vue'
import { findPath } from '../utils'
import type { Ref, ComputedRef } from 'vue'
import type { PageData, SiteData } from 'vitepress'
import type { PathItem } from '../utils'

export function useBreadcrumbs(
  pageData: Ref<PageData>,
  site: Ref<SiteData>
): ComputedRef<PathItem[]> {
  return computed(() => findPath(pageData.value, site.value))
}
