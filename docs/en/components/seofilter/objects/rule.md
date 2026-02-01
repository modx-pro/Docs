# Rule

The main entity that links a page, fields and values for URL generation. Simple example: a dress filter with color and size. Fields are added, values collected.

Time to create rules. For two filters you need 3 rules (people often search this way). Example name templates in parentheses:

1. Rule for dresses by color: `{$m_color | ucfirst} dresses`
2. Dresses by size: `Dresses size {$size}`
3. Dresses by color and size: `{$m_color | ucfirst} dresses size {$size}`

This gives maximum flexibility and easier text variation. Add the corresponding fields to each rule and link to the Dresses page. When adding a field you can set conditions for which pages to create. E.g. special text for green, red, blue dresses: when adding the field, choose "Contains" and list *queries* comma-separated. In another color rule, exclude these colors to avoid duplicates.

Rule parameters:

- **URL name template (SEO syntax)** - links are built from this template, shown in URL table and in [sfMenu][5] by default.

- **Regenerate link names** - appears when editing if you changed the template and want to regenerate existing links.

- **Recalculate results per link** - recalculates all links according to count conditions and shows a summary after save.

- **Fields table** with Add button - all fields in the rule with their synonyms. Below: the mask used for all rule links (read-only). You can customize individual links or change word synonyms in the dictionary.

- **Extra condition for resource count (JSON)** (shown when counts enabled) - to limit what is counted. For only published and not deleted: `{"published":1,"deleted":0}`. Supports msProductData classes (full class or Data/Option/TV/Vendor alias) with dotted key, e.g. `{"Data.price:>":500}`. Tables are joined for correct counts. Errors are logged.

- **Parents (for count)** - when the rule page is not the parent of displayed resources (e.g. products on sibling pages). Specify comma-separated parent ids.

- **Page** - page the rule is linked to.

- **Priority** (0 = highest) - order when resolving conflicts. E.g. color and size with no combined rule: both basic filters active → more prioritized rule titles/texts apply.

- **Base rule** - for common params like colors, sizes, categories. Set priorities wisely.

- **SEO tab** - SEO templates generated on each link open. Link template syntax is the same but generated once on save. 8 fields: Page title, H1, H2, Description, Intro, Keywords, Text field, Content. ACE editor loads for Content. All fields have tooltips.

Rules can be duplicated with or without fields, linked to the same or another page.

[5]: /en/components/seofilter/snippets/sfmenu
