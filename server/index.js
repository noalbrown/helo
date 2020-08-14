require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const massive = require('massive');
const authctrl = require('./controller');

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  console.log('db connected');
}).catch(err => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.post('/auth/login', authctrl.login)
app.post('/auth/register', authctrl.register)
app.get('/auth/logout', auth.logout)
// I did not mean to put these in the same ctrl folder, ran out of time
app.post('/api/create_post', authctrl.create);
app.get('/api/get_posts', authctrl.getAll);
app.get('/api/get_post/:id', authctrl.getOne);
app.delete('/api/delete_post/:id', authctrl.delete);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))