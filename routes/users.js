const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.send('users route');
})

//update user
router.put('/:id', async(req, res) => {
    if(req.body.userId === req.params.id || req.body.adminPrivelages) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                console.log(req.body.password, 'password hashed')
            }
            catch(err) {
                return res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});
//delete user
router.delete('/:id', async(req, res) => {
    if(req.body.userId === req.params.id || req.body.adminPrivelages) {
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Account has been deleted!");
            } 
            catch (err) {
                return res.status(500).json(err);
            }  
        
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});
//get a user
router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

//follow user
router.put('/:id/follow', async (req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: { followers: req.body.userId}});
                await currentUser.updateOne({$push: {following: req.params.id}});
                res.status(200).json(`you are following this user`);

            }
            else {
                res.status(403).json('You are already following this user!');
            }

        }    
        catch(err) {
            res.status(500).json(err)
        }
    }
})

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull: { followers: req.body.userId}});
                await currentUser.updateOne({$pull: {following: req.params.id}});
                res.status(200).json(`you are no longer following this user`);

            }
            else {
                res.status(403).json('You already are not following this user!');
            }

        }    
        catch(err) {
            res.status(500).json(err)
        }
    }
})

module.exports = router;