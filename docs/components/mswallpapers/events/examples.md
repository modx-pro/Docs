# Примеры

## Подменим цену товара в зависимости от выбранной текстуры

```php
switch ($modx->event->name) {
  case 'mswpOnGetProductPrice':
    $price = $product->getPrice();
    if (!empty($data['texture'])) {
      switch ($data['texture']) {
        case 'smooth':
          $price = $product->getPrice() + 500;
          break;

        case 'sand':
          $price = $product->getPrice() + 1000;
          break;

        case 'jacquard':
          $price = $product->getPrice() + 1500;
          break;
      }
    }
    $modx->event->returnedValues = [
      'price' => $price,
    ];
    break;
}
```
