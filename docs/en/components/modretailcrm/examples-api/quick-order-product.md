# Quick order (one-click buy)

Many stores have a one-click order button. The client only enters contact data; the rest is pre-filled.

Two common implementations:

1. Simple request form — sends email to manager; everything else is manual. No online store required.
2. Form that uses miniShop2 API and creates a real order with preset data.

## Create order via miniShop2 API

Example: create an order in miniShop2 via API. The modRetailCRM plugin will pick it up and send it to RetailCRM.

Simple form on the page:

```fenom
{'!ajaxForm' | snippet: [
  'form' => '@INLINE
    <form>
      <div class="form-group">
        <label>Name</label>
        <input class="form-control" type="text" name="name" value="" placeholder="Name">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input class="form-control" type="text" name="phone" value="" placeholder="Phone">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="text" name="email" value="" placeholder="Email">
      </div>
      <input type="hidden" name="productId" value="137">
      <button type="submit" class="btn btn-primary">Buy</button>
    </form>
  ',
  'hooks' => 'msQuickOrder',
]}
```

Contact fields plus product ID (from page or manual). Form uses ajaxForm → FormIt.

Create snippet **msQuickOrder** and add it as a hook. It initializes miniShop2, clears cart, adds the product, sets order fields (receiver, phone, email, payment, delivery), and calls `$miniShop2->order->submit()`. The modRetailCRM plugin then sends the order to RetailCRM.

### Create order manually via hook (no miniShop2)

Same form, but the hook sends the order straight to RetailCRM (no miniShop2). Use when miniShop2 is not used.

Create snippet **quickOrderToRetailCRM** as form hook: get form data, init modRetailCRM, build order/customer data (externalId, customer externalId, items from product ID), create customer in RetailCRM if needed, then `$modRetailCrm->request->ordersCreate($orderData)`.
