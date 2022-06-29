const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userId: {
        type: String,
        require: true,
    },
    
    name:{
        type: String,
        require: true,
    },

    address:{
        type:String,
        require:true
    },

    department: {
        type: String
    },

    contactInfo: {
        type: String
    }

}, {
    timestamps:true
});


const user = mongoose.model('user',userSchema);

module.exports = user;