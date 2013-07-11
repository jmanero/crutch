crutch
======
Simple file server

```
node server.js -t /var/www -p 8080
```

### Command Options
* **-t --target <path>** FS path to serve. Defaults to `./`
* **-p --port <number>** Listen port. Default 8081
* **-l --local** Only listen on `locahost`. Defaults to false
