---
title: "Изображение"
description: "Одно изображение на ширину контента с alt и подписью."
---

# Изображение

Один кадр на всю ширину колонки контента. Подходит для иллюстрации, скриншота или баннера без кнопки.

<!-- ![Изображение](/components/pagebuilder/screenshots/sections/image.png) -->

## Зачем эта секция

- Одно фото с alt и подписью, без repeater
- Быстрее [Галереи](gallery) для одного кадра
- Partial изображения как в остальных секциях пакета

## Где применять

- **Между абзацами** длинной статьи
- **Скриншот интерфейса** в описании продукта
- **Фото офиса или команды** без сетки

## Примеры страниц

- Статья: [Текст](richtext) → [Изображение](image) → [Текст](richtext)
- Кейс: [Hero](hero) → [Изображение](image) → [Цифры](stats)

## Что заполнить

Поле **Изображение** обязательно. **Alt-текст** нужен для SEO и screen reader. **Подпись** выводится под картинкой.

## Похожие секции

- [Галерея](gallery) для нескольких кадров
- [Hero](hero), если картинка фон первого экрана с текстом поверх

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `image` |
| Слой | Free |
| Категория | медиа (`media`) |
| Chunk | `pagebuilder_image` |
| Требования | — |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Изображение (`image`)

Тип [image](../fields/image#vyvod-v-section-data). Обязательное.

### Alt-текст (`alt`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Подпись (`caption`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

## Что видит посетитель

Секция `pb-image` с partial изображения.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "image": {
    "url": "assets/images/example.jpg",
    "id": 12,
    "filename": "example.jpg",
    "extension": "jpg",
    "title": "example.jpg",
    "width": 1920,
    "height": 1080,
    "type": "image"
  },
  "alt": "Описание изображения для скринридеров",
  "caption": "Подпись под изображением"
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_image`:

```fenom
<section class="pb-section pb-section--image pb-image{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="image"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-image__inner">
    <figure class="pb-image__figure">
      {include 'pagebuilder_partial_image' image=$image alt=($alt ?: $caption) class='pb-image__media'}
      {if $caption}
        <figcaption class="pb-image__caption">{$caption|escape}</figcaption>
      {/if}
    </figure>
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/image.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
