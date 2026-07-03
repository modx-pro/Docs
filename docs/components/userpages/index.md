---
title: userPages
description: Импорт и экспорт ресурсов MODX Revolution / MODX 3 и товаров miniShop2 / miniShop3
logo: https://modstore.pro/assets/extras/userpages/logo-md.png
author: Romanov Pavel
modstore: https://modstore.pro/packages/users/userpages
items: [
  { text: 'Сниппеты', link: 'snippets' },
  { text: 'Формы', link: 'forms' },
  { text: 'События плагинов', link: 'plugins' }
]
---

# userPages

Импорт и экспорт ресурсов и товаров из XLS, XLSX и CSV. Конфигурация через PHP-файлы в `core/components/impex/config/`.

## Основные свойства

- Работает со стандартными ресурсами и товарами MiniShop3
- WYSIWYG-редактор [Pell](https://github.com/jaredreich/pell)
- Загрузка файлов и изобажений с возможностью использования Dropzone
- Поддержка TV-параметров (с учётом источников файлов), MIGX-полей, а также галереи, полей и опций товаров MiniShop3
- Возможность сохранения черновика
- Email-уведомления менеджеров
- Настраиваемые всплывающие уведомления
- Системные события для плагинов

## Установка

Пакет доступен в [репозитории](https://modstore.pro/packages/users/userpages) устанавливается стандартным образом через установщик MODX3.

## Системные настройки

|Параметр|Описание|Значение по умолчанию|
|:-------|:-------|:-----------|
| **up_css_url** | Путь к основному CSS-файлу относительно корня сайта | `{assets_url}components/userpages/js/default.css` |
| **up_js_url** | Путь к основному JS-файлу относительно корня сайта | `{assets_url}components/userpages/js/default.js` |
| **up_notifications** | Скрипт для всплывающих уведомлений.<br>Поддерживаются [Notyf](https://carlosroso.com/notyf/) и [SweetAlert2](https://modstore.pro/packages/alerts-mailing/sweetalert2) (требуется установка), а также можно указать `miniShop3`, `FetchIt` или `AjaxForm` для использования уведомлений этих компонентов (если они установлены). | Notyf |

## Пример формы

![](https://demo.rpa-design.ru/media/userpages/all.jpg)  
