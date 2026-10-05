---
title: "До и после"
description: "Два изображения с подписями Before и After. Слой Pro."
---

# До и после

Секция `before_after` ставит два кадра рядом. Chunk: `pagebuilderpro_before_after`. Требуется PageBuilder Pro. Категория: медиа.

![До и после](/components/pagebuilder/screenshots/sections/before_after.jpg)

## Где уместна

- Результат ремонта, ретуши, клинического случая
- Сравнение двух состояний одного объекта

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок |
| `before_label` | text | нет | Подпись «до» |
| `before_image` | image | да | Кадр «до» |
| `after_label` | text | нет | Подпись «после» |
| `after_image` | image | да | Кадр «после» |
| `caption` | textarea | нет | Общая подпись |

## Рендер

Две колонки `figure.pb-before-after__panel`. Слайдера и JS нет. Картинки через `pagebuilder_partial_image`. Если подпись пустая, alt равен `Before` или `After`. `caption` печатается под сеткой, только если заполнен.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Ремонт",
  "before_label": "До",
  "before_image": { "url": "assets/images/before.jpg" },
  "after_label": "После",
  "after_image": { "url": "assets/images/after.jpg" },
  "caption": "Три недели"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_before_after`:

```fenom
<section class="pb-section pb-section--before-after pb-before-after{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="before_after"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <div class="pb-before-after__grid">
      <figure class="pb-before-after__panel">
        {if $before_label}<figcaption>{$before_label|escape}</figcaption>{/if}
        {include 'pagebuilder_partial_image' image=$before_image alt=($before_label ?: 'Before') class='pb-before-after__image'}
      </figure>
      <figure class="pb-before-after__panel">
        {if $after_label}<figcaption>{$after_label|escape}</figcaption>{/if}
        {include 'pagebuilder_partial_image' image=$after_image alt=($after_label ?: 'After') class='pb-before-after__image'}
      </figure>
    </div>
    {if $caption}<p class="pb-before-after__caption">{$caption|escape}</p>{/if}
  </div>
</section>
```

## Похожие секции

- [Галерея](gallery) для нескольких кадров без пары
- [Медиа и текст](media_split) для одного изображения и текста

## Связанные страницы

- [Каталог секций](index)
