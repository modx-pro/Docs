# msOneClick

**Внимание!! Для тех кто обновляется с версии 1.1.0 обязательно измените [[+selector]] в чанке tpl.msOneClick.btn</strong> из id на class**

```html
<a href="[[~[[+id]]]]#[[+selector]]"  class="[[+selector]] btn_one_click" data-hash="[[+hash]]" data-product="[[+id]]">[[%msoc_btn_one_click]]</a>
```  

Приложение создает заказ в интернет-магазине minishop2, а также может отправлять заказ в виде письма на указанный e-mail адрес.
На данный момент приложение не передает не каких параметров из msOptions и других модификаций. Так как есть различие между добавлением в корзину и модификацией на стороне  клиента.
Для работы необходимо вставить сниппет на страницу с товаром **[[!msOneClick]]**, и у вас появится кнопка «купить в 1 клик».
Работает начиная с версии MODX Revolution 2.2.

- [Купить][1]
- [Демо-версия][2]

![](https://file.modx.pro/files/e/1/a/e1a81a32bebcb07dbe4e4553940837fd.png)
![](https://file.modx.pro/files/5/7/6/576f04ffeed94c85df55b5e9e05a3733.png)

В miniShop2 добавляются метод доставки и метод оплаты «Быстры заказа» и назначаются для создания заказов через модельное окно. В настройка приложения можно изменить эти способы.

Два режима работы:

- MS — создание заказа в minishop2
- MAIL — отправка на email менеджера без создания заказа в minishop2

## Быстрый старт

Для создания заказа в miniShop2:

``` php
[[!msOneClick?
    &id=`5`
    &create_order=`MS`
]]

Для отправки сообщения на e-mail:
[[!msOneClick?
    &id=`5`
    &create_order=`MAIL`
    &email_method_mail=`mail@mail.ru`
]]
```

### На странице с товаров

```[[!msOneClick]]```

### В категориях и на других страницах

```[[!msOneClick? &id=`[[+id]]`]]```

### Подключение msOptionsPrice2

При подключении используйте инструкции из приложения [https://modstore.pro/packages/ecommerce/msoptionsprice2][1]

Код приложения вставить в чанк **tpl.msoneclick.form** пример
Для работы приложения **msOptionsPrice2** необходимо подключить js.

```javascript
    $(document).on('msoneclick_after_init', function (e, data) {
        if (msOneClick.form.hasClass('msoptionsprice-product') && jQuery().msOptionsPrice) {
            msOptionsPrice.initialize()
        }
    })
```

***Внимание!!! Если вы подключили js код и он у вас правильно инициализировался, то по вопросам настройки msOptionsPrice2 обращайтесь к автору приложения msOptionsPrice2***

### Параметры настроек

| Параметр              | По умолчанию               | Название                                       | Описание                                                                                                                                                                                                  |
| --------------------- | -------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **required_fields**   | eceiver,email,phone        | Обязательные поля для заполнения пользователем |
| **payments**          | Быстрый заказ              | Метод оплаты по-умолчанию                      | Укажите метод оплаты по-умолчанию для отправки быстрого заказ                                                                                                                                             |
| **deliverys**         | Быстрый заказ              | Метод доставки по-умолчанию                    | Укажите метод доставки по-умолчанию для отправки быстрого заказ                                                                                                                                           |
| **mask_phone**        | True                       | Включить маску телефонного номера              | На поле с телефоном будет добавлена обяательная маска +7 (999) 999 9999                                                                                                                                   |
| **mask_phone_format** | +9 (999) 999-9999          | Маска телефона                                 | Формат ввода долже: +9 (999) 999-9999                                                                                                                                                                     |
| **framework**         | default                    | Подключить framework                           | По умолчанию default будет подключен свой скрипт для запуска модельного окна. Можно указать default,bootstrap,semantic,materialize,uIkit для этих фрейм ворково определены функци запуска модельного окна |
| **frontend_css**      | [[+cssUrl]]web/default.css | frontend_css                                   | По-умолчанию assets/components/msoneclick/css/web/default.css                                                                                                                                             |
| **frontend_js**       | [[+jsUrl]]web/default.js   | Js для фронтенда                               | По-умолчанию assets/components/msoneclick/js/web/default.js                                                                                                                                               |

### Параметры сниппета msOneClick

| Параметр                 | По умолчанию                                       | Описание                                                                                                                                                                             |
| ------------------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **method**               | MS                                                 | Метод отправки заказа: MS — отправить заказ в minishop2; MAIL — отправить заказ на e-mail, указанный в miniShop2 для менеджера, или по умолчанию (ms2_email_manager или emailsender) |
| **default_images**       | /assets/components/minishop2/img/web/ms2_small.png | Изображение по умолчанию для товара. В случае когда изображение отсутствует                                                                                                          |
| **field_required_class** | msoc_field__required                               | Класс css для обязательного поля для заполнения                                                                                                                                      |
| **email_method_mail**    | Пусто                                              | E-mail, куда будет уходить письмо, если использовать метод MAIL. Если оставить пустым, то будут использоватся настройки ms2_email_manager или emailsender                            |
| **tplBtn**               | tpl.msOneClick.btn                                 | Чанк оформления кнопки «быстрый заказ»                                                                                                                                               |
| **tplModal**             | tpl.msOneClick.modal                               | Чанк оформления модельного окна                                                                                                                                                      |
| **tplForm**              | tpl.msOneClick.form                                | Чанк оформления формы заказа                                                                                                                                                         |
| **tplSendSuccessMS**     | tpl.msOneClick.MS.send                             | Чанк оформления сообщения успешной отправки формы                                                                                                                                    |
| **tplSendSuccessMAIL**   | tpl.msoneclick.MAIL.send                           | Чанк оформления сообщения после отправки формы при методе MAIL                                                                                                                       |
| **tplMAILmessage**       | tpl.msoneclick.email.message                       | Чанк оформления сообщения для метода MAIL, отправляемый на почту                                                                                                                     |

### Примеры

#### Переназначения js для модельного окна

js события

| Параметр                  | Описание                                     |
| ------------------------- | -------------------------------------------- |
| **msoneclick_load**       | Срабатыватыеваем после получение данных ajax |
| **msoneclick_after_init** | Срабадывает после инициализации скриптов     |

#### Добавлены события для js

```javascript
    // Пример подключение своих скриптов
    $(document).on('msoneclick_load', function (e, data) {

    })

    // Пример подключение своих скриптов
    $(document).on('msoneclick_after_init', function (e, data) {
        if (msOneClick.form.hasClass('msoptionsprice-product') && jQuery().msOptionsPrice) {
            msOptionsPrice.initialize()
        }
    })
```

#### Переопределение методов для модельного окна

```javascript
   msOneClick.Modal.show = function () {
       console.log('show')
   }
   msOneClick.Modal.hide = function () {
       console.log('hide')
   }
```

#### пример кода для msOptionsPrice2

вставить в чанк tpl.msoneclick.form

```html
   <form class="ms2_form msoptionsprice-product" id="[[+formid]]" method="post" >
       <input type="hidden" name="method" value="[[+method]]">
       <input type="hidden" name="pageId" value="[[+pageId]]">
       <input type="hidden" name="ctx" value="[[+ctx]]">
       <input type="hidden" name="hash" value="[[+hash]]">
       <input type="hidden" name="payment" value="[[+payment]]">
       <input type="hidden" name="delivery" value="[[+delivery]]">
       <input type="hidden" name="id" value="[[+product.id]]"/>
       <input type="hidden" name="mssetincart_set" value="[[+product.id]]">
       <input type="hidden" name="key" class="key-product" value="">
       <input type="hidden" name="options" value="[]">

       <div class="forder-popup__goods " >
           <div id="msCart">
               <div id="dynamicmodal">
                   <div class="msoc_product_line" id="[[+product.key]]">
                       <div class="msoc_product_line_image">
                           <img src="[[+product.thumb]]" />
                       </div>
                       <div class="msoc_product_line_pagetitle">
                           <span>[[+product.pagetitle]]</span>
                       </div>
                       <div class="msoc_product_line_count">
                           <div class="product__add-cart ">
                               <div class="text-right">
                                   <span class="forder-popup__price">
                                       <span id="[[+selector]]_price" class="msoptionsprice-cost msoptionsprice-[[+product.id]]">[[+product.price]]</span> руб.
                                       [[+product.old_price:is=`0`:then=``:else=`<span  id="[[+selector]]_price_old" class="old_price msoptionsprice-old-cost msoptionsprice-[[+product.id]]">[[+product.old_price]]</span>  руб.`]]
                                   </span>
                               </div>
                               <div class="text-right">
                                   <input type="hidden" name="price" value="[[+product.price]]">
                                   <input type="hidden" name="product_id" value="[[+product.id]]">
                                   <div class="count-field input-group input-prepend">
                                       <span class="count-field-control count-field-control-down" onselectstart="return false" onmousedown="return false">+</span>
                                       <input value="[[+product.count]]" placeholder="0" type="text" autocomplete="off" name="count" class="count-field-input">
                                       <span class="count-field-control count-field-control-up" onselectstart="return false" onmousedown="return false">-</span>
                                   </div>
                               </div>

                           </div>
                       </div>

                       <!-- msOptionsPrice2 -->
                       <div class="modal-options msoptionsprice-[[+product.id]]">
                           {'msOptionsPrice.option' | snippet : [
                           'product' => $product.id,
                           'options' => 'color,size',
                           'processColors' => 1,
                           'constraintOptions' => [
                           'phytomodule_color' => ['sizes'],
                           'equipment' => ['sizes','phytomodule_color'],
                           'frame_color' => ['sizes','phytomodule_color','equipment']
                           ]
                           ]}
                       </div>

                   </div>
               </div>
           </div>
       </div>

       <div class="msoneclick_form" >
           <div class="forder-popup__block forder-popup__block--grey">

               <div class="msoneclick_form-group">
                   <label for="msoc_city" class="msoneclick_form-label [[+city_required]]">[[%msoc_field_city]]</label>
                   <div class="msoneclick_form-field">
                       <input type="text" value="[[!+order.city]]" name="city"  id="msoc_city" placeholder="[[%msoc_field_city_ple]]">
                   </div>
               </div>

               <div class="msoneclick_form-group">
                   <label for="msoc_addr_country" class="msoneclick_form-label [[+addr_country_required]]">[[%msoc_field_country]]</label>
                   <div class="msoneclick_form-field">
                       <input type="text" value="[[!+order.addr_country]]" name="addr_country" id="msoc_addr_country" placeholder="[[%msoc_field_country_ple]]">
                   </div>
               </div>
           </div>
           <div class="forder-popup__block forder-popup__block--grey">
               <div class="msoneclick_form-group">
                   <label for="msoc_receiver" class="msoneclick_form-label [[+receiver_required]]">[[%msoc_field_receiver]]</label>
                   <div class="msoneclick_form-field">
                       <input type="text" value="[[!+order.receiver]]" name="receiver" id="msoc_receiver" placeholder="[[%msoc_field_receiver_ple]]">
                   </div>
               </div>
               <div class="msoneclick_form-group">
                   <label for="msoc_phone" class="msoneclick_form-label [[+phone_required]]">[[%msoc_field_phone]]</label>
                   <div class="msoneclick_form-field">
                       <input type="text" name="phone" value="[[!+order.phone]]" autocomplete="off" id="msoc_phone" placeholder="[[%msoc_field_phone_ple]]">
                   </div>
               </div>

               <div class="msoneclick_form-group">
                   <label for="msoc_email" class="msoneclick_form-label [[+email_required]]">[[%msoc_field_email]]</label>
                   <div class="msoneclick_form-field">
                       <input type="email" name="email" value="[[!+order.email]]" id="msoc_email" placeholder="[[%msoc_field_email_ple]]">
                   </div>
               </div>
           </div>

           <div class="forder-popup__block forder-popup__block--grey">
               <div class="msoneclick_form-group">
                   <label for="msoc_comment" class="msoneclick_form-label">[[%msoc_field_comment]]</label>
                   <div class="msoneclick_form-field">
                       <textarea autocomplete="off" placeholder="[[%msoc_field_comment_ple]]" id="msoc_comment" name="comment">[[!+order.comment:default=``]]</textarea>
                   </div>
               </div>
           </div>

           <div class="modal-footer">
               <button type="submit"  name="msoc_send_from" class="mso_button btn_send">[[%msoc.button]]</button>
               <p class="msoc-muted">
                   [[%msoc_form_footer_text]]
               </p>
           </div>
       </div>
   </form>
```

#### Подгрузка выбранных опций msOptionsPrice2 со страницы

Пользователи могут выбрать опции находясь на странице. При запуске модельного окна опции не будут выбранны так как они запоминаются только на странице.

Для того чтобы опции автоматически были выбранны в модельном окне, необходимо добавить в форму где выбираются опции класс с id товара:

```html
Пример форм
<form class="ms2_form msoptionsprice-product-{$id}" method="post" > // для чанк tpl.msProducts.row
<form class="ms2_form msoptionsprice-product-[[*id]]" method="post" > // для чанк msProduct.content
```

Добавить код в подключенный JS файл

```javascript
   $(document).on('msoneclick_after_init', function (e, data) {
       // После запуска модельного окна ищется форма на странице
       var form = $('.msoptionsprice-product-'+msOneClick.Product.product_id)
       if (form.length) {
           // Если форма найден отправляется запрос для обновления данных в форме модельного окна
           msOptionsPrice.Product.action('modification/get',form)
       }
   })

```

[1]: https://modstore.pro/packages/integration/msoneclick
[2]: http://msp.bustep.ru/msoneclick.html
