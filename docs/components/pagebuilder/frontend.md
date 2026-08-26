---
title: Вывод на сайте
description: Шаблон, CSS, Fenom chunks секций, кеш и превью черновика
---
# Вывод на сайте

## Шаблон

<!-- ![Страница с секциями на сайте](/components/pagebuilder/screenshots/fe-page-sections.png) -->

Сниппет `PageBuilder` вставляют в шаблон или в поле content. Вызов некэшированный:

::: code-group

```modx
[[!PageBuilder]]
```

```fenom
{'!PageBuilder' | snippet}
```

:::

Опубликованные секции рендерятся через Fenom chunks в `core/components/pagebuilder/elements/chunks/`. Имена chunks привязаны к ключу секции (`pagebuilder_section_hero` и т.д.).

## CSS

По умолчанию сниппет регистрирует:

- `pagebuilder-sections.css`: базовые стили секций Free
- при Pro и интерактивных секциях подключается `pagebuilder-sections.js` (tabs, carousel)

Отключить глобально: `pagebuilder_load_frontend_css = 0`. На одном вызове: `&load_css=`0``.

Обёртка страницы `<div class="pb-page">` управляется `wrap_page` (по умолчанию совпадает с `load_css`).

Токены, BEM и Fenom-оболочка: [Дизайн-система](design-system).

## Кеш HTML

Параметр `use_cache=1` (по умолчанию) кеширует итоговый HTML в MODX. После публикации секций сбросьте кеш сайта или временно вызовите с `use_cache=0`.

События `pbOnBeforeRenderDocument` и `pbOnBeforeRenderSection` вызываются только при промахе кеша (когда HTML ещё не закэширован).

## Фильтр секций

Параметр `section_types` ограничивает вывод списком ключей:

::: code-group

```modx
[[!PageBuilder? &section_types=`hero,cta`]]
```

```fenom
{'!PageBuilder' | snippet : ['section_types' => 'hero,cta']}
```

:::

Удобно, если нужны фрагменты страницы в разных местах шаблона.

## JSON вместо HTML

`return_values=1` возвращает JSON с извлечёнными значениями полей (`plainText`, структура `sections`). Подходит для headless-сценариев или своего шаблонизатора. Срабатывает `pbOnGetValues`.

## Видимость секций

В JSON документа у секции могут быть `settings.contexts` и `settings.utm`. Контекст берётся из текущего контекста MODX. UTM приходит из `$_SESSION['utm']` после `PageBuilderUtmSession`.

Секция не рендерится, если правило не выполнено.

## Превью черновика

Публичный сайт показывает только опубликованную версию. Черновик смотрят через менеджер (кнопка Preview) или URL:

`{assets_url}components/pagebuilder/preview.php`

Токен подписывается `pagebuilder_preview_secret`. В iframe подключаются CSS шаблона (`pagebuilder_preview_include_template_css`) и список из `pagebuilder_preview_css_urls`.

<!-- ![Превью черновика](/components/pagebuilder/screenshots/mgr-section-preview.png) -->

## Кастомизация chunks

1. Скопируйте chunk секции в категорию темы.
2. Измените Fenom-разметку, сохраните имя или переопределите mapping в plugin на `pbOnBeforeRenderSection`.

Pipeline `SectionRenderPipeline::replaceSection()` позволяет подменить секцию в plugin до рендера chunk.

## Связанные страницы

- [Сниппеты](snippets)
- [Дизайн-система](design-system)
- [Каталог секций](sections/)
- [События рендера](integration#рендер-на-фронте)
