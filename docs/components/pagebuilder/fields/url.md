---
title: "url"
description: "Строка URL с базовой проверкой формата в инспекторе"
---

# Поле url

Версия: **Free**.

<!-- ![url](/components/pagebuilder/screenshots/fields/url.png) -->

## Зачем этот тип

Отдельный тип для ссылок вместо text. В Pro доступен `responsive` для разных URL по breakpoint. Поддерживает UTM-плейсхолдеры в связке с [button](button).

## Когда использовать

- Ссылка кнопки, внешний ресурс, якорь
- `href` для карточки или логотипа партнёра
- Fallback, когда объект button не нужен

## Советы

Кнопка с label и target: [button](button). Внутренние страницы MODX чаще через [relation](relation) или [resourcelist](resourcelist).

## Похожие типы

- [button](button) для label + url + target
- [slug](slug) для сегмента пути, не полного URL

## Настройка

```json
{
  "name": "link",
  "type": "url",
  "label": "Ссылка",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка URL.

## Данные секции {#vyvod-v-section-data}

Ключ `link` в данных секции:

```json
{
  "link": "https://example.com/page"
}
```

## Пример в chunk

```html
<a href="{$link|escape}">Подробнее</a>
```

## Примечание

Pro: `responsive`.

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

**Pro** (capability `responsive`): при `responsive: true` в данных секции: ключи `desktop`, `tablet`, `mobile` вместо скаляра.

- Дополнительно: `showWhen`, UTM-плейсхолдеры `\{\{utm:key\}\}` в строке URL.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
