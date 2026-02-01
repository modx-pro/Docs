---
lastUpdated: false
---
<!-- markdownlint-disable MD049 MD050  -->
# Quick markdown reference

Content adapted from [here](https://htmlacademy.ru/blog/html/markdown).

Markdown is a simple, fast way to format text. It’s used when HTML isn’t available and you want readable, lightly structured text (headings, lists, images, links).

A common example is `readme.md` files in GitHub repos — the `.md` stands for markdown.

Another example is messaging apps: in Telegram you can wrap text in asterisks to make it bold.

![](https://assets.htmlacademy.ru/content/blog/1185/01.png)

Markdown flavors differ; check which one you’re using.

## Text emphasis

Options are limited, but you get equivalents of `<b>` and `<i>`, and you can nest them.

**Example:**

```markdown
*Italic text* or _italic text_.
**Bold text** or __bold text__.
**Bold _italic_ text**
```

**Output:**

*Italic text* or _italic text_.

**Bold text** or __bold text__.

**Bold _italic_ text**

## Headings

More `#` means a deeper level. There are 6 levels; in practice you rarely need beyond the third.

**Example:**

```markdown
# Heading h1
## Heading h2
### Heading h3
#### Heading h4
```

## Lists

### Unordered list

Use `*`, `+`, or `-`. Indent with a tab for nested items.

**Example:**

```markdown
* Hello
* How are you
  * After a tab you get a nested list
```

**Output:**

* Hello
* How are you
  * After a tab you get a nested list

### Ordered list

You can use `1.` for every item; the renderer will number them correctly.

**Example:**

```markdown
1. Yes
1. Yes yes
    1. Yes yes yes yes
    1. Yes yes yes yes yes
1. Yes yes yes
```

**Output:**

1. Yes
1. Yes yes
    1. Yes yes yes yes
    1. Yes yes yes yes yes
1. Yes yes yes

## Links

```markdown
[Link text](https://modx.pro)
```

Images use the same syntax with a leading `!`.

```markdown
![Alt text](image-url)
```

## Blockquotes

**Example:**

```markdown
This is normal text, and
> This is a quote, and it’s clear that it’s quoted
```

**Output:**

This is normal text, and
> This is a quote, and it’s clear that it’s quoted

You’re ready to write your first `index.md`.

## Code

Code is wrapped in backticks. Use three backticks at the start and end for multi-line blocks, or one for a short inline span.

**Example:**

````markdown
```php
$user = $modx->getObject(modUser::class, ['id' => 5]);
```
````

**Output:**

```php
$user = $modx->getObject(modUser::class, ['id' => 5]);
```

## Code highlighting

Markdown supports syntax highlighting for many languages.
Specify the language right after the opening backticks. The list of supported languages is large; see [this link](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages).

We also added MODX and Fenom syntax highlighting. You won’t find this in the official MODX docs.

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
