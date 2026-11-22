---
title: Часто задаваемые вопросы
---
# Часто задаваемые вопросы

## Нужно ли запускать composer install на сервере?

**Нет.** Зависимости уже включены в пакет. Установите CrawlerDetect через Менеджер пакетов.

## Как обновить библиотеку JayBizzle/Crawler-Detect?

Обновляйте пакет CrawlerDetect через Менеджер пакетов. В новой версии пакета уже новая библиотека. Отдельно на сервере её не обновляйте. В lockfile этой поставки стоит **jaybizzle/crawler-detect v1.4.2**.

## Совместим ли CrawlerDetect с CAPTCHA?

**Да.** Добавьте два preHook'а в FormIt: CrawlerDetect и reCAPTCHA или другую CAPTCHA.

## Работает ли с AjaxForm?

AjaxForm, альтернатива FormIt, CrawlerDetect работает через FormIt. Если AjaxForm вызывает FormIt на сервере, добавьте `crawlerDetectBlock` в `&preHooks` FormIt.

## Работает ли с SendIt?

**Да.** SendIt использует FormIt. Параметры задаются в пресетах. Добавьте в пресет `'preHooks' => 'crawlerDetectBlock'`. При блокировке ботом SendIt вернёт ошибку и покажет сообщение из настроек CrawlerDetect.

## Поддерживается ли MODX 2.x?

**Нет.** Только MODX Revolution 3.x.

## Можно ли добавить свой User-Agent в чёрный список?

**Нет.** Список задаёт библиотека JayBizzle/Crawler-Detect. Свой чёрный или белый список в пакете не предусмотрен.
