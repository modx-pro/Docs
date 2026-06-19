# События

mxLogger вызывает два системных события вокруг записи лога. Обработчики ошибок
перехватываются (`try/catch`) — кривой плагин не ломает ни запись, ни запрос. Внутри
обработчика рекурсивная запись лога событий не вызывает (гард от рекурсии).

::: info
Имена событий, их поля и логика обработчиков **одинаковы в MODX 2 и MODX 3**.
Примеры ниже работают в обеих версиях (сервисы `mail`/константы `modMail` в MODX 3
доступны через legacy-алиасы).
:::

## `mxlOnBeforeLogSave` — до записи

Передаются все поля будущей записи + `tags_list` (массив), `options`, `mxlogger`
(сам сервис). Плагин может:

- **отменить запись** — `$modx->event->returnedValues['prevent'] = true;`
- **изменить любое поле** — `$modx->event->returnedValues['level'] = 'error';`
  (для `tags` можно передать массив — он нормализуется).

```php
// плагин на mxlOnBeforeLogSave: не писать debug по тэгу noisy
if (($scriptProperties['level'] ?? '') === 'debug'
    && in_array('noisy', $scriptProperties['tags_list'] ?? [], true)) {
    $modx->event->returnedValues['prevent'] = true;
}
```

## `mxlOnAfterLogSave` — после записи

Передаются те же поля + `id` (id сохранённой записи), `tags_list`, `object` (объект
`MxLoggerLog`), `mxlogger`. Используется для нотификаций/интеграций.

## Алерты на ошибки (почта / мессенджер)

Повесьте плагин на `mxlOnAfterLogSave`, проверьте уровень — и при `error` отправьте
письмо или сообщение в Telegram/Slack/любой мессенджер. Лог не просто копится, а сам
сигналит, когда что-то сломалось.

```php
// плагин на mxlOnAfterLogSave
if (($scriptProperties['level'] ?? '') !== 'error') {
    return;
}
$message = $scriptProperties['message'] ?? '';
$tags    = implode(', ', $scriptProperties['tags_list'] ?? []);
$id      = $scriptProperties['id'] ?? null;
$context = $scriptProperties['context'] ?? [];

// 1) письмо
$modx->getService('mail', 'mail.modPHPMailer');
$modx->mail->set(modMail::MAIL_BODY, "Ошибка [{$tags}] #{$id}: {$message}");
$modx->mail->set(modMail::MAIL_SUBJECT, '[site] mxLogger error');
$modx->mail->address('to', $modx->getOption('emailsender'));
$modx->mail->send();
$modx->mail->reset();

// 2) Telegram (псевдокод — ваш HTTP-запрос к Bot API)
// file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat}&text=" . urlencode("[{$tags}] {$message}"));
```

Подключите плагин к событию `mxlOnAfterLogSave` в менеджере (или в `_build` своего
пакета). Так из mxLogger получается единая точка алертинга по всем пакетам, которые
в него пишут.
