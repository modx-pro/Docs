# Скриншоты msYandexDelivery

Положите PNG в эту папку, затем раскомментируйте строку в markdown:

```md
<!-- ![Подпись](/components/msyandexdelivery/screenshots/имя-файла.png) -->
```

→

```md
![Подпись](/components/msyandexdelivery/screenshots/имя-файла.png)
```

Активная ссылка без файла ломает `pnpm build` (`Rollup failed to resolve import`). Заглушки держите в HTML-комментарии.

| Файл | Что снять | Страница |
| --- | --- | --- |
| `fe-checkout-pvz.png` | Чекаут: карта ПВЗ v2, выбранная точка, цена | [checkout.md](../checkout.md) |
| `mgr-order-tab.png` | Карточка заказа MS3: вкладка Yandex Delivery (статус, Create / Confirm / Refresh / Cancel) | [integration.md](../integration.md), [quick-start.md](../quick-start.md), [index.md](../index.md) |
