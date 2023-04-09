# Разработка заданий

Разработать задачу для планировщика так же просто, как создать PHP-файл или сниппет MODX. Их можно добавить в Scheduler, когда они вам понадобятся. Этот документ расскажет о нескольких вещах, которые могут быть вам знакомы, если вы чаще занимаетесь разработкой MODX.

## Файл, Сниппет или процессор?

Первое, что нужно решить, — хотите ли вы сделать свои задачи файловыми или сниппетными, или даже повторно использовать
процессор. Преимущество файловой системы заключается в том, что ее можно напрямую включить в систему управления
версиями, в то время как сниппеты легче редактировать в админке, если вам это больше нравится, и их можно
повторно использовать во внешнем интерфейсе. Процессоры основаны на классах, что может быть полезно для сложных задач. В
любом случае задача может делать одно и то же, и код, который вы пишете, практически одинаков.

## Передача данных в задачу

API компонента позволяет передать переменную `$data` для данных времени выполнения, которые будут переданы в файл или
сниппет. В файле или сниппете эти параметры доступны через переменную `$scriptProperties`, и мы предлагаем использовать
метод `$modx->getOption` для доступа к ним.

## Регистрация ошибок в Scheduler

Если что-то пойдет не так в вашем файле/сниппете (например, вам не хватает необходимой переменной), вы можете записывать
ошибки обратно в компонент планировщика. Добавление ошибки также помечает запуск задачи как неудачный. Вот пример:

```php
$run->addError('random_error', array(
    'random_number' => rand(0, 99999)
));
```

Это приведет к регистрации ошибки в планировщике типа «random_error» со случайным числом в качестве дополнительных данных, а задача будет помечена как невыполненная.

## Возвращение результата

Просто верните строку (это может быть JSON или базовый HTML, если вам так больше нравится), чтобы она была записана в компоненте. Использование echo или print не будет записываться, поэтому вам не следует этого делать.

## Задачи процессора

Когда ваша задача запускает процессор, вы можете получить доступ к данным с помощью метода `$this->getProperty()` из процессора на основе классов. Это также относится к объектам `run` и `task`, которые вы можете загрузить следующим образом:

```php
<?php
$task = $this->getProperty('task');
$run = $this->getProperty('run');

```