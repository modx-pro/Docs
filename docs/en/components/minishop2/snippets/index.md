# miniShop2 snippets

All miniShop2 snippets use pdoTools and expect [Fenom][2] in chunks.

They do not process cart items themselves; they pass an array to the chunk.
This allows:

- fewer chunks overall
- easier maintenance (edit cart in one place, not three)
- faster output (parse one chunk instead of 3–10 depending on cart size)
- more complex chunks with Fenom conditionals

miniShop2.4 is the first MODX component to use only Fenom chunks.

- [msProducts](/en/components/minishop2/snippets/msproducts)
- [msCart](/en/components/minishop2/snippets/mscart)
- [msOrder](/en/components/minishop2/snippets/msorder)
- [msMiniCart](/en/components/minishop2/snippets/msminicart)
- [msGetOrder](/en/components/minishop2/snippets/msgetorder)
- [msGallery](/en/components/minishop2/snippets/msgallery)
- [msOptions](/en/components/minishop2/snippets/msoptions)
- [msProductOptions](/en/components/minishop2/snippets/msproductoptions)

[2]: /en/components/pdotools/parser
