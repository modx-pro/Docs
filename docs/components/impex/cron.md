Запуск удобнее осуществлять посредством [CronManager](https://extras.modx.com/package/cronmanager) или [Scheduler](https://modstore.pro/packages/utilities/scheduler).

## CronManager
Для работы через CronManager на сервере нужно добавить CRON-задание для запуска скрипта `{assets_url}components/cronmanager/cron.php` (подробности в [документации](https://jako.github.io/CronManager/usage/)).

При создании новой задачи в CronManager, выберите сниппет ImpexCRON, который идёт в комплекте с Impex, настройте расписание и укажите параметры запуска:
```
parent: 25
config: resource
file: import.xlsx
gallery: new
```
![](https://demo.rpa-design.ru/media/impex/005.png)  

В данном случае в качестве родителя будет выбран ресурс с ID = `25`, конфигурация `resource.php`, файл `import.xlsx`, который нужно предварительно загрузить в директорию `{assets_url}/components/impex3/files/` и режим обработки галереи miniShop3 (**new** - только новые, **refresh** - перезапись, если параметр не указывать, галерея не обрабатывается).

## Scheduler
Для запуска через Scheduler также нужно на сервере создать CRON-задание на запуск скрипта `{assets_url}components/scheduler/run.php` и далее настроить задания в приложении:<br><br>
![](https://demo.rpa-design.ru/media/impex/sched1.png)<br><br>
![](https://demo.rpa-design.ru/media/impex/sched2.png)<br><br>
![](https://demo.rpa-design.ru/media/impex/sched3.png)  

