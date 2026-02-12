# Problem solving with miniShop2

## Cart messages in the current language

So that when adding to cart and changing other options you get popup messages in the current language,
set the miniShop2 plugin priority for the OnHandleRequest event **higher** than the mlSetLanguage plugin, so that
mlSetLanguage runs **before** the miniShop2 plugin.

Then add a system setting (set the path to action.php according to your project):

| Setting               | Value                                                          |
|-----------------------|----------------------------------------------------------------|
| minishop2.action_url  | `assets/components/minishop2/action.php`  // (no leading slash) |

## Product names in the cart in the current language

The msCart snippet used for cart output does not support the pdofetch_class_path setting, so to show product names in the cart in the current language, in the product row chunk use instead of `{$product.pagetitle}`:

```fenom
{'pdoField' | snippet: ['id' => $product.id, 'field' => 'pagetitle']}
```
