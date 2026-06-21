---
title: SVRegions
description: Regional data for multiple domains and subdomains in a single MODX installation
logo: /components/svregions/screenshots/logo.webp
author: rumata-estor
---

# SVRegions

**SVRegions** detects the current region by domain or subdomain and exposes the associated data through MODX placeholders.

The component is intended for projects where the main domain and regional subdomains are served by one MODX installation and share the same resources, templates, and chunks.

For example:

```text
example.com
spb.example.com
kazan.example.com
samara.example.com
```

When `spb.example.com` is opened, the component selects the Saint Petersburg record. When `kazan.example.com` is opened, it selects the Kazan record.

Adding a new region does not require creating a separate context or duplicating website resources. You only need to point the subdomain to the existing MODX installation and add a regional record.

Standalone domains are also supported if they are served by the same MODX installation from one document root.

## Features

SVRegions provides:

* region detection by the current domain or subdomain;
* one MODX installation for the main website and regional domains;
* shared resources, templates, and chunks;
* adding a new region with one record;
* centralized management of regional data;
* enabling and disabling regions directly in the manager table;
* inheritance of empty values from the primary region;
* support for third-level subdomains and standalone domains;
* no dependency on GeoIP;
* experimental CSV import and export through MIGX.

## Requirements

* MODX Revolution 2.6.0–2.8.x;
* MIGX 2.13.0 or later;
* PHP and MySQL versions compatible with the installed MODX version.

> **Important:** MODX Revolution 3 is not supported by the current version because the component uses MIGX/MIGXdb for the MODX 2 branch.

## Installation

Create a backup of the website files and database before installing or updating the component.

The normal commercial installation is performed from the Modstore repository through the MODX package manager.

1. Make sure the Modstore provider is configured and available in the MODX package manager.
2. Find SVRegions in the Modstore repository and download the package.
3. Install MIGX if the package manager offers to install it.
4. Start the SVRegions installation.
5. Enter the primary domain without a protocol or path.
6. Clear the MODX cache after installation.

On a clean installation, a demonstration record for the primary region is created only if a record for the specified domain does not already exist.

The demonstration record contains Moscow and VDNKh example data. Replace the city, address, phone numbers, map, reviews, and all other example values before publishing the website.

## Domain configuration

SVRegions does not create domains or subdomains and does not configure DNS, the web server, or SSL certificates.

Before configuring the component:

1. create the domain or subdomain;
2. point its DNS record to the website server;
3. add the domain to the hosting or web server configuration;
4. point it to the document root of the current MODX installation;
5. issue and configure an SSL certificate;
6. verify that the domain opens the same MODX website.

All regional domains must be served by one MODX installation from one document root.

The region record must contain the exact domain name without:

* `http://` or `https://`;
* a path;
* a port;
* a trailing slash.

Correct:

```text
spb.example.com
```

Incorrect:

```text
https://spb.example.com/
spb.example.com/catalog/
spb.example.com:443
```

## Primary domain

The primary domain is specified during component installation.

It can later be changed in the `defaultHost` property of the SVRegions plugin. The `svregions.default_host` system setting is used as a fallback value.

Enter the domain without a protocol, path, port, or trailing slash:

```text
example.com
```

The primary region record must be enabled.

The primary region is used:

* for the main domain;
* when no enabled record is found for the current domain;
* when the current domain record is disabled;
* as the source of fallback values for empty fields in other regions.

## Region detection

During request processing, SVRegions retrieves the current host name from `HTTP_HOST`.

The component then:

1. finds an enabled record with the matching domain;
2. loads the primary region record;
3. fills empty fields of the current region with values from the primary region;
4. sets MODX placeholders with the `region` prefix.

Only records with the following values are used:

```text
published = 1
deleted = 0
```

If the current domain record is absent or disabled, the primary region data is used.

## Region management

After installation, a **Regions** section based on MIGX/MIGXdb appears in the main MODX manager menu.

The section allows you to:

* add and edit regional records;
* change domains and regional data;
* enable and temporarily disable regions;
* permanently remove records that are no longer needed.

### Enabling and disabling regions

A region's state can be changed directly in the table by clicking the icon in the **Active** column:

* a green tick means that the region is enabled;
* a red cross means that the region is disabled.

A context menu is also available for every record:

* **Edit**;
* **Publish**;
* **Unpublish**;
* **Remove**.

Unpublishing does not delete any data. A disabled record can be enabled again at any time.

If the current domain record is disabled, SVRegions uses the primary region data.

### Removing a record

The **Remove** action permanently deletes the regional record from the database.

> **Important:** A permanently removed record cannot be restored through SVRegions. Create a backup before removing important data.

## Region fields

The default configuration contains the following fields:

