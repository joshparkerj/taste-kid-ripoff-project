const app = require('express')();
const massive = require('massive');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const sesh = require('express-session')({
  secret: process.env.SEC,
  resave: true,
  saveUninitialized: true
});

const np = require('./controllers/nodb-controller');
const uc = require('./controllers/user-controller');

app.use(bodyParser.json());
app.use(sesh);

massive(process.env.DBURI)
  .then(db => {
    app.set('db', db);
  })
  .catch(err => {
    console.log(err);
  })

app.use(np.logreqs);

app.get('/health', np.health);

app.post('/user/new', uc.new);

app.post('/user/login', uc.login);

app.listen(8080);
