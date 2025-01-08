# JavaScript

## События

:::warning
События, кроме *msac:init*, будут срабатывать столько раз сколько корзин есть на странице.
:::
:::tip
События предназначены для упрощения взаимодействия с DOM, но не для прерывания серверных действий. Если хотите прервать какое-то действие используйте событие **si:send:before**

```js:line-numbers
document.addEventListener('si:send:before', (e) => {
  if (['cart_add','cart_remove','cart_clean'].includes(e.detail.headers['X-SIPRESET'])) {
    e.preventDefault();
    SendIt.Notify.error('It impossible!');
  }
})
```

:::

### msac:init - инициализация компонента

Событие возникает после загрузки всех модулей, указанных в JS конфигурации. Не имеет параметров. Не может быть отменено. Чтобы без проблем использовать все модули,
подписывайте на это событие, так как после его срабатывания объект **MsAltCart** и его модули точно доступны.
::: details Пример использования

```js:line-numbers
document.addEventListener('msac:init', (e) => {
  console.log(MsAltCart);
});
```

:::

### msac:row:replace:after - замена ряда

Событие возникает после того как была произведена замена блока товара со старым ключом на блок с новым ключом. Не может быть отменено.

::: details Передаваемые параметры

* **cartName** - имя корзины, оно же имя плейсхолдера.
* **cart** - DOM-элемент корзины.
* **keyNew** - новый ключ товара.

:::

::: details Пример использования

```js:line-numbers
document.addEventListener('msac:row:replace:after', (e) => {
  const {cart, cartName, keyNew} = e.detail;

  const newRow = cart.querySelector(`data-msac-product="${keyNew}"`); // получаем вставленный ряд

  // тут можно инициализировать плагины, например для кастомизации селекта
});
```

:::

### msac:row:update:before - обновление ряда

Событие возникает перед обновлением блока товара. Не может быть отменено.

::: details Передаваемые параметры

* **cartName** - имя корзины, оно же имя плейсхолдера.
* **cart** - DOM-элемент корзины.
* **data** - ответ сервера.
* **row** - DOM-элемент обновляемого ряда.
* **html** - HTML который будет вставлен.

:::

::: details Пример использования

```js:line-numbers
document.addEventListener('msac:row:update:before', (e) => {
  const {cart, cartName, data, row, html} = e.detail;

  // тут можно инициализировать плагины, например для кастомизации селекта
  // или делать что-то ещё
});
```

:::

### msac:totals:update:before - обновление суммарных значений

Событие возникает перед обновлением суммарных значений. Не может быть отменено.

::: details Передаваемые параметры

* **cart** - DOM-элемент корзины.
* **data** - ответ сервера.

:::

::: details Пример использования

```js:line-numbers
document.addEventListener('msac:totals:update:before', (e) => {
  const {cart, data} = e.detail;

  // тут можно внести какие-то изменения в данные
});
```

:::

### msac:row:add:after - добавление нового товара

Событие возникает после добавления нового товара. Не может быть отменено.

::: details Передаваемые параметры

* **cartName** - имя корзины, оно же имя плейсхолдера.
* **cart** - DOM-элемент корзины.
* **newRow** - DOM-элемент добавленного ряда.

:::

::: details Пример использования

```js:line-numbers
document.addEventListener('msac:row:add:after', (e) => {
  const {cart, cartName, newRow} = e.detail;

  // тут можно инициализировать плагины, например для кастомизации селекта
  // или показать модалку с только что добавленным товаром
  const modalCartEl = document.getElementById('modalCart');
  if (e.detail.cartName === 'modal' && modalCartEl) {
    const modalCart = new bootstrap.Modal(modalCartEl, {})
    modalCart.show();
  }
});
```

:::

### msac:row:remove:before - удалением DOM-элемента товара

Событие возникает перед удалением DOM-элемента товара. Может быть отменено.

::: details Передаваемые параметры

* **cartName** - имя корзины, оно же имя плейсхолдера.
* **cart** - DOM-элемент корзины.
* **row** - DOM-элемент удаляемого ряда.

:::

::: details Пример использования

```js:line-numbers
document.addEventListener('msac:row:remove:before', (e) => {
  const {cart, cartName, row} = e.detail;

  // тут можно инициализировать плагины, например для кастомизации селекта
  // или делать что-то ещё
});
```

:::

### msac:html:prepare:after - подготовка html

Событие возникает после подготовки html для вставки. Не может быть отменено.

::: details Передаваемые параметры

* **element** - подготовленный DOM-элемент.

:::

::: details Пример использования

```js:line-numbers
document.addEventListener('msac:html:prepare:after', (e) => {
  const {element} = e.detail;

  // тут можно инициализировать плагины, например для кастомизации селекта
  // или делать что-то ещё
});
```

:::

### msac:cart:clean:before - подготовка html

Событие возникает перед очистко блока корзины и показом чанка пустой корзины. Может быть отменено.

::: details Передаваемые параметры

* **cartName** - имя корзины, оно же имя плейсхолдера.
* **cart** - DOM-элемент корзины.

:::

::: details Пример использования

```js:line-numbers
document.addEventListener('msac:cart:clean:before', (e) => {
  const {cartName, cart} = e.detail;

  // тут можно инициализировать плагины, например для кастомизации селекта
  // или делать что-то ещё
});
```

:::

## API

Компонент предоставляет возможность взаимодействовать с корзиной из JavaScript, используя ряд простых методов.

### Добавление товара

```js:line-numbers
MsAltCart.add(product_id, count, {
  option_key: option_value,
})
```

Объект опций является необязательным параметром.

### Изменение товара

```js:line-numbers
MsAltCart.change(product_cart_key, count, {
  option_key: option_value,
})
```

Объект опций является необязательным параметром.

### Удаление товара

```js:line-numbers
MsAltCart.remove(product_cart_key)
```

### Получение статуса и состава корзины

```js:line-numbers
const promise = MsAltCart.status();
promise.then((result) => console.log(result));
```
