---
title: "Цитата"
description: "Цитата с автором, должностью и аватаром. Слой Pro."
---

# Цитата

Секция `quote` выводит одну цитату. Chunk: `pagebuilderpro_quote`. Требуется PageBuilder Pro.

![Цитата](/components/pagebuilder/screenshots/sections/quote.jpg)

## Где уместна

- Выделенная фраза клиента
- Эпиграф статьи
- Одна рекомендация без карточек команды

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `text` | textarea | да | Текст цитаты |
| `author` | text | нет | Автор |
| `role` | text | нет | Должность |
| `avatar` | image | нет | Аватар |

## Рендер

Корень это `<figure>`, цитата в `<blockquote>`. Подпись `figcaption` появляется, если задан `author`, `role` или `avatar`. Аватар через `pagebuilder_partial_image`. Пустой `text` публикацию не проходит: поле обязательное.

## Данные секции {#vyvod-v-section-data}

```json
{
  "text": "Собрали страницу за день",
  "author": "Анна",
  "role": "Редактор",
  "avatar": { "url": "assets/images/anna.jpg" }
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_quote`:

```fenom
<figure class="pb-section pb-section--quote pb-quote{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="quote"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    <blockquote class="pb-quote__text">
      <p>{$text|escape}</p>
    </blockquote>
    {if $author || $role || $avatar}
      <figcaption class="pb-quote__meta">
        {if $avatar}{include 'pagebuilder_partial_image' image=$avatar alt=$author class='pb-quote__avatar'}{/if}
        <div>
          {if $author}<cite class="pb-quote__author">{$author|escape}</cite>{/if}
          {if $role}<span class="pb-quote__role">{$role|escape}</span>{/if}
        </div>
      </figcaption>
    {/if}
  </div>
</figure>
```

## Похожие секции

- [Отзывы клиентов](testimonials) для нескольких отзывов
- [Команда](team) для карточек сотрудников

## Связанные страницы

- [Каталог секций](index)
