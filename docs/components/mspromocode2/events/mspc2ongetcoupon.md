# mspc2OnGetCoupon

Срабатывает после получения промо-кода и всех проверок в методе `mspc2Manager::getCoupon`.
Будет запущено, только если такой промо-код существует и пройдены проверки времени жизни, активности, количества, и т.д.

Данный метод при работе компонента вызывается довольно часто, даже в момент применения промо-кода к уже оформленному заказу.

## Параметры

- `array $coupon` — массив с промо-кодом
