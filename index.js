const app = require('express');
const massive = require('massive');

const np = require('./controllers/nodb-controller');
const uc = require('./controllers/user-controller');

massive(process.env.DBURI)
  .then(db => {
    app.set('db',db);
  })
  .catch(err => {
    console.log(err);
  })

app.get('/health',np.health);

app.post('/user/new',uc.new);

app.post('/user/login',uc.login);

app.listen(8080);
