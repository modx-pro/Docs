# xCalc

Main snippet that renders the calculator form on the frontend.

## Parameters

| Parameter    | Default              | Description |
|--------------|----------------------|-------------|
| **id**       | `0`                  | Calculator ID to render. |
| **tplOuter** | `tpl.xCalc.outer`    | Calculator output chunk. |
| **tplResults** | `tpl.xCalc.results` | Chunk for calculation results. |

## Example

```fenom
{'!xCalc' | snippet: [
  'id' => 1,
  'tplOuter' => 'tpl.xCalc.outer',
  'tplResults' => 'tpl.xCalc.results',
]}
```
