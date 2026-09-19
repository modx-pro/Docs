---
title: Workflow
description: Draft, publish via MODX Save, basket, copy, and preview in the PageBuilder editor
---

# Workflow

The editor lives on the resource **Sections** tab. You build the page from blocks. Autosave keeps the draft. **Save** on the MODX resource publishes sections to the site.

## Draft and published version

PageBuilder stores two copies of the document in `pb_pages`:

| Layer | Storage | Who sees it |
| --- | --- | --- |
| Draft | `draft_json` | Editor, preview in the tab |
| Published | `published_json`, counter `published_revision` | `[[!PageBuilder]]` snippet on the site |

The resource **Content** field (`modResource.content`) is not touched. Resource SEO fields (pagetitle, description) work as usual.

The site always shows only the published snapshot. You can edit the draft as long as you like: it reaches the storefront after Save resource.

::: warning The MODX resource must also be published
Even with published sections, the page will not open if the MODX resource itself is unpublished.
:::

## Typical cycle

1. Open the resource → **Sections** tab (needs `pagebuilder_view` and `view` on the resource).
2. **Add section** → in the catalog tab **Blocks**, with Pro also **Examples** and **Shared blocks** → pick a type → open **Properties** and fill fields.
3. While the inspector is open for a newly added section, autosave pauses. **Cancel** rolls the draft back to the state before the add. After save the section stays in the document.
4. Reorder by drag or **Alt+↑** / **Alt+↓** with a selected section in the list.
5. Autosave periodically sends the draft to the server (`mgr/page/save`). This does not affect the site.
6. **Preview** opens a drawer with a draft iframe (not a public URL). Preview saves a dirty draft before opening.
7. **Save** MODX resource: validate → draft (if dirty) → `mgr/page/publish`. Check the page on the frontend with `[[!PageBuilder]]`.
8. **Unpublish** (if available in the UI) removes sections from the site via `mgr/page/unpublish`. The draft in the editor remains.

There is no separate **Publish** button and no "Not on site yet" badge on the **Sections** tab (since 1.0.9).

The toolbar has a **table / editorial list** toggle. Default comes from `pagebuilder_resource_view_mode` (`editorial` or `table`). The manager choice is stored in `localStorage`. The editorial list has an enable/disable toggle on each row.

The sidebar block **Delivery and API** shows Public API and Agent API URLs for the current resource and the revision number.

First page walkthrough: [Quick start](quick-start).

## Save and revision

The client sends connector `mgr/page/save` with the draft `revision` number. The server compares revision with the database.

If two editors (or two tabs) saved the same resource at once, the response is `revision_conflict`. The editor reloads the document from the server. Refresh the tab and save again; do not set revision manually.

Before publish (Save resource) the client validates required fields (`required: true` in the type JSON). On error the inspector opens for the first problematic section.

Plugin events: `pbOnBeforeSave`, `pbOnAfterSave` (draft mode). In `pbOnBeforeSave` extensions can replace the document via `PageDocumentBag`. `changes` carries `DocumentChangeSet`: ids of sections that were added, removed, trashed, restored, enabled, or disabled.

## Section visibility {#visibility}

Rules for showing a section on the site (contexts, UTM, Pro `conditions`, context copy) live in `section.settings`. In the inspector they open via **Visibility** when `pagebuilder_inspector_visibility_enabled = 1`. By default the setting is off: the editor shows content fields only.

