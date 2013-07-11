crutch
======
Simple file server

```
curl -L https://github.com/jmanero/crutch/archive/0.1.1.tar.gz | tar -xvz
cd crutch-0.1.0
npm install
node server.js -t /var/www -p 8080
```

### Command Options
* **-t --target <path>** FS path to serve. Defaults to `./`
* **-p --port <number>** Listen port. Default 8081
* **-l --local** Only listen on `locahost`. Defaults to false

### Upstart
An upstart configuration is included in `crutch.conf`. Copy it to `/etc/init/` and run `sudo start crutch`
