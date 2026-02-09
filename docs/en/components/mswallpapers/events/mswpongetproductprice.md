# mswpOnGetProductPrice

Fired in `msWallpapers::getPrice`, which runs when:

1. Snippet `mswp.form` is called
2. Form is submitted
3. Product is added to cart

Fires before the product cost is calculated.

## Parameters

- `msProduct $product` — product class,
- `array $data` — form array.
