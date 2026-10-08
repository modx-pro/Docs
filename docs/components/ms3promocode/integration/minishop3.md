# MiniShop3

## Учёт скидки в позициях

При применении кода скидка распределяется по подпадающим позициям и уценивает `msOrderProduct.price`; исходная цена сохраняется в `properties.ms3promocode.original_price`.

### Что это даёт

| Что               | Эффект                                                                                   |
|-------------------|------------------------------------------------------------------------------------------|
| Чек 54-ФЗ         | ОФД формирует чек по `msOrderProduct.price` — суммы совпадают с оплаченной автоматически |
| Email-уведомления | Стандартные email-шаблоны MS3 показывают уценённую `price` каждой позиции                |
| Личный кабинет    | Покупатель видит реальные оплаченные цены без правки шаблонов                            |
| Аналитика MS3     | `msOrder.cart_cost = SUM(msOrderProduct.cost)` на всех этапах жизненного цикла заказа     |

### Альтернатива — скидка отдельной строкой

Можно было показывать скидку отдельной строкой в итогах:

```
Товары:           5000 ₽
Скидка SALE10:   −500 ₽
Итого:            4500 ₽
```

Так работают крупные маркетплейсы: у них своя фискализация, расхождение между суммой позиций и оплатой проблем не создаёт.

Для типичного MS3-магазина потребовались бы:

- доработка email-шаблонов (строка скидки);
- доработка шаблонов личного кабинета;
- доработка формирования чека ОФД (отдельная позиция-скидка).

## Точки интеграции

### События MS3, на которые подписан плагин

См. [Развёрнутый список событий](../development/events).

### Жизненный цикл применения кода

```
1. Покупатель заходит в корзину
   └─→ Сниппет ms3PromoCodeForm отрисовывает SSR-форму

2. Покупатель применяет код
   └─→ POST /api/v1/promo/apply
       └─→ ApplicationService::apply()
           ├─ ValidationService::validateCode → жизненный цикл OK
           ├─ ValidationService::validateForOrder → min_order OK
           ├─ restoreLineItems (снять предыдущую уценку, если была)
           ├─ findMatchingItems (по правилам кода)
           ├─ DiscountCalculator::calculate → breakdown
           ├─ applyToLineItems (уценка позиций + properties)
           ├─ saveToOrder (msOrder.properties.promo_code)
           └─ recalculateOrderTotals (cart_cost, cost)

3. Покупатель меняет состав корзины
   └─→ msOnAddToCart / msOnChangeInCart / msOnChangeOptionInCart / msOnRemoveFromCart
       └─→ ApplicationService::syncAfterCartChange()
           ├─ apply (повторно; шаги — см. п. 2)
           └─ если apply вернул ошибку → remove
              и на фронт шлётся событие ms3promocode:auto-removed

4. Покупатель оформляет заказ
   └─→ msOnCreateOrder
       └─→ UsageTracker::recordApplication
           ├─ INSERT в ms3_promo_code_usages
           └─ UPDATE ms3_promo_codes.used_count + 1

5. Менеджер меняет статус заказа
   └─→ msOnChangeOrderStatus
       ├─ Переход в статус из ms3promocode.cancel_statuses
       │  └─→ UsageTracker::cancelApplication
       │      ├─ UPDATE usage SET cancelled_at = NOW()
       │      └─ UPDATE ms3_promo_codes.used_count − 1
       └─ Обратный переход (из статуса отмены в активный)
          └─→ UsageTracker::reinstateApplication
              ├─ UPDATE usage SET cancelled_at = NULL
              └─ UPDATE ms3_promo_codes.used_count + 1
```

## Менеджер изменяет состав уже созданного заказа

Плагин подключает `order-tab.js` к окну заказа через событие `msOnManagerCustomCssJs` и регистрирует вкладку «Промо-код» через `window.MS3OrderTabsRegistry`.

Vue-админка MS3 не вызывает MODX-процессоры при изменении позиций (см. [issue #207](https://github.com/modx-pro/MiniShop3/issues/207)). Поэтому события `msOnCreateOrderProduct / msOnUpdateOrderProduct / msOnRemoveOrderProduct`, на которые плагин подписан, не срабатывают.

### Решение

В [order-tab.js](https://github.com/biz87/ms3PromoCode/blob/main/assets/components/ms3promocode/js/mgr/order-tab.js) установлен JS-перехватчик HTTP-мутаций (основной — `window.fetch`, запасной — `XMLHttpRequest`):

1. Перехватывает каждый успешный `POST/PUT/PATCH/DELETE` к `/api/mgr/orders/{id}/products*`.
2. **До** возврата ответа клиенту вызывает процессор `Mgr/Order/Resync`.
3. Vue-админка получает ответ только после `await resync(...)` — и затем перезапрашивает данные заказа, видя уже пересчитанные цены.

::: warning Ручная правка цены позиции в админке
Если менеджер правит `price` позиции вручную (не через процесс добавления/изменения/удаления), сохранённое оригинальное значение цены становится недействительным. При последующем снятии кода `remove` не возвращает прежнюю цену — текущая остаётся как есть.
:::

## Что НЕ модифицирует ms3PromoCode

Чтобы не конфликтовать с другими плагинами и оставаться прозрачным:

- **Не модифицирует** `msProduct` (карточка товара в каталоге остаётся нетронутой).
- **Не модифицирует** `msOrderProduct.options`, `weight`, `name` — только `price` и связанные `cost`.
- **Не модифицирует** настройки доставки и оплаты.
- **Не подписан** на `msOnGetProductPrice` — скидки не применяются на уровне отдельного товара вне контекста корзины.
- **Не подписан** на `msOnGetCartCost` — это бы дало двойную скидку при модели «уценка позиций».

## Совместимость с версиями MS3

| Версия MS3   | Поддержка ms3PromoCode                                                          |
|--------------|---------------------------------------------------------------------------------|
| 1.10+        | Полная — фронтенд, новая Vue-админка, менеджерская вкладка работают              |
| 1.8 – 1.9    | Не тестировалось, но скорее всего работает (минорные изменения схемы)           |
| < 1.8        | Не поддерживается                                                               |

JS-перехватчик нужен, пока Vue-админка MS3 не начнёт вызывать `msOn{Create,Update,Remove}OrderProduct` ([issue #207](https://github.com/modx-pro/MiniShop3/issues/207)). Когда события появятся — обход можно убрать: плагин уже на них подписан.
