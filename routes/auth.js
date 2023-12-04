const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const override = require('method-override');

router.get('/', (req, res) => {
    res.send('user authentication route');
})

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        
        !user && res.status(404).json('user not found');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json('wrong password');

        res.status(200).json(user)
    }
    catch(err) {
        console.log(err)
    }
})

router.post('/register', async(req, res) => {
    console.log('route reached')
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