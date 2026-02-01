# HTML content parser + Combined tasks

Read [RSS feed task setup](/en/components/xparser/parser-rss) first. Core component logic.

## Task combining

Since 1.2.0 component can combine tasks. Example: parse RSS feed and fully parse each entry. For this:

1. Create two tasks (first RSS, second HTML),
2. Configure,
3. Run.

Below: how to combine tasks.

## HTML parsing

RSS feed has a default field array for MODX fields. In HTML we need to define fields and selectors for each. Example with **MODX.pro**:

## Adding tasks

Example: run one task from another. Create 2 tasks:

### Primary task

Primary = list of news items to parse.

Click "Add HTML task". On "General" tab fill:

![Primary task](https://file.modx.pro/files/c/d/b/cdb54b4b49d9bdd467620fce36b1197a.png)

Switch to "Configuration" tab:

- Record selector (CSS-like syntax for now),
- Start from Nth record,
- How many records to parse,
- Template for resources,
- Context,
- Parent container in context,
- Download media.

![Configuration](https://file.modx.pro/files/d/d/6/dd6ef85bd35de1981a93c157af687fbb.png)

Save - task added.

### Secondary task

Secondary = task for full article parsing. Set as child of first task.

Click "Add HTML task". On "General" tab:

![Secondary task](https://file.modx.pro/files/e/9/1/e91f7ffe1b781107e7c1dbf89628c44a.png)

Important:

- **URL** - link to a modx.pro article (for source field setup),
- Check **Is subtask**.

Configuration tab:

- **Record selector** = `#content`

## Source setup

HTML tasks require manual source data. Do for both tasks.

Right-click task => "Source".

### Primary source

Add 1 field - link to full article. Also add `content` with *article intro*; intro contains main image, extract with regex at *Primary task field setup*.

Click "Add". Use CSS-like or XPath syntax.

::: warning
XPath bug: does not understand tag names; use `*` for tag.
:::

Fill:

![Source 1](https://file.modx.pro/files/d/c/3/dc38d54e4946571622461392e2d2368f.png)

![Source 2](https://file.modx.pro/files/3/3/7/337516ec293102820a6daac7db844b45.png)

Click eye icon to verify parser values:

![Source 3](https://file.modx.pro/files/8/7/4/8741e8d3cfae46ed929bb7587642913f.png)

### Secondary source

Add 2 fields:

#### Pagetitle

- **Syntax** = `CSS`
- **Key** = `pagetitle`
- **Selector** = `h3.page-title`

#### Content

- **Syntax** = `CSS`
- **Key** = `content`
- **Selector** = `.page-content`

### Task field setup

Similar to [RSS task setup](/en/components/xparser/parser-rss). Source data available via "Raw values array" button. Right-click task => "Fields". Add parsing fields by source keys/values.

### Primary task fields

One field `link` is enough; add main post image field. Extract from intro via Fenom and regex.

Click "Add".

#### Link

- **System field** = *empty*
- **Source field** = `link`
- **Default** = *empty*

#### Introtext (image)

- **System field** = `resource | introtext`
- **Source field** = `@INLINE {$content | preg_get : '!https?://.+\.(?:jpe?g|png|gif)!Ui'}`
- **Default** = *empty*

In task fields table, click star on `link` (field turns orange) and adjacent button. Add linked task:

> 1. Ensure selected field is a link.
> 2. On parse this link is passed to chosen task.
> 3. Chosen task provides all object fields.
> 4. These fields override current task fields.

In "Receiving task" select secondary task. Primary passes URL from `link` to secondary.

Save. `link` turns blue:

![Link field](https://file.modx.pro/files/6/d/2/6d2b9a9c9d3b06f2dec962c7c480ddc1.png)

### Secondary task fields

Add 3 fields:

#### Pagetitle

- **System field** = `resource | pagetitle`
- **Source field** = `@INLINE {$pagetitle | preg_replace : '! \<sup class.*!ui'}`
- **Default** = *empty*

#### Content

- **System field** = `resource | content`
- **Source field** = `content`
- **Default** = *empty*

#### Published

- **System field** = `resource | published`
- **Source field** = *empty*
- **Default** = `1`

Save!
