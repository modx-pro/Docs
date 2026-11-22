---
title: LLMS Forge settings and access
description: Contexts, resource visibility, AI-bot statistics, and integration event
---

# Settings and access

Settings are saved separately for each MODX context. System values under `llmsforge.*` provide defaults; context settings can override them.

| Field | Purpose |
| --- | --- |
| Site title and summary | Heading and introduction in `/llms.txt` |
| Selected and excluded IDs | Link selection and order; up to 5000 selected IDs |
| Sections | Group links in the main document |
| Main llms.txt | Automatic generation or manual Markdown |
| TVs and miniShop3 fields | Additional properties in automatic cards |
| Publication | Enable public routes after saving |

Export excludes deleted, unpublished, non-searchable, resource-group protected, and inaccessible pages. It also checks `view` permission, publication dates, and every ancestor. Selecting an ID does not guarantee that the page appears in the output.

## Resource check event

Integrations can veto additional resources through `OnLLMSForgeResourceCheck`. The handler receives `resource` and `context`. Return `exclude` to hide a resource:

```php
if ($resource->get('class_key') === 'CustomPrivateResource') {
    return 'exclude';
}
```

The built-in access checks still apply.

## AI-bot request log

The log records requests that reach MODX, with UTC time, recognized User-Agent, path, method, and status. It stores no IP address, URL query parameters, cookies, or full User-Agent. Reports cover the last 30 days, with a 5 MB daily write limit. User-Agent names can be spoofed, so these figures do not confirm reading or citations.
