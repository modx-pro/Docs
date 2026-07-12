# TicketForm

Frontend form to create and edit tickets. Logged-in users only.

**Call uncached:** `[[!TicketForm]]`.

Edit mode: `&tid=` or `?tid=` in the URL. Delete/restore uses `Tickets::deleteTicket()` with `&redirectDeleted` / `&redirectUnDeleted`.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **&allowedFields** | `parent,pagetitle,content` | Editable fields; TVs allowed |
| **&requiredFields** | `parent,pagetitle,content` | Required fields |
| **&bypassFields** | | Fields saved without sanitization |
| **&parents** | | Section parent IDs, comma-separated; `-id` excludes |
| **&resources** | | Section IDs; `-id` excludes |
| **&context** | | Contexts to search sections |
| **&sortby** | `pagetitle` | Section list sort field |
| **&sortdir** | `ASC` | Section list sort direction |
| **&tid** | | Ticket ID for edit mode |
| **&redirectUnpublished** | `0` | Resource ID after saving unpublished ticket |
| **&redirectDeleted** | `0` | Redirect after delete |
| **&redirectUnDeleted** | `0` | Redirect after restore |
| **&allowDelete** | | Show delete button in update form |
| **&allowFiles** | `1` | File uploads on tickets |
| **&source** | `0` | Media source; else `tickets_source_default` |
| **&tplFormCreate** | `tpl.Tickets.form.create` | Create chunk |
| **&tplFormUpdate** | `tpl.Tickets.form.update` | Update chunk |
| **&tplPreview** | `tpl.Tickets.form.preview` | Preview chunk |
| **&tplSectionRow** | `@INLINE <option...>` | `<option>` row in section list |
| **&tplTicketEmailBcc** | `tpl.Tickets.ticket.email.bcc` | BCC on new ticket |
| **&tplTicketEmailSubscription** | `tpl.Tickets.ticket.email.subscription` | Email to section subscriber |
| **&tplFiles** | `tpl.Tickets.form.files` | Files block |
| **&tplFile** | `tpl.Tickets.form.file` | File row |
| **&tplImage** | `tpl.Tickets.form.image` | Image row |
| **&validate** | | FormIt rules; see [TicketFormit](/en/components/tickets/ticketformit) |

The section list is filtered by `section_add_children` on the resource. The snippet has no parameter to change that check.

## Examples

### Create ticket

::: code-group

```fenom
{'!TicketForm' | snippet}
```

```modx
[[!TicketForm]]
```

:::

### Edit by ID

::: code-group

```fenom
{'!TicketForm' | snippet : ['tid' => 15]}
```

```modx
[[!TicketForm? &tid=`15`]]
```

:::
