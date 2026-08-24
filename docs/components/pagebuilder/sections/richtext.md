---
title: "Текстовый блок"
description: "Произвольный HTML-текст через визуальный редактор в инспекторе."
---

# Текстовый блок

Обычный текстовый фрагмент между другими секциями. Редактор похож на стандартный richtext MODX: абзацы, списки, ссылки, базовое форматирование.

<!-- ![Текстовый блок](/components/pagebuilder/screenshots/sections/richtext.png) -->

## Зачем эта секция

- Привычный richtext MODX, без отдельного TV на каждый абзац
- Вставляется между любыми секциями в нужном порядке
- HTML попадает в `section.data.content` и в Fenom как готовый фрагмент

## Где применять

- **Статья или новость** — основной текст страницы
- **Описание услуги** между hero и блоком преимуществ
- **Юридический текст**, инструкция, любой контент без отдельной вёрстки

## Примеры страниц

- Статья: [Hero](hero) → [Текстовый блок](richtext) → [Изображение](image) → [Текстовый блок](richtext)
- О компании: [Hero](hero) → [Текстовый блок](richtext) → [Команда](team) → [CTA](cta)

## Что заполнить

Контент хранится в поле **Содержимое**. Для длинных текстов удобнее секция **Структурированный контент** (Editor.js, Pro).

## Похожие секции

- [Структурированный контент](structured_content) для длинных статей с блоками Editor.js (Pro)
- [Вкладки](tabs), если материал логичнее делить на панели

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `richtext` |
| Слой | Free |
| Категория | контент (`content`) |
| Chunk | `pagebuilder_richtext` |
| Требования | — |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Содержимое (`content`)

Тип [richtext](../fields/richtext#vyvod-v-section-data). Обязательное.

## Что видит посетитель

Обёртка `pb-richtext` с HTML из поля `content`.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "content": "<p>Текст страницы с <strong>форматированием</strong>.</p>"
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_richtext`:

```fenom
<section class="pb-section pb-section--richtext pb-richtext{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="richtext"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-richtext__inner">
    <div class="pb-richtext__content">
      {$content}
    </div>
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/richtext.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
