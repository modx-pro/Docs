# easyComm snippets

## ecForm

Snippet that outputs the form for adding a new message.

It can be called cached, because it only outputs the form HTML and creates the thread.
On first call it creates a new message thread (ecThread) for the current resource.
On every call it saves all snippet parameters to the ecThread.properties field as JSON.

### ecForm parameters

| Parameter                | Default                                                  | Description                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **thread**              | `resource-[[*id]]`                                            | Message thread name. Must be unique.                                                                                                                                                                                      |
| **formId**              | same as thread                                                  | Used on the frontend to identify the form when there are multiple forms on the page.                                                                                                                                     |
| **allowedFields**       | `user_name, user_email, user_contacts, subject, rating, text` | Comma-separated list of fields allowed in the form.                                                                                                                                                                                    |
| **requiredFields**      | `user_name, text`                                             | Comma-separated list of required fields.                                                                                                                                                                                                          |
| **antispamField**       | `address`                                                     | Field used as antispam. Must be hidden with CSS so users do not fill it; bots will.                                                                 |
| **autoPublish**         | `0`                                                           | Auto-publish. Empty = off, "OnlyLogged" = publish if user is logged in, "All" = publish for all. |
| **agreementCheckbox**   | `1`                                                           | Show "I consent to processing of my personal data" checkbox.                                                                                                                                                          |
| **tplForm**             | `tpl.ecForm`                                                  | Form chunk                                                                                                                                                                                                                       |
| **tplFormReCaptcha**    | `tpl.ecForm.ReCaptcha`                                        | ReCaptcha chunk                                                                                                                                                                                                                    |
| **tplSuccess**          | `tpl.ecForm.Success`                                          | Chunk shown after successful submit. All fields of the created ecMessage are available.                                                                                                                |
| **starsTheme**          | `default`                                                     | Star rating theme: `default`, `stars2`, `stars3`, `hearts`. You can add your own in ec.css.                                                                                    |
| **mailManager**         |                                                               | Admin email for notifications; overrides ec_mail_manager. Use for different addresses per ecForm call.                                         |
| **newEmailSubjUser**    |                                                               | Subject of "message received" email to user; overrides ec_mail_new_subject_user                                                                                      |
| **tplNewEmailUser**     | `tpl.ecForm.New.Email.User`                                   | Chunk for that email. If empty, email is not sent.                                                                                                         |
| **newEmailSubjManager** |                                                               | Subject of new-message email to manager; overrides ec_mail_new_subject_manager                                                                                           |
| **tplNewEmailManager**  | `tpl.ecForm.New.Email.Manager`                                | Chunk for that email. If empty, email is not sent.                                                                                                                 |
| **updateEmailSubjUser** |                                                               | Subject of "message published/replied" email to user; overrides ec_mail_update_subject_user                                                                                                         |
| **tplUpdateEmailUser**  | `tpl.ecForm.Update.Email.User`                                | Chunk for that email. If empty, email is not sent.                                                                                                               |

### File attachments

From 1.11.0-pl users can attach files to messages.

This is an extra feature, not a full file storage. Example: photos in product reviews.

ecForm parameters for files:

| Parameter       | Default            | Description                                                                                       |
| -------------- | ----------------------- | ---------------------------------------------------------------------------------------------- |
| **files**      | `0`                     | Enable file upload.                                                          |
| **fileTypes**  | `jpg,jpeg,png,gif,webp` | Allowed file types.                                                                       |
| **fileSize**   | `0`                     | Max size per file in bytes. Default 0 = no limit (not recommended). |
| **filesCount** | `0`                     | Max number of files. Default 0 = no limit (not recommended).          |

### Dependencies

::: warning
Before 1.11.4-pl the form required jQuery and jquery.form on the page. Otherwise you see "Can't find jQuery ajaxForm plugin!".
:::

## ecMessages

Snippet that outputs messages from a thread. Must be called uncached, because site cache is not cleared when messages are published in the manager.

### ecMessages parameters

