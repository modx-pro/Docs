# msOptions

Snippet for outputting product options stored as JSON.

By default these are `size`, `color`, and `tags`; you can add more by [extending the product model][1].

[![](https://file.modx.pro/files/1/0/8/10862fe28a33bfa2894728e711afb61cs.jpg)](https://file.modx.pro/files/1/0/8/10862fe28a33bfa2894728e711afb61c.png)

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msOptions` | Output chunk |
| **product** | | Product id. If omitted, current resource id is used. |
| **options** | | Comma-separated list of options to output. |

## Output

The snippet expects a [Fenom chunk][2] and passes one variable **$options** (array of option values).

To see all placeholders, use an empty chunk:

```modx
<pre>
  [[msOptions?
    &options=`color,size`
    &tpl=``
  ]]
</pre>
```

[![](https://file.modx.pro/files/f/a/c/fac9abd11c65a700d5ab2f5ff7cd075es.jpg)](https://file.modx.pro/files/f/a/c/fac9abd11c65a700d5ab2f5ff7cd075e.png)

The default chunk outputs options as a `select` for adding to cart with the product.

[1]: /en/components/minishop2/development/product-plugins
[2]: /en/components/pdotools/parser
