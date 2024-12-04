---
title: CronTabManager
description: Автоматически запуск скриптов по расписанию
logo: https://modstore.pro/assets/extras/crontabmanager/logo-md.png
author: webnitros
modstore: https://modstore.pro/packages/utilities/crontabmanager
repository: https://github.com/astra-modx/modx-app-crontabmanager
---

# CronTabManager

Это удобный инструмент для автоматического запуска заданий в фоновом режиме прямо из панели управления вашего сайта на MODX Revolution.

## Что такое «crontab»?

Это специальный механизм, который позволяет автоматизировать выполнение задач на сервере, например, отправку писем, обновление данных или запуск скриптов по
расписанию. Вы задаете расписание (например, «каждый час» или «раз в неделю»), а crontab выполняет задания автоматически.

# Консоль

Запуск команд из под консоля ssh

## Исполняемый файл

По умолчанию команды можно запускать из консоли с помощью следующей команды:

```shell
php core/scheduler/artisan list
```

Чтобы было удобнее запускать из корневой директории сразу после подключения по SSH, создайте или используйте следующую команду:

```shell
php artisan list
```

Создадим файл `artisan` (или скопируем его с помощью команды `cp core/scheduler/artisan.example artisan`):

```shell
cat > artisan << 'EOF'
#!/usr/bin/env php
<?php
define('MODX_CRONTAB_MODE', true);
require_once __DIR__.'/core/scheduler/index.php'; // Проверьте путь к директории core
$Artisan = new \Webnitros\CronTabManager\Artisan\Builder($scheduler, $argv);
$Artisan->run();
EOF
```

## Команды

#### Список всех команд

```shell
php artisan list
# Available commands:
#   completion               Dump the shell completion script
#   demo                     Демонстрация контроллера
#   help                     Display help for a command
#   list                     List commands
#   command
#   command:create           Создает новый контроллер.
#   schedule
#   schedule:list            Список запланированных задач
#   schedule:run             Запуск текущих задач
#   schedule:work            Запуск запланированных задач
#   support
#   support:clearlogmanager  Очистка логов менеджеров старше 2 месяцев
```

#### Создание команды

Создание примера контроллера с передачей аргумента `arg_name`:

```shell
# --name имя новой команды для запуска
php artisan command:create --name=MySuperTask

# Создаст контроллер с именем: CrontabControllerMySuperTask [команда: php artisan mysupertask --arg_name=water]
# Путь к контроллеру: /var/www/html/core/scheduler/Controllers/MySuperTask.php
```

#### Запуск команды

Используя предыдущий пример:

```shell
php artisan mysupertask --arg_name=water

# [INFO] Hello: water <----- Наш аргумент
```

### Содержимое контроллера команды

```php
<?php

/**
 * Новая команда "php artisan mysupertask --arg_name=water"
 */
class CrontabControllerMySuperTask extends modCrontabController
{
    protected $signature = 'mysupertask {--arg_name}'; // необязательные аргументы
    
    public function process()
    {
        $name = $this->getArgument('arg_name', 'world');
        $this->info('Hello: '.$name);
    }
}
```

Можно изменить `signature` контроллера на **my-super-task**, чтобы команда была доступна под этим именем:

```shell
php artisan my-super-task --arg_name=water

# [INFO] Hello: water
```

## Crontab

Задания Cron запускаются на основе созданных команд, и все запланированные задачи хранятся в базе данных.

#### Добавление команды в задачи Cron

```shell
php artisan crontab:add --command=mysupertask
```

#### Список заданий Cron

```shell
php artisan schedule:list

# ------ -------- ------------- --------------------- ----------------- --------------------------- 
#  Path   Active   Crontab       Next run              Diff              Comment                    
# ------ -------- ------------- --------------------- ----------------- --------------------------- 
#  demo   Yes      */1 * * * *   2024-11-30 05:48:00   через 6 секунд    Тестовое задание для демонстрации
# ------ -------- ------------- --------------------- ----------------- --------------------------- 
```

#### Запуск текущих заданий Cron

Будут выполнены задания, которые совпадают с текущим временем.

```shell
php artisan schedule:run
# // Тестовое задание для демонстрации работы контроллера...
# 
# [INFO] [1 1 * * *] mysupertask.php run 
```

### Настройка времени для crontab

В административной части сайта можно настроить время для крон
[manager](http://127.0.0.1:9001/manager/?a=home&namespace=crontabmanager)

