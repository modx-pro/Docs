---
title: Permissions
---
# Permissions

mxQuickView has no page under **Components** and no manager UI permission of its own.

## What is checked on render

Resource access is enough if **any one** of these holds:

- `resource->checkPolicy('view')`
- `resource->checkPolicy('load')`
- `$modx->hasPermission('view')`

The request context must match the resource `context_key` (when `context` is passed).
The resource must be published: `published=1`, valid `pub_date`/`unpub_date`, or the `view_unpublished` permission.

If the user cannot view the resource, the connector returns `Access denied`.

## Practice

No separate component-page permissions to configure. Access is controlled by standard MODX policies on resources and contexts.
