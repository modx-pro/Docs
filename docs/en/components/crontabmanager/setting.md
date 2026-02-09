# Settings

To run crontab on the server, go to the Settings tab and add a cron job.

[![](https://file.modx.pro/files/c/9/6/c9634c8ea7f96f6e68eb35d66c04393bs.jpg)](https://file.modx.pro/files/c/9/6/c9634c8ea7f96f6e68eb35d66c04393b.png)

## Schedule console

Adding a cron job in Linux crontab:

1. SSH into the server:

    ```bash
    ssh www-data@127.0.0.1
    ```

    > **Note**: Replace `user` and `127.0.0.1` with the user the site runs as and the server IP.

2. Run the command as that user:

    ```bash
    crontab -e
    ```

    > **Note**: To run as root for a specific user:

    ```bash
    crontab -u www-data -e
    ```

    > **Warning!!** Do not run `crontab -e` as ROOT without specifying the USER, or the site may lose access to its files.

3. An editor (e.g. [nano](https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-ubuntu-1804)) will open; on first run it may ask which editor to use.

4. Add this line at the end of the file:

    ```bash
    */1    *       *       *       *       /usr/local/bin/php /var/www/html/core/scheduler/artisan schedule:run 2>&1
    ```

5. Save and exit: **CTRL+x** then **Yes** and **Enter**.

    Example crontab:

    ```bash
    # modX component CronTabManager
    */1    *       *       *       *       /usr/local/bin/php /var/www/html/core/scheduler/artisan schedule:run 2>&1
    ```

**CronTab** runs every minute and executes the command as your user (e.g. `www-data`).

### Extra info

Check which user you are (run "id"):

```bash
id
# ---> uid=82(www-data) gid=82(www-data) groups=82(www-data)
```

To switch to a user from root:

```bash
su - www-data
```

With this setup you can enable and disable jobs from the Manager; they will run on the server automatically.

![Enable/disable cron jobs](https://raw.githubusercontent.com/astra-modx/modx-app-crontabmanager/refs/heads/master/docs/images/task_enable.png)

---

## Schedule Work console

For supervisor (php artisan schedule:work):

```ini
[program:crontab]
command = php /var/www/html/core/scheduler/artisan schedule:work
user = www-data
autostart = true
autorestart = true
redirect_stderr = true
stdout_logfile = /dev/stdout
```

The job pauses for one minute after running all commands due at the current time.
