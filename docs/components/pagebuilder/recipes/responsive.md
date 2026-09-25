---
title: Значения по экранам
description: "Разные значения text, url и number для desktop, tablet и mobile. Слой Pro"
---

# Значения по экранам

Результат: заголовок или ссылка отличаются на компьютере, планшете и телефоне. Нужны PageBuilder Pro и capability `responsive`. Типы: text, textarea, url, number, currency, richtext, slug.

## Что нужно заранее

1. Включена `pagebuilder_responsive_editor_enabled`. Пока настройка выключена, вкладок в инспекторе нет.
2. Поле одного из типов выше. У секции есть такой заголовок или ссылка.

## Шаги

1. Откройте поле в инспекторе и нажмите иконку планшета. Появятся вкладки desktop, tablet, mobile.
2. Заполните три значения. **Одно значение для всех экранов** сворачивает карту и берёт desktop, если в схеме нет жёсткого `responsive: true`.
3. На сайте режим задаёт `pagebuilder_responsive_apply`.
   - `manual` (по умолчанию): одно значение. Берётся `?pb_bp=` или `pagebuilder_default_breakpoint`.
   - `css`: в HTML все три значения, media query прячет лишние.
4. В чанке такое поле выводите через `{$title|pb_text}`, не через `escape`.
5. **Сохранить** ресурса.

Уже сохранённая карта на сайте работает, пока поле не сохранят одним значением. Пороги: `pagebuilder_responsive_breakpoints` (по умолчанию desktop ≥1024, tablet ≥768, mobile ≥0).

## Пример полей

Поле Title секции `hero`:

| Экран | Значение |
| --- | --- |
| desktop | `Каталог мебели` |
| tablet | `Каталог` |
| mobile | `Каталог` |

При `pagebuilder_responsive_apply` = `manual` откройте страницу с `?pb_bp=mobile` и с `?pb_bp=desktop`. При `css` в HTML три значения, лишние прячет media query.

## Что проверить

Вкладки появляются только после иконки планшета и при включённом редакторе. Свёрнутое поле на сайте показывает desktop. В чанке `{$title|pb_text}`, не `escape`.

## Откат

Сверните поле в одно значение и сохраните ресурс.

## См. также

- [Системные настройки → Responsive](../settings#responsive)
- [Вывод на сайте → Responsive](../frontend#responsive)
