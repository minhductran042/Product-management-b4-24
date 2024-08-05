const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    permission: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    }
} , {
    timestamps: true // Tu dong them truong createAt va updateAt
});

const Role = mongoose.model('Role', RoleSchema,"roles");

module.exports = Role;