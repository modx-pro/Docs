---
title: Events
---
# Events and plugins

MiniShop3 uses the MODX event system to extend functionality. Plugins let you hook into cart, order, product and customer processing without changing the source code.

## Getting started

- [Working with plugins](events/plugins-guide) — how to get parameters, abort an operation, modify data, pass data between plugins

## Events by category

### Cart

| Event | Description |
|-------|-------------|
| [msOnBeforeGetCart](events/cart#msonbeforegetcart) | Before getting cart |
| [msOnGetCart](events/cart#msongetcart) | After getting cart |
| [msOnBeforeAddToCart](events/cart#msonbeforeaddtocart) | Before adding product |
| [msOnAddToCart](events/cart#msonaddtocart) | After adding product |
| [msOnBeforeChangeInCart](events/cart#msonbeforechangeincart) | Before changing quantity |
| [msOnChangeInCart](events/cart#msonchangeincart) | After changing quantity |
| [msOnBeforeChangeOptionsInCart](events/cart#msonbeforechangeoptionsincart) | Before changing options |
| [msOnChangeOptionInCart](events/cart#msonchangeoptionincart) | After changing options |
| [msOnBeforeRemoveFromCart](events/cart#msonbeforeremovefromcart) | Before removing product |
| [msOnRemoveFromCart](events/cart#msonremovefromcart) | After removing product |
| [msOnBeforeEmptyCart](events/cart#msonbeforeemptycart) | Before clearing cart |
| [msOnEmptyCart](events/cart#msonemptycart) | After clearing cart |
| [msOnGetStatusCart](events/cart#msongetstatuscart) | Getting cart status |

### Order

| Event | Description |
|-------|-------------|
| [msOnBeforeAddToOrder](events/order#msonbeforeaddtoorder) | Before adding field to order |
| [msOnAddToOrder](events/order#msonaddtoorder) | After adding field |
| [msOnBeforeValidateOrderValue](events/order#msonbeforevalidateordervalue) | Before field validation |
| [msOnValidateOrderValue](events/order#msonvalidateordervalue) | After field validation |
| [msOnErrorValidateOrderValue](events/order#msonerrorvalidateordervalue) | Validation error |
| [msOnBeforeRemoveFromOrder](events/order#msonbeforeremovefromorder) | Before removing field |
| [msOnRemoveFromOrder](events/order#msonremovefromorder) | After removing field |
| [msOnSubmitOrder](events/order#msonsubmitorder) | Order submission |
| [msOnBeforeCreateOrder](events/order#msonbeforecreateorder) | Before creating order |
| [msOnCreateOrder](events/order#msoncreateorder) | After creating order |

### Cost

| Event | Description |
|-------|-------------|
| [msOnBeforeGetCartCost](events/cost#msonbeforegetcartcost) | Before cart cost calculation |
| [msOnGetCartCost](events/cost#msongetcartcost) | After cart cost calculation |
| [msOnBeforeGetDeliveryCost](events/cost#msonbeforegetdeliverycost) | Before delivery cost calculation |
| [msOnGetDeliveryCost](events/cost#msongetdeliverycost) | After delivery cost calculation |
| [msOnBeforeGetPaymentCost](events/cost#msonbeforegetpaymentcost) | Before payment fee calculation |
| [msOnGetPaymentCost](events/cost#msongetpaymentcost) | After payment fee calculation |

### Order status

| Event | Description |
|-------|-------------|
| [msOnBeforeChangeOrderStatus](events/status#msonbeforechangeorderstatus) | Before status change |
| [msOnChangeOrderStatus](events/status#msonchangeorderstatus) | After status change |

### Customer

| Event | Description |
|-------|-------------|
| [msOnBeforeGetOrderCustomer](events/customer#msonbeforegetordercustomer) | Before getting customer |
| [msOnGetOrderCustomer](events/customer#msongetordercustomer) | After getting customer |
| [msOnBeforeAddToCustomer](events/customer#msonbeforeaddtocustomer) | Before adding field |
| [msOnAddToCustomer](events/customer#msonaddtocustomer) | After adding field |
| [msOnBeforeValidateCustomerValue](events/customer#msonbeforevalidatecustomervalue) | Before field validation |
| [msOnValidateCustomerValue](events/customer#msonvalidatecustomervalue) | After field validation |
| [msOnErrorValidateCustomerValue](events/customer#msonerrorvalidatecustomervalue) | Validation error |
| [msOnBeforeCreateCustomer](events/customer#msonbeforecreatecustomer) | Before creating customer |
| [msOnCreateCustomer](events/customer#msoncreatecustomer) | After creating customer |
| [msOnBeforeAddCustomerAddress](events/customer#msonbeforeaddcustomeraddress) | Before adding address |
| [msOnAddCustomerAddress](events/customer#msonaddcustomeraddress) | After adding address |

### Products (catalog)

| Event | Description |
|-------|-------------|
| [msOnGetProductPrice](events/product#msongetproductprice) | Product price modification |
| [msOnGetProductWeight](events/product#msongetproductweight) | Product weight modification |
| [msOnGetProductFields](events/product#msongetproductfields) | Product fields modification |

### Order products

| Event | Description |
|-------|-------------|
| [msOnBeforeCreateOrderProduct](events/order-product#msonbeforecreateorderproduct) | Before adding product to order |
| [msOnCreateOrderProduct](events/order-product#msoncreateorderproduct) | After adding product |
| [msOnBeforeUpdateOrderProduct](events/order-product#msonbeforeupdateorderproduct) | Before updating product |
| [msOnUpdateOrderProduct](events/order-product#msonupdateorderproduct) | After updating product |
| [msOnBeforeRemoveOrderProduct](events/order-product#msonbeforeremoveorderproduct) | Before removing product |
| [msOnRemoveOrderProduct](events/order-product#msonremoveorderproduct) | After removing product |

### Order model (xPDO)

| Event | Description |
|-------|-------------|
| [msOnBeforeSaveOrder](events/order-model#msonbeforesaveorder) | Before save (xPDO) |
| [msOnSaveOrder](events/order-model#msonsaveorder) | After save (xPDO) |
| [msOnBeforeRemoveOrder](events/order-model#msonbeforeremoveorder) | Before remove (xPDO) |
| [msOnRemoveOrder](events/order-model#msonremoveorder) | After remove (xPDO) |
| [msOnBeforeUpdateOrder](events/order-model#msonbeforeupdateorder) | Before update (manager) |
| [msOnUpdateOrder](events/order-model#msonupdateorder) | After update (manager) |

### Notifications

| Event | Description |
|-------|-------------|
| [msOnBeforeSendNotification](events/notifications#msonbeforesendnotification) | Before sending notification |
| [msOnAfterSendNotification](events/notifications#msonaftersendnotification) | After sending notification |
| [msOnRegisterNotificationChannels](events/notifications#msonregisternotificationchannels) | Channel registration |

### Vendors

| Event | Description |
|-------|-------------|
| [msOnBeforeVendorCreate](events/vendor#msonbeforevendorcreate) | Before creating vendor |
| [msOnVendorCreate](events/vendor#msonvendorcreate) | After creating |
| [msOnBeforeVendorUpdate](events/vendor#msonbeforevendorupdate) | Before updating |
| [msOnVendorUpdate](events/vendor#msonvendorupdate) | After updating |
| [msOnBeforeVendorDelete](events/vendor#msonbeforevendordelete) | Before deleting |
| [msOnVendorDelete](events/vendor#msonvendordelete) | After deleting |

### Import

| Event | Description |
|-------|-------------|
| [msOnBeforeImport](events/import#msonbeforeimport) | Before import start |
| [msOnAfterImport](events/import#msonafterimport) | After import complete |
| [msOnImportRow](events/import#msonimportrow) | When processing a row |

### Manager

| Event | Description |
|-------|-------------|
| [msOnManagerCustomCssJs](events/manager#msonmanagercustomcssjs) | Loading scripts and styles |

## Changes from miniShop2

| miniShop2 | MiniShop3 | Changes |
|-----------|-----------|---------|
| `product` | `msProduct` | Parameter renamed |
| `msOnGetOrderCost` | Split into 3 events | `msOnGetCartCost`, `msOnGetDeliveryCost`, `msOnGetPaymentCost` |
| — | `controller` | New parameter in all controller events |
| — | `msOnBeforeValidateCustomerValue` | New event |
| — | `msOnCreateCustomer` | New event |
| — | `msOnAddCustomerAddress` | New event |
| — | `msOnBeforeSendNotification` | New event |
| — | `msOnImportRow` | New event |
