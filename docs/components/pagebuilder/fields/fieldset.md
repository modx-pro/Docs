---
title: "fieldset"
description: "Группа вложенных полей с плоскими ключами в данных секции"
---

# Поле fieldset

Версия: **Pro**.

<!-- ![fieldset](/components/pagebuilder/screenshots/fields/fieldset.png) -->

## Зачем этот тип

Legend в инспекторе без ключа fieldset в data. Вложенные `name` уникальны в пределах секции. Организация длинных форм Pro.

## Когда использовать

- Блок SEO title/description в одной группе
- Настройки overlay отдельно от content
- Читаемость панели управления при 15+ полях

## Советы

Только подзаголовок без nested: [heading](heading). В chunk обращайтесь к плоским ключам `seo_title`, не `seo.title`.

## Похожие типы

- [heading](heading) декоративный разделитель (Free)
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

Плоские ключи вложенных полей в данных секции.

## Данные секции {#vyvod-v-section-data}

Ключ `seo` в schema не попадает в данные секции. Вложенные поля: плоские ключи:

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

У `fieldset` нет собственного ключа в данных секции. Вложенные поля: **плоские** ключи рядом с остальными полями секции.

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
