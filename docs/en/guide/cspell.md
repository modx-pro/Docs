---
lastUpdated: false
---

# Spell checking (cspell)

The project uses [cspell](https://cspell.org/) to spell-check Markdown. Both the Russian and the English docs are checked: dictionary `@cspell/dict-ru_ru` plus English dictionaries (US and British spelling). Code and fragments in `parts/` are not checked.

## Running the check

From the repo root:

- **`pnpm run spellcheck:changed`** — checks Markdown files changed since the branch forked from `origin/master` and reports only issues on changed lines, so old typos elsewhere in the file don't get in the way (run `git fetch` first; set another base with `SPELLCHECK_BASE=origin/<branch>`). CI runs the same check on PRs that change `docs/`, against the PR's base branch, so it is the handiest one before submitting changes.
- **`pnpm run spellcheck`** — checks all docs and reports every spelling issue (file, line, word).
- **`pnpm run spellcheck:fix`** — same check with spelling suggestions for each unknown word; fix files manually or add the word to `cspell.json`.

After installing dependencies (`pnpm install`), these commands work without extra setup.

### Check a single file or folder

Handy when editing a particular page:

```shell
pnpm run spellcheck docs/components/ajaxform.md
pnpm run spellcheck docs/guide
```

If a path has no files to check (a typo in the path, or only `parts/` fragments), the script says so and exits with an error. Paths can't be combined with `--changed`. Pass cspell options as `--flag` or `--flag=value`.

## Configuration

Config file: **`cspell.json`** in the project root.

- **`language`** — `"en,en-GB,ru"`: use Russian and English dictionaries (US and British spelling).
- **`words`** — list of extra “correct” words: technical terms (MODX, miniShop2, Fenom), component and snippet names, domains (modstore, modx.pro), etc. These are not reported as errors.
- **`ignoreRegExpList`** — code is not checked: code blocks and anything in `backticks`. Format snippet, parameter and variable names as code, and they don't need dictionary entries.
- **`ignorePaths`** — paths cspell skips: `**/parts/**`, lock files, `node_modules`, `plop-templates`.

This reduces false positives on package names, tags, and paths.

## Adding words

Component and author names don't need to be added: `scripts/spellcheck.mjs` collects them itself — names of `docs/components/*.md` files and `docs/components/*/` folders with the words of their `title`, plus keys, name words and handles (last segment of the profile link) from `docs/authors.json`.

If cspell flags a valid word (e.g. a term or jargon word), add it to the **`words`** array in `cspell.json`. Use lowercase; cspell matches case-insensitively.

**Example `cspell.json` fragment:**

```json
{
  "words": ["кукисов", "брейкпоинтом"]
}
```

- **`words`** — project dictionary: package names, hooks, rare abbreviations.
- **`ignorePaths`** — skip whole paths (`parts/` fragments, plop templates, etc.). Prefer adding a term to `words` instead of disabling large folders without a good reason.

Fragments in `parts/` are not checked: they are embedded into other pages and checked there.

## CI

The **Spellcheck** workflow runs on every PR that changes `docs/` and checks the changed lines (`pnpm run spellcheck:changed`). If it fails, fix the typo or add the word to `words`.

For more options see the [cspell docs](https://cspell.org/docs/configuration/).
