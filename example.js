const { app, get, log } = require('./index');
const port = 3000;

get('/', (req, res) => {
  log("Test log message.");

  res.send('Hello world!');
});

app.onError = (error, req, res) => {
  res.send("Sorry for the inconvenience.");
};

app.onLog = (object, logLevel) => {
  const message = `[${logLevel.toUpperCase()}] [${new Date()}]: ${object}`;

  console.log(message);
};

app.onStart = () => {
  console.log(`\n\n\n*********************\n\nApp running on http://localhost:${port}\n\n*********************\n\n\n`);
}

app.onClose = () => {
  console.log(`\n\n\n*********************\n\nApp stopping...\n\n*********************\n\n\n`);
}

app.start(port);