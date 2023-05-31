---
title: msPromoCode
description: Скидочные промо-коды для miniShop2
logo: https://modstore.pro/assets/extras/mspromocode/logo-lg.png
author: gvozdb
modstore: https://modstore.pro/packages/discounts/mspromocode

items: [
  {
    text: 'Функционал',
    items: [
      { text: 'Акции', link: 'functionality/stocks' },
      { text: 'Условия применения', link: 'functionality/conditions' },
      { text: 'Реферальные промо-коды', link: 'functionality/referral-promo-codes' },
      { text: 'Фиксированная скидка на всю корзину', link: 'functionality/fixed-cart-discount' },
    ],
  },
  { text: 'Установка и настройка', link: 'setup' },
  {
    text: 'Сниппеты',
    items: [
      { text: 'mspcForm', link: 'snippets/mspcform' },
      { text: 'mspcRefCoupon', link: 'snippets/mspcrefcoupon' },
    ],
  },
  { text: 'jQuery события', link: 'jquery-events' },
  {
    text: 'События плагинов',
    link: 'events/',
    items: [
      { text: 'mspcOnBeforeSetCoupon', link: 'events/mspconbeforesetcoupon' },
      { text: 'mspcOnSetCoupon', link: 'events/mspconsetcoupon' },
      { text: 'mspcOnBeforeSetProductDiscount', link: 'events/mspconbeforesetproductdiscount' },
      { text: 'mspcOnSetProductDiscount', link: 'events/mspconsetproductdiscount' },
      { text: 'mspcOnBindCouponToOrder', link: 'events/mspconbindcoupontoorder' },
    ],
  },
  {
    text: 'Кейсы',
    link: 'cases/',
    items: [
      { text: 'Вывод информации по промо-коду в письме', link: 'cases/email-inform' },
      { text: 'Именные промокоды для пользователя', link: 'cases/personalized-promo-codes' },
      { text: 'Отменить промо-код при наличии в корзине запрещённых товаров', link: 'cases/cancel-promo-code' },
    ],
  },
]

dependencies: miniShop2
---

# msPromoCode

Скидочные промо-коды для [miniShop2][1]

![Скидочные промо-коды](https://file.modx.pro/files/4/d/1/4d1b1efb5043b39395279a1931e38064.png)

## Особенности

- Полная AJAX обработка применения/удаления купона к заказу.

- Промо-код можно добавить не только с основной страницы бекенда. На странице товара также есть вкладка "Промо-коды", при добавлении с которой текущий товар сразу привяжется к этому промо-коду. Это удобно, когда надо добавить купон **только для конкретного товара**.

    ![Особенности](https://file.modx.pro/files/9/9/f/99f933c6bede012de67addc87f8fcf39.png)

- Скидку можно указать, как для купона в целом, так и для товара или раздела, привязанного к купону. При этом, чем индивидуальнее будет указана скидка, тем она первостепеннее будет восприниматься компонентом. К примеру, у нас есть купон со скидкой 20%, есть **Раздел 1**, привязанный к этому купону, со скидкой 80% и есть товар лежащий в **Разделе 1**, привязанный к этому купону, со скидкой 40%. Для данного товара скидка будет 40%.

- Если к купону не привязано ни одного товара или раздела — **купон действует на весь магазин**.

- При отправке заказа, ровно как и при открытии страницы со сниппетом `mspcForm`, компонент проверяет, действителен ли на данный момент купон. Если нет, то сообщает об этом юзеру, удаляет купон из формы и обновляет цены в корзине. Это делает невозможным воспользоваться купоном:
  - который был отключён,
  - время действия которого завершилось,
  - количество которого закончилось.

- Если заказ был оформлен с промо-кодом, то в бекенде в модальном окне заказа вверху на первой вкладке появится промо-код и сумма скидки.

[![](https://file.modx.pro/files/8/4/8/848c52f4c835c232e6874d3e591ca5b7.png)](https://file.modx.pro/files/8/4/8/848c52f4c835c232e6874d3e591ca5b7.png)

## Важно

Чанк пакета завязан на Bootstrap 3, поэтому если на вашем сайте он не используется, то стили для чанка придётся прописывать вручную, впрочем как и для miniShop2, т.к. минишоп тоже завязан на Bootstrap.

[1]: /components/minishop2/
