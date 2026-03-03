---
title: multiLingual
description: Multilingual sites without contexts
logo: https://modstore.pro/assets/extras/multilingual/logo-lg.jpg
author: azernov
modstore: https://modstore.pro/packages/other/multilingual

items: [
  { text: 'Translation principle', link: 'translation-principle' },
  { text: 'Problem solving', link: 'problem-solving' },
  {
    text: 'Interface',
    items: [
      { text: 'Adding languages', link: 'interface/add-language' },
      { text: 'Adding translations to fields', link: 'interface/add-language-field' },
    ],
  },
  {
    text: 'Snippets',
    items: [
      { text: 'mlLanguagesLinks', link: 'snippets/mllanguageslinks' },
    ],
  },
]
---
# multiLingual

The multiLingual component implements multilingual sites without extra contexts, unlike Babel.

Out of the box it fits most small sites such as landing pages or simple catalogs.

For more complex sites that use various extras and store entities that need to be translated, the component must be extended.

## Component settings

The component requires friendly URLs to be enabled.

The component requires pdoTools version 2.8.2 or higher (lower versions were not tested).

Before using the component, set the `ml_default_site_url` setting.
Set the default site URL there, e.g. `https://mysite.ru/`

## Multi-context sites

If your site has more than one context and you want multilingual versions for each, define `ml_default_site_url` in every context.

For example, you have two sites on one MODX installation: `http://mysite.com` and `https://mynewsite.ru`.

In the first site's context set `ml_default_site_url` to `http://mysite.com/`

In the second context — `https://mynewsite.ru/`

**Note the trailing slash.**

The mlSetLanguage plugin must run after the plugin that switches contexts. So in the mlSetLanguage plugin settings, set the priority for the `OnHandleRequest` event higher than your context switcher.

### Resource queries and pdoTools

When using pdoTools snippets for resource queries (pdoResources, pdoMenu), those snippets are not aware of multiLingual, so by default they get resource fields from the database in the default language regardless of the current language.

To have those snippets return translated fields, replace two system settings:

| Setting             | Value                                                              |
|---------------------|--------------------------------------------------------------------|
| pdoFetch.class      | `mlFetch`                                                          |
| pdofetch_class_path | `{core_path}components/multilingual/model/multilingual/`          |

When querying resources in other ways, translation substitution is up to the developer.

See [Translation principle][1] for details.

## How the component works

After installation you must first add site languages, then open any resource, go to the "Translations" tab and add translations for the fields.

In system settings you can edit which fields can be translated:

* Setting `ml_resource_fields` — JSON array of fields to translate:

```json
{
  "modResource" : [
    "pagetitle",
    "longtitle",
    "content",
    "description",
    "introtext",
    "menutitle"
  ]
}
```

Key — class name, value — array of fields to translate.

* Setting `ml_resource_tv_fields` — JSON array of TV names to translate:

```json
["tv1","tv2"]
```

::: warning
Use TV **names**, not IDs.
:::

[1]:/en/components/multilingual/translation-principle
