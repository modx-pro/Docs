# Trigger on order status change

## Creating the trigger

Goal: detect order status changes in RetailCRM and send that information to the site.

1. Create a new trigger in RetailCRM. Name it e.g. **changeStatus**.
2. Set event: **Order change**.
3. Set condition (when the trigger runs):

   ```php
   changeSet.hasChangedField("status") and changeSet.getNewValue("status")
   ```

4. Set action: **HTTP request**.
5. Set URL: your site (e.g. `https://site.ru/`). For MODX, use the site root or homepage.
6. Method: **POST**.
7. Request parameters:

   | Name               | Value                            |
   | ------------------ | --------------------------------- |
   | retailCRM_action   | `change_status`                   |
   | status             | <span v-pre>`{{order.getStatus().getCode()}}`</span> |
   | order_id           | <span v-pre>`{{order.getExternalId()}}`</span>       |

8. Save.

When the order status changes in RetailCRM, a POST request is sent to the site with these parameters.

### Handling on the site

The modRetailCRM plugin receives the request, finds the order by ID and sets the corresponding status. Ensure in miniShop2 that each order status has the **RetailCRM status code** set, and that **modretailcrm_sync_statuses** is filled in modRetailCRM system settings.
