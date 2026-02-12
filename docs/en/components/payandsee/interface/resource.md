# Resource

The Manager is available for a resource as a separate tab; it only appears when editing a resource, because it requires a resource ID that does not exist when the resource is first created.
In the `working_templates` setting, specify the resource template IDs to use, comma-separated.

![Resource](https://file.modx.pro/files/b/7/b/b7ba7239a8af678fb4a1b891903fb1ae.png)

## Main

Tab that lists the main [content][4] properties: name, description, status, etc.
Actions: **create**/**edit**/**delete** content.

Note: the **Active for children** setting applies to resources inside this one.

## Rates

Tab that lists content [rates][5].
Actions: **create**/**edit**/**delete** rate.

![Rates](https://file.modx.pro/files/1/e/d/1edc42d5a4e47c7e6a3719e30bbce89c.png)

The set and order of fields on this tab is controlled by the system setting **grid_rate_fields**.
Available by default:

- `cost` — subscription cost, number with up to 2 decimal places
- `term_value` — subscription period value, integer
- `term_unit` — subscription period unit `y / m / d / h / i`
  - `y` — year
  - `m` — month
  - `d` — day
  - `h` — hour
  - `i` — minute

## Subscriptions

Tab that lists content [subscriptions][7].
Actions: **create**/**edit**/**delete** subscription.

![Subscriptions](https://file.modx.pro/files/9/1/9/919310cd8914ef9ff7668902f1bcf2bc.png)

The set and order of fields on this tab is controlled by the system setting **grid_subscription_fields**.

[4]: /en/components/payandsee/interface/content
[5]: /en/components/payandsee/interface/rates
[7]: /en/components/payandsee/interface/subscriptions
