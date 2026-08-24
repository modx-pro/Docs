---
title: PageBuilder
description: Визуальный конструктор секций для MODX 3 — черновик и публикация без перезаписи content ресурса
author: ibochkarev
dependencies: [VueTools, pdoTools]
categories: utilities

items: [
  { text: 'Ключевые возможности', link: 'key-features' },
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Сниппеты', link: 'snippets' },
  { text: 'Вывод на сайте', link: 'frontend' },
  { text: 'Менеджер и события', link: 'integration' },
  {
    text: 'Поля',
    link: 'fields/overview',
    items: [
      { text: 'Обзор', link: 'fields/overview' },
      { text: 'Справочник типов', link: 'fields/types' },
      {
        text: 'Free',
        items: [
          { text: 'text', link: 'fields/text' },
          { text: 'textarea', link: 'fields/textarea' },
          { text: 'richtext', link: 'fields/richtext' },
          { text: 'ace', link: 'fields/ace' },
          { text: 'number', link: 'fields/number' },
          { text: 'url', link: 'fields/url' },
          { text: 'slug', link: 'fields/slug' },
          { text: 'select', link: 'fields/select' },
          { text: 'radio', link: 'fields/radio' },
          { text: 'checkbox', link: 'fields/checkbox' },
          { text: 'checkboxgroup', link: 'fields/checkboxgroup' },
          { text: 'yesno', link: 'fields/yesno' },
          { text: 'toggle', link: 'fields/toggle' },
          { text: 'date', link: 'fields/date' },
          { text: 'time', link: 'fields/time' },
          { text: 'datetime', link: 'fields/datetime' },
          { text: 'color', link: 'fields/color' },
          { text: 'colorpalette', link: 'fields/colorpalette' },
          { text: 'file', link: 'fields/file' },
          { text: 'image', link: 'fields/image' },
          { text: 'button', link: 'fields/button' },
          { text: 'hidden', link: 'fields/hidden' },
          { text: 'readonly', link: 'fields/readonly' },
          { text: 'heading', link: 'fields/heading' },
          { text: 'repeater', link: 'fields/repeater' },
          { text: 'editorjs', link: 'fields/editorjs' },
        ],
      },
      {
        text: 'Pro',
        items: [
          { text: 'multiselect', link: 'fields/multiselect' },
          { text: 'relation', link: 'fields/relation' },
          { text: 'multirelation', link: 'fields/multirelation' },
          { text: 'resourcelist', link: 'fields/resourcelist' },
          { text: 'video', link: 'fields/video' },
          { text: 'gallery', link: 'fields/gallery' },
          { text: 'map', link: 'fields/map' },
          { text: 'table', link: 'fields/table' },
          { text: 'embeddedTable', link: 'fields/embeddedTable' },
          { text: 'keyvalue', link: 'fields/keyvalue' },
          { text: 'tag', link: 'fields/tag' },
          { text: 'currency', link: 'fields/currency' },
          { text: 'imask', link: 'fields/imask' },
          { text: 'combo', link: 'fields/combo' },
          { text: 'multicombo', link: 'fields/multicombo' },
          { text: 'tablecombo', link: 'fields/tablecombo' },
          { text: 'tablemulticombo', link: 'fields/tablemulticombo' },
          { text: 'fieldset', link: 'fields/fieldset' },
          { text: 'dependent', link: 'fields/dependent' },
          { text: 'xtype', link: 'fields/xtype' },
          { text: 'tv', link: 'fields/tv' },
          { text: 'chunk', link: 'fields/chunk' },
          { text: 'snippet', link: 'fields/snippet' },
          { text: 'jsongrid', link: 'fields/jsongrid' },
        ],
      },
    ],
  },
  {
    text: 'Секции',
    link: 'sections/',
    items: [
      { text: 'Каталог', link: 'sections/' },
      {
        text: 'Free',
        items: [
          { text: 'Call to action', link: 'sections/cta' },
          { text: 'Cards', link: 'sections/cards' },
          { text: 'Contact', link: 'sections/contact' },
          { text: 'FAQ', link: 'sections/faq' },
          { text: 'Gallery', link: 'sections/gallery' },
          { text: 'Hero', link: 'sections/hero' },
          { text: 'Image', link: 'sections/image' },
          { text: 'Rich text', link: 'sections/richtext' },
          { text: 'Spacer', link: 'sections/spacer' },
          { text: 'Stats', link: 'sections/stats' },
          { text: 'Testimonials', link: 'sections/testimonials' },
        ],
      },
      {
        text: 'Pro',
        items: [
          { text: 'Blog posts', link: 'sections/blog_posts' },
          { text: 'Brands row', link: 'sections/brands_row' },
          { text: 'Categories row', link: 'sections/categories_row' },
          { text: 'Contact form', link: 'sections/contact_form' },
          { text: 'Contact with map', link: 'sections/contact_map' },
          { text: 'Curated products', link: 'sections/curated_products' },
          { text: 'Data table', link: 'sections/data_table' },
          { text: 'Features', link: 'sections/features' },
          { text: 'Gallery carousel', link: 'sections/gallery_carousel' },
          { text: 'Logo cloud', link: 'sections/logos' },
          { text: 'Map', link: 'sections/map' },
          { text: 'Pricing table', link: 'sections/pricing_table' },
          { text: 'Product comparison', link: 'sections/product_comparison' },
          { text: 'Product spotlight', link: 'sections/product_spotlight' },
          { text: 'Products carousel', link: 'sections/products_carousel' },
          { text: 'Products grid', link: 'sections/products_grid' },
          { text: 'Promo banner', link: 'sections/promo_banner' },
          { text: 'Related products', link: 'sections/related_products' },
          { text: 'Spec table', link: 'sections/spec_table' },
          { text: 'Structured content', link: 'sections/structured_content' },
          { text: 'Tabs', link: 'sections/tabs' },
          { text: 'Team', link: 'sections/team' },
          { text: 'Video', link: 'sections/video' },
        ],
      },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---
# PageBuilder

<!-- ![Редактор секций на ресурсе](/components/pagebuilder/screenshots/mgr-sections-tab.png) -->

PageBuilder хранит структуру страницы в sidecar-таблице `pb_pages`: черновик (`draft_json`) и опубликованная версия (`published_json`). Поле `modResource.content` редактор не трогает. На фронте секции выводит сниппет `PageBuilder`.

## Возможности

- **Редактор во вкладке «Секции»** — VueTools + PrimeVue в форме ресурса или в CMP
- **Черновик и публикация** — отдельные ревизии, превью черновика по подписанному токену
- **11 встроенных секций (Free)** — hero, richtext, gallery, faq, cta и др.
- **PageBuilder Pro** — библиотека секций, версии, пресеты, расширенный каталог (commerce, формы, карты)
- **Resource data tables** — табличные данные на ресурсе, секция `data_table` и сниппет `PageBuilderTableRows`
- **UTM и контексты** — правила видимости секций по UTM и контексту MODX
- **События `pbOn*`** — регистрация типов секций, хуки save/publish/render

## Системные требования

| Требование | Значение |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ (редактор в менеджере) |
| pdoTools | 3.0+ (Fenom в chunks секций) |
| miniShop3 | опционально, для Pro-секций каталога |

## Пакеты

| Transport | Содержимое |
| --- | --- |
| `pagebuilder` | Free: core, 11 секций, CMP, сниппеты |
| `pagebuilderpro` | Pro: зависит от Free, расширенный каталог и функции |

Pro ставится одним transport-пакетом `pagebuilderpro`. Отдельная установка Free перед Pro не нужна.

Namespace в MODX: `pagebuilder`.

## Быстрые ссылки

- [Ключевые возможности](key-features)
- [Установка и первый ресурс](quick-start)
- [Настройки `pagebuilder_*`](settings)
- [Сниппеты](snippets)
- [Шаблон и CSS на сайте](frontend)
- [Права, CMP, события](integration)
- [Поля инспектора](fields/overview)
- [Блоки секций](sections/)

## Точки входа

| URL / путь | Назначение |
| --- | --- |
| CMP `pagebuilder` → `index` | Каталог ресурсов с секциями, типы секций (Pro) |
| `assets/components/pagebuilder/connector.php` | MGR API (VueTools) |
| `assets/components/pagebuilder/preview.php` | Превью черновика в iframe |
| Сниппет `[[!PageBuilder]]` | HTML опубликованных секций на сайте |

## Права

| Permission | Назначение |
| --- | --- |
| `pagebuilder_view` | Вкладка «Секции», каталог, токен превью |
| `pagebuilder_save` | Сохранение черновика и публикация (fallback: `save_document`) |
| `pagebuilder_manage_types` | CMP «Типы секций» (без fallback на view) |

Доступ к конкретному ресурсу дополнительно проверяет политика MODX (`view`, `save`).
