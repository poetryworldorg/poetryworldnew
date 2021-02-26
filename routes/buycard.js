const e = require('express');
var express = require('express');
var conn = require('../node-mysql/config');
conn1 = conn.connection();
//var app = express.app();
var app = express();
var PORT = 3000;
/* GET users listing. */
app.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

app.post('/buycard', function (req, res, next) {
  buyCard(req, res, next);

});

app.post('/cancelcard', function (req, res, next) {
  cancelCard(req, res, next);

});

function cancelCard(req, res, next) {
  var data = req.body;

  var requestData = {
    "email": data.email,
    "password": data.password
  }
  console.log("RequestData: ", requestData);
  if (!data.email && !data.password) {
    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {
      let query = conn1.query("SELECT name FROM user WHERE email= ? and password=?", [data.email, data.password], function (err, rows) {
        console.log("Rows ", query);
        if (!query) {
          reject('Credentials not matching');
          return res.status(401).json({ message: "Credentials not matching", "statusCode": "401" });
        } else {
          resolve('cancelCard Successful !!');
          return res.status(200).json({ message: "cancelCard Successful", "statusCode": "200" });
        }
      });

    })
  }

  console.log("RequestData: ", requestData);
}

function buyCard(req, res, next) {
  var data = req.body;
  var requestData = {
    "email": data.email,
    "password": data.password,
    "gender": data.gender,
    "name": data.gender,
    "address": data.address,
    "dob": data.dob
  }
  if (data.email || data.password || data.gender || data.name) {
    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {
      if (Math.random() > 0) {
        resolve('Hello, I am positive number!');
        return res.status(200).json({ message: "cancelCard2" });
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
