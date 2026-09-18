---
title: PageBuilderFormBuilder
description: "FetchIt-handler секции form_builder. Из шаблона не вызывается"
---

# Сниппет PageBuilderFormBuilder

Handler AJAX-отправки секции Pro [form_builder](../sections/form_builder). Чанк вызывает его через [PageBuilderFetchIt](PageBuilderFetchIt). Из шаблона ресурса сниппет не вызывайте.

## Назначение

Ищет опубликованную секцию `form_builder` с тем же ключом схемы, проверяет CSRF и honeypot, пишет outbox в транзакции и после commit отправляет письмо и webhook. Submissions в БД не хранятся. Нужна capability `forms`.

## Где вызывается

Chunk `pagebuilderpro_form_builder` передаёт в `PageBuilderFetchIt` свойства `snippet` = `PageBuilderFormBuilder` и `form` = `pagebuilderpro_form_builder_fields`.

## Параметры

Отдельных свойств для вызова из шаблона нет. POST формы:

| Поле | Назначение |
| --- | --- |
| `pb_form_key` | Ключ схемы. Пустой ключ даёт ошибку валидации |
| `pb_csrf` | Токен. Неверный токен: `CSRF token is invalid.` |
| `nospam` | Honeypot. Заполненное поле отвечает success и письмо не шлёт |

`resource_id` берётся из свойств чанка или из текущего ресурса. Если секции или схемы нет, ответ `pagebuilder_fe_form_not_found`. Без capability `forms` ответ `pagebuilder_fe_form_unavailable`. Слишком частые запросы: `Too many requests.`

## Зависимости

| Пакет | Зачем |
| --- | --- |
| pagebuilderpro | Секция `form_builder`, capability `forms` |
| FetchIt | AJAX и inline errors |

## См. также

- [Секция form_builder](../sections/form_builder)
- [PageBuilderFetchIt](PageBuilderFetchIt)
- [Панель управления, Forms](../cmp#forms)
