# pas.content

Snippet for outputting content `pas.content`

![Content snippet](https://file.modx.pro/files/a/8/c/a8cc2deec25e633e863ed7794541efbb.png)

## Parameters

| Parameter            | Default       | Description                                                                                  |
|----------------------|---------------|----------------------------------------------------------------------------------------------|
| **tpl**              | `pas.content` | Chunk for each result row                                                                    |
| **parents**          |               | Comma-separated list of parent IDs for the search. By default limited to current parent. Use 0 for no limit. |
| **status**           | `2`           | Subscription status                                                                         |
| **content**          |               | Content for subscriptions                                                                   |
| **limit**            | `10`          | Maximum number of results                                                                   |
| **offset**           |               | Number of results to skip                                                                   |
| **depth**            | `10`          | Search depth from each parent                                                               |
| **sortby**           | `id`          | Sort field                                                                                  |
| **sortdir**          | `ASC`         | Sort direction                                                                              |
| **where**            |               | JSON-encoded string with extra conditions                                                   |
| **showUnpublished**  |               | Include unpublished resources                                                               |
| **showDeleted**      |               | Include deleted resources                                                                   |
| **showHidden**       | `1`           | Include resources hidden in menu                                                            |
| **includeContent**   |               | Include resource "content" field                                                             |
| **showEmptyRate**    | `1`           | Show content with zero price                                                                |
| **processRates**     | `1`           | Process content cost                                                                         |
| **sortRates**        |               | How to sort rates. JSON string, e.g. `{"PasRate.cost":ASC}`                                  |

::: tip
You can also use other [general pdoTools parameters][0104]
:::

## Features

The `pas.content` snippet, like all PayAndSee snippets, uses pdoTools.
So its main parameters match [pdoResources][010101], with some differences.

### Getting rates

The snippet can load rates with the **processRates** parameter:

```fenom
{'!pas.content' | snippet: [
  'processRates' => 1,
]}
```

You will get a `rates` array in the chunk.

### Placeholders

To see all available placeholders, use an empty output chunk:

```fenom
<pre>
  {'!pas.content' | snippet: [
    'tpl' => '',
  ]}
</pre>
```

## Examples

Output content from category 15:

```fenom
{'!pas.content' | snippet: [
  'parents' => 15,
]}
```

Output with pagination:

```fenom
{'!pdoPage' | snippet: [
  'element' => 'pas.content',
  'parents' => 15,
]}
{'page.nav' | placeholder}
```

[0104]: /en/components/pdotools/general-properties
[010101]: /en/components/pdotools/snippets/pdoresources
