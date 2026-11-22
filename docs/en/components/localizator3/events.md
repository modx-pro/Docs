---
title: Events
description: Localizator3 events for saving localizations, finding a language, and building tabs
---

# Events

## Resource localizations

| Event | When | Parameters |
| --- | --- | --- |
| `OnBeforeSaveLocalization` | Before create and update | `mode`, `id`, `data`, `localizatorContent` (object), `object` |
| `OnSaveLocalization` | After create and update | `mode` (`new` / `upd`), `id`, `localizatorContent` (object), `object`. No `data` or `objectType` keys |
| `OnBeforeRemoveLocalization` | Before remove | `id`, `localizatorContent`, `object` |
| `OnRemoveLocalization` | After remove | `id`, `localizatorContent`, `object` |

## Languages

| Event | When | Parameters |
| --- | --- | --- |
| `OnBeforeSaveLocalizatorLanguage` | Before create and update of a language | `mode`, `id`, `data`, `localizatorLanguage` (object), `object` |
| `OnSaveLocalizatorLanguage` | After create and update of a language | `mode` (`new` / `upd`), `id`, `localizatorLanguage` (object), `object`. No `data` or `objectType` keys |

## Language and resource resolution

| Event | When | Parameters |
| --- | --- | --- |
| `OnBeforeFindLocalization` | Before language lookup by host and URL | `language` (by reference), `http_host`, `request`. A non-empty string from the plugin aborts the lookup. `return false` does not stop it. Nothing is printed to the page |
| `OnFindLocalization` | After a lookup attempt, including when no language was found | `language`, `http_host`, `request`. Not fired when `OnBeforeFindLocalization` aborted or on auto-detect 302 redirect |
| `OnToggleLocalizatorLanguage` | After the current language is applied | `language`, `language_key`, `http_host`, `request`. On a full page and via the connector (Referer) it fires for every found language. Skip when key and `cultureKey` are unchanged only for a repeated set via the `language` parameter or cookie |
| `OnFindLocalizatorResource` | When resolving a resource | `resource` (by reference, starts `false`), `request`. If the plugin set `resource`, the built-in `findResource()` is not called |
| `OnHasLocalizatorError404` | Before a 404 when localization is missing | `resource`, `language_key`. Only when `localizator3_404_if_no_localization` is on, the language key is non-empty, and fields are not taken from the base-language resource |

::: warning
Return `false` from an `OnHasLocalizatorError404` handler to skip the error page. The core may still log that the plugin failed.
:::

## Localization form

| Event | When | Parameters |
| --- | --- | --- |
| `OnBuildLocalizationTabs` | Building form tabs | Depends on the calling processor |

Active Vue tab path (`mgr/content/getformconfig`). `localizatorContent` is always `null`, `tabs` (by reference), `resource`, `user`, `customization` (by reference with `user_id`, `resource_id`, `context_key`, `class_key`). You can add fields via `tabs` and `customization` if the change lands in `$modx->event->returnedValues` and the plugin output is empty.

Legacy processor `mgr/fields`. `localizatorContent` by reference. `tabs` and `customization` not by reference. `customization` only has `user_id` and `resource_id`. After the event the form reads only `tabs` (via `$modx->event->returnedValues['tabs']` when plugin output is empty). `customization` is not applied to the form.
