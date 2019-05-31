const mongoose=require('mongoose');

const User=mongoose.model('User',{ //table name singular
    userFname:{
        type:String
    },
    userLname:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    }
})
module.exports=User;