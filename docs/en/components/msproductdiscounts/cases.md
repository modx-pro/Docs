# Usage cases

## "Buy two — get third free" promotion

When ordering more than two of one product, the third is free; the customer must add it themselves.

[!["Buy two — get third free" promotion](https://file.modx.pro/files/3/9/5/395f40a69d383bdbd1d5ea10b498ecacs.jpg)](https://file.modx.pro/files/3/9/5/395f40a69d383bdbd1d5ea10b498ecac.png)

## "Black Friday" promotion

Discount on all products for one day on a specific weekday.

[!["Black Friday" promotion](https://file.modx.pro/files/5/4/2/5424a855e2369d3b580c0ed59d63c82fs.jpg)](https://file.modx.pro/files/5/4/2/5424a855e2369d3b580c0ed59d63c82f.png)

## "Bosch appliances discount" promotion

Discount on all products from one vendor.

[!["Bosch appliances discount" promotion](https://file.modx.pro/files/6/a/6/6a6f82e5e799a9d231abc8442db533ees.jpg)](https://file.modx.pro/files/6/a/6/6a6f82e5e799a9d231abc8442db533ee.png)

## "Furniture at half price" promotion

Discount on a specific product category.

[!["Furniture at half price" promotion](https://file.modx.pro/files/8/0/9/80975436ae7f36be908d300193767f5ds.jpg)](https://file.modx.pro/files/8/0/9/80975436ae7f36be908d300193767f5d.png)

## "Clearance" promotion

Discount on specific products.

[!["Clearance" promotion](https://file.modx.pro/files/d/8/b/d8bcee240cf42bc4a0bffcab4732ba2bs.jpg)](https://file.modx.pro/files/d/8/b/d8bcee240cf42bc4a0bffcab4732ba2b.png)

## "Register and save" promotion

Discount for registered and logged-in users only.

[!["Register and save" promotion](https://file.modx.pro/files/e/3/5/e3506048e58a6a8717a3330b0e22f0d1s.jpg)](https://file.modx.pro/files/e/3/5/e3506048e58a6a8717a3330b0e22f0d1.png)

## "Order over 1000" discount promotion

Discount with minimum order amount.

[!["Order over 1000" discount promotion](https://file.modx.pro/files/6/a/3/6a3565a5ef200d9faaec8144cbc895ces.jpg)](https://file.modx.pro/files/6/a/3/6a3565a5ef200d9faaec8144cbc895ce.png)

## "Summer sale" promotion

Discount on all products for a specific period.

[!["Summer sale" promotion](https://file.modx.pro/files/e/2/7/e27b9ee73ef11c8a65696db8b9907aa9s.jpg)](https://file.modx.pro/files/e/2/7/e27b9ee73ef11c8a65696db8b9907aa9.png)

## "Try new and save" promotion

Discount on products with active "New" property.

[!["Try new and save" promotion](https://file.modx.pro/files/1/0/d/10d00be7ca1967c864518ca1610ca0ccs.jpg)](https://file.modx.pro/files/1/0/d/10d00be7ca1967c864518ca1610ca0cc.png)

## Promo codes

There is no built-in promo code feature, but you can add one. Below is one implementation.

1. Create a new option `promocode`.
    [![Create new option](https://file.modx.pro/files/4/5/4/45465f173f4529d128842967568d3d62s.jpg)](https://file.modx.pro/files/4/5/4/45465f173f4529d128842967568d3d62.png)

2. Create a new promo code discount. Add option `promocode` with the promo code value.
    [![Create promo code discount](https://file.modx.pro/files/3/c/2/3c20bc2ddaef6e4165802e837dff8d90s.jpg)](https://file.modx.pro/files/3/c/2/3c20bc2ddaef6e4165802e837dff8d90.png)

3. To limit the number of promo codes, install `Migx`. Create config `promocodes_count` (name can vary) with fields `promocode` and `count` (these names are required).
    [![Create config](https://file.modx.pro/files/d/2/7/d277e9ebf5573e4fdd0dc00dcc2102fds.jpg)](https://file.modx.pro/files/d/2/7/d277e9ebf5573e4fdd0dc00dcc2102fd.png)

4. Create TV named `promocodes_count` (name can vary) and assign it to a template, e.g. template `1`.
5. Fill the TV with the value from step 2 and set the available promo code count.
6. Add a promo code form. Example using `AjaxFormitLogin` on the cart page:

    ```fenom
    {'!AjaxFormitLogin' | snippet:[
      'form' => '@FILE promocodeForm.tpl',
      'hooks' => 'applyPromocode',
      'customValidators' => 'promocode',
      'validate' => 'promocode:required:promocode=^1|promocodes_count^',
      'aliases' => 'promocode==Promo code',
      'promocode.vTextRequired' => 'Not provided.',
      'successMessage' => 'Promo code applied',
      'transmittedParams' => '{"success" : "", "error" : "aliases"}'
    ]}
    ```

    Form chunk `promocodeForm.tpl`:

    ```html
    <form class="">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Enter promo code" name="promocode">
        <button class="btn btn-success" type="submit">Apply</button>
      </div>
    </form>
    ```

7. Add promo code validation: check if the code is already applied by the user, if the discount exists and is active, and remaining count. Create custom validator snippet `promocode`:

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

8. After applying a promo code, update the remaining count and cart. Add hook snippet `applyPromocode`:

    ```php
    require_once MODX_CORE_PATH . 'elements/promocodes.class.php';

    preg_match('/promocode=\^(.*?)\^/', $hook->formit->config['validate'], $matches);
    $params = explode('|', $matches[1]);
    $promocodeHandler = new Promocodes($modx, $_POST['promocode'], $params[0], $params[1]);
    $promocodeHandler->process();
    return true;
    ```

9. Create class `Promocodes` in `elements/promocodes.class.php`:

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
        if ($this->isApplied()) return ' Already applied by you.';
        if (!$this->isActive()) return ' Not found.';
        if (!$this->validateCount()) return ' Quantity exhausted.';
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

10. To apply the promo code discount to newly added cart items, add a plugin:

    ```php
    switch ($modx->event->name) {
      case 'msOnAddToCart':
        $tmp = $cart->get();
        $tmp[$key]['options']['promocode'] = $_SESSION['promocode'];
        $cart->set($tmp);
        break;
    }
    ```

You can now create any promo codes in any quantity and configure which products they apply to.
