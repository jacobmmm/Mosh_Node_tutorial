const {Movie, validate} = require('../models/movie')
const {Genre} = require('../models/genre')
const express = require('express')
const router = express.Router();
const Joi = require('joi')

const mongoose = require('mongoose')

router.get('/', async (req, res) =>{
    const movies = await Movie.find().sort('title')
    res.send(movies)
});

router.get('/:id', async (req, res) =>{
    const movie = await Movie.findById(mongoose.Types.ObjectId(req.params.id))

    if(!movie) return res.status(404).send('The genre with the given ID was not found');
    res.send(movie)
});

router.post('/', async(req,res) => {
    const genre = await Genre.findById(mongoose.Types.ObjectId(req.body.genreId))

    if(!genre) return res.status(404).send('Invalid Genre');
    
    let movie = new Movie({ title: req.body.title, 
    genre: {
        _id: genre._id,
        name: genre.name,
        movies: genre.movies
    },
    numberInStock: req.body.numberInStock,
     dailyRentalRate: req.body.dailyRentalRate  
    });

   movie = await movie.save()

    
   

   
    res.send(movie)
})

router.put('/:id', async(req,res) =>{

    const { error } = validate(req.body)
    
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(mongoose.Types.ObjectId(req.body.genreId))

    if(!genre) return res.status(404).send('Invalid Genre');

    const movie = await Movie.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    { title: req.body.title, 
        genre:{
        _id: genre._id,
        name: genre.name,
        movies: genre.movies
        },
        numberInStock: req.body.numberInStock, dailyRentalRate: req.body.dailyRentalRate  }, { new: true})

    if(!movie) return res.status(404).send('The movie with the given ID was not found');

    res.send(movie)

})

router.delete('/:id',async(req,res) =>{
   
    const movie =  await Movie.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id))

    if(!movie)
        return res.status(404).send('The movie with the given ID was not found')
        
    res.send(movie)
})

module.exports = router;