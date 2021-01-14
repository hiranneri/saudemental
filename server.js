const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
require('./auth')(passport);

const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

const sessionOptions = session({
  secret: 'psi007',
  resave: false,
  saveUninitialized: false,

  cookie: {
    maxAge: 1000*60*60*24,
    httpOnly: true
  }
 
});

app.use(sessionOptions);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.use(express.static(path.resolve(__dirname, 'public','assets','css')));
app.use(express.static(path.resolve(__dirname,'src', 'views','includes')));
app.use(express.static(path.resolve(__dirname, 'public','assets','img','icones')));
app.set('views', path.resolve(__dirname, 'src', 'views'));

app.set('view engine', 'ejs');
app.use(routes);

app.listen(3001,()=>{
  console.log('Acesse');
})