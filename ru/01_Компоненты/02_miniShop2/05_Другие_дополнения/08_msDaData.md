Компонент реализует функционал - автодополнение адреса и ФИО при оформлении заказа в minishop.

## получить ключ

зайти на сайт dadata.ru, зарегистироваться и получить ключ

## подключение

в шаблон корзины
```
[[msDaData? &token=`тут ваш токен`]]
[[!msCart?]]
[[!msOrder? &tplOuter=`tpl.msOrderDaData.outer`]]
```

## вывод на сайте
[![](http://file.modx.pro/files/7/8/2/78231f588fdab0f7f36a49696aafc88es.jpg)](http://file.modx.pro/files/7/8/2/78231f588fdab0f7f36a49696aafc88e.png)


