const bc = require('./bcrypt-controller');

const r = (status, res) => r => res.status(status).send(r);
const err = (message, res) => err => {
  res.status(500).send(message);
  console.log(err);
}

module.exports = {
  new: (req, res, next) => {
    const db = req.app.get('db');
    bc.saltAndHash(String(req.body.password))
      .then(hash => {
        return db.new_kid([
          req.body.name,
          req.body.email,
          hash
        ])
      })
      .then(r(200,res))
      .catch(err('new kid registration failed',res))
  },
  login: (req,res,next) => {
    const db = req.app.get('db');
    db.get_hash([
      req.body.name
    ])
      .then(h => {
        return bc.compare(String(req.body.password),h[0].saltedhashedpassword)
      })
      .then(r => {
        return db.login([
          req.body.name
        ])
      })
      .then(kid => {
        req.session.kid_id = kid[0].id;
        req.session.admin = kid[0].privilege_level > 0;
        return kid;
      })
      .then(r(200,res))
      .catch(err('login failed',res))
  }
}
