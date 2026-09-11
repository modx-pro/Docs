---
title: Component settings
description: EasyFavicon system settings
---

# Component settings

MODX namespace: `easyfavicon`.

| Key | Default | Description |
| --- | --- | --- |
| `easyfavicon.api_key` | — | RealFaviconGenerator API key, free at [realfavicongenerator.net/api](https://realfavicongenerator.net/api/) |
| `easyfavicon.auto_inject` | `Yes` | The plugin puts the markup before `</head>` on every page |
| `easyfavicon.auto_inject_profile` | — | Profile name or id for auto injection; empty means the active one |
| `easyfavicon.files_path` | `/favicon/` | Files directory for new profiles, path from the site root |
| `easyfavicon.master_picture` | — | Master picture for new profiles: absolute URL or path from the site root |
| `easyfavicon.manifest_name` | — | `name` in `site.webmanifest`; empty means `site_name` |
| `easyfavicon.manifest_short_name` | — | `short_name` in `site.webmanifest`; empty means `site_name` |
| `easyfavicon.timeout` | `60` | Seconds to wait for the API and the set download |
| `easyfavicon.interactive_url` | `https://realfavicongenerator.net/api/favicon_generator` | RealFaviconGenerator interactive API address |
