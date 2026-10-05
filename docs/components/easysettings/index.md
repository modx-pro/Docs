---
title: EasySettings
description: Удобная страница системных настроек и событий для MODX 2 и 3
logo: https://modstore.pro/assets/extras/easysettings/logo.png
author: GulomovCreative
categories: utilities
modstore: https://modstore.pro/packages/utilities/easysettings
modx: https://extras.modx.com/package/easysettings

items:
  - text: Интерфейс
    link: interface
  - text: Настройки компонента
    link: settings
---

# EasySettings

Компонент для MODX Revolution 2 и 3: заменяет страницу **Системные настройки** удобной формой. Настройки разложены по пространствам имён и разделам, у каждой видны название, описание и поле своего типа. Можно поменять сколько угодно значений и сохранить их одним нажатием.

![EasySettings в MODX 3](/components/easysettings/screenshots/overview.png)

## Зачем

Штатная страница — таблица ExtJS. Значение меняется двойным кликом по ячейке, пространство имён и раздел выбираются фильтрами, а группы разделов режутся постраничной навигацией.

EasySettings показывает те же настройки так, как их удобно читать и править:

- раздел открывается целиком, без пагинации, и у него свой адрес;
- поле подходит типу настройки: переключатель, число, пароль, JSON, список;
- изменения копятся и сохраняются разом.

Адрес страницы, пункт меню и права остаются прежними. Внешне страница не отличается от менеджера: вкладки, кнопки, окна и цвета — как у MODX 3 или MODX 2.

![EasySettings в MODX 2](/components/easysettings/screenshots/overview-modx2.png)

## Установка

Через Менеджер пакетов:

- [modstore.pro](https://modstore.pro/) ([как подключить репозиторий](https://modstore.pro/faq))
- [extras.modx.com](https://extras.modx.com/)

После установки откройте **Системные настройки**. Дальше: [Интерфейс](/components/easysettings/interface).

## Требования

- MODX Revolution 2.8+ или 3.x.
- PHP 7.4 и новее.
- Право `settings`, как у штатной страницы. Вкладка «Системные события» появляется при праве `events`.
