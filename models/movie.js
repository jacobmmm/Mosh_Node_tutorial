const Joi = require('joi')
const mongoose = require('mongoose')
const { genreSchema } = require("./genre")

const movieSchema = new mongoose.Schema({
    title: {
       type: String,
       required: true,
       trim: true
   },
    genre:{ 
       type: genreSchema,
       required: true
   },
    numberInStock:{
        type:Number,
        required: true,
        min: 0,
        max: 600},
    dailyRentalRate: {
       type:Number,
       required: true,
       min: 0,
       max: 500
   } 
   })

const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(genre){
    const schema = Joi.object( {
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
      })
         
  
    return schema.validate(genre)
}

exports.movieSchema = movieSchema
exports.Movie = Movie;
exports.validate = validateMovie;