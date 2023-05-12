## Расширение классов

Представим, что нам нужно добавить новый метод в класс `mspdGetDiscounts` и запустить его при загрузке страницы.

1. Создаем новый файл `assets/project_files/js/mspd/mspdgetdiscountsnew.js` cо следующим содержимым:

  ```js
  import mspdGetDiscounts from './../../../components/msproductdiscounts/js/web/mspdgetdiscounts.min.js'

  export default class mspdGetDiscountsNew extends mspdGetDiscounts {
    test() {
      console.log(123);
    }
  }
  ```

2. Создаем копию плагина `msProductDiscounts` и меняем

  ```php
  $modx->regClientScript("<script type=\"module\">
    import mspdGetDiscounts from \"{$assetsUrl}js/web/mspdgetdiscounts.min.js\";
    new mspdGetDiscounts({$config});
    </script>", 1);
  ```

  на

  ```php
  $modx->regClientScript("<script type=\"module\">
    import mspdGetDiscountsNew from \"./assets/project_files/js/mspd/mspdgetdiscountsnew.js\";
    const getDiscouts = new mspdGetDiscountsNew({$config});
    getDiscouts.test();
    </script>", 1);
  ```

Аналогично можно расширить и второй класс `mspdUpdateCart` при необходимости.

## Получение информации о скидках на товар

За получение данных о скидках на товар отвечает класс `mspdGetDiscounts` из файла `assets/components/msproductdiscounts/js/web/mspdgetdiscounts.min.js`. Там же описано взаимодействие со сниппетами `pdoPage`, `mFilter2`, `msOptionsPrice2`. Этот же класс выводит информацию о скидках и обновляет данные о ценах на странице в методе `responseHandler()`, если существует необходимая разметка. Так же в этом методе инициализируется событие документа `mspd-get-discounts`, которое получает ответ сервера `e.detail.response` и блок с данными товара `e.detail.wrapper` и которое можно отменить, в этом случае обновление данных на странице не произойдёт.

```js
document.addEventListener('mspd-get-discounts', e => {
  const {wrapper, response} = e.detail;
  console.log('Блок с данными товара.', wrapper);
  console.log('Ответ сервера.', response);
});
```

## Актуализация корзины

За актуальность корзины отвечает класс `mspdUpdateCart` из файла `assets/components/msproductdiscounts/js/web/mspdupdatecart.min.js`. Здесь так же инициализируется событие документа `mspd-cart-update`, его как и предыдущее можно отменить.

```js
document.addEventListener('mspd-cart-update', e => {
  const {response} = e.detail;
  console.log('Ответ сервера.', response);
});
```
