# mswpOnGetProductCost

Вызывается в методе `msWallpapers::getCost`, который в свою очередь отрабатывает при:

1. Вызове сниппета `mswp.form`
2. Отправке формы
3. Добавлении изделия в корзину

## Параметры

- `msProduct $product` — класс товара,
- `array $data` — массив формы.
