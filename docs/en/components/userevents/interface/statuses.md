# Statuses

## Create / Edit status

To create a status, set a name and the active and reserved flags.
Default statuses:

- `new` — set on creation
- `active` — indicates activity
- `completed` — indicates completion
- `cancelled` — indicates inactivity

You can add statuses for your own component logic.
The `reserved` flag on an event blocks creating another event at the same time.

## Changing status

Change status from the Manager or via a handler.
