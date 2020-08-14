const bcrypt = require('bcrypt');

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const existingUser = await db.check_user(username);
    if (existingUser[0]) {
      return res.status(409).send('User Name already exists')
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    const [newUser] = await db.create_user([username, email, hash])
    req.session.user = {
      userId: newUser.id,
    }
    res.status(200).send(req.session.user)
  },

  login: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const user = await db.check_user(username);
    if (!user[0]) {
      return res.status(401).send('Not Getting In!');
    } else {
      const authenticated = bcrypt.compareSync(password, user[0].password);
      if (authenticated) {
        req.session.user = {
          userId: user[0].id,
        }
        res.status(200).send(req.session.user)
      } else {
        res.status(403).send('User Name or Password incorrect')
      }
    }
  },
}