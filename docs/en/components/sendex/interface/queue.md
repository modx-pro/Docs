# Email queue

## Building the queue

To send a newsletter, add messages to the queue first.

- Go to **Components** → **Sendex**

![Building the queue - 1](https://file.modx.pro/files/3/f/0/3f0e673a7ed51e205d2e683d35914390.png)

- On the **Email queue** tab select the newsletter in the dropdown and generate messages.

![Building the queue - 2](https://file.modx.pro/files/5/0/9/5099cea4f7eb982ef5ca4ee59faca458.png)

![Building the queue - 3](https://file.modx.pro/files/4/1/a/41ae797ee96de03bf8c634e72e722bc9.png)

- Then send the generated messages.

## Sending

You can send in several ways:

1. **Manually.** **Components** → **Sendex**, **Email queue** tab. Select a message and send via the context menu.
    ![Sending](https://file.modx.pro/files/4/1/a/41ae797ee96de03bf8c634e72e722bc9.png)

2. **Automatically via cron.** Use `core/components/sendex/cron/send.php` in cron. Run frequency depends on subscriber count and hosting; the script sends up to 100 emails per run. Sent messages are removed from the queue.

3. **Via API.**

    ```php
    $modx->addPackage('sendex', MODX_CORE_PATH . 'components/sendex/model/');

    $q = $modx->newQuery('sxQueue');
    $queue = $modx->getCollection('sxQueue');
    /** @var sxQueue $email */
    foreach ($queue as $email) {
      $email->send();
    }
    ```
