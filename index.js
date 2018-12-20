const app = require('express');
const np = require('./controllers/nodb-controller');

app.get('/health',np.health);

app.listen(8080);
