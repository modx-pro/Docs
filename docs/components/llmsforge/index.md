---
title: LLMS Forge
description: Генератор llms.txt и Markdown-карточек страниц для MODX 3
categories: utilities
author: Mishiko23
repository: https://github.com/Mishiko23/LLMSForge
logo: /components/llmsforge/logo.png
compatibility:
  - modx3
  - php81
items:
  - text: Быстрый старт
    link: quick-start
  - text: Карточки страниц и miniShop3
    link: cards
  - text: Настройки и доступ
    link: settings
  - text: Решение проблем
    link: troubleshooting
---

# LLMS Forge

![Страницы сайта собираются в документ для AI-поиска](/components/llmsforge/overview.png)

LLMS Forge публикует `/llms.txt` и отдельные Markdown-карточки страниц из панели MODX 3. Основной документ можно собрать из выбранных ресурсов или написать вручную. Для товаров miniShop3 автоматические карточки могут включать цену, артикул и другие выбранные поля.

Дополнение распространяется бесплатно по лицензии [GPL-3.0](https://github.com/Mishiko23/LLMSForge/blob/main/COPYING). Исходный код — [Mishiko23/LLMSForge](https://github.com/Mishiko23/LLMSForge).

## Что умеет

- Выбирать до 5000 страниц для основного документа, искать ресурсы и группировать ссылки по разделам.
- Создавать до 200 отдельных карточек `/llms-txt/slug` вручную или из ресурсов MODX, в том числе массово.
- Добавлять в автоматические карточки выбранные TV и поля miniShop3: `price`, `old_price`, `article`, `weight`, `vendor`, `made_in`.
- Предварительно просматривать и скачивать документы, вести настройки отдельно для каждого контекста.
- Показывать диагностические проверки и журнал запросов известных AI-ботов за последние 30 дней.

Адреса обслуживает MODX. Физический файл `llms.txt` в корне сайта не создаётся. Публикация документа не гарантирует, что AI-система его прочитает, проиндексирует или процитирует.

Начните с [установки и первой публикации](quick-start.md). Для каталога товаров смотрите [карточки страниц и miniShop3](cards.md).
