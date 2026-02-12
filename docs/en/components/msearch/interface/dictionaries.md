# Dictionaries

Tab for managing phpMorphy morphological dictionaries.

## Purpose

Morphological dictionaries enable search by word forms. E.g. searching for “phones” also finds “phone”, “phones”, etc.

## Available dictionaries

| Dictionary | Language |
|------------|----------|
| ru | Russian |
| en | English |
| de | German |
| uk | Ukrainian |

::: info Requirements
mSearch needs **at least one** morphological dictionary. Without dictionaries, word-form search will not work.
:::

## Interface

### Dictionaries table

| Column | Description |
|--------|-------------|
| Dictionary | Dictionary name |
| Language | Language |
| Installed | Installation status |

### Actions

| Button | Description |
|--------|-------------|
| Install | Download and install dictionary |
| Remove | Remove installed dictionary |

## Installing a dictionary

1. Find the dictionary in the table
2. Click **Install**
3. Choose a download mirror
4. Wait for the download to finish

### Source

Dictionaries are downloaded from GitHub ([seoservice2020/phpmorphy](https://github.com/seoservice2020/phpmorphy)).

::: tip Composer package
mSearch uses the `cijic/phpmorphy` library — a modern phpMorphy fork installed via Composer.
:::

## After installation

After installing a new dictionary:

1. Go to the [Indexing](/en/components/msearch/interface/indexes) tab
2. Clear the existing index
3. Rebuild the index

This ensures the new dictionary is used correctly.

## File location

Dictionaries are stored in:

```
core/components/msearch/phpmorphy/dicts/
```

Each dictionary is a set of `.mrd`, `.fsa`, and `meta.json` files.

## Without dictionaries

If no dictionaries are installed:

- Search still works
- Morphological analysis is off
- Only exact and LIKE matches
- Search quality drops

## Multilingual sites

For multilingual sites install all needed dictionaries. mSearch detects the word language and uses the right dictionary.

### Example

Site in Russian and English:

1. Install `russian` dictionary
2. Install `english` dictionary

When searching:

- “phones” → Russian dictionary
- “phones” → English dictionary

## Dictionary sizes

| Dictionary | Size |
|------------|------|
| ru (Russian) | ~10 MB |
| en (English) | ~5 MB |
| de (German) | ~15 MB |
| uk (Ukrainian) | ~8 MB |

::: warning Disk space
Ensure enough disk space for dictionaries.
:::

## Differences from mSearch2

| Aspect | mSearch2 | mSearch |
|--------|----------|---------|
| Library | Bundled phpMorphy | Composer `cijic/phpmorphy` |
| Source | SourceForge | GitHub |
| Ukrainian | Yes | Yes |
| Estonian | Yes | No |
| Interface | ExtJS | Vue 3 + PrimeVue |
| Install | On component install | Manually in interface |
