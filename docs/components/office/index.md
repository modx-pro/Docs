---
name: Office
description: Универсальный личный кабинет покупателя
logo: https://modstore.pro/assets/extras/office/logo-md.png

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Логика работы', link: 'logic' },
  { text: 'Дополнительный функционал', link: 'additional-functionality' },
  {
    text: 'Контроллеры',
    items: [
      { text: 'Авторизация', link: 'controllers/auth' },
      { text: 'Профиль', link: 'controllers/profile' },
      { text: 'История заказов MS2', link: 'controllers/orders-history-minishop2' },
      { text: 'Удаленная авторизация', link: 'controllers/auth-remote' },
    ],
  },
]
---
# Office

Личный кабинет пользователя MODX.

Покупатель может регистрироваться и авторизоваться на сайте через email и соцсети, обновлять свойства своего профиля и просматривать историю заказов miniShop2.

Благодаря [модульной архитектуре дополнения][2], вы можете добавлять свои контроллеры для создания уникального функционала.

[2]: /components/office/logic
