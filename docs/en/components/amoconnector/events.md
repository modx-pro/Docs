# Events

The component fires events so you can modify data before send or handle results:

## Leads

- **amoOnBeforeCreateLead** — before creating a lead. You can modify data or cancel
- **amoOnCreateLead** — after lead is created
- **amoOnBeforeUpdateLead** — before updating a lead (status change)
- **amoOnUpdateLead** — after lead is updated

## Contacts

- **amoOnBeforeCreateContact** — before creating a contact. You can modify data or cancel
- **amoOnCreateContact** — after contact is created

## Mapping

- **amoOnBeforeMapFields** — before field mapping
- **amoOnAfterMapFields** — after field mapping

## Webhook

- **amoOnWebhook** — when webhook is received from amoCRM
- **amoOnBeforeSyncStatus** — before syncing status from amoCRM to ms2

## Usage

Data is passed and modified via `$modx->event->returnedValues`. To cancel an operation return any value with `$modx->event->output()`.

```php
switch ($modx->event->name) {
    case 'amoOnBeforeCreateLead':
        // Params: leadData, sourceType, sourceId, contactId
        $leadData = $modx->event->params['leadData'];

        // Modify data
        $leadData['tags'][] = 'extra_tag';
        $modx->event->returnedValues['leadData'] = $leadData;

        // Cancel lead creation
        // $modx->event->output('cancelled');
        break;
}
```
