---
title: "slug"
description: "Строка ЧПУ, часто с автогенерацией из sourceField"
---

# Поле slug

Версия: **Free**.

<!-- ![slug](/components/pagebuilder/screenshots/fields/slug.png) -->

## Зачем этот тип

Нормализация сегмента URL, не произвольный text. `sourceField` подтягивает заголовок при первом save. Pro: `responsive` исключён для имён alt, caption, slug.

## Когда использовать

- Якорь секции, slug карточки, сегмент фильтра
- ЧПУ в каталоге или landing block
- Ключ для табов и anchor-навигации

## Советы

Полный URL: [url](url), не slug. Slug не попадает в responsive map по умолчанию.

## Похожие типы

- [text](text) для видимого заголовка-источника
- [url](url) для готовой ссылки с протоколом

## Настройка

```json
{
  "name": "slug",
  "type": "slug",
  "label": "Slug",
  "sourceField": "title",
  "separator": "-",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка slug.

## Данные секции {#vyvod-v-section-data}

Ключ `slug` в данных секции:

```json
{
  "slug": "zagolovok-sekcii"
}
```

## Пример в chunk

```html
<span class="slug">{$slug|escape}</span>
```

## Примечание

Источник: `sourceField`, `slugSource` или алиас `from`. Разделитель: `separator`.

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

**Pro** (capability `responsive`): при `responsive: true` в данных секции: ключи `desktop`, `tablet`, `mobile` вместо скаляра.

- Дополнительно: `sourceField` / `from`, `separator`. Responsive для имени `slug` отключён.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
