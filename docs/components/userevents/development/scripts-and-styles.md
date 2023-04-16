# Скрипты и стили

При инициализации UserEvents на фронтенде сайта регистрируются скрипты и стили, указанные в системных настройках:

- `front_js` - путь к скриптам, по умолчанию `[[+assetsUrl]]css/web/default.min.css`
- `front_css` - путь к стилям, по умолчанию `[[+assetsUrl]]js/web/default.min.js`

Дополнительно на фронтенде регистрируется переменная `UserEventsConfig` с примерно конфигурацией системы:

```js
UserEventsConfig = {
  actionUrl: '\/extras\/userevents\/assets\/components\/userevents\/action.php',
  assetsUrl: '\/extras\/userevents\/assets\/components\/userevents\/',
  ctx: 'web',
  version: '2.0.0-beta'
};
```

Если вы хотите изменить родные скрипты или стили, вам нужно переименовать эти файлы, изменить, и указать новые имена в системных настройках - тогда они не будут перезаписаны при обновлении.
Весь js заимствован с [miniShop2][01020302], формат и синтаксис практически одинаков.

## Функции обратного вызова

При разных операциях на фронтенде сайта могут запускаться javascript функции обратного вызова, то есть `callbacks`.

Они предусмотрены для разных операций заказа, вот список:

- `Order` - действия с заказом
  - `add` - добавление поля в заказ (имя, email, адрес и т.д.)
  - `getdaysstate` - получаение состояния дней календаря
  - `gettimesstate` - получаение состояния времени календарного дня
  - `getcost` - получаение текущей стоимости заказа
  - `submit` - отправка заказа на обработку

У **каждого** из этих действий есть несколько этапов, которые вы можете использовать для своей логики.
Каждый этап представляет собой функцию или массив функций, которые будут выполнены в нужный момент:

- `before` - выполняется перед началом любой операции. Если вы вернёте здесь `false`, то операция будет прервана.
- `ajax` - технический запрос на сервер
  - `done` - запрос завершён успешно, то есть сервер вернул какой-то ответ.
  - `fail` - на сервере возникла какая-то техническая ошибка, например он вернул код 500.
  - `always` - выполняется при любом ответе от сервера.
- `response` - получен ответ от сервера (то есть, ajax вернул done)
  - `success` - сервер говорит, что всё хорошо
  - `error` - возникла логическая ошибка, например, незаполнены необходимые поля заказа

Для добавления callback в массив нужно указать путь к нему, имя и тело функции:

```js
UserEvents.Callbacks.add('Order.add.before', 'callback_name', function() {
  UserEvents.Message.error('Добавление запрещено!');
  return false;
});
```

А для удаления нужен только путь и имя

```js
UserEvents.Callbacks.remove('Order.add.before', 'callback_name');
```

Обе функции возвращают `true` или `false` в зависимости от результата работы.

## Примеры

2 функции, которые выводят всплывающие окошки с результатом добавления поля в заказ:

```js
UserEvents.Callbacks.add('Order.add.response.success', 'orders_add_ok', function(response) {
  UserEvents.Message.success('Всё хорошо!');
  console.log(response);
});
UserEvents.Callbacks.add('Order.add.response.error', 'orders_add_err', function(response) {
  UserEvents.Message.error('Возникла ошибка :-(');
  console.log(response);
});
```

Логируем все ajax запросы при работе с заказом

```js
UserEvents.Callbacks.add('Order.add.ajax.always', 'ajax_log', function(xhr) {
  console.log(xhr);
});
```

[01020302]: /components/minishop2/development/scripts-and-styles
