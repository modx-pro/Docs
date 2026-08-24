---
title: "fieldset"
description: "Группа nested fields с плоскими ключами в section.data"
---

# Поле fieldset

Слой: **Pro**.

<!-- ![fieldset](/components/pagebuilder/screenshots/fields/fieldset.png) -->

## Зачем этот тип

- Legend в инспекторе без ключа fieldset в data
- Вложенные name уникальны в пределах секции
- Организация длинных форм Pro

## Когда использовать

- Блок SEO title description в одной группе
- Settings overlay отдельно от content
- CMP readability для 15+ полей

## Советы

- Только подзаголовок без nested это [heading](heading)
- В chunk обращайтесь к flat keys seo_title не seo.title

## Похожие типы

- [heading](heading) декоративный divider (Free)
- [repeater](repeater) для массива объектов (Free)

## Настройка

```json
{
  "name": "seo",
  "type": "fieldset",
  "label": "SEO",
  "fields": [
    {
      "name": "seo_title",
      "type": "text",
      "label": "SEO title"
    }
  ]
}
```

## Значение

Плоские ключи вложенных полей в `section.data`.

## Вывод в section.data

Ключ `seo` в schema не попадает в `section.data`. Вложенные поля — плоские ключи:

```json
{
  "seo_title": "SEO title"
}
```

- Имена вложенных полей должны быть уникальны в пределах секции.

## Пример в chunk

```fenom
{$seo_title|escape}
```

## Общие свойства

У `fieldset` нет собственного ключа в `section.data`. Вложенные поля — **плоские** ключи рядом с остальными полями секции.

| Ключ | Роль |
| --- | --- |
| `label` | Заголовок группы (legend) |
| `fields` | Вложенная схема |
| `tab` / `width` | Группировка в инспекторе |

У вложенных полей работают обычные meta-ключи (`tab`, `width`, `default`, …).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
