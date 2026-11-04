# Several sites

One PostCraft install can send letters on behalf of several domains. The manager page and the mailing database live on one site, the **hub**. The other domains work as **edge** sites: they take the clicks from letters and forward them to the hub.

## How PostCraft picks the site

The site of a letter follows the domain of the From mailbox. A letter from `news@shop.example.org` leads to `https://shop.example.org/mail/…`, `…/unsubscribe/…` and `…/t.php`. The recipient sees the same domain in the links as in the sender address.

## Site catalog

Sites are listed in the `postcraft_sites` system setting (JSON). On install PostCraft writes the current site there under the `main` key. Add a second domain by hand:

```json
{
  "main": {
    "label": "example.com",
    "base": "https://example.com",
    "domains": ["example.com", "www.example.com"],
    "langs_source": "contexts"
  },
  "shop": {
    "label": "shop.example.org",
    "base": "https://shop.example.org",
    "domains": ["shop.example.org"],
    "langs": [
      {"key": "en", "label": "English"},
      {"key": "de", "label": "Deutsch", "home": "https://shop.example.org/de/"}
    ]
  }
}
```

| Key | Meaning |
|---|---|
| `label` | name in the manager lists |
| `base` | site URL for letter links |
| `domains` | email domains that belong to this site |
| `langs_source` | `contexts`: languages come from the MODX contexts of this site |
| `langs` | edge site languages by hand: key, label and the home URL if needed |

Then add a mailbox with an address on that domain. Unsubscribe pages for the new site appear on the Unsubscribe page tab.

## Edge on MODX

If the second domain runs MODX too:

1. Install the PostCraft package there.
2. In the edge system settings set `postcraft_role` = `edge` and `postcraft_hub_url` = the hub URL, for example `https://example.com`.
3. Copy the hub value of `postcraft_edge_secret` into the same setting on the edge.

The PostCraft plugin on the edge catches `/mail/…` and `/unsubscribe/…`, and `t.php` forwards tracking to the hub.

## Edge without MODX

For a site on another CMS or a static site the package ships a separate client, `assets/components/postcraft/edge-standalone/`:

1. Copy the folder to the second site under the same path.
2. Create `config.php` from `config.sample.php`:

    ```php
    return array(
        'hub_url' => 'https://example.com',
        'site' => 'shop',
        'secret' => 'value of postcraft_edge_secret on the hub',
    );
    ```

3. Add the rules from `htaccess.snippet` to the root `.htaccess` of the site (Apache).

## Security

The edge signs every request to the hub with HMAC, a shared secret and a timestamp. The hub accepts only requests with a valid signature, its handler is `assets/components/postcraft/edge.php`. PostCraft generates the secret on install. If it leaks, set a new one on the hub and on every edge.
