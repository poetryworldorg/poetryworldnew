const e = require('express');
var express = require('express');
//var app = express.app();
var app = express();  
var PORT = 3000; 
/* GET users listing. */
app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

app.post('/signup', function(req, res, next) {
  signup(req, res, next);
  
});

app.post('/login', function(req, res, next) {
  login(req, res, next);
 
});

function login(req, res, next){
  var data = req.body; 
  var requestData={
    "email":data.email,
    "password":data.password,
  }
  if(data.email||data.password){
    return res.status(205).json({ message: "Input validation fail",statusMessage:"205" });
  }
  else{
  
  new Promise((resolve, reject) => { 
    if (Math.random() > 0) { 
        resolve('Hello, I am positive number!'); 
        return res.status(200).json({ message: "Login2" });
    } 
    reject(new Error('I failed some times')); 
})
  }
console.log("RequestData: ", requestData); 
}

function signup(req, res, next){
  var data = req.body; 
  var requestData={
    "email":data.email,
    "password":data.password,
    "gender":data.gender,
    "name":data.gender,
    "address":data.address,
    "dob":data.dob
  }
  if(data.email||data.password||data.gender||data.name){
    return res.status(205).json({ message: "Input validation fail",statusMessage:"205" });
  }
  else{
  
  new Promise((resolve, reject) => { 
    if (Math.random() > 0) { 
        resolve('Hello, I am positive number!'); 
        return res.status(200).json({ message: "Login2" });
    } 
    reject(new Error('I failed some times')); 
})
  }
  console.log("RequestData: ", requestData); 
  
}
// app.listen(PORT, function(err){ 
//   if (err) console.log(err); 
//   console.log("Server listening on PORT", PORT); 
// });
module.exports = app;
