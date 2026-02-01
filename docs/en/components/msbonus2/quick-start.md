# Quick start

## Bonus form output

Simply call the `msBonus2Form` snippet where needed:

```fenom
{'!msBonus2Form' | snippet}
```

## Output of redeemed bonuses outside the form chunk

To display the number of redeemed bonuses outside the `tpl.msBonus2.form` chunk, e.g. next to the order total, use this code:

```fenom
{var $msb2_discount = ($.session.msBonus2 && $.session.msBonus2.writeoff)
  ? $.session.msBonus2.writeoff[$_modx->context.key] : 0}
<div class="[ js-msb2-discount-wrap ]" style="display:{$msb2_discount ? 'block' : 'none'}">
  Payment with bonuses:
  <span class="[ js-msb2-discount-value ]">{$msb2_discount ?: 0}</span>
  {'ms2_frontend_currency' | lexicon}
</div>
```

::: info
Supported since version 1.1.4
:::

## Order statuses

If you have changed the main order statuses, you need to go to the component system settings and specify the statuses used: `msb2_order_status_new`, `msb2_order_status_paid`, `msb2_order_status_cancel`.

## Categories for accrual and redemption

These are controlled by system settings `msb2_categories_for_accrual_of_points` and `msb2_categories_for_writing_off_points`.
Each accepts category ids separated by commas.

## Bonus activation time

This is controlled by system setting `msb2_activation_time_for_bonus`. The key specifies the accrual type, and the value is the number of seconds after which the bonus points will appear on the user's balance (before that they remain in reserve).

Specified in JSON format.

Example:

```json
{
  "order_accrual": 86400,
  "signup": 86400,
  "dob": 0,
  "offline": 0
}
```

Here we specified that bonus points for orders and registration can be used only after one day: `86400 / 24 / 60 / 60 = 1`.

### Bonus lifetime

This is controlled by system setting `msb2_lifetime_for_bonus`. The key specifies the accrual type, and the value is the number of seconds after which the bonus points expire on the user's bonus account.

**Note** that values in this setting must be higher (or zero) than in `msb2_activation_time_for_bonus`.

Specified in JSON format.

Example:

```json
{
  "order_accrual": 31556926,
  "signup": 2629743,
  "dob": 604800,
  "offline": 0
}
```

Here we specified that points:

- for orders expire after one year,
- for registration — after one month,
- for birthday — after one week.

## Additional actions for manual accrual and redemption

Manual accrual and redemption actions are stored in system setting `msb2_form_action_types`.
Specified in JSON format.

Example:

```json
{
  "offline": {
    "+": "Offline accrual",
    "-":"Offline redemption"
  },
  "win": {
    "+": "Contest win"
  }
}
```

## Routine actions via cron script

Routine actions include: bonus accrual for birthdays, moving order bonuses from reserve to main account, expiring old bonuses, etc.

The system setting `msb2_routine_running_method` controls how routine actions run. You can set `frontend` or `cron`.
By default it is `frontend`, to get started quickly with the bonus system, but if you don't want to sacrifice any site performance and reduce frontend load, it's better to use `cron`.

**You must** configure this script to run in cron once per minute (or at least once every 10 minutes), otherwise the bonus system will not work correctly!

::: warning
**Run the script as the user under which the site runs!**
If you run it as root or another user, cache folders will be created with wrong permissions and MODX will throw errors about being unable to delete files or directories in cache.

If you're in a terminal as root or sudo user, add `sudo -u{user}` before `php …` in all examples:

```bash
sudo -u{user} php /path_to_script.php
```

where `{user}` is the system user under which the site runs; otherwise remove the `sudo -u{user}` part.
:::

Example of running the routine script via cron once per minute:

```bash
* * * * * sudo -u{user} php /path_to_site/core/components/msbonus2/cron/routine.php
```

Where `{user}` is the system user under which the site runs.
