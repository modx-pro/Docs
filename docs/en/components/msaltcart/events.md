# Events

## System events

### msAltCart events

###

#### msOnBeforeGetProductKey — fired before building the product key in the cart; allows changing key parameters

Available parameters:

* **$product** — array of all product fields.
* **$options** — array of product options.
* **$cart** — cart handler class instance.

::: details Plugin example
In this example we move options into the main product fields so that the **cart_product_key_fields** system setting can reference specific options. That lets you control the product key without including internal options.

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
