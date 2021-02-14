const e = require('express');
var express = require('express');
var conn = require('../node-mysql/config');
//var app = express.app();
var app = express();
var PORT = 3000;
/* GET users listing. */
app.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

app.post('/post', function (req, res, next) {
  post(req, res, next);

});

app.post('/like', function (req, res, next) {
  like(req, res, next);

});

app.post('/comment', function (req, res, next) {
  comment(req, res, next);

});

app.post('/comment', function (req, res, next) {
  login(req, res, next);

});

function post(req, res, next) {
  var data = req.body;

  var requestData = {
    "text": data.text,
    "userid": data.userid,
  }
  if (data.text || data.userid) {

    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

    new Promise((resolve, reject) => {
      conn.query('SELECT name FROM user WHERE text= ?', data.text, function (err, rows) {
        if (err) {
          reject(new Error(err));
          callback(err, null);
        } else {
          resolve('Hello, I am positive number!');
          return res.status(200).json({ message: "Login Successful", "statusCode": "200" });
        }
      });

    })
  }

  console.log("RequestData: ", requestData);
}

function signup(req, res, next) {
  var data = req.body;
  var requestData = {
    "text": data.text,
    "userid": data.userid,
    "gender": data.gender,
    "name": data.gender,
    "address": data.address,
    "dob": data.dob
  }
  if (data.text || data.userid || data.gender || data.name) {
    return res.status(205).json({ message: "Input validation fail", statusMessage: "205" });
  }
  else {

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
