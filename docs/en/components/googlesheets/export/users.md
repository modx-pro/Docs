# Users (modUser)

## Standard fields

| Field            | Name                   |
| ---------------- | -------------------------- |
| id               | User ID            |
| username         | Username           |
| fullname         | Full name                 |
| email            | Email    |
| phone            | Phone             |
| mobilephone      | Mobile  |
| fax              | Fax                       |
| address          | Address                      |
| city             | City                      |
| state            | State / region           |
| zip              | ZIP            |
| country          | Country                     |
| website          | Website                       |
| photo            | User photo    |
| dob              | Date of birth              |
| gender           | Gender                        |
| active           | Active                   |
| blocked          | Blocked               |
| sudo             | Sudo       |
| blockeduntil     | Blocked until            |
| blockedafter     | Blocked after         |
| logincount       | Login count          |
| lastlogin        | Last login             |
| failedlogincount | Failed login count               |
| createdon        | User creation date |
| primary_group    | User group       |

## Example

**Export fields:** id,username,email

**Table result:**

![Table result](https://file.modx.pro/files/2/9/a/29ac130b7161d6f5ed704038a0d63679.jpg)

## System events

Class **gsUser** fires these events:

```php
<?php
switch ($modx->event->name) {
  // fetches the list of users
  case 'gsOnBeforeGetUsers':
    // $query - selection query
    // $range - sheet name, where data will be exported
    break;
  case 'gsOnGetUsers':
    // $resources - array of resources with all fields
    // $range - sheet name
    break;
}
```

### Examples

1. Select users, that belong to group **Administrators**

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetUsers') {
      $query->where(array('primary_group' => 1));
    }
    ```

2. Change field value createdon (user creation date)

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetUsers') {
      $modx->event->params['users'] = array_map(function($user){
        if (!empty($user['createdon'])) {
          $user['createdon'] = date("d-m-Y",$user['createdon']);
        }
        return $user;
      }, $users);
    }
    ```
