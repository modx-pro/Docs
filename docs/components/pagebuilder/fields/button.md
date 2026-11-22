---
title: "button"
description: "Объект CTA: label, url и target"
---

# Поле button

Версия: **Free**.

<!-- ![button](/components/pagebuilder/screenshots/fields/button.jpg) -->

## Зачем этот тип

В одном поле три части ссылки: текст, адрес и куда открывать (`label`, `url`, `target`). В `url` работают плейсхолдеры UTM.

## Когда использовать

- Основная кнопка hero или CTA
- Вторичная ссылка с `target` `_blank`

## Советы

Несколько кнопок: [repeater](repeater) с вложенным полем `button`.

## Похожие типы

- [url](url) для голой ссылки
- [text](text) + [url](url) в двух отдельных полях

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

Объект `{ label: '', url: '', target: '_self' }`.

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
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
