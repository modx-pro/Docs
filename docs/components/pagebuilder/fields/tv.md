---
title: "tv"
description: "Объект id name caption выбранного MODX TV"
---

# Поле tv

Слой: **Pro**.

<!-- ![tv](/components/pagebuilder/screenshots/fields/tv.png) -->

## Зачем этот тип

- Picker template variable для hybrid chunk
- Вывод `[[*{$tv.name}]]` на фронте
- Pro bridge между PB секцией и resource TV

## Когда использовать

- Секция читает TV ресурса по выбору редактора
- Shared hero image TV across templates
- Dev tooling pick which TV to expose

## Советы

- Значение TV не дублируется в section.data
- Inline upload в секции это [image](image) или [file](file)

## Похожие типы

- [chunk](chunk) pick chunk by name
- [relation](relation) pick resource not TV

## Настройка

```json
{
  "name": "tv",
  "type": "tv",
  "label": "TV",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект `{ id, name, caption }`.

## Вывод в section.data

Ключ `tv` в `section.data`:

```json
{
  "tv": {
    "id": 7,
    "name": "hero_image",
    "caption": "Hero image"
  }
}
```

## Пример в chunk

```html
[[*{$tv.name}]]
```

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

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
