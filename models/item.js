const mongoose=require('mongoose');

const Item=mongoose.model('Item',{ //table name singular
    itemName:{
        type:String
    },
    itemPrice:{
        type:String
    },
    itemImageName:{
        type:String
    },
    itemDescription:{
        type:String
    }
})
module.exports=Item;