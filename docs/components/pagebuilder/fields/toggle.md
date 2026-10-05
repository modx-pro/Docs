---
title: "toggle"
description: "Boolean через switch PrimeVue в инспекторе"
---

# Поле toggle

Версия: **Free**.

<!-- ![toggle](/components/pagebuilder/screenshots/fields/toggle.jpg) -->

## Зачем этот тип

Переключатель вкл/выкл, без радиокнопок и без флажка. В данных то же да/нет, что у [yesno](yesno). Удобен, когда режим переключают часто.

## Когда использовать

- Overlay, autoplay, dark mode секции
- `showWhen` по boolean соседнего поля
- Быстрый флаг без подписи «Да/Нет»

## Советы

Классический MODX yes/no: [yesno](yesno). Значение всё равно boolean, не строка.

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

## Данные секции {#vyvod-v-section-data}

Ключ `enabled` в данных секции:

```json
{
  "enabled": true
}
```

## Пример в chunk

::: code-group

```modx
<div class="block is-enabled">…</div>
```

```fenom
{if $enabled}<div class="block is-enabled">…</div>{/if}
```

:::

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

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
