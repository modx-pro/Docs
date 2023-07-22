import { computed } from 'vue'
import { withBase } from 'vitepress'

export interface Sponsors {
  tier: string
  size?: 'medium' | 'big'
  items: Sponsor[]
}

export interface Sponsor {
  name: string
  img: string
  url: string
}

export function useSponsor(lang) {
  return computed(() => {
    return [
      {
        tier: lang.value === 'ru' ? 'Технические спонсоры' : 'Technical sponsors',
        size: 'big',
        items: [
          {
            name: 'modhost.pro',
            img: withBase('modhost.svg'),
            url: 'https://modhost.pro',
          },
          {
            name: 'codesolution.io',
            img: withBase('codesolution.svg'),
            url: 'https://codesolution.io',
          },
        ],
      }
    ]
  })
}
