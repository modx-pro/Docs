## Описание

Универсальный сниппет для создания корзины покупок в интернет-магазине. Так же сниппет можно использовать для временного хранения любых данных, например, функционал избранного и т.д. Данные сохраняются в базу данных, можно настроить время хранения. Управлять добавлением товаров в корзину и редактировать содержимое можно с помощью JavaScript функций (без зависимостей).

[Пакет в репозитории MODX](https://modx.com/extras/package/shoppingcart)

## Параметры сниппета shoppingCart

* **rowTpl** - Название чанка строки содержимого корзины.
* **outerTpl** - Название чанка обертки корзины.
* **emptyTpl** - Название чанка пустой корзины.
* **action** - Действие. Возможные значения: print - вывод содержимого корзины. Если не указано, производит действия, передаваемые в запросе.
* **currency** - Валюта товара.
* **lifeTime** - Время жизни данных корзины в БД в секундах. По умолчанию: 172800 (48 часов).
* **contentType** - Название типа содержимого.

Пример HTML-кода формы товара для добавления в корзину:

```html
<div class="shk-item">
    <form id="shk-form" action="[[~6]]" method="post">
        <input type="hidden" name="item_id" value="[[*id]]">
        <!-- Поле "category_id" нужно только для Shopkeeper4 -->
        <input type="hidden" name="category_id" value="[[*parent]]">
        <div>
            <div class="my-3">
                [[*description]]
            </div>
            <div class="my-3">
                Цена:
                <span class="big shk-price">[[*price:numFormat]]</span>
                <span class="shk-currency">[[+shk4.currency]]</span>
            </div>
            <div class="my-3">
                <input type="number" class="form-control d-inline-block text-center mr-2" value="1" min="1" step="1" name="count" style="width: 100px;">
                <button type="submit" class="btn btn-primary" name="submit_button">
                    В корзину
                </button>
            </div>
        </div>
    </form>
</div>
```

Пример вызова сниппета:

```php
[[!shoppingCart?
&action=`print`
&contentType=`shop`
&rowTpl=`shoppingCart_rowTpl`
&outerTpl=`shoppingCart_outerTpl`
&emptyTpl=`shoppingCart_emptyTpl`
]]
```

Вызов сниппета с набором параметров (рекомендуется):

```php
[[!shoppingCart@shoppingCartFull]]
```

### Плейсхолдеры в чанке "outerTpl"

* `[[+wrapper]]` - HTML-код со списком товаров (чанк "rowTpl").
* `[[+priceTotal]]` - Общая цена товаров в корзине.
* `[[+countTotal]]` - Общее число товаров в корзине.
* `[[+countTotalUnique]]` - Общее число уникальных товаров в корзине.
* `[[+currency]]` - валюта.

### Плейсхолдеры в чанке "rowTpl"

* `[[+item_id]]` - Идентификатор товара.
* `[[+title]]` - Название товара.
* `[[+name]]` - Псевдоним (alias) товара.
* `[[+uri]]` - URI адрес товара.
* `[[+count]]` - Количество единиц одного товара.
* `[[+price]]` - Цена.
* `[[+priceTotal]]` - Общая цена, включая цену праметров товара.
* `[[+options.x]]` - Любой параметр из массива "options". Пример для ``$options['color']``: ``[[+options.color]]``.
* `[[+index]]` - Индекс строки (от 0).
* `[[+num]]` - Номер строки (от 1).

### Плейсхолдеры, доступные в шаблоне, в котором вызывается сниппет "shoppingCart"

* `[[+shopping_cart.price_total]]` 
* `[[+shopping_cart.items_total]]` 
* `[[+shopping_cart.items_unique_total]]` 
* `[[+shopping_cart.delivery_price]]` 
* `[[+shopping_cart.delivery_name]]` 
* `[[+shopping_cart.ids]]` 

## Плагин shoppingCart

Плагин удаляет устаревшие корзины из базы данных при очистке кэша, а также сохраняет ID пользователя в данные корзины при авторизации.

События: **OnCacheUpdate**, **OnWebLogin**.

## Плагин shoppingCartShopkeeper4

Плагин, который формирует данные товара из базы данных MongoDB [приложения Shopkeeper4](https://github.com/andchir/shopkeeper4). Также плагин используется для сохранения данных заказа в базу данных MongoDB. Для вывода списка товаров на странице каталога можно использовать [сниппет Shopkeeper4](https://modx.com/extras/package/shopkeeper4integration).

События: **OnShoppingCartAddProduct**, **OnShoppingCartCheckoutSave**.

В форме товара должно быть скрытое поле с ID категории. Пример (страница товара):


```html
<input type="hidden" name="category_id" value="[[+page.parentId]]">
```

Пример поля категории в списке товаров:

```html
<input type="hidden" name="category_id" value="[[+page.parentId]]">
```

Пример поля категории в списке товаров:

```html
<input type="hidden" name="category_id" value="[[+parentId]]">
```

## Плагин shoppingCartModResource

Плагин, который формирует данные товара из ресурса MODX. Для цены можно использовать дополнительное поле (TV). Если вы используете ресурсы (документы) MODX в качестве товаров, убедитесь, что данный плагин активирован.

События: **OnShoppingCartAddProduct**, **OnShoppingCartCheckoutSave**.

Параметры:
* **tvNamePrice** - Имя доп. параметра цены товара. По умолчанию: "price".

## Оформление заказа

Для создания формы оформления заказа и отправки писем с уведомлениями нужно использовать сниппет [FormIt](https://modx.com/extras/package/formit). Для вывода списка товаров заказа в письме и сохранения заказа в БД можно использовать сниппет "shoppingCart", указав его в качестве хука (hooks).

Пример вызова сниппета FormIt:

```php
[[!FormIt?
&hooks=`spam,shoppingCart,FormItSaveForm,email,FormItAutoResponder,redirect`
&submitVar=`action_order`
&emailTpl=`shoppingCart_orderReport`
&fiarTpl=`shoppingCart_orderReport`
&emailSubject=`В интернет-магазине "[[++site_name]]" сделан новый заказ`
&fiarSubject=`Вы сделали заказ в интернет-магазине "[[++site_name]]"`
&emailFrom=`[[++emailsender]]`
&emailTo=`[[++emailsender]]`
&fiarReplyTo=`[[++emailsender]]`
&fiarToField=`email`
&redirectTo=`8`
&validate=`address:required,fullname:required,email:email:required,phone:required,delivery:required,payment:required`
&formFields=`fullname,address,phone,email,delivery,payment,message,orderOutputData`
&fieldNames=`fullname==Ф.И.О,address==Адрес,phone==Телефон,email==Адрес эл. почты,delivery==Способ доставки,payment==Способ оплаты,message==Комментарий,orderOutputData==Состав заказа`
&formName=`shop`
&shoppingCartMailRowTpl=`shoppingCart_mailOrderRowTpl`
&shoppingCartMailOuterTpl=`shoppingCart_mailOrderOuterTpl`
]]
```
В данном примере используется также хук "FormItSaveForm", который сохраняет данные формы для вывода в компоненте FormIt в административной части сайта. Если используете какой-то компонент для управления заказами, то этот хук можно убрать.

Хук "shoppingCart" вызывает событие "OnShoppingCartCheckoutSave" и плагин, который слушает это событие, может сохранить данные заказа и создать список товаров в заказе для вывода в письме.

Пример формы оформления заказа можно увидеть [здесь](https://github.com/andchir/modx-shopkeeper4/blob/master/core/components/shopping_cart/elements/chunks/page_formCheckout.html). Пример шаблона письма тоже есть в [комплекте сниппета ShoppingCart](https://github.com/andchir/modx-shopkeeper4/blob/master/core/components/shopping_cart/elements/chunks/orderReport.html).

### Параметры хука shoppingCart
* **shoppingCartMailRowTpl** - Название чанка одного товара. По умолчанию: "shoppingCart_mailOrderRowTpl".
* **shoppingCartMailOuterTpl** - Название чанка обертки списка товаров. По умолчанию: "shoppingCart_mailOrderOuterTpl".
* **shoppingCartMailContentType** - Название типа контента корзины. По умолчанию: "shop".

## JavaScript API

Скрипт ``shopping_cart.js`` можно использовать для управления корзиной покупок без перезагрузки страницы в браузере (Ajax).

Добавьте строку в ваш шаблон для подключения скрипта перед ``</head>`` или ``</body>``:

```html
<script src="[[++base_url]]assets/components/shopping_cart/js/shopping_cart.js"></script>
```

Пример использования:

```html
<script>
    var shoppingCart;
    document.addEventListener('DOMContentLoaded', function() {
        shoppingCart = new ShoppingCart({
            baseUrl: '[[++base_url]]',
            snippetPropertySetName: 'shoppingCartSmall',
            selector: '#shoppingCartSmallContainer',
            productFormSelector: '.shk-item form'
        });
    });
</script>
```

### Параметры класса ShoppingCart

* **baseUrl** - Базовый URL сайта. По умолчанию: "/".
* **connectorUrl** - URL коннектора. По умолчанию: "assets/components/shopping_cart/connector.php".
* **snippetPropertySetName** - Название набора параметров сниппета shoppingCart. Вы можете указать названия чанков и т.п. в этом наборе параметров, чтобы получить HTML код обновленной корзины.
* **selector** - Селектор элемента контейнера корзины. Внутри этого элемента должна быть форма (тег ``<form>``). По умолчанию: "#shoppingCartContainer".
* **useNumberFormat** - Использовать разбивку цены по разрядам. По умолчанию: true.
* **selectorPriceTotal** - Селектор элементов с общей ценой товаров. Содержимое будет автоматически обновляться после обновления корзины. По умолчанию: ".shopping-cart-price-total".
* **selectorCountTotal** - Селектор элементов с числом товаров в корзине. По умолчанию: ".shopping-cart-count-total".
* **selectorCountUniqueTotal** - Селектор элементов с числом уникальных товаров в корзине. По умолчанию: ".shopping-cart-count-unique-total".
* **selectorDeclension** - Селектор элемента со строкой (например: товар/товара/товаров), которую нужно склонять по падежам в зависимости от числа товаров. По умолчанию: ".shopping-cart-declension".
* **productFormSelector** - Селектор формы с кнопкой "Добавить в корзину". Форма будет отправляться без перезагрузки страницы в браузере.

### События

* **load** - После загрузки данных корзины.
* **formSubmitBefore** - Перед отправкой данных формы.
* **requestBefore** - Перед отправкой запроса.
* **requestAfter** - После отправки запроса.

Пример использования событий:

```javascript
<script>
    shoppingCart
        .addEventListener('formSubmitBefore', function(e) {// До отправки данных формы
            var buttonEl = e.detail.element.querySelector('button[type="submit"]');
            if (buttonEl) {
                buttonEl.setAttribute('disabled', '');// Блокируем кнопку
            }
        })
        .addEventListener('load', function(e) {// После получения ответа корзины покупок
            if (e.detail.element) {
                var buttonEl = e.detail.element.querySelector('button[type="submit"]');
                if (buttonEl) {
                    buttonEl.removeAttribute('disabled');// Убираем блокировку кнопки
                }
            }
        });
</script>
```
