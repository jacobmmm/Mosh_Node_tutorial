const {Rental, validate} = require('../models/rental')
const {Customer} = require('../models/customer')
const {Movie} = require('../models/movie')
const express = require('express')
const router = express.Router();
const Joi = require('joi')

const mongoose = require('mongoose')

router.get('/', async (req, res) =>{
    const rentals = await Rental.find()
    res.send(rentals)
});

router.post('/', async(req,res) => {
    const { error } = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(mongoose.Types.ObjectId(req.body.customerId))

    if(!customer) return res.status(404).send('Invalid Customer');

    const movie = await Movie.findById(mongoose.Types.ObjectId(req.body.movieId))

    if(!movie) return res.status(404).send('Invalid Movie');


    
    let rental = new Rental({ customer: {
        _id: customer._id,
        isGOld: customer.isGold,
        name: customer.name,
        phone: customer.phone

    }, 
    movie: {
        _id: movie._id,
        title: movie.title,
        genre: movie.genre,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate
    },
    
    
    rentStart: req.body.rentStart,
    rentEnd: req.body.rentEnd,
    rentalFee: req.body.rentalFee 
    });

   rental = await rental.save()

    
   

   
    res.send(rental)
})

module.exports = router;