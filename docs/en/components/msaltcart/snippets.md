# Snippets

## getCarts

Snippet for outputting carts on the page. Has a single parameter **tpls**, which takes a JSON string.

### Fenom

```fenom:line-numbers
{'!getCarts' | snippet: [
  'tpls' => '{
    "maincart": {
      "wrapper": "@FILE msac/cart.tpl","row":"@FILE msac/cartrow.tpl"
    }
  }'
]}

{'maincart' | placeholder}
```

### Standard syntax

```modx:line-numbers
[[!getCarts?
  &tpls=`{
    "maincart": {
      "wrapper":"@FILE msac/cart.tpl","row":"@FILE msac/cartrow.tpl"
    }
  }`
]]

[[+maincart]]
```

:::danger
Do not mix syntax: if the snippet is called with standard syntax, use standard placeholders. Use only letters and digits in placeholder names.
:::

:::danger
The object key in the tpls parameter is the placeholder name used in the template.
:::

## msacConnector

Snippet that handles frontend requests. Never call it manually.
