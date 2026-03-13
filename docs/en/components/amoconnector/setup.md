# Installation and setup

## System settings

### amoCRM connection

| Name | Description |
|------|-------------|
| **amoconnector.enabled** | Global integration on/off |
| **amoconnector.client_id** | Integration ID (from amoCRM app settings) |
| **amoconnector.client_secret** | Integration secret |
| **amoconnector.redirect_uri** | OAuth redirect URI (must match amoCRM) |
| **amoconnector.subdomain** | amoCRM account subdomain (e.g. `mycompany` for `mycompany.amocrm.ru`) |

### Pipelines and statuses

| Name | Default | Description |
|------|---------|-------------|
| **amoconnector.default_pipeline_id** | | Pipeline ID for order leads |
| **amoconnector.default_status_id** | | Initial lead status |
| **amoconnector.form_pipeline_id** | | Pipeline for form leads. If empty, default pipeline is used |
| **amoconnector.form_status_id** | | Status for form leads |
| **amoconnector.responsible_user_id** | | Responsible user ID in amoCRM |

### Templates and tags

| Name | Default | Description |
|------|---------|-------------|
| **amoconnector.order_lead_name_tpl** | `Order #{num}` | Lead name template for orders. Placeholders: `{num}`, `{id}` |
| **amoconnector.form_lead_name_tpl** | `Request: {form_name}` | Lead name template for forms. Placeholder: `{form_name}` |
| **amoconnector.order_tags** | `miniShop2, site` | Tags for order leads (comma-separated) |
| **amoconnector.form_tags** | `site form` | Tags for form leads (comma-separated) |

### Other

| Name | Default | Description |
|------|---------|-------------|
| **amoconnector.webhook_secret** | | Secret for webhook verification. Auto-generated on install |
| **amoconnector.sync_statuses_from_amo** | `Yes` | Reverse sync: changing lead stage in amoCRM updates ms2 order status |
| **amoconnector.use_scheduler** | `No` | Deferred send via Scheduler |
| **amoconnector.log_retention_days** | `30` | Days to keep log entries |

## OAuth setup

### Step 1 — Create integration in amoCRM

1. Log in to amoCRM as admin
2. Go to **Settings** → **Integrations** → **Create integration**
3. Enter name, description and Redirect URI (your site URL)
4. After creation copy **Integration ID** and **Secret key**

### Step 2 — Fill settings in MODX

Set `amoconnector.client_id`, `amoconnector.client_secret`, `amoconnector.redirect_uri` and `amoconnector.subdomain`.

### Step 3 — Authorize

Open the component CMP (**Apps** → **amoConnector**) and click the authorize button on the **Settings** tab. You will be redirected to amoCRM to grant access.

After success, tokens are stored and refreshed automatically.

## Manager (CMP)

The component adds **Apps** → **amoConnector** with tabs:

- **Operation log** — all sends, errors, skips with filtering
- **Field mapping** — map order/form fields to amoCRM fields
- **Status mapping** — map ms2 statuses to amoCRM pipeline stages
- **Settings** — OAuth, connection test
