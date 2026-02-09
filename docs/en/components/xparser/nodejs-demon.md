# NodeJS daemon

The component has a helper Node.js daemon that significantly speeds up parsing due to how it works.

To use the component with the daemon, you need a VPS/VDS and to perform several steps on the server, plus configure the component's system settings for the socket the daemon runs on.

## Daemon setup on server

[Daemon app is published on Npm](https://www.npmjs.com/package/xparser-daemon), with detailed instructions in English.

> The daemon must run on the same server as the site with xParser.

The steps below are run as `root`. You can use `sudo` instead.

### Installation

Create a folder for the daemon `mkdir /dir/path/` and go into it `cd /dir/path/`.
Then install:

```bash
npm install xparser-daemon
```

After installation, configure and start the daemon.

### Configuration

Create `app.js` in the daemon folder and set the socket port:

```js
require('xparser-daemon').run({
  socket: {
    PORT: 3007,
  },
});
```

Install process manager pm2 so the daemon runs in background and starts with the server:

```bash
npm install pm2 -g
```

Start the daemon with pm2:

```bash
pm2 start app.js --name=xParserDaemon
```

Save the process list and enable startup:

```bash
pm2 save
pm2 startup upstart
```

Check daemon status:

```bash
pm2 monit
```

### Daemon configuration in component

Configure the component by setting system setting `xparser_socket_url` to the socket URL and port on localhost: `http://localhost:3007`.
