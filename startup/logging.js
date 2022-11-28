const winston = require('winston')
require('express-async-errors')
require('winston-mongodb')

module.exports = function(){

    /*process.on('uncaughtException', (ex) => {
        console.log('WE GOT AN UNCAUGHT EXCEPTION')
        winston.error(ex.message, ex)
        process.exit(1)
     })*/
     
     winston.handleExceptions(new winston.transports.Console({ colorize:true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'}))
     
     /*winston.exceptions.handle(new winston.transports.Console({ colorize:true, prettyPrint: true }),
     new winston.transports.File({ filename: 'uncaughtExceptions.log'}))*/
     
     process.on('unhandledRejection', (ex) => {
        
        
        console.log('WE GOT AN UNHANDLED REJECTION')
        winston.error(ex.message, ex);
        process.exit(1);
     })
     
     //winston.add(winston.transports.File, { filename: 'logfile.log' })
     winston.add(new winston.transports.File({ filename: 'logfile.log' }))
     winston.add(new winston.transports.MongoDB({db:'mongodb://0.0.0.0:27017/genre-collection', level: 'error'}))

}