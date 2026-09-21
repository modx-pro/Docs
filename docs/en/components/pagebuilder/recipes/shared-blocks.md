---
title: Shared blocks
description: "One master on several pages: Save as shared, then pull as Link or Copy. Pro layer"
---

# Shared blocks

Result: an edit to the master shows up on linked pages. Requires PageBuilder Pro and capability `library` (a shared section library).

## Before you start

1. Two published resources whose template contains `[[!PageBuilder]]`.
2. Capability `library` is on.
3. The source page already has a filled section.

## Steps

1. Build the section on the source page.
2. **Save as shared**. The current section links to the new master at once (`libraryLocalFields` is empty).
3. On the other page open **Pull from another page**. The source is the draft, not the published copy.
4. **Link** sets `libraryId` on the source and the target. **Copy** inserts sections with no link.
5. Mark fields that should differ per page in the local-fields checklist (`settings.libraryLocalFields`).
6. **Save** on the resource publishes the page. Matching fields write through to the master on `pbOnBeforeSave` (saving a linked page updates the master).

The catalog tab **Shared blocks** stays visible when the list is empty. Insert from there adds a linked section or a copy.

On the site the master merges with local fields. Without `libraryLocalFields`, local keys override the master. A Library write clears the `pagebuilder/*` HTML cache.

## Example fields

Source section `hero`, Title `Shared heading`. After **Save as shared** the local-fields list is empty, so the title is shared.

On the second page choose **Link**. In `settings.libraryLocalFields` mark `title` when that page needs its own heading. The other fields stay on the master. **Copy** inserts the same hero with no `libraryId`.

## What to check

Change a master field that is not in `libraryLocalFields` and save the source resource. The linked page shows the same value. A field on the local list of the second page is left as you set it. A Library write clears the `pagebuilder/*` cache.

## Rollback

Pull with **Copy**, or delete the library item in the CMP. Processor: `mgr/library/pull`.

## See also

- [PageBuilder Pro → Shared blocks](../pro#shared-blocks)
- [Workflow](../workflow)
