# События плагинов

Благодаря этим событиям плагинов можно:

- Увеличивать/применять скидку на товар в зависимости от кол-ва единиц товара в корзине,
- Давать скидку только на конкретную опцию товара, например на рубашку размера XXL,
- Получить итоговую стоимость товара, за вычетом скидки, равной скидке за одну единицу, вне зависимости от кол-ва единиц данной позиции в корзине,
- И **много чего ещё**, на что хватит вашей фантазии!

_Список событий прописан в порядке их исполнения при работе компонента._

- [mspcOnBeforeSetCoupon](/components/mspromocode/events/mspconbeforesetcoupon)
- [mspcOnSetCoupon](/components/mspromocode/events/mspconsetcoupon)
- [mspcOnBeforeSetProductDiscount](/components/mspromocode/events/mspconbeforesetproductdiscount)
- [mspcOnSetProductDiscount](/components/mspromocode/events/mspconsetproductdiscount)
- [mspcOnBindCouponToOrder](/components/mspromocode/events/mspconbindcoupontoorder)
