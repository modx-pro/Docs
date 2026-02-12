# msProfileCharge

Snippet for topping up the user's internal account.

| Name               | Default                     | Description                                                                                                                                   |
|--------------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **&tplForm**       | `tpl.msProfile.charge.form`| Chunk for the account top-up form. You can use `@INLINE` chunks without filters and snippets.                                                  |
| **&tplPayment**    | `tpl.msProfile.charge.payment` | Chunk for a single payment method. You can use `@INLINE` chunks without filters and snippets.                                              |
| **&tplOrder**      | `tpl.msOrder.success`      | Chunk for successful order. By default uses miniShop2 chunk — `tpl.msOrder.success`.                                                          |
| **&payments**      |                            | Comma-separated list of payment method ids. Prefix with minus to exclude a method.                                                            |
| **&sortby**        | `order`                    | Field to sort payment methods by.                                                                                                             |
| **&sortdir**       | `ASC`                      | Sort direction: ascending or descending.                                                                                                      |
| **&limit**         | `0`                        | Result limit.                                                                                                                                 |
| **&outputSeparator**| `\n`                     | Character to separate output; default is newline.                                                                                              |
| **&minSum**        | `200`                      | Minimum amount for account top-up.                                                                                                            |
| **&maxSum**        | `0`                        | Maximum amount for account top-up.                                                                                                            |
| **&showInactive**  | `true`                     | Show inactive payment methods. Default yes, so methods disabled for miniShop2 payment can still be used.                                      |

When the snippet is called, the account top-up form is displayed. Top-up uses the configured miniShop2 payment methods.

Note that you can configure the store so all actual purchases go only from the user account, and the user tops up via available payment methods.
To do this, disable all methods in miniShop2 settings (except CustomerAccount) so they do not appear at checkout.
The msProfileCharge snippet will still use them — this is controlled by the `&showInactive` parameter.

You can also specify which methods to include or exclude with the `&payments` parameter.

When topping up, a standard miniShop2 order is created with a virtual product "Account top-up", and the user receives an email.
Requires [miniShop2 2.1.8][2] or higher for virtual products.

[2]: http://modx.pro/components/3395-minishop2-version-2-1-8-beta-product-names/
