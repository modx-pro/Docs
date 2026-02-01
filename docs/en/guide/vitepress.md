---
lastUpdated: false
---
# VitePress Features

::: info
VitePress uses [markdown-it](https://github.com/markdown-it/markdown-it) as its parser, which extends markdown capabilities.
We can add significantly more polish and convenience.
:::

You can always see the full, up-to-date list of features at <https://vitepress.dev/guide/markdown>.

Let's look at each of them in more detail.

## Heading links

Headings automatically become anchor links like `guide/vitepress#heading-links`.
The heading text is automatically transliterated and truncated to 25 characters (without cutting words).

### Custom anchor {#my-anchor}

But you can assign a custom anchor to any heading using the `{#my-anchor}` syntax.

```markdown
## Regular heading
### Custom anchor {#my-anchor}
```

## Tables

Generate tables in GitHub style.

**Example:**

```markdown
| Tables        |      Are      |  Cool |
|---------------|:-------------:|------:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**Output:**

| Tables        |      Are      |  Cool |
|---------------|:-------------:|------:|
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

[Full list of available emoji here](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).

## Table of contents anywhere

Generated from headings.

**Example:**

```
[[toc]]
```

**Output:**

[[toc]]

## Styled alerts

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

## Alerts with custom titles

**Example:**

````markdown
::: info Custom title
This is an info box.
:::

::: danger Danger
This is a dangerous warning.
:::

::: details Click to show code
```js
console.log('Hello, VitePress!');
```
:::
````

**Output:**

::: info Custom title
This is an info box.
:::

::: danger Danger
This is a dangerous warning.
:::

::: details Click to show code

```js
console.log('Hello, VitePress!');
```

:::

## GFM-style alerts (GitHub-flavored Markdown)

VitePress also supports GitHub-style alerts. They render the same as the alerts above.

**Example:**

````markdown
> [!NOTE]
> This is an info box.

> [!TIP]
> This is a tip.

> [!IMPORTANT]
> This is an important message.

> [!WARNING]
> This is a warning.

> [!CAUTION]
> This is a dangerous warning.
````

**Output:**

> [!NOTE]
> This is an info box.

> [!TIP]
> This is a tip.

> [!IMPORTANT]
> This is an important message.

> [!WARNING]
> This is a warning.

> [!CAUTION]
> This is a dangerous warning.

## Syntax highlighting in code blocks

VitePress uses [Shiki](https://shiki.matsu.io/) to highlight syntax in your markdown code blocks with colored text.
Shiki supports a wide range of programming languages. All you need to do is specify the language right after the opening code block backticks.

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
{'!msProducts' | snippet: [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom
{'!msProducts' | snippet: [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

The list of supported languages is available [at this link](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages).

Additionally available:

- [MODX](https://docs.modx.com/3.x/ru/building-sites/tag-syntax) parser: `modx`
- [Fenom](https://github.com/fenom-template/fenom) templating: `fenom`
- [Smarty](https://www.smarty.net/docsv2/ru/) templating: `smarty`

## Line highlighting in code

To draw attention to specific lines, you can highlight them.

**Example:**

````markdown
```fenom{2}
{'!msProducts' | snippet: [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom{2}
{'!msProducts' | snippet: [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

In addition to single-line highlighting, multi-line is supported:

- Range `{5-8}`, `{3-10}`, `{10-17}`
- List `{4,7,9}`
- Mix `{4,7-13,16,23-27,40}`

**Example:**

````markdown
```fenom{1,3}
{'!msProducts' | snippet: [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom{1,3}
{'!msProducts' | snippet: [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

## Focus

Add the comment `// [!code focus]` on the line you need, and all code except that line will be dimmed.

You can also specify line numbers: `// [!code focus:<lines>]`.

<!--@include: ./parts/one-space.md-->

**Example:**

````markdown
```fenom
{'!msProducts' | snippet: [
  'parents' => 0, // [!code  focus]
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom
{'!msProducts' | snippet: [
  'parents' => 0, // [!code focus]
  'includeThumbs' => '120x90,360x270',
]}
```

## Diff highlighting

Add comments `// [!code --]` or `// [!code ++]` on the relevant lines to get clear diff highlighting.

<!--@include: ./parts/one-space.md-->

**Example:**

````markdown
```fenom
{'!msProducts' | snippet: [
  'parents' => 0, // [!code  --]
  'parents' => 5, // [!code  ++]
  'includeThumbs' => '120x90,360x270',
]}
```
````

**Output:**

```fenom
{'!msProducts' | snippet: [
  'parents' => 0, // [!code --]
  'parents' => 5, // [!code ++]
  'includeThumbs' => '120x90,360x270',
]}
```

## Errors and warnings in code blocks

Add comments `// [!code warning]` or `// [!code error]` on the line you need and it will be colored accordingly.

<!--@include: ./parts/one-space.md-->

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

## Line numbers in code

To enable line numbers, add: `:line-numbers`.

**Example:**

````markdown
```ts {1}
// Line numbers are off by default
const line2 = 'Second line of code'
const line3 = 'Third line of code'
```

```ts:line-numbers {1}
// Line numbers are on
const line2 = 'Second line of code'
const line3 = 'Third line of code'
```
````

**Output:**

```ts {1}
// Line numbers are off by default
const line2 = 'Second line of code'
const line3 = 'Third line of code'
```

```ts:line-numbers {1}
// Line numbers are on
const line2 = 'Second line of code'
const line3 = 'Third line of code'
```

## Code groups

You can group code blocks like this:

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
{'!msProducts' | snippet: [
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
{'!msProducts' | snippet: [
  'parents' => 0,
  'includeThumbs' => '120x90,360x270',
]}
```

:::

You can also give each tab a custom title, for example to show file or chunk names.

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

## Keyboard input `<kbd>`

To show keyboard input, e.g. key combinations, wrap it in double square brackets.

**Example:**

```markdown
To save the resource, press [[Ctrl]] or [[⌘ Cmd]] + [[s]]
```

**Output:**

To save the resource, press [[Ctrl]] or [[⌘ Cmd]] + [[s]]

::: warning Remember
The value `[[toc]]` is reserved by the **toc** (table of contents) plugin and will output the page table of contents.
:::
