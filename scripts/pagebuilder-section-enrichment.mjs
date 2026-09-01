/** benefits, compose (page flow), related — merged into SECTION_META in getSectionCopy */

export const SECTION_ENRICHMENT = {
  hero: {
    ru: {
      benefits: '- Редактор меняет заголовок, текст и кнопку без правки Fenom\n- Фон и выравнивание задаются полями, не CSS в шаблоне\n- Chunk `pagebuilder_hero` уже размечен под типичный первый экран',
      compose: '- Лендинг SaaS: [Hero](hero) → [Преимущества](features) → [Цифры](stats) → [Тарифы](pricing_table) → [CTA](cta)\n- Магазин: [Hero](hero) → [Сетка товаров](products_grid) → [Отзывы](testimonials) → [Контакты](contact)\n- Услуга: [Hero](hero) → [Карточки](cards) → [FAQ](faq) → [Форма](contact_form)',
      related: '- [CTA](cta), если не нужен блок на всю ширину с фоном\n- [Промо-баннер](promo_banner) для акции в каталоге (Pro, miniShop3)',
    },
    en: {
      benefits: '- Editors change title, text, and button without editing Fenom\n- Background and alignment come from inspector fields, not template CSS\n- Chunk `pagebuilder_hero` ships with `pb-hero` markup',
      compose: '- SaaS landing: [Hero](hero) → [Features](features) → [Stats](stats) → [Pricing](pricing_table) → [CTA](cta)\n- Store: [Hero](hero) → [Products grid](products_grid) → [Testimonials](testimonials) → [Contact](contact)\n- Service: [Hero](hero) → [Cards](cards) → [FAQ](faq) → [Contact form](contact_form)',
      related: '- [CTA](cta) for a compact block without full-width background\n- [Promo banner](promo_banner) for catalog promos (Pro, miniShop3)',
    },
  },
  richtext: {
    ru: {
      benefits: '- Привычный richtext MODX, без отдельного TV на каждый абзац\n- Вставляется между любыми секциями в нужном порядке\n- HTML попадает в `section.data.content` и в Fenom как готовый фрагмент',
      compose: '- Статья: [Hero](hero) → [Текстовый блок](richtext) → [Изображение](image) → [Текстовый блок](richtext)\n- О компании: [Hero](hero) → [Текстовый блок](richtext) → [Команда](team) → [CTA](cta)',
      related: '- [Структурированный контент](structured_content) для длинных статей с блоками Editor.js (Pro)\n- [Вкладки](tabs), если материал логичнее делить на панели',
    },
    en: {
      benefits: '- Familiar MODX richtext, no separate TV per paragraph\n- Drops between any sections in any order\n- HTML lands in `section.data.content` for Fenom output',
      compose: '- Article: [Hero](hero) → [Rich text](richtext) → [Image](image) → [Rich text](richtext)\n- About: [Hero](hero) → [Rich text](richtext) → [Team](team) → [CTA](cta)',
      related: '- [Structured content](structured_content) for long Editor.js posts (Pro)\n- [Tabs](tabs) when content fits panels better',
    },
  },
  gallery: {
    ru: {
      benefits: '- Несколько фото в одной секции с alt и подписью к каждому\n- Repeater в инспекторе: добавили строку, получили кадр на сайте\n- Сетка в chunk, не ручная вёрстка колонок',
      compose: '- Портфолио: [Hero](hero) → [Галерея](gallery) → [CTA](cta)\n- Товар (без MS3): [Текст](richtext) → [Галерея](gallery) → [FAQ](faq)',
      related: '- [Карусель галереи](gallery_carousel), если кадры листают по одному (Pro)\n- [Изображение](image) для одного кадра на всю ширину',
    },
    en: {
      benefits: '- Several images in one section, each with alt and caption\n- Inspector repeater: new row equals new slide on the site\n- Grid markup lives in the chunk, not hand-built columns',
      compose: '- Portfolio: [Hero](hero) → [Gallery](gallery) → [CTA](cta)\n- Product (no MS3): [Rich text](richtext) → [Gallery](gallery) → [FAQ](faq)',
      related: '- [Gallery carousel](gallery_carousel) for one slide at a time (Pro)\n- [Image](image) for a single full-width frame',
    },
  },
  faq: {
    ru: {
      benefits: '- Вопросы правятся списком в инспекторе, порядок перетаскиванием\n- Ответ может быть richtext с ссылками и списками\n- Один блок закрывает типовые возражения на лендинге',
      compose: '- Лендинг: [Hero](hero) → [Преимущества](features) → [FAQ](faq) → [Форма](contact_form)\n- Товар: [Описание](richtext) → [FAQ](faq) → [Похожие товары](related_products)',
      related: '- [Вкладки](tabs) для длинных текстов вместо длинного FAQ\n- [Текстовый блок](richtext), если нужен один текст без структуры воп/ответ',
    },
    en: {
      benefits: '- Questions edit as a repeater list, reorder by drag\n- Answers can be richtext with links and lists\n- One block handles common objections on a landing page',
      compose: '- Landing: [Hero](hero) → [Features](features) → [FAQ](faq) → [Contact form](contact_form)\n- Product: [Rich text](richtext) → [FAQ](faq) → [Related products](related_products)',
      related: '- [Tabs](tabs) for long copy split into panels\n- [Rich text](richtext) for unstructured body text',
    },
  },
  cta: {
    ru: {
      benefits: '- Минимум полей: заголовок, текст, одна кнопка\n- Ставится в конец воронки без дублирования hero\n- Класс `pb-cta` уже в теме пакета',
      compose: '- Лендинг: … → [Отзывы](testimonials) → [CTA](cta) → [Контакты](contact)\n- Блог: [Записи](blog_posts) → [CTA](cta) на подписку',
      related: '- [Hero](hero) для первого экрана с фоном\n- [Форма обратной связи](contact_form), если нужен сбор полей, а не одна ссылка',
    },
    en: {
      benefits: '- Few fields: title, text, one button\n- Closes the funnel without repeating hero\n- `pb-cta` class ships with the package theme',
      compose: '- Landing: … → [Testimonials](testimonials) → [CTA](cta) → [Contact](contact)\n- Blog: [Blog posts](blog_posts) → [CTA](cta) for newsletter',
      related: '- [Hero](hero) for above-the-fold with background\n- [Contact form](contact_form) when you need fields, not a single link',
    },
  },
  spacer: {
    ru: {
      benefits: '- Ритм страницы без пустых div в шаблоне\n- Четыре высоты из коробки (`sm`–`xl`)\n- Не ломает порядок секций при правках контента',
      compose: '- [Hero](hero) → [Spacer](spacer) → [Карточки](cards)\n- Плотная [Галерея](gallery) → [Spacer](spacer) → [CTA](cta)',
      related: '- Отступы в CSS темы, если нужен pixel-perfect на всём сайте\n- [Текстовый блок](richtext) с коротким абзацем, если нужен текст между блоками',
    },
    en: {
      benefits: '- Page rhythm without empty divs in templates\n- Four heights out of the box (`sm`–`xl`)\n- Section order stays clean when editors change content',
      compose: '- [Hero](hero) → [Spacer](spacer) → [Cards](cards)\n- Dense [Gallery](gallery) → [Spacer](spacer) → [CTA](cta)',
      related: '- Theme CSS spacing for site-wide pixel control\n- [Rich text](richtext) if you need copy between blocks',
    },
  },
  stats: {
    ru: {
      benefits: '- Цифры читаются с первого взгляда, без таблицы\n- KPI обновляет контент-менеджер, не верстальщик\n- Пара value/label предсказуема в Fenom',
      compose: '- B2B: [Hero](hero) → [Stats](stats) → [Преимущества](features) → [CTA](cta)\n- Агентство: [Stats](stats) → [Отзывы](testimonials) → [Логотипы](logos)',
      related: '- [Карточки](cards) для текстовых преимуществ без акцента на цифрах\n- [Таблица характеристик](spec_table) для пар параметр/значение (Pro)',
    },
    en: {
      benefits: '- Numbers scan fast, no table needed\n- KPI updates by editor, not by redeploying templates\n- value/label pairs are predictable in Fenom',
      compose: '- B2B: [Hero](hero) → [Stats](stats) → [Features](features) → [CTA](cta)\n- Agency: [Stats](stats) → [Testimonials](testimonials) → [Logos](logos)',
      related: '- [Cards](cards) for text benefits without numeric focus\n- [Spec table](spec_table) for parameter/value rows (Pro)',
    },
  },
  testimonials: {
    ru: {
      benefits: '- Цитата, имя и фото в одной карточке\n- Несколько отзывов без отдельного сниппета\n- Усиливает блоки с цифрами и CTA',
      compose: '- SaaS: [Преимущества](features) → [Testimonials](testimonials) → [Тарифы](pricing_table)\n- Услуги: [Карточки](cards) → [Testimonials](testimonials) → [Форма](contact_form)',
      related: '- [Логотипы](logos) для «нам доверяют» без цитат\n- [Команда](team), если нужны биографии, а не отзывы клиентов',
    },
    en: {
      benefits: '- Quote, name, and photo in one card\n- Multiple reviews without a custom snippet\n- Pairs well with stats and CTA blocks',
      compose: '- SaaS: [Features](features) → [Testimonials](testimonials) → [Pricing](pricing_table)\n- Services: [Cards](cards) → [Testimonials](testimonials) → [Contact form](contact_form)',
      related: '- [Logos](logos) for “trusted by” without quotes\n- [Team](team) for staff bios, not client quotes',
    },
  },
  contact: {
    ru: {
      benefits: '- Телефон и email сразу кликабельны на мобильном\n- Не нужна форма, если достаточно прямого контакта\n- Компактнее блока [Контакты с картой](contact_map)',
      compose: '- Лендинг: … → [CTA](cta) → [Контакты](contact)\n- Одностраничник услуги: [FAQ](faq) → [Контакты](contact)',
      related: '- [Контакты с картой](contact_map), если нужен адрес на карте\n- [Форма обратной связи](contact_form) для заявок с полями',
    },
    en: {
      benefits: '- Phone and email tap-to-call on mobile\n- No form when direct contact is enough\n- Smaller footprint than [Contact with map](contact_map)',
      compose: '- Landing: … → [CTA](cta) → [Contact](contact)\n- Service one-pager: [FAQ](faq) → [Contact](contact)',
      related: '- [Contact with map](contact_map) when you need a map pin\n- [Contact form](contact_form) for multi-field leads',
    },
  },
  image: {
    ru: {
      benefits: '- Одно фото с alt и подписью, без repeater\n- Быстрее [Галереи](gallery) для одного кадра\n- Partial изображения как в остальных секциях пакета',
      compose: '- Статья: [Текст](richtext) → [Изображение](image) → [Текст](richtext)\n- Кейс: [Hero](hero) → [Изображение](image) → [Цифры](stats)',
      related: '- [Галерея](gallery) для нескольких кадров\n- [Hero](hero), если картинка фон первого экрана с текстом поверх',
    },
    en: {
      benefits: '- Single photo with alt and caption, no repeater\n- Faster than [Gallery](gallery) for one frame\n- Same image partial as other package sections',
      compose: '- Article: [Rich text](richtext) → [Image](image) → [Rich text](richtext)\n- Case study: [Hero](hero) → [Image](image) → [Stats](stats)',
      related: '- [Gallery](gallery) for multiple frames\n- [Hero](hero) when the image is a background with overlay text',
    },
  },
  cards: {
    ru: {
      benefits: '- Универсальная сетка без иконок и цен\n- Подходит для услуг, этапов, коротких тезисов\n- Free-слой, не требует Pro',
      compose: '- Услуги: [Hero](hero) → [Карточки](cards) → [FAQ](faq) → [CTA](cta)\n- Процесс: [Текст](richtext) → [Карточки](cards) → [Отзывы](testimonials)',
      related: '- [Преимущества](features) с иконками (Pro)\n- [Тарифы](pricing_table), если в карточках нужны цены',
    },
    en: {
      benefits: '- Flexible grid without icons or prices\n- Works for services, steps, short points\n- Free layer, no Pro required',
      compose: '- Services: [Hero](hero) → [Cards](cards) → [FAQ](faq) → [CTA](cta)\n- Process: [Rich text](richtext) → [Cards](cards) → [Testimonials](testimonials)',
      related: '- [Features](features) with icons (Pro)\n- [Pricing table](pricing_table) when cards need prices',
    },
  },
  features: {
    ru: {
      benefits: '- Иконка + заголовок + текст в каждой ячейке\n- Визуально сильнее [Карточек](cards) на лендинге продукта\n- Иконка через URL или CSS-класс темы',
      compose: '- SaaS: [Hero](hero) → [Features](features) → [Stats](stats) → [Pricing](pricing_table)\n- Продукт: [Features](features) → [Видео](video) → [CTA](cta)',
      related: '- [Карточки](cards) (Free), если иконки не нужны\n- [Сравнение товаров](product_comparison) для табличного contrast (Pro, MS3)',
      requiresNote: 'Требуется PageBuilder Pro.',
    },
    en: {
      benefits: '- Icon, title, and body per cell\n- Stronger visual than [Cards](cards) on product landings\n- Icon via URL or theme CSS class',
      compose: '- SaaS: [Hero](hero) → [Features](features) → [Stats](stats) → [Pricing](pricing_table)\n- Product: [Features](features) → [Video](video) → [CTA](cta)',
      related: '- [Cards](cards) (Free) when icons are optional\n- [Product comparison](product_comparison) for tabular contrast (Pro, MS3)',
    },
  },
  video: {
    ru: {
      benefits: '- URL вместо embed-кода в richtext\n- `VideoEmbedResolver` подставляет iframe под YouTube, Vimeo, Rutube\n- Responsive-обёртка в chunk',
      compose: '- Продукт: [Hero](hero) → [Видео](video) → [Features](features)\n- Обучение: [Текст](richtext) → [Видео](video) → [FAQ](faq)',
      related: '- [Hero](hero) с фоновым изображением, если видео не нужно\n- [Structured content](structured_content) для встроенного media в статье',
    },
    en: {
      benefits: '- Paste URL instead of embed HTML in richtext\n- `VideoEmbedResolver` builds iframe for YouTube, Vimeo, Rutube\n- Responsive wrapper in chunk',
      compose: '- Product: [Hero](hero) → [Video](video) → [Features](features)\n- Tutorial: [Rich text](richtext) → [Video](video) → [FAQ](faq)',
      related: '- [Hero](hero) with background image when video is overkill\n- [Structured content](structured_content) for inline media in articles',
    },
  },
  team: {
    ru: {
      benefits: '- Фото и роль сотрудника в предсказуемой карточке\n- Repeater: новый человек без правки шаблона\n- Отделение от [Отзывов](testimonials) (клиент vs команда)',
      compose: '- О нас: [Hero](hero) → [Текст](richtext) → [Команда](team) → [CTA](cta)\n- Конференция: [Команда](team) → [FAQ](faq) → [Контакты](contact_map)',
      related: '- [Отзывы](testimonials) для цитат клиентов\n- [Карточки](cards) для текстовых ролей без фото',
    },
    en: {
      benefits: '- Photo and role in a consistent card\n- Repeater adds people without template edits\n- Separate from [Testimonials](testimonials) (staff vs clients)',
      compose: '- About: [Hero](hero) → [Rich text](richtext) → [Team](team) → [CTA](cta)\n- Event: [Team](team) → [FAQ](faq) → [Contact with map](contact_map)',
      related: '- [Testimonials](testimonials) for client quotes\n- [Cards](cards) for text-only roles',
    },
  },
  pricing_table: {
    ru: {
      benefits: '- Несколько тарифов в одной секции\n- Список фич текстом, строка = пункт (без repeater на каждую фичу)\n- Кнопка и цена на каждый план',
      compose: '- SaaS: [Features](features) → [Pricing](pricing_table) → [FAQ](faq) → [CTA](cta)\n- Услуги: [Карточки](cards) → [Pricing](pricing_table) → [Форма](contact_form)',
      related: '- [Карточки](cards), если цены и кнопки не нужны\n- [Таблица данных](data_table) для прайса из CMP-таблицы',
    },
    en: {
      benefits: '- Multiple plans in one section\n- Feature list as plain text, one line per item\n- Price and button per plan',
      compose: '- SaaS: [Features](features) → [Pricing](pricing_table) → [FAQ](faq) → [CTA](cta)\n- Services: [Cards](cards) → [Pricing](pricing_table) → [Contact form](contact_form)',
      related: '- [Cards](cards) without prices\n- [Data table](data_table) for CMP-sourced price lists',
    },
  },
  tabs: {
    ru: {
      benefits: '- Длинный контент не растягивает страницу вертикально\n- Каждая вкладка со своим якорем для ссылок\n- Richtext внутри панели',
      compose: '- Товар: [Hero / spotlight](product_spotlight) → [Tabs](tabs): описание | характеристики | доставка\n- Услуга: [Features](features) → [Tabs](tabs) → [FAQ](faq)',
      related: '- [FAQ](faq) для коротких пар вопрос/ответ\n- [Текстовый блок](richtext), если вкладки избыточны',
    },
    en: {
      benefits: '- Long content without endless vertical scroll\n- Each tab has an anchor for deep links\n- Richtext inside panels',
      compose: '- Product: [Spotlight](product_spotlight) → [Tabs](tabs): description | specs | shipping\n- Service: [Features](features) → [Tabs](tabs) → [FAQ](faq)',
      related: '- [FAQ](faq) for short Q/A pairs\n- [Rich text](richtext) when tabs are overkill',
    },
  },
  structured_content: {
    ru: {
      benefits: '- Editor.js: заголовки, списки, цитаты без ручного HTML\n- JSON в `section.data`, HTML на выводе chunk\n- Удобнее richtext для длинных материалов',
      compose: '- Блог-пост на page builder: [Hero](hero) → [Structured content](structured_content) → [CTA](cta)\n- Новость: [Structured content](structured_content) → [Галерея](gallery)',
      related: '- [Текстовый блок](richtext) для коротких HTML-фрагментов\n- [Вкладки](tabs) для разделения тем, а не линейного лонгрида',
    },
    en: {
      benefits: '- Editor.js blocks: headings, lists, quotes without hand HTML\n- JSON in `section.data`, HTML from chunk on output\n- Better than richtext for long posts',
      compose: '- Blog post in page builder: [Hero](hero) → [Structured content](structured_content) → [CTA](cta)\n- News: [Structured content](structured_content) → [Gallery](gallery)',
      related: '- [Rich text](richtext) for short HTML snippets\n- [Tabs](tabs) to split topics, not linear longreads',
    },
  },
  gallery_carousel: {
    ru: {
      benefits: '- Экономит высоту страницы на мобильном\n- Автопрокрутка опциональна\n- Те же поля слайдов, что у [Галереи](gallery)',
      compose: '- Главная: [Hero](hero) → [Carousel](gallery_carousel) баннеров → [Products grid](products_grid)\n- Портфолио: [Текст](richtext) → [Carousel](gallery_carousel) → [CTA](cta)',
      related: '- [Галерея](gallery) для сетки всех кадров сразу\n- [Карусель товаров](products_carousel) для SKU (Pro, MS3)',
    },
    en: {
      benefits: '- Saves vertical space on mobile\n- Optional autoplay\n- Same slide fields as [Gallery](gallery)',
      compose: '- Homepage: [Hero](hero) → [Carousel](gallery_carousel) banners → [Products grid](products_grid)\n- Portfolio: [Rich text](richtext) → [Carousel](gallery_carousel) → [CTA](cta)',
      related: '- [Gallery](gallery) to show all frames at once\n- [Products carousel](products_carousel) for SKUs (Pro, MS3)',
    },
  },
  contact_form: {
    ru: {
      benefits: '- Набор полей собираете в repeater, не в коде формы\n- `form_key` связывает блок с вашим обработчиком (AjaxForm, сниппет)\n- Сообщение об успехе и redirect настраиваются в инспекторе',
      compose: '- Лендинг: [Hero](hero) → [Features](features) → [Contact form](contact_form)\n- Контакты: [Контакты с картой](contact_map) → [Contact form](contact_form)',
      related: '- [CTA](cta) с одной ссылкой вместо полей\n- [Контакты](contact) для tel:/mailto: без отправки формы',
    },
    en: {
      benefits: '- Field set in a repeater, not hard-coded HTML\n- `form_key` ties the block to your handler (AjaxForm, snippet)\n- Success message and redirect live in the inspector',
      compose: '- Landing: [Hero](hero) → [Features](features) → [Contact form](contact_form)\n- Contacts: [Contact with map](contact_map) → [Contact form](contact_form)',
      related: '- [CTA](cta) with a single link instead of fields\n- [Contact](contact) for tel:/mailto: without submit',
    },
  },
  spec_table: {
    ru: {
      benefits: '- Параметр и значение в таблице, не в prose\n- Вступление и заголовок секции опциональны\n- Поле `table` редактируется в инспекторе',
      compose: '- Товар (описание): [Tabs](tabs) → вкладка «Характеристики» = [Spec table](spec_table)\n- Оборудование: [Hero](hero) → [Spec table](spec_table) → [CTA](cta)',
      related: '- [Таблица данных](data_table) для строк из CMP embeddedTable\n- [Сравнение товаров](product_comparison) для нескольких SKU (MS3)',
    },
    en: {
      benefits: '- Parameter/value rows, not buried in prose\n- Optional intro and section title\n- `table` field edits in the inspector',
      compose: '- Product copy: [Tabs](tabs) → “Specs” tab = [Spec table](spec_table)\n- Equipment: [Hero](hero) → [Spec table](spec_table) → [CTA](cta)',
      related: '- [Data table](data_table) for CMP embeddedTable rows\n- [Product comparison](product_comparison) for multiple SKUs (MS3)',
    },
  },
  data_table: {
    ru: {
      benefits: '- Одни данные в CMP, несколько секций могут ссылаться на `table_key`\n- Обновление прайса без правки каждой страницы\n- Лимит строк задаётся в секции',
      compose: '- Услуги: [Hero](hero) → [Data table](data_table) прайс → [FAQ](faq)\n- Событие: [Data table](data_table) расписание → [Contact form](contact_form)',
      related: '- [Таблица характеристик](spec_table) для фиксированных пар на одной странице\n- [Текстовый блок](richtext) для разового текста без CMP',
    },
    en: {
      benefits: '- One CMP table, many sections can share a `table_key`\n- Update price list without editing every page\n- Row limit per section',
      compose: '- Services: [Hero](hero) → [Data table](data_table) price list → [FAQ](faq)\n- Event: [Data table](data_table) schedule → [Contact form](contact_form)',
      related: '- [Spec table](spec_table) for fixed pairs on one page\n- [Rich text](richtext) for one-off copy without CMP',
    },
  },
  map: {
    ru: {
      benefits: '- Координаты в поле map, iframe собирает resolver\n- Яндекс.Карты по умолчанию, провайдер меняется в коде пакета\n- Отдельно от текста контактов',
      compose: '- Контакты: [Contact](contact) → [Map](map)\n- Филиал: [Hero](hero) → [Map](map) → [FAQ](faq)',
      related: '- [Контакты с картой](contact_map) для объединённого блока\n- Статичная картинка в [Изображении](image), если интерактив не нужен',
    },
    en: {
      benefits: '- Coordinates in map field, resolver builds iframe\n- Yandex Maps by default, provider swappable in package code\n- Separate from contact copy',
      compose: '- Contacts: [Contact](contact) → [Map](map)\n- Branch: [Hero](hero) → [Map](map) → [FAQ](faq)',
      related: '- [Contact with map](contact_map) for a combined block\n- Static [Image](image) when interactivity is not needed',
    },
  },
  contact_map: {
    ru: {
      benefits: '- Телефон, email и карта на одном экране\n- Меньше секций в документе, чем Contact + Map по отдельности\n- Один chunk для типовой страницы «Контакты»',
      compose: '- Контакты (одна страница): [Hero](hero) → [Contact map](contact_map) → [FAQ](faq)\n- Лендинг: [CTA](cta) → [Contact map](contact_map)',
      related: '- [Контакты](contact) + [Карта](map), если нужен другой порядок или вёрстка\n- [Форма](contact_form) рядом для заявок',
    },
    en: {
      benefits: '- Phone, email, and map in one viewport\n- Fewer sections than Contact + Map separately\n- One chunk for a standard contact page',
      compose: '- Contact page: [Hero](hero) → [Contact map](contact_map) → [FAQ](faq)\n- Landing: [CTA](cta) → [Contact map](contact_map)',
      related: '- [Contact](contact) + [Map](map) for custom layout order\n- [Contact form](contact_form) nearby for leads',
    },
  },
  logos: {
    ru: {
      benefits: '- Быстрый блок «нам доверяют»\n- Alt у каждого лого для доступности\n- Ссылка на сайт партнёра опциональна',
      compose: '- B2B: [Stats](stats) → [Logos](logos) → [Testimonials](testimonials)\n- Лендинг: [Features](features) → [Logos](logos) → [Pricing](pricing_table)',
      related: '- [Ряд брендов](brands_row) для вендоров из miniShop3 (Pro, MS3)\n- [Отзывы](testimonials), если нужны цитаты, а не логотипы',
    },
    en: {
      benefits: '- Fast “trusted by” strip\n- Alt text per logo for accessibility\n- Optional partner link',
      compose: '- B2B: [Stats](stats) → [Logos](logos) → [Testimonials](testimonials)\n- Landing: [Features](features) → [Logos](logos) → [Pricing](pricing_table)',
      related: '- [Brands row](brands_row) for miniShop3 vendors (Pro, MS3)\n- [Testimonials](testimonials) for quotes instead of logos',
    },
  },
  blog_posts: {
    ru: {
      benefits: '- Лента из дочерних ресурсов, без ручного msProducts/pdo в шаблоне\n- Лимит и сортировка в инспекторе\n- Анонс и превью включаются флагами',
      compose: '- Главная: [Hero](hero) → [Blog posts](blog_posts) → [CTA](cta)\n- Раздел блога: [Blog posts](blog_posts) → [Contact](contact)',
      related: '- [Structured content](structured_content) для одной статьи, а не списка\n- [Карточки](cards) для статичных ссылок без pdoResources',
    },
    en: {
      benefits: '- Feed from child resources, no hand-rolled pdo in templates\n- Limit and sort in inspector\n- Intro and thumbnail toggles',
      compose: '- Homepage: [Hero](hero) → [Blog posts](blog_posts) → [CTA](cta)\n- Blog section: [Blog posts](blog_posts) → [Contact](contact)',
      related: '- [Structured content](structured_content) for one article, not a list\n- [Cards](cards) for static links without pdoResources',
    },
  },
  products_grid: {
    ru: {
      benefits: '- msProducts внутри chunk: цены и корзина из miniShop3\n- Категория и лимит меняет редактор\n- Не нужен отдельный вызов сниппета на странице',
      compose: '- Главная магазина: [Hero](hero) → [Categories row](categories_row) → [Products grid](products_grid)\n- Коллекция: [Promo banner](promo_banner) → [Products grid](products_grid) → [Brands row](brands_row)',
      related: '- [Карусель товаров](products_carousel) для узкой полосы\n- [Подборка](curated_products) для ручного списка SKU',
    },
    en: {
      benefits: '- msProducts inside chunk: prices and cart from miniShop3\n- Editor changes category and limit\n- No separate snippet call on the page',
      compose: '- Store homepage: [Hero](hero) → [Categories row](categories_row) → [Products grid](products_grid)\n- Collection: [Promo banner](promo_banner) → [Products grid](products_grid) → [Brands row](brands_row)',
      related: '- [Products carousel](products_carousel) for a horizontal strip\n- [Curated products](curated_products) for hand-picked SKUs',
    },
  },
  products_carousel: {
    ru: {
      benefits: '- Те же товары, что в сетке, но в карусели\n- Экономит место на главной\n- Автопрокрутка по флагу',
      compose: '- Главная: [Products carousel](products_carousel) «Хиты» → [Products grid](products_grid) «Новинки»\n- Товар: [Related](related_products) + [Carousel](products_carousel) cross-sell',
      related: '- [Сетка товаров](products_grid) для полной витрины\n- [Товар в фокусе](product_spotlight) для одного SKU',
    },
    en: {
      benefits: '- Same products as grid, in carousel form\n- Saves homepage height\n- Optional autoplay',
      compose: '- Homepage: [Products carousel](products_carousel) bestsellers → [Products grid](products_grid) new arrivals\n- Product: [Related](related_products) + [Carousel](products_carousel) cross-sell',
      related: '- [Products grid](products_grid) for full showcase\n- [Product spotlight](product_spotlight) for one SKU',
    },
  },
  categories_row: {
    ru: {
      benefits: '- Подкатегории из msCategory через pdoResources\n- Навигация по каталогу без ручного меню\n- Превью и ссылки из ресурсов',
      compose: '- Каталог: [Hero](hero) → [Categories row](categories_row) → [Products grid](products_grid)\n- Главная: [Categories row](categories_row) → [Promo banner](promo_banner)',
      related: '- [Сетка товаров](products_grid) после выбора категории\n- [Карточки](cards) для статичных разделов без MS3',
    },
    en: {
      benefits: '- Subcategories from msCategory via pdoResources\n- Catalog navigation without hand-built menus\n- Thumbnails and links from resources',
      compose: '- Catalog: [Hero](hero) → [Categories row](categories_row) → [Products grid](products_grid)\n- Homepage: [Categories row](categories_row) → [Promo banner](promo_banner)',
      related: '- [Products grid](products_grid) after category pick\n- [Cards](cards) for static sections without MS3',
    },
  },
  product_spotlight: {
    ru: {
      benefits: '- Один товар крупно: галерея, цена, корзина\n- Промо «товар недели» без отдельного шаблона\n- msProducts по relation на ресурс',
      compose: '- Главная магазина: [Product spotlight](product_spotlight) → [Products carousel](products_carousel)\n- Акция: [Promo banner](promo_banner) → [Product spotlight](product_spotlight)',
      related: '- [Промо-баннер](promo_banner) с текстом и optional product\n- [Сетка](products_grid), если нужно много SKU',
    },
    en: {
      benefits: '- One SKU large: gallery, price, cart\n- “Product of the week” without custom template\n- msProducts by resource relation',
      compose: '- Store homepage: [Product spotlight](product_spotlight) → [Products carousel](products_carousel)\n- Sale: [Promo banner](promo_banner) → [Product spotlight](product_spotlight)',
      related: '- [Promo banner](promo_banner) with copy and optional product\n- [Products grid](products_grid) for many SKUs',
    },
  },
  promo_banner: {
    ru: {
      benefits: '- Текст, фон и CTA как у hero, но компактнее\n- Optional привязка к товару MS3\n- Подходит для сезонных акций между витринами',
      compose: '- Главная: [Products grid](products_grid) → [Promo banner](promo_banner) → [Products carousel](products_carousel)\n- Распродажа: [Hero](hero) → [Promo banner](promo_banner) → [Curated products](curated_products)',
      related: '- [Hero](hero) для первого экрана\n- [CTA](cta) без фона и товара',
    },
    en: {
      benefits: '- Copy, background, CTA like hero but compact\n- Optional miniShop3 product tie-in\n- Seasonal promos between showcases',
      compose: '- Homepage: [Products grid](products_grid) → [Promo banner](promo_banner) → [Products carousel](products_carousel)\n- Sale: [Hero](hero) → [Promo banner](promo_banner) → [Curated products](curated_products)',
      related: '- [Hero](hero) for above-the-fold\n- [CTA](cta) without background or product',
    },
  },
  related_products: {
    ru: {
      benefits: '- Исключает текущий товар из выборки\n- Контекст страницы товара, не отдельный сниппет\n- Категория и лимит в инспекторе',
      compose: '- Карточка товара (шаблон MS3): … → [Related products](related_products) → [FAQ](faq)\n- Корзина: [Related products](related_products) «Добавьте к заказу»',
      related: '- [Подборка](curated_products) для фиксированного списка\n- [Карусель товаров](products_carousel) для общей категории',
    },
    en: {
      benefits: '- Excludes current product from picks\n- Product page context, no extra snippet\n- Category and limit in inspector',
      compose: '- Product template (MS3): … → [Related products](related_products) → [FAQ](faq)\n- Cart: [Related products](related_products) “Add to order”',
      related: '- [Curated products](curated_products) for fixed IDs\n- [Products carousel](products_carousel) for generic category strip',
    },
  },
  brands_row: {
    ru: {
      benefits: '- Ручной список или vendors из категории MS3\n- Ссылки на фильтр по бренду\n- Компактнее сетки товаров для логотипов',
      compose: '- Каталог: [Categories row](categories_row) → [Brands row](brands_row) → [Products grid](products_grid)\n- Главная: [Brands row](brands_row) → [Testimonials](testimonials)',
      related: '- [Логотипы](logos) для партнёров вне каталога\n- [Ряд категорий](categories_row) для навигации по разделам',
    },
    en: {
      benefits: '- Manual list or vendors from MS3 category\n- Links into brand filter URLs\n- Tighter than product grid for logos only',
      compose: '- Catalog: [Categories row](categories_row) → [Brands row](brands_row) → [Products grid](products_grid)\n- Homepage: [Brands row](brands_row) → [Testimonials](testimonials)',
      related: '- [Logos](logos) for non-catalog partners\n- [Categories row](categories_row) for department navigation',
    },
  },
  product_comparison: {
    ru: {
      benefits: '- Несколько товаров в одной таблице характеристик\n- Подсветка отличий опциональна\n- Выбор SKU в инспекторе, не GET-параметры',
      compose: '- Страница «Сравнение»: [Hero](hero) → [Product comparison](product_comparison) → [CTA](cta)\n- B2B: [Spec table](spec_table) + [Product comparison](product_comparison) для линейки',
      related: '- [Таблица характеристик](spec_table) для одного продукта\n- [Подборка](curated_products) без табличного сравнения',
    },
    en: {
      benefits: '- Multiple SKUs in one spec table\n- Optional highlight for differing cells\n- Pick products in inspector, not query strings',
      compose: '- Compare page: [Hero](hero) → [Product comparison](product_comparison) → [CTA](cta)\n- B2B: [Spec table](spec_table) + [Product comparison](product_comparison) for a line',
      related: '- [Spec table](spec_table) for single product\n- [Curated products](curated_products) without comparison layout',
    },
  },
  curated_products: {
    ru: {
      benefits: '- Точный список SKU, порядок как в multirelation\n- Не зависит от одной категории\n- Тот же card markup, что у сетки',
      compose: '- Главная: [Curated products](curated_products) «Рекомендуем» → [Products grid](products_grid) «Каталог»\n- Лендинг: [Hero](hero) → [Curated products](curated_products) → [CTA](cta)',
      related: '- [Сетка товаров](products_grid) для автоматической выборки из категории\n- [Похожие товары](related_products) на карточке с exclude',
    },
    en: {
      benefits: '- Exact SKU list, order follows multirelation\n- Not tied to one category\n- Same card markup as grid',
      compose: '- Homepage: [Curated products](curated_products) “Staff picks” → [Products grid](products_grid) catalog\n- Landing: [Hero](hero) → [Curated products](curated_products) → [CTA](cta)',
      related: '- [Products grid](products_grid) for automatic category feed\n- [Related products](related_products) on product page with exclude',
    },
  },
}
