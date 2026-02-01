# Common mistakes

Most issues fall into a few categories.

## Check that you have set

When sending form data via FormIt or AjaxForm:

- **amocrm_form_pipeline_id** — Pipeline ID for form submissions. Copy from the browser URL
- **amocrm_form_status_new** — Status ID in that pipeline. Check in dev tools

When sending miniShop2 orders:

- **amocrm_pipeline_id** — Pipeline ID. Copy from the browser URL
- **amocrm_new_order_status_id** — Status ID in that pipeline. Check in dev tools

## Correct account value

**amocrm_account** must be the subdomain of your CRM URL only.
Example: for **supershop.amocrm.ru** use **supershop**.

Do not enter the full URL or login.

## Sending to "Unassigned" column

Sending to the default "Unassigned" status (present in every pipeline) causes errors. amoCRM does not allow that. Create a separate status for incoming requests.

## If submissions do not appear right after install

Try this:

1. Double-check all points above
2. Clear the amocrm_token_field system setting
3. Set pipeline ID and status ID in the corresponding system settings
4. Recreate the integration and enter fresh values
5. Clear the cache
6. Test the form again

If it still fails, contact the component support section on modstore.pro
