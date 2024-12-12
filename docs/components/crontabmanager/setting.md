# Настройки

Для запуска crontab на сервере нужно перейти на вкладку настройки и добавить задание в крон для запуска

[![](https://file.modx.pro/files/c/9/6/c9634c8ea7f96f6e68eb35d66c04393bs.jpg)](https://file.modx.pro/files/c/9/6/c9634c8ea7f96f6e68eb35d66c04393b.png)

## Schedule console

Добавление крон задания в linux crontab

1. Войдите на сервер по ssh:

    ```bash
    ssh www-data@127.0.0.1
    ```

    > **Примечание**: Замените `user` и `ip адрес 127.0.0.1` на имя пользователя, под которым работает сайт, и IP адрес для подключения.

2. Выполните команду от вашего пользователя:

    ```bash
    crontab -e

    ```

    > **Примечание**: Для выполнения от имени ROOT-пользователя:

    ```bash
    crontab -u www-data -e
    ```

    > **Внимание!!** Не выполняйте команду `crontab -e` под ROOT пользователем без явного указания USER, иначе после исполнения команды у сайта пропадут доступы к
    > созданным файлам.

3. Откроется редактор [nano](https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-ubuntu-1804), при первом запуске может спросить, какой редактор использовать по умолчанию.

4. Добавьте строку в конец файла:

    ```bash
    */1    *       *       *       *       /usr/local/bin/php /var/www/html/core/scheduler/artisan schedule:run 2>&1
    ```

5. Сохраните изменения и выполните выход из файла: **CTRL+x && Yes Enter**

    Пример как будет выглядеть crontab:

    ```bash
    # modX component CronTabManager
    */1    *       *       *       *       /usr/local/bin/php /var/www/html/core/scheduler/artisan schedule:run 2>&1
    ```

**CronTab** запускается каждую минуту и выполняет команду от имени вашего пользователя `www-data`.

### Дополнительная информация

Узнать, под каким пользователем подключились (просто введите "id"):

```bash
id
# ---> uid=82(www-data) gid=82(www-data) groups=82(www-data)
```

Для переключения на пользователя из под root можно выполнить команду:

```bash
su - www-data
```

Используя этот метод, можно включать и выключать задания через панель администрирования. Задания автоматически будут запускаться на вашем сервере.

![Включение-выключение крон заданий](https://raw.githubusercontent.com/astra-modx/modx-app-crontabmanager/refs/heads/master/docs/images/task_enable.png)

---

## Schedule Work console

Для подключения через supervisor (php artisan schedule:work):

```ini
[program:crontab]
command = php /var/www/html/core/scheduler/artisan schedule:work
user = www-data
autostart = true
autorestart = true
redirect_stderr = true
stdout_logfile = /dev/stdout
```

Задание делает паузу в одну минуту, после окончания запуска всех команд в текущее время.
