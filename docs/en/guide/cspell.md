---
lastUpdated: false
---

# Spell checking (cspell)

The project uses [cspell](https://cspell.org/) for spell checking in Markdown and code. Russian and English are enabled (dictionary `@cspell/dict-ru_ru`). The `docs/en/` folder is excluded from the main check and can be checked separately if needed.

## Running the check

From the repo root:

- **`pnpm run spellcheck`** — reports all spelling issues (file, line, word). Useful before commits or in CI.
- **`pnpm run spellcheck:fix`** — same check with spelling suggestions for each unknown word; fix files manually or add the word to `cspell.json`.

After installing dependencies (`pnpm install`), these commands work without extra setup.

## Configuration

Config file: **`cspell.json`** in the project root.

- **`language`** — `"en,ru"`: use Russian and English dictionaries.
- **`words`** — list of extra “correct” words: technical terms (MODX, miniShop2, Fenom), component and snippet names, domains (modstore, modx.pro), etc. These are not reported as errors.
- **`ignorePaths`** — paths cspell skips: `docs/en`, `**/parts/**`, lock files, `node_modules`, `plop-templates`.

This reduces false positives on package names, tags, and paths.

## Adding words

If cspell flags a valid word (e.g. a new component name or term), add it to the **`words`** array in `cspell.json`. Use lowercase; cspell matches case-insensitively.

For more options see the [cspell docs](https://cspell.org/docs/configuration/).
