---
title: "url"
description: "Строка URL с базовой проверкой формата в инспекторе"
---

# Поле url

Версия: **Free**.

<!-- ![url](/components/pagebuilder/screenshots/fields/url.jpg) -->

## Зачем этот тип

Отдельное поле для ссылки, не обычный текст. В Pro можно задать разные адреса для компьютера, планшета и телефона. В адресе работают плейсхолдеры UTM, как у [button](button).

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

::: code-group

```modx
<a href="[[+link]]">Подробнее</a>
```

```fenom
<a href="{$link|pb_href|escape}">Подробнее</a>
```

:::

## Примечание

Pro: `responsive`.

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

**Pro** (capability `responsive`): при `responsive: true` в данных секции: ключи `desktop`, `tablet`, `mobile` вместо скаляра.

- Дополнительно: `showWhen`, UTM-плейсхолдеры `\{\{utm:key\}\}` в строке URL.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
