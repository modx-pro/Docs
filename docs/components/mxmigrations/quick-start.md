# Быстрый старт

Ниже — подключение миграций к обычному сайту MODX. Создадим конфиг в
`core/config/` и отдельный каталог `core/migrations/`.

## 1. Создайте конфигурацию

Создайте файл `core/config/mxmigrations.php`:

```php
<?php

return [
    'id' => 'site',
    'modx_root' => dirname(__DIR__, 2),
    'migrations_path' => dirname(__DIR__) . '/migrations',
];
```

Для первого запуска этого достаточно. Остальное пакет настроит сам: создаст
таблицу `modx_site_migrations` для истории и защитит миграции от параллельного
запуска. Дополнительные параметры разобраны в разделе
[Конфигурация проекта](configuration).

## 2. Создайте каталог миграций

```bash
mkdir -p core/migrations
```

Каталог обязан существовать перед `status`, `up` или `baseline`. Команда `new
--apply` умеет создать отсутствующий каталог сама, но явное создание удобнее для
первого подключения и контроля прав.

## 3. Проверьте подключение

Из корня сайта выполните:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php status
```

Первый вызов создаст таблицу истории с префиксом текущей установки MODX:
`modx_site_migrations` при стандартном `modx_` или, например,
`abc_site_migrations` при префиксе `abc_`. Для пустого каталога результат будет
таким:

```text
pending: 0
drifted: 0
missing: 0
outOfOrder: 0
applied: 0
```

## 4. Сгенерируйте миграцию

Сначала посмотрите файл без записи на диск:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php \
  new add_order_status \
  --recipe=add-column \
  --table=site_orders \
  --column=status \
  --type="VARCHAR(20) NOT NULL DEFAULT 'new'"
```

Раннер напечатает имя и полное тело будущего PHP-файла. Если результат подходит,
повторите команду с `--apply`:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php \
  new add_order_status \
  --recipe=add-column \
  --table=site_orders \
  --column=status \
  --type="VARCHAR(20) NOT NULL DEFAULT 'new'" \
  --apply
```

Имя получится примерно таким:
`20260810_1530__add_order_status.php`. Генератор гарантирует, что новая метка
будет позже всех уже существующих меток в каталоге.

::: tip Проверяйте сгенерированный PHP
Шаблон создаёт безопасную заготовку, но не знает бизнес-контекста проекта.
Прочитайте файл, проверьте имя таблицы, SQL-тип, значения по умолчанию и поведение
при повторном запуске до фиксации в Git.
:::

## 5. Посмотрите план

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php up --dry-run
```

В выводе появится строка с префиксом `[DRY]`. База и журнал не изменятся.

## 6. Примените миграцию

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php up
```

Успешный файл будет отмечен `[OK]`. Раннер сохранит имя, SHA-256, время,
длительность, пользователя запуска и напечатанный миграцией текст.

Если в конфиге настроен раздел `models` и таблица принадлежит одной из схем,
после успешного `up` обновите модель:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php model:build --apply
```

До успешного применения связанной миграции команда модель не запишет.

Завершите цикл строгой проверкой:

```bash
php core/components/mxmigrations/bin/mxmigrations.php \
  --config=core/config/mxmigrations.php status --strict
```

Код возврата `0` означает, что очередь пуста и нарушений нет. Коды `1` и `2`
разобраны в разделе [Коды возврата](cli#коды-возврата).

## Переменная окружения вместо параметра

Чтобы не повторять путь в cron или deploy-скрипте, задайте
`MXMIGRATIONS_CONFIG`:

```bash
export MXMIGRATIONS_CONFIG=/path/to/site/core/config/mxmigrations.php
php core/components/mxmigrations/bin/mxmigrations.php status --strict
php core/components/mxmigrations/bin/mxmigrations.php up --dry-run
php core/components/mxmigrations/bin/mxmigrations.php up
```

Параметр `--config=...` имеет приоритет над переменной окружения.
