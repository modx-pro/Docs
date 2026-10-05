---
title: Key and key file
description: indexnow_key and {key}.txt for domain verification
---

# Key and key file

IndexNow requires a key and a file on the site so the search engine can verify domain ownership. Yandex describes this in [IndexNow support](https://yandex.com/support/webmaster/indexing-options/index-now.html) and [key file help](https://yandex.com/support/webmaster/indexnow/key.html).

## Key

On install IndexNow:

1. generates a key (usually 32 hex characters),
2. stores it in `indexnow_key`,
3. creates `{key}.txt` in the site web root.

Key rules: length 8–128, characters `a-z`, `A-Z`, `0-9`, `-`.

Change the key in system settings. After a change, update or recreate the file in the web root.

## Key file

Path: `{web_root}/{key}.txt`.

Content: **only** the key value, no spaces, HTML, or extra text.

Example: key `abc123def456`, file `/abc123def456.txt`, body:

```text
abc123def456
```

The file must be reachable at a public URL on the same host you send to IndexNow (e.g. `https://example.com/abc123def456.txt`).

## Multiple domains

Each public document root crawlers use needs its own `{key}.txt` with the same key. The package uses one `indexnow_key` per site by default.

More on hosts and contexts: [Contexts and domains](contexts).

## Verification

On IndexNow → **Status**, check **Key file**. **Test connection** also validates key, file, and endpoint.
