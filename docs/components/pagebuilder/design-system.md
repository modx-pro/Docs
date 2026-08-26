---
title: Дизайн-система
description: CSS variables, BEM и Fenom-оболочка секций PageBuilder на фронте
---

# Дизайн-система (фронт)

Стили секций на сайте отделены от PrimeVue в менеджере.

## Stylesheets

| Файл | Назначение |
| --- | --- |
| `pagebuilder-sections.css` | Free-секции и базовые компоненты |
| `pagebuilder-sections-pro.css` | Pro-секции (при capability `pro`) |
| `pagebuilder-commerce.css` | product-card, spotlight, promo |
| `pagebuilder-qa.css` | QA field-matrix (при `&qa_css=1` или секции `_qa_field_matrix`) |

Подключение через сниппет при `pagebuilder_load_frontend_css = 1`. Pro и commerce CSS грузятся только с Pro.

## Область применения и токены

Токены задаются на **`.pb-page`**, не на `:root`. Переопределите их в теме:

```css
.pb-page {
  --pb-color-accent: #059669;
  --pb-content-max: 60rem;
  --pb-section-gap: 2.5rem;
}
```

| Token | Назначение |
| --- | --- |
| `--pb-section-gap` | Отступ между секциями |
| `--pb-content-max` | Максимальная ширина внутреннего контейнера |
| `--pb-space-sm/md/lg/xl` | Spacer, ритм |
| `--pb-radius` | Скругления |
| `--pb-color-text` / `--pb-color-muted` | Текст |
| `--pb-color-accent` | Акцент, ссылки |
| `--pb-color-surface` | Фон карточек |
| `--pb-color-border` | Границы |
| `--pb-button-bg` / `--pb-button-color` | CTA |
| `--pb-grid-gap` | Сетки cards/gallery |
| `--pb-video-ratio` | Соотношение сторон для video embed |
| `--pb-hero-bg` / `--pb-hero-overlay` | Hero background |

## BEM

| Паттерн | Пример |
| --- | --- |
| Block | `pb-hero`, `pb-faq` |
| Section shell | `pb-section`, `pb-section--hero` |
| Element | `pb-hero__title`, `pb-section__inner` |
| Modifier | `pb-spacer--md`, `pb-hero--center` |
| Общие классы | `pb-button`, `pb-heading`, `pb-grid`, `pb-surface` |

Правила:

- Spacer: `pb-spacer pb-spacer--md`.
- Hero background: CSS var `--pb-hero-bg`.
- Кнопка: `pb-hero__button pb-button`.
- Картинки: partial chunk `pagebuilder_partial_image`.

## Fenom-оболочка

```fenom
<section class="pb-section pb-section--hero pb-hero{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="hero"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-hero__inner">
    ...
  </div>
</section>
```

`$cssClass` берётся из `data.cssClass` (событие `pbOnBeforeRenderSection`). `$id` это id секции в документе.

Текстовые поля экранируйте через `|escape`. HTML из richtext выводите только если доверяете редакторам.

## Связанные страницы

- [Вывод на сайте](frontend)
- [Разработчик](developer#opredelenie-sekcii)
- [Каталог секций](sections/)
