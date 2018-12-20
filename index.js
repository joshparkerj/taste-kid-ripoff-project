const app = require('express')();
const massive = require('massive');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const sesh = require('express-session')({
  secret: process.env.SEC,
  resave: true,
  saveUninitialized: true
});

const nc = require('./controllers/nodb-controller');
const kc = require('./controllers/kid-controller');
const mc = require('./controllers/media-controller.js');

app.use(bodyParser.json());
app.use(sesh);

massive(process.env.DBURI)
  .then(db => {
    app.set('db', db);
  })
  .catch(err => {
    console.log(err);
  })

app.use(nc.logreqs);

app.get('/health', nc.health);

app.post('/kid/new', kc.new);

app.post('/kid/login', kc.login);

app.post('/media/new', mc.new)

app.listen(8080);
