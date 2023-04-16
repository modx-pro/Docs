# Оповещения

## Создать / Изменеть оповещение

Оповещение срабатывает в момент смены статуса сущности.

[![](https://file.modx.pro/files/1/0/8/1081d703c933784602832a7d79c7c9e4s.jpg)](https://file.modx.pro/files/1/0/8/1081d703c933784602832a7d79c7c9e4.png)

Для создании оповещения необходимо указать класс и статус. Задать почту, тему и тело сообщения.

Для каждой сущности определены методы `{getClientEmails}` и `{getManagerEmails}`
Результат набивается в переменные:

- `{$client_email}` - почта клиента
- `{$manager_email}` - почта менеджера

Таким образом вы можете просто указать `{$client_email | join}` и для сущности клиент это будет почта клиента, для сущности контент это будет почта всех клиентов с активной подпиской на данный контент и тп.

[4]: /components/payandsee/interface/content
[5]: /components/payandsee/interface/rates
[6]: /components/payandsee/interface/clients
[7]: /components/payandsee/interface/subscriptions
[8]: /components/payandsee/interface/statuses
[9]: /components/payandsee/interface/notifications
