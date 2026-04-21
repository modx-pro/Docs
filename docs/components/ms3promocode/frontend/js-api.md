# JS API

Headless-ядро ms3PromoCode — глобальный объект `window.ms3PromoCode`. Используйте, если строите свой UI на Vue / React / Svelte / vanilla JS поверх Web API.

## Подключение

При пресете `core_ui` или `core` — ядро подключается автоматически плагином. При пресете `none` подключите вручную:

```html
<script src="/assets/components/ms3promocode/js/web/core/ApiClient.js"></script>
<script src="/assets/components/ms3promocode/js/web/core/PromoCodeAPI.js"></script>
<script src="/assets/components/ms3promocode/js/web/ms3promocode.headless.js"></script>
```

Объект `window.ms3PromoCode` появляется и автоматически инициализируется на `DOMContentLoaded`.

## Методы

### `init(config)`

Инициализация (идемпотентна). Возвращает Promise, который разрешается **после** загрузки текущего применённого кода с сервера. Повторный вызов возвращает тот же promise.

```js
await window.ms3PromoCode.init();
```

| Параметр | Тип    | Описание                                                          |
|----------|--------|-------------------------------------------------------------------|
| `config` | object | Опциональный override конфига (`apiUrl`, `debug`)                 |

::: tip
Не нужно вызывать `init()` вручную — он автоматически срабатывает на `DOMContentLoaded`. Но если вы делаете действие сразу после загрузки скрипта, лучше явно дождаться: `await window.ms3PromoCode.init()`.
:::

### `apply(code)`

Применить код к текущей корзине.

```js
const result = await window.ms3PromoCode.apply('SALE10');
if (result.success) {
    console.log('Скидка:', result.data.discount);
} else {
    console.warn('Ошибка:', result.message);
}
```

Возвращает payload Web API (см. [Web API](../api)). При успехе эмитит событие `applied`.

### `remove()`

Снять применённый код.

```js
await window.ms3PromoCode.remove();
```

Возвращает `{success: true, data: {removed: bool}}`. Эмитит событие `removed`.

### `validate(code)`

Проверить код без записи.

```js
const result = await window.ms3PromoCode.validate('SALE10');
if (result.data.valid) {
    console.log('Превью:', result.data.preview);
}
```

Может работать и с пустой корзиной — тогда выполняется code-only проверка (только lifecycle, без расчёта скидки).

### `getCurrent()`

Синхронный геттер — возвращает кэшированное состояние применённого кода (или `null`).

```js
const current = window.ms3PromoCode.getCurrent();
if (current) {
    console.log(current.code, current.discount);
}
```

### `refresh()`

Принудительно перечитать состояние с сервера.

```js
const current = await window.ms3PromoCode.refresh();
```

Используется внутренне при событии `ms3:cart:updated` — но можно вызывать вручную, если знаете, что состояние могло измениться вне обычного flow.

### `on(event, callback)`

Подписаться на локальное событие. Возвращает функцию-unsubscribe.

```js
const unsub = window.ms3PromoCode.on('applied', (data) => {
    console.log('Код применён:', data.code, data.discount);
});

// Позже:
unsub();
```

### `off(event, callback)`

Отписаться явно.

```js
window.ms3PromoCode.off('applied', myCallback);
```

### `destroy()`

Полный сброс — очистка слушателей, отключение автосинхронизации. Используется редко (например, перед заменой компонента в SPA).

## События

Каждое событие эмитится в двух каналах:

1. **Локально** — для подписчиков через `ms3PromoCode.on(event, cb)`.
2. **На `document`** — как `CustomEvent` с именем `ms3promocode:<event>`, для скриптов без прямого доступа к API.

| Событие         | Когда эмитится                                                | Payload (`detail`)                                       |
|-----------------|--------------------------------------------------------------|----------------------------------------------------------|
| `ready`         | После завершения init и загрузки `current`                   | `{current}` — null или применённый код                   |
| `applied`       | После успешного `apply`                                      | `{code, discount, breakdown}`                            |
| `removed`       | После успешного `remove`                                     | `{}`                                                     |
| `auto-removed`  | Если код пропал из БД при `ms3:cart:updated` (стал невалиден)| `{reason}`                                               |
| `error`         | При ошибках сети или API                                     | `{code, message, status}`                                |

### Пример: реакция на DOM CustomEvent

```js
document.addEventListener('ms3promocode:applied', (e) => {
    console.log('Скидка применена:', e.detail.discount);
    refreshCartUI();
});

document.addEventListener('ms3promocode:auto-removed', (e) => {
    showNotice('Промо-код снят: ' + e.detail.reason);
});
```

## Автосинхронизация с корзиной MS3

Headless-ядро подписано на DOM-событие `ms3:cart:updated` (стандартное событие MS3, эмитится при изменении корзины). На каждое срабатывание ядро перечитывает текущий код через GET `/api/v1/promo/current`. Если код пропал из БД (стал недействителен после изменения корзины) — эмитится `auto-removed`.

::: tip
При собственной интеграции, если вы изменили корзину программно через `window.ms3.cart.add(...)`, вручную эмитить `ms3:cart:updated` не нужно — MS3 сам делает это. Если меняете корзину через прямые вызовы API без MS3 wrapper'а — эмитьте сами:

```js
document.dispatchEvent(new CustomEvent('ms3:cart:updated'));
```
:::

## Интеграция с Vue

```vue
<script setup>
import { ref, onMounted } from 'vue'

const current = ref(null)
const error = ref(null)

onMounted(async () => {
    await window.ms3PromoCode.init()
    current.value = window.ms3PromoCode.getCurrent()

    window.ms3PromoCode.on('applied', (data) => {
        current.value = data
    })
    window.ms3PromoCode.on('removed', () => {
        current.value = null
    })
})

async function apply(code) {
    error.value = null
    const result = await window.ms3PromoCode.apply(code)
    if (!result.success) {
        error.value = result.message
    }
}

async function remove() {
    await window.ms3PromoCode.remove()
}
</script>

<template>
    <div v-if="current">
        Применён код: <b>{{ current.code }}</b>
        Скидка: {{ current.discount }} ₽
        <button @click="remove">Отменить</button>
    </div>
    <form v-else @submit.prevent="apply($refs.input.value)">
        <input ref="input" placeholder="Промо-код">
        <button>Применить</button>
        <p v-if="error" class="error">{{ error }}</p>
    </form>
</template>
```

## Конфигурация

При желании можно переопределить URL API или включить debug-логи через глобальную переменную:

```html
<script>
window.ms3PromoCodeFrontConfig = {
    apiUrl: '/custom-api/v1/promo',  // редко нужно
    debug: true,                      // выводить запросы в консоль
    currencySymbol: '₽',
    currencyPosition: 'after',
};
</script>
<script src=".../ms3promocode.headless.js"></script>
```

| Поле                 | По умолчанию | Описание                                              |
|----------------------|--------------|-------------------------------------------------------|
| `apiUrl`             | (auto)       | Базовый URL Web API                                   |
| `debug`              | `false`      | Логировать запросы / ответы в console                 |
| `currencySymbol`     | `₽`          | Символ валюты (для UI-форматирования)                 |
| `currencyPosition`   | `after`      | Позиция символа: `before` или `after`                 |
