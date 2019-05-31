const mongoose= require('mongoose');
const express=require('express');
const path=require('path');
const cors=require('cors');
const bodyParser= require('body-parser');
const multer= require('multer');

const app=express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./db/mongoose');
const User=require('./models/user');
const Item=require('./models/item');
app.use("/images",express.static("./images"));

var ImagefileName;
var storage=multer.diskStorage({
    destination:"images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        ImagefileName = file.fieldname + "-" + Date.now() + ext;
        callback(null, ImagefileName);
      }
})

   const newError="Image Files Only!";
    var imageFileFilter = (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
    {return cb(newError, false); }
    cb(null, true);};
   
    var imageupload = multer({
    storage: storage});


app.post('/imageupload',imageupload.single("imageFile"), (req, res) => {
    console.log(ImagefileName);
    var resPonseFilename = JSON.stringify({
      imageFile: ImagefileName
    });
    console.log(resPonseFilename);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify(
        {
          imageFile: ImagefileName
        },
        null,
        3
      )
    );
  });


app.post('/user-insert',(req,res) => {
    var myData=new User(req.body);
     console.log(req.body);
     
     myData.save().then(function(){
         res.send('Success');
     }).catch(function(e){
         res.send(e)
     });
     });

    app.post("/getuser", (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        User.find({ username: username, password: password })
          .then(function(user) {
            var modelUser = JSON.stringify(user);
            console.log(modelUser);
            res.writeHead(200, { "Content-type": "application/json" });
            res.end(modelUser);
          })
          .catch(function(e) {
            res.send(e);
          });
      });

app.post("/item-insert",(req,res)=>{
        var myData=new Item(req.body);
        console.log(myData);
        myData.save().then(function(){
            res.send('Success');
        }).catch(function(e){
            res.send(e)
        })
        })

        app.get('/users', function(req, res)
        { User.find().then(function(user)
            { 
                
                res.send(user); 
         
        })
        .catch(function(e){     
            res.send(e) }); 
        }) 

        app.get('/items', function(req, res)
        { Item.find().then(function(item)
            { 
                
                res.send(item); 
         
        })
        .catch(function(e){     
            res.send(e) }); 
        }) 
    
app.listen(8080);