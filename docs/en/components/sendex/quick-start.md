---
title: Quick start
---
# Quick start

Step-by-step setup for your first Sendex newsletter.

## Step 1. Install

1. Install the package via **Extras → Installer** (see [overview](index#installation))
2. Clear the MODX cache

## Step 2. Create a newsletter

1. Open **Components → Sendex**
2. On the **Subscriptions** tab click **Create**
3. Fill in the required fields:

| Field | Description |
| --- | --- |
| **Name** | Newsletter name in the manager |
| **Template** | MODX template for the letter body (see step 3) |
| **Email subject** | Outgoing subject line |
| **From email** | Sender address |
| **Reply-to email** | Reply-To header |
| **Sender name** | Display name |
| **Enabled** | Whether the newsletter is active |

More on fields and subscribers: [Subscriptions](interface/subscriptions).

## Step 3. Letter template

Create a MODX template for the letter body. On send, Sendex passes `newsletter`, `subscriber`, and for logged-in subscribers — `user` and `profile`.

Unsubscribe link example:

::: code-group

```fenom
{set $args = [
  'sx_action' => 'unsubscribe',
  'newsletter_id' => $newsletter.id,
  'code' => $subscriber.code,
]}
<a href="{'site_start' | option | url : ['scheme' => 'full'] : $args}">Unsubscribe from this newsletter</a>
```

```modx
<a href="[[~[[++site_start]]?scheme=`full`&sx_action=`unsubscribe`&newsletter_id=`[[+newsletter.id]]`&code=`[[+subscriber.code]]`]]">
  Unsubscribe from this newsletter
</a>
```

:::

The target page must call the Sendex snippet:

::: code-group

```fenom
{'!Sendex' | snippet : ['id' => 1]}
```

```modx
[[!Sendex? &id=`1`]]
```

:::

Full placeholder list: [snippet docs](snippets/sendex#letter-template).

::: tip Demo template from package
Transport includes template **Sendex** (`template.sendex.tpl`) with all `newsletter`, `subscriber`, `user`, `profile` placeholders and an unsubscribe link example. Use it as a starting point.
:::

## Step 4. Subscribe form on the site

Call the snippet **uncached** — output depends on login state:

::: code-group

```fenom
{'!Sendex' | snippet : ['id' => 1]}
```

```modx
[[!Sendex? &id=`1`]]
```

:::

Replace `1` with your newsletter ID.

- Logged-in users see subscribe or unsubscribe
- Guests enter an email; with confirmation enabled (`sendex_confirm_email`, default **Yes**) they receive an activation link

## Step 5. Test subscription

1. Open the page with the form
2. Subscribe with a test email (or log in as a MODX user)
3. In **Components → Sendex → Subscriptions** open the newsletter → **Subscribers** tab and verify the row

## Step 6. Send the newsletter

1. In the manager: **Subscriptions** → newsletter context menu → **Send to subscribers** — builds the queue and sends immediately
2. Or manually: **Email queue** tab → select newsletter → generate messages → send
3. For scheduled sending set up cron — see [Email queue](interface/queue#cron)

## Post-install checklist

- [ ] Newsletter created and **enabled**
- [ ] Letter template with unsubscribe link on a page with `[[!Sendex]]`
- [ ] Snippet on subscribe page (uncached)
- [ ] Test guest and logged-in subscription, row in **Subscribers**
- [ ] Cron for `core/components/sendex/cron/send.php` (if queue >100 emails)
- [ ] `sxOn*` events visible after package upgrade (see [Events](integration/events))

## Next steps

- [System settings](settings) — email confirmation, CSRF, export
- [Sendex snippet](snippets/sendex) — AJAX, multiple forms, custom chunks
- [Events](integration/events) — subscribe and queue hooks
- [FAQ](faq) — common issues
