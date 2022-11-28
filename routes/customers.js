const {Customer, validate} = require('../models/customer')
const express = require('express')
const router = express.Router();
//const Joi = require('joi')

const mongoose = require('mongoose')

/*mongoose.connect('mongodb://0.0.0.0:27017/customer-point',{ useNewUrlParser: true, 
useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false })
   .then(() => console.log('Connected to MongoDB....'))
   .catch(err => console.error('Could not connect to Mongo DB....', err))*/

/*const custSchema = new mongoose.Schema({
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

const Customer = mongoose.model('Customer', custSchema)*/

router.get('/', async (req, res) =>{
    const customers = await Customer.find().sort('name')
    res.send(customers)
});

router.get('/:id', async (req, res) =>{
    const customer = await Customer.findById(mongoose.Types.ObjectId(req.params.id))

    if(!customer) return res.status(404).send('The customer with the given ID was not found');
    res.send(customer)
});

router.post('/', async(req,res) => {
    
    let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,                        
    phone: req.body.phone
        });
    customer = await customer.save()
    res.send(customer)
})

router.put('/:id', async(req,res) =>{

    const { error } = validate(req.body)
    
    if(error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    { name:req.body.name, isGold:req.body.isGold }, { new: true})

    if(!customer) return res.status(404).send('The course with the given ID was not found');

    res.send(customer)

})

router.delete('/:id',async(req,res) =>{
   
    const customer =  await Customer.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id))

    if(!customer)
        return res.status(404).send('The course with the given ID was not found')
        
    res.send(customer)
})

/*function validateCustomer(customer){
    const schema = Joi.object( {
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
      })
         
  
    return schema.validate(customer)
}*/

module.exports = router;
