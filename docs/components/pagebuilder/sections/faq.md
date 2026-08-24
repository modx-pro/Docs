---
title: "Вопросы и ответы"
description: "Список пар «вопрос / ответ» для FAQ на странице."
---

# Вопросы и ответы

Блок частых вопросов. Каждая строка — заголовок вопроса и текст ответа. Ответ может содержать HTML из richtext.

<!-- ![Вопросы и ответы](/components/pagebuilder/screenshots/sections/faq.png) -->

## Зачем эта секция

- Вопросы правятся списком в инспекторе, порядок перетаскиванием
- Ответ может быть richtext с ссылками и списками
- Один блок закрывает типовые возражения на лендинге

## Где применять

- **Страница поддержки** или база знаний
- **Лендинг** — снятие возражений перед формой
- **Карточка товара** — доставка, гарантия, уход

## Примеры страниц

- Лендинг: [Hero](hero) → [Преимущества](features) → [FAQ](faq) → [Форма](contact_form)
- Товар: [Описание](richtext) → [FAQ](faq) → [Похожие товары](related_products)

## Что заполнить

Repeater **Вопросы**: в каждой строке **Вопрос** и **Ответ**. Порядок строк = порядок на сайте.

## Похожие секции

- [Вкладки](tabs) для длинных текстов вместо длинного FAQ
- [Текстовый блок](richtext), если нужен один текст без структуры воп/ответ

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `faq` |
| Слой | Free |
| Категория | контент (`content`) |
| Chunk | `pagebuilder_faq` |
| Требования | — |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Вопросы (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `question` | [text](../fields/text#vyvod-v-section-data) | Вопрос | да |
| `answer` | [richtext](../fields/richtext#vyvod-v-section-data) | Ответ | да |

## Что видит посетитель

Секция `pb-faq` со списком вопросов. Разметка готова под аккордеон через `pagebuilder-sections.js` или статичный список в теме.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "question": "Как оформить заказ?",
      "answer": "<p>Добавьте товар в корзину и перейдите к оформлению.</p>"
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_faq`:

```fenom
<section class="pb-section pb-section--faq pb-faq{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="faq"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-faq__inner">
    {if $title}
      <h2 class="pb-heading pb-faq__title">{$title|escape}</h2>
    {/if}
    <div class="pb-faq__list">
      {foreach $items as $item}
        <details class="pb-faq__item">
          <summary class="pb-faq__question">{$item.question|escape}</summary>
          <div class="pb-faq__answer pb-richtext__content">{$item.answer}</div>
        </details>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/faq.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
