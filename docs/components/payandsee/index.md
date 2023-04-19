---
name: PayAndSee

items: [
  {
    text: 'Интерфейс',
    link: 'interface/',
    items: [
      { text: 'Ресурс', link: 'interface/resource' },
      { text: 'Заказы', link: 'interface/orders' },
      { text: 'Контент', link: 'interface/content' },
      { text: 'Тарифы', link: 'interface/rates' },
      { text: 'Клиенты', link: 'interface/clients' },
      { text: 'Подписки', link: 'interface/subscriptions' },
      { text: 'Статусы', link: 'interface/statuses' },
      { text: 'Оповещения', link: 'interface/notifications' },
      { text: 'Настройки', link: 'interface/settings' },
    ],
  },
  {
    text: 'Сниппеты',
    link: 'snippets/',
    items: [
      { text: 'pas.content', link: 'snippets/pas-content' },
      { text: 'pas.order', link: 'snippets/pas-order' },
      { text: 'pas.get.order', link: 'snippets/pas-get-order' },
      { text: 'pas.subscription', link: 'snippets/pas-subscription' },
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
          { text: 'Корзина', link: 'development/services/cart' },
          { text: 'Заказ', link: 'development/services/order' },
          { text: 'Доставка', link: 'development/services/delivery' },
          { text: 'Оплата', link: 'development/services/payment' },
        ],
      },
    ],
  },
  {
    text: 'Другие дополнения',
    items: [
      { text: 'msDiscount', link: 'integrations/msdiscount' },
      { text: 'msPromoCode', link: 'integrations/mspromocode' },
    ],
  },
]
---
# PayAndSee

Для работы вам нужен MODX не ниже **2.3** и PHP не ниже **5.4**.

## Установка

- [Подключите наш репозиторий][002]
- Установите **pdoTools** - это библиотека для быстрой работы с БД и оформлением, необходима для многих компонентов
- Установите **Theme.Bootstrap** - это тема оформления Twitter Bootstrap для MODX, под неё заточены стандартные чанки
- Установите [**miniShop2**][0102] - это магазин на основе которого реализован функционал заказов и оплаты
- Установите **PayAndSee**

Для тестирования можно использовать [наш хостинг][002], на нём эти дополнения можно выбрать прямо при создании сайта.

![Установка](https://file.modx.pro/files/5/7/a/57a30e0dc6e98d36ff56e9718a5f0bc0.png)

## Настройка

Все сниппеты PayAndSee работают при помощи pdoTools и рассчитывают на использование [Fenom][010103] в чанках.

Это позволяет:

- сократить общее количество чанков
- повысить удобство работы
- ускорить работу
- делать более сложные чанки, за счёт продвинутой проверки условий через функции Fenom

Необходимо включить следующие настройки:

- `pdotools_fenom_modx`
- `pdotools_fenom_parser`
- `pdotools_fenom_php`

![Настройка](https://file.modx.pro/files/6/1/c/61c556239adbb2d257654c68ec07f9a5.png)

## Шаблоны

Theme.Bootstrap устанавливает 2 шаблона, которые вы можете менять по своему усмотрению.
Вы можете переименовать и использовать их, или создать новые.

Всего нам нужно 1 шаблон.

### Общий

Это шаблон для вывода содержимого обычных ресурсов

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

Он будет использоваться для вывода контента и заказа.

Созданные шаблон можно указать в системной настройке:

- `working_templates` - здесь указываем наш общий шаблон

## Разделы

Главная страница у нас уже есть, просто назначаем ей "Общий" шаблон и пишем в контент:

```fenom
{'!pdoMenu' | snippet}
```

Это покажет нам все документы сайта на главной, чтобы не заблудиться.

Затем [создаём контент][4] и проверяем, чтобы у него был шаблон разрешенный в `working_templates`

После создания [тарифы][5]

Теперь осталось только создать заказ.
Для этого создаём новую страницу с шаблоном "Общий" в корне сайта, и пишем там:

```fenom
{'!pas.order' | snippet} <!-- Форма оформления заказа, скрывается после его создания -->
{'!pas.get.order' | snippet} <!-- Вывод информации о заказе, показывается после его создания -->
```

Эти сниппеты выведут нам оформление заказа и покажут созданный заказ.

Они сделаны таким образом, чтобы что-то выводить только когда это нужно.
Например, `pas.order` прячется, если в адресе страницы есть параметр `msorder=id заказа`, а вот `pas.get.order` наоборот, реагирует только на него.

## Доступ

Доступ определяется наличием разрешающих статусов у [контента][4], [клиента][6], [подписки][7].
Подписка также имеет дату начала/окончания действия что тоже учитывается при определении доступа.

Для проверки доступа добавлены два модификатора:

- `pas_content_access` - проверка доступа к контенту. Синоним `pascaccess`
- `pas_resource_access` - проверка доступа к ресурсу. Синоним `pasraccess`

1 параметр - значение по дефолту
2 параметр - идентификатор контента / ресурса. По умолчанию текущий ресурс.
3 параметр - идентификатор клиента. По умолчанию текущий клиент.

Возможно [расширение][01220303] для реализации своей логики работы компонента.

## Примеры

Закрыть свободный доступ для поля `content`

```fenom
{$content | pasraccess}
```

Закрыть свободный доступ для поля `content` и вывести форму покупки платного контента

```fenom
{$content | pasraccess : ('pas.content' | snippet : ['resource' => $id])}
```

Проверить наличие доступа у текущего клиента к ресурсу 15 и записать в переменную

```fenom
{set $access = 1 | pasraccess : 0 : 15}

{* далее можно использовать для проверки доступа переменную $access *}

{if $access}
  Есть доступ
{else}
  Нет доступа
{/if}
```

## Демо сайт

Доступен демо сайт <http://pas.vgrish.ru>

Логин и пароль для входа в [админку][005]: `test`

[010103]: /components/pdotools/parser
[0102]: /components/minishop2/

[4]: /components/payandsee/interface/content
[5]: /components/payandsee/interface/rates
[6]: /components/payandsee/interface/clients
[7]: /components/payandsee/interface/subscriptions
[01220303]: /components/payandsee/development/extensions

[002]: https://modhost.pro
[005]: http://pas.vgrish.ru/manager/
