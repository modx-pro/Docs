---
title: autoRedirector
description: Add-on so you don't have to worry when page URLs change
logo: https://modstore.pro/assets/extras/autoredirector/logo-lg.jpg
author: ilyautkin
modstore: https://modstore.pro/packages/utilities/autoredirector
modx: https://extras.modx.com/package/autoredirector
repository: https://github.com/ilyautkin/autoRedirector
---
# autoRedirector

Add-on so you don't have to worry when page URLs change.

After installation, the plugin watches for URL changes and stores old URLs in a separate table. When a user follows an old link, the plugin redirects them to the current URL, so they see the right page instead of 404.

Any auto-created redirect rule can be edited or removed manually.

The plugin tracks URL changes when:

- A resource is edited (old URLs are stored for the resource and its children);
- A child resource is created (URL change when a resource becomes a container);
- A resource is moved in the tree (parent change).

Because one action in the Manager can change URLs for many resources, performance may drop (saves can take longer), especially with deep resource trees.

## Planned

- System setting to limit how deep the tree is checked for URL changes;
- Option to exclude certain resources from checking;
- Instead of storing changes for all children, resolve the URL when the user visits to find the current page.
