# Менеджер и standalone-просмотрщик

## Менеджерный грид

Менеджер → **Компоненты → mxLogger**.

::: info Технология грида

- **MODX 3** — грид на Vue 3 + PrimeVue.
- **MODX 2** — CMP-грид на ExtJS (MODExt).

Набор фильтров, колонок и действий — одинаковый.
:::

- **Фильтры** (применяются автоматически, без кнопки): тэги (мультиселект;
  несколько выбранных → совпадение по всем), уровень, Process UID,
  пользователь/сессия/IP, период (диапазон дат), полнотекстовый поиск по
  сообщению/источнику/файлу.
- **Колонки**: время, уровень, тэги, процесс, сообщение, источник
  (`class::method` + `file:line`), пользователь/IP.
- **Деталь записи** — двойной клик по строке (или иконка-глаз): таблица полей,
  сообщение, вкладки «Контекст» и «Стэк и параметры». Клик по значению в детали
  заполняет соответствующий фильтр грида.
- **Очистка журнала** — кнопка «Очистить журнал»: удаляет записи по текущим
  фильтрам, либо весь журнал (если фильтров нет), с подтверждением.

Коннектор грида — `assets/components/mxlogger/connector.php`. Процессоры в MODX 3 —
`MxLogger\Processors\Mgr\Log\{GetList,Get,GetTags,Clear,Remove}`.

## standalone.php — доступ к логам в обход MODX

`assets/components/mxlogger/standalone.php` читает таблицу логов **напрямую через
PDO**, не бутстрапит MODX — на случай, если приложение не грузится. Параметры БД
берёт из `core/config/config.inc.php`.

### CLI (по ssh — всегда доступно)

```bash
php assets/components/mxlogger/standalone.php limit=20
php assets/components/mxlogger/standalone.php tag=cart level=error since="2026-06-01"
php assets/components/mxlogger/standalone.php id=512        # одна запись целиком
```

### WEB (нужен ключ, иначе 403)

Без ключа веб-доступ закрыт (403). Сначала создайте ключ — одним из способов.

Способ 1 — файл с ключом (одна строка), кладётся в
`core/components/mxlogger/standalone.key`:

```bash
openssl rand -hex 20 > core/components/mxlogger/standalone.key
```

Способ 2 — переменная окружения (в конфиге сервера/`.env`):

```bash
export MXLOGGER_TOKEN="$(openssl rand -hex 20)"
```

Затем передавайте этот ключ в параметре `key`:

```
https://site.ru/assets/components/mxlogger/standalone.php?key=ВАШ_КЛЮЧ&tag=cart&level=error&limit=100
```

::: tip
Если задана env-переменная `MXLOGGER_TOKEN`, используется она; иначе берётся файл
`standalone.key`. Файл с ключом стоит закрыть от веб-доступа (он вне webroot —
в `core/`, — но проверьте, что `core/` недоступен снаружи).
:::

### Параметры (CLI и WEB)

- `tag` — фильтр по тэгу;
- `level` — `debug|info|warning|error`;
- `process` — process_uid;
- `ident` — пользователь / сессия / ip;
- `q` — поиск по тексту/источнику;
- `since`, `until` — диапазон дат (любой формат `strtotime`);
- `limit` — по умолчанию 100, максимум 2000;
- `id` — показать одну запись целиком (context + trace);
- `full` — не усекать context/trace;
- `color` — `1`/`0` принудительно вкл/выкл цвет (по умолчанию авто по TTY).

### Запасной доступ к БД (если `config.inc.php` недоступен)

env-переменные: `MXLOGGER_DSN`, `MXLOGGER_DB_USER`, `MXLOGGER_DB_PASS`,
`MXLOGGER_TABLE_PREFIX`.
