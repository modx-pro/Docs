# Поле ввода типа «ЧИСЛО»

:::tip
Плагин применяется ко всем полям типа number, расположенных внутри блоков с классов **ms-input-number-wrap**.
:::

## Разметка

```html:line-numbers
<div class="ms-input-number-wrap">
  <button class="ms-input-number-btn ms-input-number-minus" type="button">&#8722;</button>
  <input class="ms-input-number-emulator" value="{$count}" name="count" type="text">
  <button class="ms-input-number-btn ms-input-number-plus" type="button">&#43;</button>
</div>
```

## Атрибуты

* **min** - минимальное значение.
* **max** - максимальное значение.
* **step** - шаг изменения значения.
* **data-negative** - позволяет вводить отрицательные значения, если установлен.

## Инициализация

```js:line-numbers
const countInputs = cart.querySelectorAll('.ms-input-number-wrap input[type="number"]');
countInputs.length && countInputs.forEach(countInput => new CustomInputNumber(countInput));
```

## Изменение значения

```js:line-numbers
const countInput = cart.querySelector('.ms-input-number-wrap input[type="number"]');
countInput && (countInput.value = 55);
countInput && countInput.dispatchEvent(new Event('change', {bubbles: true}));
```
