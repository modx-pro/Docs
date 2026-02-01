---
title: SEO Domains
description: Add extra domains for the site without contexts, with Yandex Webmaster integration
logo: https://modstore.pro/assets/extras/seodomains/logo-lg.png
author: tventos
modstore: https://modstore.pro/packages/other/seodomains
---

# SEO Domains

**SEO Domains** adds extra domains and subdomains for the site, with import from XLSX and automatic addition to Yandex Webmaster.

## Features

- Manage extra domains and subdomains (site.ru, spb.site.ru, astana.site.kz, site.by, brest.site.by)
- Change content per resource for each domain/subdomain
- Quick copy of any domain
- Manage extra fields per domain
- Import domains and extra fields from XLSX
- Add and verify ownership in Yandex Webmaster
- Auto-fetch address coordinates
- User city selection

![Features](https://file.modx.pro/files/a/3/8/a383a4aa9f1cf74ed56d2a20d2a831e9.png)

## Usage example

To add a domain go to Applications -> Cities and domains, click Add, fill in the fields

![Usage example - 1](https://file.modx.pro/files/a/0/1/a011c73b53e50c8c89710b8cba7eb055.png)

To add an extra field for a domain, go to Additional fields tab, click Add, enter the key (available via placeholder, e.g. `[[!+sd.price_1]]`) and other fields.

![Usage example - 2](https://file.modx.pro/files/3/3/8/338adad21de164b1e35b5541f9366cb8.png)

## Placeholders

- `[[!+sd.domain]]` — Domain
- `[[!+sd.city]]` — City
- `[[!+sd.city_r]]` — City (declension)
- `[[!+sd.phone]]` — Phone
- `[[!+sd.email]]` — E-mail
- `[[!+sd.address]]` — Address
- `[[!+sd.address_full]]` — Full address
- `[[!+sd.coordinats]]` — Coordinates

## Content per resource per city

After installation each resource has a new "Cities and domains" tab.

### Table with all cities and their content

![Table with all cities and their content](https://file.modx.pro/files/0/3/6/036157ea0d4e7b3c25ec6f6dd443ea87.png)

### Example adding content for a city

![Example adding content](https://file.modx.pro/files/6/3/6/63620f3942354a53c55193924951d359.png)

After adding content the `content` placeholder is replaced with the correct content based on the domain.

## City selection on site

Call snippet `SeoDomainsList` where needed.

### Full parameter example

:::code-group

```modx
[[SeoDomainsList?
  &tpl=`SeoDomains.City.tpl`
  &sortby=`city`
  &sortdir=`ASC`
  &activeClass=`active`
  &limit=`10`
  &showLog=`0`
]]
```

```fenom
{'SeoDomainsList' | snippet: [
  'tpl' => 'SeoDomains.City.tpl',
  'sortby' => 'city',
  'sortdir' => 'ASC',
  'activeClass' => 'active',
  'limit' => 10,
  'showLog' => 0,
]}
```

:::

![Full parameter example](https://file.modx.pro/files/5/7/2/572fdc490c5744b76da388e4eba8373f.png)

## Adding site to Yandex Webmaster

Register an app at <https://oauth.yandex.ru/>, select "Adding sites to Yandex Webmaster, getting indexing status". After getting `ID`, go to `https://oauth.yandex.ru/authorize?response_type=token&client_id=ID`, copy `token` and save it in app settings under key `seodomains_token`.

## Domain management via MODX admin

Add a wildcard subdomain to Site aliases (e.g. `*.seodomains.tyrsyna.ru`). Non-existent domains redirect to the main domain from settings (`seodomains_main_host`).

![Domain management via MODX admin](https://file.modx.pro/files/2/0/7/207d143762c6b2b502e7b1684d541dcds.jpg)

## Component settings

- `seodomains_city_fields` — Table fields
- `seodomains_cyrillic_domain` — Set Yes for Cyrillic domains
- `seodomains_html_parent` — Parent of HTML resources for domain verification
- `seodomains_main_host` — Main host
- `seodomains_phx_prefix` — Placeholder prefix
- `seodomains_token` — Yandex OAuth token

## FAQ

::: details Where is the xlsx import example?
Example is in `assets/components/seodomains/import`
:::

::: details How to add extra fields via XLSX?
Open the example in `assets/components/seodomains/import`, find **Additional fields** row, insert JSON array:

```json
[
  {"name":"Your field name (optional)","key":"Your extra field key","value":"Its value"},
  {"name":"Your 2nd field name (optional)","key":"Your 2nd extra field key","value":"Its value"}
]
```

:::
