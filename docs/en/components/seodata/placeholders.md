# Placeholders

Templates are rendered by Fenom from pdoTools. A variable is written in curly braces: `{$pagetitle}`.

Case modifiers: `{$pagetitle|lc}` is lowercase, `{$pagetitle|uc}` is capitalized.

```fenom
Купить {$pagetitle.acc|lc} в «{$site_name}» от {$price.min} ₽
{if $page?} {$page}{/if}
{7 | resource : 'menutitle'}
{$param_event | resource : 'pagetitle'}
{'seoSuffix' | chunk}
{'!pdoField' | snippet}
```

Fenom can call snippets, chunks, and fields of another resource. If a placeholder stores a resource id, write `{$param_event | resource : 'pagetitle'}`, not only the literal `{39 | resource : 'pagetitle'}`.

```fenom
{$_modx->getChunk('seoSuffix')}
{$_modx->runSnippet('pdoField', ['id' => 7, 'field' => 'menutitle'])}
```

::: warning
Snippets and chunks run site code. A Fenom error is written to the log, and that field stays empty.
:::

## Page

| Placeholder | Value |
| --- | --- |
| `{$pagetitle}` | Resource title |
| `{$longtitle}` | Long title |
| `{$description}` | Description |
| `{$introtext}` | Intro text |
| `{$menutitle}` | Menu title |
| `{$alias}` | Alias |
| `{$content}` | Content |
| `{$parent.pagetitle}` | Parent title |
| `{$site_name}` | Site name |
| `{$site_url}` | Site URL |
| `{$page}` | Page-number fragment when the URL has `?page=N` |

## MiniShop3 product

| Placeholder | Value |
| --- | --- |
| `{$price}` | Price |
| `{$old_price}` | Old price |
| `{$article}` | Article, if the field is connected |
| `{$vendor.name}` | Vendor |
| `{$image}` | Image. The snippet also returns it as `image` |

## MiniShop3 category

After indexing on the “Maintenance” tab:

| Placeholder | Value |
| --- | --- |
| `{$price.min}` | Minimum product price |
| `{$price.max}` | Maximum price |
| `{$price.avg}` | Average price |
| `{$count}` | Product count |

## Options

Several values of one option:

| Notation | Result |
| --- | --- |
| `{$color}` | First value |
| `{$color.joined}` | All values joined with a comma |
| `{$color.list}` | Array |
| `{$color.gen}` | First value in the genitive case, if the word is in the dictionary |

Custom fields from the “Custom fields” tab are available as `{$name}`.
