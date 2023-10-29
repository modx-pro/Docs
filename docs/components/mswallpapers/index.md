---
title: msWallpapers
description: Продвинутая форма для заказа обоев
logo: https://modstore.pro/assets/extras/mswallpapers/logo-lg.png
author: gvozdb
modstore: https://modstore.pro/packages/other/mswallpapers

items: [
  { text: 'Установка и настройка', link: 'setup' },
  {
    text: 'Сниппеты',
    items: [
      { text: 'mswp.form', link: 'snippets/mswp-form' },
    ],
  },
  {
    text: 'События плагинов',
    link: 'events/',
    items: [
      { text: 'mswpOnGetProductPrice', link: 'events/mswpongetproductprice' },
      { text: 'mswpOnGetProductCost', link: 'events/mswpongetproductcost' },
      { text: 'Примеры', link: 'events/examples' },
    ],
  },
  {
    text: 'Кейсы',
    items: [
      { text: 'Форма в модальном окне с предварительным выбором текстуры', link: 'cases/modal-form' },
    ],
  },
]
---
# msWallpapers

Компонент создаёт расширенную форму заказа для выбора обоев. Работает только с miniShop2.

![msWallpapers](https://file.modx.pro/files/0/8/a/08a9f68098e8f4f5891f8d7a35a215cb.png)

## Умеет

- Запоминать выбранную область текстуры,
- Считать стоимость за квадратный метр,
- Выводить превью выбранного фрагмента в корзине,
- Выгружать данные заказа в формате PDF в бэкенде.

## Можно

- Указать размер стены, на которую будут клеиться обои,
- Выбрать фрагмент размноженной по горизонтали текстуры,
- Отзеркалить текстуру в области предпросмотра,
- Сделать обои чёрно-белыми,
- Показать вертикальные полосы для ориентира.

## Как работает область превью

Если упростить алгоритм для понимания, то в зависимости от указанных пользователем размеров, приложение высчитывает размер области в соответствии с максимально указанным размером области предварительного просмотра в параметрах сниппета, определяет сколько раз нужно повторить текстуру и выводит пользователю.

::: warning Важно
Компонент работает только с miniShop2 >= 2.4.
:::
