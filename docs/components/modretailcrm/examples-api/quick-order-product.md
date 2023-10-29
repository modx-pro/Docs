# Создание быстрого заказа товара

Почти в каждом интернет-магазине сейчас есть кнопка заказа в один клик. Для клиента все устроено по одному принципу.
Большинство необходимых полей заполняется автоматически, клиенту лишь нужно указать свои контактные данные.

Что касается программной реализации, мне приходилось встречать два варианта.

1. Простая классическая форма заявки - отправляет письмо менеджеру. Дальше все вручную. Здесь вообще не обязательно иметь интернет-магазин.
2. Форма заявки работающая с API miniShop2, и создающая нормальный заказ с предустановленными данными.

## Создаем заказ через API miniShop2

Ниже пример как создать заказ в miniShop2 через API.  В процессе создания его подхватит плагин modRetailCRM, который отправить заказ в корзину.

Выводим на странице простейшую форму. К примеру вот такую

```fenom
{'!ajaxForm' | snippet : [
  'form' => '@INLINE
    <form>
      <div class="form-group">
        <label>Имя</label>
        <input class="form-control" type="text" name="name" value="Николай" placeholder="Имя">
      </div>
      <div class="form-group">
        <label>Телефон</label>
        <input class="form-control" type="text" name="phone" value="98779788987" placeholder="Телефон">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="text" name="email" value="info@site.ru" placeholder="Email">
      </div>
      <input type="hidden" name="productId" value="137">

      <button type="submit" class="btn btn-primary">Купить</button>
    </form>
  ',
  'hooks' => 'msQuickOrder',
]}
```

Форма как форма, ничего особенного.  Лишь контактные данные и id  товара, который нужно оформить. Его можно подставить вручную, можно взять id страницы - если это страница товара.
Форма запускается через ajaxForm, который в свою очередь запускает formIt - тоже классическая связка компонентов.

Далее создаем сниппет msQuickOrder, подключаем его как хук - который собственно и будет отвечать за оформление заказа.
Содержимое примерно вот такое. Я все прокомментировал. Ну а плагин, который сработает при оформлении заказа уже подхватит данные и передаст их в RetailCRM

```php
<?php
// Получаем данные из формы
$phone = $hook->getValue('phone');
$email = $hook->getValue('email');
$name = $hook->getValue('name');
$productId = $hook->getValue('productId');

// Готовим минишоп к запуску
$params = array(
  'json_response' => true, // возвращать ответы в JSON
  'max_count' => 1 // максимальное число товаров для добавления за один раз
);

$miniShop2 = $modx->getService('miniShop2');
// Инициализируем класс в текущий контекст
$miniShop2->initialize($modx->context->key, $params);
$miniShop2->cart->clean(); // Очищаем корзину
$miniShop2->cart->add($productId); // Добавляем в корзину товар
$miniShop2->order->add('receiver', $name); // Указываем имя получателя
$miniShop2->order->add('phone', $phone);
$miniShop2->order->add('email', $email);
$miniShop2->order->add('payment', 1); // Указываем способ оплаты
$miniShop2->order->add('delivery', 1); // Указываем способ доставки
$miniShop2->order->submit(); // Отправляем заказ
// Где то здесь в дело вступает плагин modRetailCRM и заказ летит в CRM
```

### Создаем заказ вручную через хук

Исходные данные те же. Форма не меняется.  Но заказ не будет добавляться в miniShop - сразу отправляем в RetailCRM. Этот способ годится - если  miniShop2 вообще не используется.
Создаем сниппет quickOrderToRetailCRM, указываем его, как хук-обработчик для формы

```php
<?php
// Получаем данные из формы
$phone = $hook->getValue('phone');
$email = $hook->getValue('email');
$name = $hook->getValue('name');
$productId = $hook->getValue('productId');
// По хорошему не мешало бы проверить данные на пустоту и обезопасить, хотя бы простенькой санитизацией

// Инициируем modRetailCRM
if (!$modRetailCrm = $modx->getService(
  'modretailcrm',
  'modRetailCrm',
  MODX_CORE_PATH . 'components/modretailcrm/model/modretailcrm/',
  array($modx)
)) {
  $modx->log(modX::LOG_LEVEL_ERROR, '[modRetailCrm] - Not found class modRetailCrm');
  return;
}

$pdo = $modx->getService('pdoFetch');

$orderData = array();
$orderData['externalId'] = md5(time() . $productId . $email . $phone); // Генерируем уникальный хэш-номер заказа

// Информация о клиенте
$orderData['customer']['externalId'] = md5($phone . $email);  // Генерируем уникальный хэш-номер клиента
// Проверяю наличие пользователя в базе retailCRM
$user_response = $modRetailCrm->request->customersGet($orderData['customer']['externalId'], 'externalId');

if(!$user_response->isSuccessful()){
  $customer_profile = $pdo->getArray('modUserProfile', array('internalKey' => $order['user_id']));
  $customer = array();
  $customer['externalId'] =  $orderData['customer']['externalId'];
  $customer['firstName'] = $name;
  $customer['email'] = $email;
  $customer['phones'][0]['number'] = $phone;
  $response = $modRetailCrm->request->customersCreate($customer);
  if (!$response->isSuccessful()) {
    $modx->log(MODX_LOG_LEVEL_ERROR, '[ModRetailCrm] - Создаем клиента в базе RetailCRM '.print_r($response, 1));
  }
}

$orderData['firstName'] = $name;
$orderData['phone'] = $phone;
$orderData['email'] = $email;


// Предположим, что id товара - это страница сайта
$page = $modx->getObject('modResource', array('id' => $productId));
// Информация о товаре
$orderData['items'][0]['initialPrice'] = 1000; // Стоимость товара
$orderData['items'][0]['productName'] = $page->pagetitle; // Наименование товара
$orderData['items'][0]['quantity'] = 1; // Количество товара

$response = $modRetailCrm->request->ordersCreate($orderData);
if (!$response->isSuccessful()) {
  $modx->log(MODX_LOG_LEVEL_ERROR, '[ModRetailCrm] - Результат отправки заказа '.print_r($response, 1));
}
```
