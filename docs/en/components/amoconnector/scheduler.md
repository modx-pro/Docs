# Scheduler

The component can send data to amoCRM asynchronously via [Scheduler](https://modstore.pro/packages/utilities/scheduler) from modmore. This avoids delaying the server response when placing an order or submitting a form.

## Enabling

1. Install [Scheduler](https://modstore.pro/packages/utilities/scheduler)
2. Enable **amoconnector.use_scheduler**
3. Configure cron to run Scheduler:

```
* * * * * php /path/to/site/assets/components/scheduler/run.php
```

## How it works

With Scheduler enabled, orders and forms are processed in two steps:

1. **On event** (order created, form submitted, status changed) — data is queued in Scheduler
2. **When cron runs** — Scheduler runs the task and data is sent to amoCRM

Tasks are created automatically on first use:

| Task | File | Description |
|------|------|-------------|
| `amoconnector_new_order` | `tasks/sendNewOrder.php` | Send new order |
| `amoconnector_order_status` | `tasks/sendOrderStatus.php` | Order status change |
| `amoconnector_form_submission` | `tasks/sendFormSubmission.php` | Send form data |

## Graceful degradation

If Scheduler is enabled in settings but not installed — the component falls back to synchronous send. A warning is written to the MODX log.

## Optimization

The component avoids unnecessary tasks:

- On order creation only the order send is scheduled. Initial status is not scheduled separately
- Status change is scheduled only when there is a mapping for the new status and the order is linked to a lead

## Webhook

Incoming webhooks from amoCRM are always handled synchronously, regardless of Scheduler. Webhook is a server-to-server request and does not affect site UX.
