# mspcOnSetProductDiscount

Событие срабатывает **в момент вычета** скидки на товар после применения купона к корзине.

## Параметры

* `msPromoCode $mspc` — ссылка на основной класс msPromoCode
* `array $coupon` — массив промо-кода
* `array $product` — массив с данными о товаре из корзины
* `array $cart` — массив miniShop2 корзины
* `string $key` — ключ позиции из массива miniShop2 корзины
* `float $price` — цена **после применения** скидки
* `float $old_price` — цена **до применения** скидки
* `float|string $discount` — скидка, может указываться в процентах или числом
* `float $discount_amount` — сумма скидки

## Пример использования

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
    case "mspcOnSetProductDiscount":

        // Если купон с кодом "all"
        if (strtolower($sp['coupon']['code']) == 'all') {

            // Если это товар с ID = 15
            if ($sp['product']['id'] == 15) {

                // Если опция size = S или M
                if (!empty($sp['product']['options']['size']) && ($sp['product']['options']['size'] == 'S' || $sp['product']['options']['size'] == 'M')) {

                    // Если кол-во единиц товара в корзине >= 2
                    if ($sp['product']['count'] >= 2) {

                        // Вычисляем скидку за 1 единицу товара
                        $discount_unit = $sp['discount_amount'] / $sp['product']['count'];

                        // Получаем итоговую стоимость товара
                        // за вычетом скидки равной скидке за одну единицу товара
                        // вне зависимости от кол-ва товара в корзине
                        $sp['price'] = (float) ($sp['price'] + ($sp['discount_amount'] - $discount_unit));
                    }
                }
            }
        }
        break;
}
$modx->event->returnedValues = $sp;
```

## Важно

Событие сработает, даже если скидка на товар = 0%. Главное, чтобы товар был тем или иным способом привязан к купону.
