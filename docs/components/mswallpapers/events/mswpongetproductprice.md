# mswpOnGetProductPrice

Вызывается в методе `msWallpapers::getPrice`, который в свою очередь отрабатывает при:

1. Вызове сниппета `mswp.form`
2. Отправке формы
3. Добавлении изделия в корзину

Запускается перед вычетом стоимости за изделие.

## Параметры

- `msProduct $product` — класс товара,
- `array $data` — массив формы.
