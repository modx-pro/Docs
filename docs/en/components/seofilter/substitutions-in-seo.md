# Substitutions in SEO texts

Use field alias as placeholder. For color (alias color) use `{$color}` → green or red. Single-field rules: use alias or `{$value}`. With [declensions, counts, selections](/en/components/seofilter/additional-features) more placeholders available. MODX syntax: `[[+value]]`, `[[+color]]`.

## Placeholder reference

| Placeholder | Description | Example |
| --- | --- | --- |
| `{$value}`,`{$[alias]}` | Field value | `{$color}` → **Red** |
| `{$input}`, `{$[alias]_input}` | Query value; `{$input}` for single-field | `{$metro_input}` → **6** |
| `{$alias}`, `{$[alias]_alias}` | Word alias | `{$color_alias}` → **krasnyij** |
| `{$total}`, `{$count}` | Result count (if enabled) | `{$count \| decl : 'item\items' : true}` |
| `{$page}`,`{$page_number}` | Current page; set **seofilter_page_key** | 1 |
| `{$id}`,`{$page_id}` | Rule resource ID | `{$id \| resource : 'pagetitle'}` |
| `{$rule_id}` | Rule ID | 19 |
| `{$seo_id}` | URL table entry ID | 123 |
| `{$url}` | SEO page URL | pleeryi/cvet-sinij |
| `{$link}` | Link name | Blue players |
| `{$createdon}` | Link creation date | 2018-03-15 10:31:39 |
| `{$editedon}` | Link edit date | |

::: tip
Replace `[alias]` with your field alias.
:::

With declensions (Russian cases):

| Case | Singular | Plural | Example |
| --- | --- | --- | --- |
| **Nominative** | `{$value_i}`, `{$value}` | `{$m_value_i}`,`{$m_value}` | red / reds |
| **Genitive** | `{$value_r}` | `{$m_value_r}` | of red |
| **Dative** | `{$value_d}` | `{$m_value_d}` | to red |
| **Accusative** | `{$value_v}` | `{$m_value_v}` | red |
| **Instrumental** | `{$value_t}` | `{$m_value_t}` | with red |
| **Prepositional** | `{$value_p}` | `{$m_value_p}` | about red |
| **Prep. with prep** | `{$value_o}` | `{$m_value_o}` | about red |
| Where? | `{$value_in}` | - | in red |
| Where to? | `{$value_to}` | - | to red |
| Where from? | `{$value_from}` | - | from red |

With min/max selections:

| Tag | Description | Example |
| --- | --- | --- |
| **count** | Result count | 137 |
| **min_price_id** | Cheapest item ID | 55 |
| **min_price_price** | Cheapest price | 4000 |
| **min_price_pagetitle** | Cheapest item title | Nokia 3310 |
| **max_price_id** | Most expensive ID | 88 |
| **max_price_price** | Most expensive price | 80000 |
| **max_price_pagetitle** | Most expensive title | Samsung Galaxy S8+ |

## Fenom modifiers

| Modifier | Description | Example | Before | After |
| --- | --- | --- | --- | --- |
| **lower (low)** | Lowercase | `{$color \| lower}` | Red | red |
| **upper (up)** | Uppercase | `{$color \| upper}` | Red | RED |
| **ucfirst** | First letter upper | `{$color \| ucfirst}` | red | Red |
| **declension (decl)** | Number + word form | `{$count \| declension:'item\|items':true}` | 5 | 5 items |
| **number (number_format)** | Format number | `{$max_price_price \| number : 0 : '.' : ' '}` | 4000 | 4 000 |
| **replace** | Replace string | `{$raion \| replace : "district" : ""}` | Pushkin district | Pushkin |
| **option** | MODX system setting | `{'site_name' \| option}` | | MODX Revolution |

Chain modifiers with `|`: `{'site_name' | option | upper}`. Full list in [Fenom](/en/components/pdotools/parser#fenom-templating-engine) docs.
