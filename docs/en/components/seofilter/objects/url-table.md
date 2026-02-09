# URL table

Contains all generated links when rules are saved. New words auto-generate links and they appear here.

Links cannot be created manually; they are tied to rules, pages, and words. This lets you find links by params or params by link, count results, and update URLs when field or word synonyms change.

The table shows many columns. Buttons: **Recalculate results** - recomputes results for all links; **Reset counters** - resets page view counters. Views include both regular and Ajax replacements.

Per-link actions: **Show in menu** (for sfMenu with showHidden=0), **Go to page**, **Disable** - returns 404 even with results. From the manager, disabled links go to the category page with GET params.

You can **Edit** link settings:

- **Link name** - "virtual" page name in menu.
- **Custom URL** - set a custom address. If redirect to priority URL is enabled in component settings, old URL redirects to the new one.
- **Use custom meta tags** - shows rule SEO fields that can be overridden. Variables and counts remain available.
- **Show in menu** - adds 4 fields: **Menu item** (overrides name), **Link attributes**, **Menu position** (like in resources), and an extra text field for image or other content.
- You can edit view count, result count, or disable the link.
