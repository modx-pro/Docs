# Clients (msClient)

## Export fields

All standard user fields supported with **user_** prefix.
E.g. user_email, user_fullname

## Export example

**Export fields:** id,user_id,user_username,user_email

**Table result:**

![Table result](https://file.modx.pro/files/0/8/8/0882e77d3b6de64e7588f29f4ae95398.jpg)

## System events

Class **gsUser** fires these events:

```php
<?php
switch ($modx->event->name) {
  // fetches the list of clients
  case 'gsOnBeforeGetClients':
    // $query - selection query
    // $range - sheet name, where data will be exported
    break;
  case 'gsOnGetClients':
    // $users - array of clients with all fields
    // $range - sheet name
    break;
}
```
