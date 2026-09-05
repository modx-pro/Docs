---
title: "Записи блога"
description: "Список дочерних ресурсов родителя через pdoResources. Слой Pro."
---

# Записи блога

Автоматическая лента статей: вы указываете родителя-блог, лимит и сортировку. Анонс и превью подтягиваются из ресурсов.

<!-- ![Записи блога](/components/pagebuilder/screenshots/sections/blog_posts.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Что даёт лента блога

- Лента из дочерних ресурсов, без ручного msProducts/pdo в шаблоне
- Лимит и сортировка в инспекторе
- Анонс и превью включаются флагами

## Куда ставить

- На главной блога: последние публикации
- На главной сайта: блок «Из блога»
- На лендинге: три свежие статьи

## Примеры страниц

- Главная: [Hero](hero) → [Blog posts](blog_posts) → [CTA](cta)
- Раздел блога: [Blog posts](blog_posts) → [Contact](contact)

## Родитель и лимит

**Родитель блога**: ID или выбор ресурса. **Лимит**, **Сортировка**, флаги **Показывать анонс** / **изображение**.

## Похожие секции

- [Structured content](structured_content) для одной статьи, а не списка
- [Карточки](cards) для статичных ссылок без pdoResources

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `blog_posts` |
| Слой | Pro |
| Категория | контент (`content`) |
| Chunk | `pagebuilderpro_blog_posts` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Родитель блога (`parent`)

Тип [relation](../fields/relation#vyvod-v-section-data). Обязательное. Выбор одного ресурса MODX в модальном окне поиска.

### Лимит (`limit`)

Тип [number](../fields/number#vyvod-v-section-data). Необязательное.

### Показывать анонс (`show_intro`)

Тип [yesno](../fields/yesno#vyvod-v-section-data). Необязательное. Переключатель да/нет.

### Показывать изображение (`show_image`)

Тип [yesno](../fields/yesno#vyvod-v-section-data). Необязательное. Переключатель да/нет.

### Сортировка (`sortby`)

Тип [select](../fields/select#vyvod-v-section-data). Необязательное. Выпадающий список с заранее заданными вариантами.

### Layout (`layout`)

Тип [select](../fields/select#vyvod-v-section-data). Необязательное. Выпадающий список с заранее заданными вариантами.

## Что видит посетитель

Секция `pb-blog-posts` с карточками статей.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "parent": 101,
  "limit": 6,
  "show_intro": true,
  "show_image": true,
  "sortby": "menuindex",
  "layout": "grid"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_blog_posts`:

```fenom
<section class="pb-section pb-section--blog-posts pb-blog-posts pb-blog-posts--{$layout|default:'grid'|escape}{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="blog_posts"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-blog-posts__inner">
    {if $title}
      <h2 class="pb-heading pb-blog-posts__title">{$title|escape}</h2>
    {/if}
    <div class="pb-blog-posts__listing">
      {var $includeTvs = ($show_image|default:0) ? 'image' : ''}
      {$modx->runSnippet('pdoResources', [
        'parents' => $parent.id|default:($parent_id|default:0),
        'depth' => 1,
        'limit' => $limit|default:6,
        'sortby' => $blog_sortby|default:'publishedon',
        'sortdir' => $blog_sortdir|default:'DESC',
        'includeContent' => $show_intro|default:0,
        'includeTVs' => $includeTvs,
        'tpl' => 'pagebuilderpro_blog_post_row'
      ])}
    </div>
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/blog_posts.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
