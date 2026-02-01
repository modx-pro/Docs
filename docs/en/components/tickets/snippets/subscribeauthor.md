# subscribeAuthor

Outputs a form to subscribe to an author. Subscription is only available to logged-in users.

## Parameters

| Name             | Default                         | Description                                                                                                                                                           |
|------------------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&createdby**  | `0`                              | Required. ID of the author (user) to subscribe to via the form.                                                                                                       |
| **&tpl**        | `tpl.Tickets.author.subscribe`   | Chunk for the subscription form.                                                                                                                                      |
| **&TicketsInit**| `0`                              | Set to "1" to load the subscription form and initialize Tickets frontend scripts on any page (e.g. author profile, user cabinet).                                     |

## Examples

- Call the snippet for each item in the ticket list, e.g. in chunk tpl.Tickets.list.row

    ```modx
    [[!subscribeAuthor? &createdby=`[[!+createdby]]`]]
    ```

- Call the snippet on the author profile page (user ID in placeholder +author.id)

    ```modx
    [[!subscribeAuthor? &createdby=`[[!+author.id]]` &TicketsInit=`1`]]
    ```
