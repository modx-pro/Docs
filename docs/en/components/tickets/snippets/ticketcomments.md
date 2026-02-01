# TicketComments

Outputs comments and a form to comment on a resource.

> Can be used with any MODX document.
> The snippet must be called uncached.

## Snippet call parameters

| Name                         | Default                             | Description                                                                                                                                 |
| ---------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **&allowGuest**                  | `0`                              | Allow unauthenticated users to comment?                                                                                                     |
| **&allowGuestEdit**              | `1`                              | Allow guests to edit their own comments?                                                                                                    |
| **&allowGuestEmails**            | `0`                              | Send email notifications about replies to guests?                                                                                           |
| **&autoPublish**                 | `1`                              | Automatically publish all new comments without moderation.                                                                                  |
| **&autoPublishGuest**            | `1`                              | Automatically publish all new comments from guests without moderation.                                                                      |
| **&depth**                       | `0`                              | Integer: maximum depth of the comment thread.                                                                                                |
| **&enableCaptcha**               | `1`                              | Enable spam protection for unauthenticated users?                                                                                          |
| **&fastMode**                    | `1`                              | If enabled, only raw DB values are passed to the result chunk; all unprocessed MODX tags are stripped.                                       |
| **&formBefore**                  | `0`                              | Show the comment form above the comments. Default: no.                                                                                      |
| **&toPlaceholder**               |                                  | Do not output the result; put it in the placeholder *toPlaceholder*.                                                                        |
| **&separatePlaceholder**         | `0`                              | If 1, output the form and comments to *toPlaceholder*_form and *toPlaceholder*_thread.                                                       |
| **&gravatarIcon**                | `mm`                             | Fallback image when the user avatar is not found.                                                                                           |
| **&gravatarSize**                | `24`                             | Size of the loaded avatar.                                                                                                                  |
| **&gravatarUrl**                 | `http://www.gravatar.com/avatar/` | URL for loading avatars.                                                                                                                    |
| **&maxCaptcha**                  | `10`                             | Maximum value for the spam-protection code.                                                                                                 |
| **&minCaptcha**                  | `1`                              | Minimum value for the spam-protection code.                                                                                                 |
| **&thread**                      |                                  | Comment thread name. Default: `resource-[[*id]]`.                                                                                           |
| **&tplCommentAuth**              | `tpl.Tickets.comment.one.auth`   | Chunk for a comment shown to a logged-in user.                                                                                              |
| **&tplCommentDeleted**           | `tpl.Tickets.comment.one.deleted`| Chunk for a deleted comment.                                                                                                                 |
| **&tplCommentEmailBcc**          | `tpl.Tickets.comment.email.bcc`  | Chunk for notifying site admins of a new comment.                                                                                           |
| **&tplCommentEmailOwner**        | `tpl.Tickets.comment.email.owner`| Chunk for notifying the ticket owner of a new comment.                                                                                      |
| **&tplCommentEmailReply**        | `tpl.Tickets.comment.email.reply`| Chunk for notifying a user that their comment received a reply.                                                                             |
| **&tplCommentEmailSubscription** | `tpl.Tickets.comment.email.subscription` | Chunk for notifying a subscribed user of a new comment in the thread.                                |
| **&tplCommentForm**              | `tpl.Tickets.comment.form`       | Chunk for the new-comment form.                                                                                                              |
| **&tplCommentFormGuest**         | `tpl.Tickets.comment.form.guest` | Chunk for the new-comment form for guests.                                                                                                  |
| **&tplCommentGuest**             | `tpl.Tickets.comment.one.guest`  | Chunk for a comment shown to guests.                                                                                                        |
| **&tplComments**                 | `tpl.Tickets.comment.wrapper`    | Wrapper chunk for all comments on the page.                                                                                                 |
| **&tplLoginToComment**           | `tpl.Tickets.comment.login`      | Chunk prompting the user to log in to comment.                                                                                               |

## Examples

- Standard snippet call

```modx
[[!TicketComments?]]
```

- Snippet call with comments allowed for unauthenticated users

```modx
[[!TicketComments? &allowGuest=`1`]]
```
