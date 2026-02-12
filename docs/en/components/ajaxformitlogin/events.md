# System events

The component fires only two system events, both related to user registration.

## OnUserActivate {#OnUserActivate}

Fires when the user is successfully activated.

### OnUserActivate parameters

1. `$user` — user object.
2. `$profile` — user profile object.
3. `$data` — all user data as an array.

## aiOnUserUpdate {#aiOnUserUpdate}

Fires when user data is updated via the profile form in the user cabinet.

### aiOnUserUpdate parameters

1. `$user` — user object.
2. `$profile` — user profile object.
3. `$data` — all data passed in the $_POST array.

::: warning
Do not return anything from your plugins for these events; return values are not used. The events are fired only so you can perform actions on the user and profile after update and activation.
:::
