---
title: UserEvents
description: Создание пользователями событий на ресурсы
logo: https://modstore.pro/assets/extras/userevents/logo-lg.png
author: vgrish
modstore: https://modstore.pro/packages/booking/userevents

items: [
  {
    text: 'Интерфейс',
    link: 'interface/',
    items: [
      { text: 'Заказы', link: 'interface/orders' },
      { text: 'События', link: 'interface/events' },
      { text: 'Статусы', link: 'interface/statuses' },
      { text: 'Оповещения', link: 'interface/notifications' },
      { text: 'Настройки', link: 'interface/settings' },
    ],
  },
  {
    text: 'Сниппеты',
    link: 'snippets/',
    items: [
      { text: 'ue.order', link: 'snippets/ue-order' },
      { text: 'ue.get.order', link: 'snippets/ue-get-order' },
    ],
  },
  {
    text: 'Разработка',
    items: [
      { text: 'Скрипты и стили', link: 'development/scripts-and-styles' },
      { text: 'События', link: 'development/events' },
      { text: 'Расширения', link: 'development/extensions' },
      {
        text: 'Службы',
        items: [
          { text: 'Заказ', link: 'development/services/order' },
          { text: 'Доставка', link: 'development/services/delivery' },
          { text: 'Оплата', link: 'development/services/payment' },
        ],
      }
    ],
  },
]
---
# UserEvents

Для работы вам нужен MODX не ниже **2.3** и PHP не ниже **5.4**.

## Описание

**UserEvents** - события пользователя. Компонент реализует функционал создания пользователями событий на ресурсы.

![Быстрый старт - 1](https://file.modx.pro/files/d/8/5/d85c3cc976b7caaa799e4b704dbdd9bc.png)

![Быстрый старт - 2](https://file.modx.pro/files/9/e/1/9e12c0988d5b54001de14c96ece3539f.png)

Особенности:

- создание событий как на фронте, так и в админке сайта
- интеграция с [**miniShop2**][0102]. (заказы, оплата)

## Демо сайт

Доступен демо сайт `http://userevents.vgrish.ru`
Логин и пароль для входа в [админку](http://userevents.vgrish.ru/manager/): `test`

## Установка

- [Подключите наш репозиторий](https://modstore.com)
- Установите **pdoTools** - это библиотека для быстрой работы с БД и оформлением, необходима для многих компонентов
- Установите **Theme.Bootstrap** - это тема оформления Twitter Bootstrap для MODX, под неё заточены стандартные чанки
- Установите [**miniShop2**][0102] - это магазин на основе которого реализован функционал заказа c оплатой
- Установите **UserEvents**

Для тестирования можно использовать [наш хостинг](https://modhost.pro), на нём эти дополнения можно выбрать прямо при создании сайта.

![Установка](https://file.modx.pro/files/5/7/a/57a30e0dc6e98d36ff56e9718a5f0bc0.png)

## Настройка

Все сниппеты UserEvents работают при помощи pdoTools и рассчитывают на использование [Fenom][010103] в чанках.

Это позволяет:

- сократить общее количество чанков
- повысить удобство работы
- ускорить работу
- делать более сложные чанки, за счёт продвинутой проверки условий через функции Fenom

Необходимо включить следующие настройки:

- `pdotools_fenom_modx`
- `pdotools_fenom_parser`
- `pdotools_fenom_php`

![настройки](https://file.modx.pro/files/6/1/c/61c556239adbb2d257654c68ec07f9a5.png)

## Шаблоны

Theme.Bootstrap устанавливает 2 шаблона, которые вы можете менять по своему усмотрению.
Вы можете переименовать и использовать их, или создать новые.

Всего нам нужно 1 шаблон.

### Бронирование и Заказ

Это шаблон для вывода формы бронирования и заказа

```fenom
<!DOCTYPE html>
<html lang="en">
  <head>
    {'Head' | chunk}
  </head>
  <body>
    {'Navbar' | chunk}
    <div class="container">
      <div id="content" class="main">
        {$_modx->resource.content}
      </div>
      {'Navbar' | Footer}
    </div>
  </body>
</html>
```

Созданные шаблон можно указать в системной настройке:

- `working_templates` - здесь указываем наш общий шаблон

## Разделы

Главная страница у нас уже есть, просто назначаем ей "Общий" шаблон и пишем в контент:

```fenom
{'!pdoMenu' | snippet}
```

Это покажет нам все документы сайта на главной, чтобы не заблудиться.

Теперь осталось только создать заказ.
Для этого создаём новую страницу с шаблоном "Общий" в корне сайта, и пишем там:

```fenom
{'!ue.order' | snippet} <!-- Форма оформления заказа, скрывается после его создания -->
{'!ue.get.order' | snippet} <!-- Вывод информации о заказе, показывается после его создания -->
```

Эти сниппеты выведут нам оформление заказа и покажут созданный заказ.

Они сделаны таким образом, чтобы что-то выводить только когда это нужно.
Например, `ue.order` прячется, если в адресе страницы есть параметр `msorder=id заказа`, а вот `ue.get.order` наоборот, реагирует только на него.

[010103]: /components/pdotools/parser
[0102]: /components/minishop2/
