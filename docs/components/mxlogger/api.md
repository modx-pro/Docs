# API сервиса

## Доступ к сервису

Способ получить сервис — единственное, что различается между версиями. Дальше API
полностью одинаков.

::: code-group

```php [MODX 3]
// сервис зарегистрирован в DI-контейнере при загрузке namespace mxlogger (bootstrap.php)
/** @var \MxLogger\MxLogger $mxl */
$mxl = $modx->services->get('mxlogger');
```

```php [MODX 2]
// сервис зарегистрирован в extension_packages — доступен сразу как свойство $modx
/** @var \mxLogger $mxl */
$mxl = $modx->mxlogger;
// либо явно (например, в standalone-скрипте):
$mxl = $modx->getService('mxlogger', 'mxLogger', MODX_CORE_PATH . 'components/mxlogger/model/mxlogger/');
```

:::

## Запись лога

```php
// MODX 3: возвращает ?\MxLogger\Model\MxLoggerLog
// MODX 2: возвращает ?mxLoggerLog
$mxl->log($tags, $level, $message, array $context = [], array $options = []);
```

Шорткаты по уровням (то же самое, уровень подставлен):

```php
$mxl->debug($tags, $message, $context = [], $options = []);
$mxl->info($tags, $message, $context = [], $options = []);
$mxl->warning($tags, $message, $context = [], $options = []);
$mxl->error($tags, $message, $context = [], $options = []);
```

Возвращает сохранённый объект записи или `null` (если логирование выключено,
уровень ниже минимального или запись отфильтрована whitelist'ом).

### Параметры

- **`$tags`** — строка или массив. Тэг(и) процесса/фичи. Нормализуются:
  `strtolower`, только `[a-z0-9]`, дубликаты убираются. Строку можно с
  разделителями (запятая/пробел): `'cart,purchase'` ≡ `['cart','purchase']`.
- **`$level`** — `debug` | `info` | `warning` | `error`.
- **`$message`** — текст сообщения (строка).
- **`$context`** — произвольный массив; пишется JSON-колонкой. Объекты внутри
  при захвате сворачиваются в `object(Класс)`.
- **`$options`** — см. ниже.

### Опции (`$options`)

- **`process_uid`** — строка; идентификатор воронки (см. ниже про `process()`).
- **`trace`** — переопределить режим захвата трассировки для этой записи:
  `true`/`'full'` (стэк + параметры), `false`/`'caller'` (только источник),
  `'off'` (ничего). По умолчанию — из `mxlogger.capture_mode`.
- **`skip`** — int; пропустить N дополнительных кадров backtrace при поиске
  «Источника» (если между вашим кодом и `log()` есть лишние обёртки).
- **`skip_classes`** — массив классов-прокладок (фасадов/обёрток над логгером),
  которые трактуются как внутренние при поиске «Источника» — надёжнее жёсткого
  `skip=N`. Точное имя класса **или** префикс пространства имён со `\` на конце:

```php
$mxl->info('payment', 'Платёж создан', $ctx, [
    'skip_classes' => ['My\\Payment\\Logger', 'App\\Log\\'],
]);
```

## Процесс (воронка)

Один экземпляр процесса = один общий `process_uid` на все его записи. Удобно
склеивать в одну ленту разные цепочки одной операции (корзина → заказ → оплата),
в т.ч. из разных пакетов.

```php
$p = $mxl->process($tags, $uid = null); // если $uid не задан — сгенерируется

$p->debug($message, $context = [], $options = []);
$p->info($message, $context = [], $options = []);
$p->warning($message, $context = [], $options = []);
$p->error($message, $context = [], $options = []);
$p->log($level, $message, $context = [], $options = []);

$p->addTag($tag);   // добавить тэг к последующим записям процесса
$uid = $p->getUid();  // сохранить и продолжить воронку позже:
$p2  = $mxl->process(['cart', 'purchase'], $uid);
```

## Тэги

- Только `[a-z0-9]` в нижнем регистре; пробелы/прочее вырезаются.
- У записи может быть несколько тэгов.
- Хранятся в CSV-обёртке `,cart,purchase,` с FULLTEXT-индексом.
- В гриде/standalone фильтр по тэгам — режим `any` (хотя бы один) или `all` (все
  одновременно); алгоритм (FULLTEXT vs LIKE) — настройка `mxlogger.tag_filter_mode`.

## Что пишется автоматически

- **Источник вызова** — class / function / file / line. Движок пропускает
  диспетчерские кадры фреймворка (`*::invokeEvent`, `mod*::process`,
  `include`/`eval` — в MODX 3 классы namespaced: `MODX\Revolution\modScript::process`),
  поэтому «Источник» указывает на реальный вызывающий код.
- **Трассировка** (при режиме `full`) — стэк вызовов + параметры метода-источника;
  объекты сворачиваются в `object(Класс)`, с лимитами глубины/длины/числа
  элементов (см. [настройки](settings)).
- **Пользователь** (id), **сессия**, **ip**, **время** (`createdon`, unix).

## Уровни

`debug` (10) → `info` (20) → `warning` (30) → `error` (40). Запись пишется, если её
уровень ≥ `mxlogger.min_level`. Режим захвата трассировки по умолчанию (`auto`):
`caller` для debug/info, `full` для warning/error.

## Из чанка / Fenom

```
[[!mxLogger? &tags=`cart,purchase` &level=`info` &message=`Товар добавлен`]]
```

Параметры сниппета: `tags` (синоним `tag`), `level`, `message`, `process_uid`,
`context` (JSON-строка), `trace`.
