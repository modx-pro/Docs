# Stats

The table lists all campaigns: subject, status, send plan, how many letters went out and wait in the queue, how many people opened and clicked, unsubscribes and blacklist.

## Campaign control

The row menu:

| Action | Available when |
|---|---|
| Edit | scheduled or paused |
| Pause | scheduled or sending |
| Resume | paused |
| Cancel mailing | before it is done. A cancel cannot be undone |

More on editing: [Campaign](campaign#editing-a-campaign).

## Campaign details

A click on a row opens the details below the table:

- **Clicked links**: link URL, clicks, unique clicks. Links without clicks are hidden.
- **Who clicked what**: recipient, link, clicks, last click.
- **Unsubscribe reasons**: texts from a form with a `reason` field.
- **Blacklist, unsubscribes, bounces**: addresses of this campaign that went to the blacklist or were skipped.

## What counts as an open

A tracking pixel in the letter records an open. PostCraft does not count:

- requests from bots and link scanners;
- mail provider proxies that load images in advance;
- opens in the first seconds after sending, which come from antivirus scans and prefetch.

So PostCraft shows fewer opens than tools without a filter, and those opens are people.

PostCraft counts clicks through a redirect. Turn on Track link clicks when you queue the campaign.

## Excel export

Export to Excel in the details exports one campaign, Export all stats to Excel above the table exports everything. PostCraft builds the XLSX file without third-party libraries, it needs only the PHP `zip` module.

A single campaign file has sheets for the summary, recipients with status, first open and first click, clicked links, who clicked what, unsubscribe reasons and blacklist. The full export has sheets for campaigns, unsubscribe reasons, clicks and blacklist.
