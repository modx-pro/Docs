---
title: msDiscount
description: Система скидок и одноразовые купоны для miniShop2
logo: https://modstore.pro/assets/extras/msdiscount/logo-lg.png
author: ilyautkin
modstore: https://modstore.pro/packages/discounts/msdiscount

items: [
  { text: 'Акции', link: 'stock' },
  { text: 'Скидки', link: 'discounts' },
  { text: 'Купоны', link: 'coupons' },
  {
    text: 'Сниппеты',
    items: [
      { text: 'msdBuyNow', link: 'snippets/msdbuynow' },
      { text: 'msdGetDiscount', link: 'snippets/msdgetdiscount' },
    ],
  },
]

dependencies: miniShop2
---

# msDiscount

## Система скидок для [miniShop2][1]

- Скидки на группу товаров
- Скидки для группы пользователей
- Одноразовые купоны на скидку
- Создание акций, ограниченных по времени, с указанием групп пользователей и товаров
- Для групп пользователей можно указать сумму оплаченных покупок, при достижений которой, они автоматически в неё вступят.
- Пересчет корзины при авторизации юзера
- Автоматический вывод цены со скидкой в price, а старой цены в `old_price`.
- Пользователь после авторизации видит новые цены везде: и в каталоге, и на странице товара, и в корзине.
- Величину скидки можно указывать относительную, в процентах, или абсолютную, в валюте магазина.
- Вывод товаров, участвующих в акциях (по схеме «Успей купить»)

[1]: /components/minishop2/
