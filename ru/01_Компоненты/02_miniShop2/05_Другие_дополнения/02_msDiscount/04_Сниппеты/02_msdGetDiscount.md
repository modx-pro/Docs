# msdGetDiscount

Сниппет для вывода скидки и\или срока окончания акции товара.

Может вызываться как **prepareSnippet в msProducts**, и отдельно на странице.
В первом случае результатом работы будет добавление двух параметров в массив товара: `[[+sale_discount]]` (размер скидки) и `[[+remains]]` (количество секунд до окончания акции).
А во втором, он просто выведет чанк с этими плейсхолдерами.

## Параметры

| Название          | По умолчанию                    | Описание                                                                             |
| ----------------- | ------------------------------- | ------------------------------------------------------------------------------------ |
| **&id**           |                                 | Id товара для вывода скидки и времени действия акции.                                |
| **&sale**         |                                 | Список акций для вывода, через запятую. Если пусто - фильтрация по акциям отключена. |
| **&tpl**          | tpl.msProduct.discount          | Чанк оформления для вывода результата работы сниппета.                               |
| **&frontend_css** | [[+assetsUrl]]css/web/main.css  | Файл с css стилями для подключения на фронтенде.                                     |
| **&frontend_js**  | [[+assetsUrl]]js/web/default.js | Файл с javascript для подключения на фронтенде.                                      |

## Примеры

Сниппет сам определяет режим работы, в зависимости от параметров вызова

Обычный вызов на странице товара:

``` php
[[!msdGetDiscount]]
```

Вызов в другом месте, с указанием параметров:

``` php
[[!msdGetDiscount?
    &id=`15`
    &sale=`1,2,3,4,5`
]]
```

Вызов как сниппет подготовки в msProducts:

``` php
<link rel="stylesheet" href="[[++assets_url]]components/msdiscount/css/web/main.css" type="text/css" />
[[!msProducts?
    &parents=`0`
    &prepareSnippet=`msdGetDiscount`
    &tpl=`@INLINE
        <div class="row ms2_product">
            <a href="{{+link}}">{{+pagetitle}}</a>
            <span class="price">{{+price}} {{%ms2_frontend_currency}}{{+remains}}</span>
        </div>
        <!--minishop2_remains -{{+sale_discount}} — <span class="msd_remains">{{+remains}}</span>-->
        <!--minishop2_!remains -{{+sale_discount}}-->
    `
]]
<script type="text/javascript" src="[[++assets_url]]components/msdiscount/js/web/default.js"></script>
```

Будут выведены все товары со скидкой и временем до окончания акции (если есть). Если нужно вывести только товары по акциям, лучше и проще использовать [msdBuyNow][1].

[1]: /ru/01_Компоненты/02_miniShop2/05_Другие_дополнения/02_msDiscount/04_Сниппеты/01_msdBuyNow.md
