# JS API

Headless-ядро ms3PromoCode — глобальный объект `window.ms3PromoCode`. Используйте, если строите свой UI на Vue / React / Svelte / любом JS поверх Web API.

## Подключение

При пресете `core_ui` или `core` — ядро подключается автоматически плагином. При пресете `none` подключите вручную:

```html
<script src="/assets/components/ms3promocode/js/web/core/ApiClient.js"></script>
<script src="/assets/components/ms3promocode/js/web/core/PromoCodeAPI.js"></script>
<script src="/assets/components/ms3promocode/js/web/ms3promocode.headless.js"></script>
```

Объект `window.ms3PromoCode` появляется и автоматически инициализируется на `DOMContentLoaded`. Чтобы запускать инициализацию вручную (SPA, ленивая загрузка), поставьте глобальный флаг **до** загрузки `ms3promocode.headless.js`:

```html
<script>window.ms3PromoCodeAutoInit = false;</script>
<script src=".../ms3promocode.headless.js"></script>
```

и вызовите `window.ms3PromoCode.init()` сами в нужный момент.

## Методы

### `init(config)`

Инициализация (идемпотентна). Возвращает Promise, который разрешается **после** загрузки текущего применённого кода с сервера. Повторный вызов возвращает тот же promise.

```js
await window.ms3PromoCode.init();
```

| Параметр | Тип    | Описание                                                          |
|----------|--------|-------------------------------------------------------------------|
| `config` | object | Переопределение полей конфига (`apiUrl`, `debug`)                 |

::: tip
Не нужно вызывать `init()` вручную — он автоматически срабатывает на `DOMContentLoaded`. Но если вы делаете действие сразу после загрузки скрипта, лучше явно дождаться: `await window.ms3PromoCode.init()`.
:::

::: warning `ready` — одноразовое событие
`ready` посылается один раз после `init()` — когда с сервера пришло текущее состояние применённого кода. Если пользовательский код подписался позже этого момента, событие не придёт. CustomEvent `ms3promocode:ready` на `document` тоже не «залипает». Надёжный путь — `await window.ms3PromoCode.init()`, тогда код после `await` выполнится в тот же момент, что и подписчики `ready`.
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

Возвращает ответ Web API (см. [Web API](../api)). При успехе посылает событие `applied`.

### `remove()`

Снять применённый код.

```js
await window.ms3PromoCode.remove();
```

Возвращает `{success, data: {removed: bool}}`. При успехе посылает событие `removed` с `detail = {removed: bool}` (`true` — код был снят, `false` — снимать было нечего).

