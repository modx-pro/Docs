---
lastUpdated: false

head:
  - - link
    - rel: canonical
      href: https://vitepress.dev/guide/markdown
---
# VitePress Features

VitePress uses [markdown-it](https://github.com/markdown-it/markdown-it) as a parser that extends markdown.
We can add substantially more convenience and beauty.

See <https://vitepress.dev/guide/markdown> for a complete list of all features.

Let's take a closer look at each of them.

## Header Anchors

Headers automatically get anchor links applied.
Title text is automatically transliterated and truncated to 25 characters (words will not be truncated).

### Custom anchors {#my-anchor}

To specify a custom anchor tag for a heading instead of using the auto-generated one, add a suffix to the heading:

```markdown
# Using custom anchors {#my-anchor}
```

This allows you to link to the heading as #my-anchor instead of the default #using-custom-anchors.

## Tables

Create GitHub-Style tables.

**Input:**

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

**Input:**

```markdown
:tada: :100:
```

**Output:**

:tada: :100:

A [list of all emojis](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json) is available.

## Table of Contents

Generated based on headers.

**Input:**

```
[[toc]]
```

**Output:**

[[toc]]

## Custom Containers

Custom containers can be defined by their types, titles, and contents.

### Default Title

**Input:**

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

### Custom Title

You may set custom title by appending the text right after the "type" of the container.

**Input:**

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

## Syntax Highlighting in Code Blocks

VitePress uses [Shiki](https://shiki.matsu.io/) to highlight language syntax in Markdown code blocks, using coloured text. Shiki supports a wide variety of programming languages. All you need to do is append a valid language alias to the beginning backticks for the code block:

**Input:**

````markdown
```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```
````

````markdown
```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

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

---

A [list of valid languages](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages) is available on Shiki's repository.

The following languages are also available:

- [MODX](https://docs.modx.com/3.x/en/building-sites/tag-syntax): `modx`
- [Fenom](https://github.com/fenom-template/fenom): `fenom`
- [Smarty](https://www.smarty.net/docsv2/en/): `smarty`

## Line Highlighting in Code Blocks

To grab the user's attention, you can highlight the lines you want.

**Input:**

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

In addition to a single line, you can also specify multiple single lines, ranges, or both:

- Line ranges: for example `{5-8}`, `{3-10}`, `{10-17}`
- Multiple single lines: for example `{4,7,9}`
- Line ranges and single lines: for example `{4,7-13,16,23-27,40}`

**Input:**

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

Alternatively, it's possible to highlight directly in the line by using the `// [!code hl]` comment.

**Input:**

````markdown
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code  hl]
    }
  }
}
```
````

**Output:**

```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code  hl]
    }
  }
}
```

## Focus in Code Blocks

Adding the `// [!code focus]` comment on a line will focus it and blur the other parts of the code.

Additionally, you can define a number of lines to focus using `// [!code focus:<lines>]`.

<!--@include: ./parts/one-space.md-->

**Input:**

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

## Colored Diffs in Code Blocks

Adding the `// [!code --]` or `// [!code ++]` comments on a line will create a diff of that line, while keeping the colors of the codeblock.

<!--@include: ./parts/one-space.md-->

**Input:**

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

## Errors and Warnings in Code Blocks

Adding the `// [!code warning]` or `// [!code error]` comments on a line will color it accordingly.

<!--@include: ./parts/one-space.md-->

**Input:**

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

## Line Numbers

You can enable line numbers for code blocks via adding `:line-numbers`.

**Input:**

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

## Code Groups

You can group multiple code blocks like this:

**Input:**

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

**Input:**

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

## `<kbd>`

To display keyboard buttons, such as keyboard shortcuts, wrap them in double square brackets.

**Input:**

```markdown
To save a resource, press the keyboard shortcut [[Ctrl]] / [[⌘ Cmd]] + [[s]]
```

**Output:**

To save a resource, press the keyboard shortcut [[Ctrl]] / [[⌘ Cmd]] + [[s]]

::: warning Keep in mind
The `[[toc]]` string is reserved by the **toc** (table of contents) plugin and it will display the table of contents (see above).
:::
