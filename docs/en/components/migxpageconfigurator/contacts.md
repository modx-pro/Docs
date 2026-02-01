# Working with contacts

## Contact types

Contacts here include not only email and phone but also other editable items for easier editing and output:

- phones
- emails
- addresses
- requisites
- maps
- social networks and messengers
- opening hours

Each item has:

- `type` — type of the entry
- `value` — value; for phones a `formattedValue` is added (formatted phone); store phone as digits only. Format pattern: system setting `mpc_phone_format`
- `caption` — label for the contact
- `icon_class` — icon class; configure in Migx config `contacts` in the corresponding field options
- `form` — available for all types, used for email to assign which forms send to this address

## Snippet getContacts

The package includes snippet `getContacts` for outputting contacts.

| Parameter | Default | Description |
|-----------|---------|-------------|
| **rid** | from `mpc_contacts_page_id` | ID of the Contacts page |
| **tvname** | from `mpc_contacts_tvname` | TV name (migx) that stores contacts |

The snippet returns an array like:

```php
[
  'phones' => [
    'Phone' => [
      'value' => '79998887766',
      'formattedValue' => '8(999)888-77-66',
      'caption' => 'Phone',
      'icon_class' => 'icon-phone',
      'form' => '',
    ],
  ],
  'emails' => [],
  'socials' => [],
  'addresses' => [],
  'maps' => [],
  'worktime' => [],
  'requisites' => [],
]
```

Call once and use the result, e.g.:

```fenom
{set $contacts = 'getContacts' | snippet}
<div class="custom">
  <div>
    {$contacts['maps']['Map']['value']}
  </div>
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <tbody>
        {foreach $contacts['requisites'] as $requisite}
          <tr>
            <td><b>{$requisite['caption']}</b></td>
            <td>{$requisite['value']}</td>
          </tr>
        {/foreach}
        {foreach $contacts['phones'] as $phone}
          <tr>
            <td><b>{$phone['caption']}</b></td>
            <td>{$phone['formattedValue']}</td>
          </tr>
        {/foreach}
        {foreach $contacts['emails'] as $email}
          <tr>
            <td><b>{$email['caption']}</b></td>
            <td>{$email['value']}</td>
          </tr>
        {/foreach}
      </tbody>
    </table>
  </div>
</div>
```
