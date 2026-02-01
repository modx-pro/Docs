# Aliases

Tab for managing search word synonyms and replacements.

## Purpose

Aliases extend search by linking different spellings. Useful for:

- Fixing typos
- Adding synonyms
- Transliteration
- Linking brands to alternative names

## Modes

### Synonym (Add)

The word is added to the query along with the original.

**Example:** alias `whiskas` → `whiskas`

- Query: “whiskas food”
- Search for: “whiskas”, “whiskas”, “food”

### Replace

The original word is fully replaced by the alias.

**Example:** alias `wiskas` → `whiskas` (with replace flag)

- Query: “wiskas food”
- Search for: “whiskas”, “food”

## Interface

### Aliases table

| Column | Description |
|--------|-------------|
| Word | Source word (what the user types) |
| Replacement | Word to replace or add |
| Full replace | `Replace` — replace, `Add` — synonym |
| Active | Alias status |

### Actions

| Button | Description |
|--------|-------------|
| Create alias | Add new alias |
| Edit | Edit alias |
| Delete | Remove alias |

## Creating an alias

1. Click **Create alias**
2. Fill in:
   - **Word** — what the user types
   - **Replacement** — what to replace or add
   - **Full replace** — enable for replace mode
   - **Active** — enable/disable
3. Click **Save**

## Examples

### Typos

| Word | Replacement | Mode |
|------|-------------|------|
| `samsng` | `samsung` | Replace |
| `apple` | `apple` | Replace |
| `xiaomi` | `xiaomi` | Replace |

### Synonyms

| Word | Replacement | Mode |
|------|-------------|------|
| `phone` | `smartphone` | Synonym |
| `laptop` | `notebook` | Synonym |
| `printer` | `mfp` | Synonym |

### Brand transliteration

| Word | Replacement | Mode |
|------|-------------|------|
| `nike` | `nike` | Replace |
| `adidas` | `adidas` | Replace |

### Abbreviations

| Word | Replacement | Mode |
|------|-------------|------|
| `pc` | `computer` | Synonym |
| `tv` | `television` | Synonym |
| `mobile` | `mobile phone` | Replace |

## Tips

### Use query stats

Check the [Queries](/en/components/msearch/interface/queries) tab:

1. Find zero-result queries
2. See if relevant content exists
3. If it does — add an alias

### Don’t overuse

- Add aliases only for real synonyms
- Avoid very broad replacements
- Test search after adding

### Morphology order

Aliases are applied **before** morphological analysis. If a word is in the morphology dictionary, its forms are also used.

## Differences from mSearch2

| Aspect | mSearch2 | mSearch |
|--------|----------|---------|
| Name | Synonyms | Aliases |
| Modes | Add/Replace | Add/Replace |
| Interface | ExtJS | Vue 3 + PrimeVue |
