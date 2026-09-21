---
title: "button"
description: "Объект CTA: label, url и target"
---

# Поле button

Версия: **Free**.

<!-- ![button](/components/pagebuilder/screenshots/fields/button.jpg) -->

## Зачем этот тип

В одном поле три части ссылки: текст, адрес и куда открывать (`label`, `url`, `target`). В адресе можно оставить плейсхолдеры UTM. В чанке из этого объекта собирается тег `<a>`.

## Когда использовать

- Основная кнопка hero или CTA
- Secondary link с target `_blank`
- Пара текст + ссылка без двух отдельных полей

## Советы

Только URL без label: [url](url). Несколько кнопок: repeater с nested button или text+url.

## Похожие типы

- [url](url) для голой ссылки
- [text](text) + [url](url) если нужен раздельный layout

## Настройка

```json
{
  "name": "cta",
  "type": "button",
  "label": "Кнопка",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект `{ label, url, target }`.

## Данные секции {#vyvod-v-section-data}

Ключ `cta` в данных секции:

```json
{
  "cta": {
    "label": "Подробнее",
    "url": "https://example.com",
    "target": "_blank"
  }
}
```

## Пример в chunk

::: code-group

```modx
<a class="pb-button" href="[[+cta.url]]" target="[[+cta.target]]">[[+cta.label]]</a>
```

```fenom
<a class="pb-button" href="{$cta.url|pb_href|escape}" target="{$cta.target|escape}">{$cta.label|pb_text}</a>
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: UTM-плейсхолдеры в `url`.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
