---
title: Snippets
description: Overview of YandexMapsLocator snippets
---

# Snippets

| Snippet | Package | Purpose |
|---------|-------|------------|
| [YandexMapsLocator](YandexMapsLocator) | Free | List + map + search |

**Pro does not add its own snippets.** Filters `working_now` and `minishop_product`, fields `is_open_now`, and REST are wired by a plugin on top of the same snippet.

Frontend calls must be **uncached** (`[[!...]]`, `{'!...' | snippet}`).
