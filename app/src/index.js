const development = '0.0.0.0';
const production = '';

const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV ? production : development;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

import './config';
import './database';

const sess = {
  key: process.env.SESSION_ID,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
};

import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import flash from 'express-flash-messages';
import cookie from 'cookie-parser';
import session from 'express-session';
import override from 'method-override';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));
app.use(session(sess));
app.use(cookie());
app.use(flash());
app.use(override('_method'));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, host, () => {
  console.log(`Running app in http://${host}:${port}`);
});
