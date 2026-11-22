---
title: Custom section type
description: "JSON, a chunk, and registration via pbOnRegisterSectionDefinitions or a CMP UI type"
---

# Custom section type

Result: the type shows up in the **Blocks** catalog. JSON shape and chunk paths are in [section definition](../developer#section-definition).

## Before you start

Do not edit `core/components/pagebuilder/sections/`. A package upgrade overwrites that folder. A UI type needs the `pagebuilder_manage_types` permission.

## Plugin

1. Keep the JSON next to your component.
2. Create a chunk whose name matches the `chunk` field.
3. In **Elements → Plugins** create a plugin, subscribe it to `pbOnRegisterSectionDefinitions`, read the JSON, and call `$registry->register(SectionDefinition::fromArray(...))`.

```php
<?php

use PageBuilder\Section\SectionDefinition;

switch ($modx->event->name) {
    case 'pbOnRegisterSectionDefinitions':
        /** @var \PageBuilder\Section\SectionRegistry $registry */
        $registry = $modx->event->params['registry'];
        $path = $modx->getOption('core_path') . 'components/mypackage/sections/custom.json';
        $payload = json_decode((string) file_get_contents($path), true);
        if (!is_array($payload)) {
            break;
        }
        $payload['source'] = 'code';
        $payload['readOnly'] = true;
        $registry->register(SectionDefinition::fromArray($payload));
        break;
}
```

A key with the `_` prefix (such as `_qa_field_matrix`) and `category: dev` stay out of the catalog. An underscore inside the key (`contact_form`, `data_table`) does not hide the type. `SectionRequirementChecker` evaluates `requires`.

## What to check

The key is visible in the catalog on the **Sections** tab.

## UI type (Pro)

Create the type in the control panel through `mgr/sectiontype/*`. The row lives in `pb_section_types`. A PageBuilder upgrade does not overwrite those rows.

## Rollback

Hide the type in the panel, or remove the `register()` call.

## Example: a Case type

You need the `pagebuilder_manage_types` permission. In CMP **Blocks** create a type with key `case`, label Case, category `content`.

| name | type | label |
| --- | --- | --- |
| `title` | text | Title |
| `client` | text | Client |
| `image` | image | Photo |
| `description` | textarea | What was done |
| `result` | text | Result |

Chunk named in the `chunk` field:

```html
<section class="pb-section pb-section--case">
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    {if $client}<p class="pb-lead">{$client|escape}</p>{/if}
    {if $description}<p>{$description|escape}</p>{/if}
    {if $result}<p>{$result|escape}</p>{/if}
  </div>
</section>
```

Output the image with the `pagebuilder_partial_image` partial, same as the [image](../sections/image) section.

## See also

- [Developer](../developer)
- [Section catalog](../sections/)
