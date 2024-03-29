# Быстрый старт

Для работы вам нужен MODX не ниже **2.3** и PHP не ниже **5.4**.

## Особенности

- работа с **любыми объектами**. Тип объекта указывается в атрибуте `type`
- работа с **любыми пользователями**. Для авторизованных пользователей идентификатором служит `id пользователя`, для неавторизованный `id сессии`.

Избранному анонимных пользователей присваивается флаг `anon`.

## Установка

- [Подключите наш репозиторий](https://modstore.com)
- Установите **pdoTools** - это библиотека для быстрой работы с БД и оформлением, необходима для многих компонентов
- Установите **msFavorites**

Демо-версию можно посмотреть на [msfavorites.vgrish.ru](http://msfavorites.vgrish.ru), а тестирования можно использовать [наш хостинг](https://modhost.pro), на нём эти дополнения можно выбрать прямо при создании сайта.

[![](https://file.modx.pro/files/e/c/0/ec042ee4f64328e2b2b4078965b9419ds.jpg)](https://file.modx.pro/files/e/c/0/ec042ee4f64328e2b2b4078965b9419d.png)

## Подключение

Вы можете использовать msFavorites где угодно на странице. Для этого нужно подключить сниппет `msFavorites.initialize` в любом удобном месте, добавить служебную разметку необходимым элементам. Все!

[пример](http://msfavorites.vgrish.ru#ex-connect)

```modx
[[!msFavorites.initialize]]

<a class="msfavorites"
  data-click
  data-data-list="default"
  data-data-type="resource"
  data-data-key="9"
>
  <span class="msfavorites-text-add">добавить</span>
  <span class="msfavorites-text-remove">удалить</span>
  <br>
  звезда: <span class="msfavorites-total-user">0</span>
  <br>
  всего: <span class="msfavorites-total">0</span>
</a>
```
