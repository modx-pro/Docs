---
title: "fieldset"
description: "Группа вложенных полей с плоскими ключами в данных секции"
---

# Поле fieldset

Версия: **Pro** (`advanced-fields`).

<!-- ![fieldset](/components/pagebuilder/screenshots/fields/fieldset.jpg) -->

## Зачем этот тип

Подпись группы в инспекторе. Отдельного ключа группы в данных секции нет: вложенные поля пишутся своими именами.

## Когда использовать

- Блок SEO `title` и `description` в одной группе
- Настройки `overlay` отдельно от `content`
- Читаемость панели управления при 15+ полях

## Советы

Подзаголовок без вложенных полей: [heading](heading). В chunk берите плоский ключ `seo_title`, а не `seo.title`.

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

## Данные секции {#vyvod-v-section-data}

Ключ `seo` в данные секции не попадает, вложенные поля дают плоские ключи:

```json
{
  "seo_title": "SEO title"
}
```

- Имена вложенных полей лучше держать уникальными в пределах секции: CMP проверяет только непустое `name`, дубликаты не блокирует.

## Пример в chunk

::: code-group

```modx
[[+seo_title]]
```

```fenom
{$seo_title|pb_text}
```

:::

## Общие свойства

| Ключ | Роль |
| --- | --- |
| `label` | Заголовок группы (`legend`) |
| `fields` | Вложенная схема |
| `tab` / `width` | Группировка в инспекторе |

У вложенных полей работают обычные meta-ключи (`tab`, `width`, `default`, …).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
