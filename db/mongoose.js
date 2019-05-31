const mongoose= require('mongoose');

const connection=mongoose.connect('mongodb://127.0.0.1:27017/online-shopping-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})

connection.then(
    db => {
      console.log("Connected to mongodb server");
    },
    err => {
      console.log(err);
    }
  );