const Joi = require('joi')
const mongoose = require('mongoose')

/*mongoose.connect('mongodb://0.0.0.0:27017/customer-point',{ useNewUrlParser: true, 
useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false })
   .then(() => console.log('Connected to MongoDB....'))
   .catch(err => console.error('Could not connect to Mongo DB....', err))*/

/*mongoose.connect('mongodb://0.0.0.0:27017/genre-collection',{ useNewUrlParser: true, 
useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB....'))
    .catch(err => console.error('Could not connect to Mongo DB....', err))*/

const custSchema = new mongoose.Schema({
    isGold:{
        type:Boolean, 
        default:false
    },
    name: {
        type:String,
        required: true, 
        minlength: 5,
        maxlength: 50
    },
    phone: {
    type:String,
    required: true,
    minlength:5,
    maxlength: 50
    }
     })

const Customer = mongoose.model('Customer', custSchema)

function validateCustomer(customer){
    const schema = Joi.object( {
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
        })
            

    return schema.validate(customer)
}

exports.custSchema = custSchema
exports.Customer = Customer;
exports.validate = validateCustomer;