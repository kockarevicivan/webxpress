![Webxpress logo](https://github.com/kockarevicivan/webxpress/blob/main/logo.png?raw=true)

# webxpress

A useful wrapper for ExpressJS framework!

## 1. Installation
You can install Webxpress through NPM:

```
npm install --save webxpress
```

Within the package comes the Express package, together with all other utilities for standard web applications (body-parser, cors etc.).

## 2. Usage
Webxpress is pretty similar to Express by it's API and it even exposes the Express app instance, if it's needed anywhere outside Webxpress. Here is an example of a simple "Hello, World" application:

```
// In the following line, "app" is actually the created Express app.
const { app, get } = require('webxpress');

get('/', (req, res) => res.send('Hello world!'));

app.start(8080);
```

## 3. The sweet part
If you've ever worked with Express, you know that it does miss a lot of the common framework features. Here are some that you can use outside of the box with Webxpress:

### 3.1. Global error handler
```
/**
 * If error is not handled anywhere during the request lifecycle, it will be processed by this global event,
 * which you can override. It provides info about current error, request and response.
 */
app.onError = (error, req, res) => {
  res.send("Sorry for the inconvenience.");
};
```

### 3.2. Global logger handler
```
/**
 * There is a build in method called "log" within Webxpress, that you can use to log your system's information.
 * Where will the log be created? It depends on your global log handler, because default handler does nothing. Here is an example for both the log function and the log event:
 */
app.onLog = (object, logLevel) => {
  const message = `[${logLevel.toUpperCase()}] [${new Date()}]: ${object}`;

  console.log(message); // You can invoke a library like Winston here.
};
```

### 3.3 Application lifecycle methods

```
/**
 * There are currently only 2 supported lifecycle methods:
 */
app.onStart = () => console.log(`\n\n\n App running... \n\n\n`);
app.onClose = () => console.log(`\n\n\n App stopping... \n\n\n`);
```


## Issuses and contributions

If you notice a bug or any other problem, please leave a comment on this repo's issue page!

Also, feel free to contact me if you want to contribute to this project and the open source community!