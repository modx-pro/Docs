# Subscriptions

The **Subscriptions** tab is where you create newsletters, manage subscribers, and trigger sends.

Open **Components → Sendex** → **Subscriptions**.

## Creating a newsletter

- Click **Create**, fill in the form, and save

![Creating a newsletter](https://file.modx.pro/files/2/a/f/2af549ef2d714b69e4369fda479de69e.png)

### Newsletter fields

| Field | Required | Description |
| --- | --- | --- |
| **Name** | yes | Name in the manager |
| **Template** | yes | MODX template for the letter body |
| **Email subject** | yes | Subject line |
| **From email** | yes | From address |
| **Reply-to email** | yes | Reply-To |
| **Sender name** | yes | Display name |
| **Enabled** | yes | Whether the newsletter is active |
| **Description** | no | Text in the subscribe form |
| **Image** | no | Newsletter image URL |

![Creating a newsletter](https://file.modx.pro/files/a/3/0/a3059d34688e43b4c4c17dc0a750c930.png)

Inactive newsletters are hidden on the site unless the snippet is called with `&showInactive=1`.

## Grid actions

| Action | Description |
| --- | --- |
| **Edit** | Edit fields and subscribers |
| **Enable / Disable** | Toggle `active` |
| **Send to subscribers** | Build the queue and send to all subscribers immediately |
| **Remove** | Delete the newsletter and related queue rows (cascade) |

Sending skips inactive and blocked MODX users (`user_id > 0`).

**Send to subscribers** calls `addQueues()` and immediate `flush()` — fine for small lists. For thousands of recipients build the queue separately and use cron — see [Email queue](queue#manager-send-vs-cron).

## Subscribers

Open a newsletter → **Subscribers** tab.

![Adding subscribers manually](https://file.modx.pro/files/a/5/b/a5b5bc9a4020110a51853f073ad71e48.png)

![Subscribers](https://file.modx.pro/files/2/c/6/2c6b4a5878e3ba8cca8582ef0665a79e.png)

### Add one user

Pick a MODX user from the dropdown. Only users with a profile email are listed.

![Subscribers](https://file.modx.pro/files/3/f/b/3fb80280c1ca094329af7cac814a185a.png)

![Subscribers](https://file.modx.pro/files/e/f/7/ef782c213e39f644f76ab716ba187663.png)

### Add a group

On **Subscribers** tab pick a MODX user group. Only **active** users with `Profile.blocked = false` are added. Per-row `sxOnSubscribe` events are **not fired** (bulk operation).

::: info
To log every row on bulk subscribe use a `subscribe()` loop via [PHP API](../integration/api), not the manager group button.
:::

### Remove a subscriber

Context menu → **Remove**. Calls `unSubscribe` with source `mgr` and fires unsubscribe events.

## Export subscribers

The **Export** button on the subscribers tab downloads CSV via the manager connector (not a public URL). Requires `edit_document`.

Export columns: [`sendex_export_fields`](../settings#settings-from-the-package). Hide the button: [`sendex_hide_export_button`](../settings#settings-from-the-package).

## Permissions

| Action | Permission |
| --- | --- |
| View Sendex page | `view_sendex` or `view_document` |
| Create newsletter | `new_document` |
| Edit, subscribers, export, send | `edit_document` |

::: info
The code checks `view_sendex`, but transport **does not ship** a separate policy. By default `view_document` is enough.
:::

## Related

- [Email queue](queue) — manual send and cron
- [Sendex snippet](../snippets/sendex) — site subscription
- [System settings](../settings) — export and email confirmation
