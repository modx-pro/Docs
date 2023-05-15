# Кейсы использования

## Акция "Купи два - получи третий в подарок"

При заказе больше двух штук одного товара, третий будет бесплатным, но добавить его покупатель должен сам.

[![Акция "Купи два - получи третий в подарок"](https://file.modx.pro/files/3/9/5/395f40a69d383bdbd1d5ea10b498ecacs.jpg)](https://file.modx.pro/files/3/9/5/395f40a69d383bdbd1d5ea10b498ecac.png)

## Акция "Черная пятница"

Скидка на все товары в течение одних суток в определённый день недели.

[![Акция "Черная пятница"](https://file.modx.pro/files/5/4/2/5424a855e2369d3b580c0ed59d63c82fs.jpg)](https://file.modx.pro/files/5/4/2/5424a855e2369d3b580c0ed59d63c82f.png)

## Акция "Техника Bosch со скидкой"

Скидка на все товары производителя

[![Акция "Техника Bosch со скидкой"](https://file.modx.pro/files/6/a/6/6a6f82e5e799a9d231abc8442db533ees.jpg)](https://file.modx.pro/files/6/a/6/6a6f82e5e799a9d231abc8442db533ee.png)

## Акция "Мебель за полцены"

Скидка на определённую категорию товаров

[![Акция "Мебель за полцены"](https://file.modx.pro/files/8/0/9/80975436ae7f36be908d300193767f5ds.jpg)](https://file.modx.pro/files/8/0/9/80975436ae7f36be908d300193767f5d.png)

## Акция "Ликвидация остатков"

Скидка на определённые товары

[![Акция "Ликвидация остатков"](https://file.modx.pro/files/d/8/b/d8bcee240cf42bc4a0bffcab4732ba2bs.jpg)](https://file.modx.pro/files/d/8/b/d8bcee240cf42bc4a0bffcab4732ba2b.png)

## Акция "Зарегистрируйся и купи дешевле"

Скидка только для зарегистрированных и авторизованных пользователей

[![Акция "Зарегистрируйся и купи дешевле"](https://file.modx.pro/files/e/3/5/e3506048e58a6a8717a3330b0e22f0d1s.jpg)](https://file.modx.pro/files/e/3/5/e3506048e58a6a8717a3330b0e22f0d1.png)

## Акция "Скидка при покупке от 1000 рублей"

Скидка с ограничением по минимальной сумме заказа

[![Акция "Скидка при покупке от 1000 рублей"](https://file.modx.pro/files/6/a/3/6a3565a5ef200d9faaec8144cbc895ces.jpg)](https://file.modx.pro/files/6/a/3/6a3565a5ef200d9faaec8144cbc895ce.png)

## Акция "Летняя распродажа"

Скидка на все товары в течение определенного периода

[![Акция "Летняя распродажа"](https://file.modx.pro/files/e/2/7/e27b9ee73ef11c8a65696db8b9907aa9s.jpg)](https://file.modx.pro/files/e/2/7/e27b9ee73ef11c8a65696db8b9907aa9.png)

## Акция "Попробуй новое и сэкономь"

Скидка на товары с активным свойством "Новый"

[![Акция "Попробуй новое и сэкономь"](https://file.modx.pro/files/1/0/d/10d00be7ca1967c864518ca1610ca0ccs.jpg)](https://file.modx.pro/files/1/0/d/10d00be7ca1967c864518ca1610ca0cc.png)

## Промокоды

Встроенного функционала нет, но его можно создать под ваши нужды. Ниже приведён один из вариантов реализации.

1. Создадим новую опцию `promocode`

  [![Создадим новую опцию](https://file.modx.pro/files/4/5/4/45465f173f4529d128842967568d3d62s.jpg)](https://file.modx.pro/files/4/5/4/45465f173f4529d128842967568d3d62.png)

2. Создадим новую скидку-промокод. Здесь важно добавить опцию `promocode` со значением промокода.

   [![Создадим новую скидку-промокод](https://file.modx.pro/files/3/c/2/3c20bc2ddaef6e4165802e837dff8d90s.jpg)](https://file.modx.pro/files/3/c/2/3c20bc2ddaef6e4165802e837dff8d90.png)

3. Вероятно, Вам захочется сделать ограниченное число промокодов. Установите компонент `Migx`. Создайте конфигурацию `promocodes_count` (название может быть любым) с полями `promocode` и `count` (название полей строго такие).
  [![Создайте конфигурацию](https://file.modx.pro/files/d/2/7/d277e9ebf5573e4fdd0dc00dcc2102fds.jpg)](https://file.modx.pro/files/d/2/7/d277e9ebf5573e4fdd0dc00dcc2102fd.png)

4. Создайте TV с именем `promocodes_count` (название может быть любым) и присвойте любому удобному шаблону, я присвоил шаблону `1` (это нам понадобится дальше).
5. Заполните созданное TV тем значением, которое указали при создании скидки в п.2 и укажите доступное количество промокодов.
6. Теперь нам нужна форма для ввода промокода. Я использовал компонент `AjaxFormitLogin` и вызвал форму на странице корзины. Вызов выглядит так

  ```fenom
  {'!AjaxFormitLogin' | snippet:[
    'form' => '@FILE promocodeForm.tpl',
    'hooks' => 'applyPromocode',
    'customValidators' => 'promocode',
    'validate' => 'promocode:required:promocode=^1|promocodes_count^',
    'aliases' => 'promocode==Промокод',
    'promocode.vTextRequired' => 'Не передан.',
    'successMessage' => 'Промокод применён',
    'transmittedParams' => '{"success" : "", "error" : "aliases"}'
  ]}
  ```

  Чанк формы `promocodeForm.tpl` имеет следующее ссодержимое

  ```html

  <form class="">
      <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Введите промокод" name="promocode">
          <button class="btn btn-success" type="submit">Применить</button>
      </div>
  </form>
  ```

7. Также потребуется проверка введённого промокода. Проверять будем применён ли уже этот промокод текущим пользователем, существует и активна ли скидка связанная с    промокодом, остаток промокодов. Для этого создадим свой сниппет-валидатор `promocode` со следующим содержимым

  ```php
  require_once MODX_CORE_PATH . 'elements/promocodes.class.php';

  $params = explode('|', $param);
  $promocodeHandler = new Promocodes($modx, $value, $params[0], $params[1]);
  $msg = $promocodeHandler->validate();
  if(is_string($msg)){
      $validator->addError($key, $msg);
      return false;
  }
  return true;
  ```

8. Кроме того после применения проммокода, нужно изменять остаток и обновлять корзину. Это мы сделаем в сниппите-хуке `applyPromocode` с таким кодом

  ```php
  require_once MODX_CORE_PATH . 'elements/promocodes.class.php';

  preg_match('/promocode=\^(.*?)\^/', $hook->formit->config['validate'], $matches);
  $params = explode('|', $matches[1]);
  $promocodeHandler = new Promocodes($modx, $_POST['promocode'], $params[0], $params[1]);
  $promocodeHandler->process();
  return true;
  ```

9. Чтобы сниппеты работали нужно создать класс `Promocodes` в файле `elements/promocodes.class.php` с кодом

  ```php
  class Promocodes
  {
      public function __construct($modx, $promocode, $rid, $tvname)
      {
          $this->modx = $modx;
          $this->modx->getService('mspdDiscounts', 'mspdDiscounts', MODX_CORE_PATH . 'components/msproductdiscounts/model/');
          $this->promocode = $promocode;
          $this->rid = $rid;
          $this->tvname = $tvname;
          $this->init();
      }

      private function init()
      {
          $tableName = $this->modx->getTableName('mspdOption');
          $q = $this->modx->newQuery('mspdDiscount');
          $q->where("active = 1 AND id = (SELECT did FROM $tableName WHERE option_value = '$this->promocode')");
          $this->query = $q;

          if ($this->resource = $this->modx->getObject('modResource', $this->rid)) {
              if ($codes = $this->resource->getTVValue($this->tvname)) {
                  $this->codes = $this->reformatMIGX(json_decode($codes, 1));
              }
          }
      }

      private function reformatMIGX($migx)
      {
          $output = array();
          foreach ($migx as $item) {
              $output[$item['promocode']] = $item['count'];
          }
          return $output;
      }

      public function validate()
      {
          if ($this->isApplied()) return ' Уже применён Вами.';
          if (!$this->isActive()) return ' Не найден.';
          if (!$this->validateCount()) return ' Количество исчерпано.';
          return true;
      }

      private function isApplied()
      {
          return $_SESSION['promocode'] === $this->promocode;
      }

      private function isActive()
      {
          return (bool)$this->modx->getCount('mspdOption', $this->query);
      }

      private function validateCount()
      {
          if (empty($this->codes)) return false;
          return $this->codes[$this->promocode] > 0;
      }

      public function process(){
          $_SESSION['promocode'] = $this->promocode;
          $this->updateCount();
          $this->updateCart();
      }

      private function updateCount(){
          $this->codes[$this->promocode] = ($this->codes[$this->promocode] - 1 >= 0) ? $this->codes[$this->promocode] - 1 : 0;

          if($codes = $this->resource->getTVValue($this->tvname)){
              $codes = json_decode($codes,1);
              foreach($codes as $k => $item){
                  if($item['promocode'] === $this->promocode){
                      $codes[$k]['count'] = $this->codes[$this->promocode];
                  }
              }
              $this->resource->setTVValue($this->tvname, json_encode($codes));
              $this->resource->save();
          }
      }

      private function updateCart(){
          $ms2 = $this->modx->getService('minishop2');
          $ms2->initialize($this->modx->context->get('key'));
          if($tmp = $ms2->cart->get()){
              foreach($tmp as $k => $item){
                  $tmp[$k]['options']['promocode'] = $this->promocode;
              }

              uasort($tmp, function ($a, $b) {
                  $aprice = $_SESSION['start_cart_state'][$a['key']]['price'] ?: $a['price'];
                  $bprice = $_SESSION['start_cart_state'][$b['key']]['price'] ?: $b['price'];
                  if ($aprice == $bprice) {
                      return 0;
                  }
                  return ($aprice > $bprice) ? -1 : 1;
              });

              $tmp = $this->modx->mspdDiscounts->prepareProductDiscounts($tmp);
              $ms2->cart->set($tmp);
          }
      }
  }
  ```

10. Чтобы после применения промокода скидка применялась ко вновь добавляемым в корзину товарам, нам понадобится ещё плагин

  ```php
  switch ($modx->event->name) {
      case 'msOnAddToCart':
          $tmp = $cart->get();
          $tmp[$key]['options']['promocode'] = $_SESSION['promocode'];
          $cart->set($tmp);
          break;
  }
  ```

Теперь Вы можете создавать какие угодно промокоды в каком угодно количестве и гибко настраивать к каким товарам их применять.
