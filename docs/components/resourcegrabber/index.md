---
name: ResourceGrabber
description: Компонент реализует функционал парсинга данных по ссылке
logo: https://modstore.pro/assets/extras/resourcegrabber/logo-lg.png
author: vgrish
modstore: https://modstore.pro/packages/import-and-export/resourcegrabber

items: [
  {
    text: 'Интерфейс',
    link: 'interface/',
    items: [
      { text: 'Данные', link: 'interface/data' },
      { text: 'Сниппеты', link: 'interface/snippets' },
      { text: 'Настройка', link: 'interface/settings' },
    ],
  },
  {
    text: 'Разработка',
    items: [
      {
        text: 'Службы',
        items: [
          { text: 'Геттер', link: 'development/services/getter' },
          { text: 'Граббер', link: 'development/services/grabber' },
          { text: 'Сеттер', link: 'development/services/setter' },
        ],
      },
      { text: 'События', link: 'development/events' },
    ],
  },
]
---
# Быстрый старт

Для работы вам нужен MODX не ниже **2.3** и PHP не ниже **5.4**.

## Описание

**ResourceGrabber** - Граббер Ресурсов. Компонент реализует функционал парсинга данных по ссылке.

![ResourceGrabber](https://file.modx.pro/files/1/e/9/1e9d05d759ccf7a3abfc7b28c4746b95.png)

Особенности:

- Интеграция с [**miniShop2**][0102]. (создание/ обновление товаров)
- Интеграция с [**CurrencyRate**][0103]. (модификация цен)
- Интеграция с [**msOptionSeller**](https://modstore.pro/packages/ecommerce/msoptionseller). (задание опции `Магазин` товара minishop2)

## Демо сайт

Доступен демо сайт [http://s14332.h10.modhost.pro](http://s14332.h10.modhost.pro).

Логин и пароль для входа в [админку](http://s14332.h10.modhost.pro/manager/): `test`

## Установка

- [Подключите наш репозиторий](https://modhost.pro)
- Установите [**miniShop2**][0102] - это магазин на основе которого реализован функционал магазина
- Установите **ResourceGrabber**

Для тестирования можно использовать [наш хостинг](https://modhost.pro), на нём эти дополнения можно выбрать прямо при создании сайта.

![Установка](https://file.modx.pro/files/5/7/a/57a30e0dc6e98d36ff56e9718a5f0bc0.png)

### Настройка

- `working_templates` - здесь перечисляем шаблоны для которых нужно активировать функционал.

## Сниппеты

Создать сниппет для парсинга данных. В комплекте сниппет для сайта `aliexpress` в папке

```
core/components/resourcegrabber/snippets/aliexpress/product.inc
```

Вы можете создать сниппет для своих нужд по аналогии.

## Cron

Для обновления ресурсов можно использовать скрипт для `cron`, пример в папке

```
core/components/resourcegrabber/cron/update.php
```

```php
<?php

// обновим все товары магазина minishop2 сроком давности 5 дней

$q = $modx->newQuery('GrabData');
$q->setClassAlias('Grab');
$q->innerJoin('msProduct', 'Product', 'Grab.id = Product.id');
$q->where(array(
  'Grab.timestamp:<'  => $ResourceGrabber->changeDate(time(), '5d', true),
  'Product.deletedon' => false,
));

$idx = 0;
/** @var GrabData $d */
foreach ($modx->getCollection('GrabData', $q) as $d) {
  if ($data = $d->grab()) {
    $d->set('data', $data);
    $d->save();
    $idx++;
  }
}

$modx->log(modX::LOG_LEVEL_ERROR, "Process total: " . $idx);
```

[0102]: /components/minishop2/
[0103]: /components/currencyrate
