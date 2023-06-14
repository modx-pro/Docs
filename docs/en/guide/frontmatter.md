---
lastUpdated: false
---

# Frontmatter - Additional properties of pages and extras

In addition to the features provided by markdown and VitePress, our project also supports Frontmatter markup.
To add Frontmatter, you need to set the names and values ​​of the properties at the beginning of the file, in the block between `---` (three hyphen characters).

Example:

```markdown
---
title: Page title
description: Page description
---
```

## General properties

Below is a list of properties that will help you better present your documentation to the reader.

### Title

- Type: `string`
- Default: First header in file

```yaml
title: The page title
```

Also, this property is responsible for the name of your extra, if you have a single-page documentation, then in that single file, and in the case of multi-page documentation, then in the `index.md` file at the root of your extra's directory.

### Description

- Type: `string`

```yaml
description: The page description
```

This property is responsible for the contents of the description meta tag. And, in the case of the main extra's file, also for the description in the general list of extras.

### Table of Contents

- Type: `number | [number, number] | 'deep' | false`
- Default: `deep`

```yaml
outline: [2,3]
```

The heading level or levels from which to generate the table of contents.

You can specify the heading level as a number, or as a range. It is possible to specify `deep`, which is equivalent to `[2, 6]`, to have the table of contents generated from all headings except `h1`. You can also specify `false` to hide the table of contents.

For example, this page has the value `[2, 3]` and therefore you see a table of contents generated from the headings of the second and third levels.

### Last Updated

- Type: `boolean`
- Default: `true`

```yaml
lastUpdated: false
```

Whether to display the date of the last update at the bottom of the page.

### Edit Link

- Type: `boolean`
- Default: `true`

```yaml
editLink: false
```

Whether to display a link to page updates.

## Extra's properties

This section provides a list of properties that apply only to extras, i.e. they can be specified in the extra's documentation file if you have a single-page documentation (Example: `ajaxform.md`) or if you have multi-page documentation, then in the `index.md` file located at the root of your extra directory (Example: `minishop2/index.md`).

### Logo

- Type: `string`

```yaml
logo: https://modstore.pro/assets/extras/minishop2/logo-lg.png
```

Link to the extra's logo.

### [modstore.pro]

- Type: `string`

```yaml
modstore: https://modstore.pro/packages/ecommerce/minishop2
```

Link to the page of extra in the [modstore.pro].

### [modx.com]

- Type: `string`

```yaml
modx: https://modx.com/extras/package/minishop2
```

Link to the extra's page in the official [modx.com] repository.

### Source Code Repository

- Type: `string`

```yaml
repository: https://github.com/modx-pro/miniShop2
```

Link to the source code repository of the extra.

### Author

- Type: `string`

```yaml
author: modx-pro
```

Login on [github.com]. The file along the path `docs/authors.json` stores an object with the data of authors in several possible formats. If it does not contain your account, then add it.

```json
{
  "login": "Author's name"
}

// or

{
  "login": {
    "name": "Author's name",
    "modstore": "Link to the author's page in the modstore.pro marketplace"
  }
}

// or

{
  "login": {
    "name": {
      "ru": "Author's name in russian",
      "en": "Author's name in english"
    },
    "modstore": "Link to the author's page in the modstore.pro marketplace"
  }
}
```

### Menu

- Type: `SidebarItem[]`

```yaml
items: [
  {
    text: 'Snippets',
    items: [
      { text: 'pdoResources', link: 'snippets/pdoresources' },
      { text: 'pdoMenu', link: 'snippets/pdomenu' },
      { text: 'pdoPage', link: 'snippets/pdopage' },
    ],
  },
  {
    text: 'Classes',
    link: 'classes/',
    items: [
      { text: 'pdoTools', link: 'classes/pdotools' },
      { text: 'pdoFetch', link: 'classes/pdofetch' },
      { text: 'pdoParser', link: 'classes/pdoparser' },
    ],
  },
  { text: 'Properties', link: 'general-properties' },
  { text: 'File elements', link: 'file-elements' },
  { text: 'Parser', link: 'parser' },
]

// or

items:
  - text: Snippets
    items:
      - text: pdoResources
        link: snippets/pdoresources
      - text: pdoMenu
        link: snippets/pdomenu
      - text: pdoPage
        link: snippets/pdopage
  - text: Classes
    link: classes/
    items:
      - text: pdoTools
        link: classes/pdotools
      - text: pdoFetch
        link: classes/pdofetch
      - text: pdoParser
        link: classes/pdoparser
  - text: Properties
    link: general-properties
  - text: File elements
    link: file-elements
  - text: Parser
    link: parser
```

This property is responsible for displaying the documentation menu of your extra. Links must be specified relative to the root directory of your extra and, accordingly, without `.md`.

```ts
interface SidebarItem {
  /**
   * Menu item text.
   */
  text?: string

  /**
   * Menu item link.
   */
  link?: string

  /**
   * List of nested items.
   */
  items?: SidebarItem[]
}
```

### Dependencies

- Type: `string | string[]`

This property is responsible for displaying the dependencies of your extra. Even if no dependency documentation is provided.

```yaml
dependencies: miniShop2

// or

dependencies: ['miniShop2', 'msOptionsPrice2']

// or

dependencies:
  - miniShop2
  - msOptionsPrice2
```

### Category

- Type: `string`

At the moment there is one `payment` category, which is responsible for displaying payment modules on the [list of miniShop2 payment modules](/components/minishop2/payments) page.

<!-- Specify one or more categories for your extra. The list of available categories is in the file along the path: `docs/categories.json`. -->

```yaml
categories: payment
```

[modstore.pro]: https://modstore.pro
[modx.com]: https://modx.com/extras
[github.com]: https://github.com
