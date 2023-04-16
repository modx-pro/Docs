# Система скидок [msDiscount][2]

Работа с одноразовыми купонами на скидку для снижения стоимости всего заказа.

Вы самостоятельно генерируете группы купонов, у которых есть абсолютная или процентная скидка, и может быть срок действия. Для отличия одних купонов от других можно использовать уникальные префиксы.

![Система скидок](https://file.modx.pro/files/f/2/f/f2f5cc342e1c0f77f9e1df3b55ee35b4.png)

## Добавление купонов в заказ

**Для работы c купонами нужна версия miniShop 2.4 и выше**.

Чтобы покупатель мог ввести свой код при оформлении заказа, вам нужно добавить новое поле в чанк его оформления.

это **pas.order**:

```php
{set $field = 'coupon_code'}
<div class="row input-parent">
   <label class="form-control-static control-label col-md-4" for="{$field}">
       {('payandsee_' ~ $field) | lexicon}:
   </label>
   <div class="form-group col-md-8">
       <input type="text" id="{$field}" placeholder="XXXXX-XXXX-XXXX-XXXX"
           name="{$field}" value="{$order[$field]}"
           class="form-control{($field in list $errors) ? ' error' : ''}">
   </div>
</div>
```

*Пример для стандартной вёрстки [Bootstrap 3][1].*

При добавлении кода купона к заказу он проходит проверку и если что не так, то вы получите ошибку, а поле не сохранится.

![Система скидок - 2](https://file.modx.pro/files/9/7/e/97e6d312697b658442a19bc02680dd1a.png)

*Текст сообщения можно поменять в словарях системы.*

Если с купоном всё в порядке, то изменение цены выглядит так (gif):

![Система скидок - 3](https://file.modx.pro/files/e/c/0/ec079395ad6ced00052e447b18cc036e.gif)

[1]: http://getbootstrap.com
[2]: /components/minishop2/other-addons/02_msDiscount/index.md
