# Система скидок [msPromoCode][2]

Работа с промо кодами на скидку для снижения стоимости всего заказа.

Вы самостоятельно генерируете купоны, у которых есть абсолютная или процентная скидка, и может быть срок действия. Поддерживается работа промокодов с активным свойством **Скидка на всю корзину**.

[![](https://file.modx.pro/files/5/8/7/587728d83cd16b59a43a1b3822dcc6c8s.jpg)](https://file.modx.pro/files/5/8/7/587728d83cd16b59a43a1b3822dcc6c8.png)

## Добавление промо кодов в заказ

**Для работы c промо кодами нужна версия miniShop 2.4 и выше**.

Чтобы покупатель мог ввести свой код при оформлении заказа, вам нужно добавить новое поле в чанк его оформления.

это **pas.order**:

```php
{set $field = 'mspromo_code'}
<div class="row input-parent">
    <label class="form-control-static control-label col-md-4" for="{$field}">
        {('payandsee_' ~ $field) | lexicon}:
    </label>
    <div class="form-group col-md-8">
        <input type="text" id="{$field}"
            placeholder="XXXXX-XXXX-XXXX"
            name="{$field}" value="{$order[$field]}"
            class="form-control{($field in list $errors) ? ' error' : ''}">
    </div>
</div>
```

*Пример для стандартной вёрстки [Bootstrap 3][1].*

При добавлении кода купона к заказу он проходит проверку и если что не так, то вы получите ошибку, в ином случае скидку на заказ.

[![](https://file.modx.pro/files/1/1/2/11265e14bd7c365db06f8b2b40d43b96s.jpg)](https://file.modx.pro/files/1/1/2/11265e14bd7c365db06f8b2b40d43b96.png)
*Текст сообщения можно поменять в словарях системы.*

[0]: https://github.com/bezumkin/miniShop2/commit/f33462045561594e56fa11312003c25c04d1bc32
[1]: http://getbootstrap.com
[2]: https://modstore.pro/packages/discounts/mspromocode
