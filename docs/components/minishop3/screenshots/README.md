# Скриншоты MiniShop3

Положите PNG в эту папку, затем раскомментируйте строку в markdown:

```md
<!-- ![Подпись](/components/minishop3/screenshots/имя-файла.png) -->
```

→

```md
![Подпись](/components/minishop3/screenshots/имя-файла.png)
```

Активная ссылка без файла ломает `pnpm build` (`Rollup failed to resolve import`). Заглушки держите в HTML-комментарии.

| Файл | Что снять | Страница |
| --- | --- | --- |
| `mgr-orders.png` | **Extras → MiniShop3 → Заказы**: список, переключатель черновиков, badge статуса | [interface/orders.md](../interface/orders.md), [manager/grid-config/cookbook.md](../manager/grid-config/cookbook.md) |
| `mgr-order.png` | Карточка заказа (вкладки, пересчёт стоимости) | [interface/orders.md](../interface/orders.md) |
| `mgr-customers.png` | **Extras → MiniShop3 → Клиенты** | [interface/customers.md](../interface/customers.md) |
| `mgr-deliveries.png` | **Настройки → Доставки** | [interface/settings/deliveries.md](../interface/settings/deliveries.md) |
| `mgr-payments.png` | **Настройки → Оплаты** | [interface/settings/payments.md](../interface/settings/payments.md) |
| `mgr-options.png` | **Настройки → Опции** (грид + группы) | [interface/settings/options.md](../interface/settings/options.md) |
| `mgr-option-groups.png` | DnD список групп опций (`msOptionGroup`) | [interface/settings/options.md](../interface/settings/options.md) |
| `mgr-notifications.png` | **Уведомления**: конфиги каналов | [interface/notifications.md](../interface/notifications.md) |
| `mgr-import.png` | **Утилиты → Импорт** (маппинг, extra fields) | [interface/utilities/import.md](../interface/utilities/import.md) |
| `mgr-extra-fields.png` | **Утилиты → Дополнительные поля** (в т.ч. repeater / key-value) | [interface/utilities/extra-fields.md](../interface/utilities/extra-fields.md), [manager/extra-fields/cookbook.md](../manager/extra-fields/cookbook.md), [manager/examples/product-extra-field.md](../manager/examples/product-extra-field.md) |
| `mgr-product-fields.png` | **Утилиты → Поля товара** (секции, visible) | [interface/utilities/product-fields.md](../interface/utilities/product-fields.md), [manager/product-fields/cookbook.md](../manager/product-fields/cookbook.md), [manager/examples/product-extra-field.md](../manager/examples/product-extra-field.md) |
| `mgr-product-data.png` | Вкладка **Данные** на карточке товара | [manager/examples/product-extra-field.md](../manager/examples/product-extra-field.md) |
| `mgr-grid-columns.png` | **Утилиты → Колонки гридов** | [interface/utilities/grid-columns.md](../interface/utilities/grid-columns.md), [manager/grid-config/cookbook.md](../manager/grid-config/cookbook.md) |
| `mgr-order-extra-field.png` | Карточка заказа: секция дополнительных полей | [manager/examples/order-custom-field.md](../manager/examples/order-custom-field.md) |
| `mgr-model-fields.png` | **Утилиты → Поля модели** (секции, visible) | [interface/utilities/model-fields.md](../interface/utilities/model-fields.md), [manager/model-fields/cookbook.md](../manager/model-fields/cookbook.md) |
| `mgr-category-products.png` | Таблица товаров на ресурсе категории (колонки-опции, inline-edit) | [interface/category.md](../interface/category.md), [quick-start.md](../quick-start.md), [manager/grid-config/cookbook.md](../manager/grid-config/cookbook.md) |
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