::: warning
При HTTP-ошибке на стороне сервера (например, 500) `remove()` в текущей версии **не посылает** событие `error` — только возвращает `{success: false}`. Это отличается от поведения `apply()` и будет исправлено ([issue #6](https://github.com/biz87/ms3PromoCode/issues/6)). До исправления — проверяйте `result.success` в месте вызова.
:::

### `validate(code)`

Проверить код без записи.

```js
const result = await window.ms3PromoCode.validate('SALE10');
if (result.data.valid) {
    console.log('Превью:', result.data.preview);
}
```

Работает и с пустой корзиной — тогда проверяется только сам код (жизненный цикл, без расчёта скидки). В этом случае `result.data.preview === null`; при валидной корзине — объект с полями превью.

### `getCurrent()`

Синхронный геттер — возвращает кэшированное состояние применённого кода (или `null`).

```js
const current = window.ms3PromoCode.getCurrent();
if (current) {
    console.log(current.code, current.discount, current.applied_at);
}
```

Форма объекта зависит от момента чтения:

- После `refresh()` или события `ready` — `{code, discount, breakdown, applied_at}`.
- Сразу после `apply()` — `{code, discount, breakdown}` без `applied_at`.

Если UI завязан на `applied_at`, подождите события `ready` или вызовите `refresh()` после `apply()`.

### `refresh()`

Принудительно перечитать состояние с сервера.

```js
const current = await window.ms3PromoCode.refresh();
```

Используется внутренне при событии `ms3:cart:updated`; можно вызывать и вручную, если состояние могло измениться вне обычного сценария.

### `on(event, callback)`

Подписаться на локальное событие. Возвращает функцию отписки.

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

Снимает DOM-слушателя `ms3:cart:updated` и сбрасывает внутреннее состояние (`_current`, promise init, HTTP-клиент). Используется редко — например, перед заменой компонента в SPA.

::: warning
В текущей версии `destroy()` **не снимает локальные подписки** через `on()` — объект слушателей живёт в замыкании модуля. При частом цикле `destroy → init` в SPA обработчики накапливаются. До исправления ([issue #6](https://github.com/biz87/ms3PromoCode/issues/6)) отписывайтесь вручную — через функцию, возвращённую `on()`, или через `off()`.
:::

## События

Каждое событие посылается в двух каналах:

1. **Локально** — для подписчиков через `ms3PromoCode.on(event, cb)`.
2. **На `document`** — как `CustomEvent` с именем `ms3promocode:<event>`, для скриптов без прямого доступа к API.

| Событие         | Когда посылается                                              | Данные (`detail`)                                        |
|-----------------|--------------------------------------------------------------|----------------------------------------------------------|
| `ready`         | После завершения init и загрузки `current`                   | `{current}` — `null` или применённый код                 |
| `applied`       | После успешного `apply`                                      | `{code, discount, breakdown}`                            |
| `removed`       | После успешного `remove`                                     | `{removed: boolean}`                                     |
| `auto-removed`  | Код пропал из БД при `ms3:cart:updated` (стал невалиден)     | `{reason: 'cart_changed'}` — поле зарезервировано, значение всегда одно |
| `error`         | Ошибки `apply` — любые (сеть и API); для `remove`/`validate` — только сетевые (см. [issue #6](https://github.com/biz87/ms3PromoCode/issues/6)) | `{code, message, status}` — поле `status` присутствует только для API-ошибок; для сетевых (`code: 'network_error'`) его нет |

### Пример: реакция на DOM CustomEvent

```js
document.addEventListener('ms3promocode:applied', (e) => {
    console.log('Скидка применена:', e.detail.discount);
    refreshCartUI();
});

document.addEventListener('ms3promocode:auto-removed', () => {
    showNotice('Промо-код снят, так как состав корзины изменился.');
});
```

## Автосинхронизация с корзиной MS3

Headless-ядро подписано на DOM-событие `ms3:cart:updated` (стандартное событие MS3, посылается при изменении корзины). На каждое срабатывание ядро перечитывает текущий код через GET `/api/v1/promo/current` и сравнивает ответ с кэшем. Если код пропал из БД (стал недействителен после изменения корзины) — ядро посылает `auto-removed`. Само снятие кода делает плагин на сервере; событие формируется на фронте по разнице кэша и ответа `/current`.

::: tip
При изменении корзины через стандартный MS3 UI-слой (`window.ms3.cartUI.handleAdd / handleChange / handleRemove`) событие `ms3:cart:updated` посылается автоматически. Если вы меняете корзину напрямую через HTTP-API без UI-слоя или через `window.ms3.cartAPI.*` — посылайте событие сами:

```js
document.dispatchEvent(new CustomEvent('ms3:cart:updated'));
```
:::

## Интеграция с Vue

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const current = ref(null)
const error = ref(null)
let unsubApplied, unsubRemoved

onMounted(async () => {
    await window.ms3PromoCode.init()
    current.value = window.ms3PromoCode.getCurrent()

    unsubApplied = window.ms3PromoCode.on('applied', (data) => {
        current.value = data
    })
    unsubRemoved = window.ms3PromoCode.on('removed', () => {
        current.value = null
    })
})

onBeforeUnmount(() => {
    unsubApplied?.()
    unsubRemoved?.()
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

Конфиг задаётся глобальной переменной **до** загрузки `ms3promocode.headless.js`:

```html
<script>
window.ms3PromoCodeFrontConfig = {
    debug: true,                      // выводить запросы в консоль
    currencySymbol: '₽',
    currencyPosition: 'after',
};
</script>
<script src=".../ms3promocode.headless.js"></script>
```

| Поле                 | По умолчанию                                   | Описание                                                                      |
|----------------------|------------------------------------------------|-------------------------------------------------------------------------------|
| `apiUrl`             | `/assets/components/minishop3/api.php`         | Точка входа MS3-роутера. Запросы уходят на `${apiUrl}?route=/api/v1/promo/...`. Переопределять нужно только если роутер MS3 примонтирован нестандартным путём — префикс `/api/v1/promo` трогать нельзя |
| `debug`              | `false`                                        | Логировать запросы и ответы в консоль                                         |
| `currencySymbol`     | `₽`                                            | Символ валюты (для UI-форматирования)                                         |
| `currencyPosition`   | `after`                                        | Позиция символа: `before` или `after`                                         |
