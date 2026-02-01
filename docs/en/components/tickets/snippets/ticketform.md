# TicketForm

Outputs a form for creating a ticket by the user from the frontend.
The snippet must be called uncached.

## Snippet call parameters

| Name                 | Default                                                            | Description                                                                                                                                                                          |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **&allowedFields**   | `parent,pagetitle,content,published`                               | Ticket fields the user is allowed to fill. You can list TV names.                                                                                                                   |
| **&context**         |                                                                    | Comma-separated list of contexts to search for sections.                                                                                                                             |
| **&parents**         |                                                                    | By default all available ticket sections are shown; you can limit them with a comma-separated list of parent IDs. Prefix with minus "-" to exclude a parent.                        |
| **&resources**       |                                                                    | Comma-separated list of specific sections to show (or exclude with "-") in combination with **&parents**.                                                                             |
| **&permissions**     | `section_add_children`                                             | Permission checked for publishing in the section. Default: "section_add_children".                                                                                                     |
| **&tid**             |                                                                    | Use this parameter to edit a specific ticket via the snippet without the URL parameter $_REQUEST['tid'].                                                                             |
| **&redirectUnpublished** | `0`                                                            | Resource ID or URI to redirect the user to when an unpublished ticket is created.                                                                                                   |
| **&redirectDeleted** | `0`                                                                | Resource ID or URI to redirect the user to when a ticket is deleted.                                                                                                                |
| **&redirectUnDeleted** | `0`                                                              | Resource ID or URI to redirect the user to when a ticket is restored.                                                                                                               |
| **&requiredFields**  | `parent,pagetitle,content`                                         | Ticket fields the user must fill to submit the form.                                                                                                                                 |
| **&sortby**          | `pagetitle`                                                        | Field to sort the section list by.                                                                                                                                                  |
| **&sortdir**         | `ASC`                                                              | Sort direction for the section list.                                                                                                                                                |
| **&tplFormCreate**   | `tpl.Tickets.form.create`                                          | Chunk for creating a new ticket.                                                                                                                                                    |
| **&tplFormUpdate**   | `tpl.Tickets.form.update`                                          | Chunk for editing an existing ticket.                                                                                                                                               |
| **&tplPreview**      | `tpl.Tickets.form.preview`                                         | Chunk for ticket preview before publishing.                                                                                                                                         |
| **&tplSectionRow**   | `@INLINE <option value="[[+id]]" [[+selected]]>[[+pagetitle]]</option>` | Chunk for each section option in the form.                                                                                                        |
| **&tplTicketEmailBcc** | `tpl.Tickets.ticket.email.bcc`                                   | Chunk for notifying site admins of a new ticket.                                                                                                                                    |
| **&validate**        |                                                                    | Form field validation using FormIt rules (when FormIt is installed).                                                                                                                 |

## Call syntax

```modx
[[!TicketForm]]
```

## FormIt validator examples

You can use the **validate** parameter the same way as in FormIt. FormIt must be installed.
Examples are described [in a separate section][1]

[1]: /en/components/tickets/ticketformit
