---
title: Форма
description: "Заявка через FetchIt: разовая contact_form или схема form_builder из CMP Forms. Слой Pro"
---

# Форма

Результат: посетитель отправляет заявку. Письмо уходит в том же запросе. Заявки в базе PageBuilder не хранятся. Нужны PageBuilder Pro и пакет **FetchIt**.

## Что нужно заранее

1. Ресурс опубликован, в шаблоне стоит `[[!PageBuilder]]`.
2. Установлен FetchIt. Без него секция показывает `pagebuilder_fe_form_unavailable`.
3. Для схемы на много страниц нужна capability `forms`.

## Шаги

Разовая форма на одной странице:

1. Добавьте секцию `contact_form`.
2. Задайте **Ключ формы**. Если форм на странице несколько, ключи не повторяйте.
3. В repeater **Поля формы** добавьте name, label и type: `text`, `email`, `phone`, `textarea`, `select`, `radio`, `checkbox`, `date`. Для select и radio варианты пишите по строке: `Подпись|value` или только value. Имя поля: `[a-z][a-z0-9_]*`.
4. Обязательный checkbox пустой, пока значение не `1`, `yes`, `true` или `on`.
5. **Сохранить** ресурса. Получатель письма: `emailsender` или почта сайта.

Одна схема на много страниц:

1. В CMP **Forms** создайте схему с ключом и полями. Типы те же, плюс hidden и consent. Для select и radio заполните **Варианты**.
2. На странице добавьте `form_builder`, выберите ключ и при необходимости intro.
3. **Сохранить** ресурса. Отправка идёт в сниппет `PageBuilderFormBuilder`.

Сервер проверяет CSRF и honeypot `nospam`. Файл форма v1 не принимает. Неверный email заявку не создаёт. Пустая схема `form_builder`: `pagebuilder_fe_form_empty`.

## Пример полей

Две формы на одной странице. Ключи разные.

`contact_form`, ключ `callback`. Строки repeater:

| name | label | type | options |
| --- | --- | --- | --- |
| `name` | Имя | `text` | |
| `email` | Почта | `email` | |
| `topic` | Тема | `select` | `Доставка\|delivery` и `Оплата\|payment`, каждая с новой строки |

Вторая секция `contact_form`, ключ `callback_footer`. Поля те же, ключ другой.

`form_builder` на других страницах берёт схему из вкладки **Forms**, а не repeater секции. Intro заполняйте, если над полями нужен абзац. Пустая схема на сайте даёт `pagebuilder_fe_form_empty`.

## Что проверить

Отправьте заявку с валидным email. Письмо уходит получателю `emailsender`. Поле honeypot `nospam` даёт тихий success без письма. Неверный email заявку не создаёт.

## Откат

Удалите секцию. Схему в CMP удаляют отдельно.

## См. также

- [Форма обратной связи](../sections/contact_form)
- [Конструктор формы](../sections/form_builder)
- [Панель управления → Forms](../cmp#forms)
