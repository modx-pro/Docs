---
title: mxLogger
description: Логирование процессов с тэгами для MODX Revolution 2 и 3 — тэги, воронки, контекст, менеджерный грид, алерты.
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

Логирование процессов с тэгами для **MODX Revolution 2 и 3**. Записи с тэгами и
контекстом складываются в отдельную таблицу `mxlogger_log`, с автозахватом источника
вызова, пользователя, сессии, ip и времени. Просмотр — менеджерный грид или
автономный просмотрщик в обход MODX.

::: info Одна документация на обе версии
Пакет выходит в двух версиях — под **MODX 2** и под **MODX 3**. Это по сути один
компонент: API, тэги, воронки, настройки, события и standalone-просмотрщик
**идентичны**. Различия — точечные (доступ к сервису, имена классов, требования,
технология грида, плагин магазина) и по тексту помечены блоками
«В MODX 2 / В MODX 3».
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

| | MODX 2 | MODX 3 |
| --- | --- | --- |
| MODX Revolution | 2.8.x | 3.x |
| PHP | 7.4+ | 8.1+ |
| СУБД | MySQL 5.6+ / MariaDB на InnoDB (FULLTEXT-индекс по тэгам; таблица в utf8mb4) | то же |
| расширения PHP | PDO, mbstring, json | то же |
| плагин магазина (опц.) | miniShop2 | miniShop3 |

## Установка

Установите пакет через «Управление пакетами». Автоматически создаются: таблица логов
(utf8mb4), namespace `mxlogger`, меню «Компоненты → mxLogger», системные настройки,
сниппет `mxLogger`, плагины `mxLoggerRotate` (ротация) и плагин логирования магазина
(`mxLoggerMiniShop2` в версии под MODX 2 / `mxLoggerMiniShop3` под MODX 3).

## Быстрый старт

::: code-group

```php [MODX 3]
// сервис берётся из DI-контейнера
$mxl = $modx->services->get('mxlogger');

$mxl->info('purchase', 'Корзина создана', ['cart_id' => $id]);
$mxl->error('payment', 'Платёж отклонён', ['code' => 'declined']);

// воронка одной операции — общий process_uid на все записи:
$p = $mxl->process(['cart', 'purchase']);
$p->info('Старт оплаты', ['order' => 42]);
$p->error('Платёж отклонён', ['code' => 'declined']);
```

```php [MODX 2]
// сервис зарегистрирован в extension_packages — доступен сразу как $modx->mxlogger
$mxl = $modx->mxlogger;

$mxl->info('purchase', 'Корзина создана', ['cart_id' => $id]);
$mxl->error('payment', 'Платёж отклонён', ['code' => 'declined']);

// воронка одной операции — общий process_uid на все записи:
$p = $mxl->process(['cart', 'purchase']);
$p->info('Старт оплаты', ['order' => 42]);
$p->error('Платёж отклонён', ['code' => 'declined']);
```

:::

Просмотр логов: менеджер → **Компоненты → mxLogger**.

Дальше: [API сервиса](api), [настройки](settings), [события и алерты](events),
[интерфейс](manager), [интеграция в свой пакет](integration).
