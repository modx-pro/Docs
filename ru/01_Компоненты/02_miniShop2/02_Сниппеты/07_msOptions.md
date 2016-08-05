Сниппет для вывода дополнительных свойств товара, хранящихся как JSON.

По умолчанию это `size`, `color` и `tags`, но вы можете добавить и другие, [расширив модель товаров][1].

[![](https://file.modx.pro/files/1/0/8/10862fe28a33bfa2894728e711afb61cs.jpg)](https://file.modx.pro/files/1/0/8/10862fe28a33bfa2894728e711afb61c.png)

## Параметры

Параметр            | По умолчанию        | Описание
--------------------|---------------------|---------------------------------------------
**tplOuter**        | tpl.msOptions.outer | Чанк обертки оформления
**tplRow**          | tpl.msOptions.row   | Чанк оформления списка
**product**         |                     | Идентификатор товара. Если не указан, используется id текущего документа.
**options**         |                     | Список опций для вывода, через запятую.
**name**            |                     |

## Оформление
Сниппет рассчитывает на работу с [чанком Fenom][2] и передаёт в него всего одну переменную `$options` с массивом вариантов опций.

Вы можете увидеть все доступные плейсхолдеры просто указав пустой чанк:
```
<pre>
[[msOptions?
    &options=`color,size`
    &tpl=``
]]
</pre>
```

[![](https://file.modx.pro/files/f/a/c/fac9abd11c65a700d5ab2f5ff7cd075es.jpg)](https://file.modx.pro/files/f/a/c/fac9abd11c65a700d5ab2f5ff7cd075e.png)

Стандартный чанк рассчитан на вывод списка опций в `select`, для отправки в корзину, вместе с товаром.

## Примеры (рабочие примеры проверено на версии minishop2 2.2.0-pl2)

```
 [[!msOptions?
        &options=`color`
        &tplOuter=`tpl.msOptions.outer`
        &tplRow=`tpl.msOptions.row`
    ]]
                        
    [[!msOptions?
        &options=`size`
        &tplOuter=`tpl.msOptions.outer`
        &tplRow=`tpl.msOptions.row`
     ]]
```
### Вызов в чанке my.msProducts.row, который выводит список товаров в категории:
```
[[!msOptions? &name=`size` &product=`[[+id]]` &tplRow=`@INLINE [[+value]]` &tplOuter=`@INLINE [[+rows]]` ]]
```

## Внимательно
Проверяйте что все лексиконы вызываемые в чанках у вас есть, например у меня в версии minishop2 2.2.0-pl2 не было лексикона для 
%ms2_product_color  поменяйте его на %ms2_frontend_color в чанке tpl.msOptions.outer или допишите лексикон.
Из-за отсутствия лексикона может отвалится весь вызов снипета.


[1]: /ru/01_Компоненты/02_miniShop2/03_Разработка/01_Плагины_товаров.md
[2]: /ru/01_Компоненты/01_pdoTools/03_Парсер.md
