## Crontab

Cron jobs run from the commands you create; all scheduled tasks are stored in the database.

#### Adding a command to Cron

```shell
php artisan crontab:add --command=mysupertask
```

#### List of Cron jobs

```shell
php artisan schedule:list

# ------ -------- ------------- --------------------- ----------------- -----------
#  Path   Active   Crontab       Next run              Diff              Comment
# ------ -------- ------------- --------------------- ----------------- -----------
#  demo   Yes      */1 * * * *   2024-11-30 05:48:00   via 6 seconds    Demo task
# ------ -------- ------------- --------------------- ----------------- -----------
```

#### Running current Cron jobs

Jobs that match the current time will run.

```shell
php artisan schedule:run
# // Demo task...
#
# [INFO] [1 1 * * *] mysupertask.php run
```

### Crontab time settings

In the Manager you can configure crontab timing:
[manager](http://127.0.0.1:9001/manager/?a=home&namespace=crontabmanager)
