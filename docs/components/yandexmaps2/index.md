---
title: YandexMaps2
description: Конструктор Яндекс Карт для любых объектов, работа с mFilter2
logo: https://modstore.pro/assets/extras/yandexmaps2/logo-lg.png
author: gvozdb
modstore: https://modstore.pro/packages/maps/yandexmaps2

items: [
  {
    text: 'Сниппеты',
    items: [
      { text: 'YandexMaps2', link: 'snippets/yandexmaps2' },
    ],
  },
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Работа с mFilter2', link: 'mfilter2-integration' },
  { text: 'jQuery события', link: 'jquery-events' },
  { text: 'Конструктор карт', link: 'map-constructor' },
  {
    text: 'События плагинов',
    link: 'events/',
    items: [
      { text: 'ymOnLoadObjects', link: 'events/ymonloadobjects' },
      { text: 'Примеры', link: 'events/examples' },
    ],
  },
  {
    text: 'Кейсы',
    items: [
      { text: 'Точки из MIGX с кастомными иконками на фронт-энде', link: 'cases/migx-integration' },
      { text: 'Отключаем все элементы управления на карте', link: 'cases/disable-elements' },
      { text: 'Выводим данные родительского ресурса в балунах', link: 'cases/parent-data-in-balloons' },
    ],
  },
]
---
# YandexMaps2

::: warning
Для сохранения возможности бесплатного использования API Яндекс.Карт пользователи должны соблюдать ряд условий - <https://tech.yandex.ru/maps/jsapi/doc/2.1/terms/index-docpage/#index__conditions>
:::

## Преимущества перед подобными компонентами

- Новая версия API карт, которая поддерживается командой Яндекса
- [Работа с mFilter2][1] из коробки при небольшой настройке компонента в 3 шага
- Конструктор карты в бэкенде отображается в ресурсах, товарах, тикетах, пользователях
- Принцип работы похож на [UserFiles][2], что позволяет внедрить конструктор карт в любое место админки, с небольшими знаниями ExtJS. Так, к примеру, я прицепил UserFiles к своему кастомному объекту, без правки исходника:

[![](https://file.modx.pro/files/6/d/7/6d769e3a8dec96b995ff750ee9b53664s.jpg)](https://file.modx.pro/files/6/d/7/6d769e3a8dec96b995ff750ee9b53664.png)

## Внешний вид конструктора карт

Так выглядит конструктор карты в бэкенде при редактировании ресурса:

[![](https://file.modx.pro/files/6/6/7/6671db8a7e4acc9b3b1e5a57a0d0d168s.jpg)](https://file.modx.pro/files/6/6/7/6671db8a7e4acc9b3b1e5a57a0d0d168.png)

[Подробно про конструктор карт][3]

[1]: /components/yandexmaps2/mfilter2-integration
[2]: https://modstore.pro/packages/photos-and-files/userfiles
[3]: /components/yandexmaps2/map-constructor
