# Number Input Field

:::tip
The plugin applies to all number inputs inside elements with class **ms-input-number-wrap**.
:::

## Markup

```html:line-numbers
<div class="ms-input-number-wrap">
  <button class="ms-input-number-btn ms-input-number-minus" type="button">&#8722;</button>
  <input class="ms-input-number-emulator" value="{$count}" name="count" type="text">
  <button class="ms-input-number-btn ms-input-number-plus" type="button">&#43;</button>
</div>
```

## Attributes

* **min** — minimum value.
* **max** — maximum value.
* **step** — step for value change.
* **data-negative** — allow negative values when set.

## Initialization

```js:line-numbers
const countInputs = cart.querySelectorAll('.ms-input-number-wrap input[type="number"]');
countInputs.length && countInputs.forEach(countInput => new CustomInputNumber(countInput));
```

## Changing the value

```js:line-numbers
const countInput = cart.querySelector('.ms-input-number-wrap input[type="number"]');
countInput && (countInput.value = 55);
countInput && countInput.dispatchEvent(new Event('change', {bubbles: true}));
```
