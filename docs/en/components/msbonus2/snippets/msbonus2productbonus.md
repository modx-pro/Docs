# msBonus2ProductBonus

Outputs the number of bonuses the user will get if they order this product.

Bonuses are taken first from component settings (Resources tab) for the product or its category. If nothing is set there, for logged-in users the amount is shown according to their level.

## Parameters

| Name    | Default                 | Description                          |
|---------|-------------------------|--------------------------------------|
| **id**  | `$modx->resource->get('id')` | Resource ID.                    |
| **guest** | `0`                    | Show for guests (0 = no, 1 = yes).   |
| **tpl** | `@INLINE {$bonus}`      | Chunk for output.                    |

## Examples

### On product page

```fenom
{var $product_bonus = ('!msBonus2ProductBonus' | snippet: ['id' => $_modx->resource.id])}
{if $product_bonus?}
  <i>You will earn {$product_bonus | decl : 'bonus|bonuses|bonuses' : true} when you buy this product.</i>.
{/if}
```

#### In product chunk (in category listing)

```fenom
{var $product_bonus = ('!msBonus2ProductBonus' | snippet: ['id' => $id])}
{if $product_bonus?}
  <i>You will earn {$product_bonus | decl : 'bonus|bonuses|bonuses' : true} when you buy this product.</i>
{/if}
```

#### Show for all visitors (not only logged-in)

```fenom
{var $product_bonus = ('!msBonus2ProductBonus' | snippet: ['id' => $id, 'guest' => true])}
{if $product_bonus?}
  <i>You will earn {$product_bonus | decl : 'bonus|bonuses|bonuses' : true} when you buy this product.</i>
{/if}
```
