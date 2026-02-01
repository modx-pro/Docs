# msPointsIssue.Order

The `msPointsIssue.Order` snippet calculates order cost. It acts as a wrapper: runs the logic, fills placeholders, then runs snippets from the elements list in order. The last one must be the native `msOrder` snippet.

![msPointsIssue.Order](https://file.modx.pro/files/4/f/d/4fd49fd13aea3c258b83d37597d5b0bc.png)

## Parameters

| Parameter         | Default              | Description                                                                                          |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------------- |
| **tpl**           | `msPointsIssue.order`| Output chunk                                                                                          |
| **userFields**    |                      | Associative array mapping order fields to user profile fields: "order_field" => "profile_field".     |
| **processedBlocks** |                    | JSON-encoded string of chunks to process                                                            |

::: tip
You can also use other [general pdoTools parameters][0104].
:::

## Output

The snippet works with a [Fenom chunk][010103] and passes 5 variables into it.

## Order form

Use this snippet together with others on the checkout page:

```modx
[[!msCart]] <!-- Cart output -->
[[!msPointsIssue.Order]] <!-- Checkout form, hidden after order is created -->
[[!msGetOrder]] <!-- Order info, shown after order is created -->
```

[0104]: /en/components/pdotools/general-properties
[010103]: /en/components/pdotools/parser
