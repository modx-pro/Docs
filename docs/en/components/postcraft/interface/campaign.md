# Campaign

The tab builds a new campaign from three blocks: letter, recipients, time.

## Letter

On the left: subject, preview text, unsubscribe language, From and Reply-To. On the right: the template picker and a phone/desktop preview of that template’s HTML, same as on Templates. Changing the template refreshes the preview at once.

| Field | Meaning |
|---|---|
| Email template | a `PostCraft.*` chunk. Its text is copied into the campaign when it is queued |
| Subject | required |
| Preview text | the line next to the subject in the inbox. Hidden in the letter itself. 40–100 characters work best |
| Unsubscribe page language | language of the page behind `{{ unsubscribe }}`. The list depends on the site of the From mailbox |
| From | sender mailbox |
| Reply-To | address for replies. Empty means replies go to the From address |

## Recipients

- Addresses: one per line or comma separated.
- Saved list: picking a list fills Addresses at once. There is no separate Insert button. If the field is empty, the server still accepts the selected `list_id`.
- Add unique emails from saved forms (FormIt): addresses from FormIt submissions.
- Add emails of active MODX users: active (and not blocked) users with a profile email.
- Add emails of miniShop2 / MiniShop3 customers: unique emails from orders (address email and the linked user profile email). If the shop is not installed, the count is 0.
- Refresh source counts recalculates the selected sources and shows a preview.

PostCraft removes duplicates across all sources and skips blacklisted addresses. One run queues up to 10,000 addresses.

The Do not resend to addresses that already got this letter checkbox looks at the same template within the chosen number of days (How many days, default 30) or if the address is still queued for it. Skipped emails are listed in the response; the rest are queued. It fails only if everyone already got the template. Another template is not blocked by this checkbox. PostCraft checks this when queueing and again before each letter goes out. Test letters do not count.

The Fixed mailing checkbox puts addresses on a temporary blacklist for the chosen number of days after a successful send (default 7). During that window no mailing with any template goes to them. The Until column on the Blacklist tab shows the end date; expired rows drop off automatically. Unsubscribes and manual blacklist rows stay permanent.

## Time

Letters go out on the chosen day between From and To in the [site time zone](../settings). An address with no open history of its own is spread evenly across the window. An address with opens or clicks over the last 90 days gets its usual hour inside the range. If that hour falls outside the window, the address joins the even spread.

Rate limits on the From mailbox (hour / day / batch and warm-up) always apply. When the list exceeds the daily cap, the queue continues on the following days in the same hour window. An estimate appears under the time fields. Set limits on the mailbox (gear icon) or in [system settings](../settings).

“Start sending now” begins from this moment under the same caps: letters past the quota leave later, not all at once.

## Buttons

- Test to me sends one letter to the email of your MODX profile. It stays out of the stats.
- Schedule queues the letters and shows the campaign number.

## Campaign status

| Status | What happens |
|---|---|
| Scheduled | waits for its window |
| Sending | cron sends letters |
| Paused | no letters until Resume. Auto-pause (SMTP limit, failure streak, bounce rate) shows the reason on the campaign card |
| Cancelled | unsent letters will not go out |
| Done | the queue is empty |

Pause, Resume, Cancel mailing and Edit live in the Stats tab table. After a pause, letters whose time has passed move to the nearest window.

## Editing a campaign {#editing-a-campaign}

You can edit a scheduled or paused campaign. If sending is in progress, click Pause first.

The edit window changes the subject, preheader, date, hours and the address list in the queue. Delete a line and that address gets no letter. New addresses join the campaign. The Reload letter body from template checkbox takes fresh HTML if the template changed after queueing.

Edits apply to unsent letters only.
