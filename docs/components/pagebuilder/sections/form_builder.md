---
title: "Конструктор формы"
description: "Форма из схемы CMP Forms через FetchIt. Capability forms. Слой Pro."
---

# Конструктор формы

Секция `form_builder` берёт схему из вкладки CMP **Forms**. Chunk: `pagebuilderpro_form_builder`. Нужны PageBuilder Pro, capability `forms` и пакет **FetchIt**.

1. В CMP создайте схему с ключом и полями.
2. На странице добавьте секцию и выберите ключ в поле `form`.
3. На сайте форма уходит через [PageBuilderFetchIt](../snippets/PageBuilderFetchIt) в сниппет [PageBuilderFormBuilder](../snippets/PageBuilderFormBuilder).

Поля схемы: text, email, tel, textarea, select, radio, checkbox, date, hidden, consent. Файл в форме v1 не принимается.

Сервер проверяет CSRF и honeypot `nospam`. Outbox пишется в транзакции. Письмо и webhook уходят синхронно после commit, в том же HTTP-запросе. Submissions в БД не хранятся. Неверный email submission не создаёт.

Секция входит в контекст страницы, чтобы HTML-кеш не замораживал форму. `PageBuilderFetchIt` рендерит форму через Fenom.

## Поля секции

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок |
| `form` | form | да | Ключ схемы из CMP Forms |

## Рендер

Без FetchIt или без полей схемы chunk показывает лексикон `pagebuilder_fe_form_unavailable` в `p.pb-form-builder__fallback`. Иначе [PageBuilderFetchIt](../snippets/PageBuilderFetchIt) рендерит chunk `pagebuilderpro_form_builder_fields` и передаёт handler `PageBuilderFormBuilder`.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Заявка",
  "form": "contact"
}
```

## Похожие секции

- [Форма обратной связи](contact_form): поля собирают в инспекторе секции, не в CMP
- [Квиз](quiz) для пошагового сценария
- [Рассылка](newsletter): HTML-форма на внешний `action_url`, не FetchIt

## Связанные страницы

- [Панель управления](../cmp#forms)
- [Каталог секций](index)
