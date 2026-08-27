---
title: "tv"
description: "Объект id name caption выбранного MODX TV"
---

# Поле tv

Версия: **Pro**.

<!-- ![tv](/components/pagebuilder/screenshots/fields/tv.png) -->

## Зачем этот тип

Выбор template variable для гибридного chunk: на фронте `[[*{$tv.name}]]`. Pro-мост между секцией PB и TV ресурса.

## Когда использовать

- Секция читает TV ресурса по выбору редактора
- Общая TV hero-image для нескольких шаблонов
- Dev: выбор, какую TV отдать в секцию

## Советы

Значение TV в данных секции не дублируется. Загрузка файла в секции: [image](image) или [file](file).

## Похожие типы

- [chunk](chunk) для выбора чанка по name
- [relation](relation) для ресурса, не TV

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

## Данные секции {#vyvod-v-section-data}

Ключ `tv` в данных секции:

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

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
