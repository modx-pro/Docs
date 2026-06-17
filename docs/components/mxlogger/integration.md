# Интеграция в свой пакет

## Зависимость

Добавьте mxLogger в зависимости вашего пакета (`requires` в сборке), чтобы он стоял
у пользователя. Сервис доступен сразу после установки.

## Прямое использование

::: code-group

```php [MODX 3]
$mxl = $modx->services->get('mxlogger');
$mxl->info('mypackage', 'Импорт начат', ['rows' => $count]);
// ... ваша логика ...
$mxl->error('mypackage', 'Импорт упал', ['row' => $i, 'error' => $e->getMessage()]);
```

```php [MODX 2]
$mxl = $modx->mxlogger;
$mxl->info('mypackage', 'Импорт начат', ['rows' => $count]);
// ... ваша логика ...
$mxl->error('mypackage', 'Импорт упал', ['row' => $i, 'error' => $e->getMessage()]);
```

:::

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
        // MODX 3 — DI-контейнер
        if (isset($this->modx->services) && $this->modx->services->has('mxlogger')) {
            return $this->mxl = $this->modx->services->get('mxlogger');
        }
        // MODX 2 — сервис из extension_packages
        return $this->mxl = $this->modx->mxlogger ?? null;
    }
}
```

> `\modX` в typehint работает в обеих версиях: MODX 3 регистрирует legacy-алиас
> класса `MODX\Revolution\modX`.

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

## Готовый плагин логирования магазина

В комплекте — static-плагин, логирующий события корзины и заказа miniShop:

- **MODX 2** — `mxLoggerMiniShop2` (события miniShop2);
- **MODX 3** — `mxLoggerMiniShop3` (события miniShop3).

Логируемое одинаково по смыслу:

- корзина (`msOnAddToCart` / изменение / удаление / очистка) — тэг `cart`;
- заказ (добавление / создание / submit / смена статуса) — тэг `order`;
- сквозной тэг `purchase`, воронка `process_uid` по сессии.

Параметры аргументов метода в trace не пишутся (`trace=caller`) — чтобы при
`capture_mode=full` не утекали ПДн/токен заказа. Требует установленного miniShop
соответствующей версии.

> Свой плагин-логгер чужих событий пишите так же: возвращайте из плагина **пусто** —
> miniShop трактует непустой возврат как ошибку и прерывает действие.
