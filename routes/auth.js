const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.send('user authentication route');
})

router.post('/register', async(req, res) => {

    const salt = await bcrypt.genSalt(12); //generate random alphanumeric number 
    const hashedPassword = await bcrypt.hash(req.body.password, salt); //hash password with generated salt for security
    
    //create new user
    const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    })

    try {
        //save user
        const user = await newUser.save()
        res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
    }
})
module.exports = router