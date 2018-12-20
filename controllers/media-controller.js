const r = (status, res) => r => res.status(status).send(r);
const err = (message, res) => err => {
  res.status(500).send(message);
  console.log(err);
}

module.exports = {
  new: (req,res,next) => {
    if (!req.session.admin){
      res.status(403).send('permission denied');
      return;
    }
    const db = req.app.get('db');
    db.new_media([
      req.body.name,
      req.body.type
    ])
    .then(r(200,res))
    .catch(err('add new media failed',res))
  }
}
