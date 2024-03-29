# NodeJS демон

У компонента есть вспомогательный Node.js демон, который позволяет ускорить парсинг во много раз за счёт некоторых особенностей работы.

Чтобы настроить работу компонента через демон, необходимо иметь VPS/VDS и произвести ряд действий на стороне сервера, а также указать в системных настройках компонента доступ к сокету, на котором крутится демон.

## Настройка демона на сервере

[Приложение демона загружено в репозиторий Npm](https://www.npmjs.com/package/xparser-daemon), там же есть подробная инструкция по работе с ним на английском.

> Демон должен быть запущен на том же сервере, на котором работает сайт с xParser.

Все действия, описанные ниже, мы выполняем из-под пользователя `root`. Вы же можете сделать тоже самое из под `sudo` пользователя.

### Установка

Создайте папку для демона на вашем сервере `mkdir /dir/path/` и перейдите в нее `cd /dir/path/`.
Затем установите приложение:

```bash
npm install xparser-daemon
```

После установки можно перейти к настройке и запуску демона.

### Настройка

Создайте файл `app.js` в папке демона и установите порт для сокета, на котором будет крутиться демон:

```js
require('xparser-daemon').run({
  socket: {
    PORT: 3007,
  },
});
```

Установите менеджер процессов pm2. Это делается для того, чтобы демон работал в фоновом режиме и запускался при запуске сервера.

```bash
npm install pm2 -g
```

Запустите демон через pm2:

```bash
pm2 start app.js --name=xParserDaemon
```

После этого мы можем сохранить список текущих процессов с их статусами и сделать автозапуск:

```bash
pm2 save
pm2 startup upstart
```

Также, вы можете проверить статус работы демона командой:

```bash
pm2 monit
```

### Настройка демона в компоненте

Тут всё гораздо проще.
Нужно указать в системной настройке `xparser_socket_url` URL и порт до сокета на локалхосте: `http://localhost:3007`.
