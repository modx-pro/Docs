---
title: Настройки компонента
description: Системные настройки FetchIt: путь к JS, классы ошибок, Notyf
---

# Настройки компонента

Namespace в MODX: `fetchit`. Ключи в таблице ниже: как в менеджере (без префикса области).

## `fetchit.frontend.js`

- По умолчанию: `[[+assetsUrl]]js/fetchit.js`

Путь к скрипту с классом обработки форм. В пакете также есть `js/fetchit.min.js`: при желании укажите его.

Плагин подключает скрипт в `<head>` с атрибутом `defer`.

## `fetchit.frontend.js.classname`

- По умолчанию: `FetchIt`

Имя глобального класса, который создаёт экземпляры. Попадает в inline-вызов `FetchIt.create({...})` (или ваше имя из настройки).

## `fetchit.frontend.input.invalid.class`

- По умолчанию: `is-invalid`

CSS-класс на `input` / `select` / `textarea` с ошибкой. Несколько классов пишите через пробел. На поле также ставится `aria-invalid="true"`.

## `fetchit.frontend.custom.invalid.class`

- По умолчанию: пусто

Класс на элементы с `[data-custom="имя_поля"]` (обёртки под Bootstrap, Bulma и т.п.).

## `fetchit.frontend.default.notifier`

- По умолчанию: `false` (`Нет`)

Если включить, перед `fetchit.js` подключаются CSS и JS [Notyf](https://carlosroso.com/notyf/) из `assets/components/fetchit/lib/`, и при первом `create()` выставляется `FetchIt.Message` на базе Notyf (если вы сами ещё не задали `Message`).

Ядро FetchIt не требует jQuery. Notyf из настройки опционален и не нужен, если тосты вам не нужны.
