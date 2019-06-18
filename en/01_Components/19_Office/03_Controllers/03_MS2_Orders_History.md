Snippet **OfficeMiniShop2** shows the miniShop2 orders history of a current user.
Everything is built on ExtJS, which is very convenient. It is loaded from the installed MODX, and that is why it can look differently on different versions of MODX.

[![](https://file.modx.pro/files/c/b/f/cbf808da0f481e1c746144a9549c61ccs.jpg)](https://file.modx.pro/files/c/b/f/cbf808da0f481e1c746144a9549c61cc.png)
[![](https://file.modx.pro/files/8/f/e/8fe7aa15248aa16bf8f4509e15093fd5s.jpg)](https://file.modx.pro/files/8/f/e/8fe7aa15248aa16bf8f4509e15093fd5.png)
[![](https://file.modx.pro/files/9/7/d/97d83a9dad06a604428a859f391110fds.jpg)](https://file.modx.pro/files/9/7/d/97d83a9dad06a604428a859f391110fd.png)

Orders history output settings work approximately the same as for miniShop2:

[![](https://file.modx.pro/files/6/f/2/6f2a563d97bbea76516b74dc9c80baads.jpg)](https://file.modx.pro/files/6/f/2/6f2a563d97bbea76516b74dc9c80baad.png)
[![](https://file.modx.pro/files/c/a/1/ca1a88011b00b8c35f17a0858cb9e531s.jpg)](https://file.modx.pro/files/c/a/1/ca1a88011b00b8c35f17a0858cb9e531.png)

You can indicate your CSS file with the ExtJS structure.

Unlike miniShop2, you can add to the snippet 3 extra parameters: 
* **allowRemove** - turn on the opportunity to delete orders with the "New" status 
* **allowRepeat** - turn on the opportunity to repeat an order. 
* **cartLink** - link to the cart with the order. 

Work logic of the order repeat is the following: 
1. If repeat is allowed, there is a special icon in the orders table. 
2. When you click it, goods from the order apper in the session as if the user added them to the cart. 
3. Then, if parameter **cartLink** is not empty, the user is redirected to the indicated page of placing the order.  
They choose method of delivery, fill in or change address fields.
4. If this parameter is empty, the order is made at once and everything is copied from the old one. 

Notice that, if the order being copied was made long ago and since then your rules of placing orders have changed, making an order without a cart can give oneself an error. 
For example, now you require to write the address and there is no address in the old order - then there will be an error about not filling in the necessary fields. 

```
[[!officeMiniShop2?
    &allowRemove=`1`
    &allowRepeat=`1`    
    &cartLink=`/order/cart`
]]
```
