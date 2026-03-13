# Status mapping

Map miniShop2 order statuses to amoCRM pipeline stages for automatic sync.

## Manager

Mapping is configured in CMP: **Apps** → **amoConnector** → **Status mapping** tab.

Each row has:

| Field | Description |
|-------|-------------|
| **ms2 status** | miniShop2 order status |
| **amoCRM pipeline** | Pipeline ID in amoCRM |
| **amoCRM status** | Stage (status) ID in that pipeline |
| **Active** | Enable/disable this mapping |

## Forward sync (MODX → amoCRM)

When an order status changes in miniShop2:

1. Component checks for a mapping for the new status
2. If found and the order is linked to a lead — updates the lead stage in amoCRM
3. If not found — operation is skipped without error

::: info
When creating a new order the initial status is not mapped — the lead is created with default pipeline settings.
:::

## Reverse sync (amoCRM → MODX)

With **amoconnector.sync_statuses_from_amo** enabled and webhook configured:

1. amoCRM sends a notification when a lead stage changes
2. Component finds the linked order in `amo_order_link`
3. Looks up reverse mapping: amoCRM stage → ms2 status
4. Updates the order status in miniShop2

## Example

| ms2 status | amoCRM pipeline | amoCRM stage |
|------------|-----------------|--------------|
| New | 12345 | 67890 (New request) |
| Paid | 12345 | 67891 (Payment received) |
| Shipped | 12345 | 67892 (In delivery) |
| Completed | 12345 | 142 (Successfully closed) |
| Cancelled | 12345 | 143 (Closed lost) |

::: tip
Pipeline ID can be copied from the amoCRM URL. Stage IDs — via dev tools by selecting the status column in the pipeline.
:::
