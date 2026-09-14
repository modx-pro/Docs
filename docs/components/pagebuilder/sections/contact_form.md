---
title: "Форма обратной связи"
description: "Форма с настраиваемым набором полей через FetchIt. Слой Pro."
---

# Форма обратной связи

Вы собираете набор полей в инспекторе (text, email, phone, textarea), задаёте **Ключ формы** и текст после отправки. Отправка идёт через **FetchIt** и сниппет `PageBuilderContactForm`. Из шаблона handler не вызывайте.

<!-- ![Форма обратной связи](/components/pagebuilder/screenshots/sections/contact_form.png) -->

::: info
Требуются PageBuilder Pro и **FetchIt**.
:::

## Что даёт форма в PageBuilder

- Набор полей собираете в repeater, не в коде формы
- `form_key` стабильный id POST (`pb_form_key`)
- Сообщение об успехе и redirect настраиваются в инспекторе
- Персональные данные в `published_json` не пишутся

## Типичные места

- Для заявки с лендинга
- Для обратной связи на странице контактов
- Для лид-магнита: скачать PDF после email

## Примеры страниц

- Лендинг: [Hero](hero) → [Features](features) → [Contact form](contact_form)
- Контакты: [Контакты с картой](contact_map) → [Contact form](contact_form)

## form_key и поля

**Ключ формы** (`form_key`) должен быть уникален на странице, если форм несколько. Repeater **Поля формы**: name, label, type (`text` / `email` / `phone` / `textarea`), required. Имя поля: `[a-z][a-z0-9_]*`.

Получатель письма: `emailsender` или настройки почты сайта (как у handler). Без **FetchIt** секция показывает сообщение о недоступности формы.

## Похожие секции

- [Квиз](quiz) для многошагового сбора
- [CTA](cta) с одной ссылкой вместо полей
- [Контакты](contact) для tel:/mailto: без отправки формы

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `contact_form` |
| Слой | Pro |
| Категория | конверсия (`conversion`) |
| Chunk | `pagebuilderpro_contact_form` |
| Требования | pro, FetchIt |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Вступление (`intro`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### Ключ формы (`form_key`)

Тип [text](../fields/text#vyvod-v-section-data). Обязательное.

### Поля формы (`fields`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `name` | [text](../fields/text#vyvod-v-section-data) | Имя поля (name) | да |
| `label` | [text](../fields/text#vyvod-v-section-data) | Подпись | да |
| `type` | [select](../fields/select#vyvod-v-section-data) | Тип поля | да |
| `required` | [yesno](../fields/yesno#vyvod-v-section-data) | Обязательное | нет |

### Текст кнопки отправки (`submit_label`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Сообщение об успехе (`success_message`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### URL после отправки (`redirect_url`)

Тип [url](../fields/url#vyvod-v-section-data). Необязательное.

## Что видит посетитель

Секция `pb-contact-form`. AJAX через FetchIt → [PageBuilderContactForm](../snippets/PageBuilderContactForm). Honeypot `nospam`: тихий success без письма.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции (схема полей, не ответы посетителя):

```json
{
  "title": "Оставьте заявку",
  "intro": "Мы ответим в рабочее время.",
  "form_key": "contact",
  "fields": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "name": "name",
      "label": "Имя",
      "type": "text",
      "required": true
    },
    {
      "_rowId": "00000000-0000-4000-8000-000000000002",
      "name": "email",
      "label": "Email",
      "type": "email",
      "required": true
    }
  ],
  "submit_label": "Отправить",
  "success_message": "Спасибо! Мы свяжемся с вами в ближайшее время.",
  "redirect_url": "https://example.com/thanks"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_contact_form` рисует обложку и при наличии FetchIt вызывает:

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'PageBuilderContactForm',
  'form' => 'pagebuilderpro_contact_form_fields',
]}
```

Точный вызов смотрите в файле пакета. Без FetchIt: лексикон `pagebuilder_fe_form_unavailable`.

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/contact_form.json`

## Связанные страницы

- [Квиз](quiz)
- [Сниппет PageBuilderContactForm](../snippets/PageBuilderContactForm)
- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
