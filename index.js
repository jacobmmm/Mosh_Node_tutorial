//require('express-async-errors')
const winston = require('winston')
//require('winston-mongodb')
const error = require("./middleware/error")

//const config = require('config')
//const Joi = require('joi')
//Joi.objectId = require('joi-objectid')(Joi)

const express = require('express')
const app = express();
/*const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')*/
const mongoose = require('mongoose')

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/config')()
require('./startup/database')()
require('./startup/validation')()


/*process.on('uncaughtException', (ex) => {
   console.log('WE GOT AN UNCAUGHT EXCEPTION')
   winston.error(ex.message, ex)
   process.exit(1)
})

winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log'}))

//winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log'}))

process.on('unhandledRejection', (ex) => {
   
   
   console.log('WE GOT AN UNHANDLED REJECTION')
   winston.error(ex.message, ex);
   process.exit(1);
})

//winston.add(winston.transports.File, { filename: 'logfile.log' })
winston.add(new winston.transports.File({ filename: 'logfile.log' }))
winston.add(new winston.transports.MongoDB({db:'mongodb://0.0.0.0:27017/genre-collection', level: 'error'}))*/

//throw new Error('Something failed during startup')

/*const p = Promise.reject(new Error('Something failed miserably!'))
p.then(() => console.log('Done'))*/

/*if(!config.get('jwtPrivateKey')){
   console.error('FATAL ERROR: jwtPrivateKey is not defined');
   process.exit(1);
}*/



/*mongoose.connect('mongodb://0.0.0.0:27017/genre-collection',{ useNewUrlParser: true, 
useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false })
   .then(() => console.log('Connected to MongoDB....'))
   .catch(err => console.error('Could not connect to Mongo DB....', err))*/

/*app.use(express.json());
app.use('/api/genres',genres)
app.use('/api/customers',customers)
app.use('/api/movies',movies)
app.use('/api/rentals',rentals)
app.use('/api/users',users)
app.use('/api/auth',auth)

app.use(error)*/



const port = process.env.PORT || 3000

//app.listen(port,() => console.log(`Listening on port ${port}....`));

app.listen(port,() => winston.info(`Listening on port ${port}....`));
