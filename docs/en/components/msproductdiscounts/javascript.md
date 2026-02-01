# Javascript

## Extending classes

Suppose we need to add a new method to class `mspdGetDiscounts` and run it on page load.

1. Create file `assets/project_files/js/mspd/mspdgetdiscountsnew.js`:

    ```js
    import mspdGetDiscounts from './../../../components/msproductdiscounts/js/web/mspdgetdiscounts.min.js'

    export default class mspdGetDiscountsNew extends mspdGetDiscounts {
      test() {
        console.log(123);
      }
    }
    ```

2. Duplicate the `msProductDiscounts` plugin and change

    ```php
    $modx->regClientScript("<script type=\"module\">
      import mspdGetDiscounts from \"{$assetsUrl}js/web/mspdgetdiscounts.min.js\";
      new mspdGetDiscounts({$config});
      </script>", 1);
    ```

    to

    ```php
    $modx->regClientScript("<script type=\"module\">
      import mspdGetDiscountsNew from \"./assets/project_files/js/mspd/mspdgetdiscountsnew.js\";
      const getDiscouts = new mspdGetDiscountsNew({$config});
      getDiscouts.test();
      </script>", 1);
    ```

You can similarly extend the `mspdUpdateCart` class.

## Getting product discount info

Class `mspdGetDiscounts` from `assets/components/msproductdiscounts/js/web/mspdgetdiscounts.min.js` handles product discount data. It also documents interaction with `pdoPage`, `mFilter2`, `msOptionsPrice2` snippets. The class outputs discount info and updates prices on the page in `responseHandler()` when the markup exists. The document event `mspd-get-discounts` is fired there, receiving `e.detail.response` and `e.detail.wrapper`; it can be cancelled to prevent page updates.

```js
document.addEventListener('mspd-get-discounts', e => {
  const {wrapper, response} = e.detail;
  console.log('Product data block.', wrapper);
  console.log('Server response.', response);
});
```

## Cart refresh

Class `mspdUpdateCart` from `assets/components/msproductdiscounts/js/web/mspdupdatecart.min.js` handles cart updates. It fires document event `mspd-cart-update`, which can be cancelled like the above.

```js
document.addEventListener('mspd-cart-update', e => {
  const {response} = e.detail;
  console.log('Server response.', response);
});
```
