const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({

    name: {type:String, required: true, minlength: 5, maxlength: 50},
    movies: {
        type:Number, 
        min: 1,
        get: v => Math.round(v),
        set: v => Math.round(v)
     }


})

const Genre = mongoose.model('genres', genreSchema)

function validateGenre(genre){
    const schema = Joi.object( {
        name: Joi.string().min(3).required(),
        movies: Joi.number()
      })
         
  
    return schema.validate(genre)
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;