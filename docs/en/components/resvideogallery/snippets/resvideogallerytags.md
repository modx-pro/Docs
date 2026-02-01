# ResVideoGalleryTags

Snippet for outputting a tag cloud with filtering.

## Parameters

| Parameter       | Default                 | Description                                                                                                                                                                                                          |
|-----------------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **parents**     |                          | Comma-separated list of parent IDs for the search. By default the search is limited to the current parent. Use 0 for no limit.                                                                                       |
| **resources**   | Current resource ID      | Comma-separated list of resource IDs to include. If an ID is prefixed with a minus sign, that resource is excluded.                                                                                                   |
| **showInactive**| `0`                      | Include inactive video.                                                                                                                                                                                              |
| **limit**       | `0`                      | Number of videos to output. Use 0 for no limit.                                                                                                                                                                      |
| **offset**      | `0`                      | Number of results to skip from the start.                                                                                                                                                                            |
| **sortby**      | `tag`                    | Sort field.                                                                                                                                                                                                          |
| **sortdir**     | `ASC`                    | Sort direction.                                                                                                                                                                                                     |
| **where**       |                          | JSON string for the SQL WHERE clause. Example: &where={"template":15} (no TV).                                                                                                                                       |
| **tagsVar**     | `tag`                    | If set, the snippet reads the "tags" value from $_REQUEST["name"]. E.g. if you set "tag", the snippet only outputs files matching $_REQUEST["tag"].                                                                   |
| **tpl**         | `resVideoGalleryTagsTpl` | Fenom chunk for the snippet output.                                                                                                                                                                                   |
