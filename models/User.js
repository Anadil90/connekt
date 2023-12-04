const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 16,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverImage: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    adminPrivelages: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        num: []
    }
}, 
{ timestamps: true}
);

module.exports = mongoose.model('user', userSchema);