| Parameter                   | Default         | Description                                                                                                                                                                                                                                                                                           |
| -------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **thread**                 | `resource-[[*id]]`   | Thread name.                                                                                                                                                                                                                                                                             |
| **threads**                |                      | Comma-separated list of threads to output from (e.g. "resource-1,resource-2"). Use * for all. Overrides thread.                                                                                   |
| **votingEnable**           | `0`                  | Enable message voting. Default off.                                                                                                                                                                                                                                         |
| **votingAllowGuest**       | `0`                  | Allow guests to vote. Default: only logged-in users.                                                                                                                                                                                                     |
| **votingConsiderIP**       | `0`                  | For guests, check by IP. Default uses PHP session. Enable if you see vote manipulation. One vote per message per IP.                                         |
| **messages**               |                      | Specific message IDs to output.                                                                                                                                                                                                                                                                |
| **subject**                |                      | Filter by subject.                                                                                                                                                                                                                                                     |
| **tpl**                    | `tpl.ecMessages.Row` | Chunk for one message. Message fields and thread fields (prefix thread_) are available. Use resourceFields to add resource fields.                                                                                      |
| **tplWrapper**             |                      | Wrapper chunk. Use placeholder `[[+output]]`. For a single thread, all thread fields and formatted ratings `[[+rating_wilson_percent]]`, `[[+rating_simple_percent]]` are available. |
| **tplEmpty**               |                      | Chunk when there are no messages.                                                                                                                                                                                                                                                        |
| **starsTheme**             | `default`            | Star theme: default, stars2, stars3, hearts.                                                                                                                                                   |
| **sortby**                 | `date`               | Sort field                                                                                                                                                                                                                                                                                |
| **sortdir**                | `DESC`               | Sort direction                                                                                                                                                                                                                                                                             |
| **limit**                  | `10`                 | Max number of messages                                                                                                                                                                                                                                                              |
| **showUnpublished**        | `0`                  | Include unpublished messages                                                                                                                                                                                                                                                              |
| **showDeleted**            | `0`                  | Include deleted messages                                                                                                                                                                                                                                                                     |
| **resourceFields**         |                      | Add resource fields (prefix resource_), e.g. id,pagetitle,longtitle,introtext. id and pagetitle are added by default.                                                                     |
| **outputSeparator**        | `\n`                 | Separator between message outputs                                                                                                                                                                                                                                                                           |
| **toPlaceholder**          |                      | Save result to a placeholder instead of outputting                                                                                                                                                                                                                                                           |
| **toSeparatePlaceholders** |                      | Set a placeholder per message                                                                                                                                                                                                                                                           |
| **showLog**                | `0`                  | Show log                                                                                                                                                                                                                                                                                     |

## ecMessagesCount

Outputs the count of messages in a thread (or threads). Must be called uncached.

### ecMessagesCount parameters

| Parameter            | Default       | Description                                                                                                                                                                                                         |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **thread**          | `resource-[[*id]]` | Thread name.                                                                                                                                                                                           |
| **threads**         |                    | Comma-separated list of threads. * for all. Overrides thread. |
| **subject**         |                    | Filter by subject.                                                                                                                                                                   |
| **showUnpublished** | `0`                | Include unpublished                                                                                                                                                                            |
| **showDeleted**     | `0`                | Include deleted                                                                                                                                                                                   |

## ecThreadRating

Outputs the rating of a thread. Must be called uncached.
From 1.5.1-pl the default chunk includes schema.org AggregateRating microdata.

### Parameters

| Parameter            | Default         | Description                                                                                                                                                                     |
| ------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **thread**          | `resource-[[*id]]`   | Thread name.                                                                                                                                                       |
| **tpl**             | `tpl.ecThreadRating` | Chunk for rating. Placeholders: rating_simple, rating_simple_percent, rating_wilson, rating_wilson_percent, and all ecThread fields.               |
| **algorithm**       | `wilson`             | Algorithm: wilson or simple.                                                                                                     |
| **starsTheme**      | `default`            | Star theme: default, stars2, stars3, hearts.                                                                                             |
| **starWidthAndGup** | `16,4`               | Width and gap for filled stars. For default theme 16,4; for others 20,4. |
| **toPlaceholder**   |                      | If set, result is put in a placeholder with this name.                                                                                         |

### Detailed rating

From easyComm 1.7.0 ecThreadRating can show detailed vote info.

![Detailed rating display](https://file.modx.pro/files/b/1/c/b1c7b929bacf5c7e060a3f1095c55cdf.png)

Use chunk **tpl.ecThreadDetailedRating** in parameter **tpl**.
