const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    fullName: String,
    email: String,
    phone: String,
    password: String,
    tokenUser: String, //ma bao mat
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    }
} , {
    timestamps: true // Tu dong them truong createAt va updateAt
});

const user = mongoose.model('User', userSchema,"users");

module.exports = Account;