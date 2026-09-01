---
title: Дизайн-система
description: CSS variables, BEM, partial chunks и Fenom-оболочка секций PageBuilder на фронте
---

# Дизайн-система (фронт)

Стили секций на сайте не завязаны на PrimeVue в менеджере. Chunks выводят разметку с префиксом `pb-`, а `pagebuilder-sections.css` задаёт сетку, шрифты и токены внутри `.pb-page`.

## Подключение CSS и JS

Сниппет [PageBuilder](snippets/PageBuilder) вызывает `pbRegisterFrontendAssets()` при `pagebuilder_load_frontend_css = 1` (или `&load_css=`1``). Файлы регистрируются через `regClientCSS` с query `?v=` по версии файла.

| Параметр / настройка | По умолчанию | Что делает |
| --- | --- | --- |
| `pagebuilder_load_frontend_css` | `1` | Глобально включает CSS сниппета |
| `load_css` | из настройки | Переопределяет подключение на одном вызове |
| `wrap_page` | как `load_css` | Оборачивает HTML в `<div class="pb-page">` |

Отключить стили на странице: `[[!PageBuilder? &load_css=`0`]]`. Обёртку можно оставить: `&wrap_page=`1`` при `load_css=0`, если токены задаёте сами.

Вместе с CSS подключается `pagebuilder-sections.js` (если файл есть в составе дополнения). Скрипт инициализирует карусели (`data-pb-carousel`) и вкладки (`data-pb-tabs`) внутри `.pb-page`.

