# mspcOnBeforeSetProductDiscount

Событие срабатывает **перед вычетом** скидки на товар после применения купона к корзине.

## Параметры

* `msPromoCode $mspc` — ссылка на основной класс msPromoCode
* `array $coupon` — массив промо-кода
* `array $product` — массив с данными о товаре из корзины
* `array $cart` — массив miniShop2 корзины
* `string $key` — ключ позиции из массива miniShop2 корзины
* `float $price` — цена до применения скидки
* `float|string $discount` — скидка, может указываться в процентах или числом

## Пример использования

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
    case "mspcOnBeforeSetProductDiscount":
        // Если купон с кодом "all"
        if (strtolower($sp['coupon']['code']) == 'all') {

            // Если кол-во единиц товара в корзине >= 3
            if ($sp['product']['count'] >= 3) {

                // Если товар находится в разделе с ID = 24
                $parents = $modx->getParentIds($sp['product']['id'], 10);
                if (in_array(24, $parents)) {

                    // Если скидка указана в процентах
                    if (strstr($sp['discount'], '%')) {

                        // Прибавляем к текущей скидке +50%
                        $sp['discount'] = (floatval($sp['discount']) + 50) . '%';
                    }
                }
            }

            // Если это товар с ID = 15
            if ($sp['product']['id'] == 15) {

                // Если опция size = XXL
                if (!empty($sp['product']['options']['size']) && $sp['product']['options']['size'] == 'XXL') {

                    // Применяем к товару скидку указанную в купоне, а не в связях с товарами/разделами
                    $sp['discount'] = $coupon['discount'];
                }
            }
        }
        break;
}
$modx->event->returnedValues = $sp;
```

## Важно

Событие сработает, даже если скидка на товар = 0%. Главное, чтобы товар был тем или иным способом привязан к купону.
