# cfField snippet

Snippet for outputting city-specific data by key. Each call runs a database query, which can slow page load if the snippet is used many times. In most cases it is better to use placeholders set by the `cityFields` plugin on page load.

## Parameters

| Name  | Default       | Description                                                                                                                                            |
|-----------|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **&key**  |                    | Placeholder name to output. Write without the prefix                                                                     |
| **&city** | Current city ID | City ID, key or name for which to output data. Using key or name causes an extra database query |

## Call examples

The **&key** parameter is required. A typical call:

```modx
[[!cfField? &key=`phone`]]
```

To output data for a specific city regardless of the current selection, add **&city**:

```modx
[[!cfField? &key=`address` &city=`5`]]
```

The snippet can also be used as a Fenom modifier:

```fenom
{'phone' | cffield} or {'address' | cffield : 5}
```
