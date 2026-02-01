# Search

Tab for testing search queries in the admin panel.

## Purpose

Use this tab to test search with the same logic as the [mSearch](/en/components/msearch/snippets/msearch) snippet. Results include all resources, including unpublished and deleted.

## Interface

### Search form

- **Input** — enter the search query
- **Search button** — run search (or press Enter)

### Results table

| Column | Description |
|--------|-------------|
| ID | Resource ID |
| Title | Page title (pagetitle) |
| Weight | Result relevance |

## Use cases

- **Check indexing** — ensure expected pages are found
- **Debug morphology** — see how word forms are handled
- **Test aliases** — verify synonyms work
- **Tune weights** — adjust field weights

## Search algorithm

1. Query is split into words
2. [Aliases](/en/components/msearch/interface/aliases) (synonyms and replacements) are applied
3. Base forms are found via morphological analysis for each word
4. Words are looked up in the index
5. Additional LIKE search over full text
6. Exact-match bonuses applied
7. Sort by relevance

## Note

Resources without **searchable** checked do not appear in search.
