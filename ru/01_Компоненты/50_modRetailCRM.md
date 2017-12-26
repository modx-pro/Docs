## modRetailCRM

Модуль для интеграции популярного сервиса [RetailCRM][1] с MODX.

### Ключевые особенности


* Плагин срабатывающий на событие onUserSave, автоматически создает новый контакт в CRM при регистрации нового пользователя в MODX. Данное событие срабатывает в том числе при оформлении заказа в интернет-магазине.
* Плагин срабатывающий на событие msOnCreateOrder, автоматические создает новый заказ в CRM при оформлении заказа в MiniShop2
* Дополнение основано на собственной библиотеке RetailCRM и в ручном режиме поддерживает ВЕСЬ функционал доступный через [API RetaiCRM][2]

Для любителей кастомизировать функционал сайта\интернет-магазина под собственные нужды это означает, что вы можете как угодно взаимодействовать с CRM, оперируя любыми данными. 
Для этого доступны десятки методов.
Достаточно вызвать приложение и указать нужный метод

Например:

```
//Вызываем приложение
if (!$modx->getService('modretailcrm','modRetailCrm', MODX_CORE_PATH.'components/modretailcrm/model/modretailcrm/')) {  
    $modx->log(1, '[RetailCrm] - Not found class RetailCrm');
    return;
}


$site = $modx->getOption('modretailcrm_siteCode');
$apiKey = $modx->getOption('modretailcrm_apiKey');
$crmUrl = $modx->getOption('modretailcrm_url');

$modRetailCrm = new modRetailCrm($modx, $apiKey, $crmUrl, $site);

//Получаем список всех заказов одного клиента из CRM
$filters = array();
$filter['customer'] = '+7 701 987 65 43';
$orders = $modRetailCrm->request->ordersList($filter);
//Массив $filters - позволяет фильтровать данные, указав, например, номер или Имя клиента.

//Создаем новый контакт
$customer = array();
$customer['firstName'] = 'Федор';
$customer['lastName'] = 'Бондарчук';
$customer['email'] = 'mail@mail.ru';
$customer['phones'][]['number'] =  '+7 701 987 65 43';
$modRetailCrm->request->customersCreate($customer);
```

Все доступные методы и их параметры вы можете просмотреть в [API RetaiCRM][2]. У Сервиса отличная документация. 

### Основное преимущество — гибкость в разработке

Главная идея — в том, что мы можем используя существующую библиотеку, передавать в CRM любые данные с сайта, и наоборот получать любую информацию из CRM. Возможности очень гибкие. Мы никак не привязаны к MiniShop2, например. 
Можно написать собственные сниппеты и плагины работающие с ShopKeeper. 
Совсем не обязательно вообще привязываться к интернет-магазинам.
Совсем простой сниппет позволит создавать в CRM контакт при заполнении классической контактной формы на сайте (пример я написал выше).

### Предварительная настройка

Естественно у вас должен быть аккаунт в RetailCRM. 
В системных настройках сайта (раздел modretailcrm) Вам нужно указать 
* API ключ. Получите его в RetailCRM — Настройки — Интеграция — Ключи доступа к API
* адрес вашей CRM
* символьный код сайта
Все эти данные Вы можете посмотреть в личном кабинете в разделе настройки — магазины

