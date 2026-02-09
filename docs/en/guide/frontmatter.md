---
lastUpdated: false
---

# Frontmatter – Extra page and component properties

In addition to what markdown and VitePress provide, this project supports extra page metadata via Frontmatter. To add it, at the top of the file, between a pair of `---` (three hyphens), write property–value pairs.

Example:

```markdown
---
title: Page title
description: Page description
---
```

## Common properties

Below is the main set of properties that help you present your documentation to readers.

### Page title

- Type: `string`
- Default: First heading in the file

```yaml
title: This is the page title
```

This property also sets your component name: in a single-page doc it goes in that one file; in multi-page docs it goes in the component root `index.md`.

### Page description

- Type: `string`

```yaml
description: This is the page description
```

This property sets the meta `description` content. For a component’s main file it also sets the description in the component list.

### Table of contents

- Type: `number | [number, number] | 'deep' | false`
- Default: `deep`

```yaml
outline: [2,3]
```

Heading level(s) used to generate the table of contents.

You can pass a single level as a number or a range. Use `deep` (equivalent to `[2, 6]`) to include all headings except `h1`, or `false` to hide the TOC.

This page uses `[2, 3]`, so the TOC is built from level 2 and 3 headings.

### Last updated

- Type: `boolean`
- Default: `true`

```yaml
lastUpdated: false
```

Whether to show the last updated date at the bottom of the page.

### Edit link

- Type: `boolean`
- Default: `true`

```yaml
editLink: false
```

Whether to show the link to edit the page.

## Component properties

This section lists properties that apply only to component docs. They can be set in the component’s single doc file (e.g. `ajaxform.md`) or, for multi-page docs, in the component root `index.md` (e.g. `minishop2/index.md`).

### Component logo

- Type: `string`

```yaml
logo: https://modstore.pro/assets/extras/minishop2/logo-lg.png
```

URL of the component logo.

### Component page on [modstore.pro]

- Type: `string`

```yaml
modstore: https://modstore.pro/packages/ecommerce/minishop2
```

Link to the component page on [modstore.pro].

### Component page on [modx.com]

- Type: `string`

```yaml
modx: https://modx.com/extras/package/minishop2
```

Link to the component page in the official [modx.com] repository.

### Component source repository

- Type: `string`

```yaml
repository: https://github.com/modx-pro/miniShop2
```

Link to the component source code repository.

### Component author

- Type: `string`

```yaml
author: modx-pro
```

Use your [github.com] login. Author data is stored in `docs/authors.json` in one of these formats. Add your account if it’s missing.

```json
{
  "login": "Author name"
}

// or

{
  "login": {
    "name": "Author name",
    "modstore": "Link to author page on modstore.pro"
  }
}

// or

{
  "login": {
    "name": {
      "ru": "Author name in Russian",
      "en": "Author name in English"
    },
    "modstore": "Link to author page on modstore.pro"
  }
}
```

### Component sidebar menu

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
  { text: 'Common parameters', link: 'general-properties' },
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
  - text: Common parameters
    link: general-properties
  - text: File elements
    link: file-elements
  - text: Parser
    link: parser
```

This property defines the component’s sidebar menu. Links are relative to the component folder root and should not include `.md`.

```ts
interface SidebarItem {
  /**
   * Menu item label.
   */
  text?: string

  /**
   * Menu item link.
   */
  link?: string

  /**
   * Nested items.
   */
  items?: SidebarItem[]
}
```

### Component dependencies

- Type: `string | string[]`

This property controls how your component’s dependencies are shown, even if their docs are not on this site.

```yaml
dependencies: miniShop2

// or

dependencies: ['miniShop2', 'msOptionsPrice2']

// or

dependencies:
  - miniShop2
  - msOptionsPrice2
```

### Component category

- Type: `string`

Currently there is one category, `payment`, used to list payment modules on the [miniShop2 payment modules page](/en/components/minishop2/payments).

```yaml
categories: payment
```

[modstore.pro]: https://modstore.pro
[modx.com]: https://modx.com/extras
[github.com]: https://github.com
