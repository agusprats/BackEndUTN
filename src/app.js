const bodyParser = require('body-parser'); //Permite ver como json info enviada por clientes
const morgan = require('morgan'); //Permite ver las peticiones http que llegan desde clientes al servidor, y verlas en consola
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');//Permite conexion desde express a Mongodb
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express(); //Inicio exoress con la variable app

app.set('secretKey',process.env.SECRET_KEY)

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

mongoose.Promise = global.Promise; //Biblioteca global de js. Le pido a mongoose que utilice las promesas de globaLes de js
mongoose.connect('mongodb://localhost/3007', {  // Este el nombre que le pongo a la base de datos
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true},
function(error){
  if(error){
    throw error; 
  }else{
    console.log('>>> Conectado a >>> MongoDB >>>');
  }
});
//.then(db => console.log('>>> DataBase is >>> connected'))
//.catch(err => console.log(err));


//settings
app.set('port', process.env.PORT || 3007);

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // Recibire la info que llega al servidor como json


/** HEADER INICIO */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
    next();
  });
  app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
    res.sendStatus(200);
  });
  /** HEADER FIN */

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', validateUser, productsRouter);

function validateUser(req,res,next){
  console.log(req.app.get('secretKey'))
  jwt.verify(req.headers['x-access-token'],req.app.get('secretKey'),function(err,decoded){
    if(err){
      res.status(500).json({error:true,message:err.message})
    }else{
      console.log(decoded)
      req.body.userToken = decoded
      next();
    }
  })
}
app.validateUser = validateUser;
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//view Engine Setup
app.use(cookieParser());

//static files

//error handlers (El error handler es un midleware "de salida" o response)
app.use(function(err, req, res, next) {
 // set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};
// render the error page
res.status(err.status || 500);
//res.render('error');
res.json({err:"error"});
});


// start the server
app.listen(app.get('port'), () => {
    console.log('>>> Server on port >>>', app.get('port'));
});

module.exports = app;