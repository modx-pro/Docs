---
title: PageBuilderFetchIt
description: "Обёртка FetchIt, которая рендерит форму через Fenom. Из шаблона не вызывается"
---

# Сниппет PageBuilderFetchIt

Обёртка над FetchIt для форм Pro. Чанки `pagebuilderpro_quiz`, `pagebuilderpro_contact_form` и `pagebuilderpro_form_builder` вызывают её некэшированно. Из шаблона ресурса сниппет не вызывайте.

Upstream FetchIt проверяет `class_exists('pdoTools')`. В MODX 3 класс называется `ModxPro\PdoTools\Fetch`, проверка не проходит, и форма остаётся сырым Fenom. `PageBuilderFetchIt` рендерит chunk формы через pdoTools и сам выставляет `method="post"` и `data-fetchit`.

## Параметры

| Параметр | Назначение |
| --- | --- |
| `form` | Имя chunk с разметкой `<form>`. Пустое значение даёт лексикон `pagebuilder_fe_form_unavailable` |
| `snippet` | Handler, который FetchIt вызовет при отправке: `PageBuilderQuiz`, `PageBuilderContactForm` или `PageBuilderFormBuilder` |

Остальные свойства чанк прокидывает в форму и в handler. Если пакет FetchIt не установлен, сниппет возвращает тот же лексикон.

## Зависимости

| Пакет | Зачем |
| --- | --- |
| pagebuilderpro | Сниппет и чанки форм |
| FetchIt | AJAX-отправка |
| pdoTools | Рендер Fenom |

## См. также

- [PageBuilderFormBuilder](PageBuilderFormBuilder)
- [PageBuilderQuiz](PageBuilderQuiz)
- [PageBuilderContactForm](PageBuilderContactForm)
