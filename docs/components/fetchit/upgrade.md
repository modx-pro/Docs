---
title: Переход на FetchIt 4
description: Один пакет вместо линий 1.x и 3.x, прежний API на MODX 2 и 3 и что может задеть ваш код
---

# Переход на FetchIt 4

FetchIt 1.x был пакетом для MODX 2, FetchIt 3.x — пакетом для MODX 3. FetchIt 4 заменяет оба: один пакет ставится и на MODX 2.8, и на MODX 3, поверх уже установленной версии через Менеджер пакетов. Системные настройки и чанки при обновлении остаются как есть.

::: warning
Сниппет и плагин FetchIt при обновлении заменяются вместе с параметрами сниппета по умолчанию, так что правки в их коде и параметрах пропадут. Вызовы сниппета на страницах менять не нужно.
:::

## Прежний API работает

- В своих сниппетах берите FetchIt так: `$FetchIt = FetchIt::service($modx);`. Вызовы из 1.x (`$modx->getService('fetchit', 'FetchIt', MODX_CORE_PATH . 'components/fetchit/model/')`) и из 3.x (`$modx->services->get('FetchIt')`, только на MODX 3) возвращают тот же объект.
- Класс `FetchIt\FetchIt` из 3.x — тот же класс, `instanceof \FetchIt\FetchIt` работает. `get_class()` теперь возвращает `FetchIt`.
- `storeActionProperties()` / `loadActionProperties()` и их имена из 3.x `saveActionProperties()` / `getActionProperties()`.
- Чанки через pdoTools (Fenom, `@FILE`) — и на MODX 2, и на MODX 3.

## Что может задеть ваш код

- В форму добавляются служебные поля [защиты](/components/fetchit/protection). Свой JS вместо встроенного должен отправлять токен — см. [Свой JavaScript вместо встроенного скрипта](/components/fetchit/protection#svoy-javascript-vmesto-vstroennogo).
- Настройка `fetchit.frontend.default.notifier` больше не подключает Notyf, а показывает [встроенные уведомления](/components/fetchit/examples/notifications/#vstroennye-uvedomleniya). Стили для `.notyf__toast` и вызовы `new Notyf()` нужно поменять или подключить Notyf самостоятельно.
- `fetchit:error` срабатывает и при сбое запроса: тогда `detail.response` равен `null`, а причина лежит в `detail.error`.
- Обрабатывающий сниппет получает в `fields` только отправленную форму: `$_POST` и файлы из `$_FILES` при отправке через FetchIt, только `$_POST` при обычной отправке. Без GET-параметров и cookies — раньше приходил `$_REQUEST`.
- `fetchit:success` можно отменить: `event.preventDefault()` оставит поля заполненными.
- Повторная отправка, пока идёт запрос, игнорируется.
- `method` и `data-fetchit` ставятся последними атрибутами тега формы.

## После обновления

- Проверьте страницы с формами, исключёнными из кеша на стороне сервера или CDN: токен формы кешируется вместе со страницей, см. [Что стоит учесть](/components/fetchit/protection#chto-stoit-uchest).
- На сайте для разработки поставьте `fetchit.protection.min_time` и `fetchit.protection.rate_limit` в `0`, чтобы защита не мешала тестам.
- Если на сайте FormIt 5.2 и новее с reCAPTCHA, для форм FetchIt включите капчу через [`fetchit.captcha`](/components/fetchit/protection#kapcha): свой AJAX-режим FormIt в формах FetchIt выключается.

Полный список изменений — в [changelog](https://github.com/GulomovCreative/FetchIt/blob/master/core/components/fetchit/docs/changelog.txt) компонента (на английском), пакеты всех версий — в [релизах на GitHub](https://github.com/GulomovCreative/FetchIt/releases).
