---
title: mxLogger
description: Логирование процессов с тэгами для MODX 3 — тэги, воронки, контекст, менеджерный грид, алерты.
outline: [ 2,3 ]
lastUpdated: true
logo: https://modx3.art-sites.ru/assets/components/mxlogger/logo.png
author: ShevArtV
modstore: https://modstore.pro/packages/utilities/mxlogger
items: [
  { text: 'Начало работы', link: 'index' },
  { text: 'API сервиса', link: 'api' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'События', link: 'events' },
  { text: 'Интерфейс', link: 'manager' },
  { text: 'Интеграция', link: 'integration' },
  { text: 'Разработка', link: 'development' },
]
---

# mxLogger

Логирование процессов с тэгами для **MODX Revolution 3**. Записи с тэгами и
контекстом складываются в отдельную таблицу `mxlogger_log`, с автозахватом источника
вызова, пользователя, сессии, ip и времени. Просмотр — менеджерный грид (Vue 3) или
автономный просмотрщик в обход MODX.

::: warning
Документация актуальна для версии 1.0.0 и выше (MODX 3). Версия под MODX 2 —
отдельная ветка.
:::

## Зачем

В отличие от штатного `$modx->log()` (всё одной кучей в `core/cache/logs/error.log`,
без тэгов, контекста и ротации):

- **тэги** связывают цепочку вызовов одной фичи/пакета в единый поток;
- **процессы** склеивают разные цепочки (корзина → заказ → оплата) в одну ленту по
  общему `process_uid`;
- **контекст и источник** (класс/метод/файл/строка, стэк) пишутся автоматически;
- **whitelist-фильтры** позволяют отлаживать прод на свой аккаунт без флуда;
- логи живут в БД (переживают сброс кэша), с настраиваемым сроком хранения и
  ротацией;
- **алерты**: по событию можно слать письмо/в мессенджер при `error`;
- менеджерный грид с фильтрами и `standalone.php` для доступа в обход MODX.

## Требования

- MODX Revolution 3.x
- PHP 8.1+
- MySQL 5.6+ / MariaDB на InnoDB (FULLTEXT-индекс по тэгам; таблица в utf8mb4)
- расширения PHP: PDO, mbstring, json
- miniShop3 — опционально, для готового плагина логирования корзины/заказа

## Установка

Установите пакет через «Управление пакетами». Автоматически создаются: таблица логов
(utf8mb4), namespace `mxlogger`, меню «Компоненты → mxLogger», системные настройки,
сниппет `mxLogger`, плагины `mxLoggerRotate` (ротация) и `mxLoggerMiniShop3`
(логирование miniShop3).

## Быстрый старт

Сервис в MODX 3 берётся из DI-контейнера — `getService()`/`extension_packages` не
нужны:

```php
$mxl = $modx->services->get('mxlogger');

$mxl->info('purchase', 'Корзина создана', ['cart_id' => $id]);
$mxl->error('payment', 'Платёж отклонён', ['code' => 'declined']);

// воронка одной операции — общий process_uid на все записи:
$p = $mxl->process(['cart', 'purchase']);
$p->info('Старт оплаты', ['order' => 42]);
$p->error('Платёж отклонён', ['code' => 'declined']);
```

Просмотр логов: менеджер → **Компоненты → mxLogger**.

Дальше: [API сервиса](api), [настройки](settings), [события и алерты](events),
[интерфейс](manager), [интеграция в свой пакет](integration).
