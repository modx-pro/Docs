---
title: "url"
description: "Строка URL с базовой проверкой формата в инспекторе"
---

# Поле url

Слой: **Free**.

<!-- ![url](/components/pagebuilder/screenshots/fields/url.png) -->

## Зачем этот тип

- Отдельный тип вместо text для ссылок
- Pro: `responsive` для разных URL по breakpoint
- Поддержка UTM-плейсхолдеров в связке с button

## Когда использовать

- Ссылка кнопки, внешний ресурс, якорь
- href для карточки или логотипа партнёра
- Fallback, когда не нужен объект button

## Советы

- Кнопка с label и target удобнее в [button](button)
- Внутренние страницы MODX чаще через [relation](relation) или [resourcelist](resourcelist) (Pro)

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

## Вывод в section.data

Ключ `link` в `section.data`:

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

Для полей с `name`, которые сохраняются в `section.data`:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

**Pro** (capability `responsive`): при `responsive: true` в `section.data` — ключи `desktop`, `tablet`, `mobile` вместо скаляра.

- Дополнительно: `showWhen`, UTM-плейсхолдеры `\{\{utm:key\}\}` в строке URL.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
