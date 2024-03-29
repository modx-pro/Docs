# Купоны

Одноразовые купоны на скидку предназначение для снижения стоимости всей корзины покупок.

Вы самостоятельно генерируете группы купонов, у которых есть абсолютная или процентная скидка, и может быть срок действия. Для отличия одних купонов от других можно использовать уникальные префиксы.

[![](https://file.modx.pro/files/f/2/f/f2f5cc342e1c0f77f9e1df3b55ee35b4s.jpg)](https://file.modx.pro/files/f/2/f/f2f5cc342e1c0f77f9e1df3b55ee35b4.png)

Если все купоны группы закончились - можно сгенерировать еще, в той же группе. Для этого нужно просто указать больше купонов при редактировании группы и сохранить.

[![](https://file.modx.pro/files/4/3/b/43b34a02ef2e03f5db0d7ce60876a3eds.jpg)](https://file.modx.pro/files/4/3/b/43b34a02ef2e03f5db0d7ce60876a3ed.png)

Чтобы не копировать сотни купонов в блокнотик руками, предусмотрена **выгрузка кодов в формате csv**, который открывается всеми нормальными редакторами, включая MS Excel и Libre Office.
Выгрузки можно использовать для сбора статистики по активациям или печати рекламных материалов.

При погашении купона, в него записывается номер заказа miniShop2, для которого он был активирован, и время активации.

[![](https://file.modx.pro/files/6/c/4/6c4c36ca7ca6b67bae0145a0f810ecfes.jpg)](https://file.modx.pro/files/6/c/4/6c4c36ca7ca6b67bae0145a0f810ecfe.png)

## Добавление купонов в заказ

**Для работы c купонами нужна стабильная версия miniShop2.1.11**. Если вы пользуетесь 2.2-beta, то можно внести [изменения][0] самостоятельно, или подождать, пока они будут добавлены разработчиками.

Чтобы покупатель мог ввести свой код при оформлении заказа, вам нужно добавить новое поле в чанк его оформления.

В miniShop2.2 это **tpl.msOrder.outer**:

```modx
<div class="form-group input-parent">
  <label class="col-sm-4 control-label" for="coupon_code">Скидочный купон</label>
  <div class="col-sm-6">
    <input type="coupon_code" id="coupon_code" placeholder="XXXXX-XXXX-XXXX-XXXX" name="coupon_code" value="[[+coupon_code]]" class="form-control">
  </div>
</div>
```

А в версии 2.4 это **tpl.msOrder**:

```fenom
<div class="form-group input-parent">
  <label class="col-sm-4 control-label" for="coupon_code">Скидочный купон</label>
  <div class="col-sm-6">
    <input type="coupon_code" id="coupon_code" placeholder="XXXXX-XXXX-XXXX-XXXX" name="coupon_code" value="{$order.coupon_code}" class="form-control">
  </div>
</div>
```

*Пример для стандартной вёрстки [Bootstrap 3][1].*

При добавлении кода купона к заказу он проходит проверку и если что не так, то вы получите ошибку, а поле не сохранится.

[![](https://file.modx.pro/files/9/7/e/97e6d312697b658442a19bc02680dd1as.jpg)](https://file.modx.pro/files/9/7/e/97e6d312697b658442a19bc02680dd1a.png)

*Текст сообщения можно поменять в словарях системы.*

Если с купоном всё в порядке, то изменение цены выглядит так (gif):

[![](https://file.modx.pro/files/e/c/0/ec079395ad6ced00052e447b18cc036es.jpg)](https://file.modx.pro/files/e/c/0/ec079395ad6ced00052e447b18cc036e.gif)

Для работы обновления стоимости заказа, при изменении поля с купоном, вам нужно добавить **callback** функцию MS2.

Старый код, для магазина версии 2.2:

```js
$(document).ready(function () {
  miniShop2.Callbacks.Order.add.ajax.done = function (res) {
    var res = res.responseJSON;
    if (typeof res.data.coupon_code !== 'undefined' || !res.success) {
      miniShop2.Order.getcost();
    };
  };
});
```

Новый код, для магазинов версии 2.4 и выше:

```js
$(document).ready(function () {
  miniShop2.Callbacks.add('Order.add.ajax.done', 'msdiscount', function (res) {
    var res = res.responseJSON;
    if (typeof res.data.coupon_code !== 'undefined' || !res.success) {
      miniShop2.Order.getcost();
    };
  });
});
```

Код можно прописать в скриптах сайта, или прямо в чанке оформления заказа.

[0]: https://github.com/bezumkin/miniShop2/commit/f33462045561594e56fa11312003c25c04d1bc32
[1]: http://getbootstrap.com
