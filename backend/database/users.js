const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    cartData:{
        type:Object,
    }
})

module.exports = mongoose.model('Users',userSchema);