Without the button, rules in JSON still work on the frontend if set earlier or via API. Details: [Frontend output → Visibility](frontend#section-visibility).

## Responsive in the inspector

With `pagebuilder_responsive_editor_enabled = 1`, suitable fields get a tablet icon: different values for desktop / tablet / mobile. Collapse back: **One value for all screens** (uses desktop) unless the field schema has hard `responsive: true`. While the setting is off, there are no device tabs. Saved breakpoint maps on the site still work until the editor saves the field as a single value.

Thresholds and output mode: [System settings → Responsive](settings#responsive-breakpoints).

## Publish and unpublish

**Publish** (`mgr/page/publish`), usually from Save resource:

- copies the current draft to `published_json`;
- increments revision;
- clears render cache for resource `pagebuilder/{resourceId}`.

**Unpublish** (`mgr/page/unpublish`) clears the published snapshot. The draft is unchanged. On the site the snippet stops outputting sections.

Events: `pbOnBeforePublish`, `pbOnAfterPublish`, `pbOnBeforeUnpublish`, `pbOnAfterUnpublish`.

## Section order and duplicate

In the section list (outline):

- drag changes order in the draft;
- **Alt+↑** / **Alt+↓** move the selected section (handy from the keyboard);
- **Duplicate** creates a copy with a new `id` in the same draft.

After duplicate or reorder, wait for autosave or save the resource to fix and publish the state.

## Page basket (Free)

Deleting a section does not erase it immediately. The block goes to **Basket** on the same tab (`document.trash[]` inside the draft).

| Action | What happens |
| --- | --- |
| To basket | Section moves to `trash`, `settings` keeps `_trashIndex` for restore at the same position |
| Restore | Section returns to the previous index or the end of the list |
| Delete permanently | Entry is removed from `trash` |
| Restore all / clear | Bulk restore or permanent delete with confirmation |

Events: `pbOnBeforeTrash`, `pbOnAfterTrash`.

This is the basket for **one page**. It does not show sections from other resources.

## Global basket (Pro)

On draft save a plugin on `pbOnAfterSave` syncs the `pb_basket_items` table. Deleted sections and table rows from different resources land there.

| Where | Purpose |
| --- | --- |
| Resource editor → **Basket** | On-page restore and permanent delete in this page draft (Free) |
| [Control panel → Basket](cmp#basket-pro) | Cross-resource list, restore to source resource, permanent delete (Pro) |

Restore from the control panel inserts the section at `settings._trashIndex`, same as the local basket.

## Copy between resources

**Copy sections** calls connector `mgr/copy/sections`. Specify the source resource ID. Needs `view` on the source, `save` on the target, and the `pagebuilder_save` permission.

Events: `pbOnBeforeCopySections`, `pbOnAfterCopySections`.

The whole source draft is appended to the end of the current page draft. The source is not changed. The site updates after **Save** on the target page.

In Pro additionally: **Pull from another page** (`mgr/library/pull`) in Link or Copy mode. See [PageBuilder Pro](pro#shared-blocks).

## Undo and redo

Undo and redo live in editor memory until a successful draft save to the server. After `mgr/page/save` local action history resets.

Quick edits to one field merge into one undo entry: undo restores the last value, not each keystroke.

## Draft preview

The public page URL shows only published sections. View the draft via:

- **Preview** on the **Sections** tab (saves a dirty draft before opening);
- drawer with iframe; viewport width from `pagebuilder_responsive_breakpoints` (default 1280 / 768 / 390);
- direct URL `{assets_url}components/pagebuilder/preview.php` with a signed token (`pagebuilder_preview_secret`).

Template CSS and extra styles for the iframe: `pagebuilder_preview_include_template_css` and `pagebuilder_preview_css_urls`. Details: [Frontend output → Preview](frontend#draft-preview).

## HTML cache on the site

After publish or unpublish, render cache `pagebuilder/{resourceId}` is cleared.

The snippet with `use_cache=1` (default) caches final HTML in MODX. If you edit Fenom chunks or a plugin on `pbOnBeforeRenderSection`, publish the page again (Save resource) or temporarily call the snippet with `use_cache=0`, then clear site cache.

Render events run only on cache miss. To debug a render plugin, disable snippet cache.

## Demo data (Fake)

With `pagebuilder_fake_enabled = 1`, the section inspector shows **Fake**. Connector `mgr/section/fake` fills fields with deterministic demo data (the same seed gives the same result).

Useful for layout and screenshots. Replace fake values with real content before publishing to production.

## Related pages

- [Quick start](quick-start)
- [Frontend output](frontend)
- [Control panel](cmp)
- [Manager and events](integration)
- [Snippets](snippets/)
