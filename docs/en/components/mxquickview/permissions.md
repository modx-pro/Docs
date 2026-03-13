---
title: Permissions
---
# Permissions

mxQuickView has no dedicated page under **Components** and no manager UI permission of its own.

## What is checked on render

- Resource access is checked in the processor:
  - `resource->checkPolicy('view')`
  - `resource->checkPolicy('load')`
  - `hasPermission('view')`
- Request context must match resource `context_key` (when `context` is passed).
- Resource must be published: `published=1`, valid `pub_date`/`unpub_date`, or `view_unpublished` permission.

If the user cannot view the resource, the connector returns `Access denied`.

## Practice

- No separate component page permissions to configure.
- Access is controlled by standard MODX policies on resources and contexts.
