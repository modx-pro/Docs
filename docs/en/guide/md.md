---
lastUpdated: false
outline: [2,3]
---
<!-- markdownlint-disable MD049 MD050  -->
# Quick reference markdown

Material taken from [here](https://htmlacademy.ru/blog/html/markdown).

Markdown is a convenient and fast way to mark up text. Markdown is used when HTML is not available, and the text needs to be made readable and structured (headings, lists, pictures, links).

The main example of using markdown is the readme.md file, which is found in every github repository. The .md extension is short for markdown.

Another common example is messages in messaging app. You can put stars around the text in Telegram, and the text will become bold.

![](https://assets.htmlacademy.ru/content/blog/1185/01.png)

Markdown versions are different, so double check which one you are using.

## Text decoration

We do not have many options, but there are analogues of the `<b>` and `<i>` tags. And they can also be nested inside each other.

**Example:**

```markdown
*Italic text* or _italic text_.
**Bold text** or __bold text__.
**Bold _italic_ text**.
```

**Output:**

*Italic text* or _italic text_.

**Bold text** or __bold text__.

**Bold _italic_ text**.

## Headings

The more times we repeat #, the higher the heading level. In general, 6 levels are available, but in practice headings of more than 3 are rarely needed.

**Example:**

```markdown
# Heading level 1 / h1
## Heading level 2 / h2
### Heading level 3 / h3
#### Heading level 4 / h4
```

## Lists

### Unordered list

You can use `*`, `+` or `-` on one side of the line, for a nested item use tabulation.

**Example:**

```markdown
* Hello!
* How are you doing?
  * After using tabulation, there will be a nested item.
```

**Output:**

* Hello!
* How are you doing?
  * After using tabulation, there will be a nested item.

### Ordered lists

The situation with numbering is funny - you can just put `1.` everywhere and the correct numbering will appear in the document.

**Example:**

```markdown
1. Yep
1. Yep-yep
    1. Yep-yep-yep-yep
    1. Yep-yep-yep-yep-yep
1. Yep-yep-yep
```

**Output:**

1. Yep
1. Yep-yep
    1. Yep-yep-yep-yep
    1. Yep-yep-yep-yep-yep
1. Yep-yep-yep

## Links

```markdown
[Link text](https://modx.pro)
```

Pictures are placed as links, only at the beginning of the line you need to add `!`.

```markdown
![Picture text](/assets/img/logo.png)
```

## Blockquotes

**Example:**

```markdown
This is plain text.
> And this is the quoted text.
```

**Output:**

This is plain text.
> And this is the quoted text.

That's it, now you can write your first `index.md` document.

## Code

This is, in fact, what we are all here for.
The code is marked up with back quotes. Three at the beginning, three at the end for multi-line blocks, or one quote each to highlight one or two words.

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

Markdown supports correct code highlighting for various programming and markup languages.
You must specify the language after the opening quotes. The [list of supported languages](https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages) is quite wide.

In addition, we have added syntax highlighting for MODX and fenom. Such a cool and convenient highlighting is not yet available even in the official MODX documentation.

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
