const Joi = require('joi')
//Joi.objectId = require('joi-objectid')(Joi)

const mongoose = require('mongoose')
const { custSchema } = require("./customer")
const { movieSchema } = require("./movie")

const rentSchema = new mongoose.Schema({
    customer: {
        type: custSchema,
        required: true
    },

    movie: {

        type: movieSchema,
        required: true
    },

    rentStart:{
        type: Date,
        required: true
    },

    rentEnd:Date,

    rentalFee: {
        type:Number,
        min:0
    }
    
})

const Rental = mongoose.model('Rental', rentSchema)

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        rentStart: Joi.date().required(),
        rentEnd: Joi.date(),
        rentalFee: Joi.number()
        })
            

    return schema.validate(rental)
}

exports.rentSchema = rentSchema
exports.Rental = Rental;
exports.validate = validateRental;