---
title: "heading"
description: "Декоративный подзаголовок группы полей без записи в data"
---

# Поле heading

Слой: **Free**.

<!-- ![heading](/components/pagebuilder/screenshots/fields/heading.png) -->

## Зачем этот тип

- Разбивает длинный инспектор на блоки
- Не создаёт ключ в section.data
- Работает tab и width как у обычных полей

## Когда использовать

- Подпись «Кнопка», «SEO», «Медиа» между полями
- Визуальный разделитель без fieldset (Pro)
- Документация прямо в форме через label

## Советы

- name можно технический, например `_h`
- Вложенная группа с полями это [fieldset](fieldset) (Pro)

## Похожие типы

- [fieldset](fieldset) для legend и nested fields (Pro)
- [dependent](dependent) маркер для showWhen блоков (Pro)

## Настройка

```json
{
  "name": "_h",
  "type": "heading",
  "label": "Группа полей",
  "tab": "Контент",
  "width": 100
}
```

## Значение

Не попадает в `section.data`.

## Вывод в section.data

В `section.data` не сохраняется.

## Пример в chunk

Не используется в chunk.

## Общие свойства

Значение в `section.data` **не сохраняется**.

| Ключ | Роль | CMP |
| --- | --- | --- |
| `tab` | Группа в инспекторе | да |
| `width` | Ширина подписи, 25–100 (%) | да |
| `label` | Текст подзаголовка / маркера | да |

См. [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
