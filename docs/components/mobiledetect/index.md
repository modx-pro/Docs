---
title: MobileDetect
description: Определение типа устройства в MODX и вывод разного контента на одной странице
author: modx-pro
repository: https://github.com/modx-pro/MobileDetect
logo: https://modstore.pro/assets/extras/mobiledetect/logo.png
modstore: https://modstore.pro/packages/utilities/mobiledetect
categories: utilities

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  {
    text: 'Сниппеты',
    link: 'snippets',
    items: [
      { text: 'MobileDetect', link: 'snippets/mobiledetect' },
    ],
  },
  { text: 'Интеграция', link: 'integration' },
  { text: 'Решение проблем', link: 'troubleshooting' },
]
---
# MobileDetect

Компонент определяет тип устройства посетителя (desktop, tablet, mobile) и позволяет выводить разный контент на одной странице MODX.

Основан на библиотеке [mobiledetect/mobiledetectlib](https://github.com/serbanghita/Mobile-Detect) ^4.11 (`Detection\MobileDetect`).

## Возможности

- **Четыре способа вывода:** Fenom-модификатор, Fenom-блоки, сниппет, HTML-теги
- **Принудительный режим:** GET-параметр `?browser=mobile`
- **Cookie:** запоминание выбора пользователя
- **Переключатель версий:** чанк `tplMobileDetectSwitch` из пакета
- **PHP API:** сервис `MobileDetect` для плагинов и сниппетов

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 2.8+ или 3.x |
| PHP | 8.2+ |
| pdoTools | опционально; **обязателен** для Fenom-блоков и модификатора `\| mobiledetect` |

Определение строится на User-Agent и HTTP-заголовках. Режим «Desktop site» в мобильном браузере может дать неверный результат.

## Установка

1. Установите пакет через **Extras → Installer** ([modstore.pro](https://modstore.pro/packages/utilities/mobiledetect), бесплатно)
2. Убедитесь, что плагин **MobileDetect** включён (`md_disable_plugin = Нет`)
3. **Управление → Очистить кэш**

После установки доступны:

| Элемент | Назначение |
| --- | --- |
| Плагин **MobileDetect** | HTML-теги, Fenom, плейсхолдер `mobiledetect.device` |
| Сниппет **MobileDetect** | Условный вывод через `:is`/`:then` |
| Чанк **tplMobileDetectSwitch** | Ссылки переключения desktop / tablet / mobile / auto |

Библиотека `mobiledetectlib` уже входит в transport. Запускать `composer install` на сервере **не нужно**.

## Способы вывода контента

| # | Способ | Когда использовать |
| --- | --- | --- |
| 1 | Fenom `\| mobiledetect` | Лучший вариант при pdoTools: код в false-ветках не выполняется |
| 2 | Fenom-блоки `{mobile}`, `{phone}`, … | Читаемая разметка в Fenom-шаблонах |
| 3 | Сниппет `[[!MobileDetect]]` | Без Fenom, в любом контексте MODX |
| 4 | HTML-теги `<standard>`, `<tablet>`, `<mobile>` | Кэш-friendly; MODX-теги внутри блоков парсятся до фильтрации |

Подробнее: [Интеграция](integration).

## Быстрые ссылки

| Раздел | Описание |
| --- | --- |
| [Быстрый старт](quick-start) | Первая интеграция за 5 минут |
| [Системные настройки](settings) | Ключи `md_*` |
| [Сниппет MobileDetect](snippets/mobiledetect) | Параметр `&input` |
| [Интеграция](integration) | Fenom, HTML-теги, PHP API |
| [Решение проблем](troubleshooting) | Кэш, pdoTools, обновление с 2.0.x |

## История

Компонент изначально написан Vasily Naumkin как учебный пример на bezumkin.ru. Текущая версия **2.1.0-pl** поддерживается в репозитории [modx-pro/MobileDetect](https://github.com/modx-pro/MobileDetect).
