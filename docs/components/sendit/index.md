---
title: SendIt
description: Компонент для работы с формами на сайте, аналог AjaxForm.
outline: [2,3]
lastUpdated: true
logo: https://sendit.art-sites.ru/assets/components/sendit/web/logo.jpg
modstore: https://modstore.pro/packages/users/sendit
repository: https://github.com/ShevArtV/sendit
author: ShevArtV
item:
    - text: Начало работы
      link: index
    - text: Простые формы 
      link: sending
    - text: Опросники
      link: quizform
    - text: Загрузка файлов
      link: fileuploader
    - text: Сохранение данных
      link: saveformdata
    - text: Уведомления
      link: notify

  dependencies:
    - pdoTools
    - FormIt

---

Возможности:

1. Отправка данных полей форм на сайт без перезагрузки страницы.
2. Загрузка файлов любых размеров на сервер и прикрепление их к письмам.
3. Создание опросников (многошаговых форм)
4. Сохранение данных форм в localStorage и заполнение полей после перезагрузки.
5. Есть авторизация, регистрация, восстановление пароля и редактирование личных данных.

Особенности:

1. Использует cookie и localStorage.
2. Не требует вызова сниппетов для отправки формы.
3. Есть защита от ботов и внешнего доступа.
4. Можно корректировать работу с помощью событий.
5. Отправка возможна на события change и input.
