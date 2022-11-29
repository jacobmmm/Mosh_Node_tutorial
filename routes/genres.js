
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const {Genre, validate} = require('../models/genre')
const express = require('express')
const router = express.Router();
const Joi = require('joi')

const mongoose = require('mongoose')

//0.0.0.0:27017

/*mongoose.connect('mongodb://0.0.0.0:27017/genre-collection',{ useNewUrlParser: true, 
useUnifiedTopology: true, useCreateIndex: true,useFindAndModify: false })
   .then(() => console.log('Connected to MongoDB....'))
   .catch(err => console.error('Could not connect to Mongo DB....', err))*/


/*const genreSchema = new mongoose.Schema({

    name: {type:String, required: true, minlength: 5, maxlength: 50},
    movies: {
        type:Number, 
        min: 1,
        get: v => Math.round(v),
        set: v => Math.round(v)
     }


})

const Genre = mongoose.model('genres', genreSchema)*/




/*router.get('/', (req, res) =>{
    res.send(genres)
});*/



router.get('/', async (req, res) =>{
    //throw new Error('Could not get the genres.')
    const genres = await Genre.find().sort('name')
    res.send(genres)
    
});

/*router.get('/', asyncMiddleware(async (req, res) =>{
    
    const genres = await Genre.find().sort('name')
    res.send(genres)
    
}));*/

/*router.get('/:id', (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id))

    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre)
});*/

router.get('/:id', async (req, res) =>{
    const genre = await Genre.findById(mongoose.Types.ObjectId(req.params.id))

    if(!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre)
});

/*router.post('/', (req,res) => {
    
    const { error } = validateGenre(req.body)
    
    if(error)
        return res.status(400).send(error.details[0].message)
        
    

    
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre)
    res.send(genre)
})*/


/*router.post('/', auth, async(req,res) => {
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let genre = new Genre({name: req.body.name, movies: req.body.movies});
    genre = await genre.save()

    res.send(genre)
})*/

router.post('/', auth, async(req,res) => {
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let genre = new Genre({name: req.body.name, movies: req.body.movies});
    genre = await genre.save()

    res.send(genre)
})


/*router.put('/:id', (req,res) =>{

    const genre = genres.find(g => g.id === parseInt(req.params.id))

    if(!genre) return res.status(404).send('The course with the given ID was not found');

    
    

    //!req.body.name || req.body.name.length < 3

   // const result = validateCourse(req.body)
    const { error } = validateGenre(req.body)
    
    if(error) return res.status(400).send(error.details[0].message)
        
    

    genre.name = req.body.name
    res.send(genre)

})*/


router.put('/:id', auth, async(req,res) =>{

    const { error } = validate(req.body)
    
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),{ name:req.body.name, movies: req.body.movies  },
    { new: true})

    if(!genre) return res.status(404).send('The course with the given ID was not found');

    res.send(genre)

})



/*router.delete('/:id',(req,res) =>{
    //Look up the course
    //Not existing, return 404

    const genre = genres.find(c => c.id === parseInt(req.params.id))

    if(!genre)
        return res.status(404).send('The course with the given ID was not found')
        
    

    //Delete
    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    //Return the same course
    res.send(genre)
})*/

router.delete('/:id',[auth,admin],async(req,res) =>{
   
    const genre =  await Genre.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id))

    if(!genre)
        return res.status(404).send('The course with the given ID was not found')
        
    res.send(genre)
})



/*function validateGenre(genre){
    const schema = Joi.object( {
        name: Joi.string().min(3).required()
      })
         
  
    return schema.validate(genre)
}*/

async function createGenre(name,movieCount){
    const genre = new Genre({
       name: name,
       movies: movieCount
      
    });
    try{
    
    //await course.validate();
    const result = await genre.save()
    console.log(result)
    }

    catch(ex){

       for(field in ex.errors)
          console.log(ex.errors[field].message)

       
    }
 }


 //.find({author:/.*Mosh.*/})

/*async function getGenres(){

    const pageNumber = 2;
    const pageSize = 10;

    const genres = await Genre//find({author: 'Jacob', isPublished: true})
                                .find()
                                //.find({price:{$gte:10, $lte:20}})
                                //.find({price: { $in:[10,15,20] }})
                                //.find({ author: /^Mosh/ })
                                //.find({author:/Hamedani$/i})
                               
                                //.or([{author: 'Jacob'},{isPublished: true}])
                                //.skip((pageNumber - 1) * pageSize)
                                //.limit(pageSize)
                                .sort({name:1}).then((res) =>{ return res}, (err) => { return err.message})
                                //.select({name:1, tags: 1, price: 1})
                                //.countDocuments()
    
    
    //return genres
    return genres
    //console.log(genres);
 }

function getGenres(callback){

    setTimeout(() => {

        const genres =  Genre.find() 
        callback(genres)
    })




}


async function updateCourse(id){
    //console.log("ID is ",id)
    const genre = await Genre.findByIdAndUpdate(id, {$set:{name: "fiction" }},
    { new: true})
 
    console.log(genre)
 }


async function removeCourse(id){
    console.log("ID is ",id)
    const result = await Genre.deleteOne({_id: id})
 
    console.log(result)
 }

//updateCourse(mongoose.Types.ObjectId('637b5c74b58ad73f90605ee1'))
//removeCourse(mongoose.Types.ObjectId('637b56a238c05830ab184066'))



 
//createGenre('Mystery',225)
console.log(getGenres(function(genre){
    return genre
}))*/



module.exports = router;