---
title: VoteForms
description: Voting and polls system for MODX Revolution
logo: https://modstore.pro/assets/extras/voteforms/logo-lg.jpg
author: me6iaton
modstore: https://modstore.pro/packages/utilities/voteforms
repository: https://github.com/me6iaton/VoteForms
---
# VoteForms

Voting and polls system for MODX Revolution

![](https://file.modx.pro/files/b/a/7/ba7e5f21b01fb0787c8f9e983acb4c99.png)

[Github][1]
[Latest releases][2]

## Features

- Form constructor for voting in modx manager
- Voting results with sorting and search in modx manager
- Forms and voting results on the site, live updates via ajax
- Bind results to a resource or other object by creating a new thread

## System settings

| Name                     | Default                               | Description                                                                                                                                                                |
| ------------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **voteforms_assets_url** | `{assets_url}components/voteforms/`   | URL to frontend files                                                                                                                                                       |
| **voteforms_core_path**  | `{core_path}components/voteforms/`    | Path to component                                                                                                                                                           |
| **voteforms_frontend_css**| `[+cssUrl]]web/voteforms.css`        | Path to CSS file. To use custom styles - specify path here, or clear and load manually via site template.     |
| **voteforms_frontend_js**| `[[+jsUrl]]web/voteforms.js`          | Path to JS file. To use custom scripts - specify path here, or clear and load manually via site template.     |

## VoteForm snippet parameters

| Name       | Default              | Description                                                           |
| ---------- | -------------------- | --------------------------------------------------------------------- |
| **id**     |                      | Form id, required                                                      |
| **thread** | `resource-[[*id]]`   | Thread name for results. Default `resource-[[*id]]`                    |
| **tplRow** | `tpl.VoteForms.row`  | Chunk for each field                                                   |
| **tplOuter**| `tpl.VoteForms.outer`| Chunk for whole output                                                 |
| **sortby** | `index`              | Sort field                                                             |
| **sortdir**| `ASC`                | Sort direction                                                         |
| **submit** | `false`              | Use submit button in form                                              |

## getVoteFormRating snippet parameters

| Name       | Default                 | Description                                                           |
| ---------- | ----------------------- | --------------------------------------------------------------------- |
| **form**   |                         | Form id, required                                                      |
| **resource**|                        | Resource id. Default: current                                         |
| **field**  |                         | Field id - output results for this field only                         |
| **thread** | `resource-[[*id]]`      | Thread name. Default `resource-[[*id]]`                               |
| **tpl**    | `tpl.VoteForms.rating`  | Output chunk                                                           |
| **stars**  | `true`                  | Output rating widget or not                                            |

## Usage

```modx
[[VoteForm? &id=`1`]]
```

```modx
[[getVoteFormRating?form=1]]
```

```modx
[[getVoteFormRating?form=1&field=2]]
```

With pdoResources: sort resources by rating from form id 1

```modx
[[pdoResources?
  &class=`modResource`
  &parents=`0`
  &tpl=`@INLINE <li>[[+pagetitle]] - <span class="badge">[[+rating]]</span> </li>`
  &leftJoin=`{
    "VoteFormThread": {
      "class": "VoteFormThread",
      "on": "modResource.id = VoteFormThread.resource AND VoteFormThread.form = 1"
    }
  }`
  &select=`{
    "modResource": "*",
    "VoteFormThread": "rating"
  }`
  &sortby=`VoteFormThread.rating`
  &sortdir=`DESC`
]]
```

## Placeholders in component chunks

### VoteForm - tpl.VoteForms.outer

output, rating_max, snippet call parameters

### VoteForm - tpl.VoteForms.row

- VoteFormField: id, index, form, name, description, type
- User vote result: record, rating_max

### getVoteFormRating - tpl.VoteForms.rating

- VoteFormThread: id, resource, form, name, rating, users_count
- VoteFormForm: form.id, form.name, form.description, form.active, form.rating_max
- With field parameter:
  - VoteFormField: field.id, field.index, field.form, field.name, field.description, field.type
  - rating and users_count for this field
- Voting widget: stars

## Development

Report suggestions and bugs to [Github][3].

[1]: https://github.com/me6iaton/VoteForms
[2]: https://github.com/me6iaton/VoteForms/releases
[3]: https://github.com/me6iaton/VoteForms/issues
