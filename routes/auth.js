/*const config = require('config')
const jwt = require('jsonwebtoken')*/
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user')
const express = require('express')
const router = express.Router();
const Joi = require('joi')

const mongoose = require('mongoose')

router.get('/', async (req, res) =>{
    const users = await User.find()
    res.send(users)
});

router.post('/', async(req,res) => {
    const { error } = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid  password')

    const token = user.generateAuthToken()
    
    res.send(token)

    //user = new User({name: req.body.name, email: req.body.email, password: req.body.password})

  

    //res.send(_.pick(user, ['_id','name','email']))



})

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(100).required()
    })
    return schema.validate(req)

}

module.exports = router