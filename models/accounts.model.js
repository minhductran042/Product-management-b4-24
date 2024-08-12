const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
    
    fullName: String,
    email: String,
    phone: String,
    password: String,
    token: String, //ma bao mat
    avatar: String,
    role_id: String,
    status: String,
    createdBy : String,
    updatedBy : String,
    deletedBy : String,
    deleted: {
        type: Boolean,
        default: false
    }
} , {
    timestamps: true // Tu dong them truong createAt va updateAt
});

const Account = mongoose.model('Account', accountSchema,"accounts");

module.exports = Account;