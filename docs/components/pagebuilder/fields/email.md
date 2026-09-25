---
title: "email"
description: "Строка email в инспекторе. Слой Free."
---

# Поле email

Версия: **Free**.

## Зачем этот тип

Отдельное поле для адреса почты, не общий [text](text). Значение сохраняется строкой.

## Когда использовать

- Почта в карточке контакта
- Получатель, если это не поле формы FetchIt
- Отображение email в секции

## Настройка

```json
{
  "name": "email",
  "type": "email",
  "label": "Email"
}
```

## Данные секции {#vyvod-v-section-data}

```json
{
  "email": "editor@example.com"
}
```

## Пример в chunk

::: code-group

```modx
<a href="mailto:[[+email]]">[[+email]]</a>
```

```fenom
<a href="mailto:{$email|escape:'url'}">{$email|escape}</a>
```

:::

## Похожие типы

- [text](text) для произвольной строки
- [url](url) для ссылки
