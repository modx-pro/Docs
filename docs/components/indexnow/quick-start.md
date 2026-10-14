---
title: Быстрый старт
description: Установка IndexNow, ключ, Scheduler и первая проверка очереди
---

# Быстрый старт

## После установки

Откройте **Extras → IndexNow** → вкладка **Статус** и проверьте:

- IndexNow включён (`indexnow_enabled`)
- ключ валиден
- файл ключа найден в корне сайта
- Scheduler установлен (рекомендуется как запасной cron)
- задача очереди создана

Если файла ключа нет, создайте его вручную. См. [Ключ и key file](key).

Установка добавляет запись IndexNow в системную настройку **`extension_packages`**, чтобы xPDO подхватил модели пакета. При uninstall resolver убирает эту запись.

## Queue tick и Scheduler

**Queue tick** это основной фон: события `OnWebPageComplete` / `OnManagerPageAfterRender`, shutdown, до 25 due-URL, lock 55 с. Подробнее: [Очередь и отправка](queue).

IndexNow регистрирует recurring-задачу **IndexNow: Process Queue**, если [Scheduler](/components/scheduler/) уже стоит на сайте.

Интервал: раз в минуту (`+1 minute`), если ваша версия Scheduler это поддерживает.

Если Scheduler поставили позже IndexNow:

1. Откройте IndexNow и нажмите **Проверить подключение** (задача создаётся при необходимости), или
2. переустановите / обновите пакет IndexNow.

Без Scheduler пакет работает: очередь наполняется, tick на HTTP-запросах и **Обработать очередь** доступны.

## Права доступа

При установке в политику **Administrator** добавляются permissions:

| Permission | Назначение |
| --- | --- |
| `indexnow_manage` | Менеджер IndexNow: статус, очередь, **Обработать очередь**, проверка подключения |
| `indexnow_send` | Вкладка **Отправка URL** |
| `indexnow_view_history` | Просмотр истории |

Системные настройки `indexnow_*` правятся в **Система → Настройки системы**, не в CMP.

Пакет ставит политику **`IndexNowUserPolicy`** и шаблон **`IndexNowPolicyTemplate`** с теми же тремя permissions. Для редакторов создайте группу пользователей с этой политикой вместо полного Administrator.

## Первая проверка

1. Сохраните опубликованный ресурс.
2. Откройте **Очередь**: должна появиться строка `pending` или уже обработанная запись после tick.
3. При необходимости нажмите **Обработать очередь**.
4. В **Истории** смотрите HTTP-код (`200` / `202`: уведомление принято).

## Удаление пакета

Uninstall снимает:

- системные настройки namespace IndexNow;
- plugin и namespace;
- таблицы очереди и истории;
- задачу Scheduler IndexNow;
- key file в web root (только если содержимое совпадает с `indexnow_key`);
- transport vehicles политики и шаблона пакета;
- запись в **`extension_packages`**.

Permissions, уже вписанные в **AdministratorTemplate** / политику Administrator, uninstall **не удаляет**. Лишние права уберите вручную в **Безопасность → Политики доступа**, если нужно.
