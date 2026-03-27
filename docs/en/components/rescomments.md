---
title: resComments
description: Nested comments with pagination for MODX 3
logo: https://file.modx.pro/files/a/9/4/a9499643bf99f8080a37405836d0a504.png
author: Romanov Pavel
modstore: https://modstore.pro/packages/utilities/rescomments
---

# resComments

Nested comments with pagination for MODX 3 resources.

## Key features

- Unlimited nesting depth
- Multiple instances per page
- Post rating (“star” rating)
- Reply ratings and scoring
- WYSIWYG editor [Pell](https://github.com/jaredreich/pell)
- Schema.org markup
- Users can delete their own comments
- Email notifications to the site manager, post author, and comment authors about replies
- Pagination (with pdoPage)
- Works without jQuery (except when used together with pdoPage)
- Configurable toast notifications
- Manager custom component with search, filtering, and create / delete / edit (including multi-level replies)
- “Comments” tab for resources with selected templates
- “Comments” tab for resources with selected IDs

## System settings

| Parameter | Description | Default |
| :--- | :--- | :--- |
| **rc_antispam_field** | Anti-spam field (must be empty) | comment_subject |
| **rc_autopublish** | Auto-publish without moderation | 1 |
| **rc_notifications** | Script for toast notifications.<br>Supports [Notyf](https://github.com/caroso1222/notyf) and [SweetAlert2](https://modstore.pro/packages/alerts-mailing/sweetalert2) (must be installed). You can also set miniShop3, FetchIt, or AjaxForm to reuse those components’ notifications (if installed). | Notyf |
| **rc_js_url** | Path to the JS file from the site root. | `{assets_url}components/rescomments/js/web/default.min.js` |
| **rc_css_url** | Path to the CSS file from the site root. | `{assets_url}components/rescomments/css/web/default.min.css` |
| **rc_tab_tpl** | Template IDs for which to show the “Comments” tab, comma-separated.<br>Set `all` to show the tab for every template; leave empty to hide it. | |
| **rc_tab_resources** | Resource IDs for which to show the “Comments” tab, comma-separated. | |
| **rc_email_send_createdby** | Notify the resource author about new comments (by `createdby`). | No |
| **rc_email_send_manager** | Notify managers about new comments. | Yes |
| **rc_email_send_user** | Notify users about replies to their comments. | Yes |
| **rc_email_subject_createdby** | Email subject to the author about a new comment on their post | New comment on your post |
| **rc_email_subject_manager** | Email subject to managers about a new comment | New comment |
| **rc_email_subject_user** | Email subject to the user about a reply to their comment | Reply to your comment |
| **rc_email_tpl_createdby** | Chunk template for the email to the post author. | `rc_tpl_email_author` |
| **rc_email_tpl_manager** | Chunk template for the email to managers | `rc_tpl_email_manager` |
| **rc_email_tpl_user** | Chunk template for the email to the user | `rc_tpl_email_user` |

## resComments snippet

Renders comments for a resource and loads the required scripts and styles. Call it uncached:

```
[[!resComments]]
```

With Fenom:

```
{'!resComments' | snippet : []}
```

With **pdoPage**:

```
<div id="pdopage">
    <div class="rows">
        [[!pdoPage?
            &element=`resComments`
        ]]
    </div>
    [[!+page.nav]]
</div>
```

Snippet properties (override system settings).

| Property | Description | Default |
| :--- | :--- | :--- |
| **docid** | Resource ID. | Current |
| **topic** | Topic (thread). Must be unique site-wide. | comments-## (## — resource ID) |
| **allowAll** | All visitors can add comments (`0` — logged-in only). | 1 |
| **maxLevel** | Maximum nesting depth for comments. | 50 |
| **maxShiftLevel** | Maximum depth after which replies are no longer visually indented. | 10 |
| **title** | Comments block heading. | `[[%rescomments_block_title]]` |
| **addText** | Label on the “add comment” button. | `[[%rescomments_add]]` |
| **replyText** | Label on the “reply” button. | `[[%rescomments_reply]]` |
| **required** | Required form fields. | `name, email, text, agree` |
| **autopublish** | Publish comments and replies immediately after submission | 1 |
| **antispamField** | Anti-spam field. | `comment_subject` |
| **deleteTime** | Seconds during which the user can delete their own comment (if it has no reply). | 600 |
| **hideReplies** | Hide replies when the page loads.<br>Only top-level comments are shown. If there are replies, their count and an “Expand” button are shown. | 0 |
| **sortby** | Sort order as JSON. | `{"createdon":"DESC"}` |
| **limit** | Items per page. | 10 |
| **offset** | Offset from the start. | 0 |
| **Templates** | | |
| **tpl** | Chunk for a single comment. | `rc_tpl_comment` |
| **tplWrapper** | Chunk wrapping all comments. | `rc_tpl_wrapper` |
| **tplForm** | Chunk for the add-comment form. | `rc_tpl_form` |
| **tplDelete** | Chunk for the delete button. | `rc_tpl_delete` |
| **tplRepliesInfo** | Chunk for the reply count and “Expand” control. | `rc_tpl_replies_info` |
| **Notifications** | | |
| **emailTo** | Manager addresses | `[[++emailsender]]` |
| **emailFrom** | Notification sender | `[[++site_name]]` |
| **emailManager** | Notify managers about new comments. | 1 |
| **emailAuthor** | Notify post authors about new comments. | 1 |
| **emailUser** | Notify comment authors about replies to their comments. | 0 |
| **emailSubjectAuthor** | Email subject to the author about a new comment on their post. | New comment on your post |
| **emailSubjectManager** | Email subject to managers about a new comment. | New comment |
| **emailSubjectUser** | Email subject to the user about a reply to their comment. | Reply to your comment |
| **emailTplAuthor** | Chunk for the email to the post author. | `rc_tpl_email_author` |
| **emailTplManager** | Chunk for the email to managers. | `rc_tpl_email_manager` |
| **emailTplUser** | Chunk for the email to the user. | `rc_tpl_email_user` |

Chunks support standard MODX tags and Fenom.
Bundled templates are styled for Bootstrap.

## Plugin events

| Event | Description |
| --- | --- |
| **rcOnBeforeCreateComment** | Fired before a comment is created.<br>Receives `$data` — the array submitted from the form.<br>You may modify and return it with `$modx->event->returnedValues = $data;` |
| **rcOnAfterCreateComment** | Fired after a comment is created. Receives `$object` — the new comment object. |
