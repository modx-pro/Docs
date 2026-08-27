---
title: Workflow
description: Draft, publish, basket, copy, and preview in the PageBuilder editor
---

# Workflow

The editor lives on the resource **Sections** tab. You build the page from blocks, edit the draft as long as you need, and publish to the site separately.

## Draft and published version

PageBuilder keeps two copies of the document in `pb_pages`:

| Layer | Storage | Who sees it |
| --- | --- | --- |
| Draft | `draft_json` | Editor, in-tab preview |
| Published | `published_json`, `published_revision` | `[[!PageBuilder]]` on the site |

The component does not touch the resource **Content** field (`modResource.content`). SEO fields (pagetitle, description) work as usual.

The site always shows the published snapshot only. You can change the draft freely until you click **Publish**.

::: warning The MODX resource must be published too
Even with published sections, the page will not open if the MODX resource itself is unpublished.
:::

## Typical cycle

1. Open the resource → **Sections** tab (needs `pagebuilder_view` and `view` on the resource).
2. **Add section** → pick a type in the catalog → fill fields in the inspector on the right.
3. Reorder by drag or **Alt+↑** / **Alt+↓** with a section selected in the list.
4. The draft auto-saves to the server. **Save draft** forces sync when needed.
5. **Preview** or the center preview pane shows the draft (not the public URL).
6. **Publish** copies the draft to `published_json`. Check the front with `[[!PageBuilder]]`.
7. **Unpublish** removes sections from the site; the editor draft stays.

The editor sidebar **Delivery and API** block shows Public API and Agent API URLs for the current resource and revision.

First page walkthrough: [Quick start](quick-start).

## Save and revision

The client sends connector `mgr/page/save` with the draft `revision`. The server compares it to the database.

If two editors (or two tabs) save the same resource at once, the response is `revision_conflict`. The editor reloads the document from the server. Refresh the tab and save again. Do not bump revision manually.

Before **Publish**, the client validates required fields (`required: true` in the type JSON). On failure it opens the inspector on the first failing section.

Plugin events: `pbOnBeforeSave`, `pbOnAfterSave` (draft mode). `changes` carries a `DocumentChangeSet`: ids of sections added, removed, trashed, or restored.

## Publish and unpublish

**Publish** (`mgr/page/publish`):

- copies the current draft to `published_json`;
- increments revision;
- clears render cache `pagebuilder/{resourceId}`.

**Unpublish** (`mgr/page/unpublish`) clears the published snapshot. The draft is unchanged. The snippet stops outputting sections on the site.

Events: `pbOnBeforePublish`, `pbOnAfterPublish`, `pbOnBeforeUnpublish`, `pbOnAfterUnpublish`.

## Section order and duplicate

In the section list (outline):

- drag changes order in the draft;
- **Alt+↑** / **Alt+↓** move the selected section (keyboard-friendly);
- **Duplicate** creates a copy with a new `id` in the same draft.

After duplicate or reorder, wait for auto-save or click **Save draft** to persist on the server.

## Per-page basket (Free)

Deleting a section does not erase it immediately. The block goes to **Basket** on the same tab (`document.trash[]` inside the draft).

| Action | What happens |
| --- | --- |
| Move to basket | Section goes to `trash`; `settings` stores `_trashIndex` for restore at the same position |
| Restore | Section returns to the previous index or the end of the list |
| Delete permanently | Entry removed from `trash` |
| Restore all / clear | Bulk restore or permanent delete with confirmation |

Events: `pbOnBeforeTrash`, `pbOnAfterTrash`.

This is a **single-page** basket. It does not list sections from other resources.

## Global basket (Pro)

On draft save, a plugin on `pbOnAfterSave` syncs `pb_basket_items`. It indexes sections and table rows deleted across resources.

| Where | Purpose |
| --- | --- |
| Resource editor → **Basket** | Restore into this page's draft (Free) |
| [Manager UI → Basket](cmp#basket-pro) | Cross-resource list, restore to source resource, purge (Pro) |

Restore from the manager UI inserts the section at `_trashIndex`, same as the local basket.

## Copy between resources

**Copy sections** calls connector `mgr/copy/sections`. Specify the source resource ID. Needs `save` on both resources and `pagebuilder_save` (or equivalent via policy).

Events: `pbOnBeforeCopySections`, `pbOnAfterCopySections`.

Copy moves selected blocks into the current resource's draft. This is not publish: the site updates only after **Publish** on the target page.

## Undo and redo

Undo and redo live in the editor memory until the draft is saved to the server. After `mgr/page/save`, local action history resets.

Rapid edits to one field coalesce into one undo step: undo restores the last value, not every keystroke.

## Draft preview

The public page URL shows published sections only. To view the draft:

- **Preview** button on the **Sections** tab;
- center iframe preview after save;
- direct URL `{assets_url}components/pagebuilder/preview.php` with a signed token (`pagebuilder_preview_secret`).

Template CSS and extra styles for the iframe: `pagebuilder_preview_include_template_css` and `pagebuilder_preview_css_urls`. Details: [Frontend output → Draft preview](frontend#draft-preview).

## Front HTML cache

After publish or unpublish, render cache `pagebuilder/{resourceId}` is cleared.

The snippet with `use_cache=1` (default) caches final HTML in MODX. If you edit Fenom chunks or a plugin on `pbOnBeforeRenderSection`, publish again or call the snippet with `use_cache=0`, then clear site cache.

Render events run only on cache miss. To debug render plugins, disable snippet cache.

## Fake demo data

When `pagebuilder_fake_enabled = 1`, the section inspector shows a **Fake** button. Connector `mgr/section/fake` fills fields with deterministic demo data (same seed yields the same output).

Handy for layout and screenshots. Replace fake values before publishing to production.

## Related pages

- [Quick start](quick-start)
- [Frontend output](frontend)
- [Manager UI](cmp)
- [Manager and events](integration)
- [Snippets](snippets/)
