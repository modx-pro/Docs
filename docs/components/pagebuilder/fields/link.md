---
title: "link"
description: "Объект label, url и target. Слой Pro."
---

# Поле link

Версия: **Pro** (`advanced-fields`).

Объект ссылки, не одна строка URL. Поля: `label`, `url`, `target`. По умолчанию `target` равен `_self`. В URL можно вставить UTM-токен из чипов инспектора.

## Настройка

```json
{
  "name": "cta",
  "type": "link",
  "label": "Ссылка"
}
```

## Данные секции {#vyvod-v-section-data}

```json
{
  "cta": {
    "label": "Подробнее",
    "url": "/about",
    "target": "_self"
  }
}
```

## Пример в chunk

::: code-group

```modx
<a href="[[+cta.url]]" target="[[+cta.target]]">[[+cta.label]]</a>
```

```fenom
<a href="{$cta.url|pb_href|escape}" target="{$cta.target|escape}">{$cta.label|pb_text}</a>
```

:::

## Похожие типы

- [url](url) для одной строки
- [button](button) для того же объекта в Free
