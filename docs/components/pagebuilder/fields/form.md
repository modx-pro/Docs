---
title: "form"
description: "Ключ схемы из CMP Forms. Capability forms. Слой Pro."
---

# Поле form

Версия: **Pro**, capability `forms`.

Строка: ключ схемы из вкладки CMP **Forms**. Список схем читает `mgr/form/list`. Сама форма на сайте собирается секцией [form_builder](../sections/form_builder) через FetchIt.

## Настройка

```json
{
  "name": "form",
  "type": "form",
  "label": "Форма"
}
```

## Данные секции {#vyvod-v-section-data}

```json
{
  "form": "contact"
}
```

## Похожие типы

- Секция [Форма обратной связи](../sections/contact_form), где поля задают в инспекторе, а не в CMP
