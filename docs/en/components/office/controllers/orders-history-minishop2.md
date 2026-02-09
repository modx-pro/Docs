# miniShop2 order history

The **OfficeMiniShop2** snippet outputs the current user's miniShop2 order history.

It is built on ExtJS. It loads from the installed MODX, so it may look slightly different across MODX versions.

[![](https://file.modx.pro/files/c/b/f/cbf808da0f481e1c746144a9549c61ccs.jpg)](https://file.modx.pro/files/c/b/f/cbf808da0f481e1c746144a9549c61cc.png)

[![](https://file.modx.pro/files/8/f/e/8fe7aa15248aa16bf8f4509e15093fd5s.jpg)](https://file.modx.pro/files/8/f/e/8fe7aa15248aa16bf8f4509e15093fd5.png)

[![](https://file.modx.pro/files/9/7/d/97d83a9dad06a604428a859f391110fds.jpg)](https://file.modx.pro/files/9/7/d/97d83a9dad06a604428a859f391110fd.png)

Order table output is controlled by settings similar to miniShop2:

[![](https://file.modx.pro/files/6/f/2/6f2a563d97bbea76516b74dc9c80baads.jpg)](https://file.modx.pro/files/6/f/2/6f2a563d97bbea76516b74dc9c80baad.png)

[![](https://file.modx.pro/files/c/a/1/ca1a88011b00b8c35f17a0858cb9e531s.jpg)](https://file.modx.pro/files/c/a/1/ca1a88011b00b8c35f17a0858cb9e531.png)

You can set your own CSS file for the ExtJS theme.

Unlike miniShop2, you can set 3 extra snippet parameters:

- **allowRemove** — allow removing orders with status "New".
- **allowRepeat** — allow repeating an order.
- **cartLink** — link to the checkout cart.

Repeat order flow:

1. If repeat is allowed, an icon appears in the order table.
2. On click, order products are added to the session as if the user added them to the cart.
3. If **cartLink** is set, the user is redirected to that checkout page to choose delivery, payment and address.
4. If **cartLink** is empty, the order is created immediately, copying what can be copied from the old order.

Note: if the copied order is old and your checkout rules have changed, creating an order without the cart may fail (e.g. address is now required but missing in the copied order).

```modx
[[!officeMiniShop2?
  &allowRemove=`1`
  &allowRepeat=`1`
  &cartLink=`/order/cart`
]]
```
