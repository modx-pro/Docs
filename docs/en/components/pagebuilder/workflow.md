---
title: Workflow
description: Draft, publish, basket, and section copy in the PageBuilder editor
---

# Workflow

## Draft and published

| Layer | Storage | Who sees it |
| --- | --- | --- |
| Draft | `draft_json` in `pb_pages` | Editor, preview |
| Published | `published_json` + `published_revision` | `[[!PageBuilder]]` snippet |

PageBuilder does not fill `modResource.content`.

## Save and revision

The client sends `mgr/page/save` with the current `revision`. The server compares revision. On mismatch it returns `revision_conflict` and the client reloads the document.

Before publish the client validates required fields and opens the inspector on the first failing section.

## Publish and unpublish

`mgr/page/publish` copies the draft to the published snapshot, increments revision, clears resource render cache.

`mgr/page/unpublish` clears the published snapshot. Draft is unchanged.

## Per-page basket (Free)

Deleted sections go to **Basket** (`document.trash[]` in the draft).

| Action | Behavior |
| --- | --- |
| Move to basket | Section in `trash`, `_trashIndex` saved for restore |
| Restore | Section at previous index (or end) |
| Delete permanently | Remove from `trash` |
| Restore all / clear | Bulk restore or permanent delete with confirmation |

Events: `pbOnBeforeTrash`, `pbOnAfterTrash`.

In parallel, a plugin on `pbOnAfterSave` syncs `pb_basket_items` for the [global CMP basket](cmp#basket-pro) (Pro).

## Copy and duplicate

**Copy sections** uses processor `mgr/copy/sections`. Specify the source resource ID. Requires save permission on both resources. Events: `pbOnBeforeCopySections`, `pbOnAfterCopySections`.

**Duplicate** in the outline creates a copy with a new `id` in the draft. Save the draft to persist on the server.

## Undo / redo

Action history in the editor until the draft is saved to the server.

## Draft preview

**Preview** button on the tab or URL `preview.php` with a signed token (`pagebuilder_preview_secret`). Details: [Frontend output → Draft preview](frontend#draft-preview).

## Front render cache

After publish or unpublish the cache partition `pagebuilder/{resourceId}` is invalidated. If you edit chunks or render plugins, publish again or clear MODX cache.

## Fake data

When `pagebuilder_fake_enabled = 1`, the inspector **Fake** button fills fields with deterministic demo data (`mgr/section/fake`).

## Related pages

- [Quick start](quick-start)
- [CMP](cmp)
- [Snippets](snippets)
