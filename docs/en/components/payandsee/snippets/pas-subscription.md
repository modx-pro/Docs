# pas.subscription

Snippet for outputting subscriptions `pas.subscription`

![Subscriptions snippet](https://file.modx.pro/files/6/7/a/67a4c2f286f8a304b135ef555203f755.png)

## Parameters

| Parameter      | Default          | Description                                      |
|----------------|------------------|--------------------------------------------------|
| **tpl**        | `pas.subscription` | Chunk for each result row                        |
| **status**     |                  | Subscription status                              |
| **client**     |                  | Subscription client                              |
| **content**    |                  | Subscription content                             |
| **limit**      | `10`             | Maximum number of results                        |
| **sortby**     | `id`             | Sort field                                       |
| **sortdir**    | `ASC`            | Sort direction                                   |
| **where**      |                  | JSON-encoded string with extra conditions        |
| **showOverdue**| `0`              | Include expired subscriptions                    |

::: tip
You can also use other [general pdoTools parameters][0104]
:::

## Features

The `pas.subscription` snippet, like all PayAndSee snippets, uses pdoTools.
So its main parameters match [pdoResources][010101], with some differences.

### Get current user subscriptions

```fenom
{'!pas.subscription' | snippet}
```

### Placeholders

To see all available placeholders, use an empty output chunk:

```fenom
<pre>
  {'!pas.subscription' | snippet: [
    'tpl' => '',
  ]}
</pre>
```

## Examples

Get current user subscriptions into variable `$rows`:

```fenom
{var $rows = '!pas.subscription' | snippet: [
  'return' => 'data',
]}
<br>
{if !count($rows)}
  <p>You have no active subscriptions.</p>
{else}
  {foreach $rows as $row}
    {'pas.subscription' | chunk : $row}
  {/foreach}
{/if}
```

Output with pagination:

```fenom
{'!pdoPage' | snippet: [
  'element' => 'pas.subscription',
  'client' => $_modx->user.id,
]}
{'page.nav' | placeholder}
```

[0104]: /en/components/pdotools/general-properties
[010101]: /en/components/pdotools/snippets/pdoresources
