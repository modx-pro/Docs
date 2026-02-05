# История изменений

## Версии

| Версия | Дата | Описание |
|--------|------|----------|
| [1.1.0](1.1.0) | 2024 | Новые сниппеты, SEO улучшения, рефакторинг |
| 1.0.0-beta1 | 2024 | Первый публичный релиз |

## mFilter 1.1.0

Крупное обновление с новыми возможностями:

**Новые сниппеты:**
- [mFilterCrumbs](/components/mfilter/snippets/mfiltercrumbs) — хлебные крошки с фильтрами
- [mFilterSelected](/components/mfilter/snippets/mfilterselected) — выбранные фильтры
- [mFilterNav](/components/mfilter/snippets/mfilternav) — SEO-навигация
- [mFilterSitemap](/components/mfilter/snippets/mfiltersitemap) — карта сайта

**SEO:**
- Schema.org Microdata и JSON-LD в хлебных крошках
- Улучшенная логика canonical URL
- Человекочитаемые метки для parent и vendor_id

**Архитектура:**
- Переход на FilterSetManager (удалён MflPageConfig)
- Переименование настроек: `mfl_*` → `mfilter.*`
- PHPStan статический анализ

[Подробнее о версии 1.1.0 →](1.1.0)

## mFilter 1.0.0-beta1

Первый публичный релиз:

- SEO-friendly URL для фильтрованных страниц
- Типы фильтров: default, number, boolean, parents, date, vendors, colors
- Русские словоформы через morpher.ru API
- Vue 3 админка с PrimeVue
- AJAX фильтрация с History API
- Мобильная адаптация
- Многозонное обновление контента
- Настраиваемые URL паттерны
- Автоматическая генерация слагов
- SEO шаблоны с плейсхолдерами и склонениями
- Управление кэшем
- Интеграция с MODX Scheduler
