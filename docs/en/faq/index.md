# Ready-made solutions

This section is for ready-made solutions to various MODX-related tasks and issues.

## How to add a solution

First, fork the project repository. The process is described in: [Recommended way to contribute to the documentation](/en/guide/getting-started#recommended-way-to-make-changes-to-the-documentation). After that, return here and continue.

## Category

In the left sidebar on this page you see the list of existing categories. If one of them fits, go to the [next section](#writing-your-solution).

Otherwise, in the file `docs/faq/categories.json` (from the repo root) add an entry like: `"folder": "Menu text"`. For example:

::: code-group

```json [docs/faq/categories.json]
{
  "ace": "Ace",
  "tinymce-rte": "TinyMCE Rich Text Editor",
  "useful-queries": "Useful query collection" // [!code ++]
}
```

:::

## Writing your solution

Create your file at `docs/faq/useful-queries/your-file-name.md` (or the category folder you chose).

::: tip
If you are running the site locally, restart the dev server so **VitePress** picks up config changes.
:::

Then write your solution in that file using [markdown](/en/guide/markdown) and [VitePress](/en/guide/vitepress) features.

## Setting authorship

Add your authorship by following [these instructions](/en/guide/frontmatter#component-author), and add the `author` property at the top of the file.

::: code-group

```markdown:line-numbers [docs/faq/useful-queries/your-file-name.md]
--- // [!code ++]
author: github-login // [!code ++]
--- // [!code ++]

# My ready-made solution

This solution is very useful and I'm sharing it with the community
```

:::

## Canonical link

If your solution was published elsewhere (e.g. your blog or on [modx.pro](https://modx.pro)), you can set a canonical URL.

::: code-group

```markdown:line-numbers [docs/faq/useful-queries/your-file-name.md]
---
author: github-login
head: // [!code ++]
  - - link // [!code ++]
    - rel: canonical // [!code ++]
      href: https://modx.pro/solutions/24050 // [!code ++]
---

# My ready-made solution

This solution is very useful and I'm sharing it with the community
```

:::

## Moderation

Then open a Pull Request (PR) and wait for review. After moderation and merge, your solution will be available on the site.

Thank you for contributing to the community, and good luck with tests, fewer bugs and sane SEO on your way :wink:
