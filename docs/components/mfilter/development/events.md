# События

Системные события MODX для расширения mFilter.

## Плагин mFilter

Плагин обрабатывает следующие события:

| Событие | Описание |
|---------|----------|
| `OnHandleRequest` | Роутинг SEO URL |
| `OnLoadWebDocument` | Подключение CSS/JS |
| `OnDocFormSave` | Инвалидация кэша |
| `OnCacheUpdate` | Очистка кэша mFilter |
| `OnResourceDelete` | Очистка связанных данных |

## OnMFilterInit

Срабатывает при инициализации сервиса mFilter. Используется для:
- Регистрации кастомных типов фильтров
- Регистрации источников данных
- Модификации конфигурации

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `mfilter` | MFilter | Экземпляр главного класса |

### Пример: Регистрация типа фильтра

```php
<?php
// Плагин на событие OnMFilterInit

/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Регистрация своего типа фильтра
$mfilter->getFilterTypeRegistry()->register(
    'mytype',
    new MyNamespace\MyFilterType($modx)
);
```

### Пример: Регистрация источника данных

```php
<?php
/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Регистрация источника для кастомной таблицы
$mfilter->getSourceRegistry()->register(
    'myproducts',
    new MyNamespace\MyProductsSource($modx, $mfilter)
);
```

## OnHandleRequest

Обрабатывает входящий запрос, определяет SEO URL фильтров.

### Логика работы

1. Получает REQUEST_URI
2. Пытается распарсить как SEO URL фильтра
3. Если успешно:
   - Устанавливает плейсхолдеры фильтров
   - Вызывает `sendForward()` на целевой ресурс

### Плейсхолдеры после роутинга

| Плейсхолдер | Описание |
|-------------|----------|
| `mfilter.filters` | Массив активных фильтров |
| `mfilter.sort` | Сортировка (price-asc) |
| `mfilter.sortBy` | Поле сортировки |
| `mfilter.sortDir` | Направление |
| `mfilter.page` | Номер страницы |
| `mfilter.limit` | Лимит на странице |
| `mfilter.seo.h1` | SEO H1 |
| `mfilter.seo.title` | SEO Title |
| `mfilter.seo.description` | SEO Description |
| `mfilter.seo.canonical` | Canonical URL |
| `mfilter.seo.noindex` | Флаг noindex |

## OnLoadWebDocument

Подключает фронтенд-ассеты (CSS/JS) на страницы.

### Управление

Отключить автоподключение: `mfilter.register_frontend` = `false`

### Кастомизация списка файлов

Системная настройка `mfilter.frontend_assets`:

```json
[
    "[[+cssUrl]]web/mfilter.css",
    "[[+jsUrl]]web/core/ApiClient.js",
    "[[+jsUrl]]web/mfilter.js"
]
```

## OnDocFormSave

Срабатывает при сохранении ресурса.

### Действия

- Инвалидирует кэш страницы если она связана с фильтрами
- Перестраивает кэш роутера если изменился URI

## OnCacheUpdate

Срабатывает при очистке кэша MODX.

### Действия

- Очищает кэш роутера mFilter
- Очищает кэш результатов

## OnResourceDelete

Срабатывает при удалении ресурса.

### Действия

- Удаляет связанную конфигурацию PageConfig
- Удаляет привязки FilterSet
- Перестраивает кэш роутера

## Создание плагина

### Базовый шаблон

```php
<?php
/**
 * My mFilter Extension
 *
 * Events: OnMFilterInit
 */

if ($modx->event->name !== 'OnMFilterInit') {
    return;
}

/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Ваш код расширения
```

### Регистрация плагина

1. Создайте файл в `core/components/mypackage/elements/plugins/`
2. Зарегистрируйте плагин в MODX
3. Привяжите к событию `OnMFilterInit`

## Примеры расширений

### Логирование фильтрации

```php
<?php
// Плагин: mFilterLogger
// События: OnMFilterInit

$mfilter = $modx->event->params['mfilter'];

// Добавляем хук на применение фильтров
$mfilter->getFilter()->addHook('afterApply', function($result, $params) use ($modx) {
    $modx->log(
        modX::LOG_LEVEL_ERROR,
        '[mFilter] Applied filters: ' . json_encode($params['filters']) .
        ', Results: ' . $result['total']
    );
});
```

### Кастомная валидация

```php
<?php
// Плагин: mFilterValidator
// События: OnMFilterInit

$mfilter = $modx->event->params['mfilter'];

// Валидация перед применением
$mfilter->getFilter()->addHook('beforeApply', function(&$params) use ($modx) {
    // Ограничить максимальную цену
    if (isset($params['filters']['price']['max'])) {
        if ($params['filters']['price']['max'] > 1000000) {
            $params['filters']['price']['max'] = 1000000;
        }
    }
});
```

### Интеграция с аналитикой

```php
<?php
// Плагин: mFilterAnalytics
// События: OnMFilterInit

$mfilter = $modx->event->params['mfilter'];

$mfilter->getFilter()->addHook('afterApply', function($result, $params) use ($modx) {
    // Отправка в Google Analytics через Measurement Protocol
    $data = [
        'v' => 1,
        'tid' => 'UA-XXXXX-Y',
        'cid' => session_id(),
        't' => 'event',
        'ec' => 'filter',
        'ea' => 'apply',
        'el' => json_encode($params['filters']),
        'ev' => $result['total']
    ];

    // Асинхронная отправка
    $ch = curl_init('https://www.google-analytics.com/collect');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
});
```
