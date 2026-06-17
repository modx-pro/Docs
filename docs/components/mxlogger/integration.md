# Интеграция в свой пакет

## Зависимость

Добавьте mxLogger в зависимости вашего пакета (`requires` в сборке), чтобы он стоял
у пользователя. Сервис доступен сразу после установки.

## Прямое использование

```php
$mxl = $modx->services->get('mxlogger');
$mxl->info('mypackage', 'Импорт начат', ['rows' => $count]);
// ... ваша логика ...
$mxl->error('mypackage', 'Импорт упал', ['row' => $i, 'error' => $e->getMessage()]);
```

Тэгайте своим именем пакета (или именами фич) — тогда в гриде по тэгу видите весь
ход своей функциональности.

## Фасад над сервисом (рекомендуется)

Чтобы не дёргать контейнер по всему коду и не падать, если mxLogger не установлен,
заведите тонкую обёртку. Главное — передавать в опции `skip_classes` имя обёртки,
иначе «Источник» будет указывать на неё, а не на ваш реальный код.

```php
namespace MyPackage\Helpers;

class Logger
{
    private \modX $modx;
    private $mxl = false; // false — не резолвили; null — не установлен

    public function __construct(\modX $modx) { $this->modx = $modx; }

    public function log(string $level, $tags, string $message, array $context = []): void
    {
        $mxl = $this->resolve();
        if (!$mxl) { return; } // mxLogger не установлен — молча выходим
        $mxl->log($tags, $level, $message, $context, [
            'skip_classes' => [self::class], // «Источник» = реальный вызывающий код
        ]);
    }

    private function resolve()
    {
        if ($this->mxl !== false) { return $this->mxl; }
        return $this->mxl = $this->modx->services->has('mxlogger')
            ? $this->modx->services->get('mxlogger')
            : null;
    }
}
```

`skip_classes` принимает точное имя класса или префикс пространства имён со `\` на
конце (`'MyPackage\\Log\\'`) — надёжнее жёсткого `skip=N`, не зависит от числа кадров
обёртки.

## Воронки для многошаговых операций

Если операция идёт через несколько цепочек/пакетов — заведите процесс и прокидывайте
`process_uid`, чтобы всё собралось в одну ленту:

```php
$p = $mxl->process(['mypackage', 'import']);
$uid = $p->getUid();              // сохраните и передайте дальше
// ... позже / в другом классе ...
$mxl->info('import', 'Шаг 2', $ctx, ['process_uid' => $uid]);
```

## Готовый плагин логирования miniShop3

В комплекте — плагин `mxLoggerMiniShop3` (static), логирующий события корзины и
заказа miniShop3:

- корзина (`msOnAddToCart`/`ChangeInCart`/`RemoveFromCart`/`EmptyCart`) — тэг `cart`;
- заказ (`msOnAddToOrder`/`RemoveFromOrder`/`BeforeCreateOrder`/`CreateOrder`/
  `SubmitOrder`/`ChangeOrderStatus`) — тэг `order`;
- сквозной тэг `purchase`, воронка `process_uid` по сессии.

Параметры аргументов метода в trace не пишутся (`trace=caller`) — чтобы при
`capture_mode=full` не утекали ПДн/токен заказа. Требует установленного miniShop3.

> Свой плагин-логгер чужих событий пишите так же: возвращайте из плагина **пусто** —
> ms3 трактует непустой возврат как ошибку и прерывает действие.
