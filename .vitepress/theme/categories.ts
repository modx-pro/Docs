// Категории повторяют каталог modstore.pro, порядок задаёт вывод на странице компонентов
const CATEGORIES: Array<{ key: string, ru: string, en: string }> = [
  { key: 'catalog', ru: 'Каталог, поиск, фильтрация', en: 'Catalog, search, filters' },
  { key: 'orders', ru: 'Корзина, заказы', en: 'Cart, orders' },
  { key: 'payment', ru: 'Платёжные системы', en: 'Payment systems' },
  { key: 'delivery', ru: 'Службы доставки', en: 'Delivery services' },
  { key: 'discounts', ru: 'Акции и скидки', en: 'Promotions and discounts' },
  { key: 'import-export', ru: 'Импорт, экспорт', en: 'Import, export' },
  { key: 'users', ru: 'Пользователи', en: 'Users' },
  { key: 'content', ru: 'Работа с текстом', en: 'Text and content' },
  { key: 'media', ru: 'Фото, видео и файлы', en: 'Photos, video and files' },
  { key: 'maps', ru: 'Карты и Geo IP', en: 'Maps and Geo IP' },
  { key: 'notifications', ru: 'Оповещения, рассылки', en: 'Notifications, mailing' },
  { key: 'booking', ru: 'Календари и бронирование', en: 'Calendars and booking' },
  { key: 'themes', ru: 'Готовые сайты, темы', en: 'Site themes' },
  { key: 'utilities', ru: 'Утилиты', en: 'Utilities' },
  { key: 'other', ru: 'Другое', en: 'Other' },
]

export const categoryKeys: string[] = CATEGORIES.map(category => category.key)

export function categoryLabel(key: string, locale: string): string {
  const category = CATEGORIES.find(item => item.key === key)
  if (!category) return key
  return locale === 'en' ? category.en : category.ru
}