| Field | Purpose |
| --- | --- |
| Domain | Exact domain or subdomain of the region |
| City | City name |
| Prepositional case | Form used in phrases equivalent to “in Moscow” or “in Kazan” |
| Genitive case | Form used in phrases equivalent to “from Moscow” or “for Kazan” |
| Postal code | Postal code of the regional office |
| Address | Address of the office or representative location |
| Primary phone number | Phone number in display format |
| Primary phone link | Number for the `tel:` attribute |
| Secondary phone number | Second phone number in display format |
| Secondary phone link | Second number for the `tel:` attribute |
| Yandex Maps link | URL of the organization card or map point |
| Yandex Maps embed code | HTML code of the embedded map |
| Yandex reviews widget | HTML code of the reviews widget |
| Active | Controls the `published` field |

## Value inheritance

Empty fields in a regional record inherit values from the primary region.

For example, each region may have its own:

* city;
* address;
* postal code;
* map;
* reviews;

while phone fields remain empty. In this case, the phone numbers are taken from the primary region record.

Only empty values are inherited. If a field is filled in the regional record, its own value is used.

## Placeholders

After detecting the region, the component sets the following placeholders:

| Data | Placeholder |
| --- | --- |
| Domain | `[[+region.domain]]` |
| City | `[[+region.city]]` |
| Prepositional case | `[[+region.locative]]` |
| Genitive case | `[[+region.genitive]]` |
| Postal code | `[[+region.index]]` |
| Address | `[[+region.address]]` |
| Primary phone number | `[[+region.phone]]` |
| Phone number for a `tel:` link | `[[+region.phone_link]]` |
| Secondary phone number | `[[+region.phone_2]]` |
| Secondary phone number for a `tel:` link | `[[+region.phone_2_link]]` |
| Yandex Maps link | `[[+region.yandex_link]]` |
| Yandex Maps embed code | `[[+region.yandex_map]]` |
| Yandex reviews widget | `[[+region.yandex_review]]` |
| Record ID | `[[+region.id]]` |
| Creation date | `[[+region.createdon]]` |
| Last modified date | `[[+region.editedon]]` |

The `published` and `deleted` system fields are not exposed as placeholders.

## Using placeholders

Placeholders are inserted into regular MODX templates and chunks.

Example:

```html
<h1>Contacts in [[+region.locative]]</h1>

<p>
  [[+region.index]], [[+region.address]]
</p>

<p>
  <a href="tel:[[+region.phone_link]]">
    [[+region.phone]]
  </a>
</p>
```

The same template displays Saint Petersburg data on `spb.example.com` and Kazan data on `kazan.example.com`.

The page structure and main content remain shared. Only the regional values change.

## Demonstration chunk

The package includes the `SVRegionExample` chunk with ready-to-use examples of regional placeholders.

It can be:

* temporarily added to a test page;
* used as a reference;
* copied and adapted to your own markup.

The chunk is not connected to website pages automatically.

## CSV import and export

SVRegions supports basic import and export of regional records through MIGX.

The feature has experimental status.

Before importing:

1. create a database backup;
2. export the existing records first;
3. use the exported file as a structure example;
4. do not change the names of system columns;
5. test the data on a test installation.

> **Important:** Import can modify existing regional records. Do not run it on a production website without a backup.

## Caching

SVRegions sets placeholders during request processing.

If old values are still displayed after editing regional data:

1. clear the MODX cache;
2. clear the cache of the template engine or third-party component, if used;
3. clear the server cache or CDN;
4. check the page in a private browser window.

When full HTML page caching is used, the domain must be included in the cache key. Otherwise, one domain may receive a cached page containing another region's data.

## Difference from contexts

SVRegions does not replace MODX contexts or multilingual components.

Contexts and multilingual solutions are required when the following differ:

* website structure;
* resource tree;
* templates;
* language versions;
* access permissions;
* settings of individual website sections.

SVRegions is intended for a different scenario: the website structure, resources, templates, and main content remain shared, while a limited set of regional data changes depending on the domain.

## Limitations

SVRegions:

* does not create domains or subdomains;
* does not configure DNS;
* does not modify the web server configuration;
* does not issue SSL certificates;
* does not detect a visitor's location by IP address;
* does not switch cities automatically;
* does not create separate pages for regions;
* does not replace SEO configuration for regional domains.

## Uninstallation

A normal package uninstall removes:

* the SVRegions plugin and its event bindings;
* the `SVRegionExample` chunk;
* the manager menu item;
* the MIGX configuration;
* system settings;
* the component namespace;
* component files;
* the SVRegions category if it is empty after the component elements are removed.

The regional table and existing regional records are preserved.

The saved data becomes available again after reinstalling the component.

To remove all data permanently, delete the SVRegions table separately after creating a backup.

## Compatibility

* MODX Revolution 2.6.0–2.8.x;
* MIGX 2.13.0 or later;
* MODX Revolution 3 is not supported;
* development and primary testing were performed on MODX Revolution 2.8.8.

## Author

Alexander Palochkin
