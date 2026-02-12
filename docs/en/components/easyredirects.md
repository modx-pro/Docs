---
title: easyRedirects
description: Manage redirects (301, 302, 307, 308) on your MODX Revolution site
author: createit-ru
modstore: https://modstore.pro/packages/utilities/easyredirects
repository: https://github.com/createit-ru/easyRedirects
---
# easyRedirects

The easyRedirects add-on for MODX Revolution (built for MODX 2, works on MODX 3) lets you manage redirects from old page URLs to new ones from the Manager.

All features are in a single section: **Packages** / **easyRedirects**. There you can create and view redirect rules.

## Component features

- Create any number of redirect rules in the Manager.
- Choose status code (301, 302, 307, 308).
- Use simple URL pairs, e.g. catalog/telefony => catalog/phones.
- Use regex with replacements, e.g. ^catalog\/category-(.*)$ => catalog/$1.
- View redirect stats (hit count, first and last hit time).
- Add labels to rules (e.g. "old redirects", "redirects_2023").
- See who created or updated a redirect (createdon, createdby, updatedon, updatedby in modx_easy_redirects).
- Auto-track URL changes (without child depth) and create redirects — see system setting easyredirects_track (same as Redirector).
- Bulk import rules from CSV.

Redirects only work if the request reaches MODX; they will not apply when the request is handled by the web server (e.g. static files).

## How it works

- The plugin fires on OnPageNotFound and compares the requested URL (without query string) to the rules.
- Exact URL matches are checked first, then regex rules.
- When a rule matches, a redirect is sent with the chosen status code.

## System settings

- **easyredirects_track** — When enabled, the component creates a new redirect when a resource URI is changed on edit. Note: child resource URI changes are not tracked.

## Example rules

**Single page redirect:**

> url: catalog/phones/iphone-13-cherniy
> target: catalog/phones/iphone-13-black

or

> url: catalog/telephony
> target: catalog/phones

**Regex rule to move all pages under a section:**

> url: ^catalog\\/telephony\\/(.*)$
> target: catalog/phones/$1

The URL regex must start with ^ and end with $; slashes must be escaped. The target is not regex but can use $1, etc.

The URL must not include the site domain or a leading slash.

## Status codes

**301 Moved Permanently** — Resource has permanently moved; future requests should use the new URL.

**302 Found (Moved Temporarily)** — Resource has temporarily moved; use the new URL for this request only.

**307 Temporary Redirect** — Like 302 but the client must keep the HTTP method when following.

**308 Permanent Redirect** — Like 301 but the client must keep the HTTP method when following.
