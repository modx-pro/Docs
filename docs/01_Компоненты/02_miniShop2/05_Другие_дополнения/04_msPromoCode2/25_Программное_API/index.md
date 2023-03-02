
## Процессоры

### coupons/create

Пример создания промо-кода через процессор:

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$tools = $mspc2->getTools();

// Данные промо-кода
$data = [
    'code' => 'coupon_code', // Код
    'list' => 'default', // Список
    
    'discount' => '50%', // Скидка
    'count' => 20, // Кол-во
    
    'startedon' => 0, // Начало действия (timestamp)
    'stoppedon' => 0, // Конец действия (timestamp)
    
    'description' => '', // Описание
    
    'active' => true, // Включено
    
    'showinfo' => true, // Показывать предупреждения
    
    'oneunit' => false, // На одну единицу товара
    
    'onlycart' => true, // Только в корзине
    
    'unsetifnull' => true, // Не применять без скидки
    'unsetifnull_msg' => '', // Текст при отмене
    
    'oldprice' => false, // Без старой цены
];

$response = $tools->runProcessor('mgr/coupons/create', $data);
if ($errors = $tools->formatProcessorErrors($response)) {
    // Печатаем ошибку
    print_r($errors);
} else {
    // Печатаем массив с промо-кодом
    print_r($response->getObject());
}
```


### coupons/remove

Пример удаления промо-кода через процессор:

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$tools = $mspc2->getTools();

$data = [
    'id' => 22, // ID промо-кода для удаления
];

$response = $tools->runProcessor('mgr/coupons/remove', $data);
if ($errors = $tools->formatProcessorErrors($response)) {
    print_r($errors);
} else {
    print_r('Removed!');
}
```



## Служба mspc2Randexp

Данная служба позволяет сгенерировать строку по шаблону. Работает на основе библиотеки RegRev.


### Подключение

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$randexp = $mspc2->getRandexp();
```


### Генерация уникального кода

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$randexp = $mspc2->getRandexp();

$code = '';
$format = '[0-9]{4}-[a-zA-Z0-9]{12}'; // шаблон по типу регулярки
while (empty($code)) {
    $tmp = $randexp->get($format);
    if (!$modx->getCount('mspc2Coupon', ['code' => $tmp])) {
        $code = $tmp;
    }
    unset($tmp);
}

print_r($code);
```



## Служба mspc2Manager

Данная служба, в контексте публичного API, отвечает за проверку, установку и отмену промо-кода для корзины.


### Подключение

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();
```


### getCoupon

Возвращает массив `array` с текущим установленным на корзину промо-кодом или строку `string` с ошибкой данного промо-кода или о том, что промо-код не найден.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

$coupon_id = 8; // int
$coupon_code = 'code'; // string

// Получаем купон по его коду, для чего передаём первым параметром строку (string)
$result = $manager->getCoupon($coupon_code);

// или

// Получаем купон по его id, для чего передаём первым параметром число (integer)
$result = $manager->getCoupon($coupon_id);

// Проверяем, удалось ли получить промо-код
if (is_array($result)) {
    print_r('Промо-код: ' . print_r($result, 1));
} else {
    print_r('Ошибка: ' . $result);
}
```


### getCurrentCoupon

Возвращает массив `array` с текущим промо-кодом или `null`, если актуального промо-кода не найдено.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

//
$result = $manager->getCurrentCoupon();
if (is_array($result)) {
    print_r('Актуальный промо-код: ' . print_r($result, 1));
} else {
    print_r('Не найдено актуального промо-кода: ' . print_r($result, 1));
}
```


### setCoupon

Применяет купон к корзине.

Возвращает массив `array` с промо-кодом, если всё прошло успешно. Иначе строку `string` с ошибкой.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

$coupon_id = 8; // int
$coupon_code = 'code'; // string

// Применяем купон по его коду, для чего передаём первым параметром строку (string)
$result = $manager->setCoupon($coupon_code);

// или

// Применяем купон по его id, для чего передаём первым параметром число (integer)
$result = $manager->setCoupon($coupon_id);

// Проверяем, удалось ли применить промо-код
if (is_array($result)) {
    print_r('Применённый промо-код: ' . print_r($result, 1));
} else {
    print_r('Ошибка: ' . $result);
}
```


### unsetCoupon

Отменяет применённый к корзине промо-код.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

//
$manager->unsetCoupon();
```


### generateCoupon

Генерирует промо-код с кодом в заданном формате `string $format` и с заданными параметрами `array $data`.

Возвращает массив `array` с промо-кодом, если всё прошло успешно. Иначе строку `string` с ошибкой.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

// Формат промо-кода в виде regex-like синтаксиса
$format = '[a-zA-Z0-9]{12}';

// Параметры промо-кода
$data = [
    // Основное
    'list' => 'custom-list', // Поле "Список" для промо-кода
    'count' => 1, // Сколько раз можно применить генерируемый промо-код
    'discount' => '10%', // Размер скидки для генерируемого промо-кода
    'description' => '', // Описание промо-кода
    
    // Конфиг
    'showinfo' => true, // Показывать предупреждения
    'oneunit' => false, // На одну единицу товара
    'onlycart' => true, // Только в корзине
    'unsetifnull' => false, // Не применять без скидки
    'unsetifnull_msg' => '', // Текст при отмене
    'oldprice' => false, // Без старой цены
    
    // Время действия
    // 'lifetime' => 60 * 20, // В секундах
    // или
    // 'startedon' => '', // Начало действия, timestamp
    // 'stoppedon' => '', // Конец действия, timestamp
];

//
$result = $manager->generateCoupon($format, $data);
if (is_array($result)) {
    print_r('Сгенерированный промо-код: ' . print_r($result, 1));
} else {
    print_r('Ошибка при создании промо-кода: ' . print_r($result, 1));
}
```



## События плагинов

Описано [в соответствующем разделе][14] документации.



## События jQuery

Описано [в соответствующем разделе][15] документации.




[14]: /ru/01_Компоненты/02_miniShop2/05_Другие_дополнения/04_msPromoCode2/17_События_плагинов/index.md
[15]: /ru/01_Компоненты/02_miniShop2/05_Другие_дополнения/04_msPromoCode2/15_События_jQuery.md
