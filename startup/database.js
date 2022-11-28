const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function(){

    mongoose.connect('mongodb://0.0.0.0:27017/genre-collection',{ useNewUrlParser: true, 
    useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false })
       //.then(() => console.log('Connected to MongoDB....'))
       .then(() => winston.info('Connected to MongoDB....'))
       //.catch(err => console.error('Could not connect to Mongo DB....', err))

       
}