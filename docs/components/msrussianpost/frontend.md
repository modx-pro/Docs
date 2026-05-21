---
title: Подключение на сайте
---
# Подключение на сайте

Порядок подключения лексикона, сниппета и чанков описан в разделе [Быстрый старт](quick-start). Ниже — коннектор, чанки и проверка интеграции.

## Проверка интеграции

**Чек-лист**

- В чанке заказа есть обёртка `msrp__wrapper` или `[data-msrp-widget]` **один раз** на страницу. Скрипт привязывается к **первому** такому корню и ищет `.msrp__status` и `.msrp__methods` **только внутри него**.
- **Не** оборачивайте чанки `tplRussianPostStatus` и `tplRussianPostMethods` во внешние `<div class="msrp__status">` / `<div class="msrp__methods">` — эти классы уже внутри чанков. Иначе получится вложенность и возможны пустой блок и «залипший» индикатор загрузки.
- Если внутри обёртки случайно оказалось **несколько** блоков `.msrp__status` или `.msrp__methods`, скрипт использует **последний** в порядке DOM (обычно разметка из чанка).
- Вызовы идут в порядке: **`msrpLexiconScript`** → **`msRussianPost`** → чанки (сниппет уже подключает `russianpost.css` и `russianpost.js`).
- В MiniShop3 создана доставка с классом `msrussianpost\Delivery\RussianPostDelivery`, в настройках указан корректный **`delivery_id`** (или настроен авто-режим осознанно).
- Поле индекса доступно под именем `index`, `order[data][index]` или задан **`indexSelector`** в сниппете.
- Радио/селект доставки используют имена `delivery_id`, `delivery`, `order[data][delivery_id]`, `order[data][delivery]` — виджет отслеживает выбор.

Если форма заказа подгружается AJAX’ом после `russianpost.js`, срабатывают повторные проверки и хук **`ms3Hooks.afterAddOrder`**.

После инициализации в браузере доступен глобальный объект **`window.msRussianPost`**: например **`recalculate()`**, **`selectMethod(code)`**, **`loadCachedMethods()`**, **`getLexicon(key)`** — для кастомных сценариев и принудительного пересчёта.

## Автокомплит адреса и индекс (mxDadata) {#mxdadata}

В **msRussianPost** нет встроенных подсказок DaData: только расчёт тарифов и виджет методов. Чтобы покупатель вводил адрес с подсказками и чтобы подставлялся **индекс** (и связанные поля), установите пакет **[mxDadata](/components/mxdadata/)** для MiniShop3, получите токен в [личном кабинете DaData](https://dadata.ru/profile/) и укажите его в **системных настройках mxDadata** — см. [документацию mxDadata](/components/mxdadata/quick-start).

**Порядок на странице заказа:**

1. Поля адреса заказа (как в вашей вёрстке MiniShop3).
2. Сниппет **`[[!mxDadataAddressSuggest]]`** (или эквивалент в Fenom) — **до** лексикона и виджета Почты России.
3. **`msrpLexiconScript`** → **`msRussianPost`** → чанки `tplRussianPostStatus` и `tplRussianPostMethods`.

Так **`window.msRussianPostConfig`** окажется на странице **до** загрузки `russianpost.js`, а после выбора подсказки адреса mxDadata отправит данные в заказ и сгенерирует на `document` событие **`mxdadata:order-address-updated`**. Скрипт **msRussianPost** на него подписан: при активной доставке «Почта России» вызывается **`recalculate()`**, потому что после **`order/set`** хук **`ms3Hooks.afterAddOrder`** иногда не срабатывает.

Имена полей формы и вложенность должны совпадать с ожиданиями **mxDadata** и MiniShop3 — таблицы имён и порядок подключения см. в [Подключение на сайте (mxDadata)](/components/mxdadata/frontend). Техническая связка с хуками MS3 — в разделе [Интеграция с хуками MiniShop3](integration#интеграция-с-хуками-minishop3).

## Коннектор

**URL:** `assets/components/msrussianpost/connector.php` (в конфигурацию для JS попадает абсолютный URL-адрес сайта).

Запросы идут методом **POST** (AJAX из `russianpost.js`). Типичные действия: расчёт тарифа по индексу, выбор метода, служебные операции для раздела компонента в панели управления MODX. Точный контракт описан в исходниках процессоров пакета.

При необходимости переопределите URL через параметр сниппета **`connectorUrl`**.

## Чанки

| Чанк | Назначение |
|------|------------|
| `tplRussianPostStatus` | Блок статуса: загрузка, ошибка, стоимость и сроки (класс `msrp__status`) |
| `tplRussianPostMethods` | Список методов с `radio` `name="msrp_method"` (контейнер `msrp__methods`) |

После расчёта JS обновляет разметку внутри этих контейнеров. Чанки задают начальную структуру и стили.

### Плейсхолдеры `tplRussianPostStatus`

| Переменная | Назначение |
|------------|------------|
| `$loading` | Показать состояние «рассчитываем» |
| `$error` | Текст ошибки |
| `$cost` | Отформатированная стоимость |
| `$min_days`, `$max_days` | Срок доставки в днях |

### Плейсхолдеры `tplRussianPostMethods`

Цикл `$methods`: у каждого элемента обычно есть `code`, `name`, `cost_formatted`, `min_days`, `max_days`, `selected`.

## Стили и BEM

Префикс классов: **`msrp__`** (`msrp__wrapper`, `msrp__method`, `msrp__status`, `msrp__error-message` и т.д.). Файл: `assets/components/msrussianpost/css/russianpost.css`.

### CSS-переменные

```css
:root {
    --msrp-method-background: #fff;
    --msrp-method-border-color: #e5e7eb;
    --msrp-method-selected-border-color: #2563eb;
    --msrp-error-color: #b91c1c;
    --msrp-loading-color: #64748b;
    --msrp-gap: 1rem;
    --msrp-radius: 0.5rem;
}
```

Переопределите в своём CSS после подключения `russianpost.css`.

## Кастомное поле индекса

Помимо `indexSelector` в сниппете можно пометить поле атрибутом **`data-msrp-index`** — оно участвует в автопоиске индекса.
