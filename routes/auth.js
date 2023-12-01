const router = require('express').Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    res.send('user authentication route');
})

router.post('/register', async(req, res) => {
    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    try {
        const user = await newUser.save()
        res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
    }
})
module.exports = router