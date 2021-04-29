var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const FileStore = require('session-file-store')(session);
var indexRouter = require('./routes/index');
var productosRouter = require('./routes/productos');
var usuariosRouter = require('./routes/usuarios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  // Se recomienda cambiar en cada entorno
  // https://parzibyte.me/blog/2020/06/02/sesiones-node-express-js/#Configurar_uso_de_sesion
  secret: "70e1264a39c18468d53f8d387eeff3d5a43fbb3fc58e5a3770d50b25d5e52fe3",
  saveUninitialized: false,
  resave: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
  store: new FileStore({
    ttl: 3600,
  })
}));
app.use(function (req, res, next) {
  res.locals.correoUsuario = req.session.correo;
  next();
});
app.use((req, res, next) => {
  const url = req.url;
  // Servir lo estático
  if (url.startsWith("/stylesheets") && url.endsWith(".css")) {
    next();
    return;
  }
  // si ha iniciado sesión, dejamos que pase
  if (req.session.correo) {
    next();
    return;
  }
  // Si no ha iniciado sesión, solo dejamos que pase si va al login
  if (url === "/usuarios/login") {
    next();
    return;
  }
  // Si lo de arriba no se cumple, redireccionamos al login
  res.redirect("/usuarios/login");
});
app.use('/', indexRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