[![](https://file.modx.pro/files/7/c/5/7c5fe55dfc865d80b5db0d0e8e8b76b0s.jpg)](https://file.modx.pro/files/7/c/5/7c5fe55dfc865d80b5db0d0e8e8b76b0.png)

### Передача способов доставки, оплаты и возможная проблема

Опционально, если вы хотите чтобы в CRM передавались способы оплаты и доставки вам нужно сходить в соответствующие разделы справочника RetailCRM, скопировать оттуда символьные коды способов доставки и оплаты

[![](https://file.modx.pro/files/b/5/9/b596684b403ca86ac995beb347ea186cs.jpg)](https://file.modx.pro/files/b/5/9/b596684b403ca86ac995beb347ea186c.png)

Эти символьные коды я предлагаю вставить в описание соответсвующих способов доставки и оплаты minishop2

[![](https://file.modx.pro/files/d/3/8/d3819485c68f222f809671d9f66d3df2s.jpg)](https://file.modx.pro/files/d/3/8/d3819485c68f222f809671d9f66d3df2.png)

Вы без проблем можете использовать и собственное поле, это легко поправить в плагине.

После этого плагин по идее уже может передавать заказы в RetailCRM

#### Важно.  
На данный момент плагин по умолчанию считает, что в поле **описание** способов оплаты и доставки указаны символьные коды соответствующих справочников в RetailCRM
Если у вас в поле **описание** записано что-то другое - передача заказа не будет работать.  Вам нужно закомментрировать передачу способов доставки и оплаты в плагине. Подробнее проблема описана [здесь][3]


### Какие данные передаются в RetailCRM из корзины при оформлении заказа
1. Товары (Наименование, стоимость, количество товара, все используемые в заказе опции товара)
2. Имя, телефон, email клиента и его id по которому (в том числе) CRM умеет группировать заказы
3. Адрес, в его классическом оформлении (Индекс, Область, город, Улица, дом, квартира), а также любые другие поля сохраняемые в таблице адрес заказа.
4. Комментарий клиента
5. Способ и сумма доставки, способ оплаты (если вы указали соответствие справочников)

Можно передавать еще много чего, все достаточно легко настраивается и кастомизируется под специфику магазина. Все принимаемые CRM поля можно посмотреть [здесь][4]

Также плагин при создании нового заказа создает и нового клиента в RetailCRM (если конечно такого клиента еще нет) — это осталось без изменений со старой версии компонента

### Пример быстрого заказа

Все вышеописанное касается работы minishop2. 
Если же вы хотите быстро создать заказ, минуя корзину, например посредством формы быстрого заказа
я предлагаю следующее решение. 
Скорее всего вы используете форму работающую через связку formIt + ajaxForm. Клиент заполняет имя, email, телефон, вы получаете через скрытое поле адрес страницы или название продукта и заявка падает вам на почту. 
Я написал хук для formIt, который одновременно с отправкой на почту заявки, создает заказ в RetailCRM (собственно это никак не привязано к отправке заказа на email и может работать отдельным решением)

Итак создаем сниппет **RetailCRM_QuickOrder_Hook** примерно следующего содержания

```
<?php
if (!$modx->getService('modretailcrm','modRetailCrm', MODX_CORE_PATH.'components/modretailcrm/model/modretailcrm/')) {  
    $modx->log(1, '[RetailCrm] - Not found class RetailCrm');
    return;
}

$pdo = $modx->getService('pdoFetch');

$site = $modx->getOption('modretailcrm_siteCode');
$apiKey = $modx->getOption('modretailcrm_apiKey');
$crmUrl = $modx->getOption('modretailcrm_url');

$modRetailCrm = new modRetailCrm($modx, $apiKey, $crmUrl, $site);

//Принимаю необходимый массив полей из формы
$allFormFields = $hook->getValues();
$order = array();
//Небольшая валидация по вкусу
foreach($allFormFields as $key => $field){
    if(empty($field)) continue;
    switch($key){
        case 'externalId':
        case 'quantity':
            $order[$key] = trim(filter_var($field, FILTER_VALIDATE_INT));
            break;
        case 'email':
            $order[$key] = trim(filter_var($field, FILTER_VALIDATE_EMAIL));
            break;
        case 'pageId':
            break;
        default:
            $order[$key] = trim(filter_var($field, FILTER_SANITIZE_STRING));
    }
    
}
//Отметка Требуется перезвонить
$order['call'] = 1;
$order['orderMethod'] = 'one-click';
$product = $pdo->getArray('msProduct', array("class_key" => 'msProduct', 'id' => $order['externalId']), 
    array("limit" => 1, "offset" => 0,
    'innerJoin' => array(
        'Data' => array(
            'class' => 'msProductData',
            'on' => 'msProduct.id = Data.id'
        )
    ),
    'select' => array(
        'msProduct' => '*',
        'Data' => '*'
    ),
    ));
$order['items'][] = array(
    'initialPrice' => $product['price'],
    'purchasePrice' => $product['price'],
    'productName' => $product['pagetitle'],
    'quantity' => $order['quantity'],
    'offer' => array('externalId' => $product['id'])
);
$response = $modRetailCrm->request->ordersCreate($order, $site);
```

Данный сниппет принимает несколько полей из формы быстрого заказа, и отправляет эти данные в CRM
**Обязательные поля, которые должны быть в форме:**
* firstName
* phone
* externalId — id товара
**Необязательные поля, которые могут быть форме и передаются в CRM:**
* lastName
* email
* quantity — кол-во товара
* customerComment — комментарий клиента

В принципе можно использовать и другие поля, но я что то не разу не встречал других форм быстрого заказа

Создав сниппет, вы можете добавить его как хук к вызову ajaxForm

```
{'ajaxForm' | snippet : [
   'form' => '@INLINE
        <form>
            <input class="form-control" type="text" name="firstName" value="" placehoder="Имя">
            <input class="form-control" type="text" name="lastName" value="" placehoder="Фамилия">
            <input class="form-control" type="text" name="phone" value="" placehoder="Телефон">
            <input class="form-control" type="text" name="email" value="" placehoder="Email">
            <input class="form-control" type="text" name="quantity" value="1" placehoder="Количество товара">
            <textarea class="form-control" name="customerComment"></textarea>
            <button type="submit" class="button">Заказ в один клик</button>
            <input type="hidden" name="externalId" value="[[*id]]">
        </form>
   ',
    'hooks' => 'RetailCRM_QuickOrder_Hook',
    'validate' => 'firstName:required,phone:required,externalId:required',
    
]}
```

Данный пример легко переписать под собственные нужды и совсем не обязательно использовать для этого formIt. Вы можете немного адаптировать прием данных от клиента в свой собственный сниппет и дальше передавать их по назначению используя пример.


### Создание задачи в RetailCRM
Ситуация аналогичная быстрому заказу. 
Пишем сниппет RetailCRM_Callback_Hook, который будет являться хуком для formIt
Принимает данные из формы, и отправляем в CRM

```
<?php
if (!$modx->getService('modretailcrm','modRetailCrm', MODX_CORE_PATH.'components/modretailcrm/model/modretailcrm/')) {  
    $modx->log(1, '[RetailCrm] - Not found class RetailCrm');
    return;
}

$pdo = $modx->getService('pdoFetch');

$site = $modx->getOption('modretailcrm_siteCode');
$apiKey = $modx->getOption('modretailcrm_apiKey');
$crmUrl = $modx->getOption('modretailcrm_url');

$modRetailCrm = new modRetailCrm($modx, $apiKey, $crmUrl, $site);

//Принимаю необходимый массив полей из формы
$task = array();
$name = trim(filter_var($hook->getValue('name'), FILTER_SANITIZE_STRING));
$task['phone'] = trim(filter_var($hook->getValue('phone'), FILTER_SANITIZE_STRING));
$task['text'] = 'Требуется позвонить клиенту по имени '.$name;
$task['performerId'] = 5;
$response = $modRetailCrm->request->tasksCreate($task, $site);
```

В данном случае есть один нюанс, который важно понимать. 
Если при создании заказа в CRM ответственное лицо назначать необязательно, то в задаче это важно. 
Без указания ответственного — задача просто не создастся.
За это отвечает параметр performerId которому мы присваиваем Номер менеджера в системе CRM
Я указываю его прямо в сниппете, подразумевая что менеджер в системе один, вы можете указать его по своей логике. 
Навскидку 
1. Указать в вызове сниппета
2. Указать в скрытом поле в форме
3. Указать менеджера по расписанию или еще как то, в зависимости от дня недели, товара. страницы и т.п.

Полный перечень полей, которые можно передать для создания заказа можно посмотреть [здесь][5]

### Кастомизация и индивидуальные решения
Ядро компонента довольно гибкое и имеет много возможностей, нужду в которых я на практике пока не встречал. 
Но если в вашем магазине нужно передавать в CRM какие то нестандартные данные или передавать их нестандартным способом — все довольно легко настраивается, собственно не обязательно использовать minishop2 или вообще не обязательно иметь интернет-магазин. Вы можете управлять клиентами, задачами, расходами а также интегрировать сайт с различными службами доставок, телефонией, учетными системами вроде 1С и т.п.
Основа для всего этого заложена, а дальше требуются лишь умелые руки и немного фантазии.

[1]: http://www.retailcrm.ru/?partner=RCI-6419N
[2]: https://www.retailcrm.ru/docs/Developers/ApiVersion5
[3]: https://modx.pro/components/13859/#comment-90879
[4]: https://www.retailcrm.ru/docs/Developers/ApiVersion5#post--api-v5-orders-create
[5]: https://www.retailcrm.ru/docs/Developers/ApiVersion5#post--api-v5-customers-create