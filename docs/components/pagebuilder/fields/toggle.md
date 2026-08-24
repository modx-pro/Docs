---
title: "toggle"
description: "Boolean через switch PrimeVue в инспекторе"
---

# Поле toggle

Слой: **Free**.

<!-- ![toggle](/components/pagebuilder/screenshots/fields/toggle.png) -->

## Зачем этот тип

- Наглядный on/off без radio или checkbox
- То же boolean в data, что у yesno
- Хорошо для частых переключений режима

## Когда использовать

- Включить overlay, autoplay, dark mode секции
- showWhen по boolean соседнего поля
- Быстрый флаг без текста «Да/Нет»

## Советы

- Классический MODX yes/no возьмите [yesno](yesno)
- Значение всё равно boolean, не строка

## Похожие типы

- [yesno](yesno) для привычного да/нет
- [checkbox](checkbox) для формы с явной подписью опции

## Настройка

```json
{
  "name": "enabled",
  "type": "toggle",
  "label": "Включено",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Булево.

## Вывод в section.data

Ключ `enabled` в `section.data`:

```json
{
  "enabled": true
}
```

## Пример в chunk

```fenom
{if $enabled}<div class="block is-enabled">…</div>{/if}
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
