---
title: SEO Suite
description: SEO Suite automatically redirects broken links (404) to suitable pages
logo: https://modstore.pro/assets/extras/seosuite/logo-lg.png
author: Sterc
modstore: https://modstore.pro/packages/ecommerce/seosuite
modx: https://extras.modx.com/package/seosuite
repository: https://github.com/Sterc/seosuite
---
# SEO Suite

[SEO Suite](https://www.sterc.nl/en/modx-extras/seosuite) by [Sterc](https://www.sterc.nl/en/) is a paid MODX extra that automatically redirects broken links (404) to suitable pages on your site.
Broken links are common when migrating from an old site to a new one.
SEO Suite ensures visitors are redirected to the right page when they follow old links.

By uploading a single-column .csv file with broken links, SEO Suite finds similar pages on your site and redirects to them automatically.
Matching is based on the link content after the last slash `/`.

## Workflow

1. Collect broken links in a single-column .csv file via export or add manually. Ensure full URLs including scheme. Example: <https://modx.org> not modx.org.
2. Import the .csv file into SEO Suite.
3. SEO Suite matches broken links with your site pages:
   - Single match: automatically converted to 301 redirect and added to SEO Tab.
   - Multiple matches: choose the page manually.
   - No matches: enter the target URL manually.

## Requirements

For SEO Suite to work:

- [SEO Tab](https://www.sterc.nl/en/modx-extras/seotab) (2.0 or newer). Stores 404 redirects.
- [MODX 2.5.0 or newer](https://modx.com/download).

## Future features

- Auto-tracking of 404 pages and adding them to SEO Suite. Dashboard widget with 10 latest 404s.
- 301 redirect stats: admin page with 301 redirect statistics. Dashboard widget with 10 most-used redirects.
- Auto-import of 404 pages from Google Search Console.

## Feedback and bug reports

Feedback and bug reports are welcome. Please submit on the project [Bitbucket](https://bitbucket.org/sterc/seosuite/issues?status=new&status=open) page.
