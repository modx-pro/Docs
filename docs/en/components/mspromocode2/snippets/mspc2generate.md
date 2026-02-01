# mspc2Generate

Generates a promo code after N seconds on the page and [shows a popup][1] to the user.
Usually called on every page to track time on site.

![](https://file.modx.pro/files/1/4/5/14526526bf347d2880e3c55057359051.png)

::: tip
Since 1.1.12 you can set lifetime and additional config options.
For promo codes with lifetime under 24 hours, the popup shows a countdown.
:::

![Countdown for promo code with lifetime](https://file.modx.pro/files/b/3/3/b33b86adc5f34c2af1e60b9de15ef730.gif)
![Countdown for promo code with lifetime](https://file.modx.pro/files/1/6/c/16c94437fac6d143cf8f2cefc788285e.gif)

## Parameters

### Main

| Name      | Default           | Description                                                                                    |
|-----------|-------------------|------------------------------------------------------------------------------------------------|
| **format**| `[a-zA-Z0-9]{12}` | Promo code format; regex-like syntax supported.                                                 |
| **seconds**| `90`             | Seconds before generation. Counts only on pages where the snippet is called.                    |
| **tpl**   | `tpl.msPromoCode2.generate` | Notification template.                                                                  |

### Promo code settings

| Name              | Default   | Description                                                                                                |
|-------------------|-----------|------------------------------------------------------------------------------------------------------------|
| **list**          | `generate`| Promo code "List" field.                                                                                   |
| **count**         | `1`       | How many times the generated promo code can be applied.                                                    |
| **discount**      | `10%`     | Discount for the generated promo code.                                                                     |
| **description**   |           | Description for the generated promo code.                                                                  |
| **showinfo**      | `1`       | Show "yellow" warnings when applying the promo code.                                                       |
| **oneunit**       | `0`       | Apply discount to one product unit only.                                                                   |
| **onlycart**      | `0`       | Show discounted price only in cart.                                                                        |
| **unsetifnull**   | `0`       | Unset if cart has no products matching the promo code.                                                     |
| **unsetifnull_msg**|          | Message when unsetting. Works only with `unsetifnull` enabled.                                             |
| **oldprice**      | `0`       | Apply only to products without old price.                                                                  |
| **lifetime**      |           | Promo code lifetime in seconds. Use either this or `startedon` + `stoppedon`.                               |
| **startedon**     |           | Promo code start, timestamp. Use with `stoppedon` or with `lifetime`.                                       |
| **stoppedon**     |           | Promo code end, timestamp. Use with `startedon` or with `lifetime`.                                         |

### Examples

#### 25% discount after 20 seconds on site

Generates a 25% discount promo code after 20 seconds and shows it to the user.

```fenom
{'!mspc2Generate' | snippet: [
  'discount' => '25%',
  'seconds' => 20,
]}
```

#### With format prefix hello12345

Generates a promo code with prefix hello12345 after 90 seconds (default) and shows it to the user.

```fenom
{'!mspc2Generate' | snippet: [
  'format' => 'hello[0-9]{5}',
]}
```

#### With countdown

Generates a 10% promo code after 20 seconds with 20 minute lifetime and shows a countdown.

Also sets description and "Show discounted price only in cart".

```fenom
{'!mspc2Generate' | snippet: [
  'discount' => '10%',
  'seconds' => 20,
  'description' => 'Generated promo code',
  'onlycart' => true,
  'lifetime' => 60 * 20,
]}
```

[1]: https://file.modx.pro/files/1/4/5/14526526bf347d2880e3c55057359051.png
