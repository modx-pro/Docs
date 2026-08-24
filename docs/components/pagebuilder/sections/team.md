---
title: "Команда"
description: "Карточки сотрудников с фото, именем, должностью и биографией. Слой Pro."
---

# Команда

Блок команды: фото, имя, роль и короткий текст «о себе». Несколько человек выводятся сеткой.

<!-- ![Команда](/components/pagebuilder/screenshots/sections/team.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Зачем эта секция

- Фото и роль сотрудника в предсказуемой карточке
- Repeater: новый человек без правки шаблона
- Отделение от [Отзывов](testimonials) (клиент vs команда)

## Где применять

- **Страница «О нас»**
- **Лендинг агентства** — лица проекта
- **Конференция** — спикеры

## Примеры страниц

- О нас: [Hero](hero) → [Текст](richtext) → [Команда](team) → [CTA](cta)
- Конференция: [Команда](team) → [FAQ](faq) → [Контакты](contact_map)

## Что заполнить

Repeater **Участники**. Фото через поле **Фото**; биография — обычный textarea или richtext в зависимости от JSON секции.

## Похожие секции

- [Отзывы](testimonials) для цитат клиентов
- [Карточки](cards) для текстовых ролей без фото

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `team` |
| Слой | Pro |
| Категория | доверие (`social`) |
| Chunk | `pagebuilderpro_team` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Участники (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `photo` | [image](../fields/image#vyvod-v-section-data) | Фото | нет |
| `name` | [text](../fields/text#vyvod-v-section-data) | Имя | да |
| `role` | [text](../fields/text#vyvod-v-section-data) | Должность | нет |
| `bio` | [textarea](../fields/textarea#vyvod-v-section-data) | О себе | нет |

## Что видит посетитель

Сетка `pb-team` с фото и текстом.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "photo": {
        "url": "assets/images/example.jpg",
        "id": 12,
        "filename": "example.jpg",
        "extension": "jpg",
        "title": "example.jpg",
        "width": 1920,
        "height": 1080,
        "type": "image"
      },
      "name": "Иван Петров",
      "role": "Директор, ООО Пример",
      "bio": "15 лет в отрасли, ведёт ключевые проекты компании."
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_team`:

```fenom
<section class="pb-section pb-section--team pb-team{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="team"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-team__inner">
    {if $title}
      <h2 class="pb-heading pb-team__title">{$title|escape}</h2>
    {/if}
    <div class="pb-team__grid">
      {foreach $items as $item}
        <article class="pb-team__item">
          {if $item.photo}
            {include 'pagebuilder_partial_image' image=$item.photo alt=$item.name class='pb-team__photo'}
          {/if}
          <h3 class="pb-team__name">{$item.name|escape}</h3>
          {if $item.role}
            <div class="pb-team__role">{$item.role|escape}</div>
          {/if}
          {if $item.bio}
            <p class="pb-team__bio">{$item.bio|escape}</p>
          {/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/team.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
