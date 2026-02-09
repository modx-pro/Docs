---
title: События админки
---
# События админки

События для кастомизации административного интерфейса MiniShop3.

## msOnManagerCustomCssJs

Вызывается при загрузке страниц админки MiniShop3. Позволяет подключить собственные CSS и JavaScript файлы.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `object` | Объект контроллера страницы |
| `page` | `string` | Идентификатор страницы |

### Доступные страницы

| Значение page | Описание |
|---------------|----------|
| `product_create` | Создание товара |
| `product_update` | Редактирование товара |
| `category_create` | Создание категории |
| `category_update` | Редактирование категории |
| `orders` | Список заказов |
| `order` | Карточка заказа |
| `customers` | Список покупателей |
| `settings` | Настройки компонента |
| `notifications` | Управление уведомлениями |

### Подключение файлов

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $controller = $scriptProperties['controller'];
        $page = $scriptProperties['page'];

        // Подключить CSS
        $controller->addCss('/assets/components/mycomponent/css/ms3-custom.css');

        // Подключить JavaScript
        $controller->addJavascript('/assets/components/mycomponent/js/ms3-custom.js');

        // Подключить HTML (для модулей ES)
        $controller->addHtml('<script type="module" src="/assets/components/mycomponent/js/ms3-module.js"></script>');
        break;
}
```

### Условное подключение по странице

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $controller = $scriptProperties['controller'];
        $page = $scriptProperties['page'];

        // Общие стили для всех страниц
        $controller->addCss('/assets/components/mycomponent/css/common.css');

        // Скрипты только для товаров
        if (in_array($page, ['product_create', 'product_update'])) {
            $controller->addJavascript('/assets/components/mycomponent/js/product-extend.js');
        }

        // Скрипты только для заказов
        if (in_array($page, ['orders', 'order'])) {
            $controller->addJavascript('/assets/components/mycomponent/js/order-extend.js');
        }

        // Только для категорий
        if ($page === 'category_update') {
            $controller->addJavascript('/assets/components/mycomponent/js/category-extend.js');
        }
        break;
}
```

### Передача данных в JavaScript

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $controller = $scriptProperties['controller'];
        $page = $scriptProperties['page'];

        // Получение данных для передачи в JS
        $config = [
            'apiUrl' => '/assets/components/mycomponent/connector.php',
            'userId' => $modx->user->get('id'),
            'page' => $page,
            'customSetting' => $modx->getOption('my_custom_setting'),
        ];

        // Передача конфигурации
        $controller->addHtml('
            <script>
                window.MyComponent = window.MyComponent || {};
                window.MyComponent.config = ' . json_encode($config) . ';
            </script>
        ');

        $controller->addJavascript('/assets/components/mycomponent/js/main.js');
        break;
}
```

---

## Расширение интерфейса ExtJS

### Добавление кнопки в панель инструментов товара

```php
<?php
// Плагин
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];

        if (in_array($page, ['product_create', 'product_update'])) {
            $controller = $scriptProperties['controller'];
            $controller->addJavascript('/assets/components/mycomponent/js/product-toolbar.js');
        }
        break;
}
```

```javascript
// product-toolbar.js
Ext.onReady(function() {
    // Ждём инициализации панели
    var checkPanel = setInterval(function() {
        var panel = Ext.getCmp('ms3-product-panel');
        if (panel && panel.getTopToolbar) {
            clearInterval(checkPanel);

            // Добавляем кнопку в тулбар
            var toolbar = panel.getTopToolbar();
            toolbar.add('-');
            toolbar.add({
                text: 'Моя кнопка',
                iconCls: 'icon-cog',
                handler: function() {
                    MODx.msg.alert('Info', 'Кнопка нажата!');
                }
            });
            toolbar.doLayout();
        }
    }, 100);
});
```

### Добавление вкладки в карточку товара

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];

        if ($page === 'product_update') {
            $controller = $scriptProperties['controller'];
            $controller->addJavascript('/assets/components/mycomponent/js/product-tab.js');
        }
        break;
}
```

```javascript
// product-tab.js
Ext.onReady(function() {
    var checkTabs = setInterval(function() {
        var tabs = Ext.getCmp('modx-resource-tabs');
        if (tabs) {
            clearInterval(checkTabs);

            // Добавляем свою вкладку
            tabs.add({
                title: 'Моя вкладка',
                id: 'my-custom-tab',
                xtype: 'panel',
                layout: 'form',
                autoHeight: true,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Кастомное поле',
                    name: 'my_custom_field',
                    anchor: '100%'
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Описание',
                    name: 'my_description',
                    anchor: '100%',
                    height: 150
                }]
            });
            tabs.doLayout();
        }
    }, 100);
});
```

