# TicketComments

Renders a comment thread and submit form. Works with tickets and any MODX resource.

**Call uncached:** `[[!TicketComments]]`.

Multiple threads on one page: set different `&thread=` values. Each wraps in `<div class="comments-thread" id="...">`.

## Parameters

| Name | Default | Description |
| --- | --- | --- |
| **&thread** | `resource-[[*id]]` | Comment thread name |
| **&threadUrl** | | Absolute page URL for comments outside the current document |
| **&tree** | `1` | `1` nested replies; `0` flat list with `limit`/`offset` pagination |
| **&depth** | `0` | Max nesting depth (`0` = unlimited when `tree=1`) |
| **&sortby** | `TicketComment.id` | Sort field |
| **&sortdir** | `ASC` | `ASC` or `DESC` |
| **&limit** | `0` | Comment limit; `0` = all |
| **&offset** | `0` | Query offset |
| **&where** | | Extra JSON conditions |
| **&fastMode** | `1` | DB values only, strips unprocessed MODX tags |
| **&outputSeparator** | newline | Separator between comments |
| **&toPlaceholder** | | Placeholder name instead of direct output |
| **&separatePlaceholder** | `0` | `1` puts form in `{toPlaceholder}_form`, list in `{toPlaceholder}_thread` |
| **&formBefore** | `0` | Form before the comment list |
| **&showLog** | `0` | pdoFetch log for `mgr` session |
| **&showUnpublished** | `0` | Show unpublished comments |
| **&allowGuest** | `0` | Guest comments |
| **&allowGuestEdit** | `1` | Guests can edit own comments |
| **&allowGuestEmails** | `0` | Email guests about replies |
| **&requiredFields** | `name,email` | Required guest form fields |
| **&autoPublish** | `1` | Publish logged-in comments without moderation |
| **&autoPublishGuest** | `1` | Same for guests |
| **&enableCaptcha** | `1` | Captcha for guests |
| **&minCaptcha** | `1` | Math captcha minimum |
| **&maxCaptcha** | `10` | Math captcha maximum |
| **&allowFiles** | `0` | File uploads on comments |
| **&source** | `0` | Media source ID; else `tickets_source_default` |
| **&gravatarIcon** | `mm` | Gravatar fallback |
| **&gravatarSize** | `24` | Avatar size |
| **&gravatarUrl** | `https://www.gravatar.com/avatar/` | Gravatar URL |
| **&tplComments** | `tpl.Tickets.comment.wrapper` | Thread wrapper; `[[+total]]` from `TicketThread` |
| **&tplCommentForm** | `tpl.Tickets.comment.form` | Form for logged-in users |
| **&tplCommentFormGuest** | `tpl.Tickets.comment.form.guest` | Guest form |
| **&tplCommentAuth** | `tpl.Tickets.comment.one.auth` | Single comment (logged in) |
| **&tplCommentGuest** | `tpl.Tickets.comment.one.guest` | Single comment (guest) |
| **&tplCommentDeleted** | `tpl.Tickets.comment.one.deleted` | Deleted comment |
| **&tplLoginToComment** | `tpl.Tickets.comment.login` | Login required chunk |
| **&tplCommentEmailOwner** | `tpl.Tickets.comment.email.owner` | Email to ticket author |
| **&tplCommentEmailReply** | `tpl.Tickets.comment.email.reply` | Email on reply |
| **&tplCommentEmailSubscription** | `tpl.Tickets.comment.email.subscription` | Email to thread subscriber |
| **&tplCommentEmailBcc** | `tpl.Tickets.comment.email.bcc` | BCC to admins |
| **&tplCommentEmailUnpublished** | `tpl.Tickets.comment.email.unpublished` | Unpublished comment notice |
| **&tplFiles** | `tpl.Tickets.comment.form.files` | File uploader block |
| **&tplFile** | `tpl.Tickets.form.file` | File row |
| **&tplImage** | `tpl.Tickets.form.image` | Image row |
| **&validate** | | FormIt rules; see [TicketFormit](/en/components/tickets/ticketformit) |

List snippets link comment counts to `#first_unread` or `#comments` since 1.14.0.

## Examples

### Default

::: code-group

```fenom
{'!TicketComments' | snippet}
```

```modx
[[!TicketComments]]
```

:::

### Guests with moderation

::: code-group

```fenom
{'!TicketComments' | snippet : [
  'allowGuest' => 1,
  'autoPublishGuest' => 0,
]}
```

```modx
[[!TicketComments? &allowGuest=`1` &autoPublishGuest=`0`]]
```

:::

### Flat list

::: code-group

```fenom
{'!TicketComments' | snippet : [
  'tree' => 0,
  'limit' => 20,
  'offset' => 0,
]}
```

```modx
[[!TicketComments? &tree=`0` &limit=`20` &offset=`0`]]
```

:::

### Second thread on the page

::: code-group

```fenom
{'!TicketComments' | snippet : [
  'thread' => 'sidebar-' ~ $_modx->resource.id,
]}
```

```modx
[[!TicketComments? &thread=`sidebar-[[*id]]`]]
```

:::
