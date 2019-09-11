# msDaData

Компонент реализует функционал - автодополнение адреса и ФИО при оформлении заказа в minishop.

Вам нужно зайти на сайт [dadata.ru][1], зарегистироваться и получить ключ.

Затем вызвать сниппет msDaData перед оформлением заказа:

```php
[[msDaData? &token=`тут ваш токен`]]

[[!msCart]]
[[!msOrder? &tplOuter=`tpl.msOrderDaData.outer`]]
```

Для оформления заказа нужно указать шаблон `tpl.msOrderDaData.outer`, идущий в комплекте.

Результат:
[![](https://file.modx.pro/files/3/9/d/39d379ec493cf148e0b190cdf8ca8812s.jpg)](https://file.modx.pro/files/3/9/d/39d379ec493cf148e0b190cdf8ca8812.png)

[1]: http://dadata.ru
