---
title: CrawlerDetect
description: Определение веб-краулеров по User-Agent и защита форм от спама без CAPTCHA
author: ibochkarev
repository: https://github.com/Ibochkarev/CrawlerDetect

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  {
    text: 'Сниппеты',
    link: 'snippets',
    items: [
      { text: 'isCrawler', link: 'snippets/isCrawler' },
      { text: 'crawlerDetectBlock', link: 'snippets/crawlerDetectBlock' },
    ],
  },
  { text: 'Интеграция', link: 'integration' },
  { text: 'Решение проблем', link: 'troubleshooting' },
]
---
# CrawlerDetect

Дополнение для MODX: определяет веб-краулеров (ботов) по заголовку User-Agent и защищает формы от спама без CAPTCHA. Использует библиотеку [JayBizzle/Crawler-Detect](https://github.com/JayBizzle/Crawler-Detect).

## Возможности

- **Защита форм** — блокировка отправки форм ботами через preHook FormIt
- **Скрытие виджетов** — не показывать чат, аналитику и тяжёлые скрипты ботам
- **Точнее считать посетителей** — исключать ботов из счётчиков «онлайн» и «просмотров»

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.x |
| PHP | 8.2+ |

## Зависимости

- **FormIt** — для защиты форм (preHook `crawlerDetectBlock`)
- **FetchIt** — опционально, для AJAX-форм
- **SendIt** — опционально, для AJAX-форм

## Установка

Установите пакет через **Менеджер пакетов** MODX:

1. **Управление пакетами** → **Установить пакеты**
2. Найдите **CrawlerDetect** в репозитории
3. Нажмите **Установить**

Зависимости (библиотека JayBizzle/Crawler-Detect) уже входят в пакет. Запускать `composer install` на сервере **не нужно**.

После установки в **Элементы → Сниппеты** появятся: `isCrawler`, `crawlerDetectBlock`.

## После установки

Подробнее: [Быстрый старт](quick-start) и [Интеграция](integration).
