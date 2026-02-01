# Scheduler task manager

Since miniShop2 4.1 the component supports scheduled tasks.
It depends on the [Scheduler][1] component.

Built-in example: delayed email sending to the customer and manager(s).

Without the task manager, during checkout the system sends several notification emails immediately, which slows the server response while the customer is still waiting.
Each email can take about 10–15 seconds.

The task manager lets you enqueue an email instead of sending it right away, which is much faster.
The task runs later in the background, without admin involvement.

## Enabling the task manager

- Ensure the Scheduler component is installed
- Enable system setting **ms2_use_scheduler**
- Configure CRON to run every minute. Run `assets/components/scheduler/run.php` every minute

Example crontab entry:

```shell
* * * * * php ~/www/assets/components/scheduler/run.php
```

After that, emails are sent in the background as scheduled tasks, one per minute, instead of immediately.

## Advanced CRON: multiple runs per minute

By default the system cannot run tasks more than once per minute. That is an OS limitation.
A workaround is to run the script several times per minute, e.g. every 10 seconds:

```shell
* * * * * sleep 00; run-one php ~/www/assets/components/scheduler/run.php
* * * * * sleep 10; run-one php ~/www/assets/components/scheduler/run.php
* * * * * sleep 20; run-one php ~/www/assets/components/scheduler/run.php
* * * * * sleep 30; run-one php ~/www/assets/components/scheduler/run.php
* * * * * sleep 40; run-one php ~/www/assets/components/scheduler/run.php
* * * * * sleep 50; run-one php ~/www/assets/components/scheduler/run.php
```

Notes:

- **sleep 10** — delay execution by 10 seconds
- **run-one** — ensures the previous run has finished; if the script is still running, the new run is skipped to avoid duplicate emails

**Note.** run-one is a separate server utility (apt package). It is not available on all hosts (e.g. not on modhost.pro).
If it is missing, the task may not run at all.

## More information

See the [Scheduler documentation][2] for details.

[1]: https://modstore.pro/packages/utilities/scheduler
[2]: /en/components/scheduler/
