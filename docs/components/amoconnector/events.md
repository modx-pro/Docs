# События

При работе компонента вызываются события, позволяющие модифицировать данные перед отправкой или обработать результаты:

## Сделки

- **amoOnBeforeCreateLead** — перед созданием сделки. Можно модифицировать данные или отменить создание
- **amoOnCreateLead** — после создания сделки
- **amoOnBeforeUpdateLead** — перед обновлением сделки (смена статуса)
- **amoOnUpdateLead** — после обновления сделки

## Контакты

- **amoOnBeforeCreateContact** — перед созданием контакта. Можно модифицировать данные или отменить создание
- **amoOnCreateContact** — после создания контакта

## Маппинг

- **amoOnBeforeMapFields** — перед маппингом полей
- **amoOnAfterMapFields** — после маппинга полей

## Webhook

- **amoOnWebhook** — при получении webhook от amoCRM
- **amoOnBeforeSyncStatus** — перед синхронизацией статуса из amoCRM в ms2

## Использование

Данные передаются и модифицируются через `$modx->event->returnedValues`. Для отмены операции верните любое значение через `$modx->event->output()`.

```php
switch ($modx->event->name) {
    case 'amoOnBeforeCreateLead':
        // Доступные параметры: leadData, sourceType, sourceId, contactId
        $leadData = $modx->event->params['leadData'];

        // Модификация данных
        $leadData['tags'][] = 'доп.тег';
        $modx->event->returnedValues['leadData'] = $leadData;

        // Отмена создания сделки
        // $modx->event->output('cancelled');
        break;
}
```
