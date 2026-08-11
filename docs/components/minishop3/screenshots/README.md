# Скриншоты MiniShop3

Положите PNG в эту папку, затем добавьте в markdown строку вида:

```md
![Подпись](/components/minishop3/screenshots/имя-файла.png)
```

Без файла VitePress падает на `pnpm build` (`Rollup failed to resolve import`). Не оставляйте ссылки-заглушки.

| Файл | Что снять | Страница |
| --- | --- | --- |
| `mgr-orders.png` | **Extras → MiniShop3 → Заказы**: список, переключатель черновиков | [interface/orders.md](../interface/orders.md) |
| `mgr-order.png` | Карточка заказа (вкладки, пересчёт стоимости) | [interface/orders.md](../interface/orders.md) |
| `mgr-customers.png` | **Extras → MiniShop3 → Клиенты** | [interface/customers.md](../interface/customers.md) |
| `mgr-deliveries.png` | **Настройки → Доставки** | [interface/settings/deliveries.md](../interface/settings/deliveries.md) |
| `mgr-payments.png` | **Настройки → Оплаты** | [interface/settings/payments.md](../interface/settings/payments.md) |
| `mgr-options.png` | **Настройки → Опции** (грид + группы) | [interface/settings/options.md](../interface/settings/options.md) |
| `mgr-option-groups.png` | DnD список групп опций (`msOptionGroup`) | [interface/settings/options.md](../interface/settings/options.md) |
| `mgr-notifications.png` | **Уведомления**: конфиги каналов | [interface/notifications.md](../interface/notifications.md) |
| `mgr-import.png` | **Утилиты → Импорт** (маппинг, extra fields) | [interface/utilities/import.md](../interface/utilities/import.md) |
| `mgr-extra-fields.png` | **Утилиты → Дополнительные поля** (в т.ч. repeater / key-value) | [interface/utilities/extra-fields.md](../interface/utilities/extra-fields.md) |
| `mgr-grid-columns.png` | **Утилиты → Колонки гридов** | [interface/utilities/grid-columns.md](../interface/utilities/grid-columns.md) |
| `mgr-category-products.png` | Таблица товаров на ресурсе категории (колонки-опции) | [interface/category.md](../interface/category.md), [quick-start.md](../quick-start.md) |
| `mgr-product-gallery.png` | Вкладка галереи на товаре | [interface/gallery.md](../interface/gallery.md) |
| `mgr-product-categories.png` | Вкладка **Категории** на карточке товара | [interface/product.md](../interface/product.md) |
| `mgr-system-settings.png` | System Settings → namespace minishop3 | [quick-start.md](../quick-start.md) |
| `fe-catalog.png` | Каталог товаров на витрине | [frontend/catalog.md](../frontend/catalog.md) |
| `fe-product.png` | Страница товара | [frontend/product.md](../frontend/product.md) |
| `fe-cart.png` | Корзина | [frontend/cart.md](../frontend/cart.md) |
| `fe-checkout.png` | Оформление заказа | [frontend/order.md](../frontend/order.md) |
| `fe-thanks.png` | Страница «Спасибо за заказ» | [frontend/thanks.md](../frontend/thanks.md) |
| `fe-customer-profile.png` | ЛК: профиль | [frontend/customer-profile.md](../frontend/customer-profile.md) |
| `fe-customer-addresses.png` | ЛК: адреса | [frontend/customer-addresses.md](../frontend/customer-addresses.md) |
| `fe-customer-orders.png` | ЛК: история заказов | [frontend/customer-orders.md](../frontend/customer-orders.md) |
| `fe-customer-auth.png` | ЛК: вкладки вход / регистрация | [frontend/customer-auth.md](../frontend/customer-auth.md) |
