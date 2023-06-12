---
outline: [2,3]
lastUpdated: false
---
# VitePress features

::: info
VitePress uses [markdown-it](https://github.com/markdown-it/markdown-it) as a parser that extends markdown.
We can add substantially more convenience and beauty.
:::

See <https://vitepress.dev/guide/markdown> for a complete list of all features.

Let's take a closer look at each of them.

## Anchor links for headers

Headings automatically become anchor links like `guide/vitepress#zagolovkissylki`.
Title text is automatically transliterated and truncated to 25 characters (words are not truncated).

### Custom anchor {#my-anchor}

But you can assign a custom anchor to any of the headings using the `{#my-anchor}` construct.

```markdown
## Regular header
### Custom anchor {#my-anchor}
```

## Tables

Create tables in GitHub style.

**Example:**

```markdown
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**Output:**

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## Emoji

**Example:**

```markdown
:tada: :100:
```

**Output:**

:tada: :100:

[List of all available emojis here](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).

## Displaying the table of contents anywhere

Generated based on headers.

**Example:**

```
[[toc]]
```

**Output:**

[[toc]]

## Beautiful notifications

**Example:**

```markdown
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output:**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Notifications with custom titles

**Example:**

````markdown
::: info Custom title
This is an info box.
:::

::: danger Important
This is a dangerous warning.
:::

::: details Click to display code
```js
console.log('Hello, VitePress!');
```
:::
````

**Output:**

::: info Custom title
This is an info box.
:::

::: danger Important
This is a dangerous warning.
:::

::: details Click to display code

```js
console.log('Hello, VitePress!');
```

:::

## Syntax highlighting in code blocks

VitePress uses [Shiki](https://shiki.matsu.io/) for code syntax highlighting in markdown blocks using colored text.
Shiki supports a wide range of programming languages. You only need to specify the programming language immediately after the opening quotes of the code block.

**Example:**

````markdown
```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```
````

**Output:**

```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```

---

**Example:**

````markdown
```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

See the list of supported programming languages [at the link](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages).

## Line highlighting inside code

To grab the user's attention, you can highlight the lines you want.

**Example:**

````markdown
```fenom{2}
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom{2}
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

In addition to single-line highlights, there are also multi-line highlights:

- Range `{5-8}`, `{3-10}`, `{10-17}`
- Enumeration `{4,7,9}`
- Mixed `{4,7-13,16,23-27,40}`

**Example:**

````markdown
```fenom{1,3}
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom{1,3}
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

## Focus

You can add a comment `// [!code focus]` on the desired line of code, and all code will be blurred except for that line.
Also, you can specify line numbers `// [!code focus:<lines>]`.

::: warning
Only **one** space is required after `code`. In the examples below, an extra space has been added for correct output.
:::

**Example:**

````markdown
```fenom
{'!msProducts' | snippet : [
  'parents' => 0, // [!code  focus]
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom
{'!msProducts' | snippet : [
  'parents' => 0, // [!code focus]
  'includeThumbs' => '120x90,360x270',
]}
```

## Highlighting differences in code

You can add `// [!code --]` or `// [!code ++]` comments on the lines and get nice highlighting differences in code.

**Example:**

````markdown
```fenom
{'!msProducts' | snippet : [
  'parents' => 0, // [!code  --]
  'parents' => 5, // [!code  ++]
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom
{'!msProducts' | snippet : [
  'parents' => 0, // [!code --]
  'parents' => 5, // [!code ++]
  'includeThumbs' => '120x90,360x270',
]}
```

## Errors and warnings in code blocks

You can add `// [!code warning]` or `// [!code error]` comments on the lines and color the lines with the appropriate color.

**Example:**

````markdown
```fenom
{'!msProducts'|snippet:[
  'parents' => 0, // [!code  error]
  'parents' => 5, // [!code  warning]
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom
{'!msProducts'|snippet:[
  'parents' => 0, // [!code error]
  'parents' => 5, // [!code warning]
  'includeThumbs' => '120x90,360x270',
]}
```

## Code line numbering

To enable code line numbering you need to add: `:line-numbers`.

**Example:**

````markdown
```ts {1}
// Line numbering is off by default
const line2 = 'Second line of code'
const line3 = 'Third line of code'
```

```ts:line-numbers {1}
// Line numbering is now enabled
const line2 = 'Second line of code'
const line3 = 'Third line of code'
```
````

**Output:**

```ts {1}
// Line numbering is off by default
const line2 = 'Second line of code'
const line3 = 'Third line of code'
```

```ts:line-numbers {1}
// Line numbering is now enabled
const line2 = 'Second line of code'
const line3 = 'Third line of code'
```

## Grouping code blocks

You can group blocks of code like this:

**Example:**

````markdown
::: code-group

```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```

```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

:::
````

**Output:**

::: code-group

```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```

```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

:::

It is also possible to specify an custom title for each group tab, for example, to clarify the names of files or chunks.

**Example:**

````markdown
::: code-group

```modx [In template]
[[!pdoMenu?
  &parents=`0`
  &tplOuter=`MyMenuOuterChunk`
  &tpl=`MyMenuItemChunk`
]]
```

```modx [MyMenuOuterChunk]
<ul [[+classes]]>
  [[+wrapper]]
</ul>
```

```modx [MyMenuItemChunk]
<li [[+classes]]>
  <a href="[[+link]]" [[+attributes]]>
    [[+menutitle]]
  </a>
  [[+wrapper]]
</li>
```

:::
````

**Output:**

::: code-group

```modx [In template]
[[!pdoMenu?
  &parents=`0`
  &tplOuter=`MyMenuOuterChunk`
  &tpl=`MyMenuItemChunk`
]]
```

```modx [MyMenuOuterChunk]
<ul [[+classes]]>
  [[+wrapper]]
</ul>
```

```modx [MyMenuItemChunk]
<li [[+classes]]>
  <a href="[[+link]]" [[+attributes]]>
    [[+menutitle]]
  </a>
  [[+wrapper]]
</li>
```

:::

## Keyboard buttons displaying `<kbd>`

To display keyboard buttons, such as keyboard shortcuts, wrap them in double square brackets.

**Example:**

```markdown
To save a resource, press the keyboard shortcut [[Ctrl]] / [[⌘ Cmd]] + [[s]]
```

**Output:**

To save a resource, press the keyboard shortcut [[Ctrl]] / [[⌘ Cmd]] + [[s]]

::: warning Keep in mind
The `[[toc]]` string is reserved by the **toc** (table of contents) plugin and it will display the table of contents (see above).
:::
