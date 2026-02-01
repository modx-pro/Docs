# pdoUsers

Snippet for outputting site users via pdoTools.

Builds a user list with groups and roles.

## Parameters

Uses all [general pdoTools params][1] except those specific to *modResource*, plus its own:

| Parameter         | Default | Description |
|-------------------|---------|-------------|
| **&groups**       |         | Comma-separated user groups. Names or ids. Prefix with minus (-) to exclude. |
| **&roles**        |         | Comma-separated roles. Names or ids. Prefix with minus (-) to exclude. |
| **&users**        |         | Comma-separated users. Username or id. Prefix with minus (-) to exclude. |
| **&showInactive** | `0`     | Include inactive users |
| **&showBlocked**  | `0`     | Include blocked users |
| **&returnIds**    |         | Set to `1` to return comma-separated ids instead of rendered output. All templates ignored. |
| **&showLog**      | `0`     | Extra debug info. Only for users in "mgr" context. |
| **&toPlaceholder**|         | If set, stores data in placeholder instead of outputting. |
| **&wrapIfEmpty**  |         | Output wrapper chunk even when no results. |
| **&tplWrapper**   |         | Wrapper chunk. Placeholder `[[+output]]`. Not used with **&toSeparatePlaceholders**. |

## Overridden pdoTools parameters

| Parameter  | Default      | Description |
|------------|--------------|-------------|
| **&class** | `modUser`    | User class |
| **&sortby**| `modUser.id` | Sort field. JSON for multiple. Use "RAND()" for random. |
| **&sortdir**| `ASC`       | Sort direction: "DESC" or "ASC". |

All templates are empty by default. For HTML output, set at least **&tpl**.

## Examples

Without params, outputs all site users:

```modx
[[!pdoUsers]]
```

Output users in Authors group:

```modx
[[!pdoUsers?
  &groups=`Authors`
  &tpl=`tpl.Authors.author`
  &sortdir=`asc`
]]
```

With pdoPage/getPage:

```modx
[[!pdoPage?
  &element=`pdoUsers`
  &groups=`Authors`
  &tpl=`tpl.Authors.author`
  &sortdir=`asc`
]]
```

Inline chunk:

```modx
[[!pdoUsers?
  &roles=`Member`
  &tpl=`@INLINE <p>Name - [[+fullname]], ID - [[+id]]</p>`
  &sortby=`id`
  &sortdir=`asc`
]]
```

## Demo

[Authors and friends output](https://modstore.pro/authors) from Simple Dream repo.

![Demo](https://file.modx.pro/files/b/7/9/b792406326ccd13a79ce417c6e7d2306.png)

[1]: /en/components/pdotools/general-properties