Подробнее про вывод: [Вывод на сайте](frontend), параметры сниппета: [PageBuilder → load_css](snippets/PageBuilder#параметры).

## Файлы стилей

Путь от корня сайта: `assets/components/pagebuilder/css/`.

| Файл | Когда грузится |
| --- | --- |
| `pagebuilder-sections.css` | Всегда при `load_css=1` |
| `pagebuilder-sections-pro.css` | При флаге `pro` |
| `pagebuilder-commerce.css` | При флаге `pro` (product-card, spotlight, promo) |

Pro и commerce CSS не подключаются на Free-сборке, даже если chunk секции лежит в теме.

## Обёртка `.pb-page`

Токены задаются на **`.pb-page`**, не на `:root`. Глобальная тема сайта не перезаписывается, а секции получают свой ритм отступов.

Соседние прямые потомки `.pb-page` разделяет вертикальный gap:

```css
.pb-page > * + * {
  margin-top: var(--pb-section-gap);
}
```

Внутренний контейнер секции: `.pb-section__inner` с `max-width: var(--pb-content-max)` и горизонтальным padding `var(--pb-space-inline)`.

## CSS-токены

Значения по умолчанию из `pagebuilder-sections.css`. Переопределите их в CSS темы на том же селекторе `.pb-page`.

| Token | По умолчанию | Назначение |
| --- | --- | --- |
| `--pb-section-gap` | `4rem` | Отступ между секциями |
| `--pb-content-max` | `72rem` | Max-width inner |
| `--pb-space-sm` | `1rem` | Spacer `--sm` |
| `--pb-space-md` | `2rem` | Spacer `--md` |
| `--pb-space-lg` | `4rem` | Spacer `--lg` |
| `--pb-space-xl` | `6rem` | Spacer `--xl` |
| `--pb-space-inline` | `var(--pb-space-sm)` | Padding `.pb-section__inner` |
| `--pb-radius` | `0.5rem` | Скругления |
| `--pb-color-text` | `inherit` | Основной текст |
| `--pb-color-muted` | `color-mix(...)` | Вторичный текст |
| `--pb-color-accent` | `#2563eb` | Акцент, ссылки в prose |
| `--pb-color-surface` | `#fff` | Фон карточек |
| `--pb-color-ink` | `#0f172a` | Тёмный текст на светлом |
| `--pb-color-border` | `color-mix(...)` | Границы |
| `--pb-color-on-accent` | `#fff` | Текст на акцентном фоне |
| `--pb-color-danger` | `#dc2626` | Ошибки форм |
| `--pb-color-danger-bg` | `#fef2f2` | Фон ошибки |
| `--pb-color-danger-text` | `#991b1b` | Текст ошибки |
| `--pb-color-success-bg` | `#ecfdf5` | Фон успеха |
| `--pb-color-success-text` | `#065f46` | Текст успеха |
| `--pb-shadow-card` | двухслойная тень | Карточки, `.pb-surface` |
| `--pb-button-bg` | `var(--pb-color-accent)` | Фон CTA |
| `--pb-button-color` | `var(--pb-color-on-accent)` | Текст CTA |
| `--pb-grid-gap` | `1.5rem` | Сетки cards, gallery, stats |
| `--pb-gallery-columns` | `3` | Колонки gallery на широком экране |
| `--pb-stats-columns` | `4` | Колонки stats |
| `--pb-hero-overlay` | `rgb(0 0 0 / 45%)` | Затемнение hero |
| `--pb-avatar-size` | `3rem` | Аватары testimonials |
| `--pb-prose-link` | `var(--pb-color-accent)` | Ссылки в richtext |
| `--pb-video-ratio` | `16 / 9` (в Pro CSS) | Embed video |

`--pb-hero-bg` задаётся inline на секции (URL фона), а не в блоке `.pb-page`.

### Пример темы

```css
.pb-page {
  --pb-color-accent: #059669;
  --pb-content-max: 60rem;
  --pb-section-gap: 2.5rem;
  --pb-space-inline: 1.25rem;
}
```

## BEM

Префикс блоков: `pb-`. Имя блока совпадает с ключом секции (`hero` → `pb-hero`).

| Уровень | Паттерн | Пример |
| --- | --- | --- |
| Block | `pb-{key}` | `pb-hero`, `pb-faq` |
| Section shell | `pb-section`, `pb-section--{key}` | `pb-section--cta` |
| Element | `pb-{block}__*` | `pb-hero__title`, `pb-section__inner` |
| Modifier | `pb-{block}--*` | `pb-hero--center`, `pb-spacer--md` |

На корне секции:

- `class="pb-section pb-section--hero pb-hero …"`
- `data-pb-section="hero"` для отладки и стилей
- `id="pb-{id}"` если в документе задан id секции

Общие примитивы из базового CSS:

| Класс | Назначение |
| --- | --- |
| `pb-button`, `pb-button--sm` | CTA и ссылки-кнопки |
| `pb-heading` | Заголовок секции |
| `pb-grid`, `pb-grid--cards` | CSS Grid |
| `pb-surface` | Карточка с тенью |
| `pb-spacer`, `pb-spacer--md` | Вертикальный отступ между блоками внутри секции |
| `pb-listing`, `pb-listing__grid` | Обёртка каталогов (Pro commerce) |
| `pb-carousel`, `pb-tabs` | Интерактив (Pro + JS) |

Spacer: два класса `pb-spacer pb-spacer--md`, не `pb-spacer-md`.

Кнопка в hero: `pb-hero__button pb-button`. Фон hero: CSS var `--pb-hero-bg`, не отдельный inline `background-image` без переменной.

## Fenom-оболочка секции

Штатный chunk hero (упрощённо):

```fenom
{var $heroBg = is_array($background) ? ($background.url ?: '') : ($background ?: '')}
<section class="pb-section pb-section--hero pb-hero{if $alignment == 'center'} pb-hero--center{/if}{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="hero"{if $id} id="pb-{$id|escape}"{/if}{if $heroBg} style="--pb-hero-bg: url('{$heroBg|escape}')"{/if}>
  <div class="pb-section__inner pb-hero__inner">
    <h1 class="pb-hero__title">{$title|escape}</h1>
    ...
  </div>
</section>
```

Переменные chunk:

- `$cssClass` из `data.cssClass` (событие `pbOnBeforeRenderSection`)
- `$id`: id секции в JSON документа
- поля секции по `name` из JSON (`$title`, `$background`, …)

Свои секции собирайте по тому же шаблону. Чеклист: [Разработчик → Определение секции](developer#opredelenie-sekcii).

## Partial `pagebuilder_partial_image`

Общий chunk для `<img>` в gallery, testimonials, image и Pro-секциях:

```fenom
{include 'pagebuilder_partial_image' image=$item.image alt=$item.alt class='pb-gallery__media'}
```

| Параметр | Описание |
| --- | --- |
| `image` | Строка URL или массив поля image (`url`) |
| `alt` | Alt-текст |
| `class` | CSS-класс на `<img>` |
| `loading` | По умолчанию `lazy` |

Partial не рендерит тег, если URL пустой.

## Escape и ссылки

| Тип поля | Fenom |
| --- | --- |
| text, textarea | `\|escape` |
| url в href | `\|pb_href\|escape` (нормализация MODX-ссылок) |
| richtext, editorjs | HTML редактора без sanitize на фронте |

Rich text выводите только если доверяете редакторам с правом сохранения ресурса. Остальной текст экранируйте.

## Дополнительный класс через событие

В `pbOnBeforeRenderSection` можно дописать `data.cssClass` перед рендером chunk. Chunk добавляет класс на `<section>`:

```php
case 'pbOnBeforeRenderSection':
    $pipeline = $scriptProperties['pipeline'] ?? null;
    if ($pipeline instanceof \PageBuilder\Section\SectionRenderPipeline) {
        $sections = $pipeline->sections();
        if (isset($sections[0])) {
            $sections[0]['data']['cssClass'] = trim(($sections[0]['data']['cssClass'] ?? '') . ' is-promo');
            $pipeline->replaceSection(0, $sections[0]);
        }
    }
    break;
```

Событие срабатывает только при промахе HTML-кеша сниппета (`use_cache=0` для отладки). Подробнее: [Менеджер и события](integration).

## Интерактив на фронте

`pagebuilder-sections.js` без зависимостей:

| Маркер | Поведение |
| --- | --- |
| `[data-pb-carousel]` | Слайды в `.pb-carousel__track`, dots, autoplay при `data-pb-autoplay="1"` |
| `[data-pb-tabs]` | Переключение панелей, hash в URL по `data-pb-anchor` |

Учитывается `prefers-reduced-motion: reduce` (autoplay и smooth scroll отключаются).

## Commerce-стили (Pro)

`pagebuilder-commerce.css` стилизует карточки товаров и блоки витрины: `.pb-product-card`, `.pb-product-spotlight`, promo-баннеры. Секции listing часто добавляют `pb-listing` рядом с блоком (`pb-products-grid pb-listing`).

Токены те же, что у `.pb-page`. Перекраска commerce идёт через `--pb-color-accent`, `--pb-color-surface`, `--pb-shadow-card`.

## Якоря и sticky header

У секций с `id="pb-…"` и карточек в listing задан `scroll-margin-top: 5.5rem`, чтобы sticky-шапка сайта не перекрывала якорь.

## Миграция spacer

Класс `pb-spacer-md` заменён на `pb-spacer--md`. После апгрейда проверьте кастомные CSS темы и свои chunks.

## Связанные страницы

- [Вывод на сайте](frontend)
- [Сниппет PageBuilder](snippets/PageBuilder)
- [Разработчик](developer#opredelenie-sekcii)
- [Каталог секций](sections/)
