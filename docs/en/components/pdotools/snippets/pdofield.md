# pdoField

This snippet combines [getResourceField][1] and [UltimateParent][2]: it outputs any field of a specified resource or its parent, including TV parameters.

Unlike those, it works with documents in any context and allows extra select parameters (e.g. to exclude fields of hidden resources). With **&class** you can get a field of any MODX object. Can be used as [output filter][3].

## Parameters

Accepts [general pdoTools select and output parameters][4] plus:

| Parameter        | Default           | Description |
|------------------|-------------------|-------------|
| **&id**          | Current document  | Resource ID. |
| **&field**       | `pagetitle`       | Resource field. |
| **&top**         |                   | Selects parent of **&id** at level **&top**. |
| **&topLevel**    |                   | Selects parent of **&id** at **&topLevel** from context root. |
| **&default**     |                   | Resource field to return if **&field** is empty. Faster than *:default=* filter. |
| **&output**      |                   | String to return if both **&default** and **&field** are empty. |
| **&toPlaceholder** |                 | If set, snippet stores data in placeholder instead of outputting. |

*If **&top** or **&topLevel** is used and **&context** is not set, an extra DB query will determine the context.*

Snippet does not support chunks; it returns only one field value.

## Examples

As output filter:

```modx
[[*id:pdofield=`longtitle`]]
```

Parameters as JSON. Second parent and its longtitle:

```modx
[[*id:pdofield=`{"top":2,"field":"longtitle"}`]]
```

Regular call is faster and clearer:

```modx
[[pdoField?
  &id=`[[*id]]`
  &field=`longtitle`
  &top=`2`
]]
```

[1]: http://rtfm.modx.com/extras/revo/getresourcefield
[2]: http://modx.com/extras/package/ultimateparent
[3]: /en/system/basics/output-filters
[4]: /en/components/pdotools/general-properties
