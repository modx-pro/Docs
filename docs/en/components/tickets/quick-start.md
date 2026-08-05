---
title: Quick start
description: Minimal Tickets setup on the site
---

# Quick start

The package does not ship a ready-made site template. Minimal flow after [install](index) and [permissions](interface/setup-permissions).

## 1. Section and access

1. Create a [ticket section](interface/create-ticket-section) in the resource tree.
2. On the section resource, enable **TicketSectionPolicy** (or grant `section_add_children`).
3. Assign **TicketUserPolicy** to frontend users in the `web` context.

## 2. Templates

| Template | Purpose | Snippets |
| --- | --- | --- |
| Section | ticket list | `getTickets` + `pdoPage` |
| Ticket | entry page | `TicketMeta`, content, `TicketComments` |
| Create | frontend form | `TicketForm` |

CSS/JS load from `tickets_frontend_css` and `tickets_frontend_js`. Details: [Frontend](frontend).

## 3. Section template

::: code-group

```fenom
<h1>{$_modx->resource.pagetitle}</h1>

{'!pdoPage' | snippet : [
  'element' => 'getTickets',
  'parents' => $_modx->resource.id,
  'limit' => 10,
]}
{$_modx->getPlaceholder('page.nav')}
```

```modx
<h1>[[*pagetitle]]</h1>

[[!pdoPage?
  &element=`getTickets`
  &parents=`[[*id]]`
  &limit=`10`
]]

[[!+page.nav]]
```

:::

Default row chunk: `tpl.Tickets.list.row`. See [Chunks](chunks).

## 4. Ticket template

::: code-group

```fenom
{'!TicketMeta' | snippet}

{$_modx->resource.content}

{'!TicketComments' | snippet}
```

```modx
[[!TicketMeta]]

[[*content]]

[[!TicketComments]]
```

:::

## 5. Create page

::: code-group

```fenom
{'!TicketForm' | snippet}
```

```modx
[[!TicketForm]]
```

:::

Check `tickets_default_template` and the section child template.

## 6. Verify

- [System settings](settings): mail, editor, `tickets_source_default`
- Test ticket from mgr and frontend
- Comment and email (or `tickets_mail_queue`)

Next: [FAQ](faq), [FormIt](ticketformit), [section settings](interface/create-ticket-section#section-settings).
