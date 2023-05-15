---
name: msPromoCode2
description: Улучшенные промо-коды для miniShop2
logo: https://modstore.pro/assets/extras/mspromocode2/logo-lg.jpg
author: gvozdb
modstore: https://modstore.pro/packages/discounts/mspromocode2

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  {
    text: 'Сниппеты',
    items: [
      { text: 'msPromoCode2', link: 'snippets/mspromocode2' },
      { text: 'mspc2Generate', link: 'snippets/mspc2generate' },
      { text: 'mspc2CartKey', link: 'snippets/mspc2cartkey' },
    ],
  },
  { text: 'События jQuery', link: 'jquery-events' },
  {
    text: 'События плагинов',
    link: 'events/',
    items: [
      { text: 'mspc2OnBeforeGetCoupon', link: 'events/mspc2onbeforegetcoupon' },
      { text: 'mspc2OnGetCoupon', link: 'events/mspc2ongetcoupon' },
      { text: 'mspc2OnBeforeSetCoupon', link: 'events/mspc2onbeforesetcoupon' },
      { text: 'mspc2OnSetCoupon', link: 'events/mspc2onsetcoupon' },
      { text: 'mspc2OnUnsetCoupon', link: 'events/mspc2onunsetcoupon' },
      { text: 'mspc2OnSetProductDiscountPrice', link: 'events/mspc2onsetproductdiscountprice' },
      { text: 'Примеры', link: 'events/examples' },
    ],
  },
  { text: 'Программное API', link: 'api' },
  {
    text: 'Кейсы',
    link: 'cases/',
    items: [
      { text: 'Вывод информации по промо-коду в письме', link: 'cases/email-inform' },
      { text: 'Установка промо-кода программно при входе на сайт', link: 'cases/set-promocode' },
      { text: 'Генерация промо-кода в письме на следующий заказ', link: 'cases/generate-promocode' },
      { text: 'Применять либо промокод msPromoCode2, либо бонусы msBonus2', link: 'cases/mspromocode2-or-msbonus2' },
    ],
  },
]

dependencies: miniShop2
---

# msPromoCode2

- Совместимость с msOptionsPrice2 и msBonus2,
- Программное API - можно применить/отменить скидку для юзера в сниппете или плагине,
- Применение промо-кода в бек-энде для уже созданных заказов,
- Применение промо-кода на любой странице сайта и обновление цен товаров на лету,
- Вывод скидки не только в корзине, но и в любом месте сайта, где отображается цена товара,
- И множество мелочей, которые будут приятным дополнением при использовании компонента.

::: warning
Компонент работает только с **miniShop2 версии 2.4.14 и выше!** На нижних версиях будут проблемы из-за отсутствия событий msOnBeforeSaveOrder и msOnSaveOrder.
:::

::: warning
Вторая версия не имеет ничего общего с первой версией компонента. Даже в части функционала они отличаются, ибо реализованы совершенно иначе.
:::
