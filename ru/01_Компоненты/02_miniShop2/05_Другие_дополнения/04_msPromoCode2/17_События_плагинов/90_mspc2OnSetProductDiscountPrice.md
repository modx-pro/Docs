Событие срабатывает после применения купона, **в момент вычета** скидки на товар.

_Добавлено с версии `1.1.18`._


#### Параметры

* `array $coupon` — массив с промо-кодом
* `null|msOrder $order` — объект заказа `msOrder` или `null`, если промо-код применён к корзине
* `array $product` — массив данных товара (элемент товара из массива корзины, или массив данных объекта msOrderProduct)
* `string $key` — ключ позиции в массиве корзины
* `float $price` — цена **после применения** скидки
* `float $old_price` — цена **до применения** скидки
* `float|string $discount` — скидка, может указываться в процентах или числом
* `float $discount_price` — стоимость скидки за 1 единицу товара
* `float $discount_cost` — сумма скидки


#### Пример

```php
switch ($modx->event->name) {
    case 'mspc2OnSetProductDiscountPrice':
        if (is_object($order)) {
            // Событие вызвано при пересчёте цен на товары в заказе
        }

        // Если купон с кодом `leto`
        if (strtolower($coupon['code']) === 'leto') {

            // Если это товар с ID = 5
            if ((int)$product['product_id'] === 5) {

                // Если опция color === `белый`
                if (mb_strtolower(@$product['options']['color'] ?: '', 'utf-8') === 'белый') {

                    // Если кол-во единиц товара в корзине >= 2
                    if ($product['count'] >= 2) {

                        // Тогда прибавляем к цене товара +200 рублей
                        $product['price'] += 200;

                        // Соответственно, вычитаем эти 200 рублей из скидки за 1 единицу товара
                        $product['discount_price'] -= 200;

                        // И вычитаем разницу из общей скидки на товар (200 * кол-во товара в корзине)
                        $product['discount_cost'] -= 200 * $product['count'];
                    }
                }

                // Если опция color === `зелёный`
                if (mb_strtolower(@$product['options']['color'] ?: '', 'utf-8') === 'зелёный') {

                    // То отдаём товар бесплатно
                    $product['discount_price'] += $product['price'];
                    $product['discount_price'] += $product['price'] * $product['count'];
                    $product['price'] = 0;
                }
            }
        }
        $modx->event->returnedValues['product'] = $product;
        break;
}
```


#### Важно

* В переменной `$product` ID товара находится под ключём `product_id`. При вызове и из корзины, и из заказа: `$product['product_id']`.

* Событие сработает, даже если скидка на товар = 0%. Главное, чтобы товар был тем или иным способом привязан к промо-коду.
