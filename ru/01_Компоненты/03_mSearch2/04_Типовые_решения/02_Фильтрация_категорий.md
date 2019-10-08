# Фильтрация категорий

Готовое решение фильтрации категорий товаров по дочерним товарам. В фильтрах выводятся параметры товаров, а в результатах - категории, которые содержат эти товары.

Логика работы mFilter2:

* Фильтр использует для поиска и вывода ресурсов один сниппет, указанный в &elements. В случае работы с товарами там обычно указывается msProducts.
* К этому сниппету будет 2 обращения: предварительная выборка и возврат подходящих id товаров, а затем их вывод пользователю.
* Различить эти два запроса можно по присылаемому параметру **returnIds**.

В получение id товаров  вмешиваться не нужно, потому что фильтр должен построить из них фильтры. Нужно изменить только вывод этих товаров, заменив их на категории.

Пишем новый сниппет **msProductsCategories**:

```php
<?php
// Он работает только, если это вывод товаров, а не запрос подходящих id
if (empty($returnIds)) {
    // Присоединяем таблицу категорий
    if (empty($innerJoin) || !$where = $modx->fromJSON($innerJoin)) {
        $innerJoin = array();
    }
    $innerJoin['Category'] = array(
        'class' => 'msCategory',
    );
    $scriptProperties['innerJoin'] = $modx->toJSON($innerJoin);
    // Группируем по категории
    $scriptProperties['groupby'] = 'Category.id';
    // Заменяем поля товаров полями категорий
    $scriptProperties['select'] = $modx->toJSON(array(
        'Category' => '*',
        // Можно переопределить еще и выборку полей товара, чтобы были с префиксом,
        // но я это закомментировал, потому что поля Data и так доступны, а товары не нужны
        //'msProduct' => $modx->getSelectColumns('msProduct', 'msProduct', 'product.'),
        //'Data' => $modx->getSelectColumns('msProductData', 'Data', 'data.'),
    ));
}

// Мы добавили свой опции, а дальше пусть работает стандартный сниппет
return $modx->runSnippet('msProducts', $scriptProperties);
```

Как видите, всё работает через стандартные параметры pdoTools, никаких хаков.

Остаётся только указать этот новый сниппет при вызове mFilter2:

```php
[[!mFilter2?
    &class=`msProduct`
    &element=`msProductsCategories`
    &parents=`0`
    &filters=`
        ms|price:number,
        msoption|tags,
        ms|vendor:vendors,
        ms|old_price:boolean,
    `
    &tpl=`@INLINE <p>
        <a href="{$uri}">
            <img src="{$thumb ?: '/assets/components/minishop2/img/web/ms2_small.png'}">
            {$pagetitle}
        </a>
    </p>`
    &tplFilter.outer.ms|price=`tpl.mFilter2.filter.slider`
    &tplFilter.row.ms|price=`tpl.mFilter2.filter.number`
]]
```

Получившееся решение не меняет исходников компонент, так что его можно безопасно обновлять.
