# Common mistakes

## Check that settings are filled

For miniShop2 orders:

- **amoconnector.enabled** — integration on
- **amoconnector.client_id**, **amoconnector.client_secret**, **amoconnector.redirect_uri** — OAuth data
- **amoconnector.subdomain** — amoCRM subdomain
- **amoconnector.default_pipeline_id** — pipeline ID for orders

For forms additionally:

- **amoconnector.form_pipeline_id** — pipeline for forms (or set `default_pipeline_id`)
- Hook `amoConnectorHook` added to FormIt call

## Correct subdomain

**amoconnector.subdomain** must be only the subdomain. For CRM at `mycompany.amocrm.ru` use `mycompany`, not the full URL.

## SSL error with Scheduler

When running Scheduler via cron (CLI) you may see:

```
SSL certificate problem: self signed certificate in certificate chain
```

This is due to missing `curl.cainfo` in the CLI php.ini. Find the CLI php.ini and add the path to CA certificates:

```ini
curl.cainfo = "/path/to/cacert.pem"
```

## OAuth token not received

If the component does not work after authorization:

1. Ensure **Redirect URI** in amoCRM matches `amoconnector.redirect_uri` exactly
2. Clear MODX cache
3. Authorize again from CMP

## Leads not created

Checklist:

1. **amoconnector.enabled** is on
2. Test connection via the "Test" button on the Settings tab in CMP
3. Open the **Log** tab in CMP — look for entries with `action = error`
4. Check MODX log (core/cache/logs/error.log) for `[amoConnector]` errors
5. Ensure pipeline ID is correct
6. Clear cache and try again

## Duplicate leads

The component prevents duplicates: on order creation it checks `amo_order_link`. If the link exists, a new lead is not created. If duplicates still appear — check that `handleNewOrder()` is not called from custom code.
