---
title: ViewsOnline
description: Число онлайн-пользователей на странице
logo: https://modstore.pro/assets/extras/viewsonline/logo-lg.png
author: bazmaster
modstore: https://modstore.pro/packages/users/viewsonline
---
# ViewsOnline

## Сниппет ViewsOnline

![Сниппет ViewsOnline](https://file.modx.pro/files/8/f/b/8fbfa1707d51a469803adaad32ef40d1.jpg)

Cниппет выводит статистику пользователей онлайн для любой страницы сайта и работает на базе таблицы просмотров от Tickets.
Может использоваться например для форума в виде:
> Читают тему 17 пользователей: гостей 15, пользователей 2 (user1, user5)

Для работы скрипту нужны:

1. установленный **pdoTools**
2. включённый **Fenom** в настройках pdoTools
3. установленный **Tickets**
4. разрешён в настройках Tickets **подсчёт просмотров гостей**

Эти дополнения бесплатны и на их базе работает сниппет **ViewsOnline**.

## Параметры сниппета

- `tpl` — чанк для вывода информации, активно используются возможности Fenom. Плейсхолдеры чанка:`total`,`guests`,`users` и`userlist`.
- `tplUserlist` — чанк для вывода списка пользователей, принимает 2 плейсхолдера:`separator` и`user`.
- `tplUserlistOuter` - чанк для обёртки списка пользователей, принимает плейсхолдер:`wrapper`.
- `separator` — разделитель для списка пользователей.
- `pid` — id страницы для вывода статистики. По умолчанию текущая.
- `parents` - id разделов через запятую для подсчёта значений всех страниц, исключает параметр `pid`
- `min` — количество минут, в течении которых пользователь считается онлайн. По умолчанию: `15`

Все параметры есть у сниппета и их можно увидеть перетаскиванием сниппета на поле с кодом.

## Примеры

Вызываем сниппет некэшируемым на нужной нам странице:

```fenom
{'!ViewsOnline' | snippet}
```

Пример вызова статистики для какой-то другой страницы:

```fenom
{'!ViewsOnline' | snippet : [
  'pid' => 1,
]}
```

Пример вызова статистики для всего раздела, например **форума** на сайте:

```fenom
{'!ViewsOnline' | snippet : [
  'parents' => 10,
]}
```

Пример вызова статистики для двух разделов, например раздела **Вакансии (35)** и раздела **Резюме (48)**, если нужно объединить их в группу **Работа**:

```fenom
{'!ViewsOnline' | snippet : [
  'parents' => '35,48',
]}
```

## Ссылки

- [Статья в сообществе](https://modx.pro/solutions/9778-output-users-online-for-a-specific-page/)
- [Демо-сайт](https://demo.bazstudio.com)
- [Скачать транспортный пакет](https://demo.bazstudio.com/assets/files/viewsonline-1.0.1-beta1.transport.zip)
- [Пакет в modstore.pro](https://modstore.pro/packages/users/viewsonline)
