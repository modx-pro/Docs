---
title: PageBuilderFetchIt
description: "Обёртка FetchIt, которая рендерит форму через Fenom. Из шаблона не вызывается"
---

# Сниппет PageBuilderFetchIt

Обёртка над FetchIt для форм Pro. Чанки `pagebuilderpro_quiz`, `pagebuilderpro_contact_form` и `pagebuilderpro_form_builder` вызывают её некэшированно. Из шаблона ресурса сниппет не вызывайте.

В типичной сборке FetchIt для MODX 3 проверка `class_exists('pdoTools')` может не находить класс `ModxPro\PdoTools\Fetch`, и форма остаётся сырым Fenom. `PageBuilderFetchIt` рендерит chunk формы через pdoTools и сам выставляет `method="post"` и `data-fetchit`. Точное поведение upstream зависит от установленной версии FetchIt.

## Параметры

| Параметр | Назначение |
| --- | --- |
| `form` | Имя chunk с разметкой `<form>`. Пустое значение даёт лексикон `pagebuilder_fe_form_unavailable` |
| `snippet` | Handler, который FetchIt вызовет при отправке: `PageBuilderQuiz`, `PageBuilderContactForm` или `PageBuilderFormBuilder` |

Остальные свойства чанк прокидывает в форму и в handler. Если пакет FetchIt не установлен, обёртка возвращает лексикон `pagebuilder_fe_form_unavailable`. Прямой AJAX-вызов handler-сниппетов (`PageBuilderContactForm`, `PageBuilderQuiz`, `PageBuilderFormBuilder`) без сервиса FetchIt отвечает JSON с `pagebuilder_fe_fetchit_unavailable`.

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
