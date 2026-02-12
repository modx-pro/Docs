# Cron task script

Script that runs parsing tasks. Can be run from the console (e.g. cron) or from the web.

## Example cron entry

```shell
0 2 * * * php /home_path/core/components/xparser/cron/parser.php ids debug_mode
```

- **ids** - ID(s) of the task(s) to run. Comma-separated for multiple. Omit to run all active tasks.
- **debug_mode** - 1 or 0 to run the script in debug mode.
