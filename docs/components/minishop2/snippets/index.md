
# Cниппеты miniShop2

Все сниппеты miniShop2 работают при помощи pdoTools и рассчитывают на использование [Fenom][2] в чанках.

То есть, например, они сами не обрабатывают товары корзины, просто передавая массив с ними в чанк.
Это позволяет:

- сократить общее количество чанков
- повысить удобство работы (вы редактируете корзину в 1 месте, а не в 3х)
- ускорить работу (нужно парсить всего 1 чанк, а не 3 - 10 в зависимости от товаров в корзине)
- делать более сложные чанки, за счёт продвинутой проверки условий через функции Fenom

miniShop2.4 - первый компонент MODX, использующий только чанки с синтаксисом Fenom.

- [msProducts](/components/minishop2/snippets/msproducts)
- [msCart](/components/minishop2/snippets/mscart)
- [msOrder](/components/minishop2/snippets/msorder)
- [msMiniCart](/components/minishop2/snippets/msminicart)
- [msGetOrder](/components/minishop2/snippets/msgetorder)
- [msGallery](/components/minishop2/snippets/msgallery)
- [msOptions](/components/minishop2/snippets/msoptions)
- [msProductOptions](/components/minishop2/snippets/msproductoptions)

[2]: /components/pdotools/parser
