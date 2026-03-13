# Rule

The main entity of the component: it links a page, fields and values to build links. For a simple example, take a filter on a dresses page with color and size. You have already added the fields on the first tab and the values are collected.

Now it is time to create rules. For two filters you need 3 rules (because users often search that way). Example link name templates in parentheses:

1. Rule for dresses by color: `{$m_color | ucfirst} dresses`
2. Dresses by size: `Dresses size {$size}`
3. Dresses by color and size: `{$m_color | ucfirst} dresses size {$size}`

This gives maximum flexibility and makes it easier to vary texts. Add the corresponding fields to each rule and attach them to the Dresses page. When adding a field to a rule you can set conditions that limit which pages are created. For example, you want a special text template for green, red and blue dresses: when adding the field to the rule, choose the "Contains" comparison and list the *queries* comma-separated below. In another dress-by-color rule you might exclude these colors so there are no duplicates.

Some rule parameters:

- **Link name template (same syntax as SEO)** — as already mentioned, link names are built from this template; they appear in the URL table and by default in the menu built with [sfMenu][5].

- **Regenerate link names** — this checkbox appears when editing a rule; use it if you changed the template and want to regenerate existing links.

- **Recalculate results per link** — recalculates results for all links according to the count conditions and shows a summary in a popup after save.

- **Table of fields** with Add button — all fields added to the rule with the field synonym. Just below the block the mask is shown; all links in the rule are built from it. The mask cannot be edited; you can only set final links as you need, or change word synonyms in the dictionary so that all links related to a word have the correct address.

- **Extra condition for resource count (JSON)** (shown when counts are enabled) — so you do not count absolutely all resources. To count only published and not deleted use `{"published":1,"deleted":0}`. This field can also use standard classes like msProductData (full class or alias Data, Option, TV, Vendor) with a dotted key, e.g. `{"Data.price:>":500}`. Even if the rule has no field from that table, it will be joined and counts will be correct. Errors are written to the log.

- **Parents (for count)** — needed when the page the rule is attached to is not the parent of the displayed resources (products are on sibling or other pages). Specify one or more parent ids comma-separated.

- **Page** — the page the rule is attached to. A PRO mode with multiple page ids may be added later; if you need it, contact support.

- **Priority** (0 = highest, 1 = lower, etc.) — order used to choose the rule when there is a conflict. For example you have color and size again but no combined rule; when both filters have a value (and both are base), the titles and texts of the higher-priority rule are used.

- **Base rule** — described above. Recommended for params that are really common (colors, sizes, categories); set priorities carefully.

- **SEO tab** — SEO templates that are generated each time a link is opened. The link template in the other tab uses the same syntax but is generated once on save. There are 8 fields: Page title, H1, H2, Description, Intro text, Keywords, Text field, Content. If you use the ACE code editor it is loaded for Content. All fields have tooltips so you know which placeholder to use on the page.

Rules can also be duplicated, with or without their fields, and attached to the same page or another.

[5]: /en/components/seofilter/snippets/sfmenu
