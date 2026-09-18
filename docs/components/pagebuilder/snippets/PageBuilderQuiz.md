---
title: PageBuilderQuiz
description: "FetchIt-handler секции quiz. Из шаблона не вызывается"
---

# Сниппет PageBuilderQuiz

Handler AJAX-отправки секции Pro [quiz](../sections/quiz). Чанк секции вызывает его через **FetchIt**. Из шаблона ресурса сниппет не вызывайте.

## Назначение

Валидация ответов и контактов, server-side сумма в режиме `pricing`, письмо через `modMail`, JSON-ответ FetchIt.

## Где вызывается

Chunk `pagebuilderpro_quiz` вызывает [PageBuilderFetchIt](PageBuilderFetchIt) со свойствами `snippet` = `PageBuilderQuiz` и `form` = `pagebuilderpro_quiz_form`.

## Параметры

Параметры задаёт FetchIt из формы (POST): `pb_quiz_key`, `answer[...]`, контактные поля, honeypot `nospam`. Отдельных свойств сниппета для вызова из шаблона нет.

## Зависимости

| Пакет | Зачем |
| --- | --- |
| pagebuilderpro | Секция `quiz` |
| FetchIt | AJAX и inline errors |

## См. также

- [Секция quiz](../sections/quiz)
- [PageBuilderContactForm](PageBuilderContactForm)
- [Обзор сниппетов](index)
