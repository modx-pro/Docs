# Scripts and styles

When UserEvents is initialized on the site frontend, the scripts and styles from system settings are registered:

- `front_js` — path to scripts, default `[[+assetsUrl]]js/web/default.min.js`
- `front_css` — path to styles, default `[[+assetsUrl]]css/web/default.min.css`

The frontend also gets a `UserEventsConfig` variable with the system configuration:

```js
UserEventsConfig = {
  actionUrl: '\/extras\/userevents\/assets\/components\/userevents\/action.php',
  assetsUrl: '\/extras\/userevents\/assets\/components\/userevents\/',
  ctx: 'web',
  version: '2.0.0-beta'
};
```

To change the built-in scripts or styles, rename the files, edit them, and set the new names in system settings — then they will not be overwritten on update.
The JS is based on [miniShop2][01020302]; format and syntax are almost the same.

## Callbacks

Different frontend operations can run JavaScript callbacks.

They are available for order operations:

- `Order` — order actions
  - `add` — add a field to the order (name, email, address, etc.)
  - `getdaysstate` — get calendar day states
  - `gettimesstate` — get time-of-day states
  - `getcost` — get current order cost
  - `submit` — submit the order for processing

**Each** of these actions has stages you can use for your logic.
Each stage is a function or array of functions that run at the right time:

- `before` — runs before the operation. Return `false` to cancel.
- `ajax` — request to the server
  - `done` — request succeeded, server returned a response
  - `fail` — server error, e.g. HTTP 500
  - `always` — runs for any server response
- `response` — server response received (ajax returned done)
  - `success` — server indicates success
  - `error` — validation or logic error, e.g. required order fields missing

To add a callback, pass the path, name and function:

```js
UserEvents.Callbacks.add('Order.add.before', 'callback_name', function() {
  UserEvents.Message.error('Add not allowed!');
  return false;
});
```

To remove one, pass only the path and name:

```js
UserEvents.Callbacks.remove('Order.add.before', 'callback_name');
```

Both functions return `true` or `false` depending on the result.

## Examples

Two callbacks that show popup messages when a field is added to the order:

```js
UserEvents.Callbacks.add('Order.add.response.success', 'orders_add_ok', function(response) {
  UserEvents.Message.success('OK!');
  console.log(response);
});
UserEvents.Callbacks.add('Order.add.response.error', 'orders_add_err', function(response) {
  UserEvents.Message.error('An error occurred :-(');
  console.log(response);
});
```

Log all ajax requests for the order:

```js
UserEvents.Callbacks.add('Order.add.ajax.always', 'ajax_log', function(xhr) {
  console.log(xhr);
});
```

[01020302]: /en/components/minishop2/development/scripts-and-styles
