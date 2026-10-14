---
title: CrawlerDetect
description: Определение ботов по заголовкам запроса и защита форм от спама без CAPTCHA
categories: other
author: Ibochkarev
logo: https://modstore.pro/assets/extras/crawlerdetect/logo.png
modstore: https://modstore.pro/packages/other/crawlerdetect
repository: https://github.com/Ibochkarev/CrawlerDetect

compatibility:
  - modx3
  - php82
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

Определяет ботов по заголовкам запроса (User-Agent и другие из набора JayBizzle) и блокирует отправку FormIt без CAPTCHA. Библиотека: [JayBizzle/Crawler-Detect](https://github.com/JayBizzle/Crawler-Detect).

## Возможности

- **Защита форм:** preHook FormIt блокирует отправку ботами
- **Скрытие виджетов:** не показывать чат, аналитику и тяжёлые скрипты ботам
- **Счётчики посетителей:** не учитывать ботов в «онлайн» и «просмотрах»

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.x |
| PHP | 8.2+ |

## Зависимости

- **FormIt:** для защиты форм (preHook `crawlerDetectBlock`)
- **FetchIt:** не обязателен, для AJAX-форм
- **SendIt:** не обязателен, для AJAX-форм

## Установка

1. **Управление пакетами** → **Установить пакеты**
2. Найдите **CrawlerDetect** в репозитории
3. Нажмите **Установить**

Библиотека JayBizzle уже в пакете (`vendor/autoload.php`). `composer install` на сервере не нужен.

При установке и обновлении пакет шлёт анонимную телеметрию на `https://metrics.modx.pro/` (без домена сайта).

После установки в **Элементы → Сниппеты** появятся `isCrawler` и `crawlerDetectBlock`.

Дальше: [Быстрый старт](quick-start), [Интеграция](integration).
