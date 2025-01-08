# События
## Системные события
### События msAltCart
###
#### msOnBeforeGetProductKey - генерируется перед формированием ключа товара в корзине, позволяет изменить параметры ключа.  
Доступные параметры:
* **$product** - массив всех полей товара.
* **$options** - массив опций товара.
* **$cart** - экземпляр класса-обработчика корзины.

::: details Пример плагина
В данном примере мы перемещаем опции к основным полям товара, что позволит указать в системной настройке **cart_product_key_fields** ключи конкретных опций.
Таким образом появляется возможность тонко настраивать ключ товара, не включая в него какие-то служебные опции.
```php:line-numbers
switch($modx->event->name){
    case 'msOnBeforeGetProductKey':
        $values = &$modx->event->returnedValues;
        unset($product['options']);
        $values['product'] = array_merge($product, $options);      
        break;
}
```
:::
