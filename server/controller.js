const bcrypt = require('bcrypt');
let id = posts[posts.length - 1].id + 1

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

  create: (req, res) => {
    const db = req.app.get('db');
    const { title, image, content } = req.body;

    db.create_post([title, image, content])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "Could not generate post" });
        console.log(err)
      });
  },

  getOne: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;

    db.get_post(id)
      .then(posts => res.status(200).send(posts))
      .catch(err => {
        res.status(500).send({ errorMessage: "Could not get Post" });
        console.log(err)
      });
  },

  getAll: (req, res) => {
    const db = req.app.get('db');

    db.get_posts()
      .then(posts => res.status(200).send(posts))
      .catch(err => {
        res.status(500).send({ errorMessage: "Could not get Posts" });
        console.log(err)
      });
  },

  delete: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;

    db.delete_post(id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: 'Could not delete' });
        console.log(err)
      });
  },
}