### Добавление колонки в грид заказов

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];

        if ($page === 'orders') {
            $controller = $scriptProperties['controller'];
            $controller->addJavascript('/assets/components/mycomponent/js/orders-grid.js');
        }
        break;
}
```

```javascript
// orders-grid.js
Ext.onReady(function() {
    // Расширяем конфигурацию грида заказов
    var originalGetColumns = ms3.grid.Orders.prototype.getColumns;

    ms3.grid.Orders.prototype.getColumns = function() {
        var columns = originalGetColumns.apply(this, arguments);

        // Добавляем свою колонку
        columns.splice(3, 0, {
            header: 'Источник',
            dataIndex: 'source',
            width: 100,
            sortable: true,
            renderer: function(value) {
                return value || '-';
            }
        });

        return columns;
    };
});
```

---

## Полный пример: расширение карточки товара

```php
<?php
/**
 * Плагин: Расширение карточки товара
 * События: msOnManagerCustomCssJs
 */

switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $controller = $scriptProperties['controller'];
        $page = $scriptProperties['page'];

        // Только для страниц товара
        if (!in_array($page, ['product_create', 'product_update'])) {
            return;
        }

        $assetsUrl = MODX_ASSETS_URL . 'components/mycomponent/';

        // CSS стили
        $controller->addCss($assetsUrl . 'css/product-extend.css');

        // Конфигурация для JS
        $productId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

        $config = [
            'productId' => $productId,
            'assetsUrl' => $assetsUrl,
            'connectorUrl' => $assetsUrl . 'connector.php',
            'options' => [
                'enableSync' => $modx->getOption('mycomp_enable_sync', null, true),
                'apiKey' => $modx->getOption('mycomp_api_key'),
            ],
        ];

        // Загрузка дополнительных данных для существующего товара
        if ($productId > 0) {
            $product = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
            if ($product) {
                $config['productData'] = [
                    'article' => $product->get('article'),
                    'vendor_id' => $product->get('vendor_id'),
                ];
            }
        }

        // Передача конфигурации
        $controller->addHtml('
            <script>
                window.MyProductExtend = ' . json_encode($config) . ';
            </script>
        ');

        // Основной скрипт
        $controller->addJavascript($assetsUrl . 'js/product-extend.js');
        break;
}
```

```javascript
// product-extend.js
Ext.onReady(function() {
    var config = window.MyProductExtend || {};

    // Ждём загрузки формы товара
    var checkForm = setInterval(function() {
        var form = Ext.getCmp('modx-panel-resource');
        if (!form) return;

        clearInterval(checkForm);

        // 1. Добавляем кнопку синхронизации в тулбар
        var toolbar = form.getTopToolbar();
        if (toolbar && config.options.enableSync) {
            toolbar.add('-');
            toolbar.add({
                text: 'Синхронизация',
                iconCls: 'icon-refresh',
                handler: function() {
                    syncProduct(config.productId);
                }
            });
            toolbar.doLayout();
        }

        // 2. Добавляем обработчики событий
        form.on('success', function(response) {
            console.log('Product saved:', response);
            // Дополнительные действия после сохранения
        });

    }, 100);

    // Функция синхронизации
    function syncProduct(productId) {
        if (!productId) {
            MODx.msg.alert('Ошибка', 'Сначала сохраните товар');
            return;
        }

        MODx.Ajax.request({
            url: config.connectorUrl,
            params: {
                action: 'sync',
                product_id: productId
            },
            listeners: {
                success: {
                    fn: function(response) {
                        MODx.msg.alert('Успех', 'Товар синхронизирован');
                    }
                },
                failure: {
                    fn: function(response) {
                        MODx.msg.alert('Ошибка', response.message || 'Ошибка синхронизации');
                    }
                }
            }
        });
    }
});
```

```css
/* product-extend.css */

/* Стили для кастомных элементов */
.my-custom-field {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    background: #f9f9f9;
}

.my-sync-status {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
}

.my-sync-status.synced {
    background: #d4edda;
    color: #155724;
}

.my-sync-status.pending {
    background: #fff3cd;
    color: #856404;
}

.my-sync-status.error {
    background: #f8d7da;
    color: #721c24;
}
```

---

## Рекомендации

### Избегайте конфликтов

```javascript
// Используйте уникальные namespace
window.MyComponent = window.MyComponent || {};
window.MyComponent.init = function() {
    // Ваш код
};

// Проверяйте существование элементов
var panel = Ext.getCmp('ms3-product-panel');
if (panel) {
    // Безопасно работаем с панелью
}
```

### Используйте события ExtJS

```javascript
// Подписка на события компонента
Ext.onReady(function() {
    if (typeof ms3 !== 'undefined') {
        // Подписываемся на событие загрузки
        ms3.on('load', function() {
            console.log('MiniShop3 loaded');
        });
    }
});
```

### Учитывайте порядок загрузки

```php
// Используйте addLastJavascript для скриптов,
// которые должны загрузиться после основных
$controller->addLastJavascript('/assets/components/mycomponent/js/after-all.js');
```
