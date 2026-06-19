---
title: PhoneSpamDetect
description: Валидация телефонов в формах MODX через Google libphonenumber — локально, без API-ключей
author: ibochkarev
repository: https://github.com/Ibochkarev/PhoneSpamDetect
logo: https://modstore.pro/assets/extras/phonespamdetect/logo.png
modstore: https://modstore.pro/packages/utilities/phonespamdetect

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  {
    text: 'Сниппеты',
    link: 'snippets',
    items: [
      { text: 'isSpamPhone', link: 'snippets/isSpamPhone' },
      { text: 'phoneSpamBlock', link: 'snippets/phoneSpamBlock' },
    ],
  },
  { text: 'Интеграция', link: 'integration' },
  { text: 'Решение проблем', link: 'troubleshooting' },
]
---
# PhoneSpamDetect

Проверяет телефоны в формах MODX через [Google libphonenumber](https://github.com/google/libphonenumber) ([giggsey/libphonenumber-for-php](https://github.com/giggsey/libphonenumber-for-php)). Всё работает на сервере: без API-ключей и без запросов наружу.

## Зачем это нужно

- **Формы** — отсекаете явно кривые номера и телефоны из нежелательных стран ещё до отправки письма
- **Страны** — можно принимать только `RU`, `KZ`, `BY` или любой другой набор ISO-кодов
- **E.164** — номер можно получить в нормальном виде (`+79991234567`) для CRM, писем и логов

## Что именно проверяется

- формат номера
- страна (ISO-код)
- приведение к E.164

Название с «Spam» немного вводит в заблуждение: баз жалоб и внешних API здесь нет. libphonenumber локально решает, валиден ли номер и из какой он страны.

## Требования

| | |
|---|---|
| MODX Revolution | 3.x |
| PHP | 8.2+ |

## Зависимости

- **FormIt** — для preHook `phoneSpamBlock`
- **FetchIt**, **SendIt** — по желанию, если формы через AJAX

## Установка

1. **Управление пакетами** → **Установить пакеты**
2. Найдите **PhoneSpamDetect**
3. **Установить**

`giggsey/libphonenumber-for-php` уже внутри пакета. `composer install` на сервере не нужен.

После установки в **Элементы → Сниппеты** появятся `phoneSpamBlock` и `isSpamPhone`.

Дальше — [быстрый старт](quick-start) или [интеграция](integration).
