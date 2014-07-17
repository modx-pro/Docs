Компонент реализует функционал - список избранного, добавление/удаление товара minishop в избранное. Формирование списка избранного.

* Сохраняет выбранные товары в сессии пользователя.
* Возможность работы с любым ресурсом, не обязательно товар minishop.
* Быстрая работа через Ajax

## Настройки модуля
Для редактирования настроек скрипта перейдите в раздел "Настройки системы" и выберите фильтр "msFavorites"

[![](http://file.modx.pro/files/a/4/3/a43af68507f0353e28142debef2144fcs.jpg)](http://file.modx.pro/files/a/4/3/a43af68507f0353e28142debef2144fc.png)

* указать id ресурса списка избранного
* файл c javascript на фронте сайта
* файл c css на фронте сайта

## подключение ссылок

в шаблон товара (ресурса) необходимо добавить ссылки на добавление/удаление

```
<div class="favorites favorites-default [[+msfavorites.ids.[[+id]]]]" data-id="[[+id]]">
  <a href="#" class="favorites-add favorites-link" data-text="[[%msfavorites_updating]]">[[%msfavorites_add_to_list]]</a>
  <a href="#" class="favorites-remove favorites-link" data-text="[[%msfavorites_updating]]">[[%msfavorites_remove_from_list]]</a>
  <a href="[[+msfavorites.link]]" class="favorites-go">[[%msfavorites_go_to_list]]</a>
  <span class="favorites-total">[[+msfavorites.total]]</span>
</div>
```
образец оформления для товара minishop появится при установке пакета

[![](http://file.modx.pro/files/f/2/1/f213f5eaeec8c974b4ed1968d77e6c6es.jpg)](http://file.modx.pro/files/f/2/1/f213f5eaeec8c974b4ed1968d77e6c6e.png)

## вывод на сайте

[![](http://file.modx.pro/files/5/1/9/519831af139d5c411b47bd22a341f19ds.jpg)](http://file.modx.pro/files/5/1/9/519831af139d5c411b47bd22a341f19d.png)

## формирование списка избранного

* Вывести список избранного можно любым удобным вам сниппетом. Нужно только указать id ресурсов в списке - доступны в плейсходере [[+msfavorites.ids]]
* Списов товаров необходимо обернуть в 
```
<div class="msfavorites-list">....список...</div>
```
* пример списка товаров minishop

```
[[!+msfavorites.total:is=`0`:then=`список пуст`:else=`

<div class="msfavorites-list">

[[!msProducts?
&limit=`[[+msfavorites.total]]`
&resources=`[[+msfavorites.ids]]`
&parents=`0`
]]

</div>

`]]
```

