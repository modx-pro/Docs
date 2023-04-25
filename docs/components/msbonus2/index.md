---
name: msBonus2
author: gvozdb

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  {
    text: 'Сниппеты',
    items: [
      { text: 'msBonus2Form', link: 'snippets/msbonus2form' },
      { text: 'msBonus2Logs', link: 'snippets/msbonus2logs' },
      { text: 'msBonus2ProductBonus', link: 'snippets/msbonus2productbonus' },
    ],
  },
  { text: 'События jQuery', link: 'jquery-events' },
  {
    text: 'События плагинов',
    items: [
      { text: 'msb2OnBeforeSetBonus', link: 'events/msb2onbeforesetbonus' },
      { text: 'msb2OnSetBonus', link: 'events/msb2onsetbonus' },
      { text: 'msb2OnUnsetBonus', link: 'events/msb2onunsetbonus' },
      { text: 'Примеры', link: 'events/examples' },
    ],
  },
  { text: 'Программное API', link: 'api' },
  {
    text: 'Кейсы',
    items: [
      { text: 'Вывод информации в письме о списанных бонусах за заказ', link: 'cases/email-inform' },
      { text: 'Дополнительные бонусы за первый заказ на сайте', link: 'cases/additional-bonuses' },
      { text: 'Применять либо промокод msPromoCode2, либо бонусы msBonus2', link: 'cases/mspromocode2-or-msbonus2' },
    ],
  },
]

dependencies: ['miniShop2']
---

# msBonus2

- Совместимость с msPromoCode и msPromoCode2,
- Программное API — можно начислить или списать бонусы в сниппете или плагине за какое-либо действие,
- Уровни пользователей с процентом начисления и суммой покупок, при достижении которой пользователь перейдёт на данный уровень,
- Возможность применить или отменить бонусы к уже созданному заказу,
- Возможность ручного начисления/списания бонусов на пользовательском аккаунте,
- Возможность назначить время, спустя которое пользователь может начать использовать начисленные баллы,
- Возможность указать время жизни баллов, спустя которое они будут сожжены с баланса пользователя,
- Возможность указать максимальный процент корзины, который можно оплатить бонусами,
- Возможность указать разделы для начисления и списания баллов отдельно друг от друга,
- Начисление бонусов за регистрацию и в день рождения.

::: warning Внимание!
Компонент работает только с **miniShop2 версии 2.4.14 и выше** На нижних версиях будут проблемы из-за отсутствия событий msOnBeforeSaveOrder и msOnSaveOrder.

Вторая версия не имеет ничего общего с первой версией компонента. Даже в части функционала они отличаются, ибо реализованы совершенно иначе.
:::
