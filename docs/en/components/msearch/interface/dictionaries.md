# Dictionaries

Tab for managing phpMorphy morphological dictionaries.

## Purpose

Morphological dictionaries enable search by word forms. For example, a search for "phones" also finds "phone".

## Available dictionaries

| Dictionary | Language |
|------------|----------|
| ru | Russian |
| en | English |
| de | German |
| uk | Ukrainian |

::: info Dictionaries are recommended, not required
Without dictionaries the search keeps working — but only by exact matches, without word forms (see "Working without dictionaries"). For full morphological search install the dictionary for the needed language.
:::

## Interface

![Dictionaries tab: the Russian dictionary is installed, the others have install buttons](/components/msearch/img/dictionaries-tab.png)

### Dictionaries table

| Column | Description |
|--------|-------------|
| Dictionary | Dictionary name |
| Language | Dictionary language |
| Installed | Installation status |

### Actions

| Button | Description |
|--------|-------------|
| Install dictionary | Download and install the dictionary (button of a not installed one) |
| Remove dictionary (trash icon) | Remove an installed dictionary; asks for confirmation |

## Installing a dictionary

1. Find the dictionary in the table
2. Click **Install dictionary**
3. Select a mirror and click **Install** (currently one mirror is available — GitHub)
4. Wait for the download to finish — the dialog shows the "Downloading dictionary..." indicator

![Dictionary install dialog: GitHub mirror selection and the Install button](/components/msearch/img/dictionary-install-dialog.png)

### Dictionary source

Dictionaries are downloaded from GitHub (the [seoservice2020/phpmorphy](https://github.com/seoservice2020/phpmorphy) repository).

::: tip Composer package
mSearch uses the `cijic/phpmorphy` library — a modern fork of phpMorphy installed via Composer.
:::

## After installation

It is recommended to:

1. Go to the [Indexing](/en/components/msearch/interface/indexes) tab
2. Clear the existing index
3. Create the index again

This ensures words are processed correctly with the new dictionary.

## File location

Dictionaries are stored in a subdirectory per language:

```
core/components/msearch/phpmorphy/dicts/{ru|en|de|uk}/
```

Each dictionary is a set of phpMorphy files: `.bin` (`common_aut`, `morph_data`, `predict_aut`, `gramtab`) and `options.{locale}.ini`, named by locale (`ru_ru`, `en_en`, `de_de`, `uk_ua`).

## Working without dictionaries

If dictionaries are not installed or have been removed:

- The search keeps working
- Morphological analysis is disabled
- The search uses only exact matches and LIKE queries
- Search quality drops significantly

## Multilingual sites

For multilingual sites install all the dictionaries you need. mSearch detects the language of each word by its letters and applies the matching dictionary:

| Letters in the word | Dictionary |
|---------------------|------------|
| `і`, `ї`, `є`, `ґ` | Ukrainian |
| Other Cyrillic | Russian |
| `ä`, `ö`, `ü`, `ß` | German |
| Other Latin | English |

A German word without umlauts or `ß` is processed by the English dictionary.

### Example

The site has content in Russian and English:

1. Install the `ru` dictionary
2. Install the `en` dictionary

During search:

- The word «телефоны» → processed by the Russian dictionary
- The word "phones" → processed by the English dictionary

## Dictionary sizes

| Dictionary | Size |
|------------|------|
| ru (Russian) | ~10 MB |
| en (English) | ~5 MB |
| de (German) | ~15 MB |
| uk (Ukrainian) | ~8 MB |

::: warning Disk space
The sizes in the table are approximate — dictionaries are downloaded from an external repository. Make sure the server has enough space.
:::

## Differences from mSearch2

| Aspect | mSearch2 | mSearch |
|--------|----------|---------|
| Library | Bundled phpMorphy | Composer package `cijic/phpmorphy` |
| Dictionary source | SourceForge | GitHub |
| Ukrainian dictionary | Yes | Yes |
| Estonian dictionary | Yes | No |
| Interface | ExtJS | Vue 3 + PrimeVue |
| Installation | During package install | Manually via the interface |
