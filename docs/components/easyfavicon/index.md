---
title: EasyFavicon
description: Фавиконки из редактора RealFaviconGenerator прямо в админке MODX 2 и 3
author: GulomovCreative
categories: utilities

items:
  - text: Быстрый старт
    link: quick-start
  - text: Профили
    link: profiles
  - text: Вывод на сайте
    link: output
  - text: Настройки компонента
    link: settings
---

# EasyFavicon

Компонент для MODX Revolution 2 и 3: собирает набор фавиконок в редакторе [RealFaviconGenerator](https://realfavicongenerator.net/) и сам ставит его на сайт.

## Зачем

Фавиконка обычно ставится руками: сгенерировать набор на сервисе, скачать архив, распаковать и залить файлы, вставить теги в шаблон, поправить `site.webmanifest`. EasyFavicon делает это из админки:

1. Вы выбираете картинку в медиа-хранилище MODX.
2. Настраиваете фавиконку в редакторе RealFaviconGenerator.
3. Возвращаетесь в MODX: файлы уже в каталоге сайта, манифест заполнен данными сайта, разметка стоит в `<head>`.

## Возможности

- Профили: несколько наборов на одном сайте, один активный. Переключение возвращает на сайт и разметку, и файлы нужного набора.
- Разметку вставляет плагин перед `</head>`, для ручного вывода есть сниппет.
- `site.webmanifest` дописывается данными сайта вместо заглушек сервиса.
- Просмотр результата: превью, разметка, список файлов.
- Интерфейс в стиле менеджера MODX 3 и MODX 2.

## Установка

EasyFavicon — платный компонент на [modstore.pro](https://modstore.pro/). Установите его через Менеджер пакетов с провайдером modstore.pro ([как подключить репозиторий](https://modstore.pro/faq)).

Дальше: [Быстрый старт](/components/easyfavicon/quick-start).

## Требования

- MODX Revolution 2.4+ или 3.x.
- PHP 7.4 и новее с расширениями `zip`, `json` и `curl` (или включённым `allow_url_fopen`).
- Бесплатный API-ключ RealFaviconGenerator.

::: info
EasyFavicon — независимая интеграция. Компонент не связан с RealFaviconGenerator.net и не поддерживается им, работа с сервисом подчиняется его условиям.
:::
