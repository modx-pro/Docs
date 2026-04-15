# Распространенные ошибки

## Убедитесь, что заполнены настройки

Для отправки заказов MiniShop3:

- **amobridge.enabled** — интеграция включена
- **amobridge.client_id**, **amobridge.client_secret**, **amobridge.redirect_uri** — данные OAuth
- **amobridge.subdomain** — поддомен amoCRM
- **amobridge.default_pipeline_id** — ID воронки для заказов

Для отправки форм дополнительно:

- **amobridge.form_pipeline_id** — ID воронки для форм (или заполненный `default_pipeline_id`)
- Хук `amoBridgeHook` добавлен в вызов FormIt

## Корректный поддомен

В настройке **amobridge.subdomain** указывается только поддомен. Для CRM по адресу `mycompany.amocrm.ru` нужно указать `mycompany`, а не полный URL.

## Ошибка SSL при использовании Scheduler

При запуске Scheduler через cron (CLI) может возникнуть ошибка:

```
SSL certificate problem: self signed certificate in certificate chain
```

Это происходит из-за отсутствия настройки `curl.cainfo` в CLI-версии php.ini. Найдите php.ini для CLI и добавьте путь к CA-сертификатам:

```ini
curl.cainfo = "/path/to/cacert.pem"
```

## OAuth-токен не получен

Если после авторизации компонент не работает:

1. Проверьте, что **Redirect URI** в настройках amoCRM точно совпадает с настройкой `amobridge.redirect_uri`
2. Очистите кэш MODX
3. Повторите авторизацию через CMP

## Сделки не создаются

Алгоритм проверки:

1. Убедитесь, что настройка **amobridge.enabled** включена
2. Проверьте соединение через кнопку «Тест» на вкладке Настройки в CMP
3. Откройте вкладку **Лог** в CMP — найдите записи с `action = error`
4. Проверьте лог MODX (core/cache/logs/error.log) на наличие ошибок `[amoBridge]`
5. Убедитесь, что указан корректный ID воронки
6. Очистите кэш и повторите попытку

## Дублирование сделок

Компонент защищен от дублей: при создании заказа проверяется таблица `amo_order_link`. Если связка уже существует, повторная сделка не создается. Если дубли все же появляются — проверьте, не вызывается ли обработчик из кастомного кода.
