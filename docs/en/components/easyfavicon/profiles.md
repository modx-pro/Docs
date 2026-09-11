---
title: Profiles
description: Several favicon sets, the active profile, the build result and the manifest
---

# Profiles

A profile is a picture, a files directory and the result of the latest build: a set of files and the markup.

## Active profile

There is one active profile. The plugin puts its markup on the pages, and its files are in the site directory. To change the active profile, turn the switch on for another one in the Active column.

EasyFavicon stores the archive of every build in `core/packages/easyfavicon/`. On switching, the profile publishes its files again, so you can keep, say, a regular and a holiday favicon and swap them in one click.

::: tip
If the profile archive could not be stored (the directory is not writable), switching changes only the markup, and the site keeps the files of the latest build. EasyFavicon warns about it — build the profile again.
:::

Two profiles with the same directory share its files. Building an inactive profile into that directory stores the archive but does not publish the set until the profile becomes active.

## Result

The View button shows the build result:

- favicon preview across browsers and mobile;
- the markup the plugin puts on the pages;
- the list of files in the set;
- the RealFaviconGenerator builder version.

The markup can be copied, but you need that only if auto injection is off.

## Editing and deleting

Edit opens the name, directory, description and picture of the profile. After changing the picture or the directory, build the profile again.

Deleting a profile leaves the files on disk.

## Manifest

RealFaviconGenerator puts a `site.webmanifest` with placeholders instead of the app name and without `start_url` into the set. After unpacking, EasyFavicon completes the manifest with the site's data:

| Field | Source |
| --- | --- |
| `name` | `easyfavicon.manifest_name`, otherwise `site_name` |
| `short_name` | `easyfavicon.manifest_short_name`, otherwise `site_name` |
| `start_url`, `id` | `base_url` |
| `lang` | `cultureKey` |

Only empty fields and the service's placeholders are filled: a name entered in the RealFaviconGenerator editor stays as it is. The manifest is completed on every publish — both after a build and on switching profiles.
