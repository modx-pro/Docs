---
lastUpdated: false
---

# Spell checking (cspell)

The project uses [cspell](https://cspell.org/) to check spelling in Markdown and code. Russian and English are enabled (dictionary `@cspell/dict-ru_ru`). The `docs/en/` folder is excluded from the default check; you can run a separate check for it if needed.

## Running the check

From the repository root:

- **`pnpm run spellcheck`** — prints a report of all spelling issues (file, line, word). Useful before commits or in CI.
- **`pnpm run spellcheck:fix`** — interactive mode: cspell suggests fixes for each word; you can accept, skip, or add the word to the dictionary.

After installing dependencies (`pnpm install`), these commands work without extra setup.

## Configuration

Configuration is in **`cspell.json`** at the project root.

- **`language`** — `"en,ru"`: use Russian and English dictionaries.
- **`words`** — array of allowed words: technical terms (MODX, miniShop2, Fenom), component and snippet names, domains (modstore, modx.pro), etc. These are not reported as errors.
- **`ignorePaths`** — paths cspell skips: `docs/en`, `**/parts/**`, lock files, `node_modules`, `plop-templates`.

This reduces false positives for package names, tags, and paths.

## Adding words

If cspell flags a valid word (e.g. a new component or term), add it to the **`words`** array in `cspell.json`. Use lowercase; cspell matches case-insensitively.

For more options, see the [cspell configuration docs](https://cspell.org/docs/configuration/).
