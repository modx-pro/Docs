# Integrations

mFilter integrates with popular MODX components.

## Supported components

| Component | Description |
|-----------|----------|
| [MiniShop3](minishop3) | E‑commerce |
| [mSearch](msearch) | Full-text search |

## How integration works

mFilter works via the `element` parameter — any snippet that returns resources:

```php
[[!mFilter?
    &element=`msProducts`    // MiniShop3
    &element=`mSearch`       // mSearch
    &element=`pdoResources`  // pdoTools
    &element=`getTickets`    // Tickets
]]
```

## Element/Paginator mode

mFilter passes filtered IDs to the external element:

```
1. element gets all IDs (returnIds=1)
2. mFilter filters IDs
3. element renders filtered IDs
4. paginator handles pagination
```

### Flow

```
┌─────────────┐    IDs    ┌─────────────┐
│   element   │ ────────► │   mFilter   │
│ (msProducts)│           │  (filters)  │
└─────────────┘           └──────┬──────┘
                                 │
                          filtered IDs
                                 │
                                 ▼
                         ┌─────────────┐
                         │  paginator  │
                         │  (pdoPage)  │
                         └──────┬──────┘
                                │
                             HTML
                                │
                                ▼
                         ┌─────────────┐
                         │   Browser   │
                         └─────────────┘
```

## Compatibility

### Element requirements

The element must support:

- Parameter `resources` — list of IDs to output
- Parameter `returnIds` — return IDs instead of HTML

### Paginator requirements

The paginator must support:

- Parameter `element` — snippet for rendering
- Parameter `resources` — list of IDs
