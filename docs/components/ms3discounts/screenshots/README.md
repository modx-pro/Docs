# Скриншоты ms3Discounts

Положите PNG в эту папку. В документации пути вида `/components/ms3discounts/screenshots/имя-файла.png`.

После добавления изображений раскомментируйте HTML-комментарии с картинками в соответствующих markdown-файлах.

Скриншоты делаются только на тестовом стенде с синтетическими данными (демо-товары, тестовые пользователи, без данных реальных магазинов).

| Файл | Что снять | Где используется |
| --- | --- | --- |
| `overview.png` | Вкладка **Обзор**: KPI-счётчики (активные, запланированные, завершённые, отключённые), диаграмма типов акций, блок «Скоро» | [manager.md](../manager.md), [index.md](../index.md) |
| `discounts-list.png` | Вкладка **Скидки**: таблица правил с бейджами статусов, фильтрами, строкой поиска и панелью `BulkBar` | [manager.md](../manager.md), [quick-start.md](../quick-start.md) |
| `discount-drawer-main.png` | Боковая панель создания/редактирования скидки: название, выбор «Применяется к», тип скидки и период | [manager.md](../manager.md), [quick-start.md](../quick-start.md) |
| `rule-builder.png` | Конструктор условий **Rule Builder**: группа условий И/ИЛИ, выбор провайдеров, операторов и блок «Исключить» | [manager.md](../manager.md) |
| `preview-panel.png` | Панель тестирования **Проверить**: выбор товара, расчёт цены и вкладка «Трассировка» (права `ms3discounts_debug`) | [manager.md](../manager.md) |
| `storefront-badge.png` | Карточка товара на витрине с бейджем скидки, зачёркнутой старой ценой и актуальной ценой | [snippets/ms3discountsGetDiscount.md](../snippets/ms3discountsGetDiscount.md), [quick-start.md](../quick-start.md) |
| `storefront-buynow.png` | Промо-блок «Успей купить» на витрине: сетка акционных товаров с таймером обратного отсчёта | [snippets/ms3discountsBuyNow.md](../snippets/ms3discountsBuyNow.md), [snippets/index.md](../snippets/index.md) |
| `cart-discount.png` | Корзина MiniShop3: строка товара с пересчитанной ценой, исходной ценой в свойствах и подарочной позицией за 0 | [integration.md](../integration.md), [quick-start.md](../quick-start.md) |
