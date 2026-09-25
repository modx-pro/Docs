---
lastUpdated: false
---

# Spell checking (cspell)

The project uses [cspell](https://cspell.org/) for spell checking in Markdown and code. Russian and English are enabled (dictionary `@cspell/dict-ru_ru`). The `docs/en/` folder is excluded from the main check and can be checked separately if needed.

## Running the check

From the repo root:

- **`pnpm run spellcheck:changed`** — checks only Markdown files changed against `origin/master`. CI runs the same check on every PR, so it is the handiest one before submitting changes.
- **`pnpm run spellcheck`** — checks all docs and reports every spelling issue (file, line, word).
- **`pnpm run spellcheck:fix`** — same check with spelling suggestions for each unknown word; fix files manually or add the word to `cspell.json`.

After installing dependencies (`pnpm install`), these commands work without extra setup.

### Check a single file or folder

```shell
pnpm run spellcheck docs/components/ajaxform.md
pnpm run spellcheck docs/guide
```

## Configuration

Config file: **`cspell.json`** in the project root.

- **`language`** — `"en,ru"`: use Russian and English dictionaries.
- **`words`** — list of extra “correct” words: technical terms (MODX, miniShop2, Fenom), component and snippet names, domains (modstore, modx.pro), etc. These are not reported as errors.
- **`ignoreRegExpList`** — code is not checked: code blocks and anything in `backticks`. Format snippet, parameter and variable names as code, and they don't need dictionary entries.
- **`ignorePaths`** — paths cspell skips: `docs/en`, `**/parts/**`, lock files, `node_modules`, `plop-templates`.

This reduces false positives on package names, tags, and paths.

## Adding words

Component and author names don't need to be added: `scripts/spellcheck.mjs` collects them itself — file and folder names in `docs/components/`, `title` from frontmatter, names and handles from `docs/authors.json`.

If cspell flags a valid word (e.g. a new component name or term), add it to the **`words`** array in `cspell.json`. Use lowercase; cspell matches case-insensitively.

**Example `cspell.json` fragment:**

```json
{
  "words": ["minishop2", "pdotools"]
}
```

- **`words`** — project dictionary: package names, hooks, rare abbreviations.
- **`ignorePaths`** — skip whole paths. Prefer adding a term to `words` instead of disabling large folders without a good reason.

English files in `docs/en/` are not checked.

## CI

The **Spellcheck** workflow runs on every PR that changes `docs/` and checks only the changed files (`pnpm run spellcheck:changed`). If it fails, fix the typo or add the word to `words`.

For more options see the [cspell docs](https://cspell.org/docs/configuration/).
