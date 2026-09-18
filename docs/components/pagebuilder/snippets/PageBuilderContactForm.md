---
title: PageBuilderContactForm
description: "FetchIt-handler секции contact_form. Из шаблона не вызывается"
---

# Сниппет PageBuilderContactForm

Handler AJAX-отправки секции Pro [contact_form](../sections/contact_form). Чанк секции вызывает его через **FetchIt**. Из шаблона ресурса сниппет не вызывайте.

## Назначение

Валидация полей, письмо через `modMail`, JSON-ответ FetchIt (success / field errors / redirect).

## Где вызывается

Chunk `pagebuilderpro_contact_form` вызывает [PageBuilderFetchIt](PageBuilderFetchIt) со свойствами `snippet` = `PageBuilderContactForm` и `form` = `pagebuilderpro_contact_form_fields`.

## Параметры

Параметры задаёт FetchIt из формы (POST): `pb_form_key`, поля из repeater секции, honeypot `nospam`. Отдельных свойств сниппета для вызова из шаблона нет.

## Зависимости

| Пакет | Зачем |
| --- | --- |
| pagebuilderpro | Секция `contact_form` |
| FetchIt | AJAX и inline errors |

## См. также

- [Секция contact_form](../sections/contact_form)
- [PageBuilderQuiz](PageBuilderQuiz)
- [Обзор сниппетов](